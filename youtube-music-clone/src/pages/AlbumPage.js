import { getAlbumDetail } from "../services/musicService.js";
import { DetailPage } from "./DetailPage.js";
export async function AlbumPage(slug) {
  return DetailPage(await getAlbumDetail(slug), "Album");
}
