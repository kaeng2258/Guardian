"use client";

import { useEffect, useState } from "react";

type EmergencyAlert = {
  alertId: number;
  type: string;
  status: "PENDING" | "RECEIVED_BY_PROVIDER" | "ACKNOWLEDGED" | "RESOLVED";
  alertTime: string;
  resolvedAt?: string;
  memo?: string;
};

const MOCK_ALERTS: EmergencyAlert[] = [
  {
    alertId: 7001,
    type: "긴급 호출 (Client → Provider)",
    status: "PENDING",
    alertTime: "2025-10-28 19:22"
  },
  {
    alertId: 7002,
    type: "위치 공유 승인",
    status: "RECEIVED_BY_PROVIDER",
    alertTime: "2025-10-28 18:05",
    memo: "현장 출동 요청 진행 중"
  }
];

const STATUS_LABEL: Record<EmergencyAlert["status"], string> = {
  PENDING: "대기",
  RECEIVED_BY_PROVIDER: "수신",
  ACKNOWLEDGED: "확인",
  RESOLVED: "종료"
};

const STATUS_CLASS: Record<EmergencyAlert["status"], string> = {
  PENDING: "status-chip warning",
  RECEIVED_BY_PROVIDER: "status-chip info",
  ACKNOWLEDGED: "status-chip info",
  RESOLVED: "status-chip success"
};

export function EmergencyPanel() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);

  useEffect(() => {
    setAlerts(MOCK_ALERTS);
  }, []);

  const handleAcknowledge = async (alertId: number) => {
    // TODO API 연동
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.alertId === alertId
          ? {
              ...alert,
              status: "ACKNOWLEDGED",
              resolvedAt: new Date().toISOString(),
              memo: "응답 확인 완료"
            }
          : alert
      )
    );
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">긴급 호출</h2>
        <span className="tag">Emergency Alert</span>
      </div>
      <p className="muted">
        Client ↔ Provider 간 호출 요청/응답 시나리오를 간단히 재현합니다. 위치
        정보, 수신 확인 시간 등을 표시합니다.
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>알림 ID</th>
            <th>유형</th>
            <th>상태</th>
            <th>발생 시각</th>
            <th>메모</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.alertId}>
              <td>#{alert.alertId}</td>
              <td>{alert.type}</td>
              <td>
                <span className={STATUS_CLASS[alert.status]}>
                  {STATUS_LABEL[alert.status]}
                </span>
              </td>
              <td>{alert.alertTime}</td>
              <td>{alert.memo ?? "-"}</td>
              <td>
                {alert.status === "PENDING" && (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => handleAcknowledge(alert.alertId)}
                  >
                    수신 확인
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
