import { apiFetch } from "./api.js";
export const getTodaysHits = () =>
  apiFetch("/home/todays-hits?country=VN&limit=12");
export const getPlaylistDetail = (slug) =>
  apiFetch(`/playlists/details/${encodeURIComponent(slug)}`);
export const getAlbumDetail = (slug) =>
  apiFetch(`/albums/details/${encodeURIComponent(slug)}`);
export const getExploreNewReleases = () => apiFetch("/explore/new-releases");
export const getExploreVideos = () => apiFetch("/explore/videos");
export const getPersonalized = () => apiFetch("/home/personalized?limit=20");
export const recordSongPlay = (songId) =>
  apiFetch("/events/play", {
    method: "POST",
    body: JSON.stringify({ songId }),
  });
export const getMoods = () => apiFetch("/moods");
export const getQuickPicks = (mood) =>
  apiFetch(
    "/quick-picks?country=GLOBAL&limit=12" +
      (mood ? "&mood=" + encodeURIComponent(mood) : ""),
  );
export const getAlbumsForYou = () =>
  apiFetch("/home/albums-for-you?country=VN&limit=12");
