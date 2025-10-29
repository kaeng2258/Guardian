"use client";

import { useEffect, useState } from "react";

type NotificationLog = {
  id: number;
  target: string;
  type: string;
  status: "SENT" | "FAILED" | "PENDING";
  sentAt: string;
  failReason?: string;
};

type EmergencySnapshot = {
  alertId: number;
  clientName: string;
  status: string;
  alertTime: string;
};

type Assignment = {
  matchId: number;
  client: string;
  provider: string;
  status: "ACTIVE" | "PAUSED" | "ENDED";
};

type AdminDashboardData = {
  stats: {
    totalClients: number;
    totalProviders: number;
    activeMatches: number;
  };
  emergencyAlerts: EmergencySnapshot[];
  notifications: NotificationLog[];
  assignments: Assignment[];
};

const MOCK_ADMIN_DATA: AdminDashboardData = {
  stats: {
    totalClients: 124,
    totalProviders: 38,
    activeMatches: 102
  },
  emergencyAlerts: [
    {
      alertId: 8001,
      clientName: "김가디언",
      status: "PENDING",
      alertTime: "2025-10-28 19:22"
    },
    {
      alertId: 8002,
      clientName: "박케어",
      status: "RECEIVED_BY_PROVIDER",
      alertTime: "2025-10-28 18:05"
    }
  ],
  notifications: [
    {
      id: 9101,
      target: "김가디언",
      type: "MED_REMINDER",
      status: "SENT",
      sentAt: "2025-10-28 08:00"
    },
    {
      id: 9102,
      target: "Provider 전용",
      type: "EMERGENCY",
      status: "FAILED",
      sentAt: "2025-10-28 19:22",
      failReason: "FCM Token 만료"
    }
  ],
  assignments: [
    {
      matchId: 6001,
      client: "김가디언",
      provider: "이혜성 간호사",
      status: "ACTIVE"
    },
    {
      matchId: 6002,
      client: "박케어",
      provider: "최도현 간호사",
      status: "PAUSED"
    }
  ]
};

const STATUS_CLASS_MAP: Record<string, string> = {
  ACTIVE: "status-chip success",
  PAUSED: "status-chip warning",
  ENDED: "status-chip warning",
  SENT: "status-chip success",
  FAILED: "status-chip warning",
  PENDING: "status-chip warning",
  RECEIVED_BY_PROVIDER: "status-chip info"
};

export function AdminDashboard() {
  const [data, setData] = useState<AdminDashboardData>();

  useEffect(() => {
    // TODO API 연동
    setData(MOCK_ADMIN_DATA);
  }, []);

  if (!data) {
    return <div className="card">관리자 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="grid">
      <section className="card">
        <div className="grid two">
          <div>
            <h2 className="card-title">총 환자 수</h2>
            <p style={{ fontSize: "2rem", fontWeight: 700 }}>
              {data.stats.totalClients} 명
            </p>
          </div>
          <div>
            <h2 className="card-title">총 Provider 수</h2>
            <p style={{ fontSize: "2rem", fontWeight: 700 }}>
              {data.stats.totalProviders} 명
            </p>
          </div>
        </div>
        <p className="muted">
          활성 배정:{" "}
          <strong>{data.stats.activeMatches.toLocaleString()}</strong> 건
        </p>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">긴급 호출 현황</h2>
          <span className="tag">Emergency Alerts</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>발생 시각</th>
              <th>클라이언트</th>
              <th>상태</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            {data.emergencyAlerts.map((alert) => (
              <tr key={alert.alertId}>
                <td>{alert.alertTime}</td>
                <td>{alert.clientName}</td>
                <td>
                  <span className={STATUS_CLASS_MAP[alert.status] ?? "status-chip info"}>
                    {alert.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary" type="button">
                    상세 보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">배정 관리</h2>
          <span className="tag">Care Assignment</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>클라이언트</th>
              <th>Provider</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {data.assignments.map((match) => (
              <tr key={match.matchId}>
                <td>{match.client}</td>
                <td>{match.provider}</td>
                <td>
                  <span className={STATUS_CLASS_MAP[match.status]}>
                    {match.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">알림 로그</h2>
          <span className="tag">Notification</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>발송 대상</th>
              <th>유형</th>
              <th>상태</th>
              <th>발송 시각</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {data.notifications.map((item) => (
              <tr key={item.id}>
                <td>{item.target}</td>
                <td>{item.type}</td>
                <td>
                  <span className={STATUS_CLASS_MAP[item.status]}>
                    {item.status}
                  </span>
                </td>
                <td>{item.sentAt}</td>
                <td>{item.failReason ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
