#!/usr/bin/env node
/**
 * Pinterest pin generator (A27b design, matches the site brand).
 *
 * Reads scripts/pins/pins.json and, for each entry:
 *   - downloads the Pexels photo (cached in node_modules/.cache/pins),
 *   - lays it out 1000x1500: photo on the top 60%, a white panel below with a
 *     brick-red kicker (diamond + caps), a Noto Serif headline (max 3 lines), a
 *     short brick-red rule, a one-line Noto Sans sub-heading and
 *     "japan-travel-kit.com" at the foot,
 *   - renders it in Playwright/Chromium so the Google Fonts (Noto Serif /
 *     Noto Sans, same as the site) are used with real text metrics,
 *   - writes public/pins/<slug>.jpg (kept under 400 KB).
 * Then writes docs/pinterest-photo-sources.tsv and docs/pinterest-pins.csv
 * (Pinterest bulk-create format).
 *
 * usage: node scripts/pins/generate-pins.mjs [--contact <path.jpg>] [--only slug,slug]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = 'https://www.japan-travel-kit.com';
const W = 1000;
const H = 1500;
const PHOTO_H = 900; // top 60%
const PAD_X = 72;
const MAX_BYTES = 400 * 1024;
const CACHE = path.join(ROOT, 'node_modules/.cache/pins');
const OUT = path.join(ROOT, 'public/pins');

// Site brand (production, 2026-11-09)
const BRAND = { ink: '#23211F', muted: '#5A5550', brick: '#9B3D2E', paper: '#FFFFFF', soft: '#F6F3EE' };
const FONTS_CSS =
  'https://fonts.googleapis.com/css2?family=Noto+Serif:wght@600&family=Noto+Sans:wght@400;600;700&display=block';

const THEMES = {
  winter: { kicker: 'Japan in Winter', board: 'Japan Winter Travel' },
  attr: { kicker: 'Tickets & Tours', board: 'Tokyo & Osaka Attractions' },
  money: { kicker: 'Trip Prep', board: 'Japan Travel Tips: eSIM, Money & Insurance' },
  // PIN1 (2026-11-12) boards
  tokyo: { kicker: 'Tokyo Guide', board: 'Tokyo Travel Guide' },
  kansai: { kicker: 'Kyoto & Osaka', board: 'Kyoto & Osaka Travel' },
  itin: { kicker: 'Itinerary', board: 'Japan Itineraries' },
  esim: { kicker: 'eSIM & Money', board: 'Japan eSIM & Money Tips' },
  hokkaido: { kicker: 'Hokkaido', board: 'Hokkaido Travel' },
};

const args = process.argv.slice(2);
const argVal = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const contactPath = argVal('--contact');
const only = argVal('--only')?.split(',');
// --batch 20261116: render / contact-sheet only the pins of that batch
const batch = argVal('--batch');

const allPins = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/pins/pins.json'), 'utf8'));
// Each pin has an image id (file name) — the slug for the first pin of a page,
// "<slug>-2" etc. for later pins of the same page (field "variant").
for (const p of allPins) p.id = p.variant ? `${p.slug}-${p.variant}` : p.slug;
const pins = batch ? allPins.filter((p) => p.batch === batch) : allPins;
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function photo(pin) {
  const file = path.join(CACHE, `${pin.pexelsId}.jpg`);
  if (!fs.existsSync(file)) {
    const url = `https://images.pexels.com/photos/${pin.pexelsId}/pexels-photo-${pin.pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=2000`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`download ${pin.slug}: HTTP ${r.status}`);
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
  }
  return file;
}

function html(pin, photoUri) {
  const kicker = pin.kicker || THEMES[pin.theme].kicker;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${FONTS_CSS}">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${W}px;height:${H}px;background:${BRAND.paper};overflow:hidden}
  .photo{position:absolute;left:0;top:0;width:${W}px;height:${PHOTO_H}px;background:url(${photoUri}) center/cover}
  .panel{position:absolute;left:0;top:${PHOTO_H}px;width:${W}px;height:${H - PHOTO_H}px;padding:58px ${PAD_X}px 0}
  .kicker{font:600 25px/1 'Noto Sans',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:${BRAND.brick};display:flex;align-items:center;gap:16px}
  .kicker i{display:block;width:12px;height:12px;background:${BRAND.brick};transform:rotate(45deg)}
  h1{margin-top:28px;font-family:'Noto Serif',serif;font-weight:600;color:${BRAND.ink};line-height:1.16;text-wrap:balance}
  .rule{margin-top:30px;width:72px;height:4px;background:${BRAND.brick}}
  .sub{margin-top:26px;font:400 31px/1.3 'Noto Sans',sans-serif;color:${BRAND.muted};white-space:nowrap;display:inline-block}
  .site{position:absolute;left:${PAD_X}px;bottom:54px;font:700 28px/1 'Noto Sans',sans-serif;color:${BRAND.ink};letter-spacing:.02em}
</style></head><body>
<div class="photo"></div>
<div class="panel">
  <div class="kicker"><i></i>${esc(kicker)}</div>
  <h1 id="h">${esc(pin.headline)}</h1>
  <div class="rule"></div>
  <div class="sub" id="s">${esc(pin.sub)}</div>
</div>
<div class="site" id="site">japan-travel-kit.com</div>
</body></html>`;
}

async function render(page, pin) {
  const src = await photo(pin);
  const jpg = await sharp(src).rotate()
    .resize(W, PHOTO_H, { fit: 'cover', position: pin.focus || 'centre' })
    .jpeg({ quality: 92 }).toBuffer();
  await page.setContent(html(pin, `data:image/jpeg;base64,${jpg.toString('base64')}`), { waitUntil: 'networkidle' });
  const fit = await page.evaluate(async (maxW) => {
    await document.fonts.ready;
    const h = document.getElementById('h');
    const s = document.getElementById('s');
    const loaded = ['600 20px "Noto Serif"', '400 20px "Noto Sans"', '700 20px "Noto Sans"']
      .every((f) => [...document.fonts].some((ff) => ff.status === 'loaded' && f.includes(ff.family)));
    const countLines = (size) => Math.round(h.getBoundingClientRect().height / (size * 1.16));
    let size = 74;
    for (; size > 50; size -= 2) {
      h.style.fontSize = `${size}px`;
      if (countLines(size) <= 3) break;
    }
    h.style.fontSize = `${size}px`;
    return {
      loaded,
      size,
      lines: countLines(size),
      subW: s.getBoundingClientRect().width,
      maxW,
      gap: document.getElementById('site').getBoundingClientRect().top - s.getBoundingClientRect().bottom,
    };
  }, W - PAD_X * 2);
  if (!fit.loaded) throw new Error(`${pin.slug}: Google Fonts not loaded`);
  if (fit.lines > 3) throw new Error(`${pin.slug}: headline over 3 lines`);
  if (fit.subW > fit.maxW) throw new Error(`${pin.slug}: sub-heading wider than the panel (${fit.subW}px)`);
  if (fit.gap < 24) throw new Error(`${pin.slug}: text runs into the footer (${fit.gap}px)`);
  const png = await page.screenshot({ type: 'png' });
  let q = 86;
  let out;
  do {
    out = await sharp(png).jpeg({ quality: q, mozjpeg: true, progressive: true }).toBuffer();
    q -= 6;
  } while (out.length > MAX_BYTES && q > 40);
  if (out.length > MAX_BYTES) throw new Error(`${pin.slug}: ${out.length} bytes`);
  fs.writeFileSync(path.join(OUT, `${pin.id}.jpg`), out);
  return { bytes: out.length, size: fit.size, lines: fit.lines };
}

const csvCell = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;

function writeDocs() {
  // Photo sources for every pin; one bulk-create CSV per batch (the first, unbatched
  // 30 pins stay in docs/pinterest-pins.csv).
  const tsv = ['slug\tphoto_page_url\tphotographer\tlicense'];
  const csvs = new Map();
  const ids = new Set();
  for (const p of allPins) {
    if (ids.has(p.id)) throw new Error(`duplicate pin id: ${p.id}`);
    ids.add(p.id);
    if (p.title.length > 100) throw new Error(`title > 100: ${p.id}`);
    const maxDesc = p.batch ? 450 : 500;
    if (p.description.length > maxDesc) throw new Error(`description > ${maxDesc}: ${p.id}`);
    if (p.description.includes('#')) throw new Error(`hashtag in description: ${p.id}`);
    const kw = p.keywords.split(',').map((k) => k.trim());
    const [kMin, kMax] = p.batch ? [5, 8] : [3, 5];
    if (kw.length < kMin || kw.length > kMax) throw new Error(`keywords ${kMin}-${kMax}: ${p.id}`);
    tsv.push([p.id, p.photoPage, p.photographer, 'Pexels License'].join('\t'));
    const campaign = p.variant ? `pin_${p.slug}_${p.variant}` : `pin_${p.slug}`;
    const link = `${SITE}/guides/${p.cat}/${p.slug}?utm_source=pinterest&utm_medium=social&utm_campaign=${campaign}`;
    const board = p.board || THEMES[p.theme].board;
    const file = p.batch ? `docs/pinterest-pins-${p.batch}.csv` : 'docs/pinterest-pins.csv';
    if (!csvs.has(file)) csvs.set(file, ['Title,Media URL,Pinterest board,Thumbnail,Description,Link,Publish date,Keywords']);
    csvs.get(file).push([p.title, `${SITE}/pins/${p.id}.jpg`, board, '', p.description, link, '', kw.join(', ')].map(csvCell).join(','));
  }
  fs.writeFileSync(path.join(ROOT, 'docs/pinterest-photo-sources.tsv'), tsv.join('\n') + '\n');
  for (const [file, rows] of csvs) fs.writeFileSync(path.join(ROOT, file), rows.join('\n') + '\n');
}

async function contactSheet(file) {
  const cols = 6;
  const tw = 250;
  const th = 375;
  const gap = 10;
  const rows = Math.ceil(pins.length / cols);
  const tiles = await Promise.all(pins.map(async (p, i) => ({
    input: await sharp(path.join(OUT, `${p.id}.jpg`)).resize(tw, th).toBuffer(),
    left: gap + (i % cols) * (tw + gap),
    top: gap + Math.floor(i / cols) * (th + gap),
  })));
  await sharp({ create: { width: gap + cols * (tw + gap), height: gap + rows * (th + gap), channels: 3, background: BRAND.soft } })
    .composite(tiles).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
try {
  for (const p of pins) {
    if (only && !only.includes(p.id)) continue;
    const r = await render(page, p);
    console.log(`${p.id}.jpg  ${(r.bytes / 1024).toFixed(0)} KB  headline ${r.size}px x${r.lines}`);
  }
} finally {
  await browser.close();
}
writeDocs();
if (contactPath) { await contactSheet(contactPath); console.log(`contact sheet: ${contactPath}`); }
console.log(`${pins.length} pins`);
