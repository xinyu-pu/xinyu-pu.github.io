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
let explicitTheme = false;
try { explicitTheme = ['light', 'dark'].includes(localStorage.getItem('xinyu-theme')); } catch (_) {}
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
// A short, gently staggered reveal keeps category changes easy to follow.
const publicationAnimations = new Map();
const publicationReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
filters.forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  publicationAnimations.forEach(animation => animation.cancel());
  publicationAnimations.clear();
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  papers.forEach(paper => { paper.hidden = button.dataset.filter !== 'all' && paper.dataset.category !== button.dataset.filter; });
  announceCount();
  if (publicationReducedMotion.matches) return;
  papers.filter(paper => !paper.hidden).forEach((paper, index) => {
    if (typeof paper.animate !== 'function') return;
    const animation = paper.animate([
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 280, delay: Math.min(index, 5) * 25,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
    publicationAnimations.set(paper, animation);
    animation.finished.then(() => {
      if (publicationAnimations.get(paper) === animation) publicationAnimations.delete(paper);
    }).catch(() => {});
  });
}));
publicationReducedMotion.addEventListener('change', event => {
  if (event.matches) {
    publicationAnimations.forEach(animation => animation.cancel());
    publicationAnimations.clear();
  }
});
// Expand from the clicked thumbnail and return to it on dismissal.
let lightboxOrigin = null;
let lightboxAnimation = null;
let lightboxClosing = false;
let lightboxRequest = 0;
const lightboxReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function thumbnailTransform() {
  if (!lightboxOrigin?.isConnected || lightboxOrigin.getBoundingClientRect().width === 0) return null;
  const source = lightboxOrigin.getBoundingClientRect();
  const target = lightboxImage.getBoundingClientRect();
  const dialog = lightbox.getBoundingClientRect();
  if (!target.width || !target.height) return null;
  const sx = source.width / target.width;
  const sy = source.height / target.height;
  const x = source.left - dialog.left - sx * (target.left - dialog.left);
  const y = source.top - dialog.top - sy * (target.top - dialog.top);
  return `translate(${x}px, ${y}px) scale(${sx}, ${sy})`;
}
function closeLightbox() {
  if (!lightbox?.open || lightboxClosing) return;
  lightboxAnimation?.cancel();
  const destination = thumbnailTransform();
  if (lightboxReducedMotion.matches || !destination || typeof lightbox.animate !== 'function') {
    lightbox.close();
    return;
  }
  lightboxClosing = true;
  lightbox.dataset.closing = 'true';
  lightboxAnimation = lightbox.animate([
    { transform: 'none', opacity: 1 },
    { transform: destination, opacity: 0 }
  ], { duration: 200, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'both' });
  lightboxAnimation.finished.then(() => lightbox.close()).catch(() => {});
}
paperFigures.forEach(link => link.addEventListener('click', async event => {
  if (!lightbox || typeof lightbox.showModal !== 'function') return;
  event.preventDefault();
  const request = ++lightboxRequest;
  const thumbnail = link.querySelector('img');
  lightboxOrigin = thumbnail || link;
  lightboxImage.src = link.href;
  lightboxImage.alt = thumbnail?.alt || '';
  lightboxCaption.textContent = thumbnail?.alt || '';
  try { await lightboxImage.decode(); } catch (_) {} // Still allow the browser's image-error UI.
  if (request !== lightboxRequest) return;
  lightboxAnimation?.cancel();
  lightboxClosing = false;
  delete lightbox.dataset.closing;
  if (!lightbox.open) lightbox.showModal();
  const origin = thumbnailTransform();
  if (!lightboxReducedMotion.matches && origin && typeof lightbox.animate === 'function') {
    lightboxAnimation = lightbox.animate([
      { transform: origin, opacity: .35 },
      { transform: 'none', opacity: 1 }
    ], { duration: 280, easing: 'cubic-bezier(.22, 1, .36, 1)' });
  }
}));
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
lightbox?.addEventListener('cancel', event => {
  event.preventDefault();
  closeLightbox();
});
lightbox?.addEventListener('close', () => {
  ++lightboxRequest;
  lightboxAnimation?.cancel();
  lightboxAnimation = null;
  lightboxClosing = false;
  delete lightbox.dataset.closing;
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
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Independent detail panels keep every experience card in place.
const experienceCards = [...document.querySelectorAll('.experience-card')];
const experienceAnimations = new WeakMap();
const experienceReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function animateExperience(panel, expand) {
  const previous = experienceAnimations.get(panel);
  if (!previous && panel.hidden === !expand) return;
  const measure = () => {
    const style = getComputedStyle(panel);
    return { height: panel.getBoundingClientRect().height + 'px', opacity: style.opacity,
      marginTop: style.marginTop, paddingTop: style.paddingTop, paddingBottom: style.paddingBottom,
      borderTopWidth: style.borderTopWidth, borderBottomWidth: style.borderBottomWidth,
      transform: style.transform === 'none' ? 'translateY(0) scale(1)' : style.transform };
  };
  const collapsed = { height: '0px', opacity: 0, marginTop: '0px', paddingTop: '0px',
    paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px',
    transform: 'translateY(-6px) scale(.995)' };
  const start = panel.hidden ? collapsed : measure();
  previous?.cancel();
  experienceAnimations.delete(panel);
  panel.inert = !expand;
  panel.setAttribute('aria-hidden', String(!expand));
  if (experienceReducedMotion.matches || typeof panel.animate !== 'function') {
    panel.hidden = !expand;
    return;
  }
  panel.hidden = false;
  const finish = expand ? measure() : collapsed;
  const animation = panel.animate([start, finish], {
    duration: 460, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both'
  });
  experienceAnimations.set(panel, animation);
  animation.finished.then(() => {
    if (experienceAnimations.get(panel) !== animation) return;
    panel.hidden = !expand;
    animation.cancel();
    experienceAnimations.delete(panel);
  }).catch(() => {}); // A rapid second click continues from the current visual position.
}
function selectExperience(card, expand) {
  experienceCards.forEach(item => {
    const selected = item === card && expand;
    item.setAttribute('aria-expanded', String(selected));
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    if (panel) animateExperience(panel, selected);
  });
}
experienceCards.forEach(card => card.addEventListener('click', () => {
  selectExperience(card, card.getAttribute('aria-expanded') !== 'true');
}));
document.querySelectorAll('.experience-panel').forEach(panel => panel.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const card = document.getElementById(panel.getAttribute('aria-labelledby'));
    selectExperience(card, false);
    card?.focus();
  }
}));
function openLinkedExperience() {
  const card = experienceCards.find(item => '#' + item.id === location.hash);
  if (card) selectExperience(card, true);
}
window.addEventListener('hashchange', openLinkedExperience);
openLinkedExperience();

// The overview stays collapsed until requested, independently of institution cards.
const researchSummaryToggle = document.getElementById('research-summary-toggle');
const researchSummary = document.getElementById('research-summary');
researchSummaryToggle?.addEventListener('click', () => {
  const expand = researchSummaryToggle.getAttribute('aria-expanded') !== 'true';
  researchSummaryToggle.setAttribute('aria-expanded', String(expand));
  animateExperience(researchSummary, expand);
});
researchSummary?.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    researchSummaryToggle.setAttribute('aria-expanded', 'false');
    animateExperience(researchSummary, false);
    researchSummaryToggle.focus();
  }
});

const sectionNavigation = [...document.querySelectorAll('nav a[href^="#"]')];
const navigationSections = sectionNavigation.map(link => ({
  link, section: document.getElementById(link.getAttribute('href').slice(1))
})).filter(item => item.section);
let navigationFrame = 0;
function updateSectionNavigation() {
  navigationFrame = 0;
  const header = document.querySelector('.header');
  const threshold = (header?.getBoundingClientRect().bottom || 0) + 48;
  let active = navigationSections[0];
  for (const item of navigationSections) {
    if (item.section.getBoundingClientRect().top <= threshold) active = item;
  }
  navigationSections.forEach(item => {
    const selected = item === active;
    item.link.classList.toggle('active', selected);
    if (selected) item.link.setAttribute('aria-current', 'location');
    else item.link.removeAttribute('aria-current');
  });
}
function scheduleSectionNavigation() {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateSectionNavigation);
}
window.addEventListener('scroll', scheduleSectionNavigation, { passive: true });
window.addEventListener('resize', scheduleSectionNavigation);
window.addEventListener('hashchange', scheduleSectionNavigation);
window.addEventListener('load', scheduleSectionNavigation);
if (typeof ResizeObserver === 'function') {
  const navigationResizeObserver = new ResizeObserver(scheduleSectionNavigation);
  navigationSections.forEach(item => navigationResizeObserver.observe(item.section));
  const header = document.querySelector('.header');
  if (header) navigationResizeObserver.observe(header);
}
updateSectionNavigation();
