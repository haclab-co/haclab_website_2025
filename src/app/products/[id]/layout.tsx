import type { Metadata } from 'next';
import { apps } from '@/data/apps';

// Generate metadata for each product page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const app = apps.find(app => app.id === id);
  
  if (!app) {
    return {
      title: 'Product Not Found - Haclab Company Limited',
      description: 'The requested product could not be found.',
    };
  }
  
  // Generate Uganda-specific keywords based on app type
  const ugandaKeywords = [
    'Uganda', 'Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 
    'East Africa', 'Ugandan businesses', 'Uganda software solutions'
  ];
  
  // App-specific Uganda keywords
  const appSpecificKeywords = (() => {
    switch(app.type) {
      case 'Inventory Management Software':
        return ['Uganda inventory management', 'stock control Uganda', 'Kampala inventory system'];
      case 'Hotel Management System':
        return ['Uganda hotel software', 'Kampala hotel management', 'hospitality software Uganda'];
      case 'Restaurant Management Software':
        return ['Uganda restaurant POS', 'Kampala restaurant management', 'food service software Uganda'];
      case 'Property Management System':
        return ['Uganda property management', 'real estate software Kampala', 'Uganda rental management'];
      case 'Recruitment Management System':
        return ['Uganda recruitment software', 'Kampala HR solutions', 'hiring software Uganda'];
      case 'Loan and Savings Management System':
        return ['Uganda microfinance software', 'Kampala banking solutions', 'SACCO software Uganda'];
      case 'School Management and Resource Tracker':
        return ['Uganda school management', 'education software Kampala', 'school ERP Uganda'];
      case 'Garage Management System':
        return ['Uganda garage software', 'auto repair software Kampala', 'mechanic shop system Uganda'];
      default:
        return ['Uganda business software', 'Kampala enterprise solutions', 'Uganda digital transformation'];
    }
  })();
  
  // Combine all keywords
  const allKeywords = [
    ...ugandaKeywords, 
    ...appSpecificKeywords,
    app.name, 
    app.type,
    ...(app.technologies || []),
    ...(app.features || [])
  ];
  
  return {
    title: `${app.name} - ${app.type} for Uganda Businesses | Haclab`,
    description: `${app.description} Designed specifically for businesses in Uganda, Kampala, and across East Africa. Get local support and customization for your ${app.type.toLowerCase()} needs.`,
    keywords: allKeywords.join(', '),
    openGraph: {
      title: `${app.name} - ${app.type} for Uganda Businesses | Haclab`,
      description: `${app.description} Optimized for businesses in Uganda with local support.`,
      images: [`/images/app-icons/${app.id}.png`],
      locale: 'en_UG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${app.name} - ${app.type} for Uganda`,
      description: `${app.description} Optimized for businesses in Uganda with local support.`,
      images: [`/images/app-icons/${app.id}.png`],
    }
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
