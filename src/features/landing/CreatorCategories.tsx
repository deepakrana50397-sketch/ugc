'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, UserCheck, ShieldCheck, Mail, Check, X } from 'lucide-react';
import GlowCard from '@/components/animation/GlowCard';
import TextReveal from '@/components/animation/TextReveal';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  location: string;
  handle: string;
  niche: string;
  tier: 'Nano (5k-20k)' | 'Micro (20k-100k)';
  followers: string;
  platforms: ('tiktok' | 'instagram' | 'youtube')[];
  rate: number;
  engagement: number;
  audience: string;
  tags: string[];
  bio: string;
}

export default function CreatorCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');

  // Drawer booking states
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Form, 2: Done
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    productLink: '',
    brief: '',
    videoQuantity: 1
  });

  const creators: Creator[] = [
    {
      id: 'c1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
      location: 'Los Angeles, CA',
      handle: '@sarah.skincare',
      niche: 'beauty',
      tier: 'Nano (5k-20k)',
      followers: '12.4K',
      platforms: ['tiktok', 'instagram'],
      rate: 150,
      engagement: 6.4,
      audience: 'Female 18-24 (65%)',
      tags: ['Skincare Routine', 'Product Review', 'Aesthetic'],
      bio: 'Esthetician creating native, educational beauty routines and honest skincare reviews.'
    },
    {
      id: 'c2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      location: 'New York, NY',
      handle: '@marcus.tech',
      niche: 'tech',
      tier: 'Micro (20k-100k)',
      followers: '45.2K',
      platforms: ['tiktok', 'youtube'],
      rate: 220,
      engagement: 5.8,
      audience: 'Male 18-24 (55%)',
      tags: ['ASMR Unboxing', 'Setup Guide', 'Tech Hacks'],
      bio: 'Tech enthusiast focusing on minimal setups, unboxings, and gadget performance.'
    },
    {
      id: 'c3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      location: 'Miami, FL',
      handle: '@elena.style',
      niche: 'fashion',
      tier: 'Micro (20k-100k)',
      followers: '68.0K',
      platforms: ['instagram', 'tiktok'],
      rate: 250,
      engagement: 7.2,
      audience: 'Female 18-24 (70%)',
      tags: ['Try-On Haul', 'Outfit Styling', 'OOTD'],
      bio: 'Fashion content creator showcasing styling hacks and aesthetic lookbooks.'
    },
    {
      id: 'c4',
      name: 'David Kojo',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      location: 'Austin, TX',
      handle: '@david.eats',
      niche: 'food',
      tier: 'Nano (5k-20k)',
      followers: '18.9K',
      platforms: ['tiktok', 'youtube'],
      rate: 160,
      engagement: 8.1,
      audience: 'Female 25-34 (40%)',
      tags: ['Recipe Hook', 'ASMR Cooking', 'Taste Test'],
      bio: 'Home chef creating quick, high-retention protein recipes and unboxings.'
    },
    {
      id: 'c5',
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop',
      location: 'San Francisco, CA',
      handle: '@maya.glow',
      niche: 'beauty',
      tier: 'Nano (5k-20k)',
      followers: '9.8K',
      platforms: ['tiktok', 'instagram'],
      rate: 150,
      engagement: 6.9,
      audience: 'Female 18-24 (60%)',
      tags: ['Get Ready With Me', 'Dry Skin Hacks', 'Aesthetic'],
      bio: 'Slow-living skin prep content and morning glow routines.'
    }
  ];

  const niches = [
    { id: 'all', label: 'All Niches' },
    { id: 'beauty', label: 'Beauty & Skincare' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'tech', label: 'Tech & Gadgets' },
    { id: 'food', label: 'Food & Beverage' }
  ];

  // Filtering logic
  const filteredCreators = creators.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesNiche = selectedNiche === 'all' || c.niche === selectedNiche;
    return matchesSearch && matchesNiche;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep(2);
  };

  const closeBookingDrawer = () => {
    setSelectedCreator(null);
    setBookingStep(1);
    setFormData({
      brandName: '',
      email: '',
      productLink: '',
      brief: '',
      videoQuantity: 1
    });
  };

  return (
    <section 
      id="creators"
      style={{
        padding: '120px 24px',
        backgroundColor: 'var(--background)',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '64px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(79, 70, 229, 0.06)',
              border: '1px solid rgba(79, 70, 229, 0.15)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: 'rgb(79, 70, 229)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <ShieldCheck size={13} style={{ color: 'rgb(219, 39, 119)' }} />
            <span>Direct Hiring Panel</span>
          </div>

          <TextReveal
            text="Vetted UGC Creator Catalog"
            tag="h2"
            mode="words"
            className="text-foreground"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          />
          
          <p style={{ color: 'var(--muted)', maxWidth: '600px', fontSize: '16.5px', lineHeight: 1.6 }}>
            Search or filter through verified creator profiles. Hire directly at their standard rate card, avoiding standard agency retainers.
          </p>
        </div>

        {/* Search & Niche Filter Panel */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '20px',
            width: '100%',
            backgroundColor: 'var(--muted-bg)',
            border: '1px solid var(--border)',
            padding: '16px 24px',
            borderRadius: '20px',
          }}
        >
          {/* Search bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: '1', minWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Search by name, handle, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Filter niches list */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {niches.map((niche) => (
              <button
                key={niche.id}
                onClick={() => setSelectedNiche(niche.id)}
                style={{
                  outline: 'none',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '10px',
                  backgroundColor: selectedNiche === niche.id ? 'rgb(79, 70, 229)' : 'rgba(255,255,255,0.7)',
                  color: selectedNiche === niche.id ? '#ffffff' : 'var(--muted)',
                  border: selectedNiche === niche.id ? '1px solid transparent' : '1px solid var(--border)',
                  transition: 'all 0.3s ease',
                }}
              >
                {niche.label}
              </button>
            ))}
          </div>
        </div>

        {/* Creators Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            width: '100%',
          }}
        >
          <AnimatePresence>
            {filteredCreators.map((creator) => (
              <motion.div
                key={creator.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{ height: '100%' }}
              >
                <GlowCard
                  glowColor="rgba(219, 39, 119, 0.06)"
                  style={{
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    height: '100%',
                    border: '1px solid rgba(231, 229, 228, 0.7)',
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    textAlign: 'left',
                  }}
                >
                  {/* Top: Avatar, location, handle */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={creator.avatar}
                      style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }}
                      alt={creator.name}
                    />
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--foreground)' }}>{creator.name}</h3>
                      <span style={{ fontSize: '13px', color: 'rgb(219, 39, 119)', fontWeight: 500 }}>{creator.handle}</span>
                      <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{creator.location}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {creator.bio}
                  </p>

                  {/* Metrics grid */}
                  <div 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, 1fr)', 
                      gap: '8px', 
                      backgroundColor: 'var(--muted-bg)', 
                      padding: '12px', 
                      borderRadius: '12px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Followers</span>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--foreground)', marginTop: '2px' }}>{creator.followers}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Engagement</span>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: 'rgb(79, 70, 229)', marginTop: '2px' }}>{creator.engagement}%</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' }}>Base Rate</span>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--foreground)', marginTop: '2px' }}>${creator.rate}</p>
                    </div>
                  </div>

                  {/* Creator Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {creator.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '10px', color: 'var(--muted)', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '6px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Booking Trigger Button */}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: 'auto' }}>
                    <button
                      onClick={() => setSelectedCreator(creator)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '30px',
                        backgroundColor: 'var(--foreground)',
                        color: 'var(--background)',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                      className="hover-bg-primary-btn"
                    >
                      <span>Direct Hire Option</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar Booking Form Drawer (AnimatePresence Overlay) */}
        <AnimatePresence>
          {selectedCreator && (
            <>
              {/* Backdrop */}
              <motion.div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(28, 25, 22, 0.4)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 2000,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeBookingDrawer}
              />

              {/* Sidebar Drawer container */}
              <motion.div
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  maxWidth: '480px',
                  backgroundColor: '#FAF8F5',
                  boxShadow: '-10px 0 40px rgba(0,0,0,0.08)',
                  zIndex: 2001,
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: '1px solid rgba(28, 25, 22, 0.08)',
                  textAlign: 'left',
                }}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                {/* Header */}
                <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(28,25,22,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1c1917', fontFamily: 'var(--font-display)' }}>Book Creator</h3>
                    <p style={{ fontSize: '12px', color: '#78716c', marginTop: '2px' }}>Direct hiring for {selectedCreator.name}</p>
                  </div>
                  <button
                    onClick={closeBookingDrawer}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(28,25,22,0.04)',
                      color: '#1c1917',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Form Content / Success page */}
                <div style={{ padding: '32px 24px', flex: 1, overflowY: 'auto' }}>
                  {bookingStep === 1 ? (
                    <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Brand name */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#1c1917' }}>Brand / Company Name</label>
                        <input
                          type="text"
                          required
                          value={formData.brandName}
                          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                          placeholder="e.g. Bloom Skincare"
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13.5px' }}
                        />
                      </div>

                      {/* Brand email */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#1c1917' }}>Business Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@yourbrand.com"
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13.5px' }}
                        />
                      </div>

                      {/* Product Link */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#1c1917' }}>Product Landing Page URL</label>
                        <input
                          type="url"
                          required
                          value={formData.productLink}
                          onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
                          placeholder="https://yourbrand.com/product"
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13.5px' }}
                        />
                      </div>

                      {/* Brief direction */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#1c1917' }}>Creative Brief / Project Info</label>
                        <textarea
                          required
                          value={formData.brief}
                          onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                          rows={4}
                          placeholder="Briefly describe what you want the creator to test/say..."
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13.5px', resize: 'none' }}
                        />
                      </div>

                      {/* Quantity select */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#1c1917' }}>Quantity of Video Assets</label>
                        <select
                          value={formData.videoQuantity}
                          onChange={(e) => setFormData({ ...formData, videoQuantity: Number(e.target.value) })}
                          style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '13.5px', backgroundColor: '#ffffff' }}
                        >
                          <option value={1}>1 Video asset (${selectedCreator.rate})</option>
                          <option value={2}>2 Video assets (${selectedCreator.rate * 2})</option>
                          <option value={3}>3 Video assets (${selectedCreator.rate * 3 * 0.9} - 10% Off)</option>
                          <option value={5}>5 Video assets (${selectedCreator.rate * 5 * 0.85} - 15% Off)</option>
                        </select>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          padding: '16px',
                          backgroundColor: 'rgb(79, 70, 229)',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '13px',
                          borderRadius: '30px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          boxShadow: '0 8px 20px -6px rgba(79, 70, 229, 0.4)',
                          marginTop: '12px',
                        }}
                      >
                        Request Direct Seeding
                      </button>
                    </form>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#059669', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                        <Check size={32} strokeWidth={3} />
                      </div>
                      <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1c1917' }}>Direct Hiring Request Sent!</h4>
                      <p style={{ fontSize: '13.5px', color: '#78716c', lineHeight: 1.5 }}>
                        We have forwarded your brief to <strong>{selectedCreator.name}</strong>. They will review your product and brief, and we'll connect you at <strong>{formData.email}</strong> within 24 hours.
                      </p>
                      <button
                        onClick={closeBookingDrawer}
                        style={{
                          border: 'none',
                          cursor: 'pointer',
                          padding: '14px 28px',
                          backgroundColor: '#1c1917',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '12px',
                          borderRadius: '30px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginTop: '16px',
                        }}
                      >
                        Back to Catalog
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
