# Design Document: Mining Resources Website

## Overview

Transform the existing single-page Shilungwa Mining and Resources (SMR) site into an 8-page static website built with vanilla HTML, CSS, and JavaScript. The redesign introduces a shared layout system (header + footer partials loaded via JS), a CSS custom-property-driven dark/light theme with localStorage persistence, scroll-triggered reveal animations via IntersectionObserver, and a client-side-validated contact form. Every page reuses a common CSS bundle and a small JS module set, keeping the build toolchain at zero.

### Key Design Decisions

| Decision | Rationale |
|---|---|
| No build tools / bundlers | Requirements specify vanilla HTML/CSS/JS; keeps deployment simple (any static host) |
| Shared header/footer via JS injection | Avoids duplicating nav/footer markup across 8 HTML files; single source of truth |
| CSS custom properties for theming | Already in use; extending to dark-mode variants is minimal effort and zero-dependency |
| IntersectionObserver for reveals | Native API, no library needed, respects `prefers-reduced-motion` |
| Unsplash direct URLs for images | MVP approach per requirements; easy to swap for self-hosted assets later |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser (Client)                  │
├─────────────────────────────────────────────────────┤
│  HTML Pages                                         │
│  ┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐           │
│  │ Home │ │About │ │Services│ │Projects│  ...       │
│  └──┬───┘ └──┬───┘ └───┬────┘ └───┬────┘           │
│     │        │         │          │                 │
│     └────────┴─────────┴──────────┘                 │
│                    │                                │
│  Shared Assets     ▼                                │
│  ┌─────────────────────────────────────┐            │
│  │  assets/css/                        │            │
│  │  ├── variables.css  (tokens/themes) │            │
│  │  ├── base.css       (reset/typo)    │            │
│  │  ├── layout.css     (header/footer) │            │
│  │  ├── components.css (cards/btns)    │            │
│  │  └── pages.css      (page-specific) │            │
│  ├─────────────────────────────────────┤            │
│  │  assets/js/                         │            │
│  │  ├── theme.js       (toggle+store)  │            │
│  │  ├── nav.js         (menu+active)   │            │
│  │  ├── reveal.js      (scroll anim)   │            │
│  │  ├── contact.js     (form valid.)   │            │
│  │  └── main.js        (orchestrator)  │            │
│  ├─────────────────────────────────────┤            │
│  │  assets/images/     (SVGs + logos)  │            │
│  └─────────────────────────────────────┘            │
└─────────────────────────────────────────────────────┘
```

### File Structure

```
/
├── index.html                  # Home page
├── about.html                  # About page
├── services.html               # Services page
├── projects.html               # Projects page
├── sustainability.html         # Sustainability page
├── careers.html                # Careers page
├── news.html                   # News/Insights page
├── contact.html                # Contact page
├── assets/
│   ├── css/
│   │   ├── variables.css       # CSS custom properties (light + dark tokens)
│   │   ├── base.css            # Reset, typography, global styles
│   │   ├── layout.css          # Header, footer, nav, page shell
│   │   ├── components.css      # Buttons, cards, hero, forms, stats band
│   │   └── pages.css           # Page-specific overrides
│   ├── js/
│   │   ├── theme.js            # Theme toggle + localStorage persistence
│   │   ├── nav.js              # Mobile menu toggle + active link highlight
│   │   ├── reveal.js           # IntersectionObserver scroll animations
│   │   ├── contact.js          # Contact form validation
│   │   └── main.js             # Imports/orchestrates all modules
│   └── images/
│       ├── logo-smr.svg
│       ├── hero-pit.svg
│       ├── exploration.svg
│       ├── operations.svg
│       └── logistics.svg
└── README.md
```

## Components and Interfaces

### 1. Theme System (`theme.js`)

Manages dark/light mode switching via a `data-theme` attribute on `<html>`.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Theme Toggle │────▶│  theme.js    │────▶│ localStorage │
│   (button)   │     │              │     │ "smr-theme"  │
└──────────────┘     │ setTheme()   │     └──────────────┘
                     │ getTheme()   │
                     │ initTheme()  │
                     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐
                     │ <html        │
                     │ data-theme=  │
                     │ "light|dark">│
                     └──────────────┘
```

**Interface:**
- `initTheme()` — Called on DOMContentLoaded. Reads `localStorage.getItem('smr-theme')`, defaults to `'light'`, sets `document.documentElement.dataset.theme`.
- `toggleTheme()` — Flips current theme, updates DOM attribute and localStorage.
- Theme toggle button: `<button class="theme-toggle" aria-label="Switch to dark theme">` with sun/moon icon swap.

**CSS approach:**
```css
/* variables.css */
:root, [data-theme="light"] {
  --page-bg: #f2f6fa;
  --surface: #ffffff;
  --text: #12263b;
  /* ... all light tokens */
}

[data-theme="dark"] {
  --page-bg: #12263b;
  --surface: #1a3a5c;
  --text: #e8eef4;
  /* ... all dark tokens */
}
```

All existing component styles already reference CSS variables, so the theme switch propagates automatically with no per-component overrides needed.

### 2. Navigation System (`nav.js`)

Handles mobile hamburger menu and active-page highlighting.

**Interface:**
- `initNav()` — Binds click handler to `.menu-button`, toggles `.open` on `.main-nav`, manages `aria-expanded`.
- `highlightActivePage()` — Compares each nav link's `href` against `window.location.pathname` and adds `.active` class to the matching link.

**Active link styling:**
```css
.main-nav a.active {
  background: var(--primary);
  color: #ffffff;
  pointer-events: none;
}
```

**HTML structure (shared across all pages):**
```html
<header class="site-header">
  <a href="index.html" class="brand" aria-label="SMR home">
    <img src="assets/images/logo-smr.svg" alt="SMR logo" class="brand-logo" width="380" height="190" />
    <span class="logo-fallback" aria-hidden="true">SMR</span>
  </a>
  <button class="theme-toggle" aria-label="Switch theme">🌙</button>
  <button class="menu-button" aria-expanded="false" aria-controls="main-nav">Menu</button>
  <nav id="main-nav" class="main-nav" aria-label="Primary">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="projects.html">Projects</a>
    <a href="sustainability.html">Sustainability</a>
    <a href="careers.html">Careers</a>
    <a href="news.html">News</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>
```

### 3. Scroll Reveal System (`reveal.js`)

Uses IntersectionObserver to add a `.visible` class when elements enter the viewport.

**Interface:**
- `initReveal()` — Selects all `.reveal` elements, creates an IntersectionObserver with `threshold: 0.12`, adds `.visible` on intersection. Checks `prefers-reduced-motion` and skips animation setup if reduced motion is preferred (elements start visible).

**CSS:**
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

This replaces the current CSS-only `@keyframes rise-in` approach with a proper scroll-triggered system.

### 4. Contact Form Validation (`contact.js`)

Client-side validation for the contact form on `contact.html`.

**Interface:**
- `initContactForm()` — Binds `submit` event on `.contact-form`. Validates required fields, shows inline errors, shows success message on valid submission.

**Validation rules:**
| Field | Rule |
|---|---|
| Full Name | Required, min 2 characters |
| Email | Required, valid email pattern |
| Subject | Required (dropdown selection) |
| Message | Required, min 10 characters |

**Error display pattern:**
```html
<div class="form-group">
  <label for="contact-name">Full Name *</label>
  <input type="text" id="contact-name" name="name" required aria-describedby="name-error" />
  <span id="name-error" class="form-error" role="alert" aria-live="polite"></span>
</div>
```

On successful submission, the form is replaced with a success panel:
```html
<div class="form-success" role="status">
  <h3>Message Sent</h3>
  <p>Thank you for reaching out. We'll respond within 2 business days.</p>
</div>
```

### 5. Hero Section Component

Reusable hero pattern across all pages with Unsplash background images.

```html
<section class="hero reveal" style="--hero-img: url('https://images.unsplash.com/...')">
  <div class="hero-content">
    <p class="kicker">Page Kicker Text</p>
    <h1>Page Headline</h1>
    <p class="hero-copy">Page description text.</p>
    <div class="hero-actions">
      <a href="#" class="btn btn-primary">Primary CTA</a>
      <a href="#" class="btn btn-secondary">Secondary CTA</a>
    </div>
  </div>
</section>
```

**CSS for Unsplash background hero:**
```css
.hero {
  background:
    linear-gradient(135deg, rgba(9,55,96,0.85), rgba(14,88,143,0.75)),
    var(--hero-img) center/cover no-repeat;
}
```

The Home page retains the two-column hero layout with the inline SVG image. All other pages use the simpler full-width background-image hero.

### 6. Footer Component

Expanded footer with multi-column layout.

```
┌─────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌────┐ │
│  │ Logo +   │  │ Quick     │  │ Contact  │  │Soc.│ │
│  │ Tagline  │  │ Links     │  │ Info     │  │Med.│ │
│  └──────────┘  └───────────┘  └──────────┘  └────┘ │
│  ─────────────────────────────────────────────────  │
│  © 2026 Shilungwa Mining and Resources              │
└─────────────────────────────────────────────────────┘
```

Stacks to single column below 640px.

## Data Models

This is a static site with no backend or database. All content is hardcoded in HTML. The only persisted data is the theme preference.

### localStorage Schema

| Key | Type | Values | Default |
|---|---|---|---|
| `smr-theme` | string | `"light"` \| `"dark"` | `"light"` |

### Unsplash Image URLs

Each page uses specific Unsplash images via direct URLs. Example mapping:

| Page | Image Context | Unsplash Query Hint |
|---|---|---|
| Home | Mining landscape hero | mining, open pit |
| About | Mining operations | mining team, industrial |
| Services | Mining equipment | excavator, drilling |
| Projects | Construction site | mining project, quarry |
| Sustainability | Nature/environment | forest, rehabilitation |
| Careers | Workers/team | mining workers, hard hat |
| News | Industry/office | business meeting, mining |
| Contact | Office/communication | office building, reception |

Images are referenced as `https://images.unsplash.com/photo-{id}?w=1200&q=80` for heros and `?w=600&q=80` for cards/thumbnails.

## Error Handling

### Theme System
- If `localStorage` is unavailable (private browsing restrictions), `initTheme()` catches the error and defaults to light theme without persistence.
- If `data-theme` attribute is manually set to an invalid value, CSS falls back to `:root` (light) tokens.

### Navigation
- If `logo-smr.svg` fails to load, the existing `.logo-fallback` span displays "SMR" text.
- If JavaScript fails to load, the nav links are still visible (CSS default is `display: flex`). The mobile menu defaults to hidden; a `<noscript>` style override will make it visible.

### Contact Form
- All validation is client-side only (no backend). The form `action` is set to `#` and submission is intercepted by JavaScript.
- If JavaScript is disabled, the form submits normally (no-op since there's no backend), and a `<noscript>` message advises the visitor to email directly.
- Email validation uses a standard regex pattern; edge cases (very long TLDs, internationalized domains) are accepted as long as the basic pattern matches.

### Images
- All `<img>` tags include `width` and `height` attributes to prevent layout shift.
- Unsplash images include descriptive `alt` text.
- If an Unsplash image fails to load, the CSS background color of the container provides a neutral fallback.

### Scroll Reveal
- If `IntersectionObserver` is not supported (very old browsers), `reveal.js` skips setup and removes the `.reveal` class so all content is immediately visible.

## Testing Strategy

Property-based testing is not applicable to this feature. The project is a static HTML/CSS/JS website focused on UI rendering, layout, DOM interactions, and visual theming. There are no pure functions with meaningful input variation, no data transformations, parsers, or algorithms. The JavaScript modules perform simple DOM manipulation (theme toggle, menu toggle, form validation).

### Recommended Testing Approach

**Manual / Visual Testing:**
- Cross-browser testing (Chrome, Firefox, Safari, Edge) for layout and theme rendering
- Responsive testing at breakpoints: 320px, 640px, 980px, 1200px, 2560px
- Dark/light theme visual verification on every page
- `prefers-reduced-motion` verification

**Example-Based Unit Tests (if a test runner is added later):**
- Theme toggle: clicking toggles `data-theme` between `light` and `dark`
- Theme persistence: after toggle, `localStorage` contains correct value
- Theme default: without stored preference, theme is `light`
- Nav active link: on `about.html`, the About link has `.active` class
- Mobile menu: clicking menu button toggles `.open` class and `aria-expanded`
- Contact form: submitting empty form shows error messages on all required fields
- Contact form: submitting valid form shows success message
- Contact form: invalid email format shows email-specific error

**Accessibility Testing:**
- Keyboard navigation through all interactive elements (tab order, focus indicators)
- Screen reader testing for ARIA labels on nav, theme toggle, menu button, form errors
- Contrast ratio verification for both themes (4.5:1 minimum for normal text)
- Lighthouse accessibility audit on each page

**Edge Case Tests:**
- localStorage unavailable (private browsing) — theme still works, just doesn't persist
- JavaScript disabled — nav links visible, form shows noscript message
- Unsplash image load failure — layout doesn't break, fallback background shows
- Very narrow viewport (320px) — all content accessible, no horizontal overflow
