import { useEffect } from 'react';

interface AppProductSchemaProps {
  app: {
    name: string;
    type: string;
    version: string;
    summary?: string;
    logoPath?: string;
    highlights?: string[];
    marketing?: {
      pitchHook?: string;
      targetAudience?: string;
    };
  };
  slug: string;
}

export default function AppProductSchema({ app, slug }: AppProductSchemaProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.name,
      description: app.summary || app.marketing?.pitchHook || '',
      applicationCategory: app.type,
      softwareVersion: app.version,
      operatingSystem: 'Web, Mobile, Desktop',
      image: app.logoPath
        ? `https://haclab.net${app.logoPath}`
        : 'https://haclab.net/assets/images/logo.png',
      url: `https://haclab.net/apps/${slug}`,
      featureList: app.highlights?.join(', ') || '',
      author: {
        '@type': 'Organization',
        name: 'Haclab Company Limited',
        url: 'https://haclab.net',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    };

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [app, slug]);

  return null;
}
