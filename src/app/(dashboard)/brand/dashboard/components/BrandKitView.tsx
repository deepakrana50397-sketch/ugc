'use client';

import React, { useState } from 'react';
import { Palette, Image, Heart, Sparkles, Upload, Copy, Info, Check, Plus, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface BrandKitViewProps {
  theme: 'dark' | 'light';
  isLight: boolean;
  cardBg: string;
  borderColor: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  accentColor: string;
  shadowStyle: string;
}

interface BrandColor {
  name: string;
  hex: string;
}

interface BrandAsset {
  id: string;
  name: string;
  size: string;
  url: string;
}

export default function BrandKitView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: BrandKitViewProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'guidelines' | 'assets'>('colors');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Color Swatches
  const [colors, setColors] = useState<BrandColor[]>([
    { name: 'Primary Glow', hex: '#EC4899' },
    { name: 'Deep Indigo', hex: '#6366F1' },
    { name: 'Emerald Mint', hex: '#10B981' },
    { name: 'Dark Onyx', hex: '#18181B' },
    { name: 'Aesthetic Blush', hex: '#FFF2F8' }
  ]);

  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#FFFFFF');

  // Do's and Don'ts Lists
  const [dos, setDos] = useState<string[]>([
    'Keep lighting warm, natural, and soft.',
    'State product benefits in the first 3 seconds.',
    'Focus on clear, high-fidelity close-ups of product application.',
    'Maintain a conversational, relatable, and authentic tone.'
  ]);

  const [donts, setDonts] = useState<string[]>([
    'Avoid harsh synthetic fluorescent studio lights.',
    'Do not sound overly corporate, salesy, or scripted.',
    'Avoid cluttered background settings during filming.',
    'Do not cover key product packaging labels.'
  ]);

  const [newDo, setNewDo] = useState('');
  const [newDont, setNewDont] = useState('');

  // Brand Assets
  const [assets, setAssets] = useState<BrandAsset[]>([
    { id: 'as_1', name: 'corporate_logo_primary.png', size: '2.4 MB', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&auto=format&fit=crop&q=60' },
    { id: 'as_2', name: 'product_photography_skin.jpg', size: '4.8 MB', url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=80&auto=format&fit=crop&q=60' }
  ]);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    triggerToast(`Copied Hex "${hex}" to clipboard!`);
  };

  const handleAddColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColorName || !newColorHex) return;
    setColors(prev => [...prev, { name: newColorName, hex: newColorHex }]);
    setNewColorName('');
    triggerToast(`Added brand color "${newColorName}"`);
  };

  const handleAddDo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDo.trim()) return;
    setDos(prev => [...prev, newDo]);
    setNewDo('');
    triggerToast('Added Brand Do checklist instruction.');
  };

  const handleAddDont = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDont.trim()) return;
    setDonts(prev => [...prev, newDont]);
    setNewDont('');
    triggerToast('Added Brand Don\'t check instruction.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
          Brand Kit
        </h1>
        <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
          Specify your color swatches, visual photography rules, and guidelines accessible to creators.
        </p>
      </div>

      {/* Navigation tabs */}
      <div style={{ display: 'flex', gap: '20px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '4px' }}>
        {[
          { id: 'colors', label: 'Color Swatches', icon: <Palette size={15} /> },
          { id: 'guidelines', label: 'Guidelines & Tone', icon: <Info size={15} /> },
          { id: 'assets', label: 'Asset Library', icon: <Image size={15} /> }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'none',
                border: 'none',
                color: isActive ? primaryText : mutedText,
                fontSize: '14.5px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                padding: '8px 2px',
                position: 'relative',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    backgroundColor: accentColor,
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Brand Colors */}
      {activeTab === 'colors' && (
        <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Swatches Grid */}
          <div style={{ flex: '2 1 400px', minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
            {colors.map((color, idx) => (
              <div
                key={idx}
                onClick={() => handleCopyHex(color.hex)}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: shadowStyle,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}
                className="color-swatch-card"
              >
                {/* Visual color circle */}
                <div style={{ height: '70px', borderRadius: '10px', backgroundColor: color.hex, border: `1px solid ${borderColor}` }} />
                
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 750, color: primaryText, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{color.name}</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Copy size={10} /> {color.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Color swatches form */}
          <div style={{ flex: '1 1 280px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: '0 0 14px' }}>Add Brand Color</h3>
            
            <form onSubmit={handleAddColor} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Color Name</label>
                <input
                  type="text"
                  required
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  placeholder="e.g. Blush Pink"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#F9FAFB' : '#141416',
                    color: primaryText,
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>HEX Swatch</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    style={{ width: '40px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer', padding: 0 }}
                  />
                  <input
                    type="text"
                    required
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : '#141416',
                      color: primaryText,
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(236,72,153,0.15)',
                  marginTop: '4px'
                }}
                className="glow-button-kit"
              >
                Add Swatch Color
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 2: Brand Guidelines & Do's / Don'ts */}
      {activeTab === 'guidelines' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* Do's card */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
              <CheckCircle2 size={18} />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>Creative DO's</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              {dos.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: secondaryText }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#10B981', fontWeight: 900 }}>✓</span>
                    <span>{item}</span>
                  </div>
                  <button onClick={() => setDos(prev => prev.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddDo} style={{ display: 'flex', gap: '8px', borderTop: `1px solid ${borderColor}`, paddingTop: '14px', marginTop: '4px' }}>
              <input
                type="text"
                required
                value={newDo}
                onChange={(e) => setNewDo(e.target.value)}
                placeholder="Add rule for creators..."
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#F9FAFB' : '#141416',
                  color: primaryText,
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <button type="submit" style={{ backgroundColor: '#10B981', border: 'none', color: '#FFFFFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}>
                Add
              </button>
            </form>
          </div>

          {/* Don'ts card */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444' }}>
              <AlertTriangle size={18} />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>Creative DONT's</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              {donts.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: secondaryText }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#EF4444', fontWeight: 900 }}>✗</span>
                    <span>{item}</span>
                  </div>
                  <button onClick={() => setDonts(prev => prev.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddDont} style={{ display: 'flex', gap: '8px', borderTop: `1px solid ${borderColor}`, paddingTop: '14px', marginTop: '4px' }}>
              <input
                type="text"
                required
                value={newDont}
                onChange={(e) => setNewDont(e.target.value)}
                placeholder="Add restriction..."
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#F9FAFB' : '#141416',
                  color: primaryText,
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <button type="submit" style={{ backgroundColor: '#EF4444', border: 'none', color: '#FFFFFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}>
                Add
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 3: Assets library */}
      {activeTab === 'assets' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Uploader Box */}
          <div style={{
            border: `2px dashed ${borderColor}`,
            borderRadius: '20px',
            padding: '32px 20px',
            textAlign: 'center',
            backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)',
            cursor: 'pointer'
          }} onClick={() => alert('Opening media browser catalog upload...')}>
            <Upload size={32} style={{ color: mutedText, margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '14px', fontWeight: 750, color: primaryText, margin: 0 }}>Upload Creative Assets</h4>
            <p style={{ fontSize: '11px', color: mutedText, marginTop: '4px', margin: '4px 0 0' }}>Drag product photography, transparency logos, or reference templates here.</p>
          </div>

          {/* Files List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {assets.map(asset => (
              <div key={asset.id} style={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '14px',
                padding: '12px',
                boxShadow: shadowStyle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: 0 }}>
                  <img src={asset.url} alt={asset.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 750, color: primaryText, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{asset.name}</span>
                    <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '2px' }}>{asset.size}</span>
                  </div>
                </div>

                <button onClick={() => setAssets(prev => prev.filter(a => a.id !== asset.id))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '6px' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#1E1B4B',
          border: '1px solid #4338CA',
          color: '#E0E7FF',
          padding: '10px 18px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '12.5px',
          fontWeight: 600,
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} style={{ color: '#818CF8' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      <style jsx global>{`
        .glow-button-kit:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3) !important;
        }
        .color-swatch-card:hover {
          border-color: rgba(236, 72, 153, 0.3) !important;
          transform: translateY(-1px);
        }
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
      `}</style>

    </div>
  );
}
