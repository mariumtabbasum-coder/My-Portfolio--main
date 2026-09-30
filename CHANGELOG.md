# Changelog

All notable changes to the Marium Tabassum Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to Semantic Versioning.

## [1.2.0] - 2026-09-30

### Fixed
- **Pink Color Accent Overuse**: Replaced every instance of pink color across the public site and admin panel with the site's primary Blue to Cyan accent gradient (`from-blue-600 to-cyan-600`, `text-cyan-400`, `shadow-blue-500/20`), matching the "View Featured Projects" primary CTA button.
- **Contact Form Submission Latency & Loading State**: Added `isSubmitting` loading state, disabled form inputs/button during submission, and rendered a animated spinner with "Sending Message..." text to ensure immediate UI feedback.
- **Admin Panel "View Site" Button**: Redesigned the "View Site" link into a glassmorphic sidebar button with an `ExternalLink` icon matching the admin panel design system.

### Added
- **Separated Read & Unread Contact Messages**: Implemented "Unread Messages" and "Read Messages" tabbed views in the Admin CMS Messages Inbox, automatically moving messages to the Read tab upon marking read or replying.
- **In-Admin Panel Email Reply Feature**: Added direct email reply forms to each contact message card with `Nodemailer` integration (`POST /api/messages/:id/reply`), with simulation fallback and clear SMTP configuration documentation in `.env.example`.

## [1.1.0] - 2026-09-30

### Fixed
- **Color Theme Consistency Audit**: Verified every component, public section, CV/resume viewer modal, and admin CMS panel to ensure full adherence to the site's established dark navy background (`#0f172a` / `#090d16`) with pink and purple accent colors. Ensured no orange hues or non-conforming colors exist across the codebase.

### Added
- **Project Documentation (`PROJECT_DOCUMENTATION.md`)**: Created comprehensive developer documentation detailing project overview, full tech stack, folder structure, public sections, admin CMS capabilities, required environment variable names, and developer quick-start steps.
- **Changelog File (`CHANGELOG.md`)**: Created this changelog file to maintain a dated history of all project changes, additions, fixes, and removals (most recent at the top).
- **AI Scraping & Crawler Protection (`public/robots.txt`)**: Configured `robots.txt` to explicitly disallow known AI scrapers and training bots (GPTBot, ChatGPT-User, CCBot, Google-Extended, Bytespider, ClaudeBot, anthropic-ai, Omgilibot, FacebookBot, Diffbot, PerplexityBot, Cohere-ai) while permitting standard search engines (Googlebot, Bingbot, etc.).
- **XML Sitemap (`public/sitemap.xml`)**: Generated an XML sitemap listing all public portfolio routes (`#home`, `#about`, `#skills`, `#projects`, `#services`, `#journey`, `#certificates`, `#contact`) to improve search engine indexing.
- **AI Answer Engines Summary (`llms.txt` & `public/llms.txt`)**: Created `llms.txt` following the standard `llms.txt` convention, providing an accurate, concise markdown overview of Marium Tabassum's skills, academic status (Aptech DSE & Bano Qabil GenAI Scholar), projects, and contact info for AI answer engines (ChatGPT, Perplexity, Claude).
- **Enhanced Standard SEO (`index.html`)**: Added canonical link tags, Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`), Twitter card tags, search author/keywords meta tags, and verified `alt` text on images and single `<h1>` heading hierarchy across all views.
