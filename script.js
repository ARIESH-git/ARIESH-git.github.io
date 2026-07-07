// ---------- Config ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Year in footer ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Hero typewriter ----------
(function typewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const finalText = el.textContent.trim();

  if (prefersReducedMotion) {
    el.textContent = finalText;
    return;
  }

  el.textContent = '';
  el.classList.add('typing');

  let i = 0;
  const speed = 90; // ms per char
  const tick = () => {
    if (i <= finalText.length) {
      el.textContent = finalText.slice(0, i);
      i++;
      setTimeout(tick, speed);
    } else {
      // Keep caret blinking for a beat, then remove
      setTimeout(() => el.classList.remove('typing'), 1600);
    }
  };
  // Small delay so page paints first
  setTimeout(tick, 250);
})();

// ---------- Scroll reveal ----------
(function scrollReveal() {
  const targets = document.querySelectorAll(
    '.section, .stat, .project, .cert'
  );
  targets.forEach(t => t.classList.add('reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(t => io.observe(t));
})();

// ---------- Smooth nav highlight (optional, subtle) ----------
(function activeNavHighlight() {
  const links = document.querySelectorAll('.nav__links a');
  const sections = Array.from(links)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          const match = l.getAttribute('href') === `#${id}`;
          l.style.color = match ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => io.observe(s));
})();
