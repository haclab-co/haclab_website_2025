import React from 'react';
import AboutHeroSection from '@/components/sections/AboutHeroSection';
import CompanyHistorySection from '@/components/sections/CompanyHistorySection';
import ValuesSection from '@/components/sections/ValuesSection';
import TeamSection from '@/components/sections/TeamSection';
import CTASection from '@/components/sections/CTASection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Haclab Company Limited',
  description: 'Learn about Haclab Company Limited, our history, mission, values, and the team behind our custom software development solutions.',
  keywords: 'about Haclab, software development company, Uganda tech company, Haclab team, Haclab history, Haclab mission',
};

export default function About() {
  return (
    <>
      <AboutHeroSection />
      <CompanyHistorySection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
