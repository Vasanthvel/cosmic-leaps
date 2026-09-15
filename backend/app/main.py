import os
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from starlette.responses import StreamingResponse

from .ai import AIProviderError, provider

MAX_CONTEXT_MESSAGES = 8

app = FastAPI(
    title="Analytics Lab API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:3000"), "http://127.0.0.1:3000"],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=MAX_CONTEXT_MESSAGES)


@app.get("/")
def root():
    return {
        "status": "ok",
        "application": "Analytics Lab API",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.post("/api/chat")
async def chat(request: ChatRequest):
    messages = [message.model_dump() for message in request.messages]
    if messages[-1]["role"] != "user":
        raise HTTPException(status_code=400, detail="A user message is required.")
    if sum(len(message["content"]) for message in messages) > 16000:
        raise HTTPException(status_code=413, detail="The conversation is too long.")

    async def response_stream():
        try:
            async for content in provider.stream(messages):
                yield json.dumps({"content": content}) + "\n"
            yield json.dumps({"done": True}) + "\n"
        except AIProviderError:
            yield json.dumps({"error": "The assistant is unavailable right now. Please try again."}) + "\n"

    return StreamingResponse(
        response_stream(),
        media_type="application/x-ndjson",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )