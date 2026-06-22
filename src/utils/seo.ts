export function updateSEO({ 
  title, 
  description, 
  url, 
  imageUrl,
  schemaData
}: { 
  title: string, 
  description: string, 
  url?: string, 
  imageUrl?: string,
  schemaData?: any
}) {
  // Update Title
  document.title = title;

  // Helper to update or create meta tags
  const setMetaTag = (selector: string, attribute: string, value: string) => {
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      const attrKey = selector.includes('property=') ? 'property' : 'name';
      const attrVal = selector.match(/"(.*?)"/)?.[1] || '';
      if (attrVal) {
        tag.setAttribute(attrKey, attrVal);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute(attribute, value);
  };

  setMetaTag('meta[name="description"]', 'content', description);
  setMetaTag('meta[property="og:title"]', 'content', title);
  setMetaTag('meta[property="og:description"]', 'content', description);
  
  if (url) {
    setMetaTag('meta[property="og:url"]', 'content', url);
    
    // Manage Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  if (imageUrl) {
    setMetaTag('meta[property="og:image"]', 'content', imageUrl);
    setMetaTag('meta[twitter:image"]', 'content', imageUrl); // Fallback standard
    setMetaTag('meta[name="twitter:image"]', 'content', imageUrl);
  }

  setMetaTag('meta[name="twitter:title"]', 'content', title);
  setMetaTag('meta[name="twitter:description"]', 'content', description);

  // Manage JSON-LD Structured Data
  let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(jsonLdScript);
  }
  
  if (schemaData) {
    jsonLdScript.textContent = JSON.stringify(schemaData);
  } else {
    // Default Organization Schema
    jsonLdScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Haclab Company Limited",
      "url": "https://haclab.com/",
      "logo": "https://haclab.net/assets/images/logo/light-logo.webp",
      "description": "Premium software development studio building robust enterprise solutions, web apps, and data systems.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kampala",
        "addressCountry": "UG"
      }
    });
  }
}
