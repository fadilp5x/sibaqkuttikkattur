// Extracts base64 data-URI images from the legacy HTML files so they can be
// vetted visually and reused as real asset files.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const legacyDir = new URL('../_legacy/', import.meta.url).pathname.replace(/^\//, '');
const outDir = join(process.cwd(), 'tools', 'extracted');
mkdirSync(outDir, { recursive: true });

const files = readdirSync(legacyDir).filter((f) => f.endsWith('.html'));
let count = 0;

for (const file of files) {
  const html = readFileSync(join(legacyDir, file), 'utf8');
  const re = /data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const ext = m[1] === 'jpeg' ? 'jpg' : m[1] === 'svg+xml' ? 'svg' : m[1];
    const name = `${file.replace('.html', '')}-${String(count).padStart(2, '0')}.${ext}`;
    writeFileSync(join(outDir, name), Buffer.from(m[2], 'base64'));
    count++;
  }
}

console.log(`Extracted ${count} images to tools/extracted/`);
