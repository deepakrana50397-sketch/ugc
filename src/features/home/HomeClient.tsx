"use client";

import { useRouter } from "next/navigation";
import Hero from "@/features/home/sections/Hero";
import GigsBoard from "@/features/home/sections/GigsBoard";
import Services from "@/features/home/sections/Services";
import UgcProcess from "@/features/home/sections/UgcProcess";
import VideoPortfolio from "@/features/home/sections/VideoPortfolio";
import InfluencerCatalog from "@/features/home/sections/InfluencerCatalog";
import PricingPackages from "@/features/home/sections/PricingPackages";
import FAQ from "@/features/home/sections/FAQ";

export default function HomeClient() {
  const router = useRouter();

  const handleNavigate = (sectionId: string) => {
    router.push(`/#${sectionId}`);
  };

  return (
    <>
      <Hero />
      <GigsBoard />
      <Services />
      <UgcProcess />
      <VideoPortfolio />
      <InfluencerCatalog />
      <PricingPackages onNavigate={handleNavigate} />
      <FAQ />
    </>
  );
}
