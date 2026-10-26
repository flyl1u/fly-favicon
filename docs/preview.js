const previewUrl = new URL(window.location.href);
if (previewUrl.hostname === 'flyl1u.github.io' && previewUrl.pathname === '/fly-favicon/') {
  // Keep relative assets inside the project after shortening the displayed URL.
  const resourceBase = document.createElement('base');
  resourceBase.href = new URL('.', previewUrl).href;
  document.head.prepend(resourceBase);
  previewUrl.pathname = '/fly-favicon';
  try { window.history.replaceState(null, '', previewUrl); } catch { /* Restricted viewers can keep the original URL. */ }
}

const directions = [
  { id: '01', file: '01-floating-capsule', title: '极简悬岛', category: '极简实心 · 产品轮廓', description: '一枚胶囊加状态点，把悬浮工具的轮廓直接留下。' },
  { id: '02', file: '02-negative-notch', title: '负形顶岛', category: '黑白负形 · 桌面隐喻', description: '借屏幕上沿的内凹，表现小岛从顶部展开的位置。' },
  { id: '03', file: '03-glass-island', title: '雾面玻璃', category: '半透明 · 柔和渐变', description: '一片斜置的玻璃胶囊，用通透质感呼应产品材质。' },
  { id: '04', file: '04-contour-island', title: '等高线岛', category: '有机线稿 · 地形意象', description: '以三层疏密轮廓勾勒岛屿，安静、自然、有呼吸感。' },
  { id: '05', file: '05-isometric-platform', title: '等距浮台', category: '等距立体 · 空间悬浮', description: '一块悬空的平台，侧面厚度与下方短弧形成层次。' },
  { id: '06', file: '06-origami-flight', title: '折纸飞行', category: '几何折纸 · 轻快动势', description: '用纸飞机与一条折痕，把“fly”的轻盈变成图形。' },
  { id: '07', file: '07-orbital-island', title: '环轨卫星', category: '轨道线条 · 聚合中心', description: '一个中心、一颗卫星，表达常用工具围绕身边运行。' },
  { id: '08', file: '08-pixel-island', title: '像素浮岛', category: '像素块面 · 复古数字', description: '方格切出的悬浮小岛，与官网字符背景形成呼应。' },
  { id: '09', file: '09-stacked-trays', title: '叠片收纳', category: '几何叠层 · 工具收纳', description: '三张错位卡片汇入一个入口，呼应多种桌面功能。' },
  { id: '10', file: '10-sunrise-island', title: '日出海岛', category: '风景剪影 · 温暖留白', description: '一座低矮海岛配一轮日出，让品牌多一点生活气息。' },
];

const gallery = document.querySelector('#directions');
const iconPath = direction => `./icons/${direction.file}.svg`;

function sizeSamples(direction, theme) {
  return `<span class="samples samples--${theme}" aria-hidden="true">${[16, 24, 32].map(size => `<img src="${iconPath(direction)}" width="${size}" height="${size}" alt="">`).join('')}</span>`;
}

gallery.innerHTML = directions.map(direction => `
  <button class="direction" type="button" data-id="${direction.id}" aria-pressed="false" aria-label="试用 ${direction.id} ${direction.title}：${direction.category}">
    <span class="direction-meta"><span class="direction-number">${direction.id}</span><span class="direction-state" aria-hidden="true">试用中</span></span>
    <span class="artwork"><img src="${iconPath(direction)}" width="80" height="80" alt=""></span>
    <span class="direction-title">${direction.title}</span>
    <span class="direction-category">${direction.category}</span>
    <span class="direction-description">${direction.description}</span>
    ${sizeSamples(direction, 'light')}${sizeSamples(direction, 'dark')}
    <span class="sizes" aria-hidden="true"><span>16</span><span>24</span><span>32</span></span>
  </button>
`).join('');

function selectDirection(direction, { announce = true, updateUrl = true } = {}) {
  const path = iconPath(direction);
  document.querySelector('#preview-favicon').href = path;
  document.querySelector('#selected-icon').src = path;
  document.querySelector('#selected-icon').alt = direction.title;
  document.querySelector('#selected-title').textContent = direction.title;
  document.querySelector('#selected-number').textContent = direction.id;
  document.querySelectorAll('.tab-icon').forEach(icon => { icon.src = path; });
  document.querySelectorAll('.direction').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.id === direction.id)); });
  const download = document.querySelector('#download-selected');
  download.href = path;
  download.download = `fly-island-${direction.file}.svg`;
  document.title = `${direction.title} · 图标探索`;
  if (announce) document.querySelector('#selection-status').textContent = `已在当前标签页试用 ${direction.id} ${direction.title}`;
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('icon', direction.id);
    try { window.history.replaceState(null, '', url); } catch { /* Offline viewing can restrict history updates. */ }
  }
}

function selectFromUrl() {
  const requested = new URLSearchParams(window.location.search).get('icon');
  selectDirection(directions.find(direction => direction.id === requested) ?? directions[0], { announce: false, updateUrl: false });
}

gallery.addEventListener('click', event => {
  const button = event.target.closest('button[data-id]');
  if (button) selectDirection(directions.find(direction => direction.id === button.dataset.id));
});

document.querySelectorAll('[data-theme-choice]').forEach(button => {
  button.addEventListener('click', () => {
    document.documentElement.dataset.theme = button.dataset.themeChoice;
    document.querySelector('meta[name="theme-color"]').content = button.dataset.themeChoice === 'dark' ? '#151719' : '#f3f2ee';
    document.querySelectorAll('[data-theme-choice]').forEach(option => { option.setAttribute('aria-pressed', String(option === button)); });
  });
});

window.addEventListener('popstate', selectFromUrl);
selectFromUrl();
