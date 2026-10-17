import "./styles/main.css";
import { App } from "./app.js";
import { initRouter, navigateTo, refreshPage } from "./router/index.js";
import { initPlayerEvents, pausePlayback } from "./store/playerStore.js";
import { renderAuthActions } from "./components/AuthActions.js";
import { login, register, logout } from "./services/authService.js";
import { apiFetch, clearSession } from "./services/api.js";
import { escapeHTML as e, itemsOf, titleOf, toast } from "./utils/format.js";
document.querySelector("#app").innerHTML = App();
renderAuthActions();
initPlayerEvents();
initRouter();
document.addEventListener("auth-change", renderAuthActions);
document.addEventListener("library-change", () => {
  if (location.pathname === "/library") refreshPage();
});
let suggestionTimer,
  suggestionVersion = 0;
const suggestions = document.querySelector("#search-suggestions"),
  search = document.querySelector("#search-input");
function closeSuggestions() {
  suggestionVersion++;
  clearTimeout(suggestionTimer);
  suggestions.hidden = true;
}
function toggleMenu(open) {
  document.body.classList.toggle("sidebar-open", open);
  document
    .querySelector("#menu-toggle")
    .setAttribute("aria-expanded", String(open));
}
document.addEventListener("click", async (event) => {
  if (event.target.closest("#menu-toggle"))
    toggleMenu(!document.body.classList.contains("sidebar-open"));
  if (event.target.closest("#sidebar-backdrop")) toggleMenu(false);
  if (event.target.closest("#search-clear")) {
    search.value = "";
    closeSuggestions();
    search.focus();
  }
  if (!event.target.closest("#search-form")) closeSuggestions();
  const scroll = event.target.closest("[data-scroll]");
  if (scroll) {
    const track = scroll.closest(".shelf").querySelector(".card-track");
    track.scrollBy({
      left: Number(scroll.dataset.scroll) * track.clientWidth,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  if (event.target.closest("#retry-page")) refreshPage();
  const video = event.target.closest("[data-video]");
  if (video) {
    if (!/^[\w-]{11}$/.test(video.dataset.video)) {
      toast("Video này chưa có nguồn phát.");
      return;
    }
    pausePlayback();
    document.querySelector("#video-content").innerHTML =
      `<iframe src="https://www.youtube-nocookie.com/embed/${video.dataset.video}?autoplay=1" title="Video âm nhạc" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    document.querySelector("#video-dialog").showModal();
  }
  const logoutButton = event.target.closest("#logout-button");
  if (logoutButton) {
    logoutButton.disabled = true;
    try {
      await logout();
    } catch {
      toast("Đã đăng xuất trên thiết bị này.");
    } finally {
      clearSession();
      navigateTo("/");
    }
  }
});
document
  .querySelector("#video-dialog")
  .addEventListener("close", () =>
    document.querySelector("#video-content").replaceChildren(),
  );
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSuggestions();
    toggleMenu(false);
  }
});
document.addEventListener("change", (event) => {
  if (event.target.id === "chart-country")
    navigateTo("/charts?country=" + encodeURIComponent(event.target.value));
});
search.addEventListener("input", () => {
  closeSuggestions();
  const keyword = search.value.trim(),
    version = suggestionVersion;
  if (keyword.length < 2) return;
  suggestionTimer = setTimeout(async () => {
    try {
      const data = await apiFetch(
        "/search/suggestions?q=" + encodeURIComponent(keyword),
      );
      if (version !== suggestionVersion) return;
      const values = Array.isArray(data.suggestions)
        ? data.suggestions
        : itemsOf(data);
      suggestions.innerHTML = values
        .slice(0, 6)
        .map((item) => {
          const title = typeof item === "string" ? item : titleOf(item);
          return `<a href="/search?q=${encodeURIComponent(title)}" data-suggestion>${e(title)}</a>`;
        })
        .join("");
      suggestions.hidden = !values.length;
    } catch {
      suggestions.hidden = true;
    }
  }, 280);
});
suggestions.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link) {
    event.preventDefault();
    search.value = new URL(link.href).searchParams.get("q");
    navigateTo(link.getAttribute("href"));
    closeSuggestions();
  }
});
document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (form.id === "search-form") {
    event.preventDefault();
    closeSuggestions();
    const keyword = search.value.trim();
    if (keyword) navigateTo("/search?q=" + encodeURIComponent(keyword));
    return;
  }
  if (!["login-form", "register-form"].includes(form.id)) return;
  event.preventDefault();
  const isRegister = form.id === "register-form",
    prefix = isRegister ? "register" : "login",
    errorBox = form.querySelector(".form-error"),
    button = form.querySelector('button[type="submit"]');
  const value = (name) => form.querySelector("#" + prefix + "-" + name).value;
  errorBox.textContent = "";
  if (isRegister && value("password") !== value("confirm-password")) {
    errorBox.textContent = "Mật khẩu nhập lại không khớp.";
    return;
  }
  if (isRegister && !value("name").trim()) {
    errorBox.textContent = "Vui lòng nhập tên hiển thị.";
    return;
  }
  button.disabled = true;
  const previous = button.textContent;
  button.textContent = "Đang xử lý…";
  try {
    const data = isRegister
      ? await register(
          value("name").trim(),
          value("email").trim(),
          value("password"),
          value("confirm-password"),
        )
      : await login(value("email").trim(), value("password"));
    if (!data.access_token || !data.user)
      throw new Error("Phản hồi đăng nhập không hợp lệ.");
    localStorage.setItem("access_token", data.access_token);
    if (data.refresh_token)
      localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("user", JSON.stringify(data.user));
    renderAuthActions();
    navigateTo("/");
    toast(isRegister ? "Đăng ký thành công." : "Đăng nhập thành công.");
  } catch (error) {
    errorBox.textContent =
      error.message || "Không thể kết nối. Vui lòng thử lại.";
  } finally {
    button.disabled = false;
    button.textContent = previous;
  }
});
document.addEventListener(
  "error",
  (event) => {
    if (
      event.target instanceof HTMLImageElement &&
      !event.target.src.endsWith("/logo.svg")
    )
      event.target.src = "/logo.svg";
  },
  true,
);
