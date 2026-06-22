import { useEffect, useState } from 'react';

interface BreadcrumbSchemaProps {
  pageName?: string;
}

export default function BreadcrumbSchema({ pageName }: BreadcrumbSchemaProps) {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const segments = pathname.split('/').filter(Boolean);

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://haclab.net',
      },
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      let name = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      if (index === segments.length - 1 && pageName) {
        name = pageName;
      }
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: index + 2,
        name,
        item: `https://haclab.net${currentPath}`,
      });
    });

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [pathname, pageName]);

  return null;
}
