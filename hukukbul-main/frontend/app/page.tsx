"use client";

import { useEffect, useRef, useState } from "react";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: { title?: string; url?: string; locator?: string; type?: string }[];
};

export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      text:
        "Merhaba! HukukBul’a hoş geldin.\n" +
        "Sorunu aşağıya yaz — ben de mevzuat ve emsal kararları temel alarak anlaşılır bir özetle yanıtlayayım.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function sendPrompt(text: string) {
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text },
    ]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, mode: "halk" }),
      });
      const data = await res.json();

      const reply =
        typeof data?.answer === "string"
          ? data.answer
          : "Üzgünüm, şu anda yanıt veremedim.";

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: reply,
          sources: Array.isArray(data?.sources) ? data.sources : [],
        },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            "İstek sırasında bir hata oluştu. Birazdan yeniden dener misin?\n\n" +
            String(e),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    await sendPrompt(q);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const q = input.trim();
      if (!q || loading) return;
      setInput("");
      void sendPrompt(q);
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={styles.logoDot} />
          <h1 style={styles.title}>HukukBul</h1>
        </div>
        <div style={styles.headerRight}>MVP</div>
      </header>

      <main style={styles.main}>
        <div ref={scrollerRef} style={styles.chatScroll}>
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} text={m.text} sources={m.sources} />
          ))}
          {loading && <TypingBubble />}
        </div>

        <form onSubmit={handleSubmit} style={styles.inputBar}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ör: Boşanma davasında nafaka nasıl belirlenir? (Enter: gönder, Shift+Enter: yeni satır)"
            rows={1}
            style={styles.textarea}
          />
          <button type="submit" disabled={loading || !input.trim()} style={styles.sendBtn}>
            Gönder
          </button>
        </form>

        <p style={styles.footerNote}>
          ⚠️ Buradaki yanıtlar hukuki danışmanlık değildir; mevzuat ve emsal referanslarıyla bilgi amaçlıdır.
        </p>
      </main>
    </div>
  );
}

function ChatBubble({
  role,
  text,
  sources,
}: {
  role: "user" | "assistant";
  text: string;
  sources?: { title?: string; url?: string; locator?: string; type?: string }[];
}) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          ...styles.bubble,
          background: isUser ? "#2563eb" : "#f3f4f6",
          color: isUser ? "white" : "#111827",
          borderTopLeftRadius: isUser ? 16 : 4,
          borderTopRightRadius: isUser ? 4 : 16,
        }}
      >
        {!isUser && <div style={styles.roleBadge}>Asistan</div>}
        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{text}</div>

        {!isUser && sources && sources.length > 0 && (
          <div style={styles.sourcesWrap}>
            {sources.slice(0, 5).map((s, i) => (
              <a
                key={i}
                href={s.url || "#"}
                target="_blank"
                rel="noreferrer"
                style={styles.sourcePill}
                title={s.title || ""}
              >
                {(s.type ? s.type + ":" : "") +
                  (s.locator || s.title || "kaynak")}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
      <div style={{ ...styles.bubble, background: "#f3f4f6", color: "#111827" }}>
        <div style={styles.roleBadge}>Asistan</div>
        <div style={styles.typingDots}>
          <span style={styles.dot} />
          <span style={{ ...styles.dot, animationDelay: "0.15s" }} />
          <span style={{ ...styles.dot, animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}

/* -------- inline “CSS-in-JS” stilleri -------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0b1220 0%, #0f172a 100%)",
    color: "#e5e7eb",
  },
  header: {
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    backdropFilter: "blur(6px)",
  },
  logoDot: {
    width: 10,
    height: 10,
    background: "#22d3ee",
    borderRadius: 999,
    boxShadow: "0 0 10px #22d3ee",
  },
  title: { fontSize: 18, margin: 0 },
  headerRight: {
    fontSize: 12,
    opacity: 0.7,
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "2px 8px",
    borderRadius: 8,
  },
  main: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px 12px 80px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  chatScroll: {
    background: "rgba(17,24,39,0.55)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 16,
    height: "65vh",
    overflowY: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25) inset",
  },
  bubble: {
    maxWidth: "80%",
    padding: "12px 14px",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
    fontSize: 15,
  },
  roleBadge: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.3,
    opacity: 0.7,
    marginBottom: 6,
  },
  sourcesWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  sourcePill: {
    fontSize: 12,
    background: "#111827",
    color: "#e5e7eb",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "4px 8px",
    borderRadius: 999,
    textDecoration: "none",
    opacity: 0.9,
  },
  inputBar: {
    display: "flex",
    gap: 8,
    background: "rgba(17,24,39,0.75)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 8,
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1,
    resize: "vertical",
    minHeight: 44,
    maxHeight: 180,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(2,6,23,0.5)",
    color: "#e5e7eb",
    borderRadius: 10,
    padding: "10px 12px",
    outline: "none",
    fontFamily: "inherit",
    fontSize: 14.5,
  },
  sendBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    background: "#22c55e",
    color: "#0b1220",
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    opacity: 1,
  },
  footerNote: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
    marginTop: 8,
  },
  typingDots: {
    display: "inline-flex",
    gap: 6,
    alignItems: "center",
    height: 18,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "#6b7280",
    animation: "pulse 1s infinite ease-in-out",
  } as React.CSSProperties,
};

// basit puls animasyonu için style tag (Next.js client component içinde kullanılabilir)
if (typeof document !== "undefined") {
  const id = "hukukbul-inline-anim";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes pulse {
        0% { opacity: .3; transform: translateY(0) }
        50% { opacity: 1; transform: translateY(-2px) }
        100% { opacity: .3; transform: translateY(0) }
      }
    `;
    document.head.appendChild(style);
  }
}
