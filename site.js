'use strict';
const root = document.documentElement;
const languageButtons = [...document.querySelectorAll('[data-set-language]')];
const filters = [...document.querySelectorAll('[data-filter]')];
const papers = [...document.querySelectorAll('.paper')];
const themeButton = document.getElementById('theme-toggle');
const paperFigures = [...document.querySelectorAll('.paper-figure')];
const lightbox = document.getElementById('image-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const contactRevealButtons = [...document.querySelectorAll('[data-contact-reveal]')];
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const favicon = document.getElementById('site-favicon');
const faviconFrames = [
  'assets/mark.svg?v=5',
  'assets/mark-typing-2.svg?v=2',
  'assets/mark-typing-3.svg?v=2'
];
let faviconTimer;
let explicitTheme = false;
try { explicitTheme = ['light', 'dark'].includes(localStorage.getItem('xinyu-theme')); } catch (_) {}
function updateFaviconAnimation() {
  window.clearInterval(faviconTimer);
  if (!favicon) return;
  let frame = 0;
  favicon.href = faviconFrames[frame];
  if (reducedMotion.matches) return;
  faviconTimer = window.setInterval(() => {
    frame = (frame + 1) % faviconFrames.length;
    favicon.href = faviconFrames[frame];
  }, 520);
}
function announceCount() {
  const count = papers.filter(paper => !paper.hidden).length;
  document.getElementById('filter-status').textContent = root.dataset.language === 'zh' ? `显示 ${count} 篇论文` : `Showing ${count} publications`;
}
function updateThemeControl() {
  const dark = root.dataset.theme === 'dark';
  const label = root.dataset.language === 'zh' ? (dark ? '切换为浅色主题' : '切换为深色主题') : (dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  document.querySelector('meta[name="theme-color"]').content = dark ? '#202124' : '#ffffff';
}
function setLanguage(language) {
  const lang = language === 'zh' ? 'zh' : 'en';
  root.dataset.language = lang;
  root.lang = lang === 'zh' ? 'zh-CN' : 'en';
  languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLanguage === lang)));
  document.title = 'Xinyu Pu';
  if (lightboxClose) lightboxClose.setAttribute('aria-label', lang === 'zh' ? '关闭图片预览' : 'Close image preview');
  try { localStorage.setItem('xinyu-language', lang); } catch (_) {}
  announceCount();
  updateThemeControl();
}
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.setLanguage)));
setLanguage(root.dataset.language);
contactRevealButtons.forEach(button => button.addEventListener('click', () => {
  const value = document.getElementById(button.getAttribute('aria-controls'));
  if (!value) return;
  const willReveal = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(willReveal));
  button.textContent = willReveal ? button.dataset.hideLabel : button.dataset.showLabel;
  value.textContent = willReveal ? ['F330', '470351'].join('') : '';
  value.hidden = !willReveal;
}));
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  papers.forEach(paper => { paper.hidden = button.dataset.filter !== 'all' && paper.dataset.category !== button.dataset.filter; });
  announceCount();
}));
paperFigures.forEach(link => link.addEventListener('click', event => {
  if (!lightbox || typeof lightbox.showModal !== 'function') return;
  event.preventDefault();
  const thumbnail = link.querySelector('img');
  lightboxImage.src = link.href;
  lightboxImage.alt = thumbnail?.alt || '';
  lightboxCaption.textContent = thumbnail?.alt || '';
  lightbox.showModal();
}));
lightboxClose?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
lightbox?.addEventListener('close', () => {
  lightboxImage.removeAttribute('src');
});
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  explicitTheme = true;
  try { localStorage.setItem('xinyu-theme', theme); } catch (_) {}
  updateThemeControl();
});
systemTheme.addEventListener('change', event => {
  if (!explicitTheme) { root.dataset.theme = event.matches ? 'dark' : 'light'; updateThemeControl(); }
});
reducedMotion.addEventListener('change', updateFaviconAnimation);
updateFaviconAnimation();
document.getElementById('copyright-year').textContent = new Date().getFullYear();
