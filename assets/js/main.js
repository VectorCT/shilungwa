const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');
const brandLogo = document.querySelector('.brand-logo');
const brand = document.querySelector('.brand');

if (brandLogo && brand) {
  brandLogo.addEventListener('error', () => {
    brand.classList.add('logo-missing');
  });
}

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}
