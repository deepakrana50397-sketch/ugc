'use client';

import React, { useState } from 'react';
import {
  X, Search, MessageSquare, FileText, Send, HelpCircle,
  AlertCircle, CheckCircle2, ChevronDown, ChevronRight, Loader2, Sparkles
} from 'lucide-react';

interface SupportHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  isLight: boolean;
  cardBg: string;
  borderColor: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  accentColor: string;
  shadowStyle: string;
  userRole?: 'creator' | 'brand' | 'admin' | string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export default function SupportHelpModal({
  isOpen,
  onClose,
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle,
  userRole = 'creator'
}: SupportHelpModalProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'ticket' | 'chat' | 'docs'>('faq');

  // FAQ states
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Ticket Form states
  const [ticketCategory, setTicketCategory] = useState('Campaign Setup');
  const [ticketPriority, setTicketPriority] = useState('Medium');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitting, setTicketSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'agent', text: "Hi! Welcome to iGigster Support. How can we help you today?", time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  if (!isOpen) return null;

  const isCreator = userRole === 'creator';

  const faqs: FAQItem[] = isCreator ? [
    {
      category: 'Payments',
      question: 'How do creator payouts and agency commission escrows work?',
      answer: 'Funds are held in secure escrow. Creators receive milestone payouts directly. For agency bookings, payout releases go to the agency balance, which can then distribute earnings to their internally managed creator pool. Withdrawals can be requested via bank transfer or credit card link in the Payments tab.'
    },
    {
      category: 'Campaigns',
      question: 'How do creators and agencies pitch for campaign briefs?',
      answer: 'Creators submit individual drafts or portfolio links. Agencies can submit group proposals or pitch a custom package of multiple creators to fulfill the brand\'s brief objectives. All pitches are reviewable by brands, with notifications sent immediately upon approval.'
    },
    {
      category: 'Matching',
      question: 'How does the AI matchmaker rank creators and agencies?',
      answer: 'The system matches profile niche tags, rate thresholds, location, and past review ratings with active briefs posted by brands. For agencies, rating calculations and matches aggregate across the agency\'s entire creator pool and portfolio specialties.'
    },
    {
      category: 'Collaboration',
      question: 'Can agencies form collaboration teams with external creators?',
      answer: 'Yes! Agencies can coordinate multiple talent profiles. Through the Team tab, agencies and brands can build shared project pipelines involving both agency-contracted and independent creators to execute complex campaigns together.'
    },
    {
      category: 'Account',
      question: 'How do I edit my creator rate card, or register my Agency portal?',
      answer: 'Individuals can edit rates and bios via Edit Profile. For creative production, VFX, DOOH or SMM agencies, go to the Agency Center in settings to register your talent pool size, locations, specialties, starting budget, and client portfolio.'
    }
  ] : [
    {
      category: 'Payments',
      question: 'How do I release escrow payments to creators?',
      answer: 'Navigate to the Payments tab from your dashboard. Scroll to the escrow holdings list, select the corresponding campaign brief, review the milestone submissions (such as Reels drafts), and click "Release Escrow". The locked funds will be instantly credited to the creator\'s wallet.'
    },
    {
      category: 'Campaigns',
      question: 'What are the required criteria for publishing a Campaign Brief?',
      answer: 'To post a campaign, you need to provide a clear brief title, niche tags, target platforms, dynamic budget inputs, detailed guidelines copy, and milestone deliverables. All briefs are reviewable by creators and can be activated or paused dynamically.'
    },
    {
      category: 'Matching',
      question: 'How does the AI Talent Match compatibility score work?',
      answer: 'Our AI matchmaker parses your campaign briefs for niche keywords, budget thresholds, visual style criteria, and creator locations, then computes a compatibility percentage score (e.g. 96% Match) against creator profile portfolios. It highlights matching tags and flags discrepancies.'
    },
    {
      category: 'Collaboration',
      question: 'How do I build collaboration teams for multiple hires?',
      answer: 'Go to the Find Talent page and add creators to your Shortlist (Saved). Once added, navigate to the Team tab from your dashboard, click "Form a Team", specify the brief, assign role tags (such as UGC Creator or Video Editor), and send unified collab invites.'
    },
    {
      category: 'Account',
      question: 'How do I customize my brand portfolio guidelines kit?',
      answer: 'Open the Brand Kit sidebar tool from your dashboard. Here you can configure copyable hexadecimal color swatches, write standard tone of voice guidelines, upload logo source assets, and list explicit content DOs and DONTs for creators.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitting(true);

    setTimeout(() => {
      const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedTicketId(ticketId);
      setTicketSubmitting(false);
      setTicketSuccess(true);
      setTicketSubject('');
      setTicketMessage('');
    }, 1500);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput,
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    const inputVal = chatInput;
    setChatInput('');
    setIsAgentTyping(true);

    // Simulated helper replies
    setTimeout(() => {
      setIsAgentTyping(false);
      let agentReplyText = isCreator
        ? "I have queued your query with our creator & agency support team. We usually respond in under 5 minutes. Feel free to describe any relevant details or paste links here!"
        : "I have queued your query with our support representatives. We usually respond in under 5 minutes. Feel free to describe any relevant details or attach links here!";
      
      const textLower = inputVal.toLowerCase();
      if (textLower.includes('payment') || textLower.includes('escrow') || textLower.includes('release') || textLower.includes('earnings') || textLower.includes('withdraw') || textLower.includes('commission')) {
        agentReplyText = isCreator
          ? "Looking for your payout? Once deliverables are submitted, the brand is notified to release escrow. For agency accounts, released payouts clear to your agency balance, which can then distribute earnings to your internally managed creator pool. Check details in Dashboard -> Payments."
          : "Escrow release issue? Make sure you have checked the milestones table under Dashboard -> Payments. If your transaction shows 'held', click Release to credit the creator. Can I assist you further?";
      } else if (textLower.includes('match') || textLower.includes('score') || textLower.includes('creator') || textLower.includes('profile') || textLower.includes('agency')) {
        agentReplyText = isCreator
          ? "AI matchmaking matches profile tags, locations, and rates with active briefs. For agencies, matching calculations aggregate across your entire creator pool and specialties. Ensure details are up-to-date in Profile -> Edit Profile."
          : "Our match scores are based on tags and brief requirements. You can adjust your campaign brief parameters dynamically by clicking Edit Brief inside the My Campaigns workspace.";
      } else if (textLower.includes('team') || textLower.includes('collab')) {
        agentReplyText = isCreator
          ? "Team collaboration invitations appear in notifications. Once accepted, creators can coordinate milestone reviews and deliverables. Agencies can also build collaborative workspaces in Dashboard -> Team pipeline."
          : "Forming teams requires shortlisted creators. Ensure your candidate lists have been added to 'Saved', then assign them roles inside Dashboard -> Team assembler.";
      }

      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: agentReplyText,
        time: 'Just now'
      }]);
    }, 1200);
  };

  const handleQuickSuggestion = (text: string) => {
    setChatInput(text);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        animation: 'fadeIn 0.2s ease-out',
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '820px',
          height: '90vh',
          maxHeight: '620px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: `1px solid ${borderColor}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: isLight ? '#FCE7F3' : 'rgba(236, 72, 153, 0.1)',
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: primaryText, margin: 0 }}>Help & Support Center</h2>
              <span style={{ fontSize: '12px', color: secondaryText }}>Get assistance, troubleshoot problems, and contact representatives.</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: secondaryText,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '50%'
            }}
            className="hover-bg-white-002"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${borderColor}`, padding: '0 16px', backgroundColor: isLight ? '#F9FAFB' : '#0B0B0C' }}>
          {[
            { id: 'faq', label: 'Knowledge Base & FAQs', icon: <HelpCircle size={14} /> },
            { id: 'ticket', label: 'Submit Support Ticket', icon: <FileText size={14} /> },
            { id: 'chat', label: 'Live Support Chat', icon: <MessageSquare size={14} /> },
            { id: 'docs', label: 'Resources & Docs', icon: <FileText size={14} /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 18px',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? accentColor : secondaryText,
                  border: 'none',
                  borderBottom: `2.5px solid ${isActive ? accentColor : 'transparent'}`,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }} className="inner-scroller">
          
          {/* TAB 1: FAQ KNOWLEDGE BASE */}
          {activeTab === 'faq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
                <input
                  type="text"
                  placeholder="Search questions, keywords, payment guides..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    backgroundColor: isLight ? '#F3F4F6' : '#141417',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '12px',
                    paddingLeft: '40px',
                    paddingRight: '12px',
                    fontSize: '13px',
                    color: primaryText,
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  className="support-input-focus"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${borderColor}`,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'all 0.2s'
                      }}
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{
                            fontSize: '9.5px',
                            fontWeight: 800,
                            backgroundColor: isLight ? '#FCE7F3' : 'rgba(236,72,153,0.1)',
                            color: accentColor,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                          }}>{faq.category}</span>
                          <span style={{ fontSize: '13.5px', fontWeight: 650, color: primaryText }}>{faq.question}</span>
                        </div>
                        {isExpanded ? <ChevronDown size={16} style={{ color: mutedText }} /> : <ChevronRight size={16} style={{ color: mutedText }} />}
                      </button>
                      
                      {isExpanded && (
                        <div style={{
                          padding: '0 16px 16px 16px',
                          fontSize: '13px',
                          color: secondaryText,
                          lineHeight: '1.5',
                          borderTop: `1px solid ${borderColor}`,
                          paddingTop: '12px'
                        }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredFaqs.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', color: mutedText }}>
                    <AlertCircle size={28} style={{ marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontSize: '13px' }}>No FAQ articles match "{faqSearch}". Try searching for payments or briefs.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SUPPORT TICKET */}
          {activeTab === 'ticket' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {ticketSuccess ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  backgroundColor: isLight ? '#F0FDF4' : 'rgba(16,185,129,0.04)',
                  border: `1.5px solid ${isLight ? '#DCFCE7' : 'rgba(16,185,129,0.12)'}`,
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <CheckCircle2 size={38} style={{ color: '#10B981' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: primaryText, margin: 0 }}>Support Ticket Submitted</h3>
                  <p style={{ fontSize: '13px', color: secondaryText, margin: 0, maxWidth: '400px', lineHeight: '1.4' }}>
                    Your support request was logged successfully. A dedicated support specialist has been assigned to evaluate your inquiry.
                  </p>
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: isLight ? '#FFFFFF' : '#141417',
                    border: `1px solid ${borderColor}`,
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: primaryText
                  }}>
                    Reference Ticket ID: <span style={{ color: accentColor }}>{generatedTicketId}</span>
                  </div>
                  <button
                    onClick={() => setTicketSuccess(false)}
                    style={{
                      marginTop: '16px',
                      backgroundColor: 'transparent',
                      border: `1.5px solid ${borderColor}`,
                      color: primaryText,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    className="hover-bg-white-002"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    
                    {/* Category Select */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Inquiry Category</label>
                      <select
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        style={{
                          height: '38px',
                          borderRadius: '8px',
                          border: `1px solid ${borderColor}`,
                          backgroundColor: isLight ? '#FFFFFF' : '#141417',
                          color: primaryText,
                          padding: '0 10px',
                          fontSize: '13px',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Campaign Setup">Campaign Setup</option>
                        <option value="Payments & Escrow">Payments & Escrow</option>
                        <option value="Creator Matching">Creator Matching</option>
                        <option value="Bug / Technical Issue">Bug / Technical Issue</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Priority Select */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Priority Level</label>
                      <select
                        value={ticketPriority}
                        onChange={(e) => setTicketPriority(e.target.value)}
                        style={{
                          height: '38px',
                          borderRadius: '8px',
                          border: `1px solid ${borderColor}`,
                          backgroundColor: isLight ? '#FFFFFF' : '#141417',
                          color: primaryText,
                          padding: '0 10px',
                          fontSize: '13px',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Low">Low (No rush)</option>
                        <option value="Medium">Medium (General support)</option>
                        <option value="High">High (Impacting campaign run)</option>
                        <option value="Critical">Critical (Immediate block)</option>
                      </select>
                    </div>

                  </div>

                  {/* Subject input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Subject / Brief Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Cannot release escrow for Skincare Campaign"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      required
                      style={{
                        height: '38px',
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: isLight ? '#FFFFFF' : '#141417',
                        color: primaryText,
                        padding: '0 12px',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                      className="support-input-focus"
                    />
                  </div>

                  {/* Description message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Detailed Query / Explanation</label>
                    <textarea
                      placeholder="Explain what happened, including milestone tags or steps to replicate..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      required
                      rows={5}
                      style={{
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: isLight ? '#FFFFFF' : '#141417',
                        color: primaryText,
                        padding: '12px',
                        fontSize: '13px',
                        outline: 'none',
                        resize: 'none',
                        fontFamily: 'inherit'
                      }}
                      className="support-input-focus"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={ticketSubmitting}
                    style={{
                      height: '42px',
                      backgroundColor: accentColor,
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: ticketSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '8px',
                      boxShadow: '0 4px 12px rgba(236,72,153,0.2)'
                    }}
                    className="glow-button"
                  >
                    {ticketSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: LIVE SUPPORT CHAT */}
          {activeTab === 'chat' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '360px',
              backgroundColor: isLight ? '#F9FAFB' : '#101012',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              overflow: 'hidden'
            }}>
              {/* Agent status header */}
              <div style={{
                padding: '12px 16px',
                borderBottom: `1px solid ${borderColor}`,
                backgroundColor: isLight ? '#FFFFFF' : '#141417',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: accentColor,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800
                    }}>
                      MAX
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#10B981',
                      borderRadius: '50%',
                      border: `1.5px solid ${isLight ? '#FFFFFF' : '#141417'}`
                    }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText, margin: 0 }}>Max (Support AI Agent)</h4>
                    <span style={{ fontSize: '10.5px', color: mutedText }}>Support Coordinator • Active now</span>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={11} />
                  <span>AI Assistant Live</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }} className="inner-scroller">
                {chatMessages.map(msg => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        justifyContent: isUser ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        maxWidth: '80%',
                        padding: '10px 14px',
                        borderRadius: '16px',
                        borderTopRightRadius: isUser ? '4px' : '16px',
                        borderTopLeftRadius: isUser ? '16px' : '4px',
                        backgroundColor: isUser
                          ? accentColor
                          : (isLight ? '#FFFFFF' : '#1E1E22'),
                        color: isUser ? '#FFFFFF' : primaryText,
                        fontSize: '12.5px',
                        lineHeight: '1.4',
                        boxShadow: isUser ? 'none' : '0 2px 4px rgba(0,0,0,0.02)',
                        border: isUser ? 'none' : `1px solid ${borderColor}`
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                {isAgentTyping && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      backgroundColor: isLight ? '#FFFFFF' : '#1E1E22',
                      border: `1px solid ${borderColor}`,
                      padding: '8px 14px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span className="dot-typing" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: mutedText }} />
                      <span className="dot-typing" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: mutedText, animationDelay: '0.2s' }} />
                      <span className="dot-typing" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: mutedText, animationDelay: '0.4s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions chips */}
              <div style={{ display: 'flex', gap: '8px', padding: '0 16px 10px 16px', overflowX: 'auto', flexWrap: 'nowrap' }} className="inner-scroller">
                {(isCreator ? [
                  "Escrow payout for agencies vs creators",
                  "Agency pool setup & starting budgets",
                  "Submitting drafts for review",
                  "AI matchmaking compatibility rankings"
                ] : [
                  "Release payment escrow problem",
                  "Forming collaborator team",
                  "AI matchmaking rankings query"
                ]).map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickSuggestion(sug)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: `1.5px solid ${borderColor}`,
                      backgroundColor: isLight ? '#FFFFFF' : '#141417',
                      color: secondaryText,
                      fontSize: '11px',
                      fontWeight: 650,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s'
                    }}
                    className="hover-bg-white-002"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Chat Form */}
              <form onSubmit={handleSendChatMessage} style={{
                padding: '12px 16px',
                borderTop: `1px solid ${borderColor}`,
                backgroundColor: isLight ? '#FFFFFF' : '#141417',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder="Ask a support question here..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{
                    flex: 1,
                    height: '38px',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    backgroundColor: isLight ? '#F3F4F6' : '#1E1E22',
                    color: primaryText,
                    fontSize: '12.5px',
                    padding: '0 12px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: accentColor,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: RESOURCES & DOCS */}
          {activeTab === 'docs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText, margin: 0 }}>Platform Manuals & Outlines</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {(isCreator ? [
                  {
                    title: 'Creator & Agency Integration Guidelines',
                    desc: 'A full checklist detailing how to set up payment withdrawal accounts, register agency portfolios, submit drafts, and review brief specifications.',
                    size: '2.5 MB'
                  },
                  {
                    title: 'Milestone Delivery Best Practices',
                    desc: 'Tips for video hooks, transitions, and audio sync methods to get brand draft approvals on first submission.',
                    size: '1.9 MB'
                  },
                  {
                    title: 'Creator & Agency Partnership Strategy',
                    desc: 'A guide containing customizable outreach triggers, talent pool management recommendations, and group pitch structures.',
                    size: '2.1 MB'
                  },
                  {
                    title: 'Escrow Security & Agreement Info',
                    desc: 'Official rules governing individual creator payouts, agency balance releases, and dispute resolution workflows.',
                    size: '1.2 MB'
                  }
                ] : [
                  {
                    title: 'Brand Integration Guidelines',
                    desc: 'A full PDF checklist describing how to wire escrow accounts, deposit limits, and creative briefs.',
                    size: '2.4 MB'
                  },
                  {
                    title: 'Creator Outreach Best Practices',
                    desc: 'A guide containing customizable invite triggers, messaging hooks, and rate calculations.',
                    size: '1.8 MB'
                  },
                  {
                    title: 'Escrow Account Agreement Model',
                    desc: 'Official licensing and escrow transaction parameters defining milestone validations.',
                    size: '1.2 MB'
                  },
                  {
                    title: 'System Licensing & Terms of Use',
                    desc: 'Standard platform licensing agreements, copyright transfers, and legal criteria.',
                    size: '780 KB'
                  }
                ]).map((doc, idx) => (
                  <div
                    key={idx}
                    onClick={() => alert(`Simulating download for: ${doc.title}...`)}
                    style={{
                      backgroundColor: cardBg,
                      border: `1.5px dashed ${borderColor}`,
                      borderRadius: '16px',
                      padding: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      transition: 'all 0.2s'
                    }}
                    className="doc-card-hover"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <FileText size={22} style={{ color: accentColor }} />
                      <span style={{ fontSize: '10px', fontWeight: 700, color: mutedText }}>{doc.size}</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 750, color: primaryText, margin: 0 }}>{doc.title}</h4>
                      <p style={{ fontSize: '11px', color: secondaryText, margin: '6px 0 0 0', lineHeight: '1.4' }}>{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      <style jsx global>{`
        .support-input-focus:focus {
          border-color: rgba(236,72,153,0.3) !important;
        }
        
        .doc-card-hover:hover {
          transform: translateY(-2px);
          border-color: #EC4899 !important;
          background-color: ${isLight ? 'rgba(236,72,153,0.01)' : 'rgba(236,72,153,0.02)'} !important;
        }

        .dot-typing {
          display: inline-block;
          animation: dot-elastic 1.2s infinite ease-in-out;
        }
        @keyframes dot-elastic {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .animate-spin {
          animation: spin-kf 1s linear infinite;
        }
        @keyframes spin-kf {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
