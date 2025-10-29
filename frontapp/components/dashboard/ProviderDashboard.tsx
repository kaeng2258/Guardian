"use client";

import { useEffect, useState } from "react";

type ClientSummary = {
  clientId: number;
  clientName: string;
  medicationPlans: {
    id: number;
    medicine: string;
    alarmTime: string;
    status: "SCHEDULED" | "MISSED" | "COMPLETED";
  }[];
  latestMedicationLogs: {
    id: number;
    status: "TAKEN" | "LATE" | "SKIPPED";
    timestamp: string;
    notes?: string;
  }[];
  emergencyAlerts: {
    alertId: number;
    alertType: string;
    status: string;
    alertTime: string;
  }[];
};

type ProviderDashboardState = {
  providerName: string;
  activeAlertCount: number;
  pendingMedicationCount: number;
  clients: ClientSummary[];
};

const MOCK_PROVIDER_DATA: ProviderDashboardState = {
  providerName: "이혜성 간호사",
  activeAlertCount: 2,
  pendingMedicationCount: 5,
  clients: [
    {
      clientId: 301,
      clientName: "김가디언",
      medicationPlans: [
        { id: 1, medicine: "고혈압약", alarmTime: "08:00", status: "SCHEDULED" },
        { id: 2, medicine: "당뇨약", alarmTime: "20:00", status: "COMPLETED" }
      ],
      latestMedicationLogs: [
        {
          id: 5001,
          status: "TAKEN",
          timestamp: "2025-10-28 08:05"
        },
        {
          id: 5002,
          status: "LATE",
          timestamp: "2025-10-27 20:15",
          notes: "복용 지연 15분"
        }
      ],
      emergencyAlerts: [
        {
          alertId: 9001,
          alertType: "FALL_DETECTED",
          status: "PENDING",
          alertTime: "2025-10-28 19:22"
        }
      ]
    },
    {
      clientId: 302,
      clientName: "박케어",
      medicationPlans: [
        { id: 3, medicine: "치매약", alarmTime: "07:30", status: "MISSED" }
      ],
      latestMedicationLogs: [
        {
          id: 5101,
          status: "SKIPPED",
          timestamp: "2025-10-28 07:45",
          notes: "복용 누락 - 확인 필요"
        }
      ],
      emergencyAlerts: []
    }
  ]
};

const STATUS_LABEL_MAP: Record<string, string> = {
  SCHEDULED: "예정",
  MISSED: "미복용",
  COMPLETED: "완료",
  TAKEN: "복용 완료",
  LATE: "지연",
  SKIPPED: "미복용"
};

const STATUS_CLASS_MAP: Record<string, string> = {
  SCHEDULED: "status-chip info",
  MISSED: "status-chip warning",
  COMPLETED: "status-chip success",
  TAKEN: "status-chip success",
  LATE: "status-chip warning",
  SKIPPED: "status-chip warning",
  PENDING: "status-chip warning"
};

export function ProviderDashboard() {
  const [state, setState] = useState<ProviderDashboardState>();

  useEffect(() => {
    // TODO: 실제 API 연동 예정
    setState(MOCK_PROVIDER_DATA);
  }, []);

  if (!state) {
    return <div className="card">대시보드 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="grid">
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">{state.providerName} 님 환영합니다.</h2>
          <span className="tag">Provider Dashboard</span>
        </div>
        <div className="grid two">
          <div className="card">
            <h3 className="card-title" style={{ fontSize: "1.1rem" }}>
              긴급 호출
            </h3>
            <p className="muted">확인 대기 중인 건수</p>
            <p style={{ fontSize: "2rem", fontWeight: 700 }}>
              {state.activeAlertCount} 건
            </p>
          </div>
          <div className="card">
            <h3 className="card-title" style={{ fontSize: "1.1rem" }}>
              복약 체크
            </h3>
            <p className="muted">확인/코멘트가 필요한 일정</p>
            <p style={{ fontSize: "2rem", fontWeight: 700 }}>
              {state.pendingMedicationCount} 건
            </p>
          </div>
        </div>
      </section>

      {state.clients.map((client) => (
        <section key={client.clientId} className="card">
          <div className="card-header">
            <h2 className="card-title">{client.clientName}</h2>
            <span className="tag">Client #{client.clientId}</span>
          </div>

          <div className="grid two">
            <div>
              <h3 className="muted">복약 상태</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>약품</th>
                    <th>알람</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {client.medicationPlans.map((plan) => (
                    <tr key={plan.id}>
                      <td>{plan.medicine}</td>
                      <td>{plan.alarmTime}</td>
                      <td>
                        <span className={STATUS_CLASS_MAP[plan.status]}>
                          {STATUS_LABEL_MAP[plan.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="muted">최근 복약 로그</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>시간</th>
                    <th>상태</th>
                    <th>메모</th>
                  </tr>
                </thead>
                <tbody>
                  {client.latestMedicationLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.timestamp}</td>
                      <td>
                        <span className={STATUS_CLASS_MAP[log.status]}>
                          {STATUS_LABEL_MAP[log.status]}
                        </span>
                      </td>
                      <td>{log.notes ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {client.emergencyAlerts.length > 0 && (
            <div>
              <h3 className="muted">긴급 호출 이력</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>발생 시각</th>
                    <th>유형</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {client.emergencyAlerts.map((alert) => (
                    <tr key={alert.alertId}>
                      <td>{alert.alertTime}</td>
                      <td>{alert.alertType}</td>
                      <td>
                        <span className={STATUS_CLASS_MAP[alert.status] ?? "status-chip info"}>
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
