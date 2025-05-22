'use client';

import { useEffect } from 'react';
import { AppData } from '@/data/apps';

interface EnhancedProductSchemaProps {
  app: AppData;
}

/**
 * Enhanced Product Schema component that adds comprehensive structured data for products
 * including support information, technical specifications, and Uganda-specific details
 * This helps search engines better understand the product and improves SEO
 */
export default function EnhancedProductSchema({ app }: EnhancedProductSchemaProps) {
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
        "url": `https://haclab.co/products/${app.id}#pricing`,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "areaServed": ["Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi", "South Sudan"],
        "eligibleRegion": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "0.3476",
            "longitude": "32.6339"
          },
          "geoRadius": "1000 km"
        }
      });
      
      if (app.pricing.professional) {
        offers.push({
          "@type": "Offer",
          "name": "Professional Plan",
          "price": app.pricing.professional,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `https://haclab.co/products/${app.id}#pricing`,
          "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
          "areaServed": ["Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi", "South Sudan"],
          "eligibleRegion": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "0.3476",
              "longitude": "32.6339"
            },
            "geoRadius": "1000 km"
          }
        });
      }
    } else {
      // Default pricing if not specified
      offers.push({
        "@type": "Offer",
        "name": "Basic Plan",
        "price": 49,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": `https://haclab.co/products/${app.id}#pricing`,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
      });
    }
    
    // Support information
    const supportData = {
      "@type": "SupportService",
      "name": `${app.name} Support`,
      "description": `Technical support and assistance for ${app.name} users in Uganda and East Africa`,
      "availableLanguage": ["English", "Luganda", "Swahili"],
      "serviceType": "Technical Support",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      "serviceLocation": {
        "@type": "Place",
        "name": "Haclab Company Limited",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kireka Kamuli Road",
          "addressLocality": "Kampala",
          "addressRegion": "Central Region",
          "addressCountry": "Uganda"
        }
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "telephone": "+256-781-343882",
        "email": "support@haclab.net",
        "areaServed": ["Uganda", "East Africa"],
        "availableLanguage": ["English", "Luganda", "Swahili"]
      }
    };
    
    // Technical specifications
    const technicalSpecification = {
      "@type": "PropertyValue",
      "name": "Technical Specifications",
      "value": app.technologies ? app.technologies.join(", ") : "Modern web technologies"
    };
    
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": app.name,
      "applicationCategory": app.type,
      "operatingSystem": "Windows, macOS, Linux, iOS, Android, Web",
      "offers": offers,
      "description": app.description,
      "softwareVersion": app.version || "1.0",
      "image": `https://haclab.co/images/app-icons/${app.id}.png`,
      "screenshot": app.screenshots ? app.screenshots.map(screenshot => ({
        "@type": "ImageObject",
        "url": `https://haclab.co${screenshot}`,
        "caption": `${app.name} - ${app.type} for Uganda businesses`
      })) : [],
      "featureList": app.features ? app.features.join(", ") : "",
      "supportingData": supportData,
      "additionalProperty": [
        technicalSpecification,
        {
          "@type": "PropertyValue",
          "name": "Deployment Options",
          "value": "Cloud-based, On-premises, Hybrid"
        },
        {
          "@type": "PropertyValue",
          "name": "Target Market",
          "value": "Businesses in Uganda and East Africa"
        },
        {
          "@type": "PropertyValue",
          "name": "Training Provided",
          "value": "Yes, in-person and remote training available"
        }
      ],
      "maintainer": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "url": "https://haclab.co"
      },
      "author": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "url": "https://haclab.co",
        "logo": "https://haclab.co/assets/images/logo.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kireka Kamuli Road",
          "addressLocality": "Kampala",
          "addressRegion": "Central Region",
          "addressCountry": "Uganda",
          "postalCode": "256"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+256-781-343882",
          "contactType": "customer service",
          "areaServed": ["Uganda", "East Africa"],
          "availableLanguage": ["English", "Luganda", "Swahili"]
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
      "countriesSupported": ["Uganda", "Kenya", "Tanzania", "Rwanda", "Burundi", "South Sudan"],
      "installUrl": app.demoUrl || `https://haclab.co/products/${app.id}#demo`,
      "downloadUrl": app.downloadUrl || `https://haclab.co/products/${app.id}#download`,
      "releaseNotes": `https://haclab.co/products/${app.id}/release-notes`,
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.8",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Customer in Kampala"
        },
        "reviewBody": `${app.name} has significantly improved our business operations and efficiency.`
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
  }, [app]);
  
  // This component doesn't render anything visible
  return null;
}
