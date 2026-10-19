/**
 * Screenshot the four reference pages at desktop and phone width.
 * Expects `npm start` (or `npm run dev`) to be serving on BASE.
 *
 *   node scripts/shoot-screens.mjs "<output dir>"
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.argv[2] ?? "screens";

const PAGES = [
  ["home", "/"],
  ["guides-attractions", "/guides/attractions"],
  ["shibuya-sky-tickets", "/guides/attractions/shibuya-sky-tickets"],
  ["best-esim-japan", "/guides/esim/best-esim-japan"],
];

const VIEWPORTS = [
  ["desktop-1366", { width: 1366, height: 1000 }],
  ["mobile-390", { width: 390, height: 844 }],
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const [vpName, viewport] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    // Let the webfonts settle so the serif headings are not captured mid-swap.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const file = `${OUT}/${name}__${vpName}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("shot", file);
  }
  await ctx.close();
}
await browser.close();
