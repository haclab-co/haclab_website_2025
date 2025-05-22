'use client';

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SimpleHeroSection from "./SimpleHeroSection";

// Dynamically import the complex hero section with 3D elements
const HeroSection = dynamic(() => import("./HeroSection"), {
  ssr: false,
  loading: () => <SimpleHeroSection />
});

const ClientHeroWrapper = () => {
  return (
    <Suspense fallback={<SimpleHeroSection />}>
      <HeroSection />
    </Suspense>
  );
};

export default ClientHeroWrapper;
