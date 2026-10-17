'use strict';

/* ============================================================
   Portafolio - Jeison Parra C.
   Módulos: tema, menú, typing, scroll, reveal, filtros, form.
   ============================================================ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Tema ---------- */
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'light') root.classList.add('light');
  else root.classList.remove('light');

  const toggle = $('#themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      root.classList.toggle('light');
      const now = root.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('theme', now);
    });
  }
})();

/* ---------- Menú móvil ---------- */
(function initMenu() {
  const toggle = $('#menuToggle');
  const nav = $('#nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------- Typing effect ---------- */
(function initTyping() {
  const el = $('#typing');
  if (!el) return;
  const words = ['Desarrollador Web', 'Desarrollador Móvil', 'Apasionado por la IA'];
  let wi = 0, ci = 0, deleting = false;
  const type = () => {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1400); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 60 : 90);
  };
  type();
})();

/* ---------- Scroll progress + active link ---------- */
(function initScroll() {
  const bar = $('#scrollBar');
  const links = $$('.nav-link');
  const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0) + '%';

    let current = sections[0];
    sections.forEach((s) => { if (scrollTop >= s.offsetTop - 120) current = s; });
    links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + (current && current.id)));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Reveal on scroll ---------- */
(function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
})();

/* ---------- Contadores ---------- */
(function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      n = Math.min(target, n + step);
      el.textContent = n;
      if (n >= target) clearInterval(timer);
    }, 40);
  };
  if (!('IntersectionObserver' in window)) { counters.forEach(animate); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));
})();

/* ---------- Filtro de proyectos ---------- */
(function initFilters() {
  const btns = $$('.filter-btn');
  const cards = $$('#projectsGrid .project-card');
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach((card) => {
        const tags = (card.dataset.tags || '').split(/\s+/);
        const show = f === 'all' || tags.includes(f);
        card.classList.toggle('hidden', !show);
      });
    });
  });
})();

/* ---------- Formulario de contacto ---------- */
(function initForm() {
  const form = $('#contactForm');
  if (!form) return;
  const name = $('#name'), email = $('#email'), message = $('#message');
  const nameErr = $('#nameError'), emailErr = $('#emailError'), msgErr = $('#messageError');
  const note = $('#formNote');

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    nameErr.textContent = ''; emailErr.textContent = ''; msgErr.textContent = ''; note.textContent = '';

    if (name.value.trim().length < 2) { nameErr.textContent = 'Ingresa tu nombre (mínimo 2 caracteres).'; ok = false; }
    if (!isEmail(email.value.trim())) { emailErr.textContent = 'Ingresa un correo válido.'; ok = false; }
    if (message.value.trim().length < 10) { msgErr.textContent = 'El mensaje debe tener al menos 10 caracteres.'; ok = false; }

    if (!ok) return;

    const subject = encodeURIComponent('Contacto desde portafolio - ' + name.value.trim());
    const body = encodeURIComponent('Nombre: ' + name.value.trim() + '\nCorreo: ' + email.value.trim() + '\n\n' + message.value.trim());
    window.location.href = 'mailto:yeison22ocampo@gmail.com?subject=' + subject + '&body=' + body;
    note.textContent = 'Abriendo tu cliente de correo…';
    form.reset();
  });
})();

/* ---------- Año dinámico ---------- */
(function initYear() {
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
