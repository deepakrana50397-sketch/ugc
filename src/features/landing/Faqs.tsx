'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqsData } from '@/data/faqs';

export default function Faqs() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq"
      style={{
        padding: '100px 24px',
        backgroundColor: '#f8fafc',
        position: 'relative',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <div 
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }} className="reveal-on-scroll">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#0f172a' }}>
            Frequently Asked <span className="accent-gradient-text">Questions</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.6 }}>
            Got questions about iGigster? We’ve got answers for both brands and creators.
          </p>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="stagger-container">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="reveal-on-scroll glass-panel"
                style={{
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'background-color 0.2s',
                  backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.01)',
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#0f172a',
                    fontSize: '15.5px',
                    fontWeight: 600,
                  }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: 'rgb(var(--primary))',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </button>

                {/* Collapsible Content */}
                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <p
                    style={{
                      padding: '0 24px 20px 24px',
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
