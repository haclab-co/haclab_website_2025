'use client';

import { useEffect } from 'react';

/**
 * Component that adds Website schema markup
 * This helps search engines understand the website structure
 */
export default function WebsiteSchema() {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://haclab.co/#website",
      "url": "https://haclab.co",
      "name": "Haclab Company Limited",
      "description": "Custom software development company in Kampala, Uganda",
      "publisher": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "logo": {
          "@type": "ImageObject",
          "url": "https://haclab.co/assets/images/logo.png"
        }
      },
      "inLanguage": "en-UG",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": "https://haclab.co/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      ]
    };
    
    // Add the structured data to the script
    script.innerHTML = JSON.stringify(structuredData);
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
}
