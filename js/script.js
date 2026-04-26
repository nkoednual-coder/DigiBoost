/* ============================================
   DigiBoost - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);

  // ============================================
  // MOBILE NAV TOGGLE
  // ============================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counterElements = document.querySelectorAll('.counter-num');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target.toLocaleString();
          }
        };

        updateCounter();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  // ============================================
  // PORTFOLIO FILTER
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      
      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          card.style.display = '';
          
          setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Simple validation
      if (!data.name || !data.phone || !data.service) {
        alert('กรุณากรอกข้อมูลที่จำเป็น (ชื่อ, เบอร์โทร, บริการที่สนใจ)');
        return;
      }

      // Log data (in production, this would send to a server/Google Sheets)
      console.log('Contact Form Data:', data);

      // Show success message
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
      }
    });
  }

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // PARALLAX EFFECT FOR ORBS
  // ============================================
  const orbs = document.querySelectorAll('.orb');
  
  if (orbs.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      orbs.forEach((orb, index) => {
        const speed = index === 0 ? 0.3 : 0.2;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // ============================================
  // ACTIVE PAGE DETECTION
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (!link.closest('.nav-cta')) {
      // Don't remove active from CTA button
      link.classList.remove('active');
    }
  });

  // ============================================
  // TYPING EFFECT (Hero only)
  // ============================================
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.style.opacity = '1';
  }

  // ============================================
  // IMAGE LAZY LOADING
  // ============================================
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }

});
