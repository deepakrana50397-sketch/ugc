'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGig } from '@/lib/services';
import { PlusCircle, Sparkles, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

export default function BrandPostGigPage() {
  const router = useRouter();
  const { currency } = useCurrency();
  const [formData, setFormData] = useState({
    title: '',
    category: 'video_creator',
    description: '',
    rateINR: '6000',
    rateUSD: '80',
    tags: 'Skincare, UGC, Reel',
    deadline: 'ASAP',
    isUrgent: false,
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setLoading(true);
    setTimeout(() => {
      createGig({
        title: formData.title,
        category: formData.category as any,
        description: formData.description,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        price: {
          INR: parseFloat(formData.rateINR) || 2000,
          USD: parseFloat(formData.rateUSD) || 30,
        },
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        deadline: formData.deadline,
        isUrgent: formData.isUrgent,
        isFeatured: formData.isFeatured,
        paymentType: 'fixed',
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/brand/dashboard');
      }, 1500);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => router.push('/brand/dashboard')}
          style={{
            background: 'rgba(0,0,0,0.02)',
            border: '1px solid var(--card-border)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#0f172a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Create New UGC Campaign Brief</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
            Set budgets, content goals, and deadlines. Keep it specific to attract matching creators.
          </p>
        </div>
      </div>

      {success ? (
        <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #10b981' }}>
          <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto' }} />
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Brief Posted Successfully!</h2>
          <p style={{ color: '#475569', fontSize: '14.5px' }}>
            Your campaign details are published to the public search board. Redirecting you to dashboard...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--card-border)' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Gig Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. SkinGlow organic TikTok product review"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
              className="focus-border-primary"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Content Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(9,9,11,0.95)', color: '#0f172a', cursor: 'pointer' }}
              >
                <option value="video_creator">UGC Video Creator</option>
                <option value="editor">Video Editor</option>
                <option value="motion_designer">Motion Designer</option>
                <option value="voiceover">Voiceover Artist</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Submission Deadline</label>
              <input
                type="text"
                placeholder="e.g. Due within 2 weeks"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                className="focus-border-primary"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Budget (INR) *</label>
              <input
                type="number"
                required
                value={formData.rateINR}
                onChange={(e) => setFormData({ ...formData, rateINR: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                className="focus-border-primary"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Budget (USD) *</label>
              <input
                type="number"
                required
                value={formData.rateUSD}
                onChange={(e) => setFormData({ ...formData, rateUSD: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
                className="focus-border-primary"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Keywords / Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Beauty, Serum, ASMR, Unboxing"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
              className="focus-border-primary"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Campaign Brief Description *</label>
            <textarea
              required
              rows={5}
              placeholder="Provide context about your product, style preferences, and key milestones required..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', resize: 'vertical' }}
              className="focus-border-primary"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', backgroundColor: 'rgba(0,0,0,0.01)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isUrgent}
                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                style={{ accentColor: 'rgb(var(--primary))', width: '16px', height: '16px' }}
              />
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>🔥 Flag as Urgent</span>
                <span style={{ color: '#64748b', fontSize: '11px' }}>Boosts initial application rates (+₹999 / $19 value)</span>
              </div>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                style={{ accentColor: 'rgb(var(--primary))', width: '16px', height: '16px' }}
              />
              <div>
                <span style={{ fontWeight: 600, display: 'block' }}>⭐️ Featured placement</span>
                <span style={{ color: '#64748b', fontSize: '11px' }}>Pin to top list of the job board (+₹499 / $9 value)</span>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: 'rgb(var(--primary))',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '24px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              alignSelf: 'flex-end',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            }}
            className="glow-button"
          >
            <Send size={14} />
            <span>{loading ? 'Publishing brief...' : 'Post UGC Brief'}</span>
          </button>
        </form>
      )}

    </div>
  );
}
