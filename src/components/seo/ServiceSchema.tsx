'use client';

import { useEffect } from 'react';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string[];
  serviceType?: string;
}

/**
 * Component that adds Service schema markup
 * This helps search engines understand the services offered
 */
export default function ServiceSchema({
  name,
  description,
  url,
  provider = "Haclab Company Limited",
  areaServed = ["Uganda", "East Africa", "Kampala", "Entebbe", "Jinja", "Mukono", "Wakiso"],
  serviceType
}: ServiceSchemaProps) {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": name,
      "description": description,
      "url": url,
      "provider": {
        "@type": "Organization",
        "name": provider,
        "url": "https://haclab.co"
      },
      "areaServed": areaServed,
      "serviceType": serviceType || name
    };
    
    // Add the structured data to the script
    script.innerHTML = JSON.stringify(structuredData);
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [name, description, url, provider, areaServed, serviceType]);
  
  // This component doesn't render anything visible
  return null;
}
