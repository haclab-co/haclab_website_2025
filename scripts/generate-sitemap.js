const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all app routes
async function getAllRoutes() {
  try {
    // Get all page files
    const appDir = path.join(process.cwd(), 'src/app');
    const pageFiles = findAllPageFiles(appDir);
    
    // Convert page files to routes
    const staticRoutes = pageFiles.map(file => {
      return file
        .replace(appDir, '')
        .replace(/\/page\.(tsx|jsx|js|ts)$/, '')
        .replace(/\/\[.*?\]/g, '/*'); // Replace dynamic segments with *
    });
    
    // Get dynamic routes from data files
    const dynamicRoutes = await getDynamicRoutes();
    
    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Error getting routes:', error);
    return [];
  }
}

// Find all page files recursively
function findAllPageFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findAllPageFiles(filePath));
    } else if (file.match(/page\.(tsx|jsx|js|ts)$/)) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Get dynamic routes from data files
async function getDynamicRoutes() {
  try {
    // Try to get product IDs
    let productIds = [];
    try {
      const appsPath = path.join(process.cwd(), 'src/data/apps.ts');
      if (fs.existsSync(appsPath)) {
        const appsContent = fs.readFileSync(appsPath, 'utf8');
        const matches = appsContent.match(/id:\s*['"]([^'"]+)['"]/g);
        if (matches) {
          productIds = matches.map(match => match.replace(/id:\s*['"]([^'"]+)['"]/, '$1'));
        }
      }
    } catch (e) {
      console.warn('Could not parse product IDs:', e);
    }
    
    // Try to get project IDs
    let projectIds = [];
    try {
      const projectsPath = path.join(process.cwd(), 'src/data/projects.ts');
      if (fs.existsSync(projectsPath)) {
        const projectsContent = fs.readFileSync(projectsPath, 'utf8');
        const matches = projectsContent.match(/id:\s*['"]([^'"]+)['"]/g);
        if (matches) {
          projectIds = matches.map(match => match.replace(/id:\s*['"]([^'"]+)['"]/, '$1'));
        }
      }
    } catch (e) {
      console.warn('Could not parse project IDs:', e);
    }
    
    // Create routes
    const routes = [
      ...productIds.map(id => `/products/${id}`),
      ...projectIds.map(id => `/work/${id}`)
    ];
    
    return routes;
  } catch (error) {
    console.error('Error getting dynamic routes:', error);
    return [];
  }
}

// Generate sitemap XML
async function generateSitemap() {
  try {
    const routes = await getAllRoutes();
    const baseUrl = 'https://haclab.co';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes
  .filter(route => !route.includes('*')) // Filter out routes with wildcards
  .map(route => {
    // Normalize route
    const normalizedRoute = route === '' ? '/' : route;
    
    return `  <url>
    <loc>${baseUrl}${normalizedRoute}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${normalizedRoute === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
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

// Run the sitemap generator
generateSitemap();
