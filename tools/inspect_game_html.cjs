const fs = require('fs');

const content = fs.readFileSync('d:/supermom/sibaq_game_arena_festival_experience.html', 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);

lines.forEach((l, i) => {
  const trimmed = l.trim();
  if (trimmed.startsWith('<!--') || trimmed.includes('<section') || trimmed.includes('<svg') || trimmed.includes('id="tab') || trimmed.includes('id="entry-transition')) {
    console.log(`${i + 1}: ${trimmed.slice(0, 100)}`);
  }
});
