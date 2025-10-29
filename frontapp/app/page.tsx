import Link from "next/link";

const FEATURE_CARDS = [
  {
    title: "로그인",
    description: "JWT 기반 로그인과 자동 로그인으로 빠르게 서비스에 접속하세요.",
    href: "/login",
    accent: "로그인 기능"
  },
  {
    title: "회원가입",
    description: "역할(환자/담당자)을 선택하고 온보딩을 이어서 진행할 수 있습니다.",
    href: "/signup",
    accent: "회원가입"
  },
  {
    title: "Client 마이페이지",
    description: "개인정보, 복약 계획과 기록을 한 화면에서 확인하세요.",
    href: "/client/dashboard",
    accent: "환자 정보 관리"
  },
  {
    title: "Provider 마이페이지",
    description: "담당 환자 현황과 긴급 호출 이력을 실시간으로 확인합니다.",
    href: "/provider/dashboard",
    accent: "담당자 관리"
  },
  {
    title: "Admin 배정/알림",
    description: "배정 관리, 긴급 호출 모니터링, 알림 로그를 제공합니다.",
    href: "/admin/dashboard",
    accent: "관리자 포털"
  }
];

export default function HomePage() {
  return (
    <section className="grid">
      <article className="card">
        <div className="card-header">
          <h1 className="card-title">Guardian Care Platform</h1>
          <span className="tag">Front-end Preview</span>
        </div>
        <p className="muted">
          이 프로토타입은 Next.js(App Router) 기반으로 제작된 가디언 케어
          플랫폼 프론트엔드입니다. 아직 API 연동 없이 UI 흐름과 상태만
          제공합니다.
        </p>
      </article>

      <div className="grid two">
        {FEATURE_CARDS.map((feature) => (
          <article key={feature.title} className="card">
            <div className="card-header">
              <h2 className="card-title">{feature.title}</h2>
              <span className="tag">{feature.accent}</span>
            </div>
            <p className="muted">{feature.description}</p>
            <Link className="btn btn-primary" href={feature.href}>
              바로가기
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
