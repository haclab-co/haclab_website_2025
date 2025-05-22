import ClientHeroWrapper from "@/components/sections/ClientHeroWrapper";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CodeShowcaseSection from "@/components/sections/CodeShowcaseSection";
import TerminalShowcaseSection from "@/components/sections/TerminalShowcaseSection";
import AwardsSection from "@/components/sections/AwardsSection";
import CTASection from "@/components/sections/CTASection";
import UgandaLocationsSection from "@/components/sections/UgandaLocationsSection";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Haclab Company Limited - Custom Software Development in Uganda",
  description: "Haclab is a leading software development company in Kampala, Uganda, specializing in custom web development, mobile apps, and enterprise software solutions for businesses across Uganda and East Africa.",
  keywords: "software development Uganda, web development Kampala, mobile app development Uganda, custom software Uganda, IT solutions Kampala, software company Uganda, Entebbe, Jinja, Mukono, Wakiso",
};

export default function Home() {
  return (
    <>
      <BreadcrumbSchema pageName="Home" />
      <ClientHeroWrapper />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <CodeShowcaseSection />
      <TerminalShowcaseSection />
      <AwardsSection />
      <UgandaLocationsSection />
      <CTASection />
    </>
  );
}
