"use client";

import { useRouter } from "next/navigation";
import Hero from "@/views/Home/sections/Hero";
import GigsBoard from "@/views/Home/sections/GigsBoard";
import Services from "@/views/Home/sections/Services";
import UgcProcess from "@/views/Home/sections/UgcProcess";
import VideoPortfolio from "@/views/Home/sections/VideoPortfolio";
import InfluencerCatalog from "@/views/Home/sections/InfluencerCatalog";
import PricingPackages from "@/views/Home/sections/PricingPackages";
import FAQ from "@/views/Home/sections/FAQ";

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
