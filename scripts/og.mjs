/**
 * Genera la imagen para compartir (Open Graph / Twitter), 1200x630.
 * Se ejecuta a mano cuando cambia el diseno: `node scripts/og.mjs`.
 * El PNG resultante (public/og.png) se commitea; no forma parte del build.
 *
 * Render via sharp (libvips + librsvg). El texto usa fuentes del sistema
 * (Liberation/DejaVu Sans) para no depender de fuentes empaquetadas.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og.png');

const W = 1200;
const H = 630;
const PAD = 84;

const FONT = "'Liberation Sans', 'DejaVu Sans', sans-serif";

const pill = (x, y, w, label) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="60" rx="14"
          fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.14"/>
    <text x="${x + w / 2}" y="${y + 39}" text-anchor="middle"
          font-family="${FONT}" font-size="27" font-weight="700"
          fill="#e9e7e1">${label}</text>
  </g>`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="18%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#2b6cb0" stop-opacity="0.30"/>
      <stop offset="55%" stop-color="#177a41" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#1c2024" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#1c2024"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Franja superior tipo carretera (rayas ambar) -->
  <g>
    ${Array.from({ length: 26 }, (_, i) => `<rect x="${i * 48}" y="0" width="28" height="10" fill="#e8a317" fill-opacity="0.85"/>`).join('')}
  </g>

  <!-- Marca: semaforo + nombre -->
  <g transform="translate(${PAD}, 92)">
    <rect x="0" y="0" width="64" height="158" rx="16" fill="#11151a"/>
    <circle cx="32" cy="38" r="17" fill="#b3271f"/>
    <circle cx="32" cy="79" r="17" fill="#e8a317"/>
    <circle cx="32" cy="120" r="17" fill="#2bbd5e"/>
    <text x="92" y="70" font-family="${FONT}" font-size="46" font-weight="800"
          fill="#ffffff" letter-spacing="0.5">Taller B1</text>
    <text x="92" y="118" font-family="${FONT}" font-size="27" font-weight="400"
          fill="#b8bec6">Examen teorico de conduccion · Colombia</text>
  </g>

  <!-- Titular -->
  <text x="${PAD}" y="358" font-family="${FONT}" font-size="78" font-weight="800"
        fill="#f4f1ea">Aprueba tu examen</text>
  <text x="${PAD}" y="446" font-family="${FONT}" font-size="78" font-weight="800"
        fill="#2bbd5e">de conduccion B1</text>

  <!-- Datos clave -->
  ${pill(PAD, 510, 250, '96 preguntas')}
  ${pill(PAD + 274, 510, 300, 'Simulacro 40 / 40 min')}
  ${pill(PAD + 598, 510, 250, 'Aprueba con 80%')}
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('OG generada:', out);
