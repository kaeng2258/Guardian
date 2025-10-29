import { SignupForm } from "../../components/forms/SignupForm";

export const metadata = {
  title: "회원가입 | Guardian Front",
  description: "역할별 온보딩을 지원하는 회원가입 화면"
};

export default function SignupPage() {
  return (
    <section className="card">
      <div className="card-header">
        <h1 className="card-title">회원가입</h1>
        <span className="tag">Client / Provider</span>
      </div>
      <p className="muted">
        역할을 선택해 가입을 진행하고, 약관 동의를 완료하면 온보딩 단계로
        이동합니다. Provider 가입 시 별도의 승인 절차에 대한 안내를 제공합니다.
      </p>
      <SignupForm />
    </section>
  );
}
