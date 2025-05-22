'use client';

import { useEffect } from 'react';

/**
 * Component that adds LocalBusiness schema markup to the website
 * This helps with local SEO for Uganda and improves visibility in local search results
 */
export default function LocalBusinessSchema() {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://haclab.net",
      "name": "Haclab Company Limited",
      "image": "https://haclab.net/assets/images/logo.png",
      "url": "https://haclab.net",
      "telephone": "+256-781-343882",
      "email": "info@haclab.net",
      "priceRange": "$$",
      "description": "Haclab Company Limited is a custom software development company based in Kampala, Uganda, providing modern IT solutions including web development, mobile app development, and more.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kireka Kamuli Road",
        "addressLocality": "Kampala",
        "addressRegion": "Central Region",
        "addressCountry": "UG",
        "postalCode": "256"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "0.3476",
        "longitude": "32.6339"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "sameAs": [
        "https://github.com/haclab-co",
        "https://twitter.com/HaclabCo",
        "https://web.facebook.com/HytechUg",
        "https://www.instagram.com/haclab_co/",
        "https://www.linkedin.com/company/hytech-Uganda"
      ],
      "areaServed": ["Uganda", "East Africa", "Kampala", "Entebbe", "Jinja", "Mukono", "Wakiso", "Mbarara", "Gulu"],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "0.3476",
          "longitude": "32.6339"
        },
        "geoRadius": "500 km"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Development",
              "description": "Professional web development services for businesses in Uganda"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile App Development",
              "description": "Custom mobile app development for businesses in Kampala and across Uganda"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-Commerce Solutions",
              "description": "E-commerce website development for Ugandan businesses"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO Optimization",
              "description": "Search engine optimization services for businesses in Uganda"
            }
          }
        ]
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
