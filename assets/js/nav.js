// nav.js — Mobile menu toggle and active page highlighting

/**
 * Initialise the mobile navigation menu.
 * Binds click on `.menu-button` to toggle `.open` on `.main-nav`
 * and keeps `aria-expanded` in sync.  Also closes the menu when
 * any nav link is clicked.
 *
 * Validates: Requirements 2.3, 2.4, 2.5
 */
function initNav() {
  var menuButton = document.querySelector('.menu-button');
  var mainNav = document.querySelector('.main-nav');

  if (!menuButton || !mainNav) {
    return;
  }

  menuButton.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu when any nav link is clicked
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Highlight the navigation link that matches the current page.
 * Extracts the filename from `window.location.pathname` (defaults
 * to `index.html` for bare `/`) and adds the `.active` class to
 * the matching `<a>` inside `.main-nav`.
 *
 * Validates: Requirements 2.5
 */
function highlightActivePage() {
  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  var links = document.querySelectorAll('.main-nav a');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) {
      return;
    }
    // Extract just the filename from the href (ignore paths/hashes)
    var linkPage = href.substring(href.lastIndexOf('/') + 1).split('#')[0].split('?')[0];
    if (linkPage === page) {
      link.classList.add('active');
    }
  });
}
