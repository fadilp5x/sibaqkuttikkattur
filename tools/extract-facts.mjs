// Harvests text facts from the legacy HTML files (strips base64 blobs first).
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const legacyDir = join(process.cwd(), '_legacy');

for (const file of readdirSync(legacyDir).filter((f) => f.endsWith('.html'))) {
  let html = readFileSync(join(legacyDir, file), 'utf8');
  html = html.replace(/data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+/g, '[IMG]');
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&').replace(/&rsquo;/g, "'").replace(/&quot;/g, '"')
    .replace(/&#8377;/g, '₹').replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/gi, ' ')
    .split('\n').map((s) => s.trim()).filter((s) => s.length > 1).join('\n');
  console.log(`\n================ ${file} TEXT ================\n`);
  console.log(text);
  console.log(`\n================ ${file} ATTRS ================\n`);
  const attrs = html.match(/(option value|placeholder|data-[a-z-]+)="[^"]{2,80}"/gi) || [];
  console.log([...new Set(attrs)].join('\n'));
  const links = html.match(/href="(https?:[^"]+)"/g) || [];
  console.log('\n-- links --\n' + [...new Set(links)].join('\n'));
}
