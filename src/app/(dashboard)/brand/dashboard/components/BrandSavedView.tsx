'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bookmark, BookmarkCheck, Search, ChevronDown, Trash2, ExternalLink, 
  Sparkles, Plus, Play, Video, FileText, CheckCircle2, ArrowUpRight, 
  MapPin, Heart, PlusCircle, AlertCircle, X, AlignLeft, Info, MessageSquare, Copy, Star
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

interface SavedViewProps {
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

interface SavedCreator {
  id: string;
  name: string;
  title: string;
  rating: number;
  completedJobs: number;
  avgRateINR: number;
  avgRateUSD: number;
  avatar: string;
  location: string;
  category: string;
  skills: string[];
}

interface SavedInspiration {
  id: string;
  title: string;
  category: string;
  platform: string;
  content: string;
  note?: string;
  savedAt: string;
  iconType?: string;
}

const INITIAL_SAVED_CREATORS: SavedCreator[] = [
  {
    id: 'saved-creator-1',
    name: 'Ananya Sharma',
    title: 'Beauty & Lifestyle UGC Creator',
    rating: 5.0,
    completedJobs: 12,
    avgRateINR: 20000,
    avgRateUSD: 250,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    location: 'Delhi, India',
    category: 'ugc_creator',
    skills: ['Skincare Reels', 'Makeup Reviews', 'Aesthetic Cinematography']
  },
  {
    id: 'saved-creator-2',
    name: 'Rahul Verma',
    title: 'Tech Reviewer & Video Editor',
    rating: 4.8,
    completedJobs: 24,
    avgRateINR: 12000,
    avgRateUSD: 150,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    location: 'Mumbai, India',
    category: 'editor',
    skills: ['CapCut Editing', 'Hormozi Captions', 'Color Grading']
  },
  {
    id: 'saved-creator-3',
    name: 'Priya Nair',
    title: 'Fashion Try-on & Lifestyle Influencer',
    rating: 4.9,
    completedJobs: 18,
    avgRateINR: 16000,
    avgRateUSD: 200,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    location: 'Bangalore, India',
    category: 'ugc_creator',
    skills: ['Summer Try-on', 'Transition Edits', 'Styling ASMR']
  }
];

const DEFAULT_SAVED_INSPIRATIONS: SavedInspiration[] = [
  {
    id: 'saved-insp-1',
    title: '3-Second Hook: The Pattern Interrupt',
    category: 'Video Hook',
    platform: 'TikTok/Reels',
    content: 'Start with a fast zoom and say: "Don\'t buy this product unless you want..." followed by a visual shock. Perfect for cosmetics or tech items.',
    note: 'Use for the upcoming Glow & Co. campaign.',
    savedAt: '2 days ago',
    iconType: 'hook'
  },
  {
    id: 'saved-insp-2',
    title: 'Water Splash Transition Concept',
    category: 'Transition',
    platform: 'Instagram Reels',
    content: 'Flick water drops onto the camera lens, then cut/wipe to a clean, macro shot of the product with slow-motion background lighting.',
    note: 'Test this with Mamaearth product review.',
    savedAt: '5 days ago',
    iconType: 'transition'
  }
];

export default function BrandSavedView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: SavedViewProps) {
  const { currency } = useCurrency();
  const isINR = currency === 'INR';

  const [activeTab, setActiveTab] = useState<'all' | 'creators' | 'ideas'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'name'>('recent');

  const [savedCreators, setSavedCreators] = useState<SavedCreator[]>(INITIAL_SAVED_CREATORS);
  const [savedInspirations, setSavedInspirations] = useState<SavedInspiration[]>(DEFAULT_SAVED_INSPIRATIONS);

  // Modals state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInspTitle, setNewInspTitle] = useState('');
  const [newInspCategory, setNewInspCategory] = useState('Video Hook');
  const [newInspPlatform, setNewInspPlatform] = useState('Instagram Reels');
  const [newInspContent, setNewInspContent] = useState('');
  const [newInspNote, setNewInspNote] = useState('');

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Load inspirations from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('igigster_saved_inspirations');
      if (stored) {
        try {
          setSavedInspirations(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      } else {
        localStorage.setItem('igigster_saved_inspirations', JSON.stringify(DEFAULT_SAVED_INSPIRATIONS));
      }

      const handleUpdate = () => {
        const updated = localStorage.getItem('igigster_saved_inspirations');
        if (updated) {
          try {
            setSavedInspirations(JSON.parse(updated));
          } catch (e) {
            console.error(e);
          }
        }
      };
      window.addEventListener('saved-inspirations-updated', handleUpdate);
      return () => {
        window.removeEventListener('saved-inspirations-updated', handleUpdate);
      };
    }
  }, []);

  const saveInspirations = (list: SavedInspiration[]) => {
    setSavedInspirations(list);
    if (typeof window !== 'undefined') {
      localStorage.setItem('igigster_saved_inspirations', JSON.stringify(list));
      window.dispatchEvent(new Event('saved-inspirations-updated'));
    }
  };

  // Action: Unsave creator
  const handleUnsaveCreator = (id: string) => {
    const creator = savedCreators.find(c => c.id === id);
    if (creator) {
      setSavedCreators(prev => prev.filter(c => c.id !== id));
      triggerToast(`Removed "${creator.name}" from shortlisted creators.`);
    }
  };

  // Action: Unsave idea
  const handleUnsaveInspiration = (id: string) => {
    const idea = savedInspirations.find(i => i.id === id);
    if (idea) {
      const updated = savedInspirations.filter(i => i.id !== id);
      saveInspirations(updated);
      triggerToast(`Removed "${idea.title}" from saved ideas.`);
    }
  };

  // Action: Add custom idea
  const handleAddInspirationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInspTitle || !newInspContent) return;

    const newIdea: SavedInspiration = {
      id: `saved-insp-${Date.now()}`,
      title: newInspTitle,
      category: newInspCategory,
      platform: newInspPlatform,
      content: newInspContent,
      note: newInspNote || undefined,
      savedAt: 'Just now',
      iconType: 'custom'
    };

    const updated = [newIdea, ...savedInspirations];
    saveInspirations(updated);

    // Reset inputs
    setNewInspTitle('');
    setNewInspContent('');
    setNewInspNote('');
    setShowAddForm(false);
    triggerToast(`Added custom idea: "${newIdea.title}"`);
  };

  // Action: Copy Text to clipboard
  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast('Copied content text to clipboard!');
  };

  // Filter & Sorting Logic
  const getFilteredCreators = () => {
    let result = savedCreators.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  };

  const getFilteredIdeas = () => {
    let result = savedInspirations.filter(i =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  };

  const filteredCreators = getFilteredCreators();
  const filteredIdeas = getFilteredIdeas();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
            Saved Items
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Manage your shortlisted creators and campaign content ideas.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: accentColor,
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
            transition: 'all 0.2s'
          }}
          className="glow-button-saved"
        >
          <Plus size={16} />
          <span>New Creative Idea</span>
        </button>
      </div>

      {/* Search and Sort controls */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '20px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '4px' }}>
          {[
            { id: 'all', label: 'All Saved' },
            { id: 'creators', label: 'Saved Creators' },
            { id: 'ideas', label: 'Creative Ideas' }
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
                  transition: 'color 0.2s'
                }}
              >
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

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved items..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 30px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: primaryText,
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Sort selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: secondaryText }}>
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: primaryText,
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="recent">Recently Saved</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

      </div>

      {/* Grid Content mapping */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Section 1: Saved Shortlisted Creators */}
        {(activeTab === 'all' || activeTab === 'creators') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeTab === 'all' && filteredCreators.length > 0 && (
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: primaryText, margin: '0 0 4px' }}>Shortlisted Creators</h3>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {filteredCreators.map(creator => (
                <div
                  key={creator.id}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: shadowStyle,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    position: 'relative'
                  }}
                  className="saved-creator-card"
                >
                  {/* Top line profile detail */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={creator.avatar} alt={creator.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 750, color: primaryText, margin: 0 }}>{creator.name}</h4>
                      <span style={{ fontSize: '12px', color: secondaryText, display: 'block', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {creator.title}
                      </span>
                    </div>
                  </div>

                  {/* Specific statistics row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    gap: '4px',
                    padding: '10px 4px',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)',
                    fontSize: '11px'
                  }}>
                    <div style={{ textAlign: 'center', borderRight: `1px solid ${borderColor}` }}>
                      <span style={{ color: mutedText, display: 'block' }}>Rating</span>
                      <span style={{ color: primaryText, fontWeight: 750, display: 'block', marginTop: '2px' }}>⭐ {creator.rating} ({creator.completedJobs})</span>
                    </div>
                    <div style={{ textAlign: 'center', borderRight: `1px solid ${borderColor}` }}>
                      <span style={{ color: mutedText, display: 'block' }}>Rate card</span>
                      <span style={{ color: primaryText, fontWeight: 750, display: 'block', marginTop: '2px' }}>
                        {isINR ? `₹${(creator.avgRateINR / 1000).toFixed(0)}k` : `$${creator.avgRateUSD}`}
                      </span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: mutedText, display: 'block' }}>Location</span>
                      <span style={{ color: primaryText, fontWeight: 750, display: 'block', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', padding: '0 2px' }}>
                        {creator.location.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Skills tags list */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {creator.skills.map((skill, idx) => (
                      <span key={idx} style={{
                        fontSize: '10.5px',
                        color: secondaryText,
                        backgroundColor: isLight ? '#F3F4F6' : '#1C1C1F',
                        border: `1px solid ${borderColor}`,
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: `1px solid ${borderColor}`, paddingTop: '14px', marginTop: '4px' }}>
                    <button
                      onClick={() => alert(`Initiating direct conversation with ${creator.name}...`)}
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        border: `1px solid ${borderColor}`,
                        color: primaryText,
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                      className="hover-white-bg"
                    >
                      <MessageSquare size={13} />
                      <span>Message</span>
                    </button>
                    
                    <button
                      onClick={() => alert(`Opening complete details profile of ${creator.name}...`)}
                      style={{
                        flex: 1,
                        backgroundColor: accentColor,
                        border: 'none',
                        color: '#FFFFFF',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                        boxShadow: '0 2px 6px rgba(236,72,153,0.15)',
                        transition: 'all 0.2s'
                      }}
                      className="glow-button-saved"
                    >
                      Hire Creator
                    </button>

                    <button
                      onClick={() => handleUnsaveCreator(creator.id)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                        color: '#EF4444',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
            
            {activeTab === 'creators' && filteredCreators.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <p style={{ color: mutedText, fontSize: '13.5px', margin: 0 }}>No shortlisted creators found.</p>
              </div>
            )}
          </div>
        )}

        {/* Section 2: Saved Campaign Creative Ideas */}
        {(activeTab === 'all' || activeTab === 'ideas') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: activeTab === 'all' ? '12px' : '0' }}>
            {activeTab === 'all' && filteredIdeas.length > 0 && (
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: primaryText, margin: '0 0 4px' }}>Saved Campaign Concepts & Ideas</h3>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {filteredIdeas.map(idea => (
                <div
                  key={idea.id}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '20px',
                    padding: '22px',
                    boxShadow: shadowStyle,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  className="saved-idea-card"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          backgroundColor: 'rgba(139, 92, 246, 0.08)',
                          color: '#8B5CF6',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {idea.category}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: isLight ? '#F3F4F6' : '#1C1C1F',
                          color: secondaryText,
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {idea.platform}
                        </span>
                      </div>
                      
                      <span style={{ fontSize: '10px', color: mutedText }}>{idea.savedAt}</span>
                    </div>

                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0, lineHeight: 1.3 }}>
                      {idea.title}
                    </h4>

                    <p style={{ fontSize: '12.5px', color: secondaryText, lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' }}>
                      {idea.content}
                    </p>

                    {idea.note && (
                      <div style={{
                        marginTop: '4px',
                        borderLeft: `2.5px solid ${accentColor}`,
                        paddingLeft: '10px',
                        fontSize: '11.5px',
                        color: secondaryText,
                        fontStyle: 'italic',
                        opacity: 0.9
                      }}>
                        <strong>Note:</strong> {idea.note}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', borderTop: `1px solid ${borderColor}`, paddingTop: '14px', marginTop: '4px' }}>
                    <button
                      onClick={() => handleCopyContent(idea.content)}
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        border: `1px solid ${borderColor}`,
                        color: primaryText,
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                      className="hover-white-bg"
                    >
                      <Copy size={13} />
                      <span>Copy Concept</span>
                    </button>

                    <button
                      onClick={() => handleUnsaveInspiration(idea.id)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                        color: '#EF4444',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {activeTab === 'ideas' && filteredIdeas.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <p style={{ color: mutedText, fontSize: '13.5px', margin: 0 }}>No saved campaign concepts found.</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* POPUP MODAL: Add Custom Concept */}
      {showAddForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          padding: '16px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 850, color: primaryText, margin: 0 }}>
                Save Campaign Brief Concept
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: mutedText,
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50%'
                }}
                className="hover-bg-white-002"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddInspirationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Concept Title</label>
                <input
                  type="text"
                  required
                  value={newInspTitle}
                  onChange={(e) => setNewInspTitle(e.target.value)}
                  placeholder="e.g. 3-Sec Intro Splash"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#F9FAFB' : '#141416',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Category</label>
                  <select
                    value={newInspCategory}
                    onChange={(e) => setNewInspCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : '#141416',
                      color: primaryText,
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Video Hook">Video Hook</option>
                    <option value="Transition">Transition</option>
                    <option value="Copy Template">Copy Template</option>
                    <option value="Trending Audio">Trending Audio</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Platform</label>
                  <select
                    value={newInspPlatform}
                    onChange={(e) => setNewInspPlatform(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : '#141416',
                      color: primaryText,
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Instagram Reels">Instagram Reels</option>
                    <option value="TikTok/Reels">TikTok/Reels</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Idea Content/Description</label>
                <textarea
                  required
                  rows={4}
                  value={newInspContent}
                  onChange={(e) => setNewInspContent(e.target.value)}
                  placeholder="Draft the creative flow, script, camera guidelines, or concept explanation here..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#F9FAFB' : '#141416',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Private Note (Optional)</label>
                <input
                  type="text"
                  value={newInspNote}
                  onChange={(e) => setNewInspNote(e.target.value)}
                  placeholder="e.g. Try this on Glow & Co. campaign next week"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#F9FAFB' : '#141416',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
                  transition: 'all 0.2s',
                  marginTop: '10px'
                }}
                className="glow-button-saved"
              >
                Save Concept
              </button>
            </form>
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
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '13px',
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
        .glow-button-saved:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3) !important;
        }
        .saved-creator-card:hover {
          border-color: rgba(236,72,153,0.3) !important;
        }
        .saved-idea-card:hover {
          border-color: rgba(139,92,246,0.3) !important;
        }
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
        .hover-bg-white-002:hover {
          background-color: var(--hover-bg) !important;
        }
        .hover-underline:hover {
          text-decoration: underline !important;
        }
      `}</style>

    </div>
  );
}
