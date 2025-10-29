import { ProviderDashboard } from "../../../components/dashboard/ProviderDashboard";

export const metadata = {
  title: "Provider 대시보드 | Guardian Front",
  description: "담당 환자 관리, 복약 상태, 긴급 호출 이력을 확인합니다."
};

export default function ProviderDashboardPage() {
  return <ProviderDashboard />;
}
