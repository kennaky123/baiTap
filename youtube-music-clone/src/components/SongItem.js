import {
  escapeHTML as e,
  artistName,
  titleOf,
  imageOf,
  formatTime,
} from "../utils/format.js";
import { Icon } from "./Icon.js";
export function SongItem(song, index) {
  return `<button class="song-row" data-song-index="${index}" aria-label="Phát ${e(titleOf(song))}"><span class="song-number">${index + 1}</span><img src="${e(imageOf(song))}" alt="" loading="lazy"><span class="min-w-0 text-left"><strong class="block truncate font-medium">${e(titleOf(song))}</strong><span class="text-sm text-zinc-400">${e(artistName(song))}</span></span><span class="song-play">${Icon("play", 18)}</span><span class="text-sm text-zinc-400">${formatTime(song.duration)}</span></button>`;
}
