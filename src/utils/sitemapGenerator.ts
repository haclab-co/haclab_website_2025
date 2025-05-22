import fs from 'fs';
import { globby } from 'globby';
import path from 'path';
import { apps } from '@/data/apps';
import { projects } from '@/data/projects';

const SITE_URL = 'https://haclab.net';

/**
 * Generate sitemap.xml for the website
 * This helps search engines discover and index all pages
 */
export async function generateSitemap() {
  try {
    // Get all page paths from the app directory
    const pages = await globby([
      'src/app/**/page.tsx',
      'src/app/**/page.jsx',
      '!src/app/api/**/*',
      '!src/app/**/not-found.tsx',
      '!src/app/**/error.tsx',
      '!src/app/**/loading.tsx',
    ]);

    // Extract routes from page paths
    const routes = pages.map((page) => {
      const route = page
        .replace('src/app', '')
        .replace('/page.tsx', '')
        .replace('/page.jsx', '')
        .replace(/\/\[.*\]/g, ''); // Remove dynamic route parameters

      return route === '' ? '/' : route;
    });

    // Add dynamic routes for products
    const productRoutes = apps.map((app) => `/products/${app.id}`);

    // Add dynamic routes for projects
    const projectRoutes = projects.map((project) => `/work/${project.id}`);

    // Combine all routes
    const allRoutes = [...routes, ...productRoutes, ...projectRoutes];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes
  .map((route) => {
    // Skip any routes that contain brackets (dynamic routes not handled)
    if (route.includes('[') || route.includes(']')) return '';

    return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .filter(Boolean)
  .join('\n')}
</urlset>`;

    // Write sitemap to public directory
    const publicDir = path.join(process.cwd(), 'public');
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

    console.log('Sitemap generated successfully!');
    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}
