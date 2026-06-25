'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, X, Search, Sparkles, AlertCircle, Edit, Trash2 } from 'lucide-react';

interface ContentPlannerViewProps {
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

interface PlannerEvent {
  id: string;
  creatorName: string;
  campaignTitle: string;
  taskTitle: string;
  dateDay: number; // Day of June 2026
  timeText: string;
  type: 'draft' | 'publish' | 'payment';
  color: string;
}

const INITIAL_EVENTS: PlannerEvent[] = [
  { id: 'ev_1', creatorName: 'Ananya Sharma', campaignTitle: 'Mamaearth Vitamin C Serum', taskTitle: 'Draft Reel Submission', dateDay: 12, timeText: '12:00 PM', type: 'draft', color: '#8B5CF6' },
  { id: 'ev_2', creatorName: 'Rahul Verma', campaignTitle: 'boAt Rockerz Launch', taskTitle: 'Final Edited Video Review', dateDay: 18, timeText: '04:00 PM', type: 'draft', color: '#8B5CF6' },
  { id: 'ev_3', creatorName: 'Priya Nair', campaignTitle: 'Summer Outfit Try-On', taskTitle: 'Stories Post Publish', dateDay: 24, timeText: '11:00 AM', type: 'publish', color: '#10B981' },
  { id: 'ev_4', creatorName: 'SkinGlow Corporate', campaignTitle: 'Payments Outflow', taskTitle: 'Release Milestone 1 Escrow', dateDay: 28, timeText: '05:00 PM', type: 'payment', color: '#EC4899' },
  { id: 'ev_5', creatorName: 'Ananya Sharma', campaignTitle: 'Mamaearth Vitamin C Serum', taskTitle: 'Reel Posting Publish Date', dateDay: 15, timeText: '06:00 PM', type: 'publish', color: '#10B981' }
];

export default function BrandContentPlannerView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: ContentPlannerViewProps) {
  const [events, setEvents] = useState<PlannerEvent[]>(INITIAL_EVENTS);
  const [selectedDay, setSelectedDay] = useState<number | null>(12);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form states
  const [newCreator, setNewCreator] = useState<string>('Ananya Sharma');
  const [newCampaign, setNewCampaign] = useState<string>('Mamaearth Vitamin C Serum');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('12:00 PM');
  const [newType, setNewType] = useState<'draft' | 'publish' | 'payment'>('draft');

  // Calendar parameters (June 2026: starts on Monday (1st), 30 days)
  const totalDays = 30;
  const startOffset = 0; // Monday starts on index 0

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay || !newTaskTitle.trim()) return;

    const color = newType === 'publish' ? '#10B981' : newType === 'payment' ? '#EC4899' : '#8B5CF6';
    const newEv: PlannerEvent = {
      id: `ev_${Date.now()}`,
      creatorName: newCreator,
      campaignTitle: newCampaign,
      taskTitle: newTaskTitle,
      dateDay: selectedDay,
      timeText: newTime,
      type: newType,
      color
    };

    setEvents(prev => [...prev, newEv]);
    setNewTaskTitle('');
    setShowAddForm(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Render calendar grid days array
  const calendarDays = Array.from({ length: totalDays }, (_, i) => i + 1);

  const selectedDayEvents = events.filter(e => e.dateDay === selectedDay);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', transition: 'all 0.3s' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 850, color: primaryText, letterSpacing: '-0.03em', margin: 0 }}>
            Content Calendar
          </h1>
          <p style={{ color: secondaryText, fontSize: '14.5px', marginTop: '6px', fontWeight: 400 }}>
            Schedule campaign posts, draft revisions timelines, and coordinate creator deliverables.
          </p>
        </div>

        <button
          onClick={() => selectedDay && setShowAddForm(true)}
          disabled={!selectedDay}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: selectedDay ? accentColor : borderColor,
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: selectedDay ? 'pointer' : 'not-allowed',
            border: 'none',
            boxShadow: selectedDay ? '0 4px 12px rgba(236, 72, 153, 0.2)' : 'none',
            opacity: selectedDay ? 1 : 0.6
          }}
          className="glow-button-planner"
        >
          <Plus size={16} />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Main split: Left calendar grid, Right day tasks details */}
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Left Side: Calendar Grid */}
        <div style={{ flex: '1.5 1 450px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '24px', boxShadow: shadowStyle }}>
          
          {/* Calendar Header info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>June 2026</h3>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{ background: 'none', border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '4px', cursor: 'pointer', color: secondaryText }} className="hover-white-bg">
                <ChevronLeft size={16} />
              </button>
              <button style={{ background: 'none', border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '4px', cursor: 'pointer', color: secondaryText }} className="hover-white-bg">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: mutedText, textTransform: 'uppercase' }}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Days Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {calendarDays.map((day) => {
              const isSelected = day === selectedDay;
              const dayEvents = events.filter(e => e.dateDay === day);

              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  style={{
                    height: '75px',
                    border: `1px solid ${isSelected ? accentColor : borderColor}`,
                    borderRadius: '12px',
                    padding: '6px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? (isLight ? '#FFF5F7' : 'rgba(236,72,153,0.06)') : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  className={`calendar-day-slot ${isSelected ? 'selected' : ''}`}
                >
                  <span style={{ fontSize: '12px', fontWeight: 700, color: isSelected ? accentColor : primaryText }}>{day}</span>
                  
                  {/* Event indicators dots list */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' }}>
                    {dayEvents.slice(0, 3).map((ev, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: ev.color
                        }}
                        title={ev.taskTitle}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span style={{ fontSize: '8px', color: mutedText, fontWeight: 700 }}>+{dayEvents.length - 3}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color Code Legend */}
          <div style={{ display: 'flex', gap: '16px', borderTop: `1px solid ${borderColor}`, paddingTop: '16px', flexWrap: 'wrap', fontSize: '11px', fontWeight: 650, color: secondaryText }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
              <span>Draft Revisions / Tasks</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span>Campaign Publish Dates</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EC4899' }} />
              <span>Escrow Releases</span>
            </div>
          </div>

        </div>

        {/* Right Side: Day detail events panel */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '24px', padding: '24px', boxShadow: shadowStyle, display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '300px' }}>
            
            {/* Header info */}
            <div>
              <span style={{ fontSize: '11px', color: mutedText, fontWeight: 700, textTransform: 'uppercase' }}>Daily Timeline</span>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: '4px 0 0' }}>
                June {selectedDay}, 2026
              </h3>
            </div>

            {/* Selected day events list mapping */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {selectedDayEvents.map(ev => (
                <div key={ev.id} style={{
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)'
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: ev.color, marginTop: '5px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 750, color: primaryText, display: 'block' }}>{ev.taskTitle}</span>
                      <span style={{ fontSize: '11px', color: secondaryText, display: 'block', marginTop: '2px' }}>Brief: {ev.campaignTitle}</span>
                      <span style={{ fontSize: '10.5px', color: mutedText, display: 'block', marginTop: '4px' }}>Creator: {ev.creatorName}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: mutedText, fontWeight: 600 }}>{ev.timeText}</span>
                    
                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '50%'
                      }}
                      className="hover-bg-white-002"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
              {selectedDayEvents.length === 0 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '32px 0', textAlign: 'center', color: mutedText }}>
                  <AlertCircle size={28} style={{ opacity: 0.5, marginBottom: '8px' }} />
                  <span style={{ fontSize: '13px' }}>No events or deadlines scheduled for this day.</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* POPUP MODAL: Add Planner event */}
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
            maxWidth: '420px',
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
                Schedule Task - June {selectedDay}
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

            <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Task / Deadline Title</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Vitamin C Video Draft 1"
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
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Creator</label>
                  <select
                    value={newCreator}
                    onChange={(e) => setNewCreator(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : '#141416',
                      color: primaryText,
                      fontSize: '12.5px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Ananya Sharma">Ananya Sharma</option>
                    <option value="Rahul Verma">Rahul Verma</option>
                    <option value="Priya Nair">Priya Nair</option>
                    <option value="Wow Corporate"> Wow Corporate</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Campaign</label>
                  <select
                    value={newCampaign}
                    onChange={(e) => setNewCampaign(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : '#141416',
                      color: primaryText,
                      fontSize: '12.5px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Mamaearth Vitamin C Serum">Mamaearth Vitamin C</option>
                    <option value="boAt Rockerz Launch">boAt Rockerz Launch</option>
                    <option value="Zomato Food Reels">Zomato Food Reels</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Time slot</label>
                  <input
                    type="text"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 12:00 PM"
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
                  <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Event Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: isLight ? '#F9FAFB' : '#141416',
                      color: primaryText,
                      fontSize: '12.5px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="draft">Draft Revision Task</option>
                    <option value="publish">Publishing Deadline</option>
                    <option value="payment">Escrow Release</option>
                  </select>
                </div>
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
                className="glow-button-planner"
              >
                Add to Calendar
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .glow-button-planner:hover {
          transform: translateY(-1px);
          background-color: #DB2777 !important;
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3) !important;
        }
        .calendar-day-slot:hover {
          border-color: rgba(236, 72, 153, 0.35) !important;
        }
        .calendar-day-slot.selected:hover {
          border-color: #EC4899 !important;
        }
        .hover-white-bg:hover {
          background-color: var(--hover-bg) !important;
        }
        .hover-bg-white-002:hover {
          background-color: var(--hover-bg) !important;
        }
      `}</style>

    </div>
  );
}
