import { getPersonalized } from "../services/musicService.js";
import { Shelf } from "../components/MusicCard.js";
import { SongItem } from "../components/SongItem.js";
import { Icon } from "../components/Icon.js";
import { readStorage, itemsOf, escapeHTML as e } from "../utils/format.js";
export async function LibraryPage() {
  const user = readStorage("user", null),
    songs = readStorage("liked-songs"),
    history = readStorage("recent-songs");
  let recommendations = [];
  if (localStorage.getItem("access_token"))
    recommendations = itemsOf(await getPersonalized());
  return {
    songs,
    html: `<h1 class="page-title">Thư viện</h1><p class="page-subtitle">${user ? `Xin chào, ${e(user.name ?? user.email)}` : "Âm nhạc yêu thích của bạn, ở một nơi."}</p>${!user ? `<div class="mb-10 flex flex-wrap items-center gap-5"><p class="text-zinc-400">Đăng nhập để nhận gợi ý dành riêng cho bạn.</p><a href="/login" data-navigo class="pill light">Đăng nhập</a></div>` : ""}<div class="section-heading"><h2>Bài hát yêu thích</h2></div>${songs.length ? songs.map(SongItem).join("") : `<div class="empty-state">${Icon("heart", 42)}<h2>Thêm những bài hát bạn yêu thích</h2><p>Nhấn biểu tượng trái tim trên trình phát để lưu bài hát trên thiết bị này.</p><a href="/explore" data-navigo class="pill">Khám phá âm nhạc</a></div>`}${history.length ? Shelf("Nghe gần đây", history) : ""}${recommendations.length ? Shelf("Gợi ý cho bạn", recommendations) : ""}`,
  };
}
