import { recordSongPlay } from "../services/musicService.js";
import { apiFetch } from "../services/api.js";
import { Icon } from "../components/Icon.js";
import {
  escapeHTML as e,
  imageOf,
  titleOf,
  artistName,
  formatTime,
  readStorage,
  toast,
} from "../utils/format.js";
const audio = new Audio();
audio.preload = "metadata";
audio.volume = 0.75;
let pageSongs = [],
  queue = [],
  currentIndex = -1,
  shuffle = false,
  repeat = false,
  requestId = 0;
const current = () => queue[currentIndex];
const idOf = (song) => song?.id ?? song?._id;
export function setPlaylist(songs) {
  pageSongs = Array.isArray(songs) ? songs : [];
}
function renderQueue() {
  document.querySelector("#queue-items").innerHTML = queue
    .map(
      (song, i) =>
        `<button class="queue-item ${i === currentIndex ? "active" : ""}" data-queue-index="${i}"><img src="${e(imageOf(song))}" alt=""><span>${e(titleOf(song))}</span></button>`,
    )
    .join("");
}
function updatePlayerUI() {
  const song = current();
  if (!song) return;
  document.querySelector("#player").hidden = false;
  document.body.classList.add("has-player");
  document.querySelector("#player-image").src = imageOf(song);
  document.querySelector("#player-title").textContent = titleOf(song);
  document.querySelector("#player-artist").textContent = artistName(song);
  const button = document.querySelector("#player-toggle");
  button.innerHTML = Icon(audio.paused ? "play" : "pause", 30);
  button.setAttribute("aria-label", audio.paused ? "Phát" : "Tạm dừng");
  document.querySelector("#player-duration").textContent = formatTime(
    audio.duration || song.duration,
  );
  document.querySelector("#player-progress").disabled = !Number.isFinite(
    audio.duration,
  );
  document
    .querySelector("#player-like")
    .setAttribute(
      "aria-pressed",
      String(readStorage("liked-songs").some((s) => idOf(s) === idOf(song))),
    );
}
export async function playSongAt(index) {
  let song = queue[index];
  if (!song) return;
  const request = ++requestId;
  audio.pause();
  currentIndex = index;
  audio.removeAttribute("src");
  audio.load();
  document.querySelector("#player-progress").value = 0;
  document.querySelector("#player-current-time").textContent = "0:00";
  updatePlayerUI();
  renderQueue();
  if (!song.audioUrl && idOf(song)) {
    try {
      const detail = await apiFetch(
        `/songs/details/${encodeURIComponent(idOf(song))}`,
      );
      if (request !== requestId) return;
      song = { ...song, ...(detail.song ?? detail) };
      queue[index] = song;
      updatePlayerUI();
    } catch {
      if (request === requestId)
        toast("Không thể tải nguồn phát. Vui lòng thử lại.");
      return;
    }
  }
  if (!/^https?:\/\//i.test(song.audioUrl ?? "")) {
    toast("Bài hát này chưa có nguồn âm thanh.");
    return;
  }
  audio.src = song.audioUrl;
  try {
    await audio.play();
    if (request !== requestId) return;
    const recent = readStorage("recent-songs").filter(
      (s) => idOf(s) !== idOf(song),
    );
    localStorage.setItem(
      "recent-songs",
      JSON.stringify([{ ...song, type: "song" }, ...recent].slice(0, 20)),
    );
    if (localStorage.getItem("access_token") && idOf(song))
      recordSongPlay(idOf(song)).catch(() => {});
  } catch (error) {
    if (request === requestId && error.name !== "AbortError")
      toast("Không thể phát nguồn nhạc. Bạn hãy thử lại hoặc chọn bài khác.");
  }
  updatePlayerUI();
}
export async function togglePlay() {
  if (!current()) return;
  if (!audio.src) {
    await playSongAt(currentIndex);
    return;
  }
  try {
    if (audio.paused) await audio.play();
    else audio.pause();
  } catch {
    toast("Không thể phát bài hát này.");
  }
  updatePlayerUI();
}
export function playNext() {
  if (!queue.length) return;
  let index = (currentIndex + 1) % queue.length;
  if (shuffle && queue.length > 1)
    index =
      (currentIndex + 1 + Math.floor(Math.random() * (queue.length - 1))) %
      queue.length;
  void playSongAt(index);
}
export function playPrevious() {
  if (queue.length)
    void playSongAt((currentIndex - 1 + queue.length) % queue.length);
}
export function pausePlayback() {
  audio.pause();
}
function startPage(index = 0, mix = false) {
  queue = [...pageSongs];
  shuffle = mix;
  document
    .querySelector("#player-shuffle")
    .setAttribute("aria-pressed", String(shuffle));
  void playSongAt(index);
}
function toggleQueue(show) {
  document.querySelector("#queue-panel").hidden = !show;
  document
    .querySelector("#player-queue")
    .setAttribute("aria-expanded", String(show));
}
export function initPlayerEvents() {
  document.addEventListener("click", (event) => {
    const song = event.target.closest("[data-song-index]");
    if (song) startPage(Number(song.dataset.songIndex));
    const queued = event.target.closest("[data-queue-index]");
    if (queued) void playSongAt(Number(queued.dataset.queueIndex));
    if (event.target.closest("[data-play-all]")) startPage();
    if (event.target.closest("[data-shuffle-all]"))
      startPage(Math.floor(Math.random() * pageSongs.length), true);
    if (event.target.closest("#player-toggle")) void togglePlay();
    if (event.target.closest("#player-next")) playNext();
    if (event.target.closest("#player-previous")) playPrevious();
    if (event.target.closest("#player-shuffle")) {
      shuffle = !shuffle;
      document
        .querySelector("#player-shuffle")
        .setAttribute("aria-pressed", String(shuffle));
    }
    if (event.target.closest("#player-repeat")) {
      repeat = !repeat;
      document
        .querySelector("#player-repeat")
        .setAttribute("aria-pressed", String(repeat));
    }
    if (event.target.closest("#player-mute")) {
      audio.muted = !audio.muted;
      const button = document.querySelector("#player-mute");
      button.innerHTML = Icon(audio.muted ? "mute" : "volume", 22);
      button.setAttribute(
        "aria-label",
        audio.muted ? "Bật tiếng" : "Tắt tiếng",
      );
    }
    if (event.target.closest("#player-queue")) {
      renderQueue();
      toggleQueue(document.querySelector("#queue-panel").hidden);
    }
    if (event.target.closest("#queue-close")) toggleQueue(false);
    if (event.target.closest("#player-like") && current()) {
      const song = current(),
        songs = readStorage("liked-songs"),
        exists = songs.some((s) => idOf(s) === idOf(song));
      localStorage.setItem(
        "liked-songs",
        JSON.stringify(
          exists
            ? songs.filter((s) => idOf(s) !== idOf(song))
            : [{ ...song, type: "song" }, ...songs],
        ),
      );
      updatePlayerUI();
      toast(
        exists ? "Đã bỏ yêu thích." : "Đã lưu vào thư viện trên thiết bị này.",
      );
      document.dispatchEvent(new Event("library-change"));
    }
  });
  document.addEventListener("input", (event) => {
    if (event.target.id === "player-volume")
      audio.volume = Number(event.target.value) / 100;
    if (
      event.target.id === "player-progress" &&
      Number.isFinite(audio.duration)
    )
      audio.currentTime = (Number(event.target.value) / 100) * audio.duration;
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.code === "Space" &&
      !event.repeat &&
      !event.target.closest(
        "input,textarea,button,a,select,[contenteditable]",
      ) &&
      !document.querySelector("dialog[open]")
    ) {
      event.preventDefault();
      void togglePlay();
    }
    if (event.key === "Escape") toggleQueue(false);
  });
  audio.addEventListener("ended", () => {
    if (repeat) void playSongAt(currentIndex);
    else playNext();
  });
  ["play", "pause", "loadedmetadata"].forEach((event) =>
    audio.addEventListener(event, updatePlayerUI),
  );
  audio.addEventListener("error", () => {
    if (audio.getAttribute("src")) {
      updatePlayerUI();
      toast("Nguồn âm thanh không khả dụng. Hãy chọn một bài khác.");
    }
  });
  audio.addEventListener("timeupdate", () => {
    document.querySelector("#player-current-time").textContent = formatTime(
      audio.currentTime,
    );
    document.querySelector("#player-duration").textContent = formatTime(
      audio.duration,
    );
    document.querySelector("#player-progress").value = audio.duration
      ? (audio.currentTime / audio.duration) * 100
      : 0;
  });
}
