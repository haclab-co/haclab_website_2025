import { useEffect } from 'react';

export default function SitelinksSearchBoxSchema() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://haclab.net/',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://haclab.net/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    };

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
