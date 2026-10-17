import { searchMusic } from "../services/searchService.js";
import { SongItem } from "../components/SongItem.js";
import { MusicCard } from "../components/MusicCard.js";
import { escapeHTML as e, itemsOf } from "../utils/format.js";
export async function SearchPage(keyword, page = 1) {
  if (!keyword)
    return '<div class="empty-state"><h1>Tìm kiếm âm nhạc</h1><p>Nhập tên bài hát, album hoặc nghệ sĩ vào ô tìm kiếm.</p></div>';
  const data = await searchMusic(keyword, page);
  const results = itemsOf(data),
    songs = results.filter((x) => x.type === "song" || x.audioUrl),
    cards = results.filter((x) => !songs.includes(x));
  const total = data.total ?? results.length;
  return {
    songs,
    html: `<h1 class="page-title">Kết quả tìm kiếm</h1><p class="page-subtitle">“${e(keyword)}” · ${total} kết quả</p>${songs.map(SongItem).join("")}<div class="results-grid">${cards.map(MusicCard).join("")}</div>${!results.length ? '<div class="empty-state"><h2>Không tìm thấy kết quả</h2><p>Thử một từ khóa khác, chẳng hạn “Acoustic” hoặc “Party”.</p></div>' : ""}<div class="flex gap-4 mt-8">${page > 1 ? `<a class="pill" data-navigo href="/search?q=${encodeURIComponent(keyword)}&page=${page - 1}">Trang trước</a>` : ""}${page * 20 < total ? `<a class="pill" data-navigo href="/search?q=${encodeURIComponent(keyword)}&page=${page + 1}">Trang tiếp</a>` : ""}</div>`,
  };
}
