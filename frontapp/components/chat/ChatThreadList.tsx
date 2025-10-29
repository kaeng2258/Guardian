"use client";

import { useEffect, useState } from "react";

type ChatThread = {
  roomId: number;
  participant: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  online: boolean;
};

const MOCK_THREADS: ChatThread[] = [
  {
    roomId: 101,
    participant: "김가디언",
    lastMessage: "오늘 복약 확인했습니다.",
    lastMessageAt: "2025-10-28 09:42",
    unreadCount: 0,
    online: true
  },
  {
    roomId: 102,
    participant: "박케어",
    lastMessage: "긴급 호출 관련해서 연락 부탁드립니다.",
    lastMessageAt: "2025-10-28 07:13",
    unreadCount: 3,
    online: false
  }
];

export function ChatThreadList({
  onSelect
}: {
  onSelect: (roomId: number) => void;
}) {
  const [threads, setThreads] = useState<ChatThread[]>([]);

  useEffect(() => {
    setThreads(MOCK_THREADS);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">채팅 목록</h2>
        <span className="tag">ChatThread</span>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {threads.map((thread) => (
          <li
            key={thread.roomId}
            style={{
              padding: "0.9rem",
              borderBottom: "1px solid rgba(15,23,42,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
              cursor: "pointer"
            }}
            onClick={() => onSelect(thread.roomId)}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{thread.participant}</strong>
              <span className="muted">{thread.lastMessageAt}</span>
            </div>
            <span className="muted">{thread.lastMessage}</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span
                className={
                  thread.online ? "status-chip success" : "status-chip warning"
                }
              >
                {thread.online ? "온라인" : "오프라인"}
              </span>
              {thread.unreadCount > 0 && (
                <span className="status-chip info">
                  미확인 {thread.unreadCount}개
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
