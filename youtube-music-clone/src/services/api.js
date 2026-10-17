const BASE_URL =
  import.meta.env.VITE_API_URL || "https://youtube-music.f8team.dev/api";
let refreshing;
export function clearSession() {
  ["access_token", "refresh_token", "user"].forEach((key) =>
    localStorage.removeItem(key),
  );
  document.dispatchEvent(new Event("auth-change"));
}
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;
  const response = await fetch(BASE_URL + "/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) return null;
  const data = await response.json();
  if (!data.access_token) return null;
  localStorage.setItem("access_token", data.access_token);
  if (data.refresh_token)
    localStorage.setItem("refresh_token", data.refresh_token);
  return data.access_token;
}
export async function apiFetch(endpoint, options = {}, retry = true) {
  const token = localStorage.getItem("access_token");
  const isAuth = /^\/auth\/(login|register)/.test(endpoint);
  const response = await fetch(BASE_URL + endpoint, {
    ...options,
    signal: options.signal ?? AbortSignal.timeout(20000),
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token && !isAuth ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (response.status === 401 && !isAuth && retry && token) {
    refreshing ??= refreshAccessToken().finally(() => {
      refreshing = null;
    });
    if (await refreshing) return apiFetch(endpoint, options, false);
    clearSession();
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      typeof data.message === "string"
        ? data.message
        : response.status === 401
          ? "Email hoặc mật khẩu không đúng."
          : "Không thể tải dữ liệu. Vui lòng thử lại.",
    );
    error.status = response.status;
    throw error;
  }
  return data;
}
