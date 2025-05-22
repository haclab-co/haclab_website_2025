import React from 'react';
import ContactHeroSection from '@/components/sections/ContactHeroSection';
import ContactFormSection from '@/components/sections/ContactFormSection';
import ContactInfoSection from '@/components/sections/ContactInfoSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Haclab Company Limited',
  description: 'Get in touch with Haclab Company Limited for custom software development solutions. Contact us for a free consultation or to discuss your project needs.',
  keywords: 'contact Haclab, software development company, Uganda tech company, custom software development, free consultation',
};

export default function Contact() {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
      <ContactInfoSection />
    </>
  );
}
