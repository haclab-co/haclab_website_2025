'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface BreadcrumbSchemaProps {
  pageName?: string;
}

/**
 * Component that adds BreadcrumbList schema markup
 * This helps search engines understand the website structure and navigation
 */
export default function BreadcrumbSchema({ pageName }: BreadcrumbSchemaProps) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Split the pathname into segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Create breadcrumb items
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://haclab.co"
      }
    ];
    
    // Add additional breadcrumb items based on the path
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format the segment name (convert kebab-case to Title Case)
      let name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Use provided page name for the last segment if available
      if (index === segments.length - 1 && pageName) {
        name = pageName;
      }
      
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `https://haclab.co${currentPath}`
      });
    });
    
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
    
    // Add the structured data to the script
    script.innerHTML = JSON.stringify(structuredData);
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [pathname, pageName]);
  
  // This component doesn't render anything visible
  return null;
}
