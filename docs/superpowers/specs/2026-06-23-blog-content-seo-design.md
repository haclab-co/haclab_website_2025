# Blog Content & SEO Upgrade — Design Spec

## Context

Haclab currently has a minimal blog with 1 post, no images, no per-post SEO, and no individual post URLs. The goal is to upgrade the blog system and create 13 high-quality, SEO-optimized blog posts targeting East African business owners and CTOs.

## 1. Data Model

### Updated `BlogPost` Type
```typescript
export interface BlogPost {
  id: string;           // e.g. "custom-vs-off-the-shelf"
  slug: string;         // URL-safe, e.g. "custom-software-vs-off-the-shelf"
  title: string;        // Full post title
  date: string;         // "Month DD, YYYY"
  author: string;       // "Douglas Were"
  readTime: string;     // "7 min read"
  summary: string;      // 1-2 sentence teaser
  content: string;      // HTML string with <h2>, <p>, <ul>, etc.
  tags: string[];       // e.g. ["Strategy", "Software"]
  imageUrl: string;     // Path: "/assets/images/blog/{id}-hero.webp"
  seoTitle: string;     // Per-post meta title (50-60 chars)
  seoDescription: string; // Per-post meta description (120-160 chars)
}
```

Location: `src/data/haclabData.ts` — add 12 more posts to the existing `blogPostsData` array.

## 2. Image Strategy

### Image Sources
- **Primary search:** DuckDuckGo image search via `i.js` API (see `scripts/fetch-blog-image.py`)
- **Preferred source:** Unsplash URLs (direct download, no Referer needed)
- **Fallback:** Other sources (xessable.com, etc.) — may need `Referer` header
- **Conversion:** PIL/Pillow converts to .webp (primary) and .png (fallback)

### Image Files
- Location: `public/assets/images/blog/`
- Naming: `{post-id}-hero.webp` + `{post-id}-hero.png`
- Hero dimensions: 1200×630px (OG image standard)
- Dual format: `.webp` primary, `.png` fallback (existing `toWebp()` + `imgOnError()` pattern)
- No inline content images in v1 (hero image only per post)

## 3. Individual Post Routes

### Route Design
- `/blog` → existing BlogTab (post list + inline reader, unchanged)
- `/blog/{slug}` → new `BlogPostPage` component (standalone post view)

### Routing Mechanism
- Existing SPA tab navigation in `PreviewWorkspace.tsx`
- Pattern: `case 'blog'`: `slug` param → determine `selectedPostId` from URL
- `syncRoute()` already maps URL paths to tabs — extend to parse slug from `/blog/custom-software-vs-off-the-shelf`

### BlogPostPage Component
- Location: `src/components/tabs/BlogPostPage.tsx` (new)
- Renders: hero image, h1 title, meta row (date/author/readTime), article content, tags, back link
- Uses existing `blogPostsData`, finds post by `slug`
- Shows "Post not found" state if slug doesn't match any post

## 4. Per-Post SEO

### Meta Tags
- `updateSEO()` called with post-specific `seoTitle`, `seoDescription`, `imageUrl`
- Canonical URL: `https://haclab.net/blog/{slug}`
- OG image: post hero image (1200×630)

### Article Schema
- New component: `src/components/seo/ArticleSchema.tsx`
- Outputs JSON-LD `Article` type with: headline, datePublished, author, image, description, publisher (Haclab)
- Rendered inside `BlogPostPage`

### Breadcrumb Schema
- Update to include Blog → BlogPosting for individual post pages

## 5. BlogTab UI Updates

### Post List (Left Panel)
- Already shows title, summary, date, readTime, tags
- Add small thumbnail image (80×80) next to each post title in the list

### Post Reader (Right Panel / BlogPostPage)
- Hero image at top (full width, 400px height)
- Content rendered as HTML (not plain text) — upgrade from `whitespace-pre-line` to `dangerouslySetInnerHTML` with sanitization
- Add social share buttons (Web Share API already exists in ShareButton)

## 6. Content: 13 Blog Posts

All posts target East African business owners/CTOs. Content is HTML strings in `haclabData.ts`.

| # | ID / Slug | Title | Read Time |
|---|-----------|-------|-----------|
| 1 | `custom-software-vs-off-the-shelf` | Custom Software vs Off-the-Shelf: What's Right for Your Ugandan Business in 2026? | 8 min |
| 2 | `mobile-money-integration-guide` | The Practical Guide to Mobile Money Integration for Ugandan Businesses | 7 min |
| 3 | `true-cost-software-development` | The True Cost of Software Development in Uganda: A Budget Guide for 2026 | 6 min |
| 4 | `choosing-software-partner-kampala` | How to Choose a Software Development Partner in Kampala | 7 min |
| 5 | `digital-transformation-ugandan-smes` | Digital Transformation for Ugandan SMEs: A Practical Roadmap | 8 min |
| 6 | `building-scalable-systems-africa` | Building Scalable Systems for Growing African Markets | 7 min |
| 7 | `fintech-security-east-africa` | Fintech Security Essentials: Protecting Your Customers in East Africa | 8 min |
| 8 | `roi-quality-software-engineering` | The ROI of Quality Software Engineering: Why Cheap Code Costs More | 6 min |
| 9 | `cloud-adoption-uganda` | Cloud Adoption in Uganda: AWS, Azure, or Local Hosting? | 7 min |
| 10 | `api-first-development-business-growth` | API-First Development: How APIs Unlock Business Growth | 6 min |
| 11 | `data-driven-decisions-ugandan-businesses` | Data-Driven Decision Making for Ugandan Businesses | 7 min |
| 12 | `modernizing-legacy-systems-east-africa` | Modernizing Legacy Systems: A Strategy for Established East African Firms | 8 min |
| 13 | `future-software-uganda-economy` | The Future of Software in Uganda's Economy: Trends Shaping 2026 and Beyond | 8 min |

Post dates: June 23, 2026 → September 15, 2026 (weekly cadence).

## 7. Implementation Order

1. **Data model + image infrastructure**: Update `BlogPost` type, create `public/assets/images/blog/`, write image fetch script
2. **Routing + BlogPostPage**: Add slug-based routing, create `BlogPostPage` component
3. **Per-post SEO**: Add `ArticleSchema`, update `updateSEO()` calls, update BreadcrumbSchema
4. **BlogTab UI updates**: HTML content rendering, thumbnail in list, hero image in reader
5. **Content creation**: Write all 13 blog posts (HTML content)
6. **Image download + save**: Run image search script for all 13 posts, convert to .webp + .png

## Open Questions

- None — all decisions made.