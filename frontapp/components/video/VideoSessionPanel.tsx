"use client";

import { useEffect, useState } from "react";

type VideoSession = {
  sessionId: number;
  caller: string;
  receiver: string;
  status: "REQUESTED" | "ACTIVE" | "ENDED" | "MISSED";
  startedAt: string;
  endedAt?: string;
  qualityScore?: number;
};

const MOCK_SESSIONS: VideoSession[] = [
  {
    sessionId: 4001,
    caller: "김가디언",
    receiver: "이혜성 간호사",
    status: "ENDED",
    startedAt: "2025-10-28 10:00",
    endedAt: "2025-10-28 10:18",
    qualityScore: 4.6
  },
  {
    sessionId: 4002,
    caller: "박케어",
    receiver: "최도현 간호사",
    status: "REQUESTED",
    startedAt: "2025-10-29 09:40"
  }
];

const STATUS_CLASS_MAP: Record<VideoSession["status"], string> = {
  REQUESTED: "status-chip info",
  ACTIVE: "status-chip success",
  ENDED: "status-chip success",
  MISSED: "status-chip warning"
};

export function VideoSessionPanel() {
  const [sessions, setSessions] = useState<VideoSession[]>([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setSessions(MOCK_SESSIONS);
  }, []);

  const handleCreateSession = async () => {
    setCreating(true);
    try {
      // TODO 실제 API 호출
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSessions((prev) => [
        {
          sessionId: Date.now(),
          caller: "나 (Provider)",
          receiver: "김가디언",
          status: "ACTIVE",
          startedAt: new Date().toISOString().slice(0, 16).replace("T", " ")
        },
        ...prev
      ]);
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">영상 통화 세션</h2>
        <span className="tag">VideoSession</span>
      </div>
      <p className="muted">
        WebRTC 기반 통화 요청/응답 흐름을 가정한 UI입니다. 실제 통화 품질 지표는
        통계 카드로 요약합니다.
      </p>
      <button className="btn btn-primary" type="button" onClick={handleCreateSession} disabled={creating}>
        {creating ? "세션 생성 중..." : "새 통화 요청"}
      </button>

      <table className="table" style={{ marginTop: "1.2rem" }}>
        <thead>
          <tr>
            <th>세션 ID</th>
            <th>참여자</th>
            <th>상태</th>
            <th>시작</th>
            <th>종료</th>
            <th>품질</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.sessionId}>
              <td>#{session.sessionId}</td>
              <td>
                {session.caller} → {session.receiver}
              </td>
              <td>
                <span className={STATUS_CLASS_MAP[session.status]}>
                  {session.status}
                </span>
              </td>
              <td>{session.startedAt}</td>
              <td>{session.endedAt ?? "-"}</td>
              <td>{session.qualityScore ? `${session.qualityScore.toFixed(1)} / 5` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
