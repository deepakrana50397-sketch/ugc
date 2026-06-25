'use client';

import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  sender: 'brand' | 'creator';
  text: string;
  time: string;
  isAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface ChatItem {
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

interface MessageStore {
  chats: ChatItem[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  getUnreadCount: () => number;
}

const INITIAL_CHATS: ChatItem[] = [
  {
    id: 'mamaearth',
    name: 'Mamaearth',
    logo: 'M',
    logoBg: '#22C55E',
    logoColor: '#FFFFFF',
    verified: true,
    campaign: 'UGC Creator for Skincare Brand',
    lastMessage: 'Hi Ananya, we loved your portfolio!',
    time: '10:30 AM',
    unreadCount: 2,
    brandManager: 'Riya Mehta',
    dueDate: '28 Jun 2024',
    messages: [
      {
        id: 'm1',
        sender: 'brand',
        text: "Hi Ananya! 👋 We loved your application and portfolio. We'd like to move forward with you for our new skincare campaign.",
        time: '10:30 AM'
      },
      {
        id: 'm2',
        sender: 'creator',
        text: "Hi! Thank you so much 🌟 I'm super excited about this opportunity. Please let me know the next steps.",
        time: '10:32 AM'
      },
      {
        id: 'm3',
        sender: 'brand',
        text: 'Great! Please check the campaign brief attached below and let us know if you have any questions.',
        time: '10:33 AM'
      },
      {
        id: 'm4',
        sender: 'brand',
        text: '',
        time: '10:33 AM',
        isAttachment: true,
        attachmentName: 'Campaign_Brief_Mamaearth.pdf',
        attachmentSize: '2.4 MB'
      },
      {
        id: 'm5',
        sender: 'creator',
        text: "Thanks! I'll go through the brief and get back to you.",
        time: '10:35 AM'
      },
      {
        id: 'm6',
        sender: 'brand',
        text: 'Perfect! Looking forward to working with you. Have a great day! 🌱',
        time: '10:36 AM'
      }
    ]
  },
  {
    id: 'glow_co',
    name: 'Glow & Co.',
    logo: 'GLOW & CO.',
    logoBg: '#000000',
    logoColor: '#FFFFFF',
    verified: false,
    campaign: 'Instagram Reels Campaign',
    lastMessage: 'Please share the final video',
    time: 'Yesterday',
    unreadCount: 1,
    brandManager: 'Sarah Jenkins',
    dueDate: '05 Jul 2024',
    messages: [
      {
        id: 'g1',
        sender: 'brand',
        text: 'Welcome to the Reels Campaign! We need 3 drafts by Friday.',
        time: '2:15 PM'
      },
      {
        id: 'g2',
        sender: 'creator',
        text: 'Sure, I will share the visual concept drafts tonight.',
        time: '3:00 PM'
      },
      {
        id: 'g3',
        sender: 'brand',
        text: 'Please share the final video',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    logo: 'S',
    logoBg: '#FC8019',
    logoColor: '#FFFFFF',
    verified: false,
    campaign: 'Campus Ambassador Program',
    lastMessage: 'Thanks for applying!',
    time: 'Yesterday',
    unreadCount: 0,
    brandManager: 'Aditya Sen',
    dueDate: '12 Jul 2024',
    messages: [
      {
        id: 's1',
        sender: 'brand',
        text: 'Thanks for applying! We received your campus stats and would love to schedule a brief panel chat.',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'boat',
    name: 'boAt Lifestyle',
    logo: 'boAt',
    logoBg: '#09090B',
    logoColor: '#FFFFFF',
    verified: true,
    campaign: 'Tech Review Campaign',
    lastMessage: 'Can we schedule a quick call?',
    time: '2 days ago',
    unreadCount: 0,
    brandManager: 'Karan Malhotra',
    dueDate: '20 Jun 2024',
    messages: [
      {
        id: 'b1',
        sender: 'brand',
        text: 'Hey! We loved your sound review shorts. Can we schedule a quick call?',
        time: '2 days ago'
      }
    ]
  },
  {
    id: 'redbull',
    name: 'Red Bull',
    logo: 'RB',
    logoBg: '#0B2347',
    logoColor: '#FFFFFF',
    verified: true,
    campaign: 'Event Coverage',
    lastMessage: "Here's the event brief for you.",
    time: '3 days ago',
    unreadCount: 0,
    brandManager: 'Vikram Rathore',
    dueDate: '15 Jun 2024',
    messages: [
      {
        id: 'r1',
        sender: 'brand',
        text: "Here's the event brief for you. Let us know if you need back-stage credentials.",
        time: '3 days ago'
      }
    ]
  },
  {
    id: 'souled_store',
    name: 'The Souled Store',
    logo: 'TSS',
    logoBg: '#111827',
    logoColor: '#FFFFFF',
    verified: false,
    campaign: 'Brand Collaboration',
    lastMessage: "Let's create something amazing!",
    time: '4 days ago',
    unreadCount: 0,
    brandManager: 'Nisha Kapoor',
    dueDate: '30 Jun 2024',
    messages: [
      {
        id: 'ts1',
        sender: 'brand',
        text: 'Hey Ananya, your apparel haul concept was approved. Let\'s create something amazing!',
        time: '4 days ago'
      }
    ]
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    logo: 'M',
    logoBg: '#18181B',
    logoColor: '#FFFFFF',
    verified: true,
    campaign: 'Skincare Review',
    lastMessage: 'Payment has been released.',
    time: '5 days ago',
    unreadCount: 0,
    brandManager: 'Rohit Shah',
    dueDate: '10 Jun 2024',
    messages: [
      {
        id: 'mn1',
        sender: 'brand',
        text: 'Your video content is live. Payment has been released.',
        time: '5 days ago'
      }
    ]
  }
];

export const useMessageStore = create<MessageStore>((set, get) => ({
  chats: INITIAL_CHATS,
  activeChatId: 'mamaearth',
  setActiveChatId: (id) => {
    set((state) => {
      const updatedChats = state.chats.map((c) =>
        c.id === id ? { ...c, unreadCount: 0 } : c
      );
      return {
        activeChatId: id,
        chats: updatedChats
      };
    });
  },
  sendMessage: (chatId, text) => {
    set((state) => {
      const updatedChats = state.chats.map((c) => {
        if (c.id === chatId) {
          const newMsg: ChatMessage = {
            id: `m_sent_${Date.now()}`,
            sender: 'creator',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...c,
            lastMessage: text,
            time: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      });
      return { chats: updatedChats };
    });
  },
  getUnreadCount: () => {
    return get().chats.reduce((sum, c) => sum + c.unreadCount, 0);
  }
}));
