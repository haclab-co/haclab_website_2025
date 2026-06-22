import { useEffect } from 'react';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string[];
  serviceType?: string;
}

export default function ServiceSchema({
  name,
  description,
  url,
  provider = 'Haclab Company Limited',
  areaServed = [
    'Uganda',
    'East Africa',
    'Kampala',
    'Entebbe',
    'Jinja',
    'Mukono',
    'Wakiso',
  ],
  serviceType,
}: ServiceSchemaProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      url,
      provider: {
        '@type': 'Organization',
        name: provider,
        url: 'https://haclab.co',
      },
      areaServed,
      serviceType: serviceType || name,
    };

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, description, url, provider, areaServed, serviceType]);

  return null;
}
