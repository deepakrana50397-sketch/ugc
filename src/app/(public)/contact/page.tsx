'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Parse URL search parameters for creator hire pre-fills
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const hireId = params.get('hire');
      if (hireId) {
        setFormData(prev => ({
          ...prev,
          topic: 'sales',
          message: `I am interested in hiring creator ID: ${hireId}. Please help me setup the campaign connection.`
        }));
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API save
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const storedMessages = JSON.parse(localStorage.getItem('igigster_contact_messages') || '[]');
        storedMessages.push({
          id: `msg-${Date.now()}`,
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('igigster_contact_messages', JSON.stringify(storedMessages));
      }
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', padding: '80px 24px 100px 24px' }}>
      <div 
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="contact-grid"
      >
        {/* Left Side: Text and info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800 }}>
              Let’s start <span className="accent-gradient-text">Collaborating</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.6 }}>
              Have questions about platform connection fees, custom brand success rates, or creator vetting? Shoot us a message and our support team will get back to you within 2 hours.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { icon: <Mail size={20} style={{ color: 'rgb(var(--primary))' }} />, label: 'Email Support', val: 'support@igigster.com' },
              { icon: <Phone size={20} style={{ color: '#ec4899' }} />, label: 'Phone / Whatsapp', val: '+91 98765 43210' },
              { icon: <MapPin size={20} style={{ color: '#10b981' }} />, label: 'Headquarters', val: 'Bangalore, Karnataka, India' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.02)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {item.icon}
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>{item.label}</span>
                  <span style={{ fontSize: '15px', color: '#0f172a', fontWeight: 500 }}>{item.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="glass-panel" style={{ padding: '40px 32px', border: '1px solid var(--card-border)' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 0' }}>
              <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto' }} />
              <h3 style={{ fontSize: '22px', fontWeight: 700 }}>Message Dispatched!</h3>
              <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: 1.6 }}>
                Your message has been safely received. A support operator will contact you shortly.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: '', email: '', topic: 'general', message: '' });
                }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                  border: '1px solid var(--card-border)',
                  color: '#0f172a',
                  padding: '12px 24px',
                  borderRadius: '24px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '12px',
                }}
              >
                Send New Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                  className="focus-border-primary"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                  className="focus-border-primary"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Contact Topic</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(9,9,11,0.95)', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="general">General Support</option>
                  <option value="sales">Brand Connection / Sales</option>
                  <option value="billing">Onboarding Help</option>
                  <option value="creator">Creator Day Rate Auditing</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail your request here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', resize: 'vertical', fontSize: '13.5px' }}
                  className="focus-border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: 'rgb(var(--primary))',
                  color: '#ffffff',
                  padding: '14px',
                  borderRadius: '24px',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
                  marginTop: '8px',
                }}
                className="glow-button"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
