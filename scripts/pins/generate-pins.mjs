#!/usr/bin/env node
/**
 * Pinterest pin generator.
 *
 * Reads scripts/pins/pins.json and, for each entry:
 *   - downloads the Pexels photo (cached in node_modules/.cache/pins),
 *   - crops it to 1000x1500 and overlays a translucent band with the headline,
 *     a one-line sub-heading and the site name at the foot,
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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = 'https://www.japan-travel-kit.com';
const W = 1000;
const H = 1500;
const MAX_BYTES = 400 * 1024;
const CACHE = path.join(ROOT, 'node_modules/.cache/pins');
const OUT = path.join(ROOT, 'public/pins');

const THEMES = {
  winter: { band: '#14254a', accent: '#9cc4ff', board: 'Japan Winter Travel' },
  attr: { band: '#c8341c', accent: '#ffd9a8', board: 'Tokyo & Osaka Attractions' },
  money: { band: '#14503a', accent: '#b8f0cf', board: 'Japan Travel Tips: eSIM, Money & Insurance' },
};

const args = process.argv.slice(2);
const argVal = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const contactPath = argVal('--contact');
const only = argVal('--only')?.split(',');

const pins = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/pins/pins.json'), 'utf8'));
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Rough advance widths (em) for a bold sans; good enough to wrap without a text-metrics lib.
function textWidth(s, size) {
  let w = 0;
  for (const ch of s) {
    if (ch === ' ') w += 0.28;
    else if ('il.,:;\'!|'.includes(ch)) w += 0.3;
    else if ('fjrtI-'.includes(ch)) w += 0.38;
    else if ('mwMW'.includes(ch)) w += 0.9;
    else if (/[A-Z&]/.test(ch)) w += 0.72;
    else w += 0.6;
  }
  return w * size;
}

function wrap(text, size, maxW) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (cur && textWidth(next, size) > maxW) { lines.push(cur); cur = word; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function fitHeadline(text, maxW) {
  for (let size = 96; size >= 60; size -= 4) {
    const lines = wrap(text, size, maxW);
    if (lines.length <= 3 && lines.every((l) => textWidth(l, size) <= maxW)) return { size, lines };
  }
  throw new Error(`headline does not fit in 3 lines: ${text}`);
}

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

function overlay(pin) {
  const t = THEMES[pin.theme];
  const padX = 60;
  const bandX = 50;
  const bandW = W - bandX * 2;
  const { size, lines } = fitHeadline(pin.headline, bandW - padX * 2);
  const lh = Math.round(size * 1.12);
  const subSize = 44;
  const bandTop = 120;
  const firstBase = bandTop + 56 + size * 0.8;
  const lastBase = firstBase + lh * (lines.length - 1);
  const subY = lastBase + size * 0.25 + 22 + subSize;
  const bandH = subY - bandTop + 44;
  const head = lines.map((l, i) =>
    `<text x="${W / 2}" y="${firstBase + i * lh}" text-anchor="middle" font-size="${size}" font-weight="800" fill="#ffffff">${esc(l)}</text>`).join('');
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="foot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.78"/>
    </linearGradient>
  </defs>
  <g font-family="'Segoe UI', Arial, Helvetica, sans-serif">
    <rect x="${bandX}" y="${bandTop}" width="${bandW}" height="${bandH}" rx="18" fill="${t.band}" fill-opacity="0.88"/>
    <rect x="${W / 2 - 60}" y="${bandTop + 26}" width="120" height="6" rx="3" fill="${t.accent}"/>
    ${head}
    <text x="${W / 2}" y="${subY}" text-anchor="middle" font-size="${subSize}" font-weight="600" fill="${t.accent}">${esc(pin.sub)}</text>
    <rect x="0" y="${H - 260}" width="${W}" height="260" fill="url(#foot)"/>
    <text x="${W / 2}" y="${H - 70}" text-anchor="middle" font-size="48" font-weight="700" fill="#ffffff" letter-spacing="1">japan-travel-kit.com</text>
  </g>
</svg>`);
}

async function render(pin) {
  const src = await photo(pin);
  const base = await sharp(src).rotate().resize(W, H, { fit: 'cover', position: pin.focus || 'centre' }).toBuffer();
  const composed = await sharp(base).composite([{ input: overlay(pin) }]).toBuffer();
  let q = 84;
  let out;
  do {
    out = await sharp(composed).jpeg({ quality: q, mozjpeg: true, progressive: true }).toBuffer();
    q -= 6;
  } while (out.length > MAX_BYTES && q > 40);
  if (out.length > MAX_BYTES) throw new Error(`${pin.slug}: ${out.length} bytes`);
  fs.writeFileSync(path.join(OUT, `${pin.slug}.jpg`), out);
  return out.length;
}

const csvCell = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;

function writeDocs() {
  const tsv = ['slug\tphoto_page_url\tphotographer\tlicense'];
  const csv = ['Title,Media URL,Pinterest board,Thumbnail,Description,Link,Publish date,Keywords'];
  for (const p of pins) {
    if (p.title.length > 100) throw new Error(`title > 100: ${p.slug}`);
    if (p.description.length > 500) throw new Error(`description > 500: ${p.slug}`);
    if (p.description.includes('#')) throw new Error(`hashtag in description: ${p.slug}`);
    const kw = p.keywords.split(',').map((k) => k.trim());
    if (kw.length < 3 || kw.length > 5) throw new Error(`keywords 3-5: ${p.slug}`);
    tsv.push([p.slug, p.photoPage, p.photographer, 'Pexels License'].join('\t'));
    const link = `${SITE}/guides/${p.cat}/${p.slug}?utm_source=pinterest&utm_medium=social&utm_campaign=pin_${p.slug}`;
    csv.push([p.title, `${SITE}/pins/${p.slug}.jpg`, THEMES[p.theme].board, '', p.description, link, '', kw.join(', ')].map(csvCell).join(','));
  }
  fs.writeFileSync(path.join(ROOT, 'docs/pinterest-photo-sources.tsv'), tsv.join('\n') + '\n');
  fs.writeFileSync(path.join(ROOT, 'docs/pinterest-pins.csv'), csv.join('\n') + '\n');
}

async function contactSheet(file) {
  const cols = 6;
  const tw = 250;
  const th = 375;
  const gap = 10;
  const rows = Math.ceil(pins.length / cols);
  const tiles = await Promise.all(pins.map(async (p, i) => ({
    input: await sharp(path.join(OUT, `${p.slug}.jpg`)).resize(tw, th).toBuffer(),
    left: gap + (i % cols) * (tw + gap),
    top: gap + Math.floor(i / cols) * (th + gap),
  })));
  await sharp({ create: { width: gap + cols * (tw + gap), height: gap + rows * (th + gap), channels: 3, background: '#f2f0ec' } })
    .composite(tiles).jpeg({ quality: 82, mozjpeg: true }).toFile(file);
}

for (const p of pins) {
  if (only && !only.includes(p.slug)) continue;
  const bytes = await render(p);
  console.log(`${p.slug}.jpg  ${(bytes / 1024).toFixed(0)} KB`);
}
writeDocs();
if (contactPath) { await contactSheet(contactPath); console.log(`contact sheet: ${contactPath}`); }
console.log(`${pins.length} pins`);
