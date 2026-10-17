const paths = {
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  home: '<path d="m3 10 9-7 9 7v11h-6v-8H9v8H3z"/>',
  compass:
    '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5z"/>',
  library: '<path d="M5 3h14v18l-7-4-7 4z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
  play: '<path fill="currentColor" stroke="none" d="m7 3 15 9-15 9z"/>',
  pause: '<path stroke-width="5" d="M8 4v16M16 4v16"/>',
  next: '<path fill="currentColor" stroke="none" d="m4 4 12 8L4 20z"/><path d="M19 4v16"/>',
  previous:
    '<path fill="currentColor" stroke="none" d="m20 4-12 8 12 8z"/><path d="M5 4v16"/>',
  left: '<path d="m15 6-6 6 6 6"/>',
  right: '<path d="m9 6 6 6-6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  volume:
    '<path d="M3 9h4l5-5v16l-5-5H3zM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="M3 9h4l5-5v16l-5-5H3zM16 9l6 6m0-6-6 6"/>',
  shuffle:
    '<path d="M3 5h3c5 0 7 14 12 14h3m-4-4 4 4-4 3M3 19h3c2 0 4-3 5-5m3-5c1-2 2-4 4-4h3m-4-3 4 3-4 4"/>',
  repeat:
    '<path d="m17 2 4 4-4 4M3 11V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14-1v3a2 2 0 0 1-2 2H3"/>',
  heart:
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  queue: '<path d="M3 5h18M3 10h18M3 15h10m4 0 5 3-5 3z"/>',
  chart: '<path d="M5 21V12M12 21V3M19 21V8"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/>',
};
export const Icon = (name, size = 24) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.disc}</svg>`;
