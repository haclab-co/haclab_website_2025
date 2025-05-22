import React from 'react';
import ServicesHeroSection from '@/components/sections/ServicesHeroSection';
import ServicesListSection from '@/components/sections/ServicesListSection';
import ServicesCTASection from '@/components/sections/ServicesCTASection';
import type { Metadata } from 'next';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Software Development Services in Uganda - Haclab Company Limited',
  description: 'Explore our comprehensive range of software development services for businesses in Kampala, Uganda and across East Africa. We offer web development, mobile apps, database design, e-commerce solutions, and SEO optimization tailored for the Ugandan market.',
  keywords: 'software development services Uganda, web development Kampala, mobile app development Uganda, database design Uganda, e-commerce solutions Kampala, SEO optimization Uganda, IT services Entebbe, software company Jinja, tech solutions Mukono, web design Wakiso',
  openGraph: {
    title: 'Software Development Services in Uganda - Haclab Company Limited',
    description: 'Professional software development services for businesses in Kampala and across Uganda. Web development, mobile apps, and custom software solutions.',
    url: 'https://haclab.co/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema pageName="Our Services" />
      <ServicesHeroSection />
      <ServicesListSection />
      <ServicesCTASection />
    </>
  );
}
