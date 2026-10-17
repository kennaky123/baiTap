import { test, expect } from "@playwright/test";

const track = (id, title) => ({
  id,
  type: "song",
  title,
  artists: ["Test Artist"],
  duration: 30,
  audioUrl: "https://audio.test/" + id + ".wav",
});
const songs = [track("one", "First track"), track("two", "Second track")];
const playlist = { title: "Test playlist", slug: "test", tracks: songs };

// A real, short WAV validates browser media events without depending on a remote MP3 host.
function wav() {
  const size = 8000 * 30 * 2,
    buffer = Buffer.alloc(44 + size);
  buffer.write("RIFF");
  buffer.writeUInt32LE(36 + size, 4);
  buffer.write("WAVEfmt ", 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(8000, 24);
  buffer.writeUInt32LE(16000, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(size, 40);
  return buffer;
}

test.beforeEach(async ({ page }) => {
  await page.route("https://audio.test/**", (route) => {
    const body = wav();
    const range = route
      .request()
      .headers()
      .range?.match(/bytes=(\d+)-(\d*)/);
    const start = range ? Number(range[1]) : 0;
    const end = range?.[2] ? Number(range[2]) : body.length - 1;
    return route.fulfill({
      status: range ? 206 : 200,
      contentType: "audio/wav",
      headers: {
        "Accept-Ranges": "bytes",
        ...(range
          ? { "Content-Range": `bytes ${start}-${end}/${body.length}` }
          : {}),
      },
      body: body.subarray(start, end + 1),
    });
  });
  await page.route("**/api/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    let data = { items: [] };
    if (path === "/api/moods")
      data = { items: [{ slug: "relax", name: "Thư Giãn" }] };
    if (path === "/api/quick-picks")
      data = [
        {
          type: "playlist",
          title: "Test playlist",
          slug: "test",
          artists: ["Test Artist"],
        },
      ];
    if (path === "/api/playlists/details/test") data = playlist;
    if (path === "/api/search")
      data = { results: [{ ...songs[0], audioUrl: undefined }], total: 1 };
    if (path === "/api/songs/details/one") data = songs[0];
    if (path === "/api/auth/login")
      data = {
        access_token: "access",
        refresh_token: "refresh",
        user: { name: "Test User" },
      };
    await route.fulfill({ json: data });
  });
});

test("home links, mood filtering and navigation work", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".quick-item")).toContainText("Test Artist");
  await page.getByRole("link", { name: "Thư Giãn", exact: true }).click();
  await expect(page).toHaveURL(/mood=relax/);
  await page.locator(".quick-item").click();
  await expect(page.locator(".song-row")).toHaveCount(2);
  await expect(page.locator("h1")).toHaveText("Test playlist");
});

test("playback, seek, pause, likes and queue persist across navigation", async ({
  page,
}) => {
  await page.goto("/playlist/test");
  await page.locator("[data-play-all]").click();
  await expect(page.locator("#player-toggle")).toHaveAttribute(
    "aria-label",
    "Tạm dừng",
  );
  await expect(page.locator("#player-progress")).toBeEnabled();
  await page.locator("#player-progress").fill("50");
  await expect(page.locator("#player-current-time")).toHaveText(/0:1[5-9]/);
  await page.locator("#player-toggle").click();
  await expect(page.locator("#player-toggle")).toHaveAttribute(
    "aria-label",
    "Phát",
  );
  await page.locator("#player-like").click();
  await page.locator('[data-nav="/library"]').click();
  await expect(page.locator("#page")).toContainText("First track");
  await page.locator("#player-next").click();
  await expect(page.locator("#player-title")).toHaveText("Second track");
  await page.locator("#player-queue").click();
  await expect(page.locator(".queue-item")).toHaveCount(2);
  await page.locator("#player-repeat").click();
  await expect(page.locator("#player-repeat")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("search hydrates the audio URL from song detail", async ({ page }) => {
  await page.goto("/");
  await page.locator("#search-input").fill("First");
  await page.locator("#search-input").press("Enter");
  await page.locator(".song-row").click();
  await expect(page.locator("#player-title")).toHaveText("First track");
  await expect(page.locator("#player-toggle")).toHaveAttribute(
    "aria-label",
    "Tạm dừng",
  );
});

test("login stores session and logout sends token before clearing it", async ({
  page,
}) => {
  await page.goto("/login");
  await page.locator("#login-email").fill("test@example.com");
  await page.locator("#login-password").fill("example-password");
  await page.locator("#login-form button").click();
  await expect(page.locator("#auth-actions")).toContainText("Test User");
  const request = page.waitForRequest((r) => r.url().endsWith("/auth/logout"));
  await page.locator("#logout-button").click();
  expect((await request).headers().authorization).toBe("Bearer access");
  await expect(page.locator("#auth-actions")).toContainText("Đăng nhập");
  expect(
    await page.evaluate(() => localStorage.getItem("access_token")),
  ).toBeNull();
});

test("failed request can be retried and slow route cannot replace current page", async ({
  page,
}) => {
  let count = 0;
  await page.route("**/api/playlists/details/test", async (route) => {
    if (!count++)
      return route.fulfill({ status: 500, json: { message: "Try again" } });
    await route.fulfill({ json: playlist });
  });
  await page.goto("/playlist/test");
  await page.locator("#retry-page").click();
  await expect(page.locator(".song-row")).toHaveCount(2);
  await page.route("**/api/home/todays-hits**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    await route.fulfill({ json: [] });
  });
  await page.locator('[data-nav="/"]').click();
  await page.locator("#auth-actions a").click();
  await expect(page.locator("#login-form")).toBeVisible();
  await page.waitForTimeout(900);
  await expect(page.locator("#login-form")).toBeVisible();
});

test("mobile menu and layout fit the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".quick-item")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.locator("#menu-toggle").click();
  await page.locator('[data-nav="/library"]').click();
  await expect(page.locator("h1")).toHaveText("Thư viện");
  await expect(page.locator("#menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
