"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL, apiRequest, clearToken, storeToken } from "../../lib/api";

type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

type LoginResult =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; redirect: string }
  | { status: "error"; message: string };

const ROLE_REDIRECTS: Record<string, string> = {
  CLIENT: "/client/dashboard",
  PROVIDER: "/provider/dashboard",
  ADMIN: "/admin/dashboard"
};

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
    remember: true
  });
  const [result, setResult] = useState<LoginResult>({ status: "idle" });

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

    setForm((prev) => ({
      ...prev,
      [name]: target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult({ status: "loading" });

    try {
      const data = await apiRequest<{
        role: string;
        accessToken: string;
        refreshToken: string;
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const redirect = ROLE_REDIRECTS[data.role] ?? "/client/dashboard";

      storeToken("guardian.accessToken", data.accessToken);
      if (form.remember) {
        storeToken("guardian.refreshToken", data.refreshToken);
      } else {
        clearToken("guardian.refreshToken");
      }

      setResult({ status: "success", redirect });
      router.push(redirect);
    } catch (error) {
      setResult({
        status: "error",
        message:
          error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다."
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
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
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="form-input"
          placeholder="비밀번호를 입력하세요"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <label className="checkbox-group">
        <input
          type="checkbox"
          name="remember"
          checked={form.remember}
          onChange={handleChange}
        />
        자동 로그인 (Refresh Token)
      </label>

      <button className="btn btn-primary" type="submit" disabled={result.status === "loading"}>
        {result.status === "loading" ? "로그인 중..." : "로그인"}
      </button>

      {result.status === "error" && (
        <p className="muted" style={{ color: "#dc2626" }}>
          {result.message}
        </p>
      )}

      <p className="muted">
        API 서버: <strong>{API_BASE_URL}</strong>
      </p>

      {result.status === "success" && (
        <p className="muted">
          로그인 성공! <strong>{result.redirect}</strong> 로 이동합니다.
        </p>
      )}
    </form>
  );
}
