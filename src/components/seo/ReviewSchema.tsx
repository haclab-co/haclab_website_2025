import { useEffect } from 'react';

interface Review {
  name: string;
  company: string;
  role: string;
  quote: string;
  avatar?: string;
  rating?: number;
  datePublished?: string;
}

interface ReviewSchemaProps {
  itemReviewed: string;
  url: string;
  reviews: Review[];
}

export default function ReviewSchema({
  itemReviewed,
  url,
  reviews,
}: ReviewSchemaProps) {
  useEffect(() => {
    if (!reviews || reviews.length === 0) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const ratingsProvided = reviews.some(
      (review) => review.rating !== undefined
    );
    let averageRating = 0;

    if (ratingsProvided) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + (review.rating || 5),
        0
      );
      averageRating = totalRating / reviews.length;
    }

    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: itemReviewed,
      url,
      review: reviews.map((review) => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating || 5,
          bestRating: 5,
        },
        author: {
          '@type': 'Person',
          name: review.name,
        },
        reviewBody: review.quote,
        datePublished:
          review.datePublished || new Date().toISOString().split('T')[0],
        publisher: {
          '@type': 'Organization',
          name: review.company,
        },
      })),
    };

    if (ratingsProvided) {
      structuredData.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: averageRating.toFixed(1),
        reviewCount: reviews.length,
        bestRating: 5,
      };
    }

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [itemReviewed, url, reviews]);

  return null;
}
