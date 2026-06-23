# SEO Improvement Plan — haclab.net

**Date:** 2026-06-23
**Status:** Approved Design

## Overview

Comprehensive SEO improvement for haclab.net based on reports from Seobility, Sitechecker, and other tools. The site is a React SPA (Vite + Tailwind + TypeScript) hosted on Cloudflare Pages. Since crawlers see a mostly-empty HTML shell, the focus is on what's fixable within the SPA architecture plus Cloudflare configuration.

## Workstreams

### S1 — Cloudflare Configuration (User Action)

Set up in the Cloudflare dashboard for haclab.net:

- **WWW → non-WWW 301 redirect:** Create a Page Rule or Redirect Rule mapping `https://www.haclab.net/*` → `https://haclab.net/$1` (permanent 301)
- **Verify:** Use `curl -I https://www.haclab.net/` to confirm 301 redirect

### S2 — Meta Data Overhaul

**Files:** `index.html`, `src/utils/seo.ts`

**`index.html` changes:**

- Shorten meta description to ~155 characters:
  - `"Haclab: Custom software development in Kampala, Uganda — web apps, mobile apps & enterprise solutions for East African businesses."`
- Improve title to be more descriptive:
  - `"Haclab — Software Development & Enterprise Solutions in Kampala, Uganda"`
- Add hreflang tags:
  - `<link rel="alternate" hreflang="en" href="https://haclab.net/" />`
  - `<link rel="alternate" hreflang="en-UG" href="https://haclab.net/" />`
- Create `/public/assets/images/og-image.jpg` (1200×630px OG image — design or placeholder)

**`src/utils/seo.ts` changes:**

- Per-tab titles should include location keywords (e.g., "Software Development Kampala")
- Per-tab meta descriptions shortened to 150-160 chars max
- Ensure per-tab `og:image` URLs are passed when relevant

### S3 — Heading Hierarchy Fix

Fix heading levels across all tab components to ensure proper H1→H2→H3 hierarchy (no level skipping):

| Component | Change |
|-----------|--------|
| `HomeTab.tsx` | Convert WORKFLOW LOOP and PARTNER BADGES section titles from buttons/labels to `<h2>` |
| `ServicesTab.tsx` | Change "Engineering Capabilities" from `<h2>` to `<h1>` |
| `PortfolioTab.tsx` | Change "Engineering Ledger" from `<h2>` to `<h1>` |
| `BlogTab.tsx` | Change "The Technical Log" from `<h2>` to `<h1>` |
| `ContactTab.tsx` | Change "Contact Console" from `<h2>` to `<h1>` |
| `AppIndex.tsx` | Change "Haclab Apps" from `<h2>` to `<h1>` |
| `TeamTab.tsx` | Keep as-is (already has `<h1>`) |

### S4 — Internal Linking (Progressive Enhancement)

**Files:** `src/components/Header.tsx`, `src/components/tabs/PreviewWorkspace.tsx`

Convert tab navigation from `<button onClick={...}>` to `<a href="/services" onClick={e => { e.preventDefault(); handleSelectTab('services'); }}>`. This gives crawlers real anchor tags with `href` values while maintaining SPA behavior via click interception.

Update the routing logic in `PreviewWorkspace.tsx` to read and set `window.location.pathname` properly for all tabs (currently only Apps tabs maintain their path).

### S5 — Custom 404 Page

**Files:** `public/404.html` (new)

Create a standalone `public/404.html` served by Cloudflare Pages at the edge:

- Minimal HTML with site branding, "Page Not Found" message, and links back to known pages
- No JS dependency — loads instantly
- Styled to match the site's visual identity (dark theme, gradient accents)

### S6 — Structured Data Enhancement

**Files:** `src/App.tsx`, `src/components/tabs/*.tsx`

Wire in the unused schema components from `src/components/seo/`:

- **ServicesTab:** Render `<ServiceSchema />` for each service
- **PortfolioTab:** Render `<ProjectSchema />` for each project
- **HomeTab:** Render `<ReviewSchema />` for award badges
- **AppDetail:** Render `<AppProductSchema />` (already set up partially)
- **All pages:** Render `<BreadcrumbSchema />` with proper breadcrumb paths

### S7 — Performance Optimization

**Font preloading:** Add `<link rel="preload">` for Plus Jakarta Sans woff2 in `index.html` to reduce LCP

**LCP optimization:** The H1 hero text ("We craft critical software assets.") is the LCP element at 4.33s. Preload the font and review render-blocking CSS for the gradient text

**Responsive images:** Add `srcset`/`sizes` attributes to team, project, app, and award images using multiple size variants

**JS bundle splitting:**
- Audit large imports in `src/data/appsData.ts` (15K lines auto-generated)
- Ensure lazy loading for AppDetail pages (already uses `React.lazy()`)
- Consider splitting `haclabData.ts` by section if unused
- Configure Vite `manualChunks` in `vite.config.ts` to separate vendor chunks

**Console errors:** Run dev server, check browser console, fix any errors

### S8 — Google Analytics

**File:** `src/config/analytics.ts`

- User will provide real GA4 measurement ID
- Update the `trackingId` value in the config file

### S9 — Social Sharing

- Add a share button using the Web Share API (`navigator.share()`) as progressive enhancement
- Place on Portfolio and Blog sections

## Implementation Order

1. S1 (Cloudflare - user action, non-blocking)
2. S3 (Headings — quickest wins, low risk)
3. S2 (Meta tags — also quick, high visibility)
4. S4 (Internal links — unlocks crawler discoverability)
5. S5 (404 page — quick standalone file)
6. S6 (Structured data — uses existing components)
7. S7 (Performance — most impactful but also most risk)
8. S8 (GA4 — depends on user providing ID)
9. S9 (Social sharing — lowest priority)

## Verification

After implementation:
- Re-run SEO checkers (Seobility, Sitechecker) at the same URLs
- Use Google Search Console to verify indexing improvements
- Test LCP with Lighthouse
- Confirm console has no errors
