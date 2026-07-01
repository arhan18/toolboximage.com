import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const svgs = fs.readdirSync(publicDir).filter(f => f.startsWith('og-') && f.endsWith('.svg'));
// Also check for root og-image.svg
if (fs.existsSync(path.join(publicDir, 'og-image.svg'))) {
  if (!svgs.includes('og-image.svg')) svgs.push('og-image.svg');
}

(async () => {
  for (const svg of svgs) {
    const input = path.join(publicDir, svg);
    const output = path.join(publicDir, svg.replace('.svg', '.png'));
    const svgContent = fs.readFileSync(input, 'utf-8');
    await sharp(Buffer.from(svgContent)).resize(1200, 630).png().toFile(output);
    console.log(`Generated ${svg.replace('.svg', '.png')}`);
  }
})();
