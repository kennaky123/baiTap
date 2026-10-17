import Navigo from "navigo";
import { HomePage } from "../pages/HomePage.js";
import { ExplorePage } from "../pages/ExplorePage.js";
import { LibraryPage } from "../pages/LibraryPage.js";
import { PlaylistPage } from "../pages/PlaylistPage.js";
import { AlbumPage } from "../pages/AlbumPage.js";
import { SearchPage } from "../pages/SearchPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { RegisterPage } from "../pages/RegisterPage.js";
import { BrowsePage } from "../pages/BrowsePage.js";
import { setPlaylist } from "../store/playerStore.js";
import { escapeHTML as e } from "../utils/format.js";
const router = new Navigo("/");
let renderId = 0;
let currentPageFactory;
export const navigateTo = (url) => router.navigate(url);
const loading = () =>
  '<div role="status" aria-label="Đang tải"><div class="skeleton h-10 w-56 mt-12"></div><div class="loading-cards">' +
  Array.from(
    { length: 4 },
    () => '<div class="skeleton aspect-square"></div>',
  ).join("") +
  '</div><p class="text-zinc-400 mt-6">Đang tải âm nhạc…</p></div>';
async function renderPage(factory) {
  currentPageFactory = factory;
  const id = ++renderId,
    page = document.querySelector("#page");
  await Promise.resolve();
  if (id !== renderId) return;
  page.innerHTML = loading();
  setPlaylist([]);
  document.body.classList.remove("sidebar-open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
  document.querySelector("#search-suggestions").hidden = true;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const active =
      link.dataset.nav === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(link.dataset.nav);
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  try {
    const content = await factory();
    if (id !== renderId) return;
    page.innerHTML = typeof content === "string" ? content : content.html;
    setPlaylist(content.songs ?? []);
  } catch (error) {
    if (id !== renderId) return;
    page.innerHTML = `<div class="empty-state"><h1>Không thể tải nội dung</h1><p>${e(error.message)}</p><button id="retry-page" class="pill light">Thử lại</button><a href="/" data-navigo class="pill ml-3">Trang chủ</a></div>`;
  }
  router.updatePageLinks();
  window.scrollTo({ top: 0 });
  document.title =
    (page.querySelector("h1")?.textContent ?? "Âm nhạc") + " · YouTube Music";
}
export function refreshPage() {
  if (currentPageFactory) void renderPage(currentPageFactory);
}
export function initRouter() {
  const query = () => new URLSearchParams(location.search);
  router
    .on("/", () => renderPage(() => HomePage(query().get("mood") ?? "")))
    .on("/explore", () => renderPage(ExplorePage))
    .on("/library", () => renderPage(LibraryPage))
    .on("/login", () => renderPage(LoginPage))
    .on("/register", () => renderPage(RegisterPage))
    .on("/playlist/:slug", (m) => renderPage(() => PlaylistPage(m.data.slug)))
    .on("/album/:slug", (m) => renderPage(() => AlbumPage(m.data.slug)))
    .on("/search", () =>
      renderPage(() =>
        SearchPage(
          query().get("q") ?? "",
          Math.max(1, Number(query().get("page")) || 1),
        ),
      ),
    );
  ["genres", "new-releases", "charts"].forEach((type) =>
    router.on("/" + type, () =>
      renderPage(() =>
        BrowsePage(type, null, query().get("country") ?? "GLOBAL"),
      ),
    ),
  );
  ["category", "line", "song", "video"].forEach((type) =>
    router.on("/" + type + "/:slug", (m) =>
      renderPage(() => BrowsePage(type, m.data.slug)),
    ),
  );
  router.notFound(() =>
    renderPage(
      () =>
        '<div class="empty-state"><h1>Không tìm thấy trang</h1><a href="/" data-navigo class="pill light">Về trang chủ</a></div>',
    ),
  );
  router.resolve();
}
