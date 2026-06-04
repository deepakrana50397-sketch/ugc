import SEO from '../../components/seo/SEO';
import JsonLd from '../../components/seo/JsonLd';
import { homeSeo } from './seo';

import Hero from './sections/Hero';
import GigsBoard from './sections/GigsBoard';
import Services from './sections/Services';
import UgcProcess from './sections/UgcProcess';
import VideoPortfolio from './sections/VideoPortfolio';
import InfluencerCatalog from './sections/InfluencerCatalog';
import PricingPackages from './sections/PricingPackages';
import FAQ from './sections/FAQ';

interface HomeProps {
  onNavigate: (sectionId: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <SEO
        title={homeSeo.title}
        description={homeSeo.description}
        keywords={homeSeo.keywords}
      />
      <JsonLd data={homeSeo.schema} />
      <JsonLd data={homeSeo.faqSchema} />

      <Hero />
      <GigsBoard />
      <Services />
      <UgcProcess />
      <VideoPortfolio />
      <InfluencerCatalog />
      <PricingPackages onNavigate={onNavigate} />
      <FAQ />
    </>
  );
}
