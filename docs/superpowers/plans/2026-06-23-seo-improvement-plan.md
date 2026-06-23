# haclab.net SEO Improvement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical and high-priority SEO issues identified across multiple SEO checkers for haclab.net

**Architecture:** Keep the existing React SPA (Vite + Tailwind + TypeScript) approach. Fix meta data, heading hierarchy, internal linking, structured data, performance, and add a 404 page. Cloudflare redirect configured separately.

**Tech Stack:** React 19, Vite 6, Tailwind 4, TypeScript 5, Motion 12, Cloudflare Pages

---

### Task 1: Improve HTML Meta Tags & Preloads

**Files:**
- Modify: `index.html`

- [ ] **Update the `<title>` tag to be more descriptive**

  Current: `<title>Haclab Portal</title>`
  New: `<title>Haclab — Software Development & Enterprise Solutions in Kampala, Uganda</title>`

- [ ] **Shorten the meta description to ~155 characters**

  Current:
  ```
  <meta name="description" content="Haclab is a leading software development company in Kampala, Uganda, specializing in custom web development, mobile apps, and enterprise software solutions for businesses across East Africa." />
  ```
  New:
  ```
  <meta name="description" content="Haclab: Custom software development in Kampala, Uganda — web apps, mobile apps & enterprise solutions for East African businesses." />
  ```

- [ ] **Add hreflang tags** after the existing meta tags:
  ```
  <link rel="alternate" hreflang="en" href="https://haclab.net/" />
  <link rel="alternate" hreflang="en-UG" href="https://haclab.net/" />
  ```

- [ ] **Add font preload for LCP optimization** (before the dns-prefetch link):
  ```
  <link rel="preload" href="/assets/fonts/PlusJakartaSans-VariableFont_wght.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/FiraCode-VariableFont_wght.woff2" as="font" type="font/woff2" crossorigin />
  ```

**Result:** The `index.html` `<head>` should now include improved title, shortened description, hreflang tags, and font preloads.

---

### Task 2: Fix HomeTab Heading Hierarchy (H1→H2→H3)

**Files:**
- Modify: `src/components/tabs/HomeTab.tsx`

- [ ] **Convert WORKFLOW LOOP and PARTNER BADGES toggle buttons to `<h2>` elements**

  Lines 130-151 currently render toggle buttons for switching between workflow and awards panels. Replace them with proper `<h2>` headings that also serve as toggle buttons:

  Change this block (lines 130-151):
  ```tsx
  <div className="flex border border-slate-800 bg-slate-950 p-1.5 rounded-lg">
    <button
      onClick={() => setHomeRightTab('workflow')}
      className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
        homeRightTab === 'workflow'
        ? 'bg-slate-900 text-brand-red-bright'
        : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      WORKFLOW LOOP
    </button>
    <button
      onClick={() => setHomeRightTab('awards')}
      className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
        homeRightTab === 'awards'
          ? 'bg-slate-900 text-brand-red-bright'
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      PARTNER BADGES
    </button>
  </div>
  ```

  To:
  ```tsx
  <div className="flex border border-slate-800 bg-slate-950 p-1.5 rounded-lg" role="tablist" aria-label="Workspace sections">
    <h2
      role="tab"
      aria-selected={homeRightTab === 'workflow'}
      onClick={() => setHomeRightTab('workflow')}
      className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
        homeRightTab === 'workflow'
        ? 'bg-slate-900 text-brand-red-bright'
        : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      WORKFLOW LOOP
    </h2>
    <h2
      role="tab"
      aria-selected={homeRightTab === 'awards'}
      onClick={() => setHomeRightTab('awards')}
      className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
        homeRightTab === 'awards'
          ? 'bg-slate-900 text-brand-red-bright'
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      PARTNER BADGES
    </h2>
  </div>
  ```

- [ ] **Verify the final heading hierarchy on HomeTab is:**
  - `<h1>` "We craft critical software assets."
  - `<h2>` "WORKFLOW LOOP" (when active) or "PARTNER BADGES" (when active)
  - `<h3>` Individual workflow step names / Individual award names

---

### Task 3: Fix ServicesTab Heading Hierarchy

**Files:**
- Modify: `src/components/tabs/ServicesTab.tsx`

- [ ] **Change "Engineering Capabilities" from `<h2>` to `<h1>`**

  Line 86: Change `<h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Engineering Capabilities</h2>`
  To: `<h1 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Engineering Capabilities</h1>`

- [ ] **Change the selected service detail title `<h3>` to `<h2>`** (line 131):
  Change: `<h3 className="text-lg font-bold text-white tracking-tight">{selectedService.title}</h3>`
  To: `<h2 className="text-lg font-bold text-white tracking-tight">{selectedService.title}</h2>`

---

### Task 4: Fix PortfolioTab Heading Hierarchy

**Files:**
- Modify: `src/components/tabs/PortfolioTab.tsx`

- [ ] **Change "Engineering Ledger" from `<h2>` to `<h1>`**

  Line 27: Change `<h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Engineering Ledger</h2>`
  To: `<h1 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Engineering Ledger</h1>`

- [ ] **Change the case architecture title from `<h3>` to `<h2>`** (line 74):
  Change: `<h3 className="text-2xl font-bold text-white tracking-tight leading-none">{selectedProject.title}</h3>`
  To: `<h2 className="text-2xl font-bold text-white tracking-tight leading-none">{selectedProject.title}</h2>`

---

### Task 5: Fix BlogTab Heading Hierarchy

**Files:**
- Modify: `src/components/tabs/BlogTab.tsx`

- [ ] **Change "The Technical Log" from `<h2>` to `<h1>`**

  Line 25: Change `<h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">The Technical Log</h2>`
  To: `<h1 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">The Technical Log</h1>`

- [ ] **Change the selected post title from `<h2>` to `<h1>`** (line 65-66):
  Change: `<h2 className="text-base sm:text-lg font-bold text-white leading-tight font-sans tracking-tight">`
  To: `<h1 className="text-base sm:text-lg font-bold text-white leading-tight font-sans tracking-tight">`

---

### Task 6: Fix ContactTab Heading Hierarchy

**Files:**
- Modify: `src/components/tabs/ContactTab.tsx`

- [ ] **Change "Contact Console" from `<h2>` to `<h1>`**

  Line 29: Change `<h2 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">Contact Console</h2>`
  To: `<h1 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">Contact Console</h1>`

---

### Task 7: Fix AppIndex Heading Hierarchy

**Files:**
- Modify: `src/components/tabs/AppIndex.tsx`

- [ ] **Change "Haclab Apps" from `<h2>` to `<h1>`**

  Line 32: Change `<h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Haclab Apps</h2>`
  To: `<h1 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Haclab Apps</h1>`

---

### Task 8: Fix TeamTab Heading Hierarchy

- [ ] **No changes needed** — TeamTab already uses `<h1>` for "Kampala Systems Squad" (line 23) and `<h2>` for member names (line 47). Verified correct.

---

### Task 9: Convert Tab Navigation to Anchor Tags with SPA Interception

**Files:**
- Modify: `src/components/PreviewWorkspace.tsx`

- [ ] **Change tab navigation `<button>` elements to `<a>` tags in PreviewWorkspace.tsx**

  Lines 298-332 currently render `<button>` elements for each tab. Replace them with `<a>` tags:

  Change the tab button (lines 298-331):
  ```tsx
  <button
    key={tab.id}
    onClick={() => handleSelectTab(tab.id as typeof activeTab)}
    className={...}
  >
    ...
  </button>
  ```

  To:
  ```tsx
  <a
    key={tab.id}
    href={tab.id === 'home' ? '/' : `/${tab.id}`}
    onClick={(e) => {
      e.preventDefault();
      handleSelectTab(tab.id as typeof activeTab);
    }}
    className={`relative px-4 py-2 min-h-[48px] text-[12.5px] font-mono tracking-wider font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all duration-200 rounded-md flex items-center gap-1.5 ${
      isSelected
          ? 'text-brand-red-bright'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
    }`}
  >
    ...
  </a>
  ```

- [ ] **Fix `handleSelectTab` to push proper URLs for all tabs, not just `/apps`**

  Current `handleSelectTab` (lines 239-249):
  ```tsx
  const handleSelectTab = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (tabId === 'apps') {
      pushRoute('/apps');
      return;
    }
    if (route.section !== 'site') {
      window.history.pushState({}, '', '/');
      setRoute({ section: 'site' });
    }
  };
  ```

  Replace with:
  ```tsx
  const handleSelectTab = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    const path = tabId === 'home' ? '/' : `/${tabId}`;
    window.history.pushState({}, '', path);
    setRoute({ section: 'site' });
  };
  ```

- [ ] **Fix `getAppRoute` to recognize all tab paths**

  Current `getAppRoute` (lines 71-77):
  ```tsx
  const getAppRoute = () => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path === '/apps') return { section: 'apps' as const };
    const match = path.match(/^\/apps\/([^/]+)$/);
    if (match) return { section: 'app-detail' as const, slug: decodeURIComponent(match[1]) };
    return { section: 'site' as const };
  };
  ```

  Replace with (adding tab detection):
  ```tsx
  const TAB_PATHS: Record<string, typeof activeTab> = {
    '/services': 'services',
    '/portfolio': 'portfolio',
    '/team': 'team',
    '/blog': 'blog',
    '/contact': 'contact',
  };

  const getAppRoute = () => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path === '/apps') return { section: 'apps' as const };
    const match = path.match(/^\/apps\/([^/]+)$/);
    if (match) return { section: 'app-detail' as const, slug: decodeURIComponent(match[1]) };
    return { section: 'site' as const };
  };
  ```

- [ ] **Update the route sync effect to restore activeTab from URL on page load and popstate**

  Update the `syncRoute` function inside the `useEffect` (lines 138-142):
  ```tsx
  const syncRoute = () => {
    const nextRoute = getAppRoute();
    setRoute(nextRoute);
    if (nextRoute.section !== 'site') {
      setActiveTab('apps');
    } else {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      const tabFromPath = TAB_PATHS[path];
      if (tabFromPath) {
        setActiveTab(tabFromPath);
      } else if (path === '/') {
        setActiveTab('home');
      }
    }
  };
  ```

---

### Task 10: Create Standalone 404 Page

**Files:**
- Create: `public/404.html`

- [ ] **Create `public/404.html`**

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>404 — Page Not Found | Haclab</title>
      <meta name="robots" content="noindex, follow" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #0f172a;
          color: #e2e8f0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
        }
        .glow {
          font-size: 6rem;
          font-weight: 800;
          background: linear-gradient(135deg, #dc2626, #f43f5e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        h1 { font-size: 1.5rem; margin: 1rem 0 0.5rem; font-weight: 700; }
        p { color: #94a3b8; max-width: 400px; line-height: 1.6; margin-bottom: 2rem; }
        .links { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .links a {
          color: #f1f5f9;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s;
          border: 1px solid #1e293b;
        }
        .links a:hover {
          background: #dc2626;
          border-color: #dc2626;
          color: #fff;
        }
        .links a.home {
          background: #dc2626;
          border-color: #dc2626;
          color: #fff;
        }
        .links a.home:hover {
          background: #b91c1c;
        }
      </style>
    </head>
    <body>
      <div class="glow">404</div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved. Let us help you find what you need.</p>
      <div class="links">
        <a href="/" class="home">Home</a>
        <a href="/services">Services</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/contact">Contact</a>
      </div>
    </body>
  </html>
  ```

---

### Task 11: Create OG Image

**Files:**
- Create: `public/assets/images/og-image.jpg` (or use a script)

- [ ] **Create an SVG OG image** at `public/assets/images/og-image.svg` (browsers/social platforms widely support SVG for OG images):

  Create `public/assets/images/og-image.svg`:
  ```svg
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0f172a"/>
    <rect x="0" y="0" width="1200" height="630" fill="url(#grid)" opacity="0.15"/>
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="none" stroke="#dc2626" stroke-width="0.5" opacity="0.3"/>
      </pattern>
      <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#dc2626"/>
        <stop offset="100%" stop-color="#f43f5e"/>
      </linearGradient>
    </defs>
    <text x="80" y="280" font-family="system-ui, sans-serif" font-weight="800" font-size="72" fill="white">Haclab</text>
    <text x="80" y="360" font-family="system-ui, sans-serif" font-weight="600" font-size="36" fill="url(#brand)">Software Development &amp; Enterprise Solutions</text>
    <text x="80" y="440" font-family="monospace" font-weight="400" font-size="24" fill="#64748b">Kampala, Uganda</text>
    <rect x="80" y="500" width="180" height="4" rx="2" fill="url(#brand)"/>
    <text x="920" y="560" font-family="monospace" font-size="20" fill="#475569">haclab.net</text>
  </svg>
  ```

- [ ] **Update `index.html` to reference the SVG OG image instead of missing JPG**

  Line 24: Change `content="https://haclab.net/assets/images/og-image.jpg"`
  To: `content="https://haclab.net/assets/images/og-image.svg"`

  Line 33: Change `content="https://haclab.net/assets/images/og-image.jpg"`
  To: `content="https://haclab.net/assets/images/og-image.svg"`

  Also update in `src/utils/seo.ts` the default `imageUrl` fallback if any.

---

### Task 12: Wire in Structured Data Components

**Files:**
- Modify: `src/App.tsx` — import additional schema components
- Modify: `src/components/PreviewWorkspace.tsx` — render per-tab schema components
- Modify: `src/utils/seo.ts` — improve JSON-LD management to avoid conflicts with React-rendered schema

- [ ] **Import unused schema components in `App.tsx` and render them conditionally**

  Currently `App.tsx` imports and renders: `LocalBusinessSchema`, `OrganizationSchema`, `WebsiteSchema`, `SitelinksSearchBoxSchema`. It does NOT import: `BreadcrumbSchema`, `ServiceSchema`, `ProjectSchema`, `ReviewSchema`, `AppProductSchema`.

  In `PreviewWorkspace.tsx`, add rendering of these components based on active tab.

  Add imports at the top of `PreviewWorkspace.tsx`:
  ```tsx
  import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
  import ReviewSchema from '../components/seo/ReviewSchema';
  ```

  Inside the `PreviewWorkspace` component return, add before the main content:

  ```tsx
  {/* SEO Structured Data per tab */}
  <BreadcrumbSchema pageName={
    activeTab === 'home' ? 'Home' :
    activeTab === 'services' ? 'Services & Solutions' :
    activeTab === 'portfolio' ? 'Deployments & Portfolio' :
    activeTab === 'apps' ? 'App Catalog' :
    activeTab === 'team' ? 'The Squad' :
    activeTab === 'blog' ? 'Tech Log' :
    activeTab === 'contact' ? 'Contact Us' : ''
  } />
  
  {/* We need to pass reviews data — using awardsList as proxy for review schema */}
  {/* Note: ReviewSchema expects actual client reviews, not award badges. Skip for now unless we create review data. */}
  ```

  For `ServiceSchema` and `ProjectSchema`, we should ideally render them in the ServicesTab and PortfolioTab components themselves since they have direct access to the data.

  Add to `ServicesTab.tsx`, import at top:
  ```tsx
  import ServiceSchema from '../seo/ServiceSchema';
  ```

  Add inside the component return (before the main div):
  ```tsx
  <ServiceSchema
    name={selectedService.title}
    description={selectedService.longDescription}
    url={`https://haclab.net/services#${selectedService.id}`}
    serviceType={selectedService.title}
  />
  ```

  Add to `PortfolioTab.tsx`, import at top:
  ```tsx
  import ProjectSchema from '../seo/ProjectSchema';
  ```

  Add inside the component return (before the main div):
  ```tsx
  <ProjectSchema
    title={selectedProject.title}
    description={selectedProject.fullDetails}
    url={selectedProject.liveUrl || `https://haclab.net/portfolio#${selectedProject.id}`}
    image={selectedProject.imageUrl ? `https://haclab.net${selectedProject.imageUrl}` : undefined}
    datePublished={selectedProject.year}
    technologies={selectedProject.techStack}
    category={selectedProject.category}
  />
  ```

---

### Task 13: Improve Per-Tab Titles and Descriptions with Location Keywords

**Files:**
- Modify: `src/components/PreviewWorkspace.tsx` (SEO useEffect, lines 159-230)

- [ ] **Update the per-tab titles and descriptions to include Kampala/Uganda keywords**

  The `updateSEO` call in the `useEffect` at lines 159-230 currently has good titles but they could include location keywords for better local SEO.

  Update the title and description for each tab:

  ```tsx
  case 'home':
    title = 'Overview - Haclab | Software Development Kampala, Uganda';
    description = 'Discover Haclab: Software Synthesis & Design Core building enterprise-grade applications and web solutions in Kampala, Uganda.';
    break;
  case 'services':
    title = 'Services - Haclab | Custom Software, Web & Mobile Development Uganda';
    description = 'Explore our engineering services: custom software development, web apps, mobile apps, database design, and SEO in Kampala, Uganda.';
    break;
  case 'portfolio':
    title = 'Portfolio - Haclab | Client Deployments & Software Projects Uganda';
    description = 'View our successful deployments and projects across Uganda. See how we deliver enterprise-grade software solutions.';
    break;
  case 'apps':
    title = 'App Catalog - Haclab | Enterprise Software Products';
    description = 'Browse the Haclab product inventory of ready-to-deploy enterprise modules and unified workspace tools.';
    break;
  case 'team':
    title = 'Team - Haclab | Software Engineers & Designers in Kampala';
    description = 'Meet the elite team of engineers and designers at Haclab committed to building high-performance systems in Kampala, Uganda.';
    break;
  case 'blog':
    title = 'Tech Log - Haclab | Software Engineering Insights & Articles';
    description = 'Read our technical articles, insights, and engineering logs about modern software architecture and development in Uganda.';
    break;
  case 'contact':
    title = 'Contact - Haclab | Software Development Inquiries Kampala';
    description = 'Get in touch with Haclab for custom software consultations, project inquiries, and enterprise solutions in Kampala, Uganda.';
    break;
  ```

---

### Task 14: Vite Code Splitting for Bundle Optimization

**Files:**
- Modify: `vite.config.ts`

- [ ] **Add manual chunks configuration to split vendor and app code**

  Current vite.config.ts:
  ```tsx
  export default defineConfig(() => {
    return {
      plugins: [react(), tailwindcss()],
      build: {
        sourcemap: true,
      },
      ...
    };
  });
  ```

  Replace with:
  ```tsx
  export default defineConfig(() => {
    return {
      plugins: [react(), tailwindcss()],
      build: {
        sourcemap: true,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              motion: ['motion'],
              lucide: ['lucide-react'],
            },
          },
        },
      },
      ...
    };
  });
  ```

---

### Task 15: Update Google Analytics Configuration

**Files:**
- Modify: `src/config/analytics.ts`

- [ ] **Replace placeholder GA4 ID when user provides it**

  Current:
  ```tsx
  export const ANALYTICS_CONFIG = {
    trackingId: 'G-XXXXXXXXXX',
  ```

  Replace `G-XXXXXXXXXX` with the real GA4 measurement ID provided by the user.

---

### Task 16: Performance — Font Preloading Verification

**Files:**
- Verify: `index.html` (Task 1 added preloads)
- Check: `public/assets/fonts/` directory

- [ ] **Verify font files exist at the expected paths**

  Run: `ls public/assets/fonts/`
  Expected: lists font files (PlusJakartaSans-VariableFont_wght.woff2, FiraCode-VariableFont_wght.woff2, etc.)

  If font files use different filenames, update the preload links in `index.html` to match.

---

### Task 17: Add Social Sharing Button (Web Share API)

**Files:**
- Create: `src/components/ShareButton.tsx`
- Modify: `src/components/PreviewWorkspace.tsx`

- [ ] **Create a `ShareButton` component using the Web Share API**

  Create `src/components/ShareButton.tsx`:
  ```tsx
  import { Share2 } from 'lucide-react';

  interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
  }

  export default function ShareButton({ title, text, url }: ShareButtonProps) {
    const handleShare = async () => {
      const shareData = { title, text, url: url || window.location.href };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch {
          // User cancelled or API not available
        }
      }
    };

    if (!navigator.share) return null;

    return (
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-mono text-slate-400 bg-slate-950 border border-slate-800 rounded-lg hover:text-white hover:border-slate-700 transition cursor-pointer"
        aria-label="Share this page"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>Share</span>
      </button>
    );
  }
  ```

- [ ] **Add the ShareButton to PreviewWorkspace** — place it in the tab navigation bar next to the tab links

  In `PreviewWorkspace.tsx`, import:
  ```tsx
  import ShareButton from './ShareButton';
  ```

  Add after the tab links div (inside the sticky header, after line 332):
  ```tsx
  <div className="ml-auto shrink-0 hidden sm:block">
    <ShareButton
      title={
        activeTab === 'home' ? 'Overview - Haclab Portal' :
        activeTab === 'services' ? 'Services & Solutions - Haclab Portal' :
        activeTab === 'portfolio' ? 'Deployments & Portfolio - Haclab Portal' :
        activeTab === 'team' ? 'The Squad - Haclab Portal' :
        activeTab === 'blog' ? 'Tech Log - Haclab Portal' :
        activeTab === 'contact' ? 'Contact Us - Haclab Portal' :
        'Haclab Portal'
      }
      text="Check out Haclab — software development & enterprise solutions in Kampala, Uganda."
    />
  </div>
  ```

---

### Task 18: Cloudflare Setup (User Action — no code)

- [ ] In Cloudflare dashboard for haclab.net, add a Page Rule or Redirect Rule:
  - **Source:** `https://www.haclab.net/*`
  - **Target:** `https://haclab.net/$1`
  - **Status:** 301 Permanent Redirect

- [ ] Verify with: `curl -I https://www.haclab.net/` — should return 301 redirect

---

### Task 19: Verification

- [ ] **Build the project** to ensure no compilation errors:
  ```
  npm run build
  ```

- [ ] **Check for TypeScript errors**:
  ```
  npx tsc --noEmit
  ```

- [ ] **Start the dev server** and manually check:
  - All tabs render correctly
  - URL bar updates properly when switching tabs
  - Direct navigation to `/services`, `/portfolio`, `/team`, `/blog`, `/contact` loads the correct tab
  - Heading hierarchy is correct on each page (inspect with browser dev tools)
  - Console has no errors

- [ ] **Re-run SEO checkers** (Seobility, Sitechecker) to confirm improvement

---

### Task 20: Commit

```bash
git add index.html public/404.html public/assets/images/og-image.svg src/components/ShareButton.tsx src/components/tabs/HomeTab.tsx src/components/tabs/ServicesTab.tsx src/components/tabs/PortfolioTab.tsx src/components/tabs/BlogTab.tsx src/components/tabs/ContactTab.tsx src/components/tabs/AppIndex.tsx src/components/PreviewWorkspace.tsx src/components/seo/ src/utils/seo.ts src/config/analytics.ts vite.config.ts docs/
git commit -m "feat: comprehensive SEO improvements

- Improve meta title/description and add hreflang tags
- Fix heading hierarchy across all pages (H1→H2→H3)
- Convert tab nav to anchor tags for crawler discoverability
- Add proper URL routing for all pages
- Create custom 404 page
- Wire in structured data schema components
- Add font preloading and Vite code splitting
- Update per-tab SEO titles with location keywords"
```
