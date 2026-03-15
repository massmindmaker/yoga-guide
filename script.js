// ===== Phone Screen Carousel =====
class PhoneCarousel {
  constructor(el) {
    this.el = el;
    this.screens = el.querySelectorAll('.screen');
    this.dots = el.querySelectorAll('.dot');
    this.current = 0;
    this.total = this.screens.length;
    this.interval = null;
    this.delay = parseInt(el.dataset.delay || '3500');
    if (this.total <= 1) return;
    this.screens.forEach((s, i) => { s.style.opacity = i === 0 ? '1' : '0'; s.style.pointerEvents = i === 0 ? 'auto' : 'none'; });
    this.updateDots();
    el.addEventListener('mouseenter', () => this.pause());
    el.addEventListener('mouseleave', () => this.play());
  }
  goto(n) {
    this.screens[this.current].style.opacity = '0';
    this.screens[this.current].style.pointerEvents = 'none';
    this.current = n % this.total;
    this.screens[this.current].style.opacity = '1';
    this.screens[this.current].style.pointerEvents = 'auto';
    this.updateDots();
  }
  next() { this.goto(this.current + 1); }
  updateDots() {
    this.dots.forEach((d, i) => {
      d.classList.toggle('active', i === this.current);
    });
  }
  play() {
    if (this.total <= 1) return;
    this.pause();
    this.interval = setInterval(() => this.next(), this.delay);
  }
  pause() { clearInterval(this.interval); }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {

  // Init all phone carousels
  const carousels = [];
  document.querySelectorAll('.phone-carousel').forEach(el => {
    const c = new PhoneCarousel(el);
    carousels.push(c);
  });

  // Start carousels when visible
  const carouselObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const c = carousels.find(x => x.el === entry.target);
      if (!c) return;
      if (entry.isIntersecting) c.play(); else c.pause();
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.phone-carousel').forEach(el => carouselObserver.observe(el));

  // Dot clicks
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const phone = dot.closest('.phone-carousel');
      const c = carousels.find(x => x.el === phone);
      if (c) { c.pause(); c.goto(parseInt(dot.dataset.i)); c.play(); }
    });
  });

  // ===== Scroll animations =====
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.anim-on-scroll').forEach(el => scrollObserver.observe(el));

  // Workflow blocks
  document.querySelectorAll('.wf-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all .7s cubic-bezier(.25,.46,.45,.94)';
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
    }, { threshold: 0.08 });
    obs.observe(el);
  });

  // Phone frames entrance
  document.querySelectorAll('.phone-frame').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) rotate(1deg)';
    el.style.transition = 'all .8s cubic-bezier(.25,.46,.45,.94) .15s';
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0) rotate(0)'; }
    }, { threshold: 0.15 });
    obs.observe(el);
  });

  // Counter animation
  document.querySelectorAll('.counter').forEach(el => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !el.dataset.done) {
        el.dataset.done = '1';
        const target = parseInt(el.textContent);
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 25));
        const iv = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur;
          if (cur >= target) clearInterval(iv);
        }, 40);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // Progress bar fills
  document.querySelectorAll('[data-fill]').forEach(el => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !el.dataset.done) {
        el.dataset.done = '1';
        setTimeout(() => { el.style.width = el.dataset.fill; }, 200);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
