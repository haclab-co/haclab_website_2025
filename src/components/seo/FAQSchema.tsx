'use client';

import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

/**
 * Component that adds FAQ schema markup
 * This helps search engines understand the FAQ content and can lead to rich results
 */
export default function FAQSchema({ faqs }: FAQSchemaProps) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;
    
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    
    // Add the structured data to the script
    script.innerHTML = JSON.stringify(structuredData);
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [faqs]);
  
  // This component doesn't render anything visible
  return null;
}
