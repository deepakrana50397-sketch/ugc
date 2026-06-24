'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, logoutUser } from '@/lib/services';
import { User } from '@/types/common';
import {
  Home, LayoutDashboard, Users, Compass, Megaphone, FolderOpen, MessageSquare,
  BarChart2, Wallet, Bookmark, FileText, Image, Sparkles, PenTool,
  Calendar, Palette, Bell, Settings, Moon, Sun, HelpCircle, LogOut, PanelLeft, ChevronDown, ChevronUp,
  X, Maximize, Smile, Scissors, Film, Camera, Layers, Search, Pin,
  Star, Crown, CreditCard, Briefcase, Calculator, Activity
} from 'lucide-react';
import CurrencyToggle from '@/components/ui/CurrencyToggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Tools Modal States
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Image' | 'Video' | 'Audio' | 'Spaces' | 'Design' | '3D' | 'Flows' | 'Connections'>('Image');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    const activeUser = getCurrentUser();
    if (!activeUser) {
      router.push('/login');
    } else {
      setUser(activeUser);
      setLoading(false);
    }

    // Sync theme
    const savedTheme = localStorage.getItem('igigster_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const handleOpenModal = () => setIsToolsModalOpen(true);
    window.addEventListener('open-tools-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-tools-modal', handleOpenModal);
    };
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('igigster_theme', nextTheme);
    window.dispatchEvent(new Event('igigster-theme-change'));
  };

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
  };

  if (loading || !user) {
    const isLightLoader = mounted && theme === 'light';
    return (
      <div style={{ 
        backgroundColor: isLightLoader ? '#F8F8FA' : '#09090B', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: isLightLoader ? '#09090B' : '#ffffff', 
        fontFamily: 'var(--font-sans)' 
      }}>
        <span>Loading secure dashboard...</span>
      </div>
    );
  }

  // Generate sidebar items based on role
  const getNavLinks = () => {
    if (user.role === 'creator') {
      return [
        { href: '/creator/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
        { href: '/creator/gigs', label: 'Find Gigs', icon: <Users size={16} /> },
        { href: '/creator/applications', label: 'My Applications', icon: <FolderOpen size={16} /> },
        { href: '/creator/applications?view=my-projects', label: 'My Projects', icon: <Briefcase size={16} /> },
        { href: '/creator/dashboard?view=earnings', label: 'Earnings', icon: <Wallet size={16} /> },
        { href: '/creator/dashboard?view=payouts', label: 'Payouts', icon: <CreditCard size={16} /> },
        { href: '/creator/dashboard?view=messages', label: 'Messages', icon: <MessageSquare size={16} />, badge: 5 },
        { href: '/creator/dashboard?view=analytics', label: 'Analytics', icon: <BarChart2 size={16} /> },
        { href: '/creator/profile', label: 'Portfolio', icon: <Image size={16} /> },
        { href: '/creator/dashboard?view=reviews', label: 'Reviews', icon: <Star size={16} /> },
        { href: '/creator/dashboard?view=saved', label: 'Saved', icon: <Bookmark size={16} /> },
        { href: '/creator/applications?view=contracts', label: 'Contracts', icon: <FileText size={16} /> },
      ];
    } else if (user.role === 'brand') {
      return [
        { href: '/', label: 'Home', icon: <Home size={16} /> },
        { href: '/brand/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
        { href: '/brand/applicants', label: 'Find Talent', icon: <Users size={16} /> },
        { href: '/brand/applicants?view=agencies', label: 'Find Agencies', icon: <Compass size={16} /> },
        { href: '/brand/post-gig', label: 'Post a Campaign', icon: <PlusCircleIconWrapper size={16} /> },
        { href: '/brand/gigs', label: 'My Campaigns', icon: <FolderOpen size={16} /> },
        { href: '/brand/dashboard?view=messages', label: 'Messages', icon: <MessageSquare size={16} /> },
        { href: '/brand/dashboard?view=analytics', label: 'Analytics', icon: <BarChart2 size={16} /> },
        { href: '/brand/dashboard?view=payments', label: 'Payments', icon: <Wallet size={16} /> },
        { href: '/brand/dashboard?view=saved', label: 'Saved', icon: <Bookmark size={16} /> },
        { href: '/brand/dashboard?view=contracts', label: 'Contracts', icon: <FileText size={16} /> },
        { href: '/brand/dashboard?view=team', label: 'Team', icon: <Users size={16} /> },
        { href: '/brand/dashboard?view=content-library', label: 'Content Library', icon: <Image size={16} /> },
      ];
    } else {
      return [
        { href: '/', label: 'Home', icon: <Home size={16} /> },
        { href: '/admin/dashboard', label: 'Platform Metrics', icon: <LayoutDashboard size={16} /> },
        { href: '/admin/gigs', label: 'Gig Vetting Queue', icon: <FolderOpen size={16} /> },
        { href: '/admin/users', label: 'Users Manager', icon: <Users size={16} /> },
        { href: '/admin/applications', label: 'All Applications', icon: <FolderOpen size={16} /> },
      ];
    }
  };

  const getToolLinks = () => {
    if (user.role === 'creator') {
      return [
        { href: '/creator/profile', label: 'Profile Strength', icon: <Activity size={16} />, badge: '85%' },
        { href: '/creator/gigs?view=brief-match', label: 'AI Content Assistant', icon: <Sparkles size={16} /> },
        { href: '/creator/profile?view=pitch-builder', label: 'Rate Calculator', icon: <Calculator size={16} /> },
        { href: '/creator/dashboard?view=content-planner', label: 'Brand Collaboration', icon: <Users size={16} /> },
      ];
    } else if (user.role === 'brand') {
      return [
        { href: '/brand/applicants?view=talent-match', label: 'Talent Match', icon: <Users size={16} /> },
        { href: '/brand/post-gig?view=brief-ai', label: 'Campaign Brief AI', icon: <Sparkles size={16} /> },
        { href: '/brand/dashboard?view=content-planner', label: 'Content Planner', icon: <Calendar size={16} /> },
        { href: '/brand/dashboard?view=brand-kit', label: 'Brand Kit', icon: <Palette size={16} /> },
        { href: '/brand/dashboard?view=reports', label: 'Reports', icon: <FileText size={16} /> },
      ];
    }
    return [];
  };

  const menuItems = getNavLinks();
  const toolItems = getToolLinks();

  const getCreateHref = () => {
    if (user.role === 'brand') return '/brand/post-gig';
    if (user.role === 'creator') return '/creator/gigs';
    return '/admin/dashboard';
  };
  const createHref = getCreateHref();

  return (
    <div
      className={theme === 'light' ? 'light-theme' : 'dark-theme'}
      style={{
        backgroundColor: theme === 'light' ? '#F8F8FA' : '#09090B',
        color: theme === 'light' ? '#09090B' : '#FFFFFF',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        fontFamily: 'var(--font-sans)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >

      {/* Left Sidebar Menu */}
      <Suspense fallback={
        <div style={{
          borderRight: theme === 'light' ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.08)',
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#0F0F11',
          width: isSidebarCollapsed ? '80px' : '224px',
          minWidth: isSidebarCollapsed ? '80px' : '224px',
          height: '100vh'
        }} />
      }>
        <SidebarNav
          theme={theme}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          user={user}
          createHref={createHref}
          toggleTheme={toggleTheme}
          handleLogout={handleLogout}
          menuItems={menuItems}
          toolItems={toolItems}
        />
      </Suspense>

      {/* Right Column: Header + Content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden', backgroundColor: theme === 'light' ? '#F8F8FA' : '#09090B', transition: 'all 0.3s' }}>
        {/* Top Header */}
        <header
          style={{
            borderBottom: 'none',
            backgroundColor: theme === 'light' ? '#F8F8FA' : '#09090B',
            height: '72px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            transition: 'all 0.3s'
          }}
        >
          {/* Left: Spacer to center the announcement banner */}
          <div style={{ flex: 1 }} className="desktop-only" />

          {/* Center: Announcement Banner */}
          {showAnnouncement && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#131316',
                border: `1px solid ${theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'}`,
                padding: '6px 14px',
                borderRadius: '12px',
                fontSize: '12.5px',
                color: theme === 'light' ? '#374151' : '#E4E4E7',
                boxShadow: theme === 'light' ? '0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.01)' : 'none',
                margin: '0 auto',
                transition: 'all 0.3s ease'
              }}
              className="desktop-only"
            >
              <span style={{
                backgroundColor: theme === 'light' ? '#FDF2F8' : 'rgba(236,72,153,0.15)',
                color: '#EC4899',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}>
                NEW
              </span>
              <span style={{ fontWeight: 500, color: theme === 'light' ? '#4B5563' : '#D4D4D8' }}>
                Hire creators, teams or let igigster manage your campaign
              </span>
              <Link
                href="/how-it-works"
                style={{
                  backgroundColor: theme === 'light' ? '#FFFFFF' : '#1C1C1F',
                  border: `1px solid ${theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}`,
                  color: theme === 'light' ? '#111827' : '#FFFFFF',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '11px',
                  textDecoration: 'none',
                  marginLeft: '4px',
                  boxShadow: theme === 'light' ? '0 1px 2px rgba(0,0,0,0.03)' : 'none',
                  transition: 'all 0.2s'
                }}
                className="hover-white-bg"
              >
                Explore options
              </Link>
              <button
                onClick={() => setShowAnnouncement(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px',
                  marginLeft: '4px',
                  transition: 'color 0.2s'
                }}
                className="hover-white-icon"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Right Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto', flex: 1, justifyContent: 'flex-end' }}>
            <Link href="/pricing" style={{ color: '#EC4899', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginRight: '6px' }} className="hover-underline">
              Need help?
            </Link>

            {/* Message button (Chat square) */}
            <button
              style={{
                background: theme === 'light' ? '#FFFFFF' : '#131316',
                border: `1px solid ${theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}`,
                color: theme === 'light' ? '#374151' : '#E4E4E7',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                transition: 'all 0.2s'
              }}
              className="hover-bg-white-002"
            >
              <MessageSquare size={17} />
            </button>

            {/* Bell button */}
            <button
              style={{
                background: theme === 'light' ? '#FFFFFF' : '#131316',
                border: `1px solid ${theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}`,
                color: theme === 'light' ? '#374151' : '#E4E4E7',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                position: 'relative',
                transition: 'all 0.2s'
              }}
              className="hover-bg-white-002"
            >
              <Bell size={17} />
            </button>

            {/* Pink circular text avatar */}
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#EC4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '14px',
              fontFamily: 'var(--font-sans)',
              flexShrink: 0
            }}>
              {user.role === 'brand' ? 'B' : user.role === 'creator' ? 'C' : 'A'}
            </div>
          </div>
        </header>

        {/* Content Box */}
        <main data-lenis-prevent style={{ padding: '12px 24px 24px 24px', backgroundColor: theme === 'light' ? '#F8F8FA' : '#09090B', flex: 1, overflowY: 'auto', transition: 'all 0.3s' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {children}
          </div>
        </main>

        {/* Tools Modal (Dialog) */}
        {isToolsModalOpen && (
          <div 
            onClick={() => setIsToolsModalOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
             <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '24px 32px',
                width: '90%',
                maxWidth: '860px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-text)', margin: 0 }}>Create new</h2>
                <button 
                  onClick={() => setIsToolsModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--secondary-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                  className="hover-white-icon"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs and Search Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '4px', gap: '16px', flexWrap: 'wrap' }}>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', flex: 1, paddingBottom: '4px' }} className="inner-scroller">
                  {Object.keys(modalTools).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '999px',
                          fontSize: '13px',
                          fontWeight: isActive ? 600 : 500,
                          backgroundColor: isActive 
                            ? (theme === 'light' ? '#E4E4E7' : '#27272A')
                            : 'transparent',
                          color: isActive 
                            ? 'var(--primary-text)'
                            : 'var(--secondary-text)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap'
                        }}
                        className={!isActive ? "hover-bg-white-002" : ""}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', width: '240px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary-text)' }} />
                  <input 
                    type="text" 
                    placeholder="Search for tools and flows" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      height: '34px',
                      borderRadius: '999px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: theme === 'light' ? '#FFFFFF' : '#131316',
                      paddingLeft: '34px',
                      paddingRight: '12px',
                      fontSize: '12.5px',
                      color: 'var(--primary-text)',
                      outline: 'none',
                      boxShadow: theme === 'light' ? '0 1px 2px rgba(0,0,0,0.02)' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Grid Content */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '16px 24px', 
                  minHeight: '260px',
                  maxHeight: '380px',
                  overflowY: 'auto',
                  padding: '4px 0' 
                }}
                className="inner-scroller"
              >
                {(() => {
                  const currentTabTools = modalTools[activeTab] || [];
                  const filteredTools = currentTabTools.filter(tool => 
                    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  
                  return (
                    <>
                      {filteredTools.map((tool) => (
                        <div 
                          key={tool.name}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: '12px', 
                            padding: '8px', 
                            borderRadius: '12px', 
                            cursor: 'pointer',
                            position: 'relative'
                          }}
                          className="hover-bg-white-002-bg"
                        >
                          {/* Icon Box */}
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: theme === 'light' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(99, 102, 241, 0.15)',
                            color: theme === 'light' ? '#4F46E5' : '#818CF8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {tool.icon}
                          </div>

                          {/* Texts */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, paddingRight: tool.pinned ? '16px' : '0' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-text)' }}>{tool.name}</span>
                            <span style={{ fontSize: '11px', color: 'var(--secondary-text)', lineHeight: '1.3' }}>{tool.desc}</span>
                          </div>

                          {/* Pin Icon */}
                          {tool.pinned && (
                            <Pin 
                              size={12} 
                              style={{ 
                                position: 'absolute', 
                                right: '8px', 
                                top: '12px', 
                                color: 'var(--secondary-text)', 
                                transform: 'rotate(45deg)' 
                              }} 
                            />
                          )}
                        </div>
                      ))}
                      {filteredTools.length === 0 && (
                        <div style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--secondary-text)', fontSize: '13px' }}>
                          No tools found for "{searchQuery}"
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* Global theme resets inside dashboard */
        .dark-theme {
          --card-bg: #131316;
          --border-color: rgba(255,255,255,0.08);
          --primary-text: #FFFFFF;
          --secondary-text: #A1A1AA;
          --muted-text: #71717A;
          --accent-pink-glow: rgba(236,72,153,0.12);
          --hover-bg: #18181B;
          --shadow-style: none;
          --progress-track-bg: rgba(255,255,255,0.05);
          --shortcut-bg: #131316;
          --shortcut-border: rgba(255,255,255,0.08);
          --human-banner-border: rgba(236, 72, 153, 0.12);
          --human-banner-bg: rgba(236, 72, 153, 0.05);
          --human-banner-sub-border: rgba(236, 72, 153, 0.15);
          --human-banner-sub-bg: rgba(236, 72, 153, 0.1);
          --avatar-border: #131316;
        }
        .light-theme {
          background-color: #F8F8FA !important;
          color: #09090B !important;
          --card-bg: #FFFFFF;
          --border-color: #E5E7EB;
          --primary-text: #09090B;
          --secondary-text: #52525B;
          --muted-text: #71717A;
          --accent-pink-glow: rgba(236,72,153,0.2);
          --hover-bg: #F3F4F6;
          --shadow-style: 0 1px 2px rgba(0,0,0,.04);
          --progress-track-bg: rgba(0,0,0,0.03);
          --shortcut-bg: #FFFFFF;
          --shortcut-border: rgba(0,0,0,0.06);
          --human-banner-border: rgba(236, 72, 153, 0.2);
          --human-banner-bg: #FDF2F8;
          --human-banner-sub-border: #FCE7F3;
          --human-banner-sub-bg: #FDF2F8;
          --avatar-border: #ffffff;
        }
        .light-theme main {
          background-color: #F8F8FA !important;
        }
        .light-theme aside {
          background-color: #FFFFFF !important;
          border-right: 1px solid #E5E7EB !important;
        }
        .light-theme header {
          background-color: #F8F8FA !important;
          border-bottom: none !important;
        }
        .light-theme .glass-panel {
          background: #FFFFFF !important;
          background-color: #FFFFFF !important;
          border: 1px solid #E5E7EB !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
          color: #09090B !important;
        }
        .light-theme h1,
        .light-theme h2,
        .light-theme h3,
        .light-theme h4,
        .light-theme h5,
        .light-theme h6 {
          color: #09090B !important;
        }
        .light-theme [style*="color: rgb(15, 23, 42)"],
        .light-theme [style*="color:#0f172a"],
        .light-theme [style*="color: #0f172a"] {
          color: #09090B !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .hover-bg-white-002-bg:hover {
          background-color: rgba(255, 255, 255, 0.04) !important;
        }
        .light-theme .hover-bg-white-002-bg:hover {
          background-color: #F4F4F5 !important;
        }

        .hover-bg-white-002:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
          color: #EC4899 !important;
        }
        .light-theme .hover-bg-white-002:hover {
          background-color: #F3F4F6 !important;
          color: #09090B !important;
        }
        .sidebar-bottom-icon:hover {
          color: #EC4899 !important;
          transform: translateY(-1px);
        }
        .hover-white-icon:hover {
          color: #EC4899 !important;
        }
        
        /* Hide scrollbars for the sidebar scroller */
        .inner-scroller::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .inner-scroller {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}

interface SidebarNavProps {
  theme: 'dark' | 'light';
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  user: User;
  createHref: string;
  toggleTheme: () => void;
  handleLogout: () => void;
  menuItems: Array<{ href: string; label: string; icon: React.ReactNode; badge?: string | number }>;
  toolItems: Array<{ href: string; label: string; icon: React.ReactNode; badge?: string | number }>;
}

function SidebarNav({
  theme,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  user,
  createHref,
  toggleTheme,
  handleLogout,
  menuItems,
  toolItems,
}: SidebarNavProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isUtilityExpanded, setIsUtilityExpanded] = useState(false);

  const checkActive = (href: string) => {
    const [path, query] = href.split('?');
    if (pathname !== path) return false;

    if (!query) {
      return !searchParams.get('view');
    }

    const urlParams = new URLSearchParams(query);
    const targetView = urlParams.get('view');
    return searchParams.get('view') === targetView;
  };

  return (
    <aside
      style={{
        borderRight: theme === 'light' ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.08)',
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#0F0F11',
        padding: isSidebarCollapsed ? '24px 8px 16px 8px' : '24px 16px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: isSidebarCollapsed ? '80px' : '224px',
        minWidth: isSidebarCollapsed ? '80px' : '224px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`dashboard-sidebar-menu ${isSidebarCollapsed ? 'collapsed' : ''}`}
    >
      {/* Sidebar Header with Logo and Collapse Toggle */}
      <div style={{
        display: 'flex',
        flexDirection: isSidebarCollapsed ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
        marginBottom: '20px',
        gap: isSidebarCollapsed ? '12px' : '0',
        padding: isSidebarCollapsed ? '0' : '0 8px'
      }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <CustomLogoIcon />
          {!isSidebarCollapsed && (
            <span style={{
              color: theme === 'light' ? '#09090B' : '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '22px',
              letterSpacing: '-0.04em',
              textTransform: 'lowercase'
            }}>
              igigster
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          style={{
            background: 'none',
            border: `1px solid ${theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.08)'}`,
            color: '#71717A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '6px',
            borderRadius: '8px',
            transition: 'all 0.2s',
            marginTop: isSidebarCollapsed ? '4px' : '0'
          }}
          className="hover-bg-white-002"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft size={18} />
        </button>
      </div>

      {/* Create Button (Pink Capsule) */}
      <Link
        href={createHref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isSidebarCollapsed ? '0' : '8px',
          width: isSidebarCollapsed ? '40px' : '100%',
          height: isSidebarCollapsed ? '40px' : '44px',
          borderRadius: isSidebarCollapsed ? '50%' : '12px',
          backgroundColor: '#EC4899',
          color: '#ffffff',
          border: 'none',
          fontWeight: 700,
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '20px',
          textAlign: 'center',
          textDecoration: 'none',
          margin: isSidebarCollapsed ? '0 auto 20px auto' : '0 0 20px 0',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="glow-button"
        title="Create new"
      >
        <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span>
        {!isSidebarCollapsed && <span>{user.role === 'creator' ? 'Find Work' : 'Create'}</span>}
      </Link>

      {/* Scrollable Navigation Area */}
      <div
        data-lenis-prevent
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          margin: '0 -4px',
          padding: '0 4px'
        }}
        className="inner-scroller"
      >
        {/* Nav Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const isActive = checkActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                  gap: isSidebarCollapsed ? '0' : '10px',
                  padding: isSidebarCollapsed ? '10px' : '2.4px 12px',
                  borderRadius: '12px',
                  width: isSidebarCollapsed ? '40px' : '100%',
                  height: isSidebarCollapsed ? '40px' : 'auto',
                  margin: isSidebarCollapsed ? '0 auto' : '0',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive
                    ? (theme === 'light' ? 'rgba(236, 72, 153, 0.08)' : 'rgba(236, 72, 153, 0.15)')
                    : 'transparent',
                  color: isActive
                    ? '#EC4899'
                    : (theme === 'light' ? '#09090B' : '#A1A1AA'),
                  transition: 'all 0.15s',
                }}
                className={!isActive ? 'hover-bg-white-002' : ''}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span style={{
                  color: isActive
                    ? '#EC4899'
                    : (theme === 'light' ? '#09090B' : '#71717A'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </span>
                 {!isSidebarCollapsed && <span>{item.label}</span>}
                {item.badge && !isSidebarCollapsed && (
                  <span style={{
                    marginLeft: 'auto',
                    backgroundColor: typeof item.badge === 'number' ? '#EC4899' : 'rgba(236, 72, 153, 0.08)',
                    color: typeof item.badge === 'number' ? '#FFFFFF' : '#EC4899',
                    border: typeof item.badge === 'number' ? 'none' : '1px solid rgba(236, 72, 153, 0.25)',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: typeof item.badge === 'number' ? '0' : '2px 8px',
                    width: typeof item.badge === 'number' ? '18px' : 'auto',
                    height: typeof item.badge === 'number' ? '18px' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Tools Section */}
        {toolItems.length > 0 && (
          <>
            <div style={{ borderTop: theme === 'light' ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.08)', margin: '12px 0' }} />

            {!isSidebarCollapsed && (
              <span 
                onClick={() => window.dispatchEvent(new Event('open-tools-modal'))}
                style={{ fontSize: '10px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 12px', marginBottom: '8px', display: 'block', cursor: 'pointer' }}
                className="hover-underline"
              >
                Tools
              </span>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {toolItems.map((item) => {
                const isActive = checkActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                      gap: isSidebarCollapsed ? '0' : '10px',
                      padding: isSidebarCollapsed ? '10px' : '2.4px 12px',
                      borderRadius: '12px',
                      width: isSidebarCollapsed ? '40px' : '100%',
                      height: isSidebarCollapsed ? '40px' : 'auto',
                      margin: isSidebarCollapsed ? '0 auto' : '0',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      backgroundColor: isActive
                        ? (theme === 'light' ? 'rgba(236, 72, 153, 0.08)' : 'rgba(236, 72, 153, 0.15)')
                        : 'transparent',
                      color: isActive
                        ? '#EC4899'
                        : (theme === 'light' ? '#09090B' : '#A1A1AA'),
                      transition: 'all 0.15s',
                    }}
                    className={!isActive ? 'hover-bg-white-002' : ''}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <span style={{
                      color: isActive
                        ? '#EC4899'
                        : (theme === 'light' ? '#09090B' : '#71717A'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.icon}
                    </span>
                     {!isSidebarCollapsed && <span>{item.label}</span>}
                    {item.badge && !isSidebarCollapsed && (
                      <span style={{
                        marginLeft: 'auto',
                        backgroundColor: typeof item.badge === 'number' ? '#EC4899' : 'rgba(236, 72, 153, 0.08)',
                        color: typeof item.badge === 'number' ? '#FFFFFF' : '#EC4899',
                        border: typeof item.badge === 'number' ? 'none' : '1px solid rgba(236, 72, 153, 0.25)',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: typeof item.badge === 'number' ? '0' : '2px 8px',
                        width: typeof item.badge === 'number' ? '18px' : 'auto',
                        height: typeof item.badge === 'number' ? '18px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Creator Pro Card */}
        {!isSidebarCollapsed && user.role === 'creator' && (
          <div style={{
            margin: '16px 8px 8px 8px',
            padding: '16px',
            borderRadius: '16px',
            border: `1px solid ${theme === 'light' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255,255,255,0.06)'}`,
            backgroundColor: theme === 'light' ? 'rgba(236, 72, 153, 0.02)' : 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: 'var(--shadow-style)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: theme === 'light' ? '#09090B' : '#FFFFFF' }}>Creator Pro</span>
              <Crown size={15} style={{ color: '#F59E0B' }} fill="#F59E0B" />
            </div>
            <p style={{ fontSize: '10.5px', color: theme === 'light' ? '#52525B' : '#A1A1AA', margin: 0, lineHeight: '1.4' }}>
              Unlock more gigs, boost visibility & earn more.
            </p>
            <button style={{
              width: '100%',
              height: '32px',
              border: 'none',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '4px',
              transition: 'opacity 0.2s'
            }} className="upgrade-now-btn">
              Upgrade Now
            </button>
          </div>
        )}
      </div>

      {/* Bottom Sidebar Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: theme === 'light' ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', marginTop: 'auto' }}>
        {/* Collapsible Utility Header / Toggle */}
        {!isSidebarCollapsed && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Settings & Help
            </span>
            <button
              onClick={() => setIsUtilityExpanded(!isUtilityExpanded)}
              style={{
                background: 'none',
                border: 'none',
                color: '#71717A',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: 'color 0.2s'
              }}
              className="hover-white-icon"
              title={isUtilityExpanded ? "Collapse settings" : "Expand settings"}
            >
              {isUtilityExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        )}

        {/* Utility icons row */}
        {!isSidebarCollapsed && isUtilityExpanded && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#71717A',
              padding: '0 12px',
            }}
          >
            <div title="Notifications" className="sidebar-bottom-icon" style={{ position: 'relative', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: '#EC4899',
                color: '#ffffff',
                borderRadius: '50%',
                fontSize: '9px',
                fontWeight: 700,
                padding: '2px 4px',
                lineHeight: '1',
                minWidth: '14px',
                textAlign: 'center'
              }}>12</span>
            </div>
            <div title="Settings" className="sidebar-bottom-icon" style={{ cursor: 'pointer', transition: 'all 0.2s' }}>
              <Settings size={18} />
            </div>
            <div
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="sidebar-bottom-icon"
              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div title="Help" className="sidebar-bottom-icon" style={{ cursor: 'pointer', transition: 'all 0.2s' }}>
              <HelpCircleIconWrapper />
            </div>
          </div>
        )}

        {/* Separator line */}
        {!isSidebarCollapsed && isUtilityExpanded && <div style={{ borderTop: theme === 'light' ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.08)' }} />}

        {/* Profile Widget */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
            padding: isSidebarCollapsed ? '4px 0' : '4px 8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            width: '100%'
          }}
          className="hover-bg-white-002"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#EC4899',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'var(--font-sans)',
              flexShrink: 0
            }}>
              {user.role === 'brand' ? 'B' : user.role === 'creator' ? 'C' : 'A'}
            </div>
            {!isSidebarCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: theme === 'light' ? '#09090B' : '#FFFFFF', lineHeight: '1.2' }}>
                  {user.role === 'brand' ? 'Brand Account' : 'Creator Account'}
                </span>
                <span style={{ fontSize: '11px', color: '#71717A', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                  {user.role === 'brand' ? 'Growth Labs' : user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

// Wrapper to prevent name clash or verify Lucide icon naming
function PlusCircleIconWrapper({ size = 16 }: { size?: number }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Megaphone size={size} />
    </span>
  );
}

function HelpCircleIconWrapper() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <HelpCircle size={18} />
    </span>
  );
}

function CustomLogoIcon() {
  return (
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      backgroundColor: '#EC4899',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 800,
      fontSize: '15px',
      fontFamily: 'var(--font-sans)',
      flexShrink: 0
    }}>
      iG
    </div>
  );
}

interface ToolItem {
  name: string;
  desc: string;
  icon: React.ReactNode;
  pinned: boolean;
}

const modalTools: Record<string, ToolItem[]> = {
  Image: [
    { name: 'Image Generator', desc: 'Create images from text prompts', icon: <Sparkles size={16} />, pinned: true },
    { name: 'Assistant', desc: 'Chat, create, and edit with AI', icon: <MessageSquare size={16} />, pinned: true },
    { name: 'Image Editor', desc: 'Edit and modify existing images', icon: <PenTool size={16} />, pinned: false },
    { name: 'Image Upscaler', desc: 'Enhance resolution and detail', icon: <Maximize size={16} />, pinned: false },
    { name: 'Cinematic Shot', desc: 'Generate cinematic compositions', icon: <Film size={16} />, pinned: false },
    { name: 'Variations', desc: 'Create variations of an image', icon: <Layers size={16} />, pinned: false },
    { name: 'Skin Enhancer', desc: 'Retouch and enhance skin details', icon: <Smile size={16} />, pinned: false },
    { name: 'Change Camera', desc: 'Adjust camera angle and lens', icon: <Camera size={16} />, pinned: false },
    { name: 'Mockup Generator', desc: 'Place designs on product mockups', icon: <LayoutDashboard size={16} />, pinned: false },
    { name: 'Remove Background', desc: 'Isolate subjects from backgrounds', icon: <Scissors size={16} />, pinned: false },
    { name: 'Relight', desc: 'Change lighting and atmosphere', icon: <Sun size={16} />, pinned: false },
  ],
  Video: [
    { name: 'Video Generator', desc: 'Create videos from text prompts', icon: <Film size={16} />, pinned: true },
    { name: 'Video Editor', desc: 'Trim, merge, and edit raw footage', icon: <PenTool size={16} />, pinned: false },
    { name: 'Auto Subtitles', desc: 'Add AI captions to your videos', icon: <FileText size={16} />, pinned: false },
  ],
  Audio: [
    { name: 'Voiceover AI', desc: 'Synthesize natural voiceovers', icon: <MessageSquare size={16} />, pinned: false },
    { name: 'Sound FX Generator', desc: 'Generate custom audio effects', icon: <Sparkles size={16} />, pinned: false },
  ],
  Spaces: [
    { name: 'Virtual Studio', desc: 'Collaborative real-time canvas', icon: <LayoutDashboard size={16} />, pinned: false },
  ],
  Design: [
    { name: 'Brand Kit Creator', desc: 'Export consistent color assets', icon: <Palette size={16} />, pinned: false },
  ],
  '3D': [
    { name: '3D Asset Renderer', desc: 'Convert concepts into 3D models', icon: <Layers size={16} />, pinned: false },
  ],
  Flows: [
    { name: 'Campaign Brief Workflow', desc: 'Generate end-to-end briefs', icon: <Megaphone size={16} />, pinned: false },
  ],
  Connections: [
    { name: 'Social Publisher', desc: 'Connect channels for scheduling', icon: <Home size={16} />, pinned: false },
  ]
};
