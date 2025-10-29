"use client";

import { useEffect, useState } from "react";

type MedicationPlan = {
  id: number;
  medicine: string;
  dosageAmount: number;
  dosageUnit: string;
  daysOfWeek: string[];
  alarmTime: string;
  active: boolean;
};

type MedicationLog = {
  id: number;
  medicine: string;
  timestamp: string;
  notes?: string;
};

type ProviderInfo = {
  matchId: number;
  name: string;
  email: string;
  current: boolean;
};

type ClientDashboardData = {
  profile: {
    name: string;
    email: string;
    address: string;
    age: number;
    medicalNotes?: string;
    medicationCycle: string;
  };
  plans: MedicationPlan[];
  logs: MedicationLog[];
  provider?: ProviderInfo;
};

const MOCK_DATA: ClientDashboardData = {
  profile: {
    name: "김가디언",
    email: "client@example.com",
    address: "서울특별시 성동구 왕십리로 00",
    age: 78,
    medicalNotes: "고혈압 및 당뇨 증상 관리 중.",
    medicationCycle: "매일 / 식후 30분"
  },
  plans: [
    {
      id: 1,
      medicine: "고혈압약 (아모르탄정)",
      dosageAmount: 1,
      dosageUnit: "정",
      daysOfWeek: ["월", "화", "수", "목", "금", "토", "일"],
      alarmTime: "08:00",
      active: true
    },
    {
      id: 2,
      medicine: "당뇨약 (자누메트정)",
      dosageAmount: 1,
      dosageUnit: "정",
      daysOfWeek: ["월", "수", "금"],
      alarmTime: "20:00",
      active: true
    }
  ],
  logs: [
    {
      id: 101,
      medicine: "고혈압약 (아모르탄정)",
      timestamp: "2025-10-28 08:05",
      notes: "정상 복용"
    },
    {
      id: 102,
      medicine: "당뇨약 (자누메트정)",
      timestamp: "2025-10-27 20:12",
      notes: "복용 후 혈당 체크 필요"
    }
  ],
  provider: {
    matchId: 501,
    name: "이혜성 간호사",
    email: "provider@example.com",
    current: true
  }
};

export function ClientDashboard() {
  const [data, setData] = useState<ClientDashboardData>();

  useEffect(() => {
    // TODO: API 연동 시 아래 fetch 호출로 대체
    // fetch("/api/client/dashboard?clientId=1").then(...)
    setData(MOCK_DATA);
  }, []);

  if (!data) {
    return <div className="card">로딩 중...</div>;
  }

  return (
    <div className="grid">
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">개인 정보</h2>
          <span className="tag">마이페이지</span>
        </div>
        <div className="grid two">
          <div>
            <h3 className="muted">기본 정보</h3>
            <p>
              <strong>이름:</strong> {data.profile.name}
            </p>
            <p>
              <strong>이메일:</strong> {data.profile.email}
            </p>
            <p>
              <strong>나이:</strong> {data.profile.age}세
            </p>
            <p>
              <strong>주소:</strong> {data.profile.address}
            </p>
          </div>
          <div>
            <h3 className="muted">복약 관리 정보</h3>
            <p>
              <strong>복약 주기:</strong> {data.profile.medicationCycle}
            </p>
            <p>
              <strong>의료 메모:</strong> {data.profile.medicalNotes ?? "-"}
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">복약 계획</h2>
          <span className="tag">MedicationPlan</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>약품</th>
              <th>용량</th>
              <th>요일</th>
              <th>알람</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {data.plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.medicine}</td>
                <td>
                  {plan.dosageAmount} {plan.dosageUnit}
                </td>
                <td>{plan.daysOfWeek.join(", ")}</td>
                <td>{plan.alarmTime}</td>
                <td>
                  <span
                    className={
                      plan.active ? "status-chip success" : "status-chip warning"
                    }
                  >
                    {plan.active ? "활성" : "비활성"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">복약 기록</h2>
          <span className="tag">MedicationIntakeLog</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>시간</th>
              <th>약품</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            {data.logs.map((log) => (
              <tr key={log.id}>
                <td>{log.timestamp}</td>
                <td>{log.medicine}</td>
                <td>{log.notes ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {data.provider && (
        <section className="card">
          <div className="card-header">
            <h2 className="card-title">담당 Provider</h2>
            <span className="tag">CareAssignment</span>
          </div>
          <p>
            <strong>담당자:</strong> {data.provider.name} (
            {data.provider.email})
          </p>
          <p>
            <strong>배정 상태:</strong>{" "}
            <span
              className={
                data.provider.current ? "status-chip success" : "status-chip warning"
              }
            >
              {data.provider.current ? "활성 배정" : "종료됨"}
            </span>
          </p>
        </section>
      )}
    </div>
  );
}
