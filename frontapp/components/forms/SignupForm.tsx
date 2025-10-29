"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL, apiRequest } from "../../lib/api";

type SignupPayload = {
  role: "CLIENT" | "PROVIDER";
  email: string;
  password: string;
  name: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
};

type SignupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; onboarding: string }
  | { status: "error"; message: string };

const ROLE_SUMMARY: Record<SignupPayload["role"], string> = {
  CLIENT: "환자 온보딩으로 이동합니다.",
  PROVIDER: "담당자 승인 절차 안내 페이지로 이동합니다."
};

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState<SignupPayload>({
    role: "CLIENT",
    email: "",
    password: "",
    name: "",
    termsAgreed: false,
    privacyAgreed: false
  });
  const [state, setState] = useState<SignupState>({ status: "idle" });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;
    const { name } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked
      }));
      return;
    }

    const value =
      name === "role"
        ? (target.value as SignupPayload["role"])
        : target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.termsAgreed || !form.privacyAgreed) {
      setState({
        status: "error",
        message: "약관 및 개인정보 처리에 동의해야 회원가입이 가능합니다."
      });
      return;
    }

    setState({ status: "loading" });

    try {
      await apiRequest("/api/users", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setState({
        status: "success",
        onboarding: ROLE_SUMMARY[form.role]
      });

      router.push("/login");
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="role">
          가입 유형
        </label>
        <select
          id="role"
          name="role"
          className="form-select"
          value={form.role}
          onChange={handleChange}
        >
          <option value="CLIENT">Client (환자)</option>
          <option value="PROVIDER">Provider (담당자)</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          이메일
        </label>
        <input
          required
          id="email"
          name="email"
          type="email"
          className="form-input"
          placeholder="name@example.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">
          비밀번호
        </label>
        <input
          required
          id="password"
          name="password"
          type="password"
          minLength={8}
          className="form-input"
          placeholder="영문, 숫자를 포함하여 8자 이상"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="name">
          이름
        </label>
        <input
          required
          id="name"
          name="name"
          type="text"
          className="form-input"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <label className="checkbox-group">
        <input
          type="checkbox"
          name="termsAgreed"
          checked={form.termsAgreed}
          onChange={handleChange}
        />
        이용약관에 동의합니다.
      </label>

      <label className="checkbox-group">
        <input
          type="checkbox"
          name="privacyAgreed"
          checked={form.privacyAgreed}
          onChange={handleChange}
        />
        개인정보 처리방침에 동의합니다.
      </label>

      <button className="btn btn-primary" type="submit" disabled={state.status === "loading"}>
        {state.status === "loading" ? "회원가입 중..." : "회원가입"}
      </button>

      {state.status === "error" && (
        <p className="muted" style={{ color: "#dc2626" }}>
          {state.message}
        </p>
      )}

      <p className="muted">
        API 서버: <strong>{API_BASE_URL}</strong>
      </p>

      {state.status === "success" && (
        <p className="muted">
          회원가입 완료! {state.onboarding}
        </p>
      )}
    </form>
  );
}
