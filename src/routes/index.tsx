import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import ServicesPage from '../pages/Services';
import CaseStudiesPage from '../pages/CaseStudies';
import ContactPage from '../pages/Contact';
import GigsPage from '../pages/Gigs';
import BrandsPage from '../pages/Brands';
import CreatorsPage from '../pages/Creators';

interface AppRoutesProps {
  onNavigate: (sectionId: string) => void;
}

// ScrollToTop component to reset scroll position on route changes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function AppRoutes({ onNavigate }: AppRoutesProps) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home onNavigate={onNavigate} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gigs" element={<GigsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        {/* Fallback to home */}
        <Route path="*" element={<Home onNavigate={onNavigate} />} />
      </Routes>
    </>
  );
}
