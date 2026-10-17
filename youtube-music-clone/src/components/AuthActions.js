import { escapeHTML, readStorage } from "../utils/format.js";
export function renderAuthActions() {
  const user = readStorage("user", null),
    signedIn = localStorage.getItem("access_token") && user;
  document.querySelector("#auth-actions").innerHTML = signedIn
    ? `<span class="user-name">${escapeHTML(user.name ?? user.email)}</span><button id="logout-button" class="pill">Đăng xuất</button>`
    : '<a class="pill light" href="/login" data-navigo>Đăng nhập</a>';
  const account = document.querySelector("#sidebar-account");
  account.href = signedIn ? "/library" : "/login";
  account.querySelector("span").textContent = signedIn
    ? "Cá nhân"
    : "Đăng nhập";
}
