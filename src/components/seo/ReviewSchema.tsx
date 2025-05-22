'use client';

import { useEffect } from 'react';

interface Review {
  name: string;
  company: string;
  role: string;
  quote: string;
  avatar?: string;
  rating?: number;
  datePublished?: string;
}

interface ReviewSchemaProps {
  itemReviewed: string;
  url: string;
  reviews: Review[];
}

/**
 * Component that adds Review schema markup for testimonials
 * This helps search engines understand reviews and can lead to rich results with star ratings
 */
export default function ReviewSchema({
  itemReviewed,
  url,
  reviews
}: ReviewSchemaProps) {
  useEffect(() => {
    if (!reviews || reviews.length === 0) return;
    
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Calculate average rating if ratings are provided
    const ratingsProvided = reviews.some(review => review.rating !== undefined);
    let averageRating = 0;
    
    if (ratingsProvided) {
      const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 5), 0);
      averageRating = totalRating / reviews.length;
    }
    
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": itemReviewed,
      "url": url,
      "review": reviews.map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating || 5, // Default to 5 if not provided
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": review.name
        },
        "reviewBody": review.quote,
        "datePublished": review.datePublished || new Date().toISOString().split('T')[0],
        "publisher": {
          "@type": "Organization",
          "name": review.company
        }
      }))
    };
    
    // Add aggregate rating if ratings are provided
    if (ratingsProvided) {
      structuredData["aggregateRating"] = {
        "@type": "AggregateRating",
        "ratingValue": averageRating.toFixed(1),
        "reviewCount": reviews.length,
        "bestRating": 5
      };
    }
    
    // Add the structured data to the script
    script.innerHTML = JSON.stringify(structuredData);
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [itemReviewed, url, reviews]);
  
  // This component doesn't render anything visible
  return null;
}
