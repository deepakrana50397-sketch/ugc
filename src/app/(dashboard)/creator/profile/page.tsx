'use client';

import React, { useState, useEffect } from 'react';
import { getCreators, registerCreatorProfile } from '@/lib/services';
import { Creator } from '@/types/creator';
import { Save, CheckCircle2, Video, Plus, Trash2 } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

export default function CreatorProfilePage() {
  const { currency } = useCurrency();
  const [profile, setProfile] = useState<Creator | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'video_creator',
    location: '',
    bio: '',
    rateINR: '5000',
    rateUSD: '70',
    skills: '',
    newVideoTitle: '',
    newVideoUrl: '',
    newVideoThumb: '',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const creators = getCreators();
    // Default mock is creator-1
    const p = creators[0] || null;
    if (p) {
      setProfile(p);
      setFormData({
        title: p.title,
        category: p.category,
        location: p.location,
        bio: p.bio,
        rateINR: p.startingRate.INR.toString(),
        rateUSD: p.startingRate.USD.toString(),
        skills: p.skills.join(', '),
        newVideoTitle: '',
        newVideoUrl: '',
        newVideoThumb: '',
      });
    }
  }, []);

  if (!profile) return <div>Loading profile details...</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      const updated = registerCreatorProfile({
        ...profile,
        title: formData.title,
        category: formData.category as any,
        location: formData.location,
        bio: formData.bio,
        startingRate: {
          INR: parseFloat(formData.rateINR) || 0,
          USD: parseFloat(formData.rateUSD) || 0,
        },
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      });

      setProfile(updated);
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const handleAddPortfolio = () => {
    if (!formData.newVideoTitle || !formData.newVideoUrl) return;

    const newPortfolioItem = {
      id: `port-${Date.now()}`,
      title: formData.newVideoTitle,
      videoUrl: formData.newVideoUrl,
      thumbnailUrl: formData.newVideoThumb || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
    };

    const updatedPortfolio = [...profile.portfolio, newPortfolioItem];
    const updated = registerCreatorProfile({
      ...profile,
      portfolio: updatedPortfolio
    });

    setProfile(updated);
    setFormData(prev => ({
      ...prev,
      newVideoTitle: '',
      newVideoUrl: '',
      newVideoThumb: '',
    }));
  };

  const handleDeletePortfolio = (id: string) => {
    const updatedPortfolio = profile.portfolio.filter(p => p.id !== id);
    const updated = registerCreatorProfile({
      ...profile,
      portfolio: updatedPortfolio
    });
    setProfile(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '850px' }}>
      
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Manage Creator Profile</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
          Your profile is search-indexed publicly. Keep your rates and clips updated.
        </p>
      </div>

      {success && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '12px', borderRadius: '8px', color: '#34d399', fontSize: '13.5px' }}>
          <CheckCircle2 size={16} />
          <span>Profile changes saved successfully! Updates are synchronized with the directory search.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--card-border)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Professional Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Base Rate (INR)</label>
            <input
              type="number"
              required
              value={formData.rateINR}
              onChange={(e) => setFormData({ ...formData, rateINR: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Base Rate (USD)</label>
            <input
              type="number"
              required
              value={formData.rateUSD}
              onChange={(e) => setFormData({ ...formData, rateUSD: e.target.value })}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Skills (comma separated)</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Professional Bio</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: '#ec4899',
            color: '#0f172a',
            padding: '12px 24px',
            borderRadius: '24px',
            fontWeight: 600,
            fontSize: '13.5px',
            cursor: 'pointer',
            alignSelf: 'flex-end',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
          }}
          className="glow-button"
        >
          <Save size={15} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </form>

      {/* Portfolio Items Manager */}
      <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--card-border)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Upload UGC Video Work</h3>
        
        {/* Upload form fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <input
            type="text"
            placeholder="Video Clip Title"
            value={formData.newVideoTitle}
            onChange={(e) => setFormData({ ...formData, newVideoTitle: e.target.value })}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', fontSize: '13px' }}
          />
          <input
            type="url"
            placeholder="MP4 Video URL"
            value={formData.newVideoUrl}
            onChange={(e) => setFormData({ ...formData, newVideoUrl: e.target.value })}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', fontSize: '13px' }}
          />
          <input
            type="url"
            placeholder="Thumbnail JPG URL (Optional)"
            value={formData.newVideoThumb}
            onChange={(e) => setFormData({ ...formData, newVideoThumb: e.target.value })}
            style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(0,0,0,0.02)', color: '#0f172a', outline: 'none', fontSize: '13px' }}
          />
          <button
            onClick={handleAddPortfolio}
            disabled={!formData.newVideoTitle || !formData.newVideoUrl}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--card-border)',
              color: '#0f172a',
              padding: '10px 16px',
              borderRadius: '8px',
              fontWeight: 650,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Plus size={14} />
            <span>Add Clip</span>
          </button>
        </div>

        {/* Existing clips list */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {profile.portfolio.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid rgba(0,0,0,0.02)', padding: '12px', borderRadius: '12px', position: 'relative' }}>
              <button
                onClick={() => handleDeletePortfolio(item.id)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <Trash2 size={12} />
              </button>
              <div style={{ height: '120px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#18181b' }}>
                <img src={item.thumbnailUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '12.5px', color: '#475569', fontWeight: 500 }}>{item.title}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
