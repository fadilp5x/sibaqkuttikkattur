const fs = require('fs');
const path = require('path');

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

function convertSvgToJsx(svgStr, compName) {
  // Extract style block if present
  let styleContent = '';
  const styleMatch = svgStr.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    styleContent = styleMatch[1];
  }

  // Replace style block with a placeholder so we don't mess up CSS syntax inside it
  let jsx = svgStr.replace(/<style>[\s\S]*?<\/style>/, '___STYLE_PLACEHOLDER___');

  // Strip XML comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  // Replace attributes with JSX camelCase
  const replacements = [
    { from: /\bclass=/g, to: 'className=' },
    { from: /\bstop-color=/g, to: 'stopColor=' },
    { from: /\bstop-opacity=/g, to: 'stopOpacity=' },
    { from: /\bflood-color=/g, to: 'floodColor=' },
    { from: /\bflood-opacity=/g, to: 'floodOpacity=' },
    { from: /\bstroke-width=/g, to: 'strokeWidth=' },
    { from: /\bstroke-linecap=/g, to: 'strokeLinecap=' },
    { from: /\bstroke-linejoin=/g, to: 'strokeLinejoin=' },
    { from: /\bstroke-dasharray=/g, to: 'strokeDasharray=' },
    { from: /\bstroke-opacity=/g, to: 'strokeOpacity=' },
    { from: /\bclip-path=/g, to: 'clipPath=' },
    { from: /\bclip-rule=/g, to: 'clipRule=' },
    { from: /\bfill-rule=/g, to: 'fillRule=' },
    { from: /\bfill-opacity=/g, to: 'fillOpacity=' },
    { from: /\bxlink:href=/g, to: 'xlinkHref=' }
  ];

  for (const r of replacements) {
    jsx = jsx.replace(r.from, r.to);
  }

  // Handle root <svg> tag: inject className prop
  // Match <svg ...>
  jsx = jsx.replace(/<svg\s+([^>]+)>/, (match, attrs) => {
    // If attrs has className, merge it, otherwise add className
    if (/className="([^"]*)"/.test(attrs)) {
      attrs = attrs.replace(/className="([^"]*)"/, 'className={`w-full h-full object-contain $1 ${className}`}');
    } else {
      attrs = `className={\`w-full h-full object-contain \${className}\`} ${attrs}`;
    }
    return `<svg ${attrs} aria-hidden="true">`;
  });

  // Re-inject style with JSX template literal and calm mode support
  if (styleContent) {
    // Also add calm mode selector matching the reduced motion rules
    const reducedMotionMatch = styleContent.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\}\s*\}/);
    let calmCss = '';
    if (reducedMotionMatch) {
      const innerRules = reducedMotionMatch[1];
      calmCss = `\n      [data-festival-theme="calm"] {\n${innerRules}\n      }`;
    }
    const fullStyle = styleContent + calmCss;
    const styleJsx = `<style>{\`\n${fullStyle}\n      \`}</style>`;
    jsx = jsx.replace('___STYLE_PLACEHOLDER___', styleJsx);
  }

  return `export default function ${compName}({ className = '' }: { className?: string }) {\n  return (\n    ${jsx.trim()}\n  );\n}\n`;
}

svgConfigs.forEach(cfg => {
  const rawSvg = fs.readFileSync(path.join('public/media', cfg.file), 'utf8');
  const jsxCode = convertSvgToJsx(rawSvg, cfg.comp);
  const targetFile = path.join('src/components', `${cfg.comp}.tsx`);
  fs.writeFileSync(targetFile, jsxCode, 'utf8');
  console.log(`Generated ${targetFile}`);
});
