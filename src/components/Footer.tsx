import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-text text-brand-bg py-20 px-6 md:px-12 border-t border-brand-border/20 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        {/* Logo and Tagline */}
        <div className="md:col-span-5 flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-1.5 text-white font-sans font-black tracking-widest text-[16px] group cursor-pointer"
          >
            <span>UGC-DIRECT</span>
            <span className="w-2 h-2 rounded-full bg-brand-terracotta transform group-hover:scale-125 transition-transform duration-300"></span>
          </Link>
          <p className="text-xs text-brand-bg/70 max-w-xs leading-relaxed font-sans mt-2">
            A premium directory matching high-growth DTC brands directly to vetted creator profiles. No markup, zero middleman agency fees.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a
              href="#"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-4 h-4"
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
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <svg
                className="w-4 h-4"
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
            <a
              href="#"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Sitemap Links */}
        <div className="md:col-span-3 flex flex-col space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-bg/50">
            Navigation
          </h4>
          <nav className="flex flex-col space-y-2.5">
            {[
              { label: 'SERVICES', target: '/services' },
              { label: 'WORK', target: '/case-studies' },
              { label: 'CREATORS', target: '/#creators' },
              { label: 'PRICING', target: '/#pricing' },
              { label: 'FAQ', target: '/#faq' },
            ].map((link) => (
              <Link
                key={link.target}
                to={link.target}
                className="text-[11px] font-bold tracking-widest text-brand-bg/75 hover:text-white transition-colors text-left font-sans cursor-pointer uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Newsletter Signup */}
        <div className="md:col-span-4 flex flex-col space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-bg/50">
            Weekly Creative Audit
          </h4>
          <p className="text-xs text-brand-bg/75 leading-relaxed font-sans">
            Get 3 high-converting DTC ad hooks and structure templates in your inbox every Thursday.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center space-x-2 bg-white/5 p-1 rounded-full border border-white/10 focus-within:border-brand-terracotta transition-colors"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none text-xs px-4 py-2 w-full text-white placeholder-brand-bg/40"
            />
            <button
              type="submit"
              className="bg-brand-terracotta hover:bg-brand-terracotta-light text-white px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-1"
            >
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-brand-bg/50 space-y-4 sm:space-y-0">
        <p>
          © {new Date().getFullYear()} UGC-Direct. All rights reserved. Vetted Creators Platform.
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
