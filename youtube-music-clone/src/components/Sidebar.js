import { Icon } from "./Icon.js";
export function Sidebar() {
  return `<button id="sidebar-backdrop" aria-label="Đóng menu" hidden></button><aside id="sidebar"><nav aria-label="Điều hướng chính">${[
    ["/", "home", "Trang chủ"],
    ["/explore", "compass", "Khám phá"],
    ["/library", "library", "Thư viện"],
  ]
    .map(
      ([url, icon, label]) =>
        `<a href="${url}" data-navigo class="nav-link" data-nav="${url}">${Icon(icon)}<span>${label}</span></a>`,
    )
    .join(
      "",
    )}</nav><div class="sidebar-divider"></div><a href="/login" data-navigo class="nav-link" id="sidebar-account">${Icon("user")}<span>Đăng nhập</span></a><p class="sidebar-note">Đăng nhập để nhận nội dung đề xuất dành riêng cho bạn.</p></aside>`;
}
