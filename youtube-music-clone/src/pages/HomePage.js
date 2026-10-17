import {
  getMoods,
  getQuickPicks,
  getAlbumsForYou,
  getTodaysHits,
} from "../services/musicService.js";
import { apiFetch } from "../services/api.js";
import { Shelf, getItemUrl } from "../components/MusicCard.js";
import {
  escapeHTML as e,
  itemsOf,
  imageOf,
  titleOf,
  artistName,
} from "../utils/format.js";
export async function HomePage(mood = "") {
  const [moods, quick, albums, hits, vietnam] = await Promise.all([
    getMoods(),
    getQuickPicks(mood),
    getAlbumsForYou(),
    getTodaysHits(),
    apiFetch("/playlists/by-country?country=VN&limit=12"),
  ]);
  return `<h1 class="sr-only">Trang chủ YouTube Music</h1><div class="home-moods" aria-label="Chọn tâm trạng">${itemsOf(
    moods,
  )
    .map(
      (m) =>
        `<a class="mood-chip ${mood === m.slug ? "active" : ""}" href="${mood === m.slug ? "/" : "/?mood=" + encodeURIComponent(m.slug)}" data-navigo>${e(m.name)}</a>`,
    )
    .join(
      "",
    )}</div><section class="shelf"><div class="section-heading"><h2>Quick Picks</h2></div><div class="quick-list">${
    itemsOf(quick)
      .map(
        (item) =>
          `<a class="quick-item" href="${getItemUrl(item)}" data-navigo><img src="${e(imageOf(item))}" alt=""><div><strong>${e(titleOf(item))}</strong><p>${e(artistName(item))} · ${item.popularity ?? 0} lượt nghe</p></div></a>`,
      )
      .join("") ||
    '<p class="empty-inline">Chưa có gợi ý cho tâm trạng này.</p>'
  }</div></section>${Shelf("Album gợi ý cho bạn", itemsOf(albums))}${Shelf("Today's Hits", itemsOf(hits))}${Shelf("Nhạc Việt", itemsOf(vietnam))}`;
}
