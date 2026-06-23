import React from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl?: string;
  wordCount?: number;
  articleSection?: string;
}

export default function ArticleSchema({ title, description, url, imageUrl, datePublished, dateModified, author, authorUrl, wordCount, articleSection }: ArticleSchemaProps) {
  const wordCountValue = wordCount ?? description.split(/\s+/).filter(Boolean).length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": author,
      ...(authorUrl ? { "url": authorUrl } : {})
    },
    "publisher": {
      "@type": "Organization",
      "name": "Haclab Company Limited",
      "url": "https://haclab.net",
      "logo": {
        "@type": "ImageObject",
        "url": "https://haclab.net/assets/images/logo/light-logo.webp"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified ?? datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url,
    "articleSection": articleSection ?? "Tech Log",
    "wordCount": wordCountValue
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}