import "../styles/globals.css";
import { ReactNode } from "react";
import { Navigation } from "../components/navigation/Navigation";

export const metadata = {
  title: {
    default: "Guardian Front",
    template: "%s | Guardian Front"
  },
  description: "Guardian 케어 플랫폼 프런트엔드 프로토타입"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        <main className="page-container">{children}</main>
      </body>
    </html>
  );
}
