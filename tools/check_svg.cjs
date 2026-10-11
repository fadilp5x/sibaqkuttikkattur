const fs = require('fs');

const svgConfigs = [
  { file: 'sibaq-debate-sparks.svg', comp: 'DebateSparks' },
  { file: 'sibaq-living-calligraphy.svg', comp: 'LivingCalligraphy' },
  { file: 'sibaq-soundwave.svg', comp: 'Soundwave' },
  { file: 'sibaq-creative-brush.svg', comp: 'CreativeBrush' },
  { file: 'sibaq-poetry-scroll.svg', comp: 'PoetryScroll' },
  { file: 'sibaq-programme-constellation.svg', comp: 'ProgrammeConstellation' },
  { file: 'sibaq-festival-pass.svg', comp: 'FestivalPass' },
  { file: 'sibaq-shape-divider.svg', comp: 'ShapeDivider' }
];

svgConfigs.forEach(cfg => {
  const content = fs.readFileSync('public/media/' + cfg.file, 'utf8');
  const styleAttrMatches = content.match(/<[^>]+style="[^"]*"[^>]*>/g);
  console.log(`${cfg.comp}: inline style attrs = ${styleAttrMatches ? styleAttrMatches.length : 0}`);
});
