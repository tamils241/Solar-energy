/* =========================================
   Stackly Solar Energy - Complete JavaScript
   Includes: Menu, Scroll, Counter, FAQ,
   Form Validation, Scroll Animations
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  // =========================================
  // 0. PAGE LOADER
  // =========================================
  var loader = document.querySelector('.page-loader');
  if (loader) {
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
  }

  // =========================================
  // 1. HAMBURGER MENU TOGGLE
  // =========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    // Create backdrop overlay
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu(open) {
      var isActive = open !== undefined ? open : !navLinks.classList.contains('active');
      navLinks.classList.toggle('active', isActive);
      hamburger.classList.toggle('active', isActive);
      overlay.classList.toggle('active', isActive);
      hamburger.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    }

    hamburger.addEventListener('click', function () {
      toggleMenu();
    });

    overlay.addEventListener('click', function () {
      toggleMenu(false);
    });

    document.querySelectorAll('.nav-links a, .nav-links button').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });
  }

  // =========================================
  // 2. STICKY HEADER
  // =========================================
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // =========================================
  // 2b. HERO TYPEWRITER EFFECT
  // =========================================
  var heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    var originalText = heroBadge.textContent.trim();
    var iconChar = originalText.charAt(0);
    var textPart = originalText.substring(1).trim();
    heroBadge.textContent = '';
    var i = 0;
    var typeTimer = setInterval(function () {
      if (i < textPart.length) {
        heroBadge.textContent = iconChar + ' ' + textPart.substring(0, i + 1);
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 35);
  }

  // =========================================
  // 3. SMOOTH SCROLL FOR ANCHORS
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =========================================
  // 4. SCROLL ANIMATIONS (IntersectionObserver)
  // =========================================
  var animElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  if (animElements.length && 'IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay');
          if (delay) {
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, parseInt(delay));
          } else {
            entry.target.classList.add('visible');
          }
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animElements.forEach(function (el) {
      animObserver.observe(el);
    });
  } else {
    animElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // =========================================
  // 5. ANIMATED COUNTER
  // =========================================
  var counters = document.querySelectorAll('.counter');

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var counter = entry.target;
          var target = parseInt(counter.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          counterObserver.unobserve(counter);

          var duration = 2500;
          var startTime = null;

          function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);

            if (target >= 1000000) {
              counter.textContent = (current / 1000000).toFixed(1);
            } else if (target >= 1000) {
              counter.textContent = current.toLocaleString();
            } else {
              counter.textContent = current;
            }

            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            } else {
              if (target >= 1000000) {
                counter.textContent = (target / 1000000).toFixed(1);
              } else {
                counter.textContent = target.toLocaleString();
              }
            }
          }

          requestAnimationFrame(animateCounter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  } else {
    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      if (target >= 1000000) {
        counter.textContent = (target / 1000000).toFixed(1);
      } else {
        counter.textContent = target.toLocaleString();
      }
    });
  }

  // =========================================
  // 6. FAQ ACCORDION
  // =========================================
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        faqItems.forEach(function (other) {
          other.classList.remove('active');
          var otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // FAQ filter tabs
  var faqFilters = document.querySelectorAll('.faq-filter');
  faqFilters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      faqFilters.forEach(function (f) { f.classList.remove('active'); });
      this.classList.add('active');
      var category = this.getAttribute('data-filter');
      faqItems.forEach(function (item) {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // =========================================
  // 7. CONTACT FORM VALIDATION
  // =========================================
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var fields = [
        { id: 'name', test: function (v) { return /^[A-Za-z\s]+$/.test(v.trim()) && v.trim().length >= 2 && v.trim().length <= 16; } },
        { id: 'email', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
        { id: 'subject', test: function (v) { return v !== ''; } },
        { id: 'message', test: function (v) { return v.trim().length > 0; } }
      ];

      fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        if (!input) return;

        var value = input.value;
        var valid = field.test(value);

        if (!valid) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        alert('Thank you for your message! Our team will get back to you within 24 hours.');
        contactForm.reset();
      }
    });

    contactForm.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        this.classList.remove('error');
      });
      el.addEventListener('change', function () {
        this.classList.remove('error');
      });
    });
  }

  // =========================================
  // 8. LOGIN FORM HANDLER
  // =========================================
  var loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var role = document.getElementById('loginRole').value;
      var email = document.getElementById('email').value.trim();
      var password = document.getElementById('password').value;

      if (!role || !email || !password) {
        alert('Please fill in all required fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      var userName = role === 'admin' ? 'Admin' : email.split('@')[0];
      localStorage.setItem('stackly_user_name', userName);
      localStorage.setItem('stackly_user_role', role);

      alert('Login successful! Welcome back to Stackly Solar Energy.');

      if (role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'client-dashboard.html';
      }
    });
  }

  // =========================================
  // 9. REGISTER FORM HANDLER
  // =========================================
  var registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fullName = document.getElementById('fullName').value.trim();
      var email = document.getElementById('regEmail').value.trim();
      var password = document.getElementById('regPassword').value;
      var confirmPassword = document.getElementById('confirmPassword').value;
      var terms = document.getElementById('terms').checked;
      var role = document.getElementById('regRole').value;

      if (!role || !fullName || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      if (!terms) {
        alert('Please agree to the Terms of Service and Privacy Policy.');
        return;
      }

      localStorage.setItem('stackly_user_name', fullName);
      localStorage.setItem('stackly_user_role', role);

      alert('Account created successfully! Welcome to Stackly Solar Energy.');

      if (role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = 'client-dashboard.html';
      }
    });
  }

  // =========================================
  // 10. CONTACT PAGE FORM HANDLER
  // =========================================
  var contactPageForm = document.getElementById('contactPageForm');

  if (contactPageForm) {
    contactPageForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var fields = [
        { id: 'name', test: function (v) { return /^[A-Za-z\s]+$/.test(v.trim()) && v.trim().length >= 2 && v.trim().length <= 16; } },
        { id: 'email', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
        { id: 'subject', test: function (v) { return v !== ''; } },
        { id: 'message', test: function (v) { return v.trim().length > 0; } }
      ];

      fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        if (!input) return;

        if (!field.test(input.value)) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        alert('Thank you for your message! Our team will get back to you within 24 hours.');
        contactPageForm.reset();
      }
    });

    contactPageForm.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () { this.classList.remove('error'); });
      el.addEventListener('change', function () { this.classList.remove('error'); });
    });
  }

  // =========================================
  // 11. NEWSLETTER FORM
  // =========================================
  var newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('newsletterEmail');
      var nameInput = document.getElementById('newsletterName');
      var email = emailInput ? emailInput.value.trim() : '';
      var name = nameInput ? nameInput.value.trim() : '';

      if (!email) {
        alert('Please enter your email address.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      var msg = name
        ? 'Thank you, ' + name.split(' ')[0] + '! You\'re now subscribed to Stackly Solar updates.'
        : 'Thank you for subscribing! Stay tuned for solar tips and exclusive offers.';
      alert(msg);
      newsletterForm.reset();
    });
  }

  // =========================================
  // 12. DASHBOARD USER NAME LOADER
  // =========================================
  var storedName = localStorage.getItem('stackly_user_name');
  var dashUserName = document.getElementById('dashUserName');
  if (dashUserName && storedName) {
    dashUserName.textContent = storedName;
  }
  var sidebarUserName = document.getElementById('sidebarUserName');
  if (sidebarUserName && storedName) {
    sidebarUserName.textContent = storedName;
  }

  // =========================================
  // 13. DARK MODE TOGGLE
  // =========================================
  function applyDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('stackly_dark_mode', enabled ? 'true' : '');
  }

  var darkToggle = document.getElementById('darkToggle');
  var mobileDarkToggle = document.getElementById('mobileDarkToggle');

  if (localStorage.getItem('stackly_dark_mode') === 'true') {
    applyDarkMode(true);
    if (darkToggle) darkToggle.textContent = '\u2600';
  }

  function toggleDarkMode() {
    var isDark = !document.body.classList.contains('dark-mode');
    applyDarkMode(isDark);
    if (darkToggle) darkToggle.textContent = isDark ? '\u2600' : '\u9790';
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', toggleDarkMode);
  }

  if (mobileDarkToggle) {
    mobileDarkToggle.addEventListener('click', function () {
      toggleDarkMode();
      var isDark = document.body.classList.contains('dark-mode');
      this.innerHTML = isDark ? '\u2600 Light Mode' : '\u9790 Dark Mode';
      var hamburger = document.getElementById('hamburger');
      var navLinks = document.getElementById('navLinks');
      var overlay = document.querySelector('.nav-overlay');
      if (hamburger && navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================
  // 14. TESTIMONIAL CAROUSEL
  // =========================================
  var testimonialsTrack = document.getElementById('testimonialsTrack');
  var sliderPrev = document.getElementById('sliderPrev');
  var sliderNext = document.getElementById('sliderNext');
  var sliderDots = document.getElementById('sliderDots');

  if (testimonialsTrack && sliderDots) {
    var cards = testimonialsTrack.querySelectorAll('.testimonial-card');
    var currentIndex = 0;
    var cardsCount = cards.length;
    var autoPlayInterval;

    function createDots() {
      sliderDots.innerHTML = '';
      for (var i = 0; i < cardsCount; i++) {
        var dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        (function (index) {
          dot.addEventListener('click', function () { goToSlide(index); });
        })(i);
        sliderDots.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      var offset = -currentIndex * 100;
      testimonialsTrack.style.transform = 'translateX(' + offset + '%)';

      cards.forEach(function (card, i) {
        card.classList.toggle('active', i === currentIndex);
      });

      var dots = sliderDots.querySelectorAll('.dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide((currentIndex + 1) % cardsCount);
    }

    function prevSlide() {
      goToSlide((currentIndex - 1 + cardsCount) % cardsCount);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    createDots();

    if (cards.length > 0) {
      cards[0].classList.add('active');
    }

    if (sliderNext) sliderNext.addEventListener('click', function () { nextSlide(); startAutoPlay(); });
    if (sliderPrev) sliderPrev.addEventListener('click', function () { prevSlide(); startAutoPlay(); });

    var sliderContainer = testimonialsTrack.parentElement;
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoPlay);
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  // =========================================
  // 15. BACK TO TOP BUTTON
  // =========================================
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================
  // 16. AUTO-UPDATE FOOTER YEAR
  // =========================================
  var footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});
