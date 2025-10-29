"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  sender: "CLIENT" | "PROVIDER" | "SYSTEM";
  content: string;
  sentAt: string;
  messageType: "TEXT" | "NOTICE";
};

const MOCK_MESSAGES: Record<number, ChatMessage[]> = {
  101: [
    {
      id: 1,
      sender: "SYSTEM",
      content: "채팅방이 생성되었습니다.",
      sentAt: "2025-10-27 09:00",
      messageType: "NOTICE"
    },
    {
      id: 2,
      sender: "CLIENT",
      content: "오늘 아침 약 복용했습니다!",
      sentAt: "2025-10-27 09:05",
      messageType: "TEXT"
    },
    {
      id: 3,
      sender: "PROVIDER",
      content: "확인했습니다. 오후 복약도 알람 나가요.",
      sentAt: "2025-10-27 09:06",
      messageType: "TEXT"
    }
  ],
  102: [
    {
      id: 1,
      sender: "SYSTEM",
      content: "긴급 호출이 전달되었습니다.",
      sentAt: "2025-10-28 07:10",
      messageType: "NOTICE"
    },
    {
      id: 2,
      sender: "CLIENT",
      content: "지금 상태 확인 부탁드려요.",
      sentAt: "2025-10-28 07:11",
      messageType: "TEXT"
    }
  ]
};

export function ChatWindow({ roomId }: { roomId: number | null }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!roomId) return;
    setMessages(MOCK_MESSAGES[roomId] ?? []);
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <div className="card">채팅방을 선택하세요.</div>;
  }

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "PROVIDER",
      content: input,
      sentAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      messageType: "TEXT"
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // TODO: 실제 WebSocket 전송으로 교체
  };

  return (
    <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="card-header">
        <h2 className="card-title">채팅</h2>
        <span className="tag">ChatMessage</span>
      </div>

      <div
        style={{
          maxHeight: "380px",
          overflowY: "auto",
          padding: "0.5rem",
          borderRadius: "0.75rem",
          border: "1px solid rgba(15,23,42,0.08)",
          background: "rgba(248,250,252,0.6)",
          display: "grid",
          gap: "0.75rem"
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              alignSelf: message.sender === "PROVIDER" ? "end" : "start",
              maxWidth: "70%",
              padding: "0.65rem 0.85rem",
              borderRadius: "0.9rem",
              background:
                message.sender === "PROVIDER"
                  ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                  : message.sender === "SYSTEM"
                  ? "rgba(15,23,42,0.08)"
                  : "white",
              color:
                message.sender === "PROVIDER"
                  ? "white"
                  : message.sender === "SYSTEM"
                  ? "#1f2937"
                  : "#1f2937",
              boxShadow:
                message.sender === "SYSTEM"
                  ? "none"
                  : "0 10px 18px rgba(15, 23, 42, 0.12)"
            }}
          >
            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              {message.sender === "PROVIDER"
                ? "나 (Provider)"
                : message.sender === "CLIENT"
                ? "클라이언트"
                : "시스템"}
            </div>
            <div>{message.content}</div>
            <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>{message.sentAt}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        className="form"
        onSubmit={handleSend}
        style={{ borderTop: "1px solid rgba(15,23,42,0.08)", paddingTop: "1rem" }}
      >
        <textarea
          className="form-textarea"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          전송
        </button>
      </form>
    </section>
  );
}
