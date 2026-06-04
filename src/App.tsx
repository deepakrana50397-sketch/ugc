import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis globally available if components need to access it
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  const navigateToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Routing Sections */}
      <main className="flex-grow">
        <AppRoutes onNavigate={navigateToSection} />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
