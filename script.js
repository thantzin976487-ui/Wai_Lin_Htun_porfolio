(() => {
  const navLinks = [...document.querySelectorAll('.nav-link[data-nav]')];
  const trackedSections = [...document.querySelectorAll('[data-nav]')]
    .filter(el => !el.classList.contains('nav-link'));
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  const cards = [...document.querySelectorAll('.project-card[data-image]')];
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeButton = document.getElementById('lightboxClose');
  const previousButton = document.getElementById('lightboxPrev');
  const nextButton = document.getElementById('lightboxNext');
  let currentIndex = -1;
  let lastFocused = null;

  // Navbar: highlight the matching menu item.
  function setActiveNav(navName) {
    navLinks.forEach(link => {
      const active = link.dataset.nav === navName;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  // Close the mobile menu after choosing a navigation link.
  navLinks.forEach(link => link.addEventListener('click', () => {
    setActiveNav(link.dataset.nav);
    navbar?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  menuToggle?.addEventListener('click', () => {
    const opened = navbar?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(opened));
  });

  // Navbar active state follows scrolling. Work galleries belong to Content.
  let scrollPending = false;
  function updateActiveNav() {
    const anchorY = window.scrollY + Math.max(100, window.innerHeight * 0.32);
    let current = trackedSections[0];

    for (const section of trackedSections) {
      if (section.getBoundingClientRect().top + window.scrollY <= anchorY) {
        current = section;
      } else {
        break;
      }
    }

    if (current?.dataset.nav) setActiveNav(current.dataset.nav);
    scrollPending = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollPending) {
      requestAnimationFrame(updateActiveNav);
      scrollPending = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  window.addEventListener('hashchange', () => setTimeout(updateActiveNav, 80));
  updateActiveNav();

  // AOS-style animation: replay when an element enters the screen again.
  // Important: do NOT unobserve the element. Remove the class on exit so it can replay.
  const animated = [...document.querySelectorAll('[data-aos]')];
  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('aos-animate', entry.isIntersecting);
      });
    }, {
      threshold: 0.10,
      rootMargin: '-9% 0px -9% 0px'
    });

    animated.forEach(el => revealObserver.observe(el));
  } else {
    // Keep content visible when IntersectionObserver or motion is unavailable.
    animated.forEach(el => el.classList.add('aos-animate'));
  }

  // Lightbox: open only the selected project image.
  function showCard(index) {
    if (!cards.length || !lightboxImage || !lightboxCaption) return;
    currentIndex = (index + cards.length) % cards.length;
    const card = cards[currentIndex];
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.dataset.title || 'Portfolio project';
    lightboxCaption.textContent = `${card.dataset.title || 'Portfolio project'}  ·  ${String(currentIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (previousButton) previousButton.disabled = cards.length < 2;
    if (nextButton) nextButton.disabled = cards.length < 2;
  }

  function openLightbox(index) {
    if (!lightbox || !closeButton) return;
    lastFocused = document.activeElement;
    showCard(index);
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImage?.removeAttribute('src');
    document.body.classList.remove('lightbox-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => openLightbox(index));
  });
  closeButton?.addEventListener('click', closeLightbox);
  previousButton?.addEventListener('click', event => {
    event.stopPropagation();
    showCard(currentIndex - 1);
  });
  nextButton?.addEventListener('click', event => {
    event.stopPropagation();
    showCard(currentIndex + 1);
  });
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.querySelector('.lightbox-figure')?.addEventListener('click', event => {
    event.stopPropagation();
  });

  document.addEventListener('keydown', event => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    else if (event.key === 'ArrowLeft') showCard(currentIndex - 1);
    else if (event.key === 'ArrowRight') showCard(currentIndex + 1);
  });

  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();
})();
