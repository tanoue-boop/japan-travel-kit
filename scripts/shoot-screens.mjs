/**
 * Screenshot the reference pages at desktop and phone width.
 * Expects `npm start` (or `npm run dev`) to be serving on BASE.
 *
 *   node scripts/shoot-screens.mjs "<output dir>" [base url]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.argv[2] ?? "screens";
const BASE = process.argv[3] ?? process.env.BASE ?? "http://localhost:3000";

// One page per template: the homepage, the all-guides index, a category hub, a city hub and
// three articles that between them cover the article layouts.
const PAGES = [
  ["home", "/"],
  ["guides", "/guides"],
  ["guides-attractions", "/guides/attractions"],
  ["things-to-do-tokyo", "/guides/attractions/things-to-do-tokyo"],
  ["shibuya-sky-tickets", "/guides/attractions/shibuya-sky-tickets"],
  ["best-esim-japan", "/guides/esim/best-esim-japan"],
  ["jr-pass-guide", "/guides/transport/jr-pass-guide"],
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
