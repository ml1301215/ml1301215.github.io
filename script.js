// ===== HAMBURGER TOGGLE =====
const navBtn = document.querySelector('#site-nav button');
const hiddenLinks = document.querySelector('.hidden-links');
if (navBtn && hiddenLinks) {
  navBtn.addEventListener('click', function () {
    navBtn.classList.toggle('close');
    hiddenLinks.classList.toggle('show');
  });
  document.addEventListener('click', function (e) {
    if (!navBtn.contains(e.target) && !hiddenLinks.contains(e.target)) {
      navBtn.classList.remove('close');
      hiddenLinks.classList.remove('show');
    }
  });
}

// ===== FOLLOW BUTTON (mobile sidebar) =====
const followBtn = document.querySelector('.author__urls-wrapper button');
const authorUrls = document.querySelector('.author__urls');
if (followBtn && authorUrls) {
  followBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    authorUrls.style.display = authorUrls.style.display === 'block' ? '' : 'block';
  });
  document.addEventListener('click', function () {
    authorUrls.style.display = '';
  });
}

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

// ===== SMOOTH SCROLL =====
const masthead = document.querySelector('.masthead');
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = masthead ? masthead.offsetHeight + 8 : 8;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

// ===== ACTIVE NAV =====
const pathname = window.location.pathname.replace(/\/index\.html$/, '/');
document.querySelectorAll('.masthead__menu-item a').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href === '#') return;
  if (href === '/' && (pathname === '/' || pathname === '')) {
    a.classList.add('active');
  } else if (href !== '/' && pathname.startsWith(href)) {
    a.classList.add('active');
  }
});
