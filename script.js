// ===== Scroll-triggered animations =====
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim-on-scroll').forEach(el => observer.observe(el));

  // Animate workflow blocks on scroll
  const wfObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.workflow-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    wfObserver.observe(el);
  });

  // Animate phone frames on scroll
  const phoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) rotate(0deg)';
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.phone-frame.small').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) rotate(2deg)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s';
    phoneObserver.observe(el);
  });

  // Animate voting bar fills on scroll
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.mock-vc-bar-fill');
        bars.forEach(bar => {
          const targetWidth = bar.classList.contains('full') ? '100%' : '60%';
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = targetWidth; }, 300);
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.mock-voting-card').forEach(el => barObserver.observe(el));

  // Animate progress bars on scroll
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.mock-progress-bar');
        if (bar) {
          const w = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = w; }, 400);
        }
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.mock-progress').forEach(el => progressObserver.observe(el));

  // Counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const target = parseInt(entry.target.textContent || '0');
        let current = 0;
        const step = Math.ceil(target / 20);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          entry.target.textContent = current.toString();
          if (current >= target) clearInterval(interval);
        }, 50);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter-anim').forEach(el => counterObserver.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
