"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Plus, Send, X } from "lucide-react";

type Role = "user" | "assistant";

interface ChatMessage {
  role: Role;
  content: string;
}

const greeting: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I’m the Cosmic Leaps Assistant. I can help you understand our services, approach, and how to get in touch. What would you like to know?",
};

const suggestions = [
  "What services does Cosmic Leaps provide?",
  "Who can benefit from Cosmic Leaps?",
  "How do I get started?",
];

const maxContextMessages = 8;

const apiUrl = process.env.NEXT_PUBLIC_ANALYTICS_API_URL ?? "http://127.0.0.1:8000";

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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(content: string) {
    content = content.trim();
    if (!content || isLoading) return;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-maxContextMessages) }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.detail ?? "The assistant is unavailable right now.");
      }
      if (!response.body) throw new Error("The assistant returned no response.");

      setMessages([...nextMessages, { role: "assistant", content: "" }]);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantContent = "";
      let completed = false;

      const processLine = (line: string) => {
        if (!line.trim()) return;
        const event = JSON.parse(line) as { content?: string; done?: boolean; error?: string };
        if (event.error) throw new Error(event.error);
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
    } catch {
      setMessages(nextMessages);
      setError("The assistant is unavailable right now. Please use the Contact section for further details.");
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
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {isOpen && (
        <section aria-label="Cosmic Leaps AI Assistant" className="mb-3 flex h-[min(620px,calc(100vh-6rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.2)]">
          <header className="flex items-center justify-between bg-[var(--brand-navy)] px-4 py-3 text-white">
            <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-white/15"><Bot size={19} /></span><div><h2 className="text-sm font-semibold text-white">Cosmic Leaps Assistant</h2><p className="text-xs text-white/70">Information about Cosmic Leaps</p></div></div>
            <div className="flex items-center gap-1"><button type="button" onClick={startNewConversation} aria-label="Start a new conversation" title="New conversation" className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white"><Plus size={17} /></button><button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" title="Close chat" className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white"><X size={18} /></button></div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--surface)] p-3" aria-live="polite">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-3 py-2.5 ${message.role === "user" ? "rounded-br-md bg-[var(--brand-navy)] text-white" : "rounded-bl-md border border-[var(--border)] bg-white text-[var(--text-primary)]"}`}><MarkdownMessage content={message.content} /></div></div>)}
            {messages.length === 1 && <div className="space-y-2 pt-1"><p className="px-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Try a question</p>{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} className="block w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-left text-sm text-[var(--brand-navy)] transition hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]">{suggestion}</button>)}</div>}
            {isLoading && <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]"><span className="size-2 animate-pulse rounded-full bg-[var(--brand-green)]" /> Thinking...</div>}
            {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">{error} <a href="#contact" className="font-semibold underline">Contact us</a>.</p>}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[var(--border)] bg-white p-3"><label htmlFor="analytics-chat-input" className="sr-only">Ask Cosmic Leaps a question</label><input id="analytics-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={4000} placeholder="Ask about Cosmic Leaps..." className="min-w-0 flex-1 rounded-xl border border-[var(--border)] px-3 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--brand-navy)]" disabled={isLoading} /><button type="submit" aria-label="Send message" title="Send message" disabled={!input.trim() || isLoading} className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--brand-green)] text-white transition hover:bg-[var(--brand-green-hover)] disabled:cursor-not-allowed disabled:opacity-50"><Send size={17} /></button></form>
        </section>
      )}
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close Cosmic Leaps AI Assistant" : "Open Cosmic Leaps AI Assistant"} aria-expanded={isOpen} className="ml-auto grid size-14 place-items-center rounded-full bg-[var(--brand-green)] text-white shadow-[0_10px_30px_rgba(76,175,80,0.3)] transition hover:bg-[var(--brand-green-hover)]"><MessageCircle size={24} /></button>
    </div>
  );
}