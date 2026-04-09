// theme.js — Theme toggle and localStorage persistence

/**
 * Storage key used for persisting theme preference.
 * @type {string}
 */
var SMR_THEME_KEY = 'smr-theme';

/**
 * Safely read a value from localStorage.
 * Returns null if localStorage is unavailable (e.g. private browsing).
 * @param {string} key
 * @returns {string|null}
 */
function _getStoredTheme(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

/**
 * Safely write a value to localStorage.
 * Silently fails if localStorage is unavailable.
 * @param {string} key
 * @param {string} value
 */
function _setStoredTheme(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Private browsing or quota exceeded — ignore
  }
}

/**
 * Read the stored theme preference (or default to 'light')
 * and apply it to the document root element.
 */
function initTheme() {
  var stored = _getStoredTheme(SMR_THEME_KEY);
  var theme = stored === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  _updateToggleLabel(theme);
}

/**
 * Flip the current theme between 'light' and 'dark',
 * update the DOM attribute, persist to localStorage,
 * and update the toggle button's aria-label.
 */
function toggleTheme() {
  var current = document.documentElement.dataset.theme;
  var next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  _setStoredTheme(SMR_THEME_KEY, next);
  _updateToggleLabel(next);
}

/**
 * Update the theme toggle button's aria-label to reflect
 * the action that will occur on the next click.
 * @param {string} activeTheme - 'light' or 'dark'
 */
function _updateToggleLabel(activeTheme) {
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.setAttribute(
      'aria-label',
      activeTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}
