'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard/useDashboardStore';
import { useMessageStore } from '@/store/messages/useMessageStore';
import {
  Search, Send, Phone, Video, Info, Paperclip, Smile, Folder, 
  User, FileText, Star, AlertTriangle, Bell, MoreVertical, 
  Check, CheckCheck, Download, SquarePen, View
} from 'lucide-react';

interface MessagesViewProps {
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

interface ChatMessage {
  id: string;
  sender: 'brand' | 'creator';
  text: string;
  time: string;
  isAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
}

interface ChatItem {
  id: string;
  name: string;
  logo: string;
  logoBg?: string;
  logoColor?: string;
  verified: boolean;
  campaign: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  messages: ChatMessage[];
  brandManager: string;
  dueDate: string;
}

export default function CreatorMessagesView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: MessagesViewProps) {
  const { user, creator } = useDashboardStore();
  const profile = creator.profile;
  const firstName = profile?.name ? profile.name.split(' ')[0] : (user?.name ? user.name.split(' ')[0] : 'Ananya');
  const isBrandRole = user?.role === 'brand';

  const { chats, activeChatId, setActiveChatId, sendMessage } = useMessageStore();
  const [inboxSearch, setInboxSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'projects' | 'offers'>('all');
  const [messageText, setMessageText] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of message feed
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChatId]);

  // Mark currently active chat as read on mount
  useEffect(() => {
    setActiveChatId(activeChatId);
  }, []);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    sendMessage(activeChatId, messageText);
    setMessageText('');
  };

  // Filter chats based on tab and search query
  const filteredChats = chats.filter(chat => {
    const matchesSearch =
      chat.name.toLowerCase().includes(inboxSearch.toLowerCase()) ||
      chat.campaign.toLowerCase().includes(inboxSearch.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(inboxSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'unread') return chat.unreadCount > 0;
    if (activeTab === 'projects') return chat.campaign.includes('Campaign') || chat.campaign.includes('Program') || chat.campaign.includes('Collaboration');
    if (activeTab === 'offers') return chat.campaign.includes('Review');

    return true;
  });

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 72px)',
        marginTop: '-12px',
        marginLeft: '-24px',
        marginRight: '-24px',
        marginBottom: '-24px',
        backgroundColor: isLight ? '#FFFFFF' : '#09090B',
        overflow: 'hidden',
        borderTop: `1px solid ${borderColor}`
      }}
    >
      {/* 1. Left Panel: Chats List */}
      <div
        style={{
          width: '350px',
          flexShrink: 0,
          borderRight: `1px solid ${borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: isLight ? '#FFFFFF' : '#0D0D10'
        }}
      >
        {/* Left Panel Header */}
        <div style={{ padding: '20px 20px 12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: primaryText, margin: 0 }}>
            Messages
          </h2>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: secondaryText,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.03)'
            }}
            onClick={() => alert('Compose new message...')}
          >
            <SquarePen size={16} />
          </button>
        </div>

        {/* Search Input */}
        <div style={{ padding: '0 20px 12px 20px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: mutedText }} />
            <input
              type="text"
              placeholder="Search messages..."
              value={inboxSearch}
              onChange={(e) => setInboxSearch(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${borderColor}`,
                borderRadius: '10px',
                padding: '8px 12px 8px 36px',
                fontSize: '13px',
                color: primaryText,
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Filters Row */}
        <div style={{ padding: '0 20px 16px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }} className="inner-scroller">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread', badge: chats.filter(c => c.unreadCount > 0).length },
            { key: 'projects', label: 'Projects' },
            { key: 'offers', label: 'Offers' }
          ].map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  backgroundColor: isActive ? (isLight ? '#FFF2F8' : 'rgba(236,72,153,0.1)') : 'transparent',
                  border: `1px solid ${isActive ? '#EC4899' : borderColor}`,
                  color: isActive ? '#EC4899' : secondaryText,
                  borderRadius: '20px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: '#EC4899',
                      color: '#FFFFFF',
                      borderRadius: '50%',
                      fontSize: '9px',
                      fontWeight: 700,
                      width: '14px',
                      height: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Chats List Area */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }} className="inner-scroller">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => {
              const isActive = chat.id === activeChatId;
              const hasUnread = chat.unreadCount > 0;
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    borderBottom: `1px solid ${borderColor}`,
                    cursor: 'pointer',
                    backgroundColor: isActive 
                      ? (isLight ? '#FFF2F8' : 'rgba(236,72,153,0.06)') 
                      : 'transparent',
                    transition: 'background-color 0.2s'
                  }}
                  className="hover-bg-white-001"
                >
                  {/* Chat Avatar */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isBrandRole ? 'rgba(236,72,153,0.06)' : (chat.logoBg || '#F3F4F6'),
                      color: isBrandRole ? '#EC4899' : (chat.logoColor || '#374151'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: isBrandRole ? '14px' : (chat.logo.length > 2 ? '10px' : '14px'),
                      fontWeight: 800,
                      flexShrink: 0,
                      border: `1px solid ${borderColor}`,
                      overflow: 'hidden'
                    }}
                  >
                    {isBrandRole ? (
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                        alt="Ananya Sharma" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      chat.logo.length > 3 ? chat.logo.substring(0, 3) : chat.logo
                    )}
                  </div>

                  {/* Chat Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 750, color: primaryText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {isBrandRole ? 'Ananya Sharma' : chat.name}
                        </span>
                        {chat.verified && (
                          <span style={{ color: '#3B82F6', display: 'flex', flexShrink: 0 }}>
                            <Check size={12} strokeWidth={4} />
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '11px', color: mutedText, fontWeight: 500 }}>
                        {chat.time}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: secondaryText, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                      {chat.campaign}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: hasUnread ? primaryText : mutedText, fontWeight: hasUnread ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, paddingRight: '8px' }}>
                        {chat.lastMessage.replace(/Ananya/g, firstName)}
                      </span>
                      {hasUnread && (
                        <span
                          style={{
                            backgroundColor: '#EC4899',
                            color: '#FFFFFF',
                            borderRadius: '50%',
                            fontSize: '9.5px',
                            fontWeight: 750,
                            width: '16px',
                            height: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: mutedText, fontSize: '13px' }}>
              No chats found
            </div>
          )}
        </div>
      </div>

      {/* 2. Middle Panel: Chat Feed */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: isLight ? '#FCFCFD' : '#09090B',
          borderRight: `1px solid ${borderColor}`
        }}
      >
        {/* Middle Header */}
        <div
          style={{
            height: '70px',
            borderBottom: `1px solid ${borderColor}`,
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            backgroundColor: isLight ? '#FFFFFF' : '#0D0D10'
          }}
        >
          {/* Active Partner Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: isBrandRole ? 'rgba(236,72,153,0.06)' : (activeChat.logoBg || '#F3F4F6'),
                color: isBrandRole ? '#EC4899' : (activeChat.logoColor || '#374151'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 800,
                border: `1px solid ${borderColor}`,
                overflow: 'hidden'
              }}
            >
              {isBrandRole ? (
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                  alt="Ananya Sharma" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                activeChat.logo.length > 2 ? activeChat.logo.substring(0, 1) : activeChat.logo
              )}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText }}>
                  {isBrandRole ? 'Ananya Sharma' : activeChat.name}
                </span>
                {activeChat.verified && (
                  <span style={{ color: '#3B82F6', display: 'flex' }}>
                    <Check size={13} strokeWidth={4} />
                  </span>
                )}
              </div>
              <div style={{ fontSize: '11px', color: mutedText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeChat.campaign}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {[
              { icon: <Phone size={15} />, onClick: () => alert('Initiating voice call...') },
              { icon: <Video size={15} />, onClick: () => alert('Initiating video call...') },
              { icon: <Info size={15} style={{ color: isInfoOpen ? accentColor : undefined }} />, onClick: () => setIsInfoOpen(!isInfoOpen) }
            ].map((btn, index) => (
              <button
                key={index}
                onClick={btn.onClick}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderColor}`,
                  color: secondaryText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                className="hover-bg-white-002"
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Feed List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
          className="inner-scroller"
        >
          {/* Today Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 600,
                color: mutedText,
                backgroundColor: isLight ? '#E5E7EB' : 'rgba(255,255,255,0.04)',
                padding: '4px 10px',
                borderRadius: '8px'
              }}
            >
              Today
            </span>
          </div>

          {/* Render Messages */}
          {activeChat.messages.map((msg) => {
            const isOwnMessage = isBrandRole ? msg.sender === 'brand' : msg.sender === 'creator';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: '8px',
                  width: '100%'
                }}
              >
                {/* Partner Avatar left side */}
                {!isOwnMessage && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isBrandRole ? 'rgba(236,72,153,0.06)' : (activeChat.logoBg || '#F3F4F6'),
                      color: isBrandRole ? '#EC4899' : (activeChat.logoColor || '#374151'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 800,
                      border: `1px solid ${borderColor}`,
                      marginBottom: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    {isBrandRole ? (
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                        alt="Ananya Sharma" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      activeChat.logo.length > 2 ? activeChat.logo.substring(0, 1) : activeChat.logo
                    )}
                  </div>
                )}

                {/* Bubble details */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isOwnMessage ? 'flex-end' : 'flex-start', maxWidth: '65%' }}>
                  
                  {/* Attachment Item */}
                  {msg.isAttachment ? (
                    <div
                      style={{
                        backgroundColor: cardBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '12px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#FEE2E2',
                          color: '#EF4444',
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 750,
                          fontSize: '11px',
                          border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}
                      >
                        PDF
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: 650, color: primaryText }}>
                          {msg.attachmentName}
                        </span>
                        <span style={{ fontSize: '11px', color: mutedText, marginTop: '2px' }}>
                          {msg.attachmentSize}
                        </span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading ${msg.attachmentName}...`)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: secondaryText,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                          borderRadius: '6px',
                          marginLeft: '8px'
                        }}
                        className="hover-bg-white-002"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  ) : (
                    /* Normal Bubble text */
                    <div
                      style={{
                        backgroundColor: isOwnMessage 
                          ? (isLight ? '#FFF2F8' : 'rgba(236,72,153,0.1)')
                          : (isLight ? '#F3F4F6' : 'rgba(255,255,255,0.04)'),
                        border: isOwnMessage ? '1px solid rgba(236,72,153,0.15)' : 'none',
                        color: primaryText,
                        padding: '12px 16px',
                        borderRadius: isOwnMessage ? '12px 12px 0 12px' : '0 12px 12px 12px',
                        fontSize: '13.5px',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {msg.text.replace(/Ananya/g, firstName)}
                    </div>
                  )}

                  {/* Time & Read indicators below bubble */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', padding: '0 2px' }}>
                    <span style={{ fontSize: '10px', color: mutedText, fontWeight: 500 }}>
                      {msg.time}
                    </span>
                    {isOwnMessage && (
                      <span style={{ color: '#EC4899', display: 'flex' }}>
                        <CheckCheck size={12} strokeWidth={2.5} />
                      </span>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Message Bottom Bar */}
        <form
          onSubmit={handleSendMessage}
          style={{
            padding: '16px 24px',
            borderTop: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: isLight ? '#FFFFFF' : '#0D0D10',
            flexShrink: 0
          }}
        >
          {/* Attachment Paperclip */}
          <button
            type="button"
            onClick={() => alert('Choose attachment file...')}
            style={{
              background: 'none',
              border: `1px solid ${borderColor}`,
              color: secondaryText,
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: isLight ? '#FFFFFF' : 'transparent'
            }}
            className="hover-bg-white-002"
          >
            <Paperclip size={16} />
          </button>

          {/* Text Input Pill Container */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${borderColor}`,
                borderRadius: '999px',
                paddingLeft: '16px',
                paddingRight: '44px',
                fontSize: '13px',
                color: primaryText,
                outline: 'none'
              }}
            />
            
            {/* Smile Emoji selector */}
            <button
              type="button"
              onClick={() => alert('Emoji keyboard...')}
              style={{
                position: 'absolute',
                right: '14px',
                background: 'none',
                border: 'none',
                color: mutedText,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                borderRadius: '50%'
              }}
              className="hover-color-accent"
            >
              <Smile size={16} />
            </button>
          </div>

          {/* Send Action */}
          <button
            type="submit"
            style={{
              backgroundColor: messageText.trim() ? accentColor : '#9CA3AF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              height: '38px',
              padding: '0 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: messageText.trim() ? 'pointer' : 'default',
              fontSize: '13px',
              fontWeight: 700,
              boxShadow: messageText.trim() ? `0 2px 8px rgba(236,72,153,0.2)` : 'none',
              transition: 'all 0.2s'
            }}
            disabled={!messageText.trim()}
          >
            <Send size={12} fill="#FFFFFF" />
            <span>Send</span>
          </button>
        </form>
      </div>

      {/* 3. Right Panel: Metadata details */}
      {isInfoOpen && (
        <div
          style={{
            width: '320px',
            flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: isLight ? '#FFFFFF' : '#0D0D10',
          padding: '24px',
          gap: '24px',
          overflowY: 'auto'
        }}
        className="inner-scroller"
      >
        {/* Section 1: Header */}
        <div>
          <h4 style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            About this conversation
          </h4>
        </div>

        {/* Section 2: Brand Profile Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingBottom: '16px', borderBottom: `1px solid ${borderColor}` }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: isBrandRole ? 'rgba(236,72,153,0.06)' : (activeChat.logoBg || '#F3F4F6'),
              color: isBrandRole ? '#EC4899' : (activeChat.logoColor || '#374151'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 800,
              border: `1px solid ${borderColor}`,
              marginBottom: '10px',
              overflow: 'hidden'
            }}
          >
            {isBrandRole ? (
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                alt="Ananya Sharma" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              activeChat.logo.length > 2 ? activeChat.logo.substring(0, 1) : activeChat.logo
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            <span style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText }}>
              {isBrandRole ? 'Ananya Sharma' : activeChat.name}
            </span>
            {activeChat.verified && (
              <span style={{ color: '#3B82F6', display: 'flex' }}>
                <Check size={13} strokeWidth={4} />
              </span>
            )}
          </div>
          <button
            onClick={() => alert(`Redirecting to view ${isBrandRole ? 'Creator' : activeChat.name} Profile...`)}
            style={{
              background: 'none',
              border: 'none',
              color: accentColor,
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '4px',
              padding: '2px 6px',
              borderRadius: '4px'
            }}
            className="hover-underline"
          >
            {isBrandRole ? 'View Creator Profile' : 'View Brand Profile'}
          </button>
        </div>

        {/* Section 3: Project Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            Project
          </h4>
          <div
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}
          >
            <div
              style={{
                backgroundColor: isLight ? '#EFF6FF' : 'rgba(59,130,246,0.1)',
                color: '#3B82F6',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `1px solid ${isLight ? '#DBEAFE' : 'rgba(59,130,246,0.2)'}`
              }}
            >
              <Folder size={15} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 750, color: primaryText, lineHeight: 1.3 }}>
                {activeChat.campaign}
              </span>
              <div>
                <span
                  style={{
                    backgroundColor: isLight ? '#D1FAE5' : 'rgba(16,185,129,0.15)',
                    color: '#10B981',
                    fontSize: '9px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}
                >
                  In Progress
                </span>
              </div>
              <span style={{ fontSize: '10.5px', color: mutedText, marginTop: '2px', fontWeight: 500 }}>
                Due: {activeChat.dueDate}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Participants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
            Participants
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Participant 1: Creator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                alt="Ananya Sharma"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `1px solid ${borderColor}`
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText }}>
                  Ananya Sharma (You)
                </span>
                <span style={{ fontSize: '10.5px', color: mutedText }}>
                  Creator
                </span>
              </div>
            </div>

            {/* Participant 2: Brand Manager */}
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isBrandRole ? 'rgba(236,72,153,0.06)' : (activeChat.logoBg || '#F3F4F6'),
                  color: isBrandRole ? '#EC4899' : (activeChat.logoColor || '#374151'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 800,
                  border: `1px solid ${borderColor}`,
                  overflow: 'hidden'
                }}
              >
                {isBrandRole ? (
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                    alt="Ananya Sharma" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  activeChat.logo.length > 2 ? activeChat.logo.substring(0, 1) : activeChat.logo
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: primaryText }}>
                  {activeChat.brandManager}
                </span>
                <span style={{ fontSize: '10.5px', color: mutedText }}>
                  {isBrandRole ? 'Brand Representative' : 'Brand Manager'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Shared Files */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, color: mutedText, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Shared Files
            </h4>
            <button
              onClick={() => alert('View all shared files...')}
              style={{ background: 'none', border: 'none', color: accentColor, fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
              className="hover-underline"
            >
              View all
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Campaign_Brief_Mamaearth.pdf', size: '2.4 MB', type: 'PDF', iconBg: '#FEE2E2', iconColor: '#EF4444' },
              { name: 'Product_Images.zip', size: '18.7 MB', type: 'ZIP', iconBg: '#E0F2FE', iconColor: '#0284C7' }
            ].map((file, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  backgroundColor: isLight ? '#F9FAFB' : 'rgba(255,255,255,0.01)'
                }}
              >
                <div
                  style={{
                    backgroundColor: file.iconBg,
                    color: file.iconColor,
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '9px',
                    border: `1px solid rgba(0,0,0,0.02)`
                  }}
                >
                  {file.type}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 650, color: primaryText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </span>
                  <span style={{ fontSize: '10px', color: mutedText, marginTop: '1px' }}>
                    {file.size} • {file.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: `1px solid ${borderColor}` }}>
          
          {/* Mute notifications */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', color: secondaryText, fontWeight: 550 }}>
              Mute notifications
            </span>
            <div
              onClick={() => setIsMuted(!isMuted)}
              style={{
                width: '36px',
                height: '20px',
                borderRadius: '999px',
                backgroundColor: isMuted ? accentColor : (isLight ? '#E5E7EB' : 'rgba(255,255,255,0.15)'),
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  position: 'absolute',
                  top: '2px',
                  left: isMuted ? '18px' : '2px',
                  transition: 'left 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>

          {/* Mark as important */}
          <button
            onClick={() => {
              setIsStarred(!isStarred);
              alert(isStarred ? 'Removed from important chats' : 'Marked chat as important');
            }}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '4px 0',
              cursor: 'pointer',
              color: secondaryText,
              fontSize: '12.5px',
              fontWeight: 555
            }}
            className="hover-opacity-80"
          >
            <span>Mark as important</span>
            <Star size={15} fill={isStarred ? '#F59E0B' : 'none'} color={isStarred ? '#F59E0B' : secondaryText} />
          </button>

          {/* Report conversation */}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to report this brand conversation to support?')) {
                alert('Conversation reported. Support will review the logs.');
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '4px 0',
              cursor: 'pointer',
              color: '#EF4444',
              fontSize: '12.5px',
              fontWeight: 555
            }}
            className="hover-opacity-80"
          >
            <span>Report conversation</span>
            <AlertTriangle size={15} />
          </button>

        </div>
      </div>
    )}
  </div>
);
}
