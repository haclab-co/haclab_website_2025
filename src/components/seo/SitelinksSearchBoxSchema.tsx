'use client';

import { useEffect } from 'react';

/**
 * Component that adds SitelinksSearchBox schema markup
 * This helps Google display a search box directly in search results
 * and can lead to the display of sitelinks like seen on ESPN and other major sites
 */
export default function SitelinksSearchBoxSchema() {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://haclab.net/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://haclab.net/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
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
