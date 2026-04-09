// main.js — Orchestrator
// Loaded after theme.js, nav.js, reveal.js, contact.js via separate script tags.

document.addEventListener('DOMContentLoaded', function () {
  // Theme: apply stored preference (or default light) immediately
  initTheme();

  // Navigation: mobile menu toggle + close-on-link-click
  initNav();

  // Highlight the nav link matching the current page
  highlightActivePage();

  // Scroll-triggered reveal animations
  initReveal();

  // Contact form validation (no-ops if .contact-form is absent)
  initContactForm();

  // Theme toggle button
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Logo error fallback — show text brand when SVG fails to load
  var brandLogo = document.querySelector('.brand-logo');
  var brand = document.querySelector('.brand');
  if (brandLogo && brand) {
    brandLogo.addEventListener('error', function () {
      brand.classList.add('logo-missing');
    });
  }
});
