"use client";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ??
  "http://localhost:8090";

type RequestOptions = RequestInit & { parseJson?: boolean };

export async function apiRequest<T>(
  path: string,
  { parseJson = true, ...init }: RequestOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    },
    ...init
  });

  if (!response.ok) {
    let message = `요청이 실패했습니다. (status ${response.status})`;
    try {
      const body = await response.json();
      if (typeof body?.message === "string") {
        message = body.message;
      }
    } catch {
      // ignore parse failure
    }
    throw new Error(message);
  }

  if (!parseJson || response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function storeToken(key: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, value);
}

export function clearToken(key: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(key);
}
