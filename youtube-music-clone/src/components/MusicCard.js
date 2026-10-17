import {
  escapeHTML as e,
  titleOf,
  imageOf,
  artistName,
} from "../utils/format.js";
import { Icon } from "./Icon.js";
export function getItemUrl(item) {
  if (
    item.slug &&
    (item.type === "playlist" || item.type === "album" || item.albumType)
  )
    return `/${item.type === "playlist" ? "playlist" : "album"}/${encodeURIComponent(item.slug)}`;
  return item.videoId || item.type === "video"
    ? `/video/${encodeURIComponent(item.id ?? item._id ?? item.videoId)}`
    : `/song/${encodeURIComponent(item.id ?? item._id)}`;
}
export function MusicCard(item) {
  const subtitle =
    item.views != null
      ? `${Number(item.views).toLocaleString("vi-VN")} lượt xem`
      : (item.albumType ?? artistName(item));
  return `<a href="${getItemUrl(item)}" data-navigo class="music-card group ${item.videoId ? "video-card" : ""}"><div class="cover"><img src="${e(imageOf(item))}" alt="" loading="lazy"><span class="cover-play">${Icon("play", 25)}</span></div><h3>${e(titleOf(item))}</h3><p>${e(subtitle)}</p></a>`;
}
export function Shelf(title, items, id = "", subtitle = "") {
  return `<section class="shelf" ${id ? `id="${id}"` : ""}><div class="section-heading"><div>${subtitle ? `<p class="eyebrow">${e(subtitle)}</p>` : ""}<h2>${e(title)}</h2></div><div class="flex gap-3"><button class="arrow-button" data-scroll="-1" aria-label="Cuộn sang trái">${Icon("left", 20)}</button><button class="arrow-button" data-scroll="1" aria-label="Cuộn sang phải">${Icon("right", 20)}</button></div></div><div class="card-track">${items.length ? items.map(MusicCard).join("") : '<p class="empty-inline">Chưa có nội dung.</p>'}</div></section>`;
}
