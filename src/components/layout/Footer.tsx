'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { footerSections } from '@/data/navigation';
import { siteConfig } from '@/data/site';
import Magnetic from '../animation/Magnetic';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate subscribe API call
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <footer 
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
        color: 'var(--muted)',
        padding: '80px 24px 40px 24px',
        fontSize: '14px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '64px',
        }}
        className="footer-grid"
      >
        {/* Brand info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Link 
            href="/" 
            style={{ 
              fontSize: '24px', 
              fontWeight: 800, 
              color: 'var(--foreground)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.04em'
            }}
          >
            <span 
              style={{ 
                background: 'linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(219, 39, 119) 100%)',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
              }}
            >
              iG
            </span>
            <span className="accent-gradient-text" style={{ fontWeight: 800 }}>igigster</span>
          </Link>
          <p style={{ lineHeight: '1.6', fontSize: '13.5px' }}>
            The premier marketplace connecting brands with high-performance UGC creators, editors, and motion graphic artists.
          </p>
          
          {/* Socials */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            {Object.entries(siteConfig.socials).map(([key, url]) => (
              <a 
                key={key} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--muted)', 
                  transition: 'color 0.3s ease', 
                  textTransform: 'capitalize',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em'
                }}
                className="hover-footer-link"
              >
                {key}
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic columns */}
        {footerSections.map((section) => (
          <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ color: 'var(--foreground)', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {section.title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    style={{ transition: 'color 0.3s ease', fontSize: '13.5px' }}
                    className="hover-footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h4 style={{ color: 'var(--foreground)', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Stay Updated
          </h4>
          <p style={{ lineHeight: '1.6', fontSize: '13.5px' }}>
            Subscribe to our newsletter for creator growth hacks, platform fees drops, and UGC trends.
          </p>
          
          {subscribed ? (
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                backgroundColor: 'rgba(5, 150, 105, 0.08)', 
                border: '1px solid rgba(5, 150, 105, 0.15)',
                padding: '12px 16px',
                borderRadius: '30px',
                color: '#059669',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <CheckCircle2 size={16} />
              <span>Subscribed successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ position: 'relative', display: 'flex', width: '100%' }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 18px',
                  borderRadius: '30px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'rgba(28, 25, 22, 0.03)',
                  color: 'var(--foreground)',
                  outline: 'none',
                  fontSize: '13.5px',
                  transition: 'all 0.3s ease',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '4px',
                  bottom: '4px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgb(79, 70, 229)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)',
                }}
                aria-label="Submit email to newsletter"
              >
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      <hr style={{ borderColor: 'rgba(28, 25, 22, 0.06)', margin: '40px 0 24px 0' }} />

      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontSize: '12.5px',
          color: 'var(--muted)',
        }}
      >
        <p>© {new Date().getFullYear()} iGigster Technologies Pvt Ltd. All rights reserved.</p>
        <p style={{ display: 'flex', gap: '8px' }}>
          <span>Made for UGC builders globally</span>
        </p>
      </div>
    </footer>
  );
}
