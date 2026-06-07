'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, logoutUser } from '@/lib/services';
import { User } from '@/types/common';
import { LogOut, LayoutDashboard, UserCheck, ShieldCheck, ListFilter, Compass, UserCircle, Briefcase, PlusCircle, Users } from 'lucide-react';
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

  useEffect(() => {
    const activeUser = getCurrentUser();
    if (!activeUser) {
      router.push('/login');
    } else {
      setUser(activeUser);
      setLoading(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
        <span>Loading secure dashboard...</span>
      </div>
    );
  }

  // Generate sidebar items based on role
  const getNavLinks = () => {
    if (user.role === 'creator') {
      return [
        { href: '/creator/dashboard', label: 'Overview', icon: <LayoutDashboard size={16} /> },
        { href: '/creator/profile', label: 'My Portfolio', icon: <UserCircle size={16} /> },
        { href: '/creator/applications', label: 'My Applications', icon: <Briefcase size={16} /> },
        { href: '/creator/gigs', label: 'Browse Jobs Feed', icon: <Compass size={16} /> },
      ];
    } else if (user.role === 'brand') {
      return [
        { href: '/brand/dashboard', label: 'Overview', icon: <LayoutDashboard size={16} /> },
        { href: '/brand/post-gig', label: 'Post a UGC Gig', icon: <PlusCircle size={16} /> },
        { href: '/brand/applicants', label: 'Review Applicants', icon: <Users size={16} /> },
        { href: '/brand/gigs', label: 'Manage Gigs', icon: <ListFilter size={16} /> },
      ];
    } else {
      return [
        { href: '/admin/dashboard', label: 'Platform Metrics', icon: <ShieldCheck size={16} /> },
        { href: '/admin/gigs', label: 'Gig Vetting Queue', icon: <ListFilter size={16} /> },
        { href: '/admin/users', label: 'Users Manager', icon: <Users size={16} /> },
        { href: '/admin/applications', label: 'All Applications', icon: <Briefcase size={16} /> },
      ];
    }
  };

  const menuItems = getNavLinks();

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <header 
        style={{
          borderBottom: '1px solid var(--card-border)',
          backgroundColor: '#f8fafc',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo */}
          <Link href="/" style={{ fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ background: 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)', color: '#ffffff', padding: '3px 8px', borderRadius: '6px', fontSize: '15px' }}>iG</span>
            <span className="accent-gradient-text">igigster</span>
          </Link>
          
          <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '12px', color: 'rgb(99,102,241)', textTransform: 'capitalize' }}>
            🔐 {user.role} Dashboard
          </span>
        </div>

        {/* Right Nav Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <CurrencyToggle />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '12px', borderLeft: '1px solid #e2e8f0' }}>
            <img src={user.avatar} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontSize: '13.5px', color: '#475569', fontWeight: 500 }} className="desktop-only">{user.name}</span>
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

      {/* Main Body Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          flex: 1,
        }}
        className="dashboard-outer-grid"
      >
        {/* Left Sidebar Menu */}
        <aside 
          style={{
            borderRight: '1px solid var(--card-border)',
            backgroundColor: '#f8fafc',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
          className="dashboard-sidebar-menu"
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: isActive ? 'rgb(var(--primary))' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s',
                }}
                className={!isActive ? 'hover-bg-white-002' : ''}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </aside>

        {/* Content Box */}
        <main style={{ padding: '40px 24px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        .hover-bg-white-002:hover {
          background-color: rgba(0, 0, 0, 0.02) !important;
          color: #0f172a !important;
        }
        @media (min-width: 992px) {
          .dashboard-outer-grid {
            grid-template-columns: 240px 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}
