'use client';

import { useEffect } from 'react';

/**
 * Component that adds Organization schema markup to the website
 * This helps search engines understand the organization behind the website
 * and improves local SEO for Uganda
 */
export default function OrganizationSchema() {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Haclab Company Limited",
      "url": "https://haclab.net",
      "logo": "https://haclab.net/assets/images/logo.png",
      "description": "Haclab Company Limited is a custom software development company based in Kampala, Uganda, providing modern IT solutions including web development, mobile app development, and more.",
      "foundingDate": "2018",
      "founders": [
        {
          "@type": "Person",
          "name": "Haclab Founder"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kireka Kamuli Road",
        "addressLocality": "Kampala",
        "addressRegion": "Central Region",
        "addressCountry": "UG",
        "postalCode": "256"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+256-781-343882",
        "contactType": "customer service",
        "email": "info@haclab.net",
        "areaServed": ["Uganda", "East Africa", "Kampala", "Entebbe", "Jinja", "Mukono", "Wakiso", "Mbarara", "Gulu"],
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://github.com/haclab-co",
        "https://twitter.com/HaclabCo",
        "https://web.facebook.com/HytechUg",
        "https://www.instagram.com/haclab_co/",
        "https://www.linkedin.com/company/hytech-Uganda"
      ],
      "knowsLanguage": ["English", "Luganda", "Swahili"],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "0.3476",
          "longitude": "32.6339"
        },
        "geoRadius": "500 km"
      },
      "keywords": "software development, web development, mobile app development, custom software, IT solutions, Uganda, Kampala, Entebbe, Jinja, Mukono, Wakiso"
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
