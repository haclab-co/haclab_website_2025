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

export default function ProjectSchema({
  title,
  description,
  url,
  image,
  datePublished = new Date().toISOString().split('T')[0],
  technologies = [],
  features = [],
  codeSnippet,
  category,
}: ProjectSchemaProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    function detectProgrammingLanguage(code: string): string {
      if (
        code.includes('import React') ||
        code.includes('=>') ||
        code.includes('const ')
      ) {
        return 'JavaScript';
      }
      if (code.includes('func ') && code.includes('struct ')) return 'Go';
      if (code.includes('def ') && code.includes(':')) return 'Python';
      if (
        code.includes('CREATE TABLE') ||
        code.includes('SELECT ')
      )
        return 'SQL';
      return 'Mixed';
    }

    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      description,
      url,
      image: image || 'https://haclab.net/assets/images/logo.png',
      datePublished,
      author: {
        '@type': 'Organization',
        name: 'Haclab Company Limited',
        url: 'https://haclab.net',
      },
      keywords: [
        ...technologies,
        ...features,
        'Uganda',
        'Kampala',
        'software development',
      ].join(', '),
      provider: {
        '@type': 'Organization',
        name: 'Haclab Company Limited',
        url: 'https://haclab.net',
      },
    };

    if (codeSnippet) {
      structuredData.programmingLanguage =
        detectProgrammingLanguage(codeSnippet);
      structuredData.codeSampleType = 'code snippet';
      structuredData.codeRepository = 'https://haclab.net/work';
    }

    if (category) {
      structuredData.applicationCategory = category;
    }

    if (technologies.length > 0) {
      structuredData.featureList = technologies.join(', ');
    }

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [title, description, url, image, datePublished, technologies, features, codeSnippet, category]);

  return null;
}
