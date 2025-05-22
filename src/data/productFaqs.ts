/**
 * Product-specific FAQs for the website
 * This helps with SEO by providing structured content for FAQ schema
 */

import { FAQItem } from './faqs';
import { AppData } from './apps';

/**
 * Generates FAQs for a specific product
 * @param app The app data
 * @returns Array of FAQ items
 */
export function generateProductFaqs(app: AppData): FAQItem[] {
  // Common FAQs for all products
  const commonFaqs: FAQItem[] = [
    {
      question: `How can I get support for ${app.name}?`,
      answer: `We provide comprehensive support for ${app.name} through multiple channels. You can reach our support team via phone at +256-781-343882, email at support@haclab.net, or live chat on our website. For businesses in Kampala, Entebbe, Jinja, Mukono, and Wakiso, we also offer on-site support visits.`
    },
    {
      question: `Is ${app.name} suitable for businesses in Uganda?`,
      answer: `Yes, ${app.name} is specifically designed for businesses in Uganda and East Africa. It addresses local business challenges, complies with Ugandan regulations, and includes features tailored to the local market. Our team in Kampala provides local support and customization services.`
    },
    {
      question: `What training options are available for ${app.name}?`,
      answer: `We offer comprehensive training for ${app.name} users. Options include on-site training at your location in Uganda, training sessions at our Kampala office, and remote training via video conferencing. We also provide detailed documentation and video tutorials.`
    },
    {
      question: `Can ${app.name} be customized for my specific business needs?`,
      answer: `Yes, ${app.name} can be customized to meet your specific business requirements. Our development team in Kampala can add custom features, integrate with your existing systems, and adapt the software to your unique workflows. Contact us to discuss your customization needs.`
    },
    {
      question: `What is the pricing structure for ${app.name}?`,
      answer: `${app.name} is available in multiple pricing tiers to suit businesses of different sizes. We offer Basic, Professional, and Enterprise plans with various features and user limits. We also provide flexible payment options for businesses in Uganda, including mobile money payments.`
    }
  ];

  // Add app-specific FAQs based on app type
  const specificFaqs: FAQItem[] = [];

  switch (app.type) {
    case 'Inventory Management Software':
      specificFaqs.push(
        {
          question: `Can ${app.name} handle multiple warehouses or locations?`,
          answer: `Yes, ${app.name} is designed to manage inventory across multiple warehouses or locations, which is particularly useful for businesses with branches in different parts of Uganda. You can track stock levels, transfers, and sales at each location separately while maintaining a consolidated view of your entire inventory.`
        },
        {
          question: `Does ${app.name} work offline during internet outages?`,
          answer: `Yes, ${app.name} includes offline functionality that allows you to continue operations during internet outages, which can be common in some areas of Uganda. The system will automatically sync data when connectivity is restored, ensuring you never lose important inventory information.`
        }
      );
      break;
    case 'Hotel Management System':
      specificFaqs.push(
        {
          question: `Can ${app.name} handle bookings from online travel agencies?`,
          answer: `Yes, ${app.name} integrates with major online travel agencies (OTAs) popular in Uganda and East Africa. This allows you to manage all your bookings in one system, regardless of whether they come through your website, phone, or third-party platforms.`
        },
        {
          question: `Does ${app.name} support mobile money payments?`,
          answer: `Yes, ${app.name} supports mobile money payment options that are widely used in Uganda, including MTN Mobile Money and Airtel Money. This makes it convenient for local guests to make payments and deposits.`
        }
      );
      break;
    case 'School Management and Resource Tracker':
      specificFaqs.push(
        {
          question: `Is ${app.name} aligned with Uganda's education curriculum?`,
          answer: `Yes, ${app.name} is designed with Uganda's education system in mind. It supports the management of both O-level and A-level classes, and can be configured to align with the national curriculum requirements and term schedules.`
        },
        {
          question: `Can parents access their children's information through ${app.name}?`,
          answer: `Yes, ${app.name} includes a parent portal that allows parents to view their children's academic progress, attendance records, fee statements, and school announcements. This feature works well even on mobile devices with limited internet connectivity.`
        }
      );
      break;
    default:
      specificFaqs.push(
        {
          question: `Is ${app.name} available in local languages?`,
          answer: `While the primary interface of ${app.name} is in English, we can customize the system to include local Ugandan languages such as Luganda for specific modules or reports based on your requirements.`
        },
        {
          question: `How secure is the data in ${app.name}?`,
          answer: `${app.name} employs industry-standard security measures to protect your data, including encryption, secure access controls, and regular backups. Our servers are protected against power outages and connectivity issues, which is crucial for businesses operating in Uganda.`
        }
      );
  }

  // Combine common and specific FAQs
  return [...commonFaqs, ...specificFaqs];
}
