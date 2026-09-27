"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Minus, Orbit, Plus, Send, Sparkles, X } from "lucide-react";

type Role = "user" | "assistant";

interface ChatMessage {
  role: Role;
  content: string;
}

const greeting: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm the Cosmic Leaps Assistant. I can help you understand our services, approach, and how to get in touch. What would you like to know?",
};

const suggestions = [
  "What services does Cosmic Leaps provide?",
  "Who can benefit from Cosmic Leaps?",
  "How do I get started?",
];

const maxContextMessages = 8;

const chatEndpoint = "/api/chat";

interface ChatApiFailure {
  code?: string;
  message?: string;
  endpoint?: string;
  backendUrl?: string;
  ollamaUrl?: string;
  model?: string;
  detail?: string;
}

function isProviderFailure(code?: string) {
  return code === "provider_unavailable" || code === "model_unavailable";
}

function unavailableMessage(code?: string) {
  return isProviderFailure(code)
    ? "The AI service is temporarily unavailable. Please try again shortly."
    : "The assistant is temporarily unavailable. Please try again in a moment or contact Cosmic Leaps directly.";
}

function logChatFailure(
  failure: ChatApiFailure,
  status: number | string,
  endpoint: string,
  fallbackMessage: string
) {
  const message = failure.message ?? failure.detail ?? fallbackMessage;
  if (isProviderFailure(failure.code)) {
    console.error("[Chatbot] AI provider unavailable", {
      status,
      endpoint: failure.ollamaUrl ?? endpoint,
      model: failure.model,
      message,
    });
    return;
  }

  console.error("[Chatbot] API request failed", {
    status,
    endpoint: failure.endpoint ?? failure.backendUrl ?? endpoint,
    message,
  });
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\s)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link) {
      return <a key={index} href={link[2]} className="underline" target={link[2].startsWith("http") ? "_blank" : undefined} rel="noreferrer">{link[1]}</a>;
    }
    return <span key={index}>{part}</span>;
  });
}

function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="space-y-2 whitespace-pre-wrap break-words text-sm leading-6">
      {content.split("\n").map((line, index) => {
        const listItem = line.match(/^[-*]\s+(.+)/);
        return listItem ? (
          <div key={index} className="flex gap-2"><span aria-hidden="true">•</span><span>{renderInlineMarkdown(listItem[1])}</span></div>
        ) : <div key={index}>{renderInlineMarkdown(line)}</div>;
      })}
    </div>
  );
}

export function AnalyticsChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const availabilityRequestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();
    availabilityRequestRef.current = controller;
    setError("");

    void fetch(chatEndpoint, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const failure = (await response.json().catch(() => ({}))) as ChatApiFailure;
        if (controller.signal.aborted || response.ok) return;

        logChatFailure(failure, response.status, chatEndpoint, response.statusText);
        setError(unavailableMessage(failure.code));
      })
      .catch((caughtError: unknown) => {
        if (controller.signal.aborted) return;

        const message = caughtError instanceof Error ? caughtError.message : String(caughtError);
        logChatFailure({}, "network error", chatEndpoint, message);
        setError(unavailableMessage("backend_unavailable"));
      });

    return () => {
      controller.abort();
      if (availabilityRequestRef.current === controller) {
        availabilityRequestRef.current = null;
      }
    };
  }, [isOpen]);

  async function sendMessage(content: string) {
    content = content.trim();
    if (!content || isLoading) return;
    availabilityRequestRef.current?.abort();
    availabilityRequestRef.current = null;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);
    const endpoint = chatEndpoint;
    let status: number | "network error" = "network error";
    let failureDetail = "";
    let failureCode = "";
    let failureInfo: ChatApiFailure = {};

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-maxContextMessages) }),
      });
      status = response.status;
      if (!response.ok) {
        failureInfo = (await response.json().catch(() => ({}))) as ChatApiFailure;
        failureCode = failureInfo.code ?? "backend_unavailable";
        failureDetail = failureInfo.message ?? failureInfo.detail ?? response.statusText;
        throw new Error(failureDetail || "The API request failed.");
      }
      if (!response.body) {
        failureDetail = "The API returned no response body.";
        throw new Error(failureDetail);
      }

      setMessages([...nextMessages, { role: "assistant", content: "" }]);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantContent = "";
      let completed = false;

      const processLine = (line: string) => {
        if (!line.trim()) return;
        const event = JSON.parse(line) as {
          content?: string;
          done?: boolean;
          error?: string;
          code?: string;
        };
        if (event.error) {
          failureCode = event.code ?? "provider_unavailable";
          failureDetail = event.error;
          failureInfo = {
            code: failureCode,
            message: event.error,
            endpoint: "endpoint" in event ? String(event.endpoint) : undefined,
            backendUrl: "backendUrl" in event ? String(event.backendUrl) : undefined,
            ollamaUrl: "ollamaUrl" in event ? String(event.ollamaUrl) : undefined,
            model: "model" in event ? String(event.model) : undefined,
          };
          throw new Error(event.error);
        }
        if (event.content) {
          assistantContent += event.content;
          setMessages([...nextMessages, { role: "assistant", content: assistantContent }]);
        }
        if (event.done) completed = true;
      };

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        lines.forEach(processLine);
        if (done) break;
      }
      if (buffer.trim()) processLine(buffer);
      if (!completed || !assistantContent) throw new Error("The assistant returned an incomplete response.");
    } catch (caughtError) {
      const errorMessage = caughtError instanceof Error ? caughtError.message : String(caughtError);
      const code = failureCode || failureInfo.code || "backend_unavailable";
      logChatFailure(
        { ...failureInfo, code, message: failureDetail || failureInfo.message || errorMessage },
        status,
        endpoint,
        errorMessage
      );
      setMessages(nextMessages);
      setError(unavailableMessage(code));
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function startNewConversation() {
    setMessages([greeting]);
    setInput("");
    setError("");
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <section
        aria-label="Cosmic Leaps AI Assistant"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`absolute right-0 bottom-[calc(3.5rem+0.75rem)] flex h-[min(620px,calc(100dvh-6rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[rgba(100,180,255,0.25)] bg-[rgba(8,14,35,0.88)] text-[#F4F7FF] shadow-[0_20px_60px_rgba(0,0,0,0.48),0_0_30px_rgba(53,167,255,0.12)] backdrop-blur-[20px] transition-[opacity,transform] duration-200 ease-out ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-[0.97] opacity-0"}`}
      >
          <header className="flex items-center justify-between border-b border-white/10 bg-[linear-gradient(120deg,rgba(11,24,54,0.96),rgba(25,22,58,0.9))] px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="group relative grid size-10 shrink-0 place-items-center rounded-full border border-cyan-200/45 bg-[linear-gradient(145deg,rgba(26,69,112,0.72),rgba(38,27,80,0.72))] text-cyan-100 shadow-[0_0_18px_rgba(53,167,255,0.2),inset_0_0_12px_rgba(139,92,246,0.12)] transition duration-300 hover:border-cyan-100/80 hover:shadow-[0_0_24px_rgba(53,167,255,0.34),0_0_30px_rgba(139,92,246,0.2)]">
                <Orbit size={21} strokeWidth={1.8} className="drop-shadow-[0_0_5px_rgba(80,210,255,0.55)]" />
                <Sparkles size={11} className="absolute top-1 right-1 text-violet-200 drop-shadow-[0_0_5px_rgba(167,139,250,0.8)]" />
              </span>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-white">Cosmic Leaps Assistant</h2>
                <p className="text-xs text-[#B7C4D9]">Information about Cosmic Leaps</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" onClick={startNewConversation} aria-label="Start a new conversation" title="New conversation" className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.025] !text-cyan-50/75 transition duration-200 hover:border-cyan-200/35 hover:bg-cyan-200/[0.08] hover:!text-white hover:shadow-[0_0_14px_rgba(53,167,255,0.2),0_0_18px_rgba(139,92,246,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081023]"><Plus size={16} /></button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Minimize chat" title="Minimize chat" className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.025] !text-cyan-50/75 transition duration-200 hover:border-cyan-200/35 hover:bg-cyan-200/[0.08] hover:!text-white hover:shadow-[0_0_14px_rgba(53,167,255,0.2),0_0_18px_rgba(139,92,246,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081023]"><Minus size={16} /></button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" title="Close chat" className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.025] !text-cyan-50/75 transition duration-200 hover:border-violet-200/35 hover:bg-violet-200/[0.08] hover:!text-white hover:shadow-[0_0_14px_rgba(53,167,255,0.18),0_0_18px_rgba(139,92,246,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081023]"><X size={16} /></button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(52,79,144,0.16),transparent_65%),rgba(5,12,30,0.48)] p-3" aria-live="polite">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-3 py-2.5 transition ${message.role === "user" ? "rounded-br-md border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(21,43,91,0.96),rgba(43,35,91,0.9))] text-white hover:shadow-[0_0_18px_rgba(53,167,255,0.13)]" : "rounded-bl-md border border-[rgba(116,156,255,0.22)] bg-[rgba(10,18,40,0.72)] text-[#F5F7FF] shadow-[0_4px_18px_rgba(5,12,30,0.18)] backdrop-blur-md"}`}><MarkdownMessage content={message.content} /></div></div>)}
            {messages.length === 1 && <div className="space-y-2 pt-1"><p className="px-1 text-xs font-medium uppercase tracking-wide text-[#91A6C5]">Try a question</p>{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} className="block w-full rounded-xl border border-cyan-200/10 bg-[rgba(10,18,40,0.55)] px-3 py-2 text-left text-sm !text-[#DCE9FC] transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] hover:!text-white">{suggestion}</button>)}</div>}
            {isLoading && <div className="flex items-center gap-2 px-1 py-1 text-xs text-[#B7C4D9]" role="status" aria-label="Assistant is thinking"><span className="flex items-center gap-1.5"><span className="size-1.5 animate-pulse rounded-full bg-cyan-300" /><span className="size-1.5 animate-pulse rounded-full bg-violet-300 [animation-delay:180ms]" /><span className="size-1.5 animate-pulse rounded-full bg-blue-300 [animation-delay:360ms]" /></span><span>Thinking...</span></div>}
            {error && <p className="rounded-xl border border-red-300/20 bg-red-950/30 px-3 py-2 text-xs leading-5 text-[#F4D9E0]">{error} <a href="#contact" className="font-semibold text-cyan-200 underline decoration-cyan-200/50">Contact us</a>.</p>}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 bg-[rgba(5,12,30,0.75)] p-3"><label htmlFor="analytics-chat-input" className="sr-only">Ask Cosmic Leaps a question</label><input id="analytics-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={4000} placeholder="Ask about Cosmic Leaps..." className="min-w-0 flex-1 rounded-xl border border-[rgba(100,180,255,0.25)] !bg-[rgba(5,12,30,0.75)] px-3 text-sm !text-[#F4F7FF] outline-none placeholder:text-[#8294B1] focus:border-cyan-300/50 focus:shadow-[0_0_16px_rgba(53,167,255,0.13)]" disabled={isLoading} /><button type="submit" aria-label="Send message" title="Send message" disabled={!input.trim() || isLoading} className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-200/30 bg-[rgba(10,18,42,0.88)] !text-cyan-100 shadow-[0_0_14px_rgba(53,167,255,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-100/75 hover:!bg-[rgba(18,34,68,0.96)] hover:!text-white hover:shadow-[0_0_18px_rgba(53,167,255,0.28),0_0_22px_rgba(139,92,246,0.12)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_14px_rgba(53,167,255,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081023]"><Send size={17} /></button></form>
        </section>
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close chat" : "Open chat"} aria-expanded={isOpen} className="pointer-events-auto group relative ml-auto grid size-14 place-items-center rounded-full border border-cyan-200/55 bg-[radial-gradient(circle_at_35%_28%,rgba(44,91,153,0.5),rgba(8,14,35,0.98)_70%)] !text-cyan-100 shadow-[0_8px_28px_rgba(0,0,0,0.42),0_0_22px_rgba(53,167,255,0.28),inset_0_0_15px_rgba(139,92,246,0.1)] transition duration-200 after:pointer-events-none after:absolute after:-inset-1 after:rounded-full after:border after:border-cyan-200/25 after:opacity-70 after:content-[''] after:animate-[pulse_4s_ease-in-out_infinite] hover:scale-[1.05] hover:border-cyan-100/90 hover:!text-white hover:shadow-[0_0_30px_rgba(53,167,255,0.4),0_0_40px_rgba(139,92,246,0.16),inset_0_0_16px_rgba(53,167,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081023]">
        <Orbit size={25} strokeWidth={1.8} className="drop-shadow-[0_0_7px_rgba(90,220,255,0.8)]" />
        <Sparkles size={12} className="absolute top-[13px] right-[13px] text-violet-200 drop-shadow-[0_0_6px_rgba(167,139,250,0.9)]" />
      </button>
    </div>
  );
}