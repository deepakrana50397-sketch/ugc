import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Gigs Board', path: '/gigs' },
    { label: 'For Brands', path: '/brands' },
    { label: 'For Creators', path: '/creators' },
    { label: 'Case Studies', path: '/case-studies' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'framer-nav py-3 border-b border-brand-border/60 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex items-center space-x-2 text-brand-text group cursor-pointer"
        >
          <div className="w-8 h-8 bg-black rounded-[9px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              className="w-4.5 h-4.5"
            >
              <line x1="12" y1="4" x2="12" y2="20" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
              <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-brand-text lowercase font-sans">
            viral
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[14px] font-medium transition-colors duration-200 font-sans cursor-pointer ${
                  isActive
                    ? 'text-brand-terracotta font-bold'
                    : 'text-brand-text/90 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Post a Gig CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/brands#post-gig"
            className="px-5 py-2.5 rounded-full bg-black hover:bg-black/85 text-white font-sans font-bold text-[13px] tracking-normal transition-all duration-300 shadow-sm cursor-pointer"
          >
            Post a Gig
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-text hover:text-black transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[56px] bg-brand-bg/98 backdrop-blur-md z-45 md:hidden transition-all duration-300 flex flex-col px-8 py-12 space-y-6 ${
          isOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={`text-left font-sans text-lg tracking-normal cursor-pointer ${
                isActive
                  ? 'text-brand-terracotta font-black'
                  : 'text-brand-text hover:text-black'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <div className="h-[1px] bg-brand-border my-6"></div>
        <Link
          to="/brands#post-gig"
          onClick={handleLinkClick}
          className="w-full py-3.5 rounded-full bg-black text-white font-sans font-bold text-sm tracking-normal text-center hover:bg-black/90 transition-colors duration-300"
        >
          Post a Gig
        </Link>
      </div>
    </header>
  );
}
