export const escapeHTML = (value = "") =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
export const itemsOf = (data) =>
  Array.isArray(data) ? data : (data?.items ?? data?.results ?? []);
export const artistName = (item) =>
  (item.artists ?? [])
    .map((a) => (typeof a === "string" ? a : a.name))
    .filter(Boolean)
    .join(", ") || "Various Artists";
export const titleOf = (item) => item.title ?? item.name ?? "Chưa có tiêu đề";
export const imageOf = (item) => {
  const value = item.thumbnails?.[0] ?? item.thumb ?? item.thumbnailUrl;
  const url = typeof value === "object" ? value?.url : value;
  return /^https?:\/\//i.test(url ?? "") ? url : "/logo.svg";
};
export const formatTime = (seconds) => {
  seconds = Number.isFinite(Number(seconds))
    ? Math.max(0, Math.floor(seconds))
    : 0;
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
};
export function readStorage(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function toast(message) {
  const box = document.querySelector("#toast");
  box.textContent = message;
  box.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (box.hidden = true), 4000);
}
