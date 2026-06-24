'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, logoutUser } from '@/lib/services';
import { User } from '@/types/common';
import { 
  Home, LayoutDashboard, Users, Compass, Megaphone, FolderOpen, MessageSquare, 
  BarChart2, Wallet, Bookmark, FileText, Image, Sparkles, PenTool, 
  Calendar, Palette, Bell, Settings, Moon, Sun, HelpCircle, LogOut, PanelLeft, ChevronDown 
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
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
    return (
      <div style={{ backgroundColor: '#09090b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontFamily: 'var(--font-sans)' }}>
        <span>Loading secure dashboard...</span>
      </div>
    );
  }

  // Generate sidebar items based on role
  const getNavLinks = () => {
    if (user.role === 'creator') {
      return [
        { href: '/', label: 'Home', icon: <Home size={16} /> },
        { href: '/creator/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
        { href: '/creator/gigs', label: 'Find Gigs', icon: <Compass size={16} /> },
        { href: '/creator/applications', label: 'My Applications', icon: <Compass size={16} /> },
        { href: '/creator/gigs', label: 'Submit Pitch', icon: <Megaphone size={16} /> },
        { href: '/creator/applications', label: 'My Contracts', icon: <FolderOpen size={16} /> },
        { href: '/creator/dashboard', label: 'Messages', icon: <MessageSquare size={16} /> },
        { href: '/creator/dashboard', label: 'Analytics', icon: <BarChart2 size={16} /> },
        { href: '/creator/dashboard', label: 'Payments', icon: <Wallet size={16} /> },
        { href: '/creator/dashboard', label: 'Saved', icon: <Bookmark size={16} /> },
        { href: '/creator/applications', label: 'Contracts', icon: <FileText size={16} /> },
        { href: '/creator/dashboard', label: 'Team', icon: <Users size={16} /> },
        { href: '/creator/profile', label: 'Content Library', icon: <Image size={16} /> },
      ];
    } else if (user.role === 'brand') {
      return [
        { href: '/', label: 'Home', icon: <Home size={16} /> },
        { href: '/brand/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
        { href: '/brand/applicants', label: 'Find Talent', icon: <Users size={16} /> },
        { href: '/brand/applicants', label: 'Find Agencies', icon: <Compass size={16} /> },
        { href: '/brand/post-gig', label: 'Post a Campaign', icon: <PlusCircleIconWrapper /> },
        { href: '/brand/gigs', label: 'My Campaigns', icon: <FolderOpen size={16} /> },
        { href: '/brand/dashboard', label: 'Messages', icon: <MessageSquare size={16} /> },
        { href: '/brand/dashboard', label: 'Analytics', icon: <BarChart2 size={16} /> },
        { href: '/brand/dashboard', label: 'Payments', icon: <Wallet size={16} /> },
        { href: '/brand/dashboard', label: 'Saved', icon: <Bookmark size={16} /> },
        { href: '/brand/dashboard', label: 'Contracts', icon: <FileText size={16} /> },
        { href: '/brand/dashboard', label: 'Team', icon: <Users size={16} /> },
        { href: '/brand/dashboard', label: 'Content Library', icon: <Image size={16} /> },
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
        { href: '/creator/gigs', label: 'Brief Match AI', icon: <Sparkles size={16} /> },
        { href: '/creator/profile', label: 'Pitch Builder AI', icon: <PenTool size={16} /> },
        { href: '/creator/dashboard', label: 'Content Planner', icon: <Calendar size={16} /> },
        { href: '/creator/profile', label: 'Media Kit', icon: <Palette size={16} /> },
        { href: '/creator/dashboard', label: 'Reports', icon: <FileText size={16} /> },
      ];
    } else if (user.role === 'brand') {
      return [
        { href: '/brand/applicants', label: 'Talent Match', icon: <Users size={16} /> },
        { href: '/brand/post-gig', label: 'Campaign Brief AI', icon: <Sparkles size={16} /> },
        { href: '/brand/dashboard', label: 'Content Planner', icon: <Calendar size={16} /> },
        { href: '/brand/dashboard', label: 'Brand Kit', icon: <Palette size={16} /> },
        { href: '/brand/dashboard', label: 'Reports', icon: <FileText size={16} /> },
      ];
    }
    return [];
  };

  const menuItems = getNavLinks();
  const toolItems = getToolLinks();

  const getCreateHref = () => {
    if (user.role === 'brand') return '/brand/post-gig';
    if (user.role === 'creator') return '/creator/profile';
    return '/admin/dashboard';
  };
  const createHref = getCreateHref();

  return (
    <div 
      className={theme === 'light' ? 'light-theme' : 'dark-theme'}
      style={{ 
        backgroundColor: theme === 'light' ? '#fafaf9' : '#09090b', 
        color: theme === 'light' ? '#18181b' : '#f4f4f5', 
        minHeight: '100vh', 
        display: 'flex', 
        fontFamily: 'var(--font-sans)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      
      {/* Left Sidebar Menu */}
      <aside 
        style={{
          borderRight: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)',
          backgroundColor: theme === 'light' ? '#ffffff' : '#09090b',
          padding: isSidebarCollapsed ? '24px 8px 16px 8px' : '24px 16px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: isSidebarCollapsed ? '72px' : '240px',
          minWidth: isSidebarCollapsed ? '72px' : '240px',
          overflowY: 'auto',
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
          <Link href="/" style={{ fontSize: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <span style={{ 
              background: user.role === 'creator' ? 'linear-gradient(135deg, #db2777 0%, #7c3aed 100%)' : 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)', 
              color: '#ffffff', 
              padding: '3px 8px', 
              borderRadius: '6px', 
              fontSize: '13px' 
            }}>iG</span>
            {!isSidebarCollapsed && <span style={{ color: theme === 'light' ? '#18181b' : '#ffffff' }}>igigster</span>}
          </Link>
          
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#71717a', 
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
            borderRadius: isSidebarCollapsed ? '50%' : '8px',
            backgroundColor: '#db2777', // Solid pink from image
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
          {!isSidebarCollapsed && <span>Create</span>}
        </Link>

        {/* Nav Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                  gap: isSidebarCollapsed ? '0' : '10px',
                  padding: isSidebarCollapsed ? '10px' : '8px 12px',
                  borderRadius: '8px',
                  width: isSidebarCollapsed ? '40px' : '100%',
                  height: isSidebarCollapsed ? '40px' : 'auto',
                  margin: isSidebarCollapsed ? '0 auto' : '0',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive 
                    ? (theme === 'light' ? 'rgba(219, 39, 119, 0.05)' : 'rgba(255, 255, 255, 0.08)') 
                    : 'transparent',
                  color: isActive 
                    ? (theme === 'light' ? '#db2777' : '#ffffff') 
                    : (theme === 'light' ? '#4f4f4f' : '#a1a1aa'),
                  transition: 'all 0.15s',
                }}
                className={!isActive ? 'hover-bg-white-002' : ''}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span style={{ 
                  color: isActive 
                    ? (theme === 'light' ? '#db2777' : '#ffffff') 
                    : '#71717a', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {item.icon}
                </span>
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Tools Section */}
        {toolItems.length > 0 && (
          <>
            <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)', margin: '12px 0' }} />
            
            {!isSidebarCollapsed && (
              <span style={{ fontSize: '10px', fontWeight: 700, color: theme === 'light' ? '#9e9e9e' : '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 12px', marginBottom: '8px', display: 'block' }}>
                Tools
              </span>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {toolItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                      gap: isSidebarCollapsed ? '0' : '10px',
                      padding: isSidebarCollapsed ? '10px' : '8px 12px',
                      borderRadius: '8px',
                      width: isSidebarCollapsed ? '40px' : '100%',
                      height: isSidebarCollapsed ? '40px' : 'auto',
                      margin: isSidebarCollapsed ? '0 auto' : '0',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      backgroundColor: isActive 
                        ? (theme === 'light' ? 'rgba(219, 39, 119, 0.05)' : 'rgba(255, 255, 255, 0.08)') 
                        : 'transparent',
                      color: isActive 
                        ? (theme === 'light' ? '#db2777' : '#ffffff') 
                        : (theme === 'light' ? '#4f4f4f' : '#a1a1aa'),
                      transition: 'all 0.15s',
                    }}
                    className={!isActive ? 'hover-bg-white-002' : ''}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <span style={{ 
                      color: isActive 
                        ? (theme === 'light' ? '#db2777' : '#ffffff') 
                        : '#71717a', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {item.icon}
                    </span>
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom Sidebar Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', marginTop: 'auto' }}>
          {/* Utility icons row */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: isSidebarCollapsed ? 'column' : 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              color: '#71717a', 
              padding: isSidebarCollapsed ? '0' : '0 12px',
              gap: isSidebarCollapsed ? '16px' : '0' 
            }}
          >
            <div title="Notifications" className="sidebar-bottom-icon" style={{ position: 'relative', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} />
              <span style={{ 
                position: 'absolute', 
                top: '-6px', 
                right: '-6px', 
                backgroundColor: '#db2777', 
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

          {/* Separator line */}
          <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)' }} />

          {/* Profile Widget */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
              padding: isSidebarCollapsed ? '4px 0' : '6px 12px',
              borderRadius: '12px',
              backgroundColor: isSidebarCollapsed ? 'transparent' : (theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'),
              border: isSidebarCollapsed ? 'none' : (theme === 'light' ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.04)'),
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            className="hover-bg-white-002"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={user.avatar} 
                alt={user.name} 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.1)' 
                }} 
              />
              {!isSidebarCollapsed && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: theme === 'light' ? '#18181b' : '#ffffff', lineHeight: '1.2' }}>
                    {user.role === 'brand' ? 'Brand Account' : 'Creator Account'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#71717a', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                    {user.role === 'brand' ? 'Growth Labs' : user.name} <ChevronDown size={10} />
                  </span>
                </div>
              )}
            </div>
            {!isSidebarCollapsed && <ChevronDown size={14} style={{ color: '#71717a' }} />}
          </div>
        </div>
      </aside>

      {/* Right Column: Header + Content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, backgroundColor: theme === 'light' ? '#fafaf9' : '#09090b', transition: 'all 0.3s' }}>
        {/* Top Header */}
        <header 
          style={{
            borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)',
            backgroundColor: theme === 'light' ? '#ffffff' : '#09090b',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            transition: 'all 0.3s'
          }}
        >
          {/* Left: Announcement Banner (Center/Left of the content header) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: theme === 'light' ? '#f5f5f4' : '#18181b', border: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255, 255, 255, 0.05)', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', color: theme === 'light' ? '#71717a' : '#a1a1aa' }} className="desktop-only">
            <span style={{ backgroundColor: user.role === 'creator' ? 'rgba(219,39,119,0.15)' : 'rgba(13,148,136,0.15)', color: user.role === 'creator' ? '#db2777' : '#0d9488', padding: '2px 6px', borderRadius: '4px', fontWeight: 700, fontSize: '9px', textTransform: 'uppercase' }}>EARLY ACCESS</span>
            <span>Next-Gen UGC tools: Create campaigns & manage tasks instantly</span>
          </div>

          {/* Right Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: 'auto' }}>
            <CurrencyToggle />
            
            <Link href="/pricing" style={{ color: '#db2777', fontSize: '13px', fontWeight: 650, textDecoration: 'none' }} className="hover-underline">
              Need help?
            </Link>

            {/* Message button */}
            <button style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'flex', alignItems: 'center' }} className="hover-white-icon">
              <MessageSquare size={18} />
            </button>

            {/* Bell button */}
            <button style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative' }} className="hover-white-icon">
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', backgroundColor: '#db2777', borderRadius: '50%' }} />
            </button>

            {/* Avatar & Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              <img src={user.avatar} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#ef4444',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <LogOut size={12} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content Box */}
        <main style={{ padding: '40px 24px', backgroundColor: theme === 'light' ? '#fafaf9' : '#09090b', overflowY: 'auto', flex: 1, transition: 'all 0.3s' }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        /* Global theme resets inside dashboard */
        .light-theme {
          background-color: #fafaf9 !important;
          color: #18181b !important;
        }
        .light-theme main {
          background-color: #fafaf9 !important;
        }
        .light-theme aside {
          background-color: #ffffff !important;
          border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
        }
        .light-theme header {
          background-color: #ffffff !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
        }
        .light-theme .glass-panel {
          background: #ffffff !important;
          background-color: #ffffff !important;
          border: 1px solid rgba(0, 0, 0, 0.05) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.01) !important;
          color: #18181b !important;
        }
        .light-theme h1,
        .light-theme h2,
        .light-theme h3,
        .light-theme h4,
        .light-theme h5,
        .light-theme h6 {
          color: #18181b !important;
        }
        .light-theme [style*="color: rgb(15, 23, 42)"],
        .light-theme [style*="color:#0f172a"],
        .light-theme [style*="color: #0f172a"] {
          color: #18181b !important;
        }

        .hover-bg-white-002:hover {
          background-color: rgba(0, 0, 0, 0.02) !important;
          color: #db2777 !important;
        }
        .light-theme .hover-bg-white-002:hover {
          background-color: rgba(0, 0, 0, 0.02) !important;
          color: #18181b !important;
        }
        .sidebar-bottom-icon:hover {
          color: #db2777 !important;
          transform: translateY(-1px);
        }
        .hover-white-icon:hover {
          color: #db2777 !important;
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// Wrapper to prevent name clash or verify Lucide icon naming
function PlusCircleIconWrapper() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Megaphone size={16} />
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
