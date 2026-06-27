'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDashboardStore } from '@/store/dashboard/useDashboardStore';
import { registerCreatorProfile } from '@/lib/services';
import { useTheme } from '@/components/providers/ThemeProvider';
import { 
  User, Mail, MapPin, DollarSign, Sparkles, CheckCircle2, 
  Camera, Lock, Globe, HelpCircle, AlertCircle
} from 'lucide-react';

export default function CreatorMyProfilePage() {
  const router = useRouter();
  const { user, creator, loadDashboard } = useDashboardStore();
  const { theme } = useTheme();
  
  const profile = creator.profile;

  const [activeSubTab, setActiveSubTab] = useState<'basic' | 'professional' | 'socials'>('basic');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [category, setCategory] = useState('video_creator');
  const [rateINR, setRateINR] = useState('2000');
  const [rateUSD, setRateUSD] = useState('30');
  const [skills, setSkills] = useState('');
  
  // Socials
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [youtube, setYoutube] = useState('');

  useEffect(() => {
    if (user) {
      setName(profile?.name || user.name || '');
      setTitle(profile?.title || 'UGC Creator');
      setLocation(profile?.location || 'Mumbai, India');
      setBio(profile?.bio || '');
      setCategory(profile?.category || 'video_creator');
      setRateINR(profile?.startingRate?.INR?.toString() || '2000');
      setRateUSD(profile?.startingRate?.USD?.toString() || '30');
      setSkills(profile?.skills?.join(', ') || '');
      
      setInstagram(profile?.socials?.instagram || '');
      setTiktok(profile?.socials?.tiktok || '');
      setYoutube(profile?.socials?.youtube || '');
    }
  }, [user, profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await registerCreatorProfile({
        name,
        title,
        location,
        bio,
        category: category as any,
        startingRate: {
          INR: parseFloat(rateINR) || 2000,
          USD: parseFloat(rateUSD) || 30,
        },
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        socials: {
          instagram,
          tiktok,
          youtube,
        },
      });

      // Update local storage representation
      if (user && typeof window !== 'undefined') {
        const updatedUser = {
          ...user,
          name,
        };
        localStorage.setItem('igigster_user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('auth-change'));
      }

      await loadDashboard();
      setSuccessMsg('Profile settings updated successfully!');
      setLoading(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to save profile. Please try again.');
      setLoading(false);
    }
  };

  const isLight = theme === 'light';
  const cardBg = 'var(--card-bg)';
  const borderColor = 'var(--border-color)';
  const primaryText = 'var(--primary-text)';
  const secondaryText = 'var(--secondary-text)';
  const mutedText = 'var(--muted-text)';
  const accentColor = '#EC4899';
  const shadowStyle = isLight ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none';

  if (!user) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>My Profile</h1>
          <span style={{ fontSize: '12px', color: secondaryText, marginTop: '4px', display: 'block' }}>
            Update your public profile, rates, skills, and connected socials.
          </span>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Navigation Sidebar Panel */}
        <div className="glass-panel" style={{ padding: '16px', borderRadius: '18px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { id: 'basic', label: 'Basic Account', icon: <User size={14} /> },
            { id: 'professional', label: 'Professional Setup', icon: <Sparkles size={14} /> },
            { id: 'socials', label: 'Social Networks', icon: <Globe size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: activeSubTab === tab.id ? 'rgba(236,72,153,0.08)' : 'transparent',
                color: activeSubTab === tab.id ? accentColor : primaryText,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Panel */}
        <form onSubmit={handleSave} className="glass-panel" style={{ padding: '32px', borderRadius: '24px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '12px', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.16)', color: '#10B981', fontSize: '13px' }}>
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '12px', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.16)', color: '#EF4444', fontSize: '13px' }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* BASIC TAB */}
          {activeSubTab === 'basic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: primaryText, margin: 0, borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>Basic Info</h3>
              
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={profile?.avatar || user.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"}
                    alt="avatar"
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accentColor}` }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: accentColor, borderRadius: '50%', padding: '6px', color: '#ffffff', cursor: 'pointer', display: 'flex' }}>
                    <Camera size={12} />
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: primaryText }}>Upload New Avatar</span>
                  <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '4px' }}>PNG, JPG or JPEG up to 2MB.</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Registered Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'var(--hover-bg)', color: mutedText, fontSize: '13px', cursor: 'not-allowed' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Professional Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. UGC Creator & Editor"
                    required
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Location / Region</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    required
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Short Biography</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell brand clients about yourself..."
                  rows={4}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px', resize: 'vertical' }}
                />
              </div>
            </div>
          )}

          {/* PROFESSIONAL TAB */}
          {activeSubTab === 'professional' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: primaryText, margin: 0, borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>Professional Rates & Tags</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Starting Rate (INR per video)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '10px', color: mutedText, fontSize: '13px' }}>₹</span>
                    <input
                      type="number"
                      value={rateINR}
                      onChange={(e) => setRateINR(e.target.value)}
                      required
                      style={{ padding: '10px 14px 10px 24px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px', width: '100%' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Starting Rate (USD per video)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '10px', color: mutedText, fontSize: '13px' }}>$</span>
                    <input
                      type="number"
                      value={rateUSD}
                      onChange={(e) => setRateUSD(e.target.value)}
                      required
                      style={{ padding: '10px 14px 10px 24px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px', width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Primary Creator Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: cardBg, color: primaryText, fontSize: '13px' }}
                  >
                    <option value="video_creator">Video Creator</option>
                    <option value="video_ad">UGC Ad Video Creator</option>
                    <option value="product_demo">Product Demo Specialist</option>
                    <option value="editor">Video Post-Production Editor</option>
                    <option value="motion_designer">Motion Designer</option>
                    <option value="ugc_creator">UGC Creator</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText }}>Skills Tags (comma separated)</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. Skin Care, Tech Reviews, Reels, Editing"
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SOCIALS TAB */}
          {activeSubTab === 'socials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: primaryText, margin: 0, borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>Connected Social Networks</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <InstagramIcon size={14} style={{ color: '#E1306C' }} />
                    <span>Instagram Handle URL</span>
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Globe size={14} style={{ color: '#00F2EA' }} />
                    <span>TikTok Handle URL</span>
                  </label>
                  <input
                    type="text"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    placeholder="https://tiktok.com/@yourhandle"
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: secondaryText, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <YoutubeIcon size={14} style={{ color: '#FF0000' }} />
                    <span>YouTube Channel URL</span>
                  </label>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="https://youtube.com/c/yourchannel"
                    style={{ padding: '10px 14px', borderRadius: '10px', border: `1px solid ${borderColor}`, backgroundColor: 'transparent', color: primaryText, fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: `1px solid ${borderColor}`, paddingTop: '16px', marginTop: '8px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: accentColor,
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 10px rgba(236,72,153,0.3)',
                transition: 'all 0.2s',
              }}
              className="save-btn"
            >
              {loading ? 'Saving Changes...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .save-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(236,72,153,0.4) !important;
        }
        .save-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

const InstagramIcon = ({ size, style }: { size: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size, style }: { size: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
