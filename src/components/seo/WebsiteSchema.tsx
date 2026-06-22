import { useEffect } from 'react';

export default function WebsiteSchema() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://haclab.net/#website',
      url: 'https://haclab.net',
      name: 'Haclab Company Limited',
      description: 'Custom software development company in Kampala, Uganda',
      publisher: {
        '@type': 'Organization',
        name: 'Haclab Company Limited',
        logo: {
          '@type': 'ImageObject',
          url: 'https://haclab.net/assets/images/logo.png',
        },
      },
      inLanguage: 'en-UG',
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: 'https://haclab.net/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      ],
    };

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
