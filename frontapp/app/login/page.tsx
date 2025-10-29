import { LoginForm } from "../../components/forms/LoginForm";

export const metadata = {
  title: "로그인 | Guardian Front",
  description: "JWT 기반 로그인 화면"
};

export default function LoginPage() {
  return (
    <section className="card">
      <div className="card-header">
        <h1 className="card-title">로그인</h1>
        <span className="tag">JWT + Refresh Token</span>
      </div>
      <p className="muted">
        계정에 따라 홈 화면이 다르게 구성됩니다. 비밀번호 오류, 계정 정지 등
        실패 사유를 명확하게 표시합니다.
      </p>
      <LoginForm />
    </section>
  );
}
