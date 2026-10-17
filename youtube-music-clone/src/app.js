import { Header } from "./components/Header.js";
import { Sidebar } from "./components/Sidebar.js";
import { Player } from "./components/Player.js";
export function App() {
  return `${Header()}${Sidebar()}<main id="page" tabindex="-1"></main>${Player()}<div id="toast" role="status" hidden></div><dialog id="video-dialog"><form method="dialog"><button class="icon-button" aria-label="Đóng video">✕</button></form><div id="video-content"></div></dialog>`;
}
