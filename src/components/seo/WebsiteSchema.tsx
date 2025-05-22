'use client';

import { useEffect } from 'react';

/**
 * Component that adds Website schema markup
 * This helps search engines understand the website structure
 * Enhanced to improve sitelinks in search results
 */
export default function WebsiteSchema() {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    // Create the structured data object with enhanced properties for better sitelinks
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://haclab.net/#website",
      "url": "https://haclab.net",
      "name": "Haclab Company Limited",
      "alternateName": "Haclab",
      "description": "Custom software development company in Kampala, Uganda",
      "publisher": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "logo": {
          "@type": "ImageObject",
          "url": "https://haclab.net/assets/images/logo.png"
        }
      },
      "inLanguage": "en-UG",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://haclab.net/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://haclab.net"
      }
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
