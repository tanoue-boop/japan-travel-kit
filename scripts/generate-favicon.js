const sharp = require('sharp');
const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '../public/icons/logo.svg');
const OUT = path.join(__dirname, '../public');

async function main() {
  // Generate PNGs
  const sizes = [16, 32, 180, 192, 512];
  for (const size of sizes) {
    const outFile = size === 180
      ? path.join(OUT, 'apple-touch-icon.png')
      : size === 192
      ? path.join(OUT, 'android-chrome-192x192.png')
      : size === 512
      ? path.join(OUT, 'android-chrome-512x512.png')
      : path.join(OUT, `favicon-${size}x${size}.png`);

    await sharp(SRC)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(outFile);
    console.log(`Generated: ${path.basename(outFile)}`);
  }

  // Generate favicon.ico from 16x16 and 32x32 buffers
  const buf16 = fs.readFileSync(path.join(OUT, 'favicon-16x16.png'));
  const buf32 = fs.readFileSync(path.join(OUT, 'favicon-32x32.png'));
  const icoBuffer = await toIco([buf16, buf32]);
  fs.writeFileSync(path.join(OUT, 'favicon.ico'), icoBuffer);
  console.log('Generated: favicon.ico');
}

main().catch(console.error);
