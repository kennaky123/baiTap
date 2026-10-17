import { apiFetch } from "./api.js";

export function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function register(name, email, password, confirmPassword) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
  });
}

export function getMe() {
  return apiFetch("/auth/me");
}
export function logout() {
  return apiFetch("/auth/logout", {
    method: "DELETE",
  });
}
