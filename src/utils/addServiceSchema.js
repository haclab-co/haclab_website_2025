/**
 * Utility script to add ServiceSchema to all service pages
 * Run this script with Node.js to update all service pages
 */

const fs = require('fs');
const path = require('path');

// Service pages directory
const servicesDir = path.join(__dirname, '../app/services');

// Get all service page directories
const servicePages = fs.readdirSync(servicesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Process each service page
servicePages.forEach(servicePage => {
  const pagePath = path.join(servicesDir, servicePage, 'page.tsx');
  
  // Skip if page doesn't exist
  if (!fs.existsSync(pagePath)) {
    console.log(`Skipping ${servicePage} - page.tsx not found`);
    return;
  }
  
  // Read the page content
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Check if ServiceSchema is already imported
  if (!content.includes("import ServiceSchema from '@/components/seo/ServiceSchema'")) {
    // Add import for ServiceSchema and BreadcrumbSchema if needed
    if (content.includes("import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'")) {
      // BreadcrumbSchema already imported, just add ServiceSchema
      content = content.replace(
        "import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';",
        "import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\nimport ServiceSchema from '@/components/seo/ServiceSchema';"
      );
    } else {
      // Add both imports
      content = content.replace(
        "import type { Metadata } from 'next';",
        "import type { Metadata } from 'next';\nimport BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\nimport ServiceSchema from '@/components/seo/ServiceSchema';"
      );
    }
  }
  
  // Check if ServiceSchema component is already used
  if (!content.includes("<ServiceSchema")) {
    // Get service title and description from metadata
    const titleMatch = content.match(/title: ['"]([^'"]+)['"]/);
    const descriptionMatch = content.match(/description: ['"]([^'"]+)['"]/);
    
    const title = titleMatch ? titleMatch[1].replace(' - Haclab Company Limited', '') : `${servicePage.charAt(0).toUpperCase() + servicePage.slice(1).replace(/-/g, ' ')} Services`;
    const description = descriptionMatch ? descriptionMatch[1] : `Professional ${servicePage.replace(/-/g, ' ')} services in Uganda.`;
    
    // Add ServiceSchema and BreadcrumbSchema components
    content = content.replace(
      /<>\s*(<ServiceHeroSection|<section)/,
      `<>\n      <BreadcrumbSchema pageName="${title}" />\n      <ServiceSchema\n        name="${title}"\n        description="${description}"\n        url="https://haclab.co/services/${servicePage}"\n        serviceType="${servicePage.replace(/-/g, '')}"\n      />\n      $1`
    );
  }
  
  // Write the updated content back to the file
  fs.writeFileSync(pagePath, content);
  console.log(`Updated ${servicePage}`);
});

console.log('All service pages updated with ServiceSchema');
