import { Metadata } from 'next';
import { apps } from '@/data/apps';

/**
 * Generate metadata for product pages with enhanced SEO
 * This includes structured data, OpenGraph, and Twitter card metadata
 */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const app = apps.find(app => app.id === id);

  if (!app) {
    return {
      title: 'Product Not Found - Haclab Company Limited',
      description: 'The requested product could not be found.',
    };
  }

  // Generate app-specific keywords based on app type
  const getAppKeywords = (app: any) => {
    const commonKeywords = [
      `${app.name} Uganda`, 
      `${app.type} Uganda`, 
      `${app.type} Kampala`, 
      `${app.name} software Kampala`,
      `${app.type} Entebbe`,
      `${app.type} Jinja`,
      `${app.type} Mukono`,
      `${app.type} Wakiso`,
      'Uganda software',
      'East Africa software solutions'
    ];

    // Add app-specific keywords
    switch (app.type) {
      case 'Inventory Management Software':
        return [
          ...commonKeywords,
          'inventory management Uganda',
          'stock control software Kampala',
          'warehouse management Uganda',
          'inventory tracking system East Africa',
          'Uganda business inventory software',
          'retail inventory management Kampala'
        ];
      case 'Hotel Management System':
        return [
          ...commonKeywords,
          'hotel management software Uganda',
          'hotel PMS Kampala',
          'hospitality software Uganda',
          'hotel booking system East Africa',
          'Uganda hotel reservation software',
          'guest management system Kampala'
        ];
      case 'School Management and Resource Tracker':
        return [
          ...commonKeywords,
          'school management software Uganda',
          'education management system Kampala',
          'student information system Uganda',
          'school administration software East Africa',
          'Uganda school ERP',
          'academic management Kampala'
        ];
      default:
        return [
          ...commonKeywords,
          'business software Uganda',
          'enterprise software Kampala',
          'business management system Uganda',
          'software solutions East Africa',
          'Uganda business automation',
          'digital transformation Kampala'
        ];
    }
  };

  // Generate a description that includes Uganda-specific content
  const getEnhancedDescription = (app: any) => {
    const baseDescription = app.longDescription || app.description || `${app.name} - ${app.type}`;
    
    // Add Uganda-specific content if not already present
    if (!baseDescription.includes('Uganda')) {
      return `${baseDescription} Specifically designed for businesses in Uganda and East Africa, with local support in Kampala, Entebbe, Jinja, Mukono, and Wakiso.`;
    }
    
    return baseDescription;
  };

  return {
    title: `${app.name} - ${app.type} for Uganda Businesses | Haclab`,
    description: getEnhancedDescription(app),
    keywords: getAppKeywords(app).join(', '),
    openGraph: {
      title: `${app.name} - ${app.type} for Uganda Businesses | Haclab`,
      description: getEnhancedDescription(app),
      url: `https://haclab.co/products/${app.id}`,
      type: 'product',
      images: [
        {
          url: `https://haclab.co/images/app-icons/${app.id}.png`,
          width: 512,
          height: 512,
          alt: `${app.name} - ${app.type} for businesses in Uganda`
        }
      ],
      locale: 'en_UG',
      siteName: 'Haclab Company Limited',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${app.name} - ${app.type} for Uganda Businesses`,
      description: getEnhancedDescription(app),
      images: [`https://haclab.co/images/app-icons/${app.id}.png`],
      creator: '@HaclabCo',
    },
    alternates: {
      canonical: `https://haclab.co/products/${app.id}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    category: 'software',
  };
}
