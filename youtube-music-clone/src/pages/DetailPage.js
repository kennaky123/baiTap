import { SongItem } from "../components/SongItem.js";
import {
  escapeHTML as e,
  imageOf,
  artistName,
  titleOf,
} from "../utils/format.js";
import { Icon } from "../components/Icon.js";
export function DetailPage(data, type) {
  const tracks = data.tracks ?? [];
  return {
    songs: tracks,
    html: `<div class="detail-layout"><div class="detail-info"><img class="detail-cover" src="${e(imageOf(data))}" alt=""><h1>${e(titleOf(data))}</h1><p>${type} · ${e(artistName(data))}</p><p>${tracks.length} bài hát · ${Math.floor((data.duration ?? tracks.reduce((n, t) => n + (t.duration ?? 0), 0)) / 60)} phút</p><p class="mt-3">${e(data.description ?? "")}</p><div class="detail-actions"><button class="pill light" data-play-all ${tracks.length ? "" : "disabled"}>${Icon("play", 18)}Phát tất cả</button><button class="pill" data-shuffle-all ${tracks.length ? "" : "disabled"}>${Icon("shuffle", 18)}Trộn bài</button></div></div><div><div class="flex justify-between text-sm text-zinc-400 border-b border-white/10 pb-4 mb-2"><span>Bài hát</span><span>Thời lượng</span></div>${tracks.length ? tracks.map(SongItem).join("") : '<p class="empty-inline">Danh sách này chưa có bài hát.</p>'}</div></div>`,
  };
}
