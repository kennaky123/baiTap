import { getPlaylistDetail } from "../services/musicService.js";
import { DetailPage } from "./DetailPage.js";
export async function PlaylistPage(slug) {
  return DetailPage(await getPlaylistDetail(slug), "Danh sách phát");
}
