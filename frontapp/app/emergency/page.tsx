import { EmergencyPanel } from "../../components/emergency/EmergencyPanel";

export const metadata = {
  title: "긴급 호출 | Guardian Front",
  description: "Client → Provider 호출 및 수신 플로우 UI"
};

export default function EmergencyPage() {
  return <EmergencyPanel />;
}
