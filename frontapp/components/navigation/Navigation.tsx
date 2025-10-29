"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/login", label: "로그인" },
  { href: "/signup", label: "회원가입" },
  { href: "/client/dashboard", label: "Client 대시보드" },
  { href: "/provider/dashboard", label: "Provider 대시보드" },
  { href: "/admin/dashboard", label: "Admin 대시보드" },
  { href: "/drug-info", label: "약학정보 검색" },
  { href: "/chat", label: "채팅" },
  { href: "/video", label: "영상통화" },
  { href: "/emergency", label: "긴급 호출" }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-title">Guardian Front</div>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                pathname === link.href ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
