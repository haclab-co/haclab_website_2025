'use client';

import { useEffect } from 'react';
import { AppData } from '@/data/apps';

interface ProductJsonLdProps {
  app: AppData;
}

/**
 * Component that adds structured data for product pages
 * This helps search engines better understand the content and improves SEO
 */
export default function ProductJsonLd({ app }: ProductJsonLdProps) {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    // Generate pricing offers
    const offers = [];
    if (app.pricing) {
      offers.push({
        "@type": "Offer",
        "name": "Basic Plan",
        "price": app.pricing.basic,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": `https://haclab.co/products/${app.id}#pricing`
      });

      offers.push({
        "@type": "Offer",
        "name": "Professional Plan",
        "price": app.pricing.professional,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": `https://haclab.co/products/${app.id}#pricing`
      });
    } else {
      // Default pricing if not specified
      offers.push({
        "@type": "Offer",
        "name": "Basic Plan",
        "price": 49,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": `https://haclab.co/products/${app.id}#pricing`
      });
    }

    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": app.name,
      "applicationCategory": app.type,
      "operatingSystem": "Windows, macOS, Linux, iOS, Android, Web",
      "offers": offers,
      "description": app.description,
      "softwareVersion": app.version,
      "image": `https://haclab.co/images/app-icons/${app.id}.png`,
      "screenshot": app.screenshots ? app.screenshots.map(screenshot => ({
        "@type": "ImageObject",
        "url": `https://haclab.co${screenshot}`
      })) : [],
      "featureList": app.features ? app.features.join(", ") : "",
      "author": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "url": "https://haclab.co",
        "logo": "https://haclab.co/assets/images/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kampala",
          "addressRegion": "Central Region",
          "addressCountry": "UG",
          "postalCode": "256"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+256-700-000000",
          "contactType": "customer service",
          "areaServed": ["Uganda", "East Africa"],
          "availableLanguage": ["English"]
        }
      },
      "provider": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "url": "https://haclab.co"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Businesses in Uganda and East Africa"
      },
      "availableOnDevice": ["Desktop", "Mobile", "Tablet"],
      "countriesSupported": ["Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi", "South Sudan"]
    };

    // Add the structured data to the script
    script.innerHTML = JSON.stringify(structuredData);

    // Add the script to the document head
    document.head.appendChild(script);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [app]);

  // This component doesn't render anything visible
  return null;
}
