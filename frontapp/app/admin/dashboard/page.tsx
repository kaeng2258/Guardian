import { AdminDashboard } from "../../../components/dashboard/AdminDashboard";

export const metadata = {
  title: "Admin 대시보드 | Guardian Front",
  description:
    "배정 관리, 긴급 호출 모니터링, 알림 로그를 통합적으로 확인합니다."
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
