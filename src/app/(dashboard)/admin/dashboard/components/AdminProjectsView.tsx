'use client';

import React, { useState, useEffect } from 'react';
import { Search, FileText, CheckCircle2, AlertTriangle, Clock, RefreshCw, Star } from 'lucide-react';

interface ProjectItem {
  id: string;
  brandName: string;
  creatorName: string;
  campaignTitle: string;
  phase: 'scripting' | 'filming' | 'editing' | 'reviewing' | 'completed';
  progressPercent: number;
  draftReelName?: string;
  lastUpdated: string;
}

interface ViewProps {
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

export default function AdminProjectsView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ViewProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('igigster_admin_projects');
    if (cached) {
      setProjects(JSON.parse(cached));
    } else {
      const defaultProjects: ProjectItem[] = [
        { id: 'proj-1', brandName: 'Gloxo Cosmetics', creatorName: 'Ananya Sharma', campaignTitle: 'Summer Glow Campaign', phase: 'reviewing', progressPercent: 75, draftReelName: 'luna_collagen_final.mp4', lastUpdated: '3 mins ago' },
        { id: 'proj-2', brandName: 'StyleNova', creatorName: 'Neha Kapoor', campaignTitle: 'New Drop Launch', phase: 'filming', progressPercent: 40, lastUpdated: '2 hours ago' },
        { id: 'proj-3', brandName: 'Greenly', creatorName: 'Aman Verma', campaignTitle: 'Sustainability Drive', phase: 'completed', progressPercent: 100, draftReelName: 'greenly_vlog_final.mp4', lastUpdated: '1 day ago' }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('igigster_admin_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const getPhaseColor = (phase: ProjectItem['phase']) => {
    switch (phase) {
      case 'completed': return '#10B981';
      case 'reviewing': return '#F59E0B';
      case 'editing': return '#3B82F6';
      default: return '#A1A1AA';
    }
  };

  const filteredProjects = projects.filter(p => 
    p.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: primaryText, margin: 0 }}>UGC Content Production Pipelines</h1>
        <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '4px' }}>
          Monitor active production milestones, review submitted video reels drafts, and track progress rates.
        </p>
      </div>

      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            height: '38px',
            backgroundColor: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            paddingLeft: '38px',
            fontSize: '13px',
            color: primaryText,
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredProjects.map((p) => (
          <div key={p.id} style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(139,92,246,0.06)',
                color: '#8B5CF6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 750, color: primaryText, margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                  {p.campaignTitle}
                </h3>
                <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px', display: 'block' }}>Match: {p.creatorName} ↔ {p.brandName}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: secondaryText }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Phase Status:</span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: getPhaseColor(p.phase),
                  backgroundColor: `${getPhaseColor(p.phase)}08`,
                  border: `1px solid ${getPhaseColor(p.phase)}15`,
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>{p.phase}</span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                  <span>Progress:</span>
                  <span style={{ fontWeight: 750, color: primaryText }}>{p.progressPercent}%</span>
                </div>
                <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--progress-track-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.progressPercent}%`, height: '100%', backgroundColor: accentColor, borderRadius: '3px' }} />
                </div>
              </div>

              {p.draftReelName && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginTop: '2px' }}>
                  <span>Reel File:</span>
                  <span style={{ fontWeight: 650, color: accentColor }}>{p.draftReelName}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: mutedText }}>
              <span>ID: {p.id}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11} /> {p.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
