import { useEffect } from 'react';

export default function LocalBusinessSchema() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://haclab.co',
      name: 'Haclab Company Limited',
      image: 'https://haclab.co/assets/images/logo.png',
      url: 'https://haclab.co',
      telephone: '+256-781-343882',
      email: 'info@haclab.net',
      priceRange: '$$',
      description:
        'Haclab Company Limited is a custom software development company based in Kampala, Uganda, providing modern IT solutions including web development, mobile app development, and more.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kireka Kamuli Road',
        addressLocality: 'Kampala',
        addressRegion: 'Central Region',
        addressCountry: 'Uganda',
        postalCode: '256',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '0.3476',
        longitude: '32.6339',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      ],
      sameAs: [
        'https://github.com/haclab-co',
        'https://twitter.com/HaclabCo',
        'https://web.facebook.com/HytechUg',
        'https://www.instagram.com/haclab_co/',
        'https://www.linkedin.com/company/hytech-Uganda',
      ],
      areaServed: [
        'Uganda',
        'East Africa',
        'Kampala',
        'Entebbe',
        'Jinja',
        'Mukono',
        'Wakiso',
        'Mbarara',
        'Gulu',
      ],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '0.3476',
          longitude: '32.6339',
        },
        geoRadius: '500 km',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Development',
              description: 'Professional web development services for businesses in Uganda',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mobile App Development',
              description: 'Custom mobile app development for businesses in Kampala and across Uganda',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'E-Commerce Solutions',
              description: 'E-commerce website development for Ugandan businesses',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SEO Optimization',
              description: 'Search engine optimization services for businesses in Uganda',
            },
          },
        ],
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
