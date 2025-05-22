'use client';

import { useEffect } from 'react';

interface ProjectSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  technologies?: string[];
  features?: string[];
  codeSnippet?: string;
  category?: string;
}

/**
 * Component that adds CreativeWork schema markup for portfolio projects
 * This helps search engines understand the projects and work done by Haclab
 */
export default function ProjectSchema({
  title,
  description,
  url,
  image,
  datePublished = new Date().toISOString().split('T')[0],
  technologies = [],
  features = [],
  codeSnippet,
  category
}: ProjectSchemaProps) {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Create the structured data object
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": title,
      "description": description,
      "url": url,
      "image": image || "https://haclab.co/assets/images/logo.png",
      "datePublished": datePublished,
      "author": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "url": "https://haclab.co"
      },
      "keywords": [...technologies, ...features, "Uganda", "Kampala", "software development"].join(", "),
      "provider": {
        "@type": "Organization",
        "name": "Haclab Company Limited",
        "url": "https://haclab.co"
      }
    };

    // Add code sample if available
    if (codeSnippet) {
      structuredData["programmingLanguage"] = detectProgrammingLanguage(codeSnippet);
      structuredData["codeSampleType"] = "code snippet";
      structuredData["codeRepository"] = "https://haclab.co/work";
    }

    // Add category if available
    if (category) {
      structuredData["applicationCategory"] = category;
    }

    // Add technologies as technical features
    if (technologies && technologies.length > 0) {
      structuredData["featureList"] = technologies.join(", ");
    }
    
    // Add the structured data to the script
    script.innerHTML = JSON.stringify(structuredData);
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [title, description, url, image, datePublished, technologies, features, codeSnippet, category]);
  
  // Helper function to detect programming language from code snippet
  function detectProgrammingLanguage(code: string): string {
    if (code.includes('import React') || code.includes('function') || code.includes('=>') || code.includes('const ')) {
      return 'JavaScript';
    } else if (code.includes('class ') && code.includes('public ') && code.includes(';')) {
      return 'Java';
    } else if (code.includes('func ') && code.includes('struct ')) {
      return 'Go';
    } else if (code.includes('def ') && code.includes(':')) {
      return 'Python';
    } else if (code.includes('CREATE TABLE') || code.includes('SELECT ')) {
      return 'SQL';
    } else {
      return 'Mixed';
    }
  }
  
  // This component doesn't render anything visible
  return null;
}
