const fs = require('fs');

const content = fs.readFileSync('d:/supermom/sibaq_game_arena_festival_experience.html', 'utf8');

// Find all <svg tags and their viewBox or classes
const svgMatches = content.match(/<svg[\s\S]*?<\/svg>/g) || [];
console.log('Total SVG blocks found:', svgMatches.length);

svgMatches.forEach((svg, idx) => {
  const vb = svg.match(/viewBox="([^"]+)"/);
  const cls = svg.match(/class="([^"]+)"/);
  const id = svg.match(/id="([^"]+)"/);
  console.log(`SVG #${idx + 1}: viewBox=${vb ? vb[1] : 'none'}, id=${id ? id[1] : 'none'}, class=${cls ? cls[1].slice(0, 50) : 'none'}`);
});
