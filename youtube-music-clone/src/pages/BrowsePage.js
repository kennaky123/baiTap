import { apiFetch } from "../services/api.js";
import { Categories } from "./ExplorePage.js";
import { Shelf } from "../components/MusicCard.js";
import { DetailPage } from "./DetailPage.js";
import { itemsOf, escapeHTML as e, titleOf, imageOf } from "../utils/format.js";
import { Icon } from "../components/Icon.js";
export async function BrowsePage(type, slug, country = "GLOBAL") {
  if (type === "genres") {
    const meta = await apiFetch("/explore/meta");
    return `<h1 class="page-title mb-10">Tâm trạng và thể loại</h1><div class="category-grid">${Categories(meta.categories ?? [], "category")}${Categories(meta.lines ?? [], "line")}</div>`;
  }
  if (type === "new-releases")
    return `<h1 class="page-title mb-10">Bản phát hành mới</h1>${Shelf(
      "Album và đĩa đơn",
      itemsOf(await apiFetch("/explore/new-releases?limit=30")).map((x) => ({
        ...x,
        type: "album",
      })),
    )}`;
  if (type === "charts") {
    const [videos, artists, countries] = await Promise.all([
      apiFetch("/charts/videos?country=" + encodeURIComponent(country)),
      apiFetch("/charts/top-artists?country=" + encodeURIComponent(country)),
      apiFetch("/charts/countries"),
    ]);
    return `<h1 class="page-title">Bảng xếp hạng</h1><label class="block my-6">Quốc gia <select id="chart-country" class="ml-4 rounded bg-zinc-800 p-3">${(countries.countries ?? []).map((c) => `<option value="${e(c.code)}" ${c.code === country ? "selected" : ""}>${e(c.name)}</option>`).join("")}</select></label>${Shelf("Video nổi bật", itemsOf(videos))}<h2 class="text-3xl font-bold mb-6">Nghệ sĩ nổi bật</h2><div class="category-grid">${itemsOf(
      artists,
    )
      .map(
        (a, i) =>
          `<a href="/search?q=${encodeURIComponent(titleOf(a))}" data-navigo class="category-tile">${i + 1}. ${e(titleOf(a))}</a>`,
      )
      .join("")}</div>`;
  }
  if (type === "category") {
    const data = await apiFetch("/categories/" + encodeURIComponent(slug));
    return `<h1 class="page-title">${e(data.name)}</h1><p class="page-subtitle">${e(data.description ?? "")}</p>${
      (data.subcategories ?? [])
        .map((c) =>
          Shelf(
            c.name,
            (c.playlists ?? []).map((x) => ({ ...x, type: "playlist" })),
          ),
        )
        .join("") || '<p class="empty-inline">Chưa có danh sách phát.</p>'
    }`;
  }
  if (type === "line") {
    const root = "/lines/" + encodeURIComponent(slug);
    const [line, albums, playlists, videos] = await Promise.all([
      apiFetch(root),
      apiFetch(root + "/albums"),
      apiFetch(root + "/playlists"),
      apiFetch(root + "/videos"),
    ]);
    return `<h1 class="page-title">${e(line.name)}</h1><p class="page-subtitle">${e(line.description ?? "")}</p>${Shelf(
      "Danh sách phát nổi bật",
      itemsOf(playlists).map((x) => ({ ...x, type: "playlist" })),
    )}${Shelf(
      "Album",
      itemsOf(albums).map((x) => ({ ...x, type: "album" })),
    )}${Shelf("Video", itemsOf(videos))}`;
  }
  if (type === "song" || type === "video") {
    const data = await apiFetch(
      `/${type}s/details/${encodeURIComponent(slug)}`,
    );
    const item = data.song ?? data.video ?? data;
    if (type === "song")
      return DetailPage({ ...item, tracks: [item] }, "Bài hát");
    return `<h1 class="page-title">${e(titleOf(item))}</h1><p class="page-subtitle">Video âm nhạc</p>
      <button class="relative block w-full max-w-4xl mb-16 overflow-hidden rounded-xl group" data-video="${e(item.videoId ?? "")}" aria-label="Phát video ${e(titleOf(item))}">
        <img src="${e(imageOf(item))}" alt="" class="w-full aspect-video object-cover brightness-75">
        <span class="absolute inset-0 flex items-center justify-center">${Icon("play", 64)}</span>
      </button>${Shelf("Video liên quan", item.related ?? [])}`;
  }
}
