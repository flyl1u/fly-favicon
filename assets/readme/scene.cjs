// Build with the fly-readme skill; all project assets resolve relative to this file.
const fs = require('node:fs');
const path = require('node:path');

module.exports = ({draw: d, sceneDir}) => {
  const root = path.resolve(sceneDir, '../..');
  const ink = '#343932';
  const muted = '#6E7065';
  const files = [
    ['docs/icons/01-floating-capsule.svg', 'Floating capsule'],
    ['docs/living-heads-01/icons/01.svg', 'Orange cat'],
    ['docs/icons/06-origami-flight.svg', 'Origami flight'],
    ['docs/pixel-player-styles-03/icons/01.svg', 'Blue pixel player'],
    ['docs/icons/03-glass-island.svg', 'Frosted glass'],
    ['docs/living-heads-01/icons/04.svg', 'Floppy-eared dog'],
    ['docs/icons/07-orbital-island.svg', 'Orbital island'],
    ['docs/living-heads-01/icons/07.svg', 'Sunglasses friend'],
    ['docs/pixel-player-styles-03/icons/05.svg', 'Neon headphones'],
    ['docs/icons/10-sunrise-island.svg', 'Sunrise island'],
  ];

  // Preserve existing artwork, namespace paint IDs, and replace only metadata.
  function icon(index, x, y, size, instance) {
    const [file, title] = files[index];
    let svg = fs.readFileSync(path.join(root, file), 'utf8')
      .replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, '')
      .replace(/\saria-labelledby="[^"]*"/g, '')
      .replace(/\sid="([^"]+)"/g, (_, id) => ` id="${instance}-${id}"`)
      .replace(/url\(#([^)]*)\)/g, (_, id) => `url(#${instance}-${id})`)
      .replace(/\shref="#([^"]*)"/g, (_, id) => ` href="#${instance}-${id}"`)
      .replace(/[ \t]+(?=\r?$)/gm, '');
    svg = svg.replace(/<svg\b([^>]*)>/, (_, attributes) => {
      const clean = attributes.replace(/\s(?:width|height|x|y)="[^"]*"/g, '');
      return `<svg${clean} x="${x}" y="${y}" width="${size}" height="${size}"><title>${d.esc(title)}</title>`;
    });
    d.assertStatic(svg);
    return svg;
  }

  const input = d.box({x: 670, y: 244, w: 163, h: 174, fill: '#FFFDF7', seed: 8})
    + d.path('M672 279 Q751 281 831 279', {color: '#AAA99B', width: 1.7})
    + '<circle cx="686" cy="262" r="3.5" fill="#D9A08A"/>'
    + '<circle cx="699" cy="262" r="3.5" fill="#E1C36D"/>'
    + '<circle cx="712" cy="262" r="3.5" fill="#9EB69C"/>'
    + d.box({x: 686, y: 298, w: 57, h: 55, fill: '#DFEAFA', seed: 3})
    + d.symbol({kind: 'image', cx: 714, cy: 325, size: 43, color: '#6C8294'})
    + d.path('M758 307 L813 307 M758 323 L806 323 M758 340 L796 340', {color: '#A3AA9A', width: 4})
    + '<rect x="686" y="376" width="33" height="23" rx="7" fill="#E9BBA5"/>'
    + '<rect x="730" y="376" width="33" height="23" rx="7" fill="#C5DCC8"/>'
    + '<rect x="774" y="376" width="39" height="23" rx="7" fill="#D3DEF0"/>';

  const cells = files.map((_, i) => {
    const x = 945 + (i % 5) * 68;
    const y = 248 + Math.floor(i / 5) * 76;
    const selected = i === 1;
    return `<rect x="${x}" y="${y}" width="62" height="62" rx="13" fill="${selected ? '#F9E7AC' : '#F4F4EE'}" stroke="${selected ? '#B69B4B' : '#DFE1D6'}" stroke-width="${selected ? 2.5 : 1.2}"/>`
      + icon(i, x + 9, y + 9, 44, `candidate-${i}`);
  }).join('');

  const chooser = d.box({x: 941, y: 174, w: 365, h: 303, fill: '#E3EBDD', rotate: 2, seed: 4})
    + d.box({x: 929, y: 164, w: 365, h: 303, fill: '#FFFDF7', seed: 9})
    + d.path('M932 230 Q1110 233 1291 230', {color: '#AAA99B', width: 1.8})
    + cells
    + d.path('M1060 294 L1063 327 L1072 318 L1079 331 L1086 327 L1079 314 L1091 312 Z', {fill: '#FFFDF7', width: 2.8})
    + d.path('M946 404 Q1112 405 1276 404', {color: '#E1E1D7', width: 1.3})
    + icon(1, 1153, 429, 16, 'sample-16')
    + icon(1, 1190, 421, 24, 'sample-24')
    + icon(1, 1235, 413, 32, 'sample-32');

  const browser = d.box({x: 1400, y: 256, w: 210, h: 165, fill: '#FFFDF7', seed: 2})
    + d.path('M1402 316 L1607 316', {color: '#AAA99B', width: 1.7})
    + d.path('M1403 313 L1403 286 Q1403 268 1420 268 L1566 268 Q1581 268 1582 285 L1584 313 Z', {fill: '#E2ECDF', width: 2.2})
    + icon(1, 1416, 281, 26, 'live-tab')
    + d.path('M1560 285 l8 8 M1568 285 l-8 8', {color: '#7D8476', width: 1.9})
    + d.path('M1421 342 L1506 342 M1421 358 L1542 358 M1421 375 L1489 375', {color: '#C6CEBF', width: 4.5})
    + '<rect x="1420" y="392" width="59" height="10" rx="5" fill="#E9DBB1"/>'
    + d.path('M1553 377 L1594 377 L1615 398 L1614 454 Q1585 457 1553 454 Z', {fill: '#E2ECDF', width: 2.8})
    + d.path('M1594 378 L1594 398 L1613 398', {color: '#7C8F78', width: 2.3})
    + d.path('M1516 405 L1516 424 M1508 417 L1516 426 L1524 417 M1506 434 L1528 434', {color: '#75866D', width: 2.5});

  const english = {
    id: 'hero-en',
    label: 'English',
    title: 'fly-favicon - ten styles, ready to try in your tab',
    description: 'A hand-drawn workflow shows a website leading to ten SVG favicon candidates. An orange cat is selected, checked at 16, 24, and 32 pixels, and appears in a browser tab beside a downloadable SVG file.',
    width: 1680,
    height: 640,
    background: d.paper({color: '#FBF8EF'}),
    art: d.path('M65 313 Q320 324 591 311', {color: '#F4D786', width: 17, opacity: 0.72})
      + d.path('M624 155 Q620 316 625 491', {color: '#CCC7B9', width: 1.4, opacity: 0.65})
      + input
      + d.arrow({from: [858, 329], to: [903, 329], width: 3.1, head: 14, bend: -2})
      + chooser
      + d.arrow({from: [1329, 329], to: [1375, 329], width: 3.2, head: 15, bend: -2})
      + browser
      + d.path('M1596 238 l7 -12 M1610 246 l14 -5', {color: '#BE9B49', width: 2.6}),
    labels: [
      {text: 'Agent Skill', x: 68, y: 169, w: 490, h: 40, size: 24, color: muted},
      {text: 'fly-favicon', x: 60, y: 208, w: 550, h: 139, size: 101, bold: true, letterSpacing: -3.4},
      {text: 'Ten styles. Try them in your tab.', x: 67, y: 350, w: 540, h: 56, size: 30},
      {text: 'Compare at real sizes. Download the SVG.', x: 69, y: 423, w: 540, h: 43, size: 22, color: muted},
      {text: 'Your website', x: 649, y: 447, w: 205, h: 46, size: 26, align: 'center'},
      {text: '10 SVG styles', x: 945, y: 179, w: 330, h: 45, size: 29, align: 'center', bold: true},
      {text: '16 / 24 / 32 px', x: 949, y: 416, w: 195, h: 38, size: 21, color: muted},
      {text: 'Compare & choose', x: 929, y: 487, w: 365, h: 48, size: 27, align: 'center'},
      {text: 'Your site', x: 1450, y: 275, w: 108, h: 33, size: 21, color: ink},
      {text: 'SVG', x: 1557, y: 407, w: 54, h: 35, size: 21, align: 'center', bold: true},
      {text: 'Try in your tab', x: 1366, y: 487, w: 276, h: 48, size: 27, align: 'center'},
    ],
    sources: [
      'Repository paths in these notes resolve from the fly-favicon repository root, two directories above scene.cjs and SOURCES.md.',
      'Project scope and capability claims: README.en.md, SKILL.md, and scripts/build_comparison.py in the fly-favicon repository.',
      'Existing favicon artwork: ' + files.map(([file, title]) => `${file} (${title})`).join('; ') + '.',
      'Favicon artwork is reused from this repository under its MIT License (LICENSE), Copyright (c) 2026 fly liu. Geometry and colors are unchanged; title/description metadata is replaced with English, and paint-server IDs are namespaced for inline embedding.',
      'The website, comparison board, browser tab, cursor, download file, arrows, and paper are original schematic SVG geometry. The candidate board combines existing examples from different project demos; it is not a screenshot or a claim that these examples came from one prompt.',
      'Layout and rendering: the locally installed fly-readme skill, scripts/build.cjs and scripts/draw.cjs. Rebuild both languages with: node <fly-readme>/scripts/build.cjs assets/readme/scene.cjs --out assets/readme --renderer browser. The SVG and HTML need no packages to view; PNG rendering uses Playwright and a browser or Sharp, located through the skill runtime.',
      'English lettering remains native SVG text with Comic Sans MS, Segoe Print, Bradley Hand, and cursive fallbacks. Its appearance can vary by system. The Chinese labels use vector outlines to preserve the requested handwriting in GitHub image embeds without requiring a locally installed font; their wording remains editable in scene.cjs.',
      'Chinese handwriting: Xiaolai v3.126 by the Xiaolai Font Project Authors; upstream https://github.com/lxgw/kose-font/releases/tag/v3.126, Xiaolai-Regular.ttf. Only the glyph outlines used by this banner are stored in assets/readme/lettering/handwritten-glyphs.json, exported with fontTools SVGPathPen and BoundsPen. The pinned source font SHA-256 is recorded in that file. The upstream copyright notice and OFL-1.1 license are retained in assets/readme/lettering/OFL.txt (from upstream revision 172d9dbe94ade82b5316e0989e3aa286b7041baf). This subset is font artwork under OFL-1.1; the repository MIT license does not replace the font license. scene.cjs checks Chinese outline bounds before export; browser font metrics apply to the remaining native text.',
      'The Chinese localization was explicitly requested by the project owner. The paired assets hero-zh.svg and hero-en.svg are used at the top of README.md and README.en.md respectively; both share the approved layout and artwork.',
    ],
  };

  const translations = {
    'Agent Skill': {text: '图标设计 Skill', size: 26},
    'Ten styles. Try them in your tab.': {text: '十种风格，放进标签页里试。', size: 32},
    'Compare at real sizes. Download the SVG.': {text: '原尺寸比较，下载独立 SVG。', size: 24},
    'Your website': {text: '你的网站', size: 28},
    '10 SVG styles': {text: '10 种 SVG 风格', size: 29},
    'Compare & choose': {text: '同屏比较与选择', size: 29},
    'Your site': {text: '我的网站', size: 21},
    'Try in your tab': {text: '标签页即时试用', size: 29},
  };
  const lettering = JSON.parse(fs.readFileSync(path.join(sceneDir, 'lettering/handwritten-glyphs.json'), 'utf8'));

  // Use actual handwritten glyphs; outline them so GitHub cannot replace the font.
  function handwritten(label) {
    const glyphs = Array.from(label.text).map(char => {
      if (!lettering.glyphs[char]) throw Error(`Add the handwritten glyph for ${char} to lettering/handwritten-glyphs.json`);
      return lettering.glyphs[char];
    });
    const scale = label.size / lettering.unitsPerEm;
    const spacing = label.letterSpacing || 0;
    const width = glyphs.reduce((sum, glyph) => sum + glyph.advance * scale, 0) + (glyphs.length - 1) * spacing;
    const x = label.x + (label.align === 'center' ? (label.w - width) / 2 : label.align === 'right' ? label.w - width : 0);
    const baseline = label.y + label.h / 2 + label.size * 0.35;
    let cursor = 0;
    const paths = glyphs.map(glyph => {
      if (glyph.bounds) {
        const [left, bottom, right, top] = glyph.bounds;
        if (x + (cursor + left) * scale < label.x - 1 || x + (cursor + right) * scale > label.x + label.w + 1
          || baseline - top * scale < label.y - 1 || baseline - bottom * scale > label.y + label.h + 1) {
          throw Error(`Handwritten label does not fit: ${label.text}`);
        }
      }
      const art = glyph.path ? `<path transform="translate(${d.n(cursor)} 0)" d="${d.esc(glyph.path)}"/>` : '';
      cursor += glyph.advance + spacing / scale;
      return art;
    }).join('');
    return `<g role="img" aria-label="${d.esc(label.text)}" data-handwritten-label="${d.esc(label.text)}"><title>${d.esc(label.text)}</title><g transform="translate(${d.n(x)} ${d.n(baseline)}) scale(${d.n(scale)} ${d.n(-scale)})" fill="${label.color || ink}">${paths}</g></g>`;
  }
  const chineseLabels = english.labels.map(label => translations[label.text]
    ? {...label, ...translations[label.text], handwritten: true}
    : label);
  const chinese = {
    ...english,
    id: 'hero-zh',
    label: 'Chinese',
    allowCjk: true,
    title: 'fly-favicon：十种风格，放进标签页里试',
    description: '手绘流程图：从网站主题探索十种 SVG 图标，选中橘猫，在 16、24、32 像素下比较，并在浏览器标签页里即时试用、下载独立 SVG。',
    art: english.art + chineseLabels.filter(label => label.handwritten).map(handwritten).join(''),
    labels: chineseLabels.filter(label => !label.handwritten),
  };
  return {title: 'fly-favicon README banners', variants: [chinese, english]};
};
