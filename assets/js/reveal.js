// reveal.js — IntersectionObserver scroll animations

/**
 * Initialise scroll-triggered reveal animations.
 *
 * Selects all `.reveal` elements and uses an IntersectionObserver
 * (threshold 0.12) to add `.visible` once each element enters the
 * viewport.  After reveal the element is unobserved.
 *
 * - prefers-reduced-motion: all `.reveal` elements are made visible
 *   immediately and the observer is never created.
 * - No IntersectionObserver support: the `.reveal` class is removed
 *   so content is visible without animation.
 *
 * Validates: Requirements 13.3, 14.4
 */
function initReveal() {
  var elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect prefers-reduced-motion — make everything visible immediately
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    elements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) {
      el.classList.remove('reveal');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}
