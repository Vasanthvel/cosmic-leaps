import asyncio
import json
import os
from collections.abc import AsyncIterator
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .knowledge import SYSTEM_INSTRUCTIONS

MAX_CONTEXT_MESSAGES = 8


class AIProviderError(Exception):
    """A user-safe error from the configured AI provider."""


class AIProvider:
    async def complete(self, messages: list[dict[str, str]]) -> str:
        raise NotImplementedError

    async def stream(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        raise NotImplementedError


class OllamaProvider(AIProvider):
    def __init__(self) -> None:
        self.base_url = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434").rstrip("/")
        self.model = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
        self.timeout = float(os.getenv("AI_REQUEST_TIMEOUT_SECONDS", "45"))

    async def complete(self, messages: list[dict[str, str]]) -> str:
        recent_messages = messages[-MAX_CONTEXT_MESSAGES:]
        request = self._build_request(recent_messages, stream=False)

        try:
            response_body = await asyncio.to_thread(self._request, request)
            response = json.loads(response_body)
            content = response.get("message", {}).get("content", "").strip()
        except (HTTPError, URLError, TimeoutError, OSError, json.JSONDecodeError) as error:
            raise AIProviderError("The local AI service is unavailable.") from error

        if not content:
            raise AIProviderError("The AI service returned an empty response.")
        return content

    async def stream(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        recent_messages = messages[-MAX_CONTEXT_MESSAGES:]
        request = self._build_request(recent_messages, stream=True)
        loop = asyncio.get_running_loop()
        chunks: asyncio.Queue[tuple[str, object | None]] = asyncio.Queue()
        stop_event = asyncio.Event()

        def read_stream() -> None:
            try:
                with urlopen(request, timeout=self.timeout) as response:
                    for line in response:
                        if stop_event.is_set():
                            break
                        loop.call_soon_threadsafe(chunks.put_nowait, ("line", line))
            except (HTTPError, URLError, TimeoutError, OSError) as error:
                loop.call_soon_threadsafe(chunks.put_nowait, ("error", AIProviderError("The local AI service is unavailable.")))
            finally:
                loop.call_soon_threadsafe(chunks.put_nowait, ("done", None))

        worker = asyncio.create_task(asyncio.to_thread(read_stream))
        emitted = False
        try:
            while True:
                kind, value = await chunks.get()
                if kind == "error":
                    raise value  # type: ignore[misc]
                if kind == "done":
                    break

                try:
                    event = json.loads(value)  # type: ignore[arg-type]
                except json.JSONDecodeError as error:
                    raise AIProviderError("The AI service returned an invalid response.") from error

                if event.get("error"):
                    raise AIProviderError("The local AI service returned an error.")
                content = event.get("message", {}).get("content", "")
                if content:
                    emitted = True
                    yield content
                if event.get("done"):
                    break

            if not emitted:
                raise AIProviderError("The AI service returned an empty response.")
        finally:
            stop_event.set()
            if not worker.done():
                worker.cancel()

    def _build_request(self, messages: list[dict[str, str]], *, stream: bool) -> Request:
        payload = json.dumps(
            {
                "model": self.model,
                "messages": [{"role": "system", "content": SYSTEM_INSTRUCTIONS}, *messages],
                "stream": stream,
                "options": {"temperature": 0.2, "num_predict": 100},
            }
        ).encode("utf-8")
        return Request(
            f"{self.base_url}/api/chat",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

    def _request(self, request: Request) -> bytes:
        with urlopen(request, timeout=self.timeout) as response:
            return response.read()


provider = OllamaProvider()