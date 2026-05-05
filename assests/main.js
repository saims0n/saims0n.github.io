/* ============================================================
   SAIMSON PORTFOLIO — MAIN JS
   ============================================================ */

// ── CURSOR ──────────────────────────────────────────────────
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-outline');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
});
(function animRing() {
  rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.cap-card,.proj-card,.cert-card,.tool-tag,.channel-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (dot) dot.style.transform = 'translate(-50%,-50%) scale(2.5)';
    if (ring) { ring.style.transform = 'translate(-50%,-50%) scale(1.6)'; ring.style.opacity = '0.8'; }
  });
  el.addEventListener('mouseleave', () => {
    if (dot) dot.style.transform = 'translate(-50%,-50%) scale(1)';
    if (ring) { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '0.5'; }
  });
});

// ── MATRIX CANVAS ────────────────────────────────────────────
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let cols, drops;
  function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(0).map(() => Math.random() * -50);
  }
  initMatrix();
  window.addEventListener('resize', initMatrix);
  const chars = '01アイウエカサタナハマヤラワ!@#$%&*_+-=<>?/\\|{}[]';
  function drawMatrix() {
    ctx.fillStyle = 'rgba(8,12,16,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '13px Fira Code, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random();
      if (bright > 0.95) ctx.fillStyle = '#00ff9d';
      else ctx.fillStyle = '#00e5ff';
      ctx.globalAlpha = Math.random() * 0.6 + 0.1;
      ctx.fillText(ch, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    });
    ctx.globalAlpha = 1;
  }
  setInterval(drawMatrix, 60);
}

// ── NAV TOGGLE (mobile) ──────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── NAV SCROLL EFFECT ────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.background = window.scrollY > 40 ? 'rgba(8,12,16,0.97)' : 'rgba(8,12,16,0.85)';
});

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal-card, .reveal-up');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── COUNTER ANIMATION ────────────────────────────────────────
const counters = document.querySelectorAll('[data-target]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else el.textContent = Math.floor(current);
      }, 35);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

// ── TYPEWRITER EFFECT (hero eyebrow) ─────────────────────────
const typeLine = document.querySelector('.type-line');
if (typeLine) {
  const text = typeLine.dataset.text || '';
  typeLine.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      typeLine.textContent += text[i++];
      setTimeout(typeChar, 36);
    }
  }
  setTimeout(typeChar, 800);
}

// ── SKILL BARS ────────────────────────────────────────────────
const fills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const w = getComputedStyle(e.target).getPropertyValue('--w').trim();
      e.target.style.width = w;
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
fills.forEach(f => { f.style.width = '0'; skillObs.observe(f); });
