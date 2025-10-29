import { ClientDashboard } from "../../../components/dashboard/ClientDashboard";

export const metadata = {
  title: "Client 대시보드 | Guardian Front",
  description: "복약 계획, 기록, 담당자 정보를 확인하는 마이페이지"
};

export default function ClientDashboardPage() {
  return <ClientDashboard />;
}
