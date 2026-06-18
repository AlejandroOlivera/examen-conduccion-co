/**
 * Genera los iconos PNG para el manifest PWA a partir de public/favicon.svg.
 * Se ejecuta a mano o via: `pnpm run icons`
 */
import sharp from 'sharp';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');
const faviconPath = join(__dirname, '..', 'public', 'favicon.svg');

fs.mkdirSync(iconsDir, { recursive: true });

(async () => {
  try {
    const svgBuffer = fs.readFileSync(faviconPath);

    // icon-192.png
    const out192 = join(iconsDir, 'icon-192.png');
    await sharp(svgBuffer).resize(192, 192).png().toFile(out192);
    console.log('Generated:', out192);

    // icon-512.png
    const out512 = join(iconsDir, 'icon-512.png');
    await sharp(svgBuffer).resize(512, 512).png().toFile(out512);
    console.log('Generated:', out512);

    // icon-maskable-512.png — icon at 80% (410px) centered on dark background
    const outMaskable = join(iconsDir, 'icon-maskable-512.png');
    const resizedIconBuffer = await sharp(svgBuffer).resize(410, 410).png().toBuffer();
    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 28, g: 32, b: 36, alpha: 1 },
      },
    })
      .composite([{ input: resizedIconBuffer, gravity: 'center' }])
      .png()
      .toFile(outMaskable);
    console.log('Generated:', outMaskable);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
