import { apiFetch } from "./api.js";

export function searchMusic(keyword, page = 1) {
  return apiFetch(
    `/search?q=${encodeURIComponent(keyword)}&limit=20&page=${page}`,
  );
}
