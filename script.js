// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
// Sticky nav already handled by CSS position:sticky, no JS needed

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Stagger sibling reveals
document.querySelectorAll('.exp-row, .proj-card, .pub-entry, .cv-item').forEach((el, i) => {
  const group = el.parentElement;
  const siblings = Array.from(group.querySelectorAll('.reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0) el.style.transitionDelay = `${idx * 0.06}s`;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

// ===== ACTIVE NAV =====
const navAs = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAs.forEach(a => {
          const active = a.getAttribute('href') === `#${entry.target.id}`;
          a.style.color = active ? 'var(--text)' : '';
        });
      }
    });
  },
  { threshold: 0.3 }
);
sections.forEach(s => sectionObserver.observe(s));
