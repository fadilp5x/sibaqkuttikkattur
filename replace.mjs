import fs from 'node:fs';
import path from 'node:path';

function walk(dir, callback) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, callback);
    else callback(p);
  }
}

walk('./src', (file) => {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
  let content = fs.readFileSync(file, 'utf8');
  let orig = content;
  
  // Replacements for moving from dark theme to light theme
  content = content.replace(/\bbg-night\b/g, 'bg-paper');
  content = content.replace(/\bbg-plum2\b/g, 'bg-gray-100');
  content = content.replace(/\bbg-plum\b/g, 'bg-gray-50');
  
  content = content.replace(/\btext-cream\b/g, 'text-ink');
  content = content.replace(/\btext-cream\/(\d+)\b/g, 'text-ink/$1');
  
  content = content.replace(/\bborder-white\/(\d+)\b/g, 'border-black/$1');
  content = content.replace(/\bbg-white\/(\d+)\b/g, 'bg-black/$1');
  
  content = content.replace(/\btext-white\/(\d+)\b/g, 'text-black/$1');

  if (orig !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
