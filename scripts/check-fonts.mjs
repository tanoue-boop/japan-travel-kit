/**
 * Verifies the webfonts actually reach the page in a production build. Added after the
 * 2026-10-19 restyle shipped with next/font's CSS variables declared on a wrapper <div>
 * while globals.css read them at :root, so every element silently used the UA font.
 *
 * Expects `npm start` to be serving on BASE.
 *
 *   node scripts/check-fonts.mjs [base url]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? process.env.BASE ?? "http://localhost:3000";

const PAGES = [
  "/",
  "/guides",
  "/guides/attractions",
  "/guides/attractions/things-to-do-tokyo",
  "/guides/attractions/shibuya-sky-tickets",
  "/guides/esim/best-esim-japan",
  "/guides/transport/jr-pass-guide",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 1000 } });
const page = await ctx.newPage();
let failed = false;

for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const result = await page.evaluate(() => {
    const family = (sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).fontFamily : null;
    };
    const faces = [...document.fonts].map((f) => ({
      family: f.family,
      weight: f.weight,
      status: f.status,
    }));
    return {
      html: getComputedStyle(document.documentElement).getPropertyValue("--font-noto-serif").trim(),
      display: getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim(),
      h1: family("h1"),
      h2: family("h2"),
      p: family("main p"),
      logo: family("header a span"),
      faces,
    };
  });

  const first = (stack) => (stack ?? "").split(",")[0].trim().replace(/^['"]|['"]$/g, "");
  const h1 = first(result.h1);
  const h2 = first(result.h2);
  const p = first(result.p);
  const serifLoaded = result.faces.filter((f) => /Noto_Serif/.test(f.family));
  const sansLoaded = result.faces.filter((f) => /Noto_Sans/.test(f.family));
  const statuses = (list) => [...new Set(list.map((f) => f.status))].join("/") || "none";

  const ok =
    /^__Noto_Serif_/.test(h1) &&
    /^__Noto_Serif_/.test(h2) &&
    /^__Noto_Sans_/.test(p) &&
    serifLoaded.some((f) => f.status === "loaded") &&
    sansLoaded.some((f) => f.status === "loaded");

  if (!ok) failed = true;
  console.log(`${ok ? "OK  " : "FAIL"} ${path}`);
  console.log(`      h1: ${result.h1}`);
  console.log(`      h2: ${result.h2}`);
  console.log(`      p : ${result.p}`);
  console.log(`      logo: ${result.logo}`);
  console.log(`      --font-display (html): ${result.display}`);
  console.log(
    `      document.fonts: serif ${serifLoaded.length} face(s) ${statuses(serifLoaded)}` +
      `, sans ${sansLoaded.length} face(s) ${statuses(sansLoaded)}`
  );
}

await ctx.close();
await browser.close();
process.exit(failed ? 1 : 0);
