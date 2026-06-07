import { Link } from 'react-router-dom';

export default function Footer() {
  const menuItems = [
    { num: '01', label: 'HOME', target: '/' },
    { num: '02', label: 'GIGS BOARD', target: '/gigs' },
    { num: '03', label: 'FOR BRANDS', target: '/brands' },
    { num: '04', label: 'FOR CREATORS', target: '/creators' },
    { num: '05', label: 'CASE STUDIES', target: '/case-studies' },
    { num: '06', label: 'CONTACT', target: '/contact' },
  ];

  return (
    <footer className="bg-brand-text text-brand-bg py-24 px-6 md:px-12 border-t border-brand-border/10 text-left relative overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-terracotta/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-terracotta/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start relative z-10">
        {/* Left Column: Brand, Tagline, Organic Sketch Illustration & Socials */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-white font-serif italic text-4xl tracking-tight group cursor-pointer"
            >
              <span>igigster.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta transform group-hover:scale-150 transition-transform duration-300"></span>
            </Link>
            <p className="text-xs md:text-sm text-white/50 max-w-sm leading-relaxed font-sans font-medium">
              A premium matchmaking marketplace matching DTC brands directly with part-time creators (students, housewives, and influencers). Zero agency markups.
            </p>
          </div>


          {/* Social Icons */}
          <div className="flex space-x-3.5 pt-2">
            <a
              href="#"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 border border-white/5"
              aria-label="Instagram"
            >
              <svg
                className="w-4.5 h-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 border border-white/5"
              aria-label="Twitter"
            >
              <svg
                className="w-4.5 h-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Sitemap Ledger & Newsletter Info */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 w-full">
          {/* Sitemap Ledger List (Untold Style) */}
          <div className="md:col-span-7 flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">
              INDEX DIRECTORY
            </h4>
            <div className="flex flex-col w-full border-t border-white/10">
              {menuItems.map((item) => (
                <Link
                  key={item.target}
                  to={item.target}
                  className="group flex items-center justify-between py-4.5 border-b border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-xs text-white/30 group-hover:text-brand-terracotta transition-colors">
                    {item.num}
                  </span>
                  <span className="font-sans font-bold tracking-widest text-xs text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 uppercase">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter & Contact Details */}
          <div className="md:col-span-5 space-y-8 flex flex-col justify-start">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">
                CONTACT INQUIRIES
              </h4>
              <div className="space-y-2">
                <a
                  href="mailto:hello@igigster.com"
                  className="block font-sans font-extrabold text-sm text-white hover:text-brand-terracotta transition-colors"
                >
                  hello@igigster.com
                </a>
                <p className="text-[11px] text-white/40 leading-relaxed font-sans font-medium">
                  San Francisco, CA / Remote <br />
                  Response time: &lt; 2 hours
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">
                WEEKLY CREATIVE AUDIT
              </h4>
              <p className="text-xs text-white/50 leading-relaxed font-sans font-medium">
                Get 3 high-converting DTC ad hooks and structure templates in your inbox every Thursday.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center justify-between border-b border-white/15 py-2.5 focus-within:border-white/50 transition-colors"
              >
                <input
                  type="email"
                  placeholder="Subscribe to ad hooks..."
                  className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-white/30 focus:ring-0"
                  required
                />
                <button
                  type="submit"
                  className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Brand Watermark Typography at bottom (Anubi Style) */}
      <div className="text-[14vw] font-black uppercase tracking-tighter text-white [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] text-center select-none leading-none select-none mt-16 mb-4 font-sans select-none">
        iGigster
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/30 space-y-4 sm:space-y-0 relative z-10 font-sans font-semibold uppercase tracking-wider">
        <p>
          © {new Date().getFullYear()} igigster. All rights reserved. Vetted Creators Platform.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
