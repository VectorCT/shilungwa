# Implementation Plan: Mining Resources Website

## Overview

Transform the existing single-page SMR site into an 8-page static website with modular CSS, JS modules (theme, nav, reveal, contact form), dark/light theming, scroll-triggered animations, and Unsplash imagery. Each task builds incrementally — CSS foundation first, then JS modules, then pages one by one, wiring everything together at the end.

## Tasks

- [x] 1. Set up modular CSS architecture
  - [x] 1.1 Create `assets/css/variables.css` with light and dark theme tokens
    - Define all CSS custom properties under `:root` / `[data-theme="light"]` and `[data-theme="dark"]`
    - Include colors: --page-bg, --surface, --surface-soft, --text, --muted, --line, --line-strong, --primary, --primary-strong, --accent, --radius, --shadow
    - Dark theme: --page-bg: #12263b, --surface: #1a3a5c, --text: #e8eef4, retain --primary and --accent
    - _Requirements: 3.5, 3.6_

  - [x] 1.2 Create `assets/css/base.css` with reset, typography, and global styles
    - Move box-sizing reset, html scroll-behavior, body styles, heading font rules from styles.css
    - Include bg-orb decorative elements
    - _Requirements: 13.2, 14.4_

  - [x] 1.3 Create `assets/css/layout.css` with header, footer, nav, and page shell styles
    - Move .site-header, .brand, .menu-button, .main-nav, .site-footer styles from styles.css
    - Add active link style: `.main-nav a.active` with primary background
    - Expand footer to multi-column layout (logo+tagline, quick links, contact info, social links) that stacks below 640px
    - Add theme toggle button styles
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 12.1, 12.2, 12.3, 12.4_

  - [x] 1.4 Create `assets/css/components.css` with buttons, cards, hero, forms, stats band, and reveal styles
    - Move .btn, .card, .hero, .impact-band, .approach-step, .sustain-card, .checks, .news-grid, .contact, .reveal styles from styles.css
    - Add full-width background-image hero variant using `var(--hero-img)` with gradient overlay
    - Add contact form styles (.form-group, .form-error, .form-success, input/select/textarea styling)
    - Replace CSS keyframe reveal with IntersectionObserver-compatible `.reveal` / `.reveal.visible` transitions
    - _Requirements: 13.3, 13.4, 11.2, 11.4_

  - [x] 1.5 Create `assets/css/pages.css` for page-specific overrides
    - Add any page-specific styles (e.g., careers job cards, project status tags, timeline styles)
    - _Requirements: 13.4, 13.5_

  - [x] 1.6 Replace `assets/css/styles.css` with imports of all modular CSS files
    - Use `@import` statements to load variables.css, base.css, layout.css, components.css, pages.css in order
    - All existing HTML pages continue to link only `styles.css`
    - Include responsive media queries in appropriate files (layout.css for header, components.css for cards/grids)
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [x] 2. Checkpoint — Verify CSS architecture
  - Ensure the existing index.html still renders correctly with the new modular CSS
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Implement JavaScript modules
  - [x] 3.1 Create `assets/js/theme.js` — theme toggle and localStorage persistence
    - Export `initTheme()`: read `localStorage.getItem('smr-theme')`, default to `'light'`, set `document.documentElement.dataset.theme`
    - Export `toggleTheme()`: flip theme, update DOM attribute and localStorage
    - Wrap localStorage access in try/catch for private browsing fallback
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.7_

  - [x] 3.2 Create `assets/js/nav.js` — mobile menu toggle and active page highlighting
    - Export `initNav()`: bind click on `.menu-button`, toggle `.open` on `.main-nav`, manage `aria-expanded`
    - Export `highlightActivePage()`: compare nav link `href` against `window.location.pathname`, add `.active` class to match
    - Close menu when a nav link is clicked
    - _Requirements: 2.3, 2.4, 2.5_

  - [x] 3.3 Create `assets/js/reveal.js` — IntersectionObserver scroll animations
    - Export `initReveal()`: select all `.reveal` elements, create IntersectionObserver with `threshold: 0.12`
    - Add `.visible` class on intersection, unobserve after reveal
    - Check `prefers-reduced-motion`: if reduced motion preferred, skip observer setup and make all `.reveal` elements immediately visible
    - Fallback: if IntersectionObserver not supported, remove `.reveal` class from all elements
    - _Requirements: 13.3, 14.4_

  - [x] 3.4 Create `assets/js/contact.js` — contact form client-side validation
    - Export `initContactForm()`: bind submit event on `.contact-form`
    - Validate: name (required, min 2 chars), email (required, valid pattern), subject (required dropdown), message (required, min 10 chars)
    - Show inline errors in `.form-error` spans with `role="alert"` and `aria-live="polite"`
    - On valid submission: replace form with `.form-success` panel
    - _Requirements: 11.2, 11.3, 11.4_

  - [x] 3.5 Refactor `assets/js/main.js` as orchestrator
    - Import and call `initTheme()`, `initNav()`, `highlightActivePage()`, `initReveal()`, `initContactForm()` on DOMContentLoaded
    - Bind theme toggle button click to `toggleTheme()`
    - Keep logo error fallback logic
    - _Requirements: 2.6, 3.1_

- [x] 4. Checkpoint — Verify JS modules
  - Ensure theme toggle, nav, reveal, and contact form JS all work on the existing index.html
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Refactor Home page (`index.html`)
  - Update `<head>` to link `assets/css/styles.css` (which now imports modular CSS)
  - Update header: add all 8 page links (Home, About, Services, Projects, Sustainability, Careers, News, Contact), add theme toggle button
  - Update hero: keep two-column layout with inline SVG, update CTAs
  - Ensure statistics band, services cards, approach framework, sustainability highlights, and news sections are present
  - Add expanded multi-column footer (logo, tagline, quick links, contact info, social links, copyright)
  - Add `<noscript>` style for mobile nav visibility and contact form fallback
  - Update `<script>` tag to load `assets/js/main.js` (as module or with defer)
  - _Requirements: 1.1, 1.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 12.1, 12.2, 12.3, 15.1, 15.2, 15.4_

- [x] 6. Create About page (`about.html`)
  - Full-width Unsplash hero with mining operations background
  - Company overview section (mission, vision, history)
  - Core values section with at least four values and visual indicators
  - Leadership team section with placeholder team member cards and Unsplash portraits
  - Timeline/milestones section showing key achievements
  - Shared header with nav links and theme toggle, shared footer
  - Semantic HTML structure, ARIA labels, alt text on all images
  - _Requirements: 1.1, 5.1, 5.2, 5.3, 5.4, 5.5, 15.1, 15.2, 15.3, 15.4_

- [x] 7. Create Services page (`services.html`)
  - Full-width Unsplash hero with mining services background
  - Six service categories: Resource Exploration, Mining Operations, Processing and Beneficiation, Logistics and Supply Chain, Environmental Management, Consulting and Advisory
  - Each category: title, detailed description, key capabilities list, Unsplash image
  - CTA section encouraging contact for service inquiries
  - Shared header/footer, semantic HTML, accessibility
  - _Requirements: 1.1, 6.1, 6.2, 6.3, 6.4, 15.1, 15.2_

- [x] 8. Create Projects page (`projects.html`)
  - Full-width Unsplash hero with mining projects background
  - At least six project cards: name, location, status tag (Active/Completed/Planned), project type tag, description, Unsplash image
  - Summary statistics section (total projects, active sites, countries)
  - Shared header/footer, semantic HTML, accessibility
  - _Requirements: 1.1, 7.1, 7.2, 7.3, 7.4, 15.1, 15.2_

- [x] 9. Create Sustainability page (`sustainability.html`)
  - Full-width Unsplash hero with environmental stewardship background
  - Sections: Environmental Stewardship, Community Development, Health and Safety, Governance and Compliance
  - Each section: title, description, at least three specific initiatives
  - Sustainability metrics statistics band (rehabilitation hectares, safety record, community investment)
  - Shared header/footer, semantic HTML, accessibility
  - _Requirements: 1.1, 8.1, 8.2, 8.3, 8.4, 15.1, 15.2_

- [x] 10. Create Careers page (`careers.html`)
  - Full-width Unsplash hero with mining workforce background
  - "Why Work With Us" section with at least four benefits/value propositions
  - At least four sample job listing cards: title, department, location, employment type
  - CTA section linking to Contact page or email for applications
  - Shared header/footer, semantic HTML, accessibility
  - _Requirements: 1.1, 9.1, 9.2, 9.3, 9.4, 15.1, 15.2_

- [x] 11. Create News/Insights page (`news.html`)
  - Full-width Unsplash hero background
  - At least six article preview cards: title, publication date, category tag, excerpt, Unsplash thumbnail
  - Category tags visible on each card (Company News, Industry Insight, Sustainability Update)
  - Shared header/footer, semantic HTML, accessibility
  - _Requirements: 1.1, 10.1, 10.2, 10.3, 15.1, 15.2_

- [x] 12. Create Contact page (`contact.html`)
  - Full-width Unsplash hero background
  - Contact form: full name, email, subject dropdown (General Inquiry, Partnership, Services, Careers, Media), message textarea
  - Form fields with labels, `aria-describedby` for error spans, `role="alert"` on error containers
  - Company contact info panel (email, phone placeholder, address placeholder) alongside form
  - Location/map placeholder section
  - `<noscript>` message advising direct email if JS disabled
  - Shared header/footer, semantic HTML, accessibility
  - _Requirements: 1.1, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 15.1, 15.2, 15.3, 15.4, 15.5_

- [x] 13. Checkpoint — Verify all pages
  - Ensure all 8 pages load, navigation works across pages, active link highlighting is correct
  - Ensure theme toggle persists across page navigation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Final polish and cross-cutting concerns
  - [x] 14.1 Verify dark theme rendering on all pages
    - Check all pages in dark mode: backgrounds, text, cards, hero overlays, form inputs, footer
    - Ensure contrast ratio meets 4.5:1 minimum for normal text in both themes
    - _Requirements: 3.5, 3.6, 15.5_

  - [x] 14.2 Verify responsive layouts at all breakpoints
    - Test at 320px, 640px, 980px, 1200px, 2560px
    - Confirm grid layouts collapse to single column at 980px
    - Confirm touch targets are 44px minimum at 640px and below
    - Confirm footer stacks vertically below 640px
    - _Requirements: 14.1, 14.2, 14.3, 12.4_

  - [x] 14.3 Verify accessibility across all pages
    - Confirm semantic HTML elements on every page (nav, main, section, article, header, footer)
    - Confirm all images have descriptive alt text
    - Confirm keyboard navigation and visible focus indicators on all interactive elements
    - Confirm ARIA labels on nav landmarks, theme toggle, menu button, form errors
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

  - [x] 14.4 Verify error handling and edge cases
    - Test localStorage unavailable scenario (theme defaults to light, no crash)
    - Test JS disabled: nav links visible via noscript styles, contact form shows fallback message
    - Test Unsplash image load failure: layout doesn't break, fallback background shows
    - Test IntersectionObserver unavailable: content is immediately visible
    - _Requirements: 3.4, 2.3, 11.4_

- [x] 15. Final checkpoint — All pages complete and verified
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- No property-based tests are included — the design document confirms PBT is not applicable for this static HTML/CSS/JS project
- Each page task includes the shared header/footer to ensure consistency (Requirement 1.3)
- All Unsplash images use direct URLs with `?w=1200&q=80` for heroes and `?w=600&q=80` for cards/thumbnails
- The existing `styles.css` becomes an import aggregator — no styles are lost, just reorganized
- JS modules use standard script loading (no bundler) per the zero-build-tool constraint
