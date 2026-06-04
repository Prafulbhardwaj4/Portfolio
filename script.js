/* ════════════════════════════════════════════════════
   PRAFUL BHARDWAJ PORTFOLIO — script.js
   All interactivity: preloader, custom cursor, particles,
   typing effect, scroll animations, counters, project
   filtering, modal, contact form (EmailJS), navbar, ticker.
   ════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   EMAIL JS CONFIG
   Replace these with your actual EmailJS credentials.
   Sign up free at https://www.emailjs.com
   ───────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abcDEF_ghiJKL12'

/* ─────────────────────────────────────────────────────
   GOOGLE DRIVE RESUME LINK
   Replace with your actual Google Drive file link.
   Make sure sharing is set to "Anyone with the link".
   ───────────────────────────────────────────────────── */
const RESUME_URL = 'https://drive.google.com/uc?export=download&id=1irKkOY3gWp30WixrJ7ZlwKyW0_Nij91G';

/* ── Initialise Lucide icons ──────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY);
  init();
});

/* ════════════════════════════════════════════════════
   PRELOADER
   ════════════════════════════════════════════════════ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(triggerHeroReveals, 200);
    }, 1800);
  });
}

function triggerHeroReveals() {
  document.querySelectorAll('.section-hero .reveal-up, .section-hero .reveal-left, .section-hero .reveal-right')
    .forEach(el => el.classList.add('visible'));
}

/* ════════════════════════════════════════════════════
   CUSTOM CURSOR
   ════════════════════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = 'a, button, .project-card, .skill-category, .stat-card, .cert-card, input, textarea';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}

/* ════════════════════════════════════════════════════
   MOUSE FOLLOW GLOW
   ════════════════════════════════════════════════════ */
function initMouseGlow() {
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ════════════════════════════════════════════════════
   HERO CANVAS — particle grid
   ════════════════════════════════════════════════════ */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.5 + 0.1,
    };
  }

  function initParticles() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - dist / 120) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.a})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); });
  initParticles();
  loop();
}

/* ════════════════════════════════════════════════════
   TYPING EFFECT
   ════════════════════════════════════════════════════ */
function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'AI-powered systems.',
    'scalable FastAPIs.',
    'NLP pipelines.',
    'intelligent backends.',
    'ML-driven products.',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;
  const SPEED_TYPE = 70, SPEED_DEL = 40, PAUSE = 2000;

  function tick() {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx <= current.length) {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        setTimeout(tick, PAUSE);
        deleting = true;
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, SPEED_DEL);
    }
  }
  setTimeout(tick, 2000);
}

/* ════════════════════════════════════════════════════
   NAVBAR — scroll & active highlighting
   ════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  }, { passive: true });

  hamburger && hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    navLinks && navLinks.classList.toggle('open', open);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('open');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
      navLinks && navLinks.classList.remove('open');
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = 'hero';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }
}

/* ════════════════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
   ════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const nonHero = Array.from(els).filter(el => !el.closest('.section-hero'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  nonHero.forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════════════════
   ANIMATED COUNTERS
   ════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1600;
  const start    = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

/* ════════════════════════════════════════════════════
   PROJECT FILTERING
   ════════════════════════════════════════════════════ */
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cats = card.dataset.category || '';
        const show = filter === 'all' || cats.includes(filter);
        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          requestAnimationFrame(() => { card.style.animation = ''; });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ════════════════════════════════════════════════════
   PROJECT MODAL
   ════════════════════════════════════════════════════ */
const PROJECT_DATA = [
  {
    title: 'Customer Support Ticket Prioritization System',
    summary: 'A full-stack AI-powered SaaS complaint management platform with role-based JWT authentication. Trained an NLP + ML pipeline on 50,000+ real customer tweets to auto-classify tickets by priority, sentiment, and category — significantly reducing manual triage effort.',
    details: [
      'NLP pipeline: TF-IDF vectorization + Scikit-learn classifier trained on 50,000+ real customer support tweets.',
      'FastAPI backend with 10+ RESTful endpoints for ticket creation, retrieval, status updates, and filtering — fully validated via Postman.',
      'Role-based JWT authentication separating user and admin workflows end-to-end.',
      'Admin dashboard with filtering, remarks handling, and priority stats backed by optimized SQLite storage.',
      'Streamlit-based frontend for real-time ticket submission and admin review.',
    ],
    stack: ['Python', 'FastAPI', 'Scikit-learn', 'NLP', 'TF-IDF', 'SQLite', 'JWT', 'Streamlit'],
    github: 'https://github.com/Prafulbhardwaj4/Ticket-Prioritization-System',
    demo: 'https://www.linkedin.com/feed/update/urn:li:activity:7463552544045408257/',
  },
  {
    title: 'Real-Time AI Captioning System',
    summary: 'A real-time speech-to-text pipeline achieving live captioning with under 200ms end-to-end latency. Supports automatic language detection across 10+ languages with a modular, production-ready architecture.',
    details: [
      'Integrated external Speech-to-Text APIs with streaming audio input, achieving live captioning latency under 200ms.',
      'Automatic language detection enabling multilingual transcription across 10+ languages in real time.',
      'Modular architecture: audio capture → STT API streaming → NLP post-processing → live Streamlit render.',
      'FastAPI backend managing audio streaming and session state with clean separation of concerns.',
      'Built for extensibility and production reliability — easy to swap STT providers or add new languages.',
    ],
    stack: ['Python', 'FastAPI', 'Streamlit', 'Speech-to-Text APIs', 'NLP', 'Real-Time Streaming'],
    github: 'https://github.com/Prafulbhardwaj4/Real-time-captioning',
    demo: 'https://www.linkedin.com/feed/update/urn:li:activity:7454421864724082688/',
  },
  {
    title: 'Movie Recommendation System',
    summary: 'A content-based recommendation engine delivering personalized movie suggestions using cosine similarity on feature vectors extracted from movie metadata — genres, cast, crew, and keywords.',
    details: [
      'Content-based filtering using cosine similarity on TF-IDF feature vectors from movie metadata.',
      'Feature engineering from genres, cast, crew, director, and movie keywords for richer similarity scores.',
      'Interactive Streamlit frontend allowing real-time search and personalized recommendations.',
      'Efficient vector computation using NumPy and Pandas on a processed movie dataset.',
      'Clean, end-to-end Python + ML implementation from raw data to interactive UI.',
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit', 'Cosine Similarity', 'TF-IDF'],
    github: 'https://github.com/prafulbhardwaj',
    demo: '#',
  },
  {
    title: 'NLP Spell Corrector',
    summary: 'Built during the CodeSprint Hackathon 2024 at LPU — an NLP-based spelling correction system that detects and corrects misspelled words using text preprocessing and similarity matching techniques under hackathon time pressure.',
    details: [
      'Detects misspelled words using tokenization and edit-distance (Levenshtein) based matching.',
      'Text preprocessing pipeline: lowercasing, punctuation removal, tokenization, and vocabulary matching.',
      'Similarity-based correction suggesting the closest valid dictionary word for each misspelling.',
      'Built end-to-end at CodeSprint Hackathon 2024, Lovely Professional University.',
      'Demonstrates applied NLP fundamentals: text normalization, similarity scoring, and correction logic.',
    ],
    stack: ['Python', 'NLP', 'NLTK', 'Edit Distance', 'Text Preprocessing', 'Tokenization'],
    github: 'https://github.com/prafulbhardwaj',
    demo: '#',
  },
];

function initModal() {
  const modal    = document.getElementById('projectModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  const content  = document.getElementById('modalContent');
  if (!modal) return;

  function openModal(idx) {
    const p = PROJECT_DATA[idx];
    if (!p) return;

    content.innerHTML = `
      <h2>${p.title}</h2>
      <p>${p.summary}</p>
      <div class="modal-stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
      <ul>${p.details.map(d => `<li>${d}</li>`).join('')}</ul>
      <div class="modal-actions">
        <a href="${p.github}" class="btn btn-ghost btn-sm" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          GitHub
        </a>
        ${p.demo !== '#' ? `<a href="${p.demo}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Live Demo
        </a>` : ''}
      </div>`;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modal.focus();

    if (window.lucide) lucide.createIcons();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => openModal(parseInt(btn.dataset.project, 10)));
  });

  closeBtn  && closeBtn.addEventListener('click', closeModal);
  backdrop  && backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
}

/* ════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ════════════════════════════════════════════════════ */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icon = type === 'success'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

  toast.className = `toast-${type}`;
  toast.innerHTML = icon + message;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 4000);
  // Re-init lucide in toast
  if (window.lucide) lucide.createIcons();
}

/* ════════════════════════════════════════════════════
   CONTACT FORM — Formspree (sends to prafulbhardwaj1397@gmail.com)
   ════════════════════════════════════════════════════ */
function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitTxt = document.getElementById('submitText');
  const success   = document.getElementById('formSuccess');
  const errorEl   = document.getElementById('formError');
  if (!form) return;

  // Ensure success/error are hidden on load
  if (success) success.style.display = 'none';
  if (errorEl) errorEl.style.display = 'none';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const nameVal  = form.querySelector('#name').value.trim();
    const emailVal = form.querySelector('#email').value.trim();
    const msgVal   = form.querySelector('#message').value.trim();

    // Basic validation
    if (!nameVal || !emailVal || !msgVal) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    if (submitTxt) submitTxt.textContent = 'Sending…';

    // Hide previous status
    if (success) success.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://formspree.io/f/prafulbhardwaj1397', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      submitBtn.disabled = false;
      if (submitTxt) submitTxt.textContent = 'Send Message';

      if (response.ok) {
        // Success
        if (success) { success.style.display = 'flex'; }
        form.reset();
        showToast('Message sent! I\'ll get back to you soon. 🙌', 'success');
        setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
        if (window.lucide) lucide.createIcons();
      } else {
        throw new Error('Server error');
      }

    } catch (err) {
      submitBtn.disabled = false;
      if (submitTxt) submitTxt.textContent = 'Send Message';
      console.warn('Form error:', err);
      if (errorEl) errorEl.style.display = 'flex';
      showToast('Failed to send. Please email prafulbhardwaj1397@gmail.com directly.', 'error');
      setTimeout(() => { if (errorEl) errorEl.style.display = 'none'; }, 8000);
    }
  });
}

/* ════════════════════════════════════════════════════
   RESUME BUTTON
   ════════════════════════════════════════════════════ */
function initResumeBtn() {
  document.querySelectorAll('#resumeBtn, .resume-full-btn').forEach(btn => {
    // Update href to actual resume URL
    btn.href = RESUME_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    // Remove any click overrides
    btn.addEventListener('click', e => {
      if (RESUME_URL.includes('YOUR_RESUME_FILE_ID')) {
        e.preventDefault();
        showToast('Resume link coming soon — check back shortly!', 'error');
      }
      // Otherwise let the link open normally
    });
  });
}

/* ════════════════════════════════════════════════════
   SHOW ALL CERTIFICATIONS
   ════════════════════════════════════════════════════ */
function initShowAllCerts() {
  const btn        = document.getElementById('showAllCerts');
  const btnText    = document.getElementById('showAllText');
  const hiddenCards = document.querySelectorAll('.cert-card.cert-hidden');
  if (!btn || !hiddenCards.length) return;

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    btn.setAttribute('aria-expanded', expanded);
    btn.classList.toggle('expanded', expanded);

    if (expanded) {
      hiddenCards.forEach((card, i) => {
        card.style.display = '';       // make visible
        card.classList.remove('cert-hidden');
        // Stagger reveal animation
        setTimeout(() => card.classList.add('visible'), i * 60);
      });
      if (btnText) btnText.textContent = 'Show Less';
    } else {
      hiddenCards.forEach(card => {
        card.classList.add('cert-hidden');
        card.classList.remove('visible');
      });
      if (btnText) btnText.textContent = 'Show All Certifications';
    }

    if (window.lucide) lucide.createIcons();
  });
}

/* ════════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links
   ════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ════════════════════════════════════════════════════
   TICKER — pause on hover
   ════════════════════════════════════════════════════ */
function initTicker() {
  const inner = document.getElementById('tickerInner');
  if (!inner) return;
  const section = inner.closest('.ticker-section');
  section && section.addEventListener('mouseenter', () => {
    inner.style.animationPlayState = 'paused';
  });
  section && section.addEventListener('mouseleave', () => {
    inner.style.animationPlayState = 'running';
  });
}

/* ════════════════════════════════════════════════════
   CARD TILT (subtle 3-D on mouse move)
   ════════════════════════════════════════════════════ */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card, .stat-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const tiltX =  ((y - cy) / cy) * 5;
      const tiltY = -((x - cx) / cx) * 5;
      card.style.transform = `translateY(-5px) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ════════════════════════════════════════════════════
   GLOWING BORDER on focus for form inputs
   ════════════════════════════════════════════════════ */
function initFormGlow() {
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus',  () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur',   () => input.parentElement.classList.remove('focused'));
  });
}

/* ════════════════════════════════════════════════════
   MAIN INIT
   ════════════════════════════════════════════════════ */
function init() {
  initPreloader();
  initCursor();
  initMouseGlow();
  initHeroCanvas();
  initTyping();
  initNavbar();
  initScrollReveal();
  initCounters();
  initProjectFilters();
  initModal();
  initContactForm();
  initResumeBtn();
  initShowAllCerts();
  initSmoothScroll();
  initTicker();
  initCardTilt();
  initFormGlow();
}