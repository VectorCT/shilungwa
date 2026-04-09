# Requirements Document

## Introduction

Transform the existing single-page Shilungwa Mining and Resources (SMR) website into a comprehensive, multi-page professional mining and resources website. The site will feature a dark/light theme toggle, Unsplash imagery, and cover all services typical of a mining company. The technology stack remains vanilla HTML, CSS, and JavaScript with no frameworks.

## Glossary

- **Website**: The complete Shilungwa Mining and Resources static website composed of multiple HTML pages, shared CSS, and shared JavaScript
- **Theme_Toggle**: A UI control that switches the Website between light mode and dark mode color schemes
- **Navigation**: The persistent site header containing the logo, page links, and Theme_Toggle present on every page
- **Hero_Section**: The prominent banner area at the top of a page containing a headline, description, call-to-action buttons, and a background image
- **Service_Card**: A visual component displaying a service title, description, icon or image, and a link to the corresponding service detail page
- **Contact_Form**: An HTML form on the Contact page that collects name, email, subject, and message fields
- **Page**: A single HTML document within the Website accessible via its own URL path
- **Footer**: The persistent bottom section of every Page containing copyright, quick links, and contact information
- **Unsplash_Image**: A photograph sourced from Unsplash (via direct URL) used as visual content throughout the Website

## Requirements

### Requirement 1: Multi-Page Site Structure

**User Story:** As a visitor, I want to navigate between distinct pages, so that I can find specific information about SMR without scrolling through a single long page.

#### Acceptance Criteria

1. THE Website SHALL include the following Pages: Home, About, Services, Projects, Sustainability, Careers, News/Insights, and Contact
2. WHEN a visitor loads any Page, THE Navigation SHALL display links to all other Pages in the Website
3. THE Website SHALL maintain consistent Navigation and Footer across all Pages
4. WHEN a visitor clicks a Navigation link, THE Website SHALL load the corresponding Page within 1 second on a standard broadband connection
5. THE Website SHALL include a Home Page that serves as the primary landing page with a Hero_Section, key statistics band, featured services overview, approach framework, and call-to-action sections

### Requirement 2: Navigation and Header

**User Story:** As a visitor, I want a clear and accessible navigation system, so that I can move between pages and find content efficiently.

#### Acceptance Criteria

1. THE Navigation SHALL display the SMR logo (from assets/images/logo-smr.svg) linked to the Home Page
2. THE Navigation SHALL remain sticky at the top of the viewport while scrolling on all Pages
3. WHEN the viewport width is 980px or narrower, THE Navigation SHALL collapse into a hamburger menu with an accessible toggle button
4. WHEN a visitor activates the hamburger menu button, THE Navigation SHALL expand to show all page links
5. THE Navigation SHALL highlight the currently active Page link with a distinct visual style
6. THE Navigation SHALL include the Theme_Toggle control in the header area

### Requirement 3: Dark and Light Theme Toggle

**User Story:** As a visitor, I want to switch between dark and light color themes, so that I can view the site comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL switch the Website between a light color scheme and a dark color scheme
2. WHEN the visitor activates the Theme_Toggle, THE Website SHALL apply the selected theme to all Pages without requiring a page reload of the current Page
3. THE Website SHALL persist the selected theme preference in the browser localStorage so that returning visits retain the chosen theme
4. WHEN a visitor loads the Website for the first time without a stored preference, THE Website SHALL default to the light theme
5. THE light theme SHALL use the existing brand colors: primary blue (#0d6fc6), accent gold (#ffb347), white surfaces, and dark navy text (#12263b)
6. THE dark theme SHALL use dark navy (#12263b) as the background, light text (#e8eef4), muted blue surfaces (#1a3a5c), and retain the primary blue (#0d6fc6) and accent gold (#ffb347) for interactive elements
7. WHEN the visitor navigates to a different Page, THE Website SHALL apply the previously selected theme from localStorage immediately on page load

### Requirement 4: Home Page

**User Story:** As a visitor, I want an engaging landing page, so that I can quickly understand what SMR does and navigate to areas of interest.

#### Acceptance Criteria

1. THE Home Page SHALL display a Hero_Section with a headline, subtext, call-to-action buttons, and a full-width Unsplash_Image background depicting a mining landscape
2. THE Home Page SHALL display a statistics band showing key performance metrics (24/7 monitoring, 99.2% logistics consistency, 14+ partners, 0 Harm safety culture)
3. THE Home Page SHALL display a featured services section with Service_Cards linking to the Services Page
4. THE Home Page SHALL display the execution framework section (Discover, Develop, Deliver)
5. THE Home Page SHALL display a sustainability highlights section with a link to the Sustainability Page
6. THE Home Page SHALL display a latest news or strategic priorities section with links to the News/Insights Page

### Requirement 5: About Page

**User Story:** As a visitor, I want to learn about SMR's history, mission, values, and leadership, so that I can assess the company's credibility and alignment with my interests.

#### Acceptance Criteria

1. THE About Page SHALL display a Hero_Section with a headline and Unsplash_Image background relevant to mining operations
2. THE About Page SHALL include a company overview section describing SMR's mission, vision, and history
3. THE About Page SHALL include a core values section listing at least four company values with icons or visual indicators
4. THE About Page SHALL include a leadership team section displaying team member cards with placeholder names, titles, and Unsplash_Image portraits
5. THE About Page SHALL include a timeline or milestones section showing key company achievements

### Requirement 6: Services Page

**User Story:** As a visitor, I want to see all services SMR offers, so that I can understand the full scope of the company's capabilities.

#### Acceptance Criteria

1. THE Services Page SHALL display a Hero_Section with a headline and Unsplash_Image background relevant to mining services
2. THE Services Page SHALL list the following service categories with descriptions and Unsplash_Images: Resource Exploration, Mining Operations, Processing and Beneficiation, Logistics and Supply Chain, Environmental Management, and Consulting and Advisory
3. WHEN a visitor views a service category, THE Services Page SHALL display a title, detailed description, key capabilities list, and a relevant Unsplash_Image for that category
4. THE Services Page SHALL include a call-to-action section encouraging visitors to contact SMR for service inquiries

### Requirement 7: Projects Page

**User Story:** As a visitor, I want to see SMR's current and past projects, so that I can evaluate the company's track record and expertise.

#### Acceptance Criteria

1. THE Projects Page SHALL display a Hero_Section with a headline and Unsplash_Image background relevant to mining projects
2. THE Projects Page SHALL display at least six project cards, each containing a project name, location, status (Active, Completed, or Planned), description, and an Unsplash_Image
3. WHEN a visitor views a project card, THE Projects Page SHALL display the project type (e.g., Open-Pit Mining, Underground Mining, Exploration) as a visible tag
4. THE Projects Page SHALL include a summary statistics section showing total projects, active sites, and countries of operation

### Requirement 8: Sustainability Page

**User Story:** As a visitor, I want to understand SMR's environmental and social commitments, so that I can assess the company's responsibility practices.

#### Acceptance Criteria

1. THE Sustainability Page SHALL display a Hero_Section with a headline and Unsplash_Image background relevant to environmental stewardship
2. THE Sustainability Page SHALL include sections for Environmental Stewardship, Community Development, Health and Safety, and Governance and Compliance
3. WHEN a visitor views a sustainability section, THE Sustainability Page SHALL display a title, description, and at least three specific initiatives or commitments for that section
4. THE Sustainability Page SHALL display key sustainability metrics (e.g., rehabilitation hectares, safety record, community investment figures) in a visible statistics band

### Requirement 9: Careers Page

**User Story:** As a job seeker, I want to learn about career opportunities at SMR, so that I can evaluate whether to apply for a position.

#### Acceptance Criteria

1. THE Careers Page SHALL display a Hero_Section with a headline and Unsplash_Image background relevant to mining workforce
2. THE Careers Page SHALL include a "Why Work With Us" section listing at least four employee benefits or value propositions
3. THE Careers Page SHALL display at least four sample job listing cards, each containing a job title, department, location, and employment type (Full-time, Contract)
4. THE Careers Page SHALL include a call-to-action section with a link to submit applications via the Contact Page or email

### Requirement 10: News and Insights Page

**User Story:** As a visitor, I want to read the latest news and industry insights from SMR, so that I can stay informed about the company's activities and perspectives.

#### Acceptance Criteria

1. THE News/Insights Page SHALL display a Hero_Section with a headline and Unsplash_Image background
2. THE News/Insights Page SHALL display at least six article preview cards, each containing a title, publication date, category tag, excerpt, and an Unsplash_Image thumbnail
3. WHEN a visitor views an article card, THE News/Insights Page SHALL display the article category (e.g., Company News, Industry Insight, Sustainability Update) as a visible tag

### Requirement 11: Contact Page

**User Story:** As a visitor, I want to contact SMR easily, so that I can inquire about partnerships, services, or career opportunities.

#### Acceptance Criteria

1. THE Contact Page SHALL display a Hero_Section with a headline and Unsplash_Image background
2. THE Contact Page SHALL display a Contact_Form with fields for full name, email address, subject (dropdown with options: General Inquiry, Partnership, Services, Careers, Media), and message
3. WHEN a visitor submits the Contact_Form with all required fields completed, THE Contact_Form SHALL display a success confirmation message
4. IF a visitor submits the Contact_Form with missing required fields, THEN THE Contact_Form SHALL display inline validation error messages identifying the incomplete fields
5. THE Contact Page SHALL display company contact information including email address, phone number placeholder, and physical address placeholder alongside the Contact_Form
6. THE Contact Page SHALL include an embedded map placeholder or location section indicating SMR's office location

### Requirement 12: Footer

**User Story:** As a visitor, I want a consistent footer on every page, so that I can access quick links, contact info, and legal information from anywhere on the site.

#### Acceptance Criteria

1. THE Footer SHALL appear on every Page of the Website
2. THE Footer SHALL display the SMR logo, a brief company tagline, quick navigation links to all Pages, contact email, and copyright notice
3. THE Footer SHALL display links to placeholder social media profiles (LinkedIn, Twitter/X)
4. THE Footer SHALL be responsive and stack content vertically on viewports narrower than 640px

### Requirement 13: Visual Design and Imagery

**User Story:** As a visitor, I want a professional and visually engaging design, so that I feel confident in SMR's brand and capabilities.

#### Acceptance Criteria

1. THE Website SHALL use Unsplash_Images sourced via direct Unsplash URLs for all photographic content including hero backgrounds, service illustrations, project photos, team portraits, and article thumbnails
2. THE Website SHALL use the Sora font for all headings and the Public Sans font for all body text
3. THE Website SHALL apply smooth scroll-triggered reveal animations to content sections as the visitor scrolls down a Page
4. THE Website SHALL maintain a consistent border-radius of 18px for cards and panels, matching the existing design language
5. THE Website SHALL use the brand color palette (primary #0d6fc6, accent #ffb347, dark navy #12263b) consistently across all Pages and both themes

### Requirement 14: Responsive Design

**User Story:** As a visitor using a mobile device, I want the website to adapt to my screen size, so that I can browse comfortably on any device.

#### Acceptance Criteria

1. THE Website SHALL be fully usable and visually coherent at viewport widths from 320px to 2560px
2. WHEN the viewport width is 980px or narrower, THE Website SHALL switch grid layouts from multi-column to single-column for cards, service sections, and content grids
3. WHEN the viewport width is 640px or narrower, THE Website SHALL increase touch target sizes for buttons and links to a minimum of 44px height
4. THE Website SHALL respect the prefers-reduced-motion media query by disabling animations for visitors who have requested reduced motion

### Requirement 15: Accessibility

**User Story:** As a visitor using assistive technology, I want the website to be accessible, so that I can navigate and understand all content.

#### Acceptance Criteria

1. THE Website SHALL use semantic HTML elements (nav, main, section, article, header, footer) for page structure on all Pages
2. THE Website SHALL provide descriptive alt text for all images
3. THE Website SHALL ensure all interactive elements (links, buttons, form fields) are keyboard accessible and have visible focus indicators
4. THE Website SHALL use ARIA labels for navigation landmarks, the Theme_Toggle, and the mobile menu button
5. WHEN the Theme_Toggle changes the theme, THE Website SHALL maintain a minimum contrast ratio of 4.5:1 for normal text in both light and dark themes
