'use client';

import React, { useState } from 'react';
import {
  Users, Plus, Search, MessageSquare, PlusCircle, FolderOpen,
  Clock, CheckCircle2, Trash2, User, Sparkles, X, AlertCircle,
  ArrowRight, ChevronRight, Play, Film, MessageCircle
} from 'lucide-react';

interface TeamViewProps {
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

interface TeamMember {
  role: 'ugc_creator' | 'editor' | 'voiceover' | 'other';
  roleLabel: string;
  status: 'filled' | 'invited' | 'open';
  creatorName?: string;
  creatorAvatar?: string;
}

interface CollaborativeTeam {
  id: string;
  campaignTitle: string;
  teamName: string;
  status: 'scripting' | 'filming' | 'editing' | 'reviewing' | 'completed';
  members: TeamMember[];
  milestones: { name: string; status: 'completed' | 'in_progress' | 'locked' }[];
}

interface PendingInvite {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  campaignTitle: string;
  roleLabel: string;
  sentAt: string;
  status: 'pending' | 'declined';
}

const INITIAL_TEAMS: CollaborativeTeam[] = [
  {
    id: 'team_1',
    campaignTitle: 'Mamaearth Vitamin C Serum',
    teamName: 'Team Glow Reel',
    status: 'scripting',
    members: [
      {
        role: 'ugc_creator',
        roleLabel: 'UGC Creator',
        status: 'filled',
        creatorName: 'Ananya Sharma',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60'
      },
      {
        role: 'editor',
        roleLabel: 'Video Editor',
        status: 'filled',
        creatorName: 'Rahul Verma',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
      },
      {
        role: 'voiceover',
        roleLabel: 'Voiceover Artist',
        status: 'invited',
        creatorName: 'Priya Nair'
      }
    ],
    milestones: [
      { name: 'Concept & Script Approval', status: 'completed' },
      { name: 'Raw Filming Upload', status: 'in_progress' },
      { name: 'Draft Video Review & Retouch', status: 'locked' },
      { name: 'Final Delivery Release', status: 'locked' }
    ]
  },
  {
    id: 'team_2',
    campaignTitle: 'boAt Rockerz Launch Campaign',
    teamName: 'Team Bass Unbox',
    status: 'filming',
    members: [
      {
        role: 'ugc_creator',
        roleLabel: 'UGC Creator',
        status: 'filled',
        creatorName: 'Priya Nair',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60'
      },
      {
        role: 'editor',
        roleLabel: 'Video Editor',
        status: 'filled',
        creatorName: 'Rahul Verma',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
      }
    ],
    milestones: [
      { name: 'Unboxing Script & Storyboard', status: 'completed' },
      { name: 'Aesthetic B-roll Filming', status: 'completed' },
      { name: 'Fast-Cut High-Retention Editing', status: 'in_progress' },
      { name: 'Asset Delivery Release', status: 'locked' }
    ]
  }
];

const INITIAL_INVITES: PendingInvite[] = [
  {
    id: 'inv_1',
    creatorName: 'Priya Nair',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
    campaignTitle: 'Mamaearth Vitamin C Serum',
    roleLabel: 'Voiceover Artist',
    sentAt: '1 day ago',
    status: 'pending'
  },
  {
    id: 'inv_2',
    creatorName: 'Amit Patel',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
    campaignTitle: 'boAt Rockerz Launch Campaign',
    roleLabel: 'Cinematographer',
    sentAt: '3 days ago',
    status: 'declined'
  }
];

// Shortlisted mockup creators to choose from
const SHORTLISTED_CREATORS = [
  { name: 'Ananya Sharma', role: 'ugc_creator', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60' },
  { name: 'Rahul Verma', role: 'editor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' },
  { name: 'Priya Nair', role: 'voiceover', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' },
  { name: 'Amit Patel', role: 'editor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60' }
];

export default function BrandTeamView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: TeamViewProps) {
  const [teams, setTeams] = useState<CollaborativeTeam[]>(INITIAL_TEAMS);
  const [invites, setInvites] = useState<PendingInvite[]>(INITIAL_INVITES);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>('team_1');

  // Form Team state
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [newCampaignTitle, setNewCampaignTitle] = useState<string>('Mamaearth Vitamin C Serum');
  const [selectedCreatorName, setSelectedCreatorName] = useState<string>('Ananya Sharma');
  const [selectedEditorName, setSelectedEditorName] = useState<string>('Rahul Verma');
  const [selectedVoName, setSelectedVoName] = useState<string>('Priya Nair');

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleFormTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    // Build roles array
    const members: TeamMember[] = [
      {
        role: 'ugc_creator',
        roleLabel: 'UGC Creator',
        status: 'filled',
        creatorName: selectedCreatorName,
        creatorAvatar: SHORTLISTED_CREATORS.find(c => c.name === selectedCreatorName)?.avatar
      },
      {
        role: 'editor',
        roleLabel: 'Video Editor',
        status: 'filled',
        creatorName: selectedEditorName,
        creatorAvatar: SHORTLISTED_CREATORS.find(c => c.name === selectedEditorName)?.avatar
      }
    ];

    if (selectedVoName) {
      members.push({
        role: 'voiceover',
        roleLabel: 'Voiceover Artist',
        status: 'invited',
        creatorName: selectedVoName,
        creatorAvatar: SHORTLISTED_CREATORS.find(c => c.name === selectedVoName)?.avatar
      });

      // Add to invites outbox
      const newInv: PendingInvite = {
        id: `inv_${Date.now()}`,
        creatorName: selectedVoName,
        creatorAvatar: SHORTLISTED_CREATORS.find(c => c.name === selectedVoName)?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
        campaignTitle: newCampaignTitle,
        roleLabel: 'Voiceover Artist',
        sentAt: 'Just now',
        status: 'pending'
      };
      setInvites(prev => [newInv, ...prev]);
    }

    const newTeam: CollaborativeTeam = {
      id: `team_${Date.now()}`,
      campaignTitle: newCampaignTitle,
      teamName: newTeamName,
      status: 'scripting',
      members,
      milestones: [
        { name: 'Storyboard Draft Approval', status: 'in_progress' },
        { name: 'Raw Video Shoots Upload', status: 'locked' },
        { name: 'Edit Cuts and Text Overlay Review', status: 'locked' },
        { name: 'Final Handover Delivery', status: 'locked' }
      ]
    };

    setTeams(prev => [...prev, newTeam]);
    setSelectedTeamId(newTeam.id);
    setShowFormModal(false);
    
    // Reset fields
    setNewTeamName('');
    triggerToast(`Collaborative team "${newTeam.teamName}" assembled successfully!`);
  };

  const handleDissolveTeam = (id: string) => {
    if (confirm('Are you sure you want to dissolve this collaborative project team? All active milestones status and invites will be canceled.')) {
      setTeams(prev => prev.filter(t => t.id !== id));
      if (selectedTeamId === id) {
        setSelectedTeamId(teams.length > 1 ? teams.find(t => t.id !== id)?.id || null : null);
      }
      triggerToast('Collaborative team dissolved.');
    }
  };

  const handleCancelInvite = (invId: string) => {
    const invite = invites.find(i => i.id === invId);
    if (invite) {
      setInvites(prev => prev.filter(i => i.id !== invId));
      triggerToast(`Canceled invitation to ${invite.creatorName}.`);
    }
  };

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
            Team Collaborations
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Form multi-role creative teams (UGC + Editor + Voiceover) and manage collaborative content timelines.
          </p>
        </div>

        <button
          onClick={() => setShowFormModal(true)}
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
          className="glow-button-team"
        >
          <Plus size={16} />
          <span>Assemble Team</span>
        </button>
      </div>

      {/* Grid Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Metric 1 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: isLight ? '#F3E8FF' : 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} style={{ alignSelf: 'center' }} />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: mutedText, display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Total Teams</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, display: 'block', marginTop: '2px' }}>{teams.length} Active</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={20} style={{ alignSelf: 'center' }} />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: mutedText, display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Production Phase</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, display: 'block', marginTop: '2px' }}>{teams.filter(t => t.status === 'filming' || t.status === 'editing').length} Project</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '20px', boxShadow: shadowStyle, display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: isLight ? '#FFF7ED' : 'rgba(249, 115, 22, 0.1)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} style={{ alignSelf: 'center' }} />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: mutedText, display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Pending Invites</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: primaryText, display: 'block', marginTop: '2px' }}>{invites.filter(i => i.status === 'pending').length} Sent</span>
          </div>
        </div>

      </div>

      {/* Two column split view: Left side Teams lists, Right side detail collaborative board */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Column: Teams cards listing */}
        <div style={{ flex: '1.2 1 450px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: '0 0 4px' }}>Assembled Campaign Teams</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {teams.map(team => {
              const isSelected = team.id === selectedTeamId;
              const filledMembers = team.members.filter(m => m.status === 'filled');

              return (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  style={{
                    backgroundColor: isSelected ? (isLight ? '#FFF5F7' : 'rgba(236,72,153,0.06)') : cardBg,
                    border: `1px solid ${isSelected ? accentColor : borderColor}`,
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    boxShadow: isSelected ? '0 4px 16px rgba(236,72,153,0.06)' : shadowStyle,
                    transition: 'all 0.2s'
                  }}
                  className={`team-card-row ${isSelected ? 'selected' : ''}`}
                >
                  {/* Top campaign & stats info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: mutedText, fontWeight: 650, display: 'block' }}>
                        {team.campaignTitle}
                      </span>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: '4px 0 0' }}>
                        {team.teamName}
                      </h4>
                    </div>

                    <span style={{
                      fontSize: '10px',
                      fontWeight: 750,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: team.status === 'scripting' ? 'rgba(139,92,246,0.08)' : 'rgba(249,115,22,0.08)',
                      color: team.status === 'scripting' ? '#8B5CF6' : '#F97316'
                    }}>
                      {team.status}
                    </span>
                  </div>

                  {/* Members list preview & progress */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: `1px solid ${borderColor}`, paddingTop: '12px' }}>
                    
                    {/* Avatars Stack */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex' }}>
                        {filledMembers.map((m, idx) => (
                          <img
                            key={idx}
                            src={m.creatorAvatar}
                            alt={m.creatorName}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: `1.5px solid ${cardBg}`,
                              marginLeft: idx > 0 ? '-8px' : '0'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '12px', color: secondaryText }}>
                        {filledMembers.length} of {team.members.length} roles filled
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: accentColor, fontWeight: 700 }} className="hover-underline">
                      <span>Manage workspace</span>
                      <ChevronRight size={14} />
                    </div>

                  </div>

                </div>
              );
            })}
            
            {teams.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 20px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px' }}>
                <Users size={32} style={{ color: mutedText, opacity: 0.6, margin: '0 auto 12px' }} />
                <p style={{ color: secondaryText, fontSize: '14.5px', fontWeight: 650, margin: 0 }}>No collaborative teams formed.</p>
                <p style={{ color: mutedText, fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>Click "Assemble Team" at the top right to start a multi-hire project.</p>
              </div>
            )}
          </div>

          {/* Pending invites outbox */}
          <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: primaryText, margin: 0 }}>Outbox Project Invitations</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {invites.map(inv => (
                <div key={inv.id} style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img src={inv.creatorAvatar} alt={inv.creatorName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText, display: 'block' }}>{inv.creatorName}</span>
                      <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '1px' }}>Role: {inv.roleLabel} • Brief: {inv.campaignTitle}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 750,
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: inv.status === 'pending' ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)',
                      color: inv.status === 'pending' ? '#F59E0B' : '#EF4444'
                    }}>
                      {inv.status}
                    </span>

                    {inv.status === 'pending' ? (
                      <button
                        onClick={() => handleCancelInvite(inv.id)}
                        style={{
                          background: 'none',
                          border: `1px solid ${borderColor}`,
                          color: secondaryText,
                          fontSize: '11px',
                          fontWeight: 650,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                        className="hover-white-bg"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setInvites(prev => prev.map(i => i.id === inv.id ? { ...i, status: 'pending' } : i));
                          triggerToast(`Resent invitation to ${inv.creatorName}.`);
                        }}
                        style={{
                          background: 'none',
                          border: `1px solid ${borderColor}`,
                          color: accentColor,
                          fontSize: '11px',
                          fontWeight: 650,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                        className="hover-white-bg"
                      >
                        Resend
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Detailed Collaborative workspace board */}
        <div style={{ flex: '1 1 350px', position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {selectedTeam ? (
            <div style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: '24px',
              boxShadow: shadowStyle,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              
              {/* Card Title Header */}
              <div>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>
                  Collaboration Workspace
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 850, color: primaryText, margin: '4px 0 2px' }}>
                  {selectedTeam.teamName}
                </h3>
                <span style={{ fontSize: '12px', color: secondaryText }}>
                  Brief: <strong>{selectedTeam.campaignTitle}</strong>
                </span>
              </div>

              {/* Members workspace roles listing */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '13px', color: secondaryText, fontWeight: 800, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  Team Members & Roles
                </h4>

                {selectedTeam.members.map((member, idx) => (
                  <div key={idx} style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)'
                  }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {member.status === 'filled' && member.creatorAvatar ? (
                        <img src={member.creatorAvatar} alt={member.creatorName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: member.status === 'invited' ? 'rgba(245,158,11,0.06)' : 'rgba(0,0,0,0.05)',
                          color: member.status === 'invited' ? '#F59E0B' : mutedText,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px'
                        }}>
                          {member.status === 'invited' ? '✉️' : '?'}
                        </div>
                      )}
                      <div>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText, display: 'block' }}>
                          {member.status === 'filled' ? member.creatorName : member.status === 'invited' ? 'Invite Sent' : 'Role Open'}
                        </span>
                        <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '1px' }}>{member.roleLabel}</span>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 750,
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: member.status === 'filled' 
                        ? 'rgba(16,185,129,0.08)' 
                        : member.status === 'invited' 
                          ? 'rgba(245,158,11,0.08)' 
                          : 'rgba(239,68,68,0.08)',
                      color: member.status === 'filled' 
                        ? '#10B981' 
                        : member.status === 'invited' 
                          ? '#F59E0B' 
                          : '#EF4444'
                    }}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Milestones Tracker timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '13px', color: secondaryText, fontWeight: 800, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  Collaboration Pipeline
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative', paddingLeft: '8px' }}>
                  {selectedTeam.milestones.map((ms, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '16px', position: 'relative' }}>
                      {/* Vertical line connector */}
                      {idx < selectedTeam.milestones.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          left: '7px',
                          top: '18px',
                          bottom: 0,
                          width: '1.5px',
                          backgroundColor: ms.status === 'completed' ? '#10B981' : borderColor
                        }} />
                      )}

                      {/* Icon point */}
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: ms.status === 'completed' 
                          ? '#10B981' 
                          : ms.status === 'in_progress' 
                            ? '#8B5CF6' 
                            : 'transparent',
                        border: `1.5px solid ${ms.status === 'completed' ? '#10B981' : ms.status === 'in_progress' ? '#8B5CF6' : borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        zIndex: 1
                      }}>
                        {ms.status === 'completed' && <span style={{ color: '#FFFFFF', fontSize: '9px', fontWeight: 900 }}>✓</span>}
                      </div>

                      {/* Details text */}
                      <div>
                        <span style={{
                          fontSize: '12.5px',
                          fontWeight: ms.status === 'in_progress' ? 700 : 550,
                          color: ms.status === 'completed' ? primaryText : ms.status === 'in_progress' ? '#8B5CF6' : mutedText,
                          display: 'block'
                        }}>
                          {ms.name}
                        </span>
                        {ms.status === 'in_progress' && (
                          <span style={{ fontSize: '10.5px', color: mutedText, display: 'block', marginTop: '2px' }}>Currently Active Phase</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs Workspace */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
                <button
                  onClick={() => alert(`Redirecting to Team Message Chatroom for "${selectedTeam.teamName}"...`)}
                  style={{
                    backgroundColor: accentColor,
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.18)',
                    transition: 'all 0.2s'
                  }}
                  className="glow-button-team"
                >
                  <MessageCircle size={14} />
                  <span>Send Team Message</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => {
                      const roleName = prompt('Enter the title for the new collaborative role needed (e.g. Graphic Designer, Voiceover Artist):');
                      if (roleName) {
                        const newRole: TeamMember = {
                          role: 'other',
                          roleLabel: roleName,
                          status: 'open'
                        };
                        setTeams(prev => prev.map(t => t.id === selectedTeam.id ? { ...t, members: [...t.members, newRole] } : t));
                        triggerToast(`Added open role "${roleName}" to the team.`);
                      }
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${borderColor}`,
                      color: primaryText,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '12.5px',
                      fontWeight: 650,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    className="hover-white-bg"
                  >
                    Add Member Role
                  </button>

                  <button
                    onClick={() => handleDissolveTeam(selectedTeam.id)}
                    style={{
                      backgroundColor: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.15)',
                      color: '#EF4444',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '12.5px',
                      fontWeight: 650,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Dissolve Team
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '20px',
              padding: '40px 20px',
              boxShadow: shadowStyle,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '280px'
            }}>
              <AlertCircle size={36} style={{ color: mutedText, opacity: 0.5, marginBottom: '14px' }} />
              <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: primaryText, margin: '0 0 6px' }}>
                No Workspace Loaded
              </h3>
              <p style={{ fontSize: '13px', color: secondaryText, margin: 0, maxWidth: '220px', lineHeight: 1.4 }}>
                Select an assembled campaign team from the left listing panel to manage collaboration timeline.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* POPUP MODAL: Assemble Collaborative Team */}
      {showFormModal && (
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
            maxWidth: '450px',
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
                Assemble Creative Team
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
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

            <form onSubmit={handleFormTeamSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Team Name</label>
                <input
                  type="text"
                  required
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. Vitamin C Reels Squad"
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Campaign Brief</label>
                <select
                  value={newCampaignTitle}
                  onChange={(e) => setNewCampaignTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isLight ? '#F9FAFB' : '#141416',
                    color: primaryText,
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Mamaearth Vitamin C Serum">Mamaearth Vitamin C Serum</option>
                  <option value="boAt Rockerz Launch Campaign">boAt Rockerz Launch Campaign</option>
                  <option value="Zomato Weekend Food Reels">Zomato Weekend Food Reels</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px', backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)' }}>
                <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Assign Shortlisted Roles</span>
                
                {/* UGC role */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12.5px', color: secondaryText }}>UGC Creator:</span>
                  <select
                    value={selectedCreatorName}
                    onChange={(e) => setSelectedCreatorName(e.target.value)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      color: primaryText,
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {SHORTLISTED_CREATORS.filter(c => c.role === 'ugc_creator').map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Editor role */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12.5px', color: secondaryText }}>Video Editor:</span>
                  <select
                    value={selectedEditorName}
                    onChange={(e) => setSelectedEditorName(e.target.value)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      color: primaryText,
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {SHORTLISTED_CREATORS.filter(c => c.role === 'editor').map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Voiceover role */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', color: secondaryText }}>Voiceover:</span>
                  <select
                    value={selectedVoName}
                    onChange={(e) => setSelectedVoName(e.target.value)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: cardBg,
                      color: primaryText,
                      fontSize: '12px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">No voiceover role</option>
                    {SHORTLISTED_CREATORS.filter(c => c.role === 'voiceover').map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Action Button */}
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
                className="glow-button-team"
              >
                Assemble & Invite Team
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Toast alert */}
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
        .glow-button-team:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3) !important;
        }
        .team-card-row:hover {
          border-color: rgba(236,72,153,0.3) !important;
        }
        .team-card-row.selected:hover {
          border-color: #EC4899 !important;
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
