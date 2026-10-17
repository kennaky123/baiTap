import { apiFetch } from "../services/api.js";
import { Shelf } from "../components/MusicCard.js";
import { Icon } from "../components/Icon.js";
import { itemsOf, escapeHTML as e } from "../utils/format.js";
export function Categories(items, type) {
  return items
    .map(
      (c) =>
        `<a class="category-tile" style="--category-color:${/^#[0-9a-f]{3,8}$/i.test(c.color) ? c.color : "#9ad3bc"}" href="/${type}/${encodeURIComponent(c.slug)}" data-navigo>${e(c.name)}</a>`,
    )
    .join("");
}
export async function ExplorePage() {
  const [albums, meta, videos] = await Promise.all([
    apiFetch("/explore/albums"),
    apiFetch("/explore/meta"),
    apiFetch("/explore/videos"),
  ]);
  return `<h1 class="sr-only">Khám phá</h1><div class="explore-tabs"><a href="/new-releases" data-navigo>${Icon("disc")}Bản phát hành mới</a><a href="/charts" data-navigo>${Icon("chart")}Bảng xếp hạng</a><a href="/genres" data-navigo>${Icon("compass")}Tâm trạng và thể loại</a></div>${Shelf(
    "Khám phá Albums mới",
    itemsOf(albums).map((x) => ({ ...x, type: "album" })),
  )}<div class="section-heading"><h2>Tâm trạng và thể loại</h2></div><div class="category-grid">${Categories(meta.categories ?? [], "category")}${Categories(meta.lines ?? [], "line")}</div>${Shelf("Video nhạc mới", itemsOf(videos))}`;
}
