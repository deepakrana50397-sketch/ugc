'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles, Copy, Check, RotateCcw, Send, Video,
  MessageSquare, Trash2, Flame, RefreshCw, Bookmark, CheckCircle2, Volume2
} from 'lucide-react';

interface AiAssistantViewProps {
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

interface SavedScript {
  id: string;
  title: string;
  platform: string;
  concept: string;
  hooks: string[];
  scriptSteps: { time: string; visual: string; audio: string }[];
  caption: string;
  hashtags: string[];
  savedAt: string;
}

// Preset Quick Ideas for Content Generation (Offline Sandbox Mode)
const QUICK_IDEAS = [
  { title: 'Skincare Glow Ritual', platform: 'Instagram Reels', niche: 'Beauty & Skincare', concept: 'Morning skincare routine showing quick absorbing glow drops.' },
  { title: 'ANC Headphones Review', platform: 'YouTube Shorts', niche: 'Tech & Gadgets', concept: 'Silent audio switch test in a noisy coffee shop.' },
  { title: 'High-Protein Oats', platform: 'TikTok', niche: 'Fitness & Health', concept: '5-minute breakfast prep for busy morning routines.' }
];

// Pre-seeded AI chat history
const INITIAL_CHAT_MESSAGES = [
  { sender: 'ai', text: "Hey! I am your AI UGC Content Coach. Need an engaging hook, a script review, or advice on how to pitch to brands? Let me know what you're working on!" },
];

export default function CreatorAiAssistantView({
  theme,
  isLight,
  cardBg,
  borderColor,
  primaryText,
  secondaryText,
  mutedText,
  accentColor,
  shadowStyle
}: AiAssistantViewProps) {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'generator' | 'ideas' | 'saved' | 'chat'>('generator');

  // API Key config states (User-provided keys for direct client-side query)
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Generator inputs
  const [platform, setPlatform] = useState('Instagram Reels');
  const [brandName, setBrandName] = useState('');
  const [niche, setNiche] = useState('Beauty & Skincare');
  const [concept, setConcept] = useState('');
  const [hookType, setHookType] = useState('FOMO (Fear of Missing Out)');
  const [tone, setTone] = useState('Relatable & Storytelling');

  // Generator Output states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedScript, setGeneratedScript] = useState<SavedScript | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Trending Ideas Niche selector & states
  const [selectedNiche, setSelectedNiche] = useState('Beauty & Wellness');
  const [sparking, setSparking] = useState(false);
  const [trendingIdeas, setTrendingIdeas] = useState<any[]>([]);

  // Saved list
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([]);

  // Chatbot states
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Initialize and load saved scripts & keys
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('igigster_saved_scripts');
      if (stored) {
        try {
          setSavedScripts(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
      const storedKey = localStorage.getItem('igigster_gemini_api_key');
      if (storedKey) {
        setApiKey(storedKey);
      }
    }
    // Seed initial trending ideas
    generateTrendingIdeas('Beauty & Wellness');
  }, []);

  // Save scripts list helper
  const updateSavedScriptsStorage = (updated: SavedScript[]) => {
    setSavedScripts(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('igigster_saved_scripts', JSON.stringify(updated));
    }
  };

  // Live copy action helper
  const handleCopyText = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Generate Script Handler (Mock Simulation or Live client-side Google Gemini)
  const handleGenerateScript = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!concept && !brandName) {
      alert("Please provide at least a brand name or a content concept!");
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);
    setGeneratedScript(null);
    setIsSaved(false);

    const bName = brandName || 'Glow Serum';
    const rawConcept = concept || 'Skincare glow morning routine';

    // Live AI query mode: direct client query to Gemini 1.5 Flash using user's key
    if (apiKey.trim()) {
      try {
        setGenerationStep(1); // Engineering psychological hook variants...
        
        const systemInstruction = `
          You are a professional UGC content creator and short-form video copywriter.
          Generate a high-converting UGC script based on the platform, brand, niche, hook type, tone, and concept given.
          Return a raw, strict JSON object (no markdown wrapping, no \`\`\`json block, just standard JSON parseable string) with this exact schema:
          {
            "title": "A short descriptive title",
            "hooks": [
              "Hook option 1 (high-retention)",
              "Hook option 2 (high-retention)",
              "Hook option 3 (high-retention)"
            ],
            "scriptSteps": [
              { "time": "0:00 - 0:03", "visual": "Visual cue description (directions for camera)", "audio": "Voiceover spoken text or sound cues" },
              { "time": "0:03 - 0:12", "visual": "Visual cue description", "audio": "Voiceover spoken text" },
              { "time": "0:12 - 0:25", "visual": "Visual cue description", "audio": "Voiceover spoken text" },
              { "time": "0:25 - 0:30", "visual": "Visual cue description", "audio": "Voiceover spoken text (Call to Action)" }
            ],
            "caption": "A catchy social media post caption with emojis, spaces, and relevant hashtags",
            "hashtags": ["tag1", "tag2", "tag3"]
          }
        `;

        const userPrompt = `
          Platform: ${platform}
          Brand Name: ${bName}
          Niche: ${niche}
          Concept/Brief: ${rawConcept}
          Hook Type: ${hookType}
          Tone: ${tone}
        `;

        setGenerationStep(2); // Synthesizing script screenplay cues...
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nUser Request:\n${userPrompt}` }]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData?.error?.message || `HTTP ${response.status} from Google Gemini API`);
        }

        setGenerationStep(3); // Polishing audio script & visual cues...
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!candidateText) {
          throw new Error("No response content generated from Gemini. Please verify your prompt or API key limits.");
        }

        setGenerationStep(4); // Formatting social caption & tag clouds...
        
        let cleanedText = candidateText.trim();
        // Clean markdown backticks if any
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.substring(7);
        }
        if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.substring(3);
        }
        if (cleanedText.endsWith('```')) {
          cleanedText = cleanedText.substring(0, cleanedText.length - 3);
        }
        cleanedText = cleanedText.trim();

        const parsed = JSON.parse(cleanedText);
        
        const output: SavedScript = {
          id: `script-${Date.now()}`,
          title: parsed.title || `${bName} - ${tone} Script`,
          platform: platform,
          concept: rawConcept,
          hooks: parsed.hooks || [],
          scriptSteps: parsed.scriptSteps || [],
          caption: parsed.caption || '',
          hashtags: parsed.hashtags || [],
          savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };

        setGeneratedScript(output);
        setIsGenerating(false);
        return;
      } catch (err: any) {
        console.error("Gemini Live Generation Error: ", err);
        alert(`Gemini Generation failed: ${err.message}. Falling back to simulated offline draft mode...`);
        // Fallback continues below
      }
    }

    // Offline sandbox simulation (Fallback)
    const steps = [
      "Analyzing trending platform algorithms...",
      "Engineering psychological hook variants...",
      "Synthesizing script screenplay cues...",
      "Polishing audio script & visual cues...",
      "Formatting optimized social caption & tag clouds..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setGenerationStep(currentStep);
      } else {
        clearInterval(interval);
        
        let finalTitle = `${bName} - ${tone} Script`;
        let hookList = [
          `"This is the ONLY product that saved my skin after years of acne..."`,
          `"Stop scrolling if you want glass skin in under 10 seconds..."`,
          `"My toxic trait is buying expensive skincare when this $15 serum does THIS..."`
        ];

        if (niche.toLowerCase().includes('tech') || rawConcept.toLowerCase().includes('tech')) {
          hookList = [
            `"I threw my $300 headphones in the trash after testing these..."`,
            `"You are using your noise-canceling headphones completely WRONG."`,
            `"Here is a secret tech hack that will save you hours every day..."`
          ];
        } else if (niche.toLowerCase().includes('fit') || rawConcept.toLowerCase().includes('fit') || rawConcept.toLowerCase().includes('oat')) {
          hookList = [
            `"Stop eating boring breakfast. Make this 5-minute high protein dessert..."`,
            `"The real reason you aren't seeing fitness progress is your breakfast..."`,
            `"This simple morning swap changed my gym recovery forever..."`
          ];
        }

        const scriptSteps = [
          {
            time: '0:00 - 0:03',
            visual: 'Close up shot of application, smiling at camera, energetic cuts.',
            audio: hookList[0]
          },
          {
            time: '0:03 - 0:15',
            visual: 'Show the packaging close up, highlight texture dripping on skin or close shot of product details.',
            audio: `Here is the truth: I started using the ${bName} about two weeks ago. And look at this texture. It absorbs instantly without feeling greasy.`
          },
          {
            time: '0:15 - 0:25',
            visual: 'Side-by-side comparison showing instant results or product in action with soft satisfying background music.',
            audio: `It uses pure organic ingredients, zero fragrances. Honestly, the results speak for themselves. My skin feels plump and looks glowing all day.`
          },
          {
            time: '0:25 - 0:30',
            visual: 'Pointing to link on screen or holding the product next to face with a warm smile.',
            audio: `Click the link below to grab yours today, they are currently running a buy one get one free discount. Trust me, you won't regret it!`
          }
        ];

        const output: SavedScript = {
          id: `script-${Date.now()}`,
          title: finalTitle,
          platform,
          concept: rawConcept,
          hooks: hookList,
          scriptSteps,
          caption: `✨ Honest review of the brand new ${bName}! If you've been struggling to find a lightweight formula that actually delivers results, this is it. 10/10 recommend. Link in bio to shop. \n\n#ugc #ugccommunity #honestreview #${bName.toLowerCase().replace(/\s+/g, '')} #skincareroutine`,
          hashtags: ['ugc', 'ugccreator', 'productreview', bName.toLowerCase().replace(/\s+/g, ''), 'ugccommunity'],
          savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };

        setGeneratedScript(output);
        setIsGenerating(false);
      }
    }, 300);
  };

  // Quick fill and generate preset
  const handleLoadQuickIdea = (idea: typeof QUICK_IDEAS[0]) => {
    setBrandName(idea.title.split(' ')[0]);
    setPlatform(idea.platform);
    setNiche(idea.niche);
    setConcept(idea.concept);
    
    // Auto trigger generate
    setTimeout(() => {
      setIsGenerating(true);
      setGenerationStep(0);
      setGeneratedScript(null);
      
      const output: SavedScript = {
        id: `script-${Date.now()}`,
        title: `${idea.title} - Promo Script`,
        platform: idea.platform,
        concept: idea.concept,
        hooks: [
          `"If you want this exact glow, you need to watch this entire video..."`,
          `"I finally found the ultimate routine cheat-code for busy mornings..."`,
          `"This product is worth every single penny. Let me show you why..."`
        ],
        scriptSteps: [
          { time: '0:00 - 0:03', visual: 'High dynamic action shot showing product texture, smile, satisfying zoom.', audio: `"If you want this exact glow, you need to watch this entire video..."` },
          { time: '0:03 - 0:12', visual: 'Zoom on ingredients card, pouring cream, texture close up.', audio: `We are styling the ${idea.title.split(' ')[0]} today. It is rich, organic, and blends like absolute silk.` },
          { time: '0:12 - 0:25', visual: 'Before and after overlay split screen, outdoor natural lighting.', audio: `The glow is instant. No heavy filters, just pure science-backed nourishment. Seriously, look at this hydration.` },
          { time: '0:25 - 0:30', visual: 'CTA screen pointing at footer with discount code text "IGIG20".', audio: `Get 20% off with code IGIG20 today. Don't wait, link in bio!` }
        ],
        caption: `✨ Quick test of the brand new ${idea.title}! Super simple morning routine with gorgeous results. Code IGIG20 gets you 20% off. \n\n#ugc #contentcreator #skincarehacks #morningroutine`,
        hashtags: ['ugc', 'contentcreator', 'morningroutine', 'hydration'],
        savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      
      setTimeout(() => {
        setGeneratedScript(output);
        setIsGenerating(false);
      }, 300);
    }, 100);
  };

  // Save current script to local storage
  const handleSaveCurrentScript = () => {
    if (!generatedScript) return;
    const isAlreadySaved = savedScripts.some(s => s.title === generatedScript.title && s.concept === generatedScript.concept);
    if (isAlreadySaved) {
      alert("Script is already saved!");
      return;
    }
    const updated = [generatedScript, ...savedScripts];
    updateSavedScriptsStorage(updated);
    setIsSaved(true);

    // Save as inspiration card on the Saved Page too!
    const newInspiration = {
      id: `saved-insp-script-${Date.now()}`,
      title: generatedScript.title,
      category: 'Video Script',
      platform: generatedScript.platform,
      content: `Concept: ${generatedScript.concept}\n\nHook Example: ${generatedScript.hooks[0] || ''}\n\nVoiceover Outline: ${generatedScript.scriptSteps.map(s => s.audio).join(' ')}`,
      note: `AI Generated Script Template`,
      savedAt: 'Just now',
      iconType: 'hook'
    };

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('igigster_saved_inspirations');
      let currentInspirations = [];
      if (stored) {
        try {
          currentInspirations = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
      const updatedInspirations = [newInspiration, ...currentInspirations];
      localStorage.setItem('igigster_saved_inspirations', JSON.stringify(updatedInspirations));
      window.dispatchEvent(new Event('saved-inspirations-updated'));
    }
  };

  // Delete saved script
  const handleDeleteSavedScript = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this saved script?")) return;
    const updated = savedScripts.filter(s => s.id !== id);
    updateSavedScriptsStorage(updated);
  };

  // Generate Trending Ideas based on Niche
  const generateTrendingIdeas = (selectedNiche: string) => {
    setSparking(true);
    
    setTimeout(() => {
      let ideas: any[] = [];
      
      if (selectedNiche === 'Beauty & Wellness') {
        ideas = [
          {
            title: 'ASMR Morning Skin Prep',
            hook: 'Tap tapping on products, satisfying lid pops, and silent whispers.',
            audio: 'Pure tapping and whisper sounds. Text overlays highlight: "No talking, just high-frequency morning hydration."',
            hashtags: ['asmrskincare', 'visualasmr', 'glowdrops', 'oddlysatisfying'],
            sound: 'Raindrops sound effect + acoustic lofi (Trending: 120k videos)'
          },
          {
            title: 'Dermatologist vs. UGC Challenge',
            hook: 'Split screen comparing clinical clinical studies vs. the raw mirror selfie test.',
            audio: '"The dermatologist said this would take 4 weeks. It is day 12 and the dark spots are basically... gone?"',
            hashtags: ['skincareresults', 'glowchallenge', 'nofilterlook', 'hyperpigmentation'],
            sound: 'Upbeat electronic synth loop (Trending: 80k videos)'
          },
          {
            title: 'Under $20 Dupe Secret',
            hook: 'Splashing a luxury bottle next to a budget one, shaking head.',
            audio: '"Stop wasting your rent money on high-end serum. This $15 apothecary alternative has the exact same formula ingredients..."',
            hashtags: ['beautydupes', 'affordablebeauty', 'drugstorehacks', 'smartspending'],
            sound: 'Hype transition trap beat (Trending: 210k videos)'
          }
        ];
      } else if (selectedNiche === 'Tech & Gadgets') {
        ideas = [
          {
            title: 'Desk Setup Clean Aesthetics',
            hook: 'Peeling screen protectors off monitors with crisp satisfying sound.',
            audio: '"Rebuilding my productivity workspace using 3 smart desk gadgets under $50. Number 2 is an absolute gamechanger..."',
            hashtags: ['desksetup', 'productivityhacks', 'cleandesk', 'aesthetictech'],
            sound: 'Lofi ambient keyboards (Trending: 45k videos)'
          },
          {
            title: 'The Silent ANC Coffee Shop Test',
            hook: 'Snap fingers, loud espresso machine background noise, suddenly cuts to total silence.',
            audio: '"This is why I threw out my AirPods. The active noise cancellation on this device makes a busy Starbucks sound like an empty library..."',
            hashtags: ['headphonereview', 'audiophile', 'noisecancelling', 'gadgettest'],
            sound: 'Cinematic epic string rise (Trending: 95k videos)'
          },
          {
            title: 'Minimalist Travel Rig',
            hook: 'Fitting an entire content creation kit into a tiny tech organizer bag.',
            audio: '"I filmed this entire 4k commercial with just these 3 items. They fit in the palm of my hand..."',
            hashtags: ['traveltech', 'minimalistrig', 'creatorequipment', 'cameragear'],
            sound: 'Groovy base house (Trending: 60k videos)'
          }
        ];
      } else {
        ideas = [
          {
            title: 'Healthy 5-Min Cheat Meal',
            hook: 'High speed food styling cuts, steam rising from fresh bowl.',
            audio: '"This tastes exactly like cheat meal pizza, but has 45g of protein and took me exactly 5 minutes to air fry..."',
            hashtags: ['mealprep', 'fitnessdiet', 'proteinhacks', 'airfryerrecipes'],
            sound: 'Funky retro jazz hop (Trending: 300k videos)'
          },
          {
            title: 'My 5 AM Non-Negotiables',
            hook: 'Stepping out of bed, warm light filtering through blinds, stretching.',
            audio: '"I used to wake up feeling exhausted. These 3 small habits at 5 AM completely changed my daily energy levels..."',
            hashtags: ['morninghabits', 'wellnessroutine', 'productivitygoals', 'lifestylechanges'],
            sound: 'Chilled classical piano (Trending: 180k videos)'
          },
          {
            title: 'Fitness Reality Check',
            hook: 'Comparing gym selfie angles with normal bloated evening relax photos.',
            audio: '"Reminder that social media is just a highlight reel. Be proud of your body in every single phase of the day..."',
            hashtags: ['bodypositivity', 'gymhumor', 'realnesscheck', 'fitspojourney'],
            sound: 'Soft acoustic vocal track (Trending: 410k videos)'
          }
        ];
      }
      
      setTrendingIdeas(ideas);
      setSparking(false);
    }, 300);
  };

  // Chat message send handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.trim();
    const userMsg = { sender: 'user', text: query };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiTyping(true);

    // Live AI Chat integration if key is present
    if (apiKey.trim()) {
      try {
        const historyText = chatMessages
          .map(m => `${m.sender === 'user' ? 'Creator' : 'AI UGC Coach'}: ${m.text}`)
          .join('\n');

        const prompt = `
          You are a professional UGC performance and content marketing coach.
          You are chatting with a content creator who wants advice on visual hooks, copywriting, brand pitching, pricing, or video ideas.
          
          Chat History:
          ${historyText}
          
          Creator: ${query}
          
          Provide a highly practical, actionable, and conversational response (max 4-5 sentences, use bullet points where helpful). Keep the tone encouraging, expert, and professional.
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            setChatMessages(prev => [...prev, { sender: 'ai', text: replyText.trim() }]);
            setIsAiTyping(false);
            return;
          }
        }
      } catch (err: any) {
        console.error("Gemini Coach Live Chat Error: ", err);
      }
    }

    // Simulate UGC Coach chatbot (Fallback)
    setTimeout(() => {
      let replyText = "That sounds like a great direction! To optimize your video retention, try making the first 2 seconds visual (e.g. spray the mist directly at the lens or show a fast micro-macro edit transition). Would you like me to write a couple of high-attention hook options for that?";
      
      const lower = query.toLowerCase();
      if (lower.includes('hook')) {
        replyText = "Here are 3 hook formulas you can try right now:\n1. 'This is the ONLY product that saved my skin...'\n2. 'Stop scrolling if you struggle with [problem]...'\n3. 'My toxic trait is paying top dollar for [high-end name] when this works better.'";
      } else if (lower.includes('brand') || lower.includes('pitch')) {
        replyText = "When pitching to brands, make sure to emphasize value over stats: 'Hey [Brand Name], I noticed your reels are performing great, but you don't have many showing [specific use case]. I can deliver 3 high-converting UGC assets focusing on that in 5 days.'";
      } else if (lower.includes('price') || lower.includes('rate') || lower.includes('charge')) {
        replyText = "For short-form video UGC, the market standard rate starts at ₹8,000 to ₹15,000 ($100 - $200 USD) per video for creators. Don't sell yourself short! Make sure to charge extra if they want usage rights for paid ads.";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: replyText }]);
      setIsAiTyping(false);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: primaryText }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} style={{ color: accentColor }} /> AI Content Assistant
          </h1>
          <p style={{ color: mutedText, fontSize: '14px', margin: '4px 0 0 0' }}>
            Generate viral scripts, hooks, trending concepts, and chat with your expert UGC performance coach.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: isLight ? '#F1F1F4' : 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
          {[
            { id: 'generator', label: 'Script Generator', icon: <Video size={14} /> },
            { id: 'ideas', label: 'Idea Sparker', icon: <Flame size={14} /> },
            { id: 'chat', label: 'AI UGC Coach', icon: <MessageSquare size={14} /> },
            { id: 'saved', label: `Saved Scripts (${savedScripts.length})`, icon: <Bookmark size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? (isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)') : 'transparent',
                color: activeTab === tab.id ? primaryText : secondaryText,
                fontSize: '13px',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeTab === tab.id && isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* API Key Config Alert Banner */}
      {!apiKey.trim() && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderRadius: '12px',
          backgroundColor: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.04)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          fontSize: '13px',
          color: isLight ? '#B45309' : '#FBBF24',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 550 }}>
            <span>⚠️ API Offline Mode: To unlock live AI content generation and custom scripts with your own key, configure your Google Gemini API Key.</span>
          </div>
          <button
            onClick={() => setIsConfigOpen(prev => !prev)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isLight ? '#FBBF24' : 'rgba(245, 158, 11, 0.15)',
              color: isLight ? '#78350F' : '#FBBF24',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '12.5px'
            }}
          >
            Configure Key
          </button>
        </div>
      )}

      {/* Config Drawer / Tray */}
      {(isConfigOpen || !!apiKey.trim()) && (
        <div style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '20px',
          boxShadow: shadowStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              ⚙️ Gemini AI API Configuration
            </span>
            <button
              onClick={() => setIsConfigOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: mutedText,
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Hide Settings
            </button>
          </div>

          <p style={{ fontSize: '12.5px', color: mutedText, margin: 0, lineHeight: 1.45 }}>
            To run the AI Assistant directly from your browser with no billing liability for the platform, enter your own Gemini API Key. Your key is stored locally in your browser cache and is never sent to our servers.
            <br />
            <a 
              href="https://aistudio.google.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: accentColor, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}
            >
              Get a free Gemini API Key from Google AI Studio &rarr;
            </a>
          </p>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
              <input
                type={showApiKey ? "text" : "password"}
                placeholder="Paste your Gemini API Key here (starts with AIzaSy...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  paddingRight: '40px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowApiKey(prev => !prev)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: mutedText,
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 650
                }}
              >
                {showApiKey ? "Hide" : "Show"}
              </button>
            </div>

            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('igigster_gemini_api_key', apiKey.trim());
                  alert("API key saved successfully! Live AI modes are now unlocked.");
                }
              }}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 750,
                cursor: 'pointer'
              }}
            >
              Save Key
            </button>

            {apiKey.trim() && (
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('igigster_gemini_api_key');
                    setApiKey('');
                    alert("API key removed. Reverted to simulated offline mode.");
                  }
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid #EF4444`,
                  backgroundColor: 'transparent',
                  color: '#EF4444',
                  fontSize: '13.5px',
                  fontWeight: 650,
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: GENERATOR --- */}
      {activeTab === 'generator' && (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Left Column: Controls */}
          <form 
            onSubmit={handleGenerateScript}
            style={{ 
              flex: '1 1 380px', 
              backgroundColor: cardBg, 
              border: `1px solid ${borderColor}`, 
              borderRadius: '16px', 
              padding: '24px', 
              boxShadow: shadowStyle,
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 750 }}>UGC Script Generator</span>
              <button 
                type="button"
                onClick={() => {
                  setBrandName('');
                  setConcept('');
                  setNiche('Beauty & Skincare');
                }}
                style={{ background: 'none', border: 'none', color: accentColor, fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              >
                <RotateCcw size={12} /> Reset Form
              </button>
            </div>

            {/* Platform Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Target Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              >
                {['Instagram Reels', 'TikTok', 'YouTube Shorts', 'YouTube Long-form', 'LinkedIn Video'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Brand Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Brand / Product Name</label>
              <input
                type="text"
                placeholder="e.g. SkinGlow Vit-C Serum, AlphaFit Joggers"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Niche Category */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Niche / Category</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              >
                {['Beauty & Skincare', 'Tech & Gadgets', 'Fitness & Health', 'Food & Beverage', 'Fashion & Lifestyle', 'Finance & Business'].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Hook Trigger Choice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Hook Type</label>
              <select
                value={hookType}
                onChange={(e) => setHookType(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              >
                {[
                  'FOMO (Fear of Missing Out)',
                  'Direct Problem / Resolution',
                  'Honest Review / Callout',
                  'Secret Hack / Cheat Code',
                  'High Energy Visual ASMR'
                ].map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Tone Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Content Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none'
                }}
              >
                {[
                  'Relatable & Storytelling',
                  'Energetic & Enthusiastic',
                  'Aesthetic & Calm',
                  'Informative & Educational',
                  'Sarcastic & Witty'
                ].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Concept / Goal Textarea */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: secondaryText, textTransform: 'uppercase' }}>Concept Brief / Details</label>
              <textarea
                rows={3}
                placeholder="e.g. Unboxing video showing the soft texture and smooth finish. Focus on how it brightens the skin instantly before applying makeup."
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: isLight ? '#FAF9FB' : '#141416',
                  color: primaryText,
                  fontSize: '13.5px',
                  outline: 'none',
                  resize: 'none',
                  lineHeight: '1.45'
                }}
              />
            </div>

            {/* Submit Spark Button */}
            <button
              type="submit"
              disabled={isGenerating}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '13px',
                borderRadius: '12px',
                border: 'none',
                background: isGenerating ? 'rgba(236, 72, 153, 0.4)' : `linear-gradient(135deg, ${accentColor}, #8B5CF6)`,
                color: '#FFFFFF',
                fontSize: '14.5px',
                fontWeight: 750,
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(236,72,153,0.3)',
                transition: 'transform 0.2s'
              }}
            >
              <Sparkles size={16} /> {isGenerating ? 'AI is Writing...' : 'Generate Script'}
            </button>

            {/* Presets Quick Fill */}
            <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: mutedText, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                Quick Preset Examples
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {QUICK_IDEAS.map((idea, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleLoadQuickIdea(idea)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: 'transparent',
                      color: secondaryText,
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isLight ? '#FAF9FB' : 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = borderColor;
                    }}
                  >
                    <span style={{ fontWeight: 650 }}>{idea.title}</span>
                    <span style={{ fontSize: '11px', color: mutedText }}>{idea.niche} &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Right Column: Output Viewer */}
          <div style={{ flex: '2 1 450px', minWidth: 320, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Glassmorphic Generator Output Panel */}
            <div 
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: shadowStyle,
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: !generatedScript && !isGenerating ? 'center' : 'flex-start',
                alignItems: !generatedScript && !isGenerating ? 'center' : 'stretch',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              
              {/* Scenario 1: Idle state (No generation) */}
              {!generatedScript && !isGenerating && (
                <div style={{ textAlign: 'center', maxWidth: '340px', padding: '40px 0' }}>
                  <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: isLight ? '#FDF2F8' : 'rgba(236,72,153,0.06)', color: accentColor, marginBottom: '16px' }}>
                    <Sparkles size={36} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Create UGC Masterpieces</h3>
                  <p style={{ color: mutedText, fontSize: '13.5px', marginTop: '8px', lineHeight: 1.5 }}>
                    Provide product details, select hook types, or pick a quick preset example to generate high-performing hooks and audio scripts instantly.
                  </p>
                </div>
              )}

              {/* Scenario 2: Loading State */}
              {isGenerating && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '60px 0' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px', marginBottom: '24px' }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '3px solid transparent',
                      borderTopColor: accentColor,
                      borderBottomColor: '#8B5CF6',
                      animation: 'spin 1.2s linear infinite'
                    }} />
                    <div style={{
                      position: 'absolute',
                      inset: '10px',
                      borderRadius: '50%',
                      backgroundColor: isLight ? '#F4F4F7' : '#1C1C1F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: accentColor
                    }}>
                      <Sparkles size={20} />
                    </div>
                  </div>
                  
                  <h4 style={{ fontSize: '15px', fontWeight: 750, margin: '0 0 8px 0' }}>AI Script Assistant at Work</h4>
                  
                  {/* Step status */}
                  <div style={{ fontSize: '12.5px', color: mutedText, minHeight: '18px', fontWeight: 500 }}>
                    {[
                      "Analyzing trending platform algorithms...",
                      "Engineering psychological hook variants...",
                      "Synthesizing script screenplay cues...",
                      "Polishing audio script & visual cues...",
                      "Formatting optimized social caption & tag clouds..."
                    ][generationStep]}
                  </div>

                  <style jsx global>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}

              {/* Scenario 3: Loaded Script Output */}
              {generatedScript && !isGenerating && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Output Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: isLight ? '#FAF5FF' : 'rgba(139,92,246,0.1)', color: '#8B5CF6', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {generatedScript.platform}
                      </span>
                      <h2 style={{ fontSize: '17px', fontWeight: 800, margin: '4px 0 0 0' }}>{generatedScript.title}</h2>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleSaveCurrentScript}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          border: `1px solid ${borderColor}`,
                          backgroundColor: isSaved ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                          color: isSaved ? '#10B981' : primaryText,
                          fontSize: '12px',
                          fontWeight: 650,
                          cursor: 'pointer'
                        }}
                      >
                        {isSaved ? <CheckCircle2 size={13} /> : <Bookmark size={13} />}
                        {isSaved ? 'Saved to Hub' : 'Save Script'}
                      </button>

                      <button
                        onClick={() => {
                          const fullScriptText = `PLATFORM: ${generatedScript.platform}\n\nHooks:\n${generatedScript.hooks.join('\n')}\n\nScript Cues:\n${generatedScript.scriptSteps.map(s => `[${s.time}] Visual: ${s.visual}\nAudio: ${s.audio}`).join('\n\n')}\n\nCaption:\n${generatedScript.caption}`;
                          handleCopyText(fullScriptText, 'full');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: copiedSection === 'full' ? '#10B981' : accentColor,
                          color: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: 650,
                          cursor: 'pointer'
                        }}
                      >
                        {copiedSection === 'full' ? <Check size={13} /> : <Copy size={13} />}
                        {copiedSection === 'full' ? 'Copied!' : 'Copy Full'}
                      </button>
                    </div>
                  </div>

                  {/* Section 1: Hook Variants */}
                  <div>
                    <span style={{ fontSize: '12.5px', fontWeight: 750, color: secondaryText, display: 'block', marginBottom: '8px' }}>
                      🔑 Retention Hooks (Choose 1)
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {generatedScript.hooks.map((h, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: `1px solid ${borderColor}`,
                            backgroundColor: isLight ? '#FDF2F8' : 'rgba(236,72,153,0.02)',
                            fontSize: '13px',
                            lineHeight: 1.4,
                            color: primaryText,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ fontStyle: 'italic', fontWeight: 550 }}>{h}</span>
                          <button
                            onClick={() => handleCopyText(h, `hook-${i}`)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: copiedSection === `hook-${i}` ? '#10B981' : mutedText,
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                          >
                            {copiedSection === `hook-${i}` ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Visual & Audio Screenplay */}
                  <div>
                    <span style={{ fontSize: '12.5px', fontWeight: 750, color: secondaryText, display: 'block', marginBottom: '8px' }}>
                      🎬 Video Script & Visual Cues
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {generatedScript.scriptSteps.map((step, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            border: `1px solid ${borderColor}`,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            fontSize: '12.5px'
                          }}
                        >
                          {/* Time */}
                          <div style={{ width: '80px', backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.02)', borderRight: `1px solid ${borderColor}`, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: mutedText }}>
                            {step.time}
                          </div>
                          
                          {/* Script details */}
                          <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: 1.4 }}>
                            <div>
                              <span style={{ fontWeight: 750, color: '#8B5CF6', fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Visual Scene</span>
                              <span style={{ color: secondaryText }}>{step.visual}</span>
                            </div>
                            <div style={{ borderTop: `1px dashed ${borderColor}`, paddingTop: '6px' }}>
                              <span style={{ fontWeight: 750, color: accentColor, fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Voiceover (Audio)</span>
                              <span style={{ fontWeight: 550 }}>{step.audio}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Caption & Tags */}
                  <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 750, color: secondaryText }}>
                        ✍️ Optimized Post Caption
                      </span>
                      <button
                        onClick={() => handleCopyText(generatedScript.caption, 'caption')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: copiedSection === 'caption' ? '#10B981' : accentColor,
                          fontSize: '11.5px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {copiedSection === 'caption' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedSection === 'caption' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    
                    <div style={{
                      padding: '12px',
                      borderRadius: '10px',
                      backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.01)',
                      border: `1px dashed ${borderColor}`,
                      fontSize: '12.5px',
                      color: secondaryText,
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {generatedScript.caption}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* --- TAB CONTENT: TRENDING IDEAS SPARKER --- */}
      {activeTab === 'ideas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Niche select panel */}
          <div 
            style={{ 
              backgroundColor: cardBg, 
              border: `1px solid ${borderColor}`, 
              borderRadius: '16px', 
              padding: '18px 24px', 
              boxShadow: shadowStyle,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span style={{ fontSize: '15px', fontWeight: 750 }}>Spark Hot Trending UGC Concepts</span>
              <p style={{ fontSize: '12.5px', color: mutedText, margin: '2px 0 0 0' }}>Select your category to get instant concept outlines aligned with current audio visual trends.</p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {['Beauty & Wellness', 'Tech & Gadgets', 'Fitness & Health'].map(nc => (
                <button
                  key={nc}
                  onClick={() => {
                    setSelectedNiche(nc);
                    generateTrendingIdeas(nc);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${selectedNiche === nc ? accentColor : borderColor}`,
                    backgroundColor: selectedNiche === nc ? (isLight ? '#FDF2F8' : 'rgba(236,72,153,0.06)') : 'transparent',
                    color: selectedNiche === nc ? accentColor : secondaryText,
                    fontSize: '12.5px',
                    fontWeight: 650,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {nc}
                </button>
              ))}
            </div>
          </div>

          {/* Ideas listing */}
          {sparking ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
              <RefreshCw size={24} style={{ color: accentColor, animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '13px', color: mutedText, marginTop: '12px', fontWeight: 550 }}>Sparking fresh content concepts...</span>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {trendingIdeas.map((idea, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: shadowStyle,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14.5px', fontWeight: 800, color: primaryText }}>{idea.title}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', backgroundColor: 'rgba(236,72,153,0.08)', color: accentColor, padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        <Flame size={10} /> HOT
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', lineHeight: 1.45 }}>
                      <div>
                        <span style={{ fontWeight: 750, color: mutedText, fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Hook Angle</span>
                        <span style={{ color: secondaryText, fontStyle: 'italic' }}>{idea.hook}</span>
                      </div>

                      <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '8px' }}>
                        <span style={{ fontWeight: 750, color: mutedText, fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Audio Script Idea</span>
                        <span>{idea.audio}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {idea.hashtags.map((tag: string) => (
                          <span key={tag} style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 550 }}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sound & Action */}
                  <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: mutedText, fontSize: '11.5px' }}>
                      <Volume2 size={12} style={{ color: accentColor }} />
                      <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '160px' }}>{idea.sound}</span>
                    </div>

                    <button
                      onClick={() => {
                        const newInspiration = {
                          id: `saved-insp-idea-${Date.now()}`,
                          title: idea.title,
                          category: 'Creative Idea',
                          platform: 'Short Form Reels',
                          content: `Hook: ${idea.hook}\n\nAudio: ${idea.audio}\n\nSound: ${idea.sound}`,
                          note: `AI Generated from Niche: ${selectedNiche}`,
                          savedAt: 'Just now',
                          iconType: 'idea'
                        };

                        if (typeof window !== 'undefined') {
                          const stored = localStorage.getItem('igigster_saved_inspirations');
                          let currentInspirations = [];
                          if (stored) {
                            try {
                              currentInspirations = JSON.parse(stored);
                            } catch (e) {
                              console.error(e);
                            }
                          }
                          const updated = [newInspiration, ...currentInspirations];
                          localStorage.setItem('igigster_saved_inspirations', JSON.stringify(updated));
                          window.dispatchEvent(new Event('saved-inspirations-updated'));
                        }

                        // Also save it as a mockup script in the Assistant Scripts Hub for double utility!
                        const simulatedSaved: SavedScript = {
                          id: `script-idea-${Date.now()}`,
                          title: idea.title,
                          platform: 'Short Form Reels',
                          concept: idea.title,
                          hooks: [idea.hook],
                          scriptSteps: [
                            { time: '0:00 - 0:05', visual: 'High visual hook demonstration.', audio: idea.hook },
                            { time: '0:05 - 0:25', visual: 'Feature walkthrough with quick-cuts.', audio: idea.audio },
                            { time: '0:25 - 0:30', visual: 'Link reference / CTA screen.', audio: 'Click the link in bio to shop now!' }
                          ],
                          caption: `✨ Concept: ${idea.title}. Inspired by trending audios. \n\n#ugc #contentcreator #${idea.hashtags.join(' #')}`,
                          hashtags: idea.hashtags,
                          savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        };
                        updateSavedScriptsStorage([simulatedSaved, ...savedScripts]);
                        
                        alert("Concept saved to your Saved Page under Inspirations!");
                      }}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: isLight ? '#FAF9FB' : 'rgba(255,255,255,0.03)',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: borderColor,
                        color: primaryText,
                        fontSize: '11.5px',
                        fontWeight: 650,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Bookmark size={11} /> Save Concept
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* --- TAB CONTENT: SAVED SCRIPTS HUB --- */}
      {activeTab === 'saved' && (
        <div 
          style={{ 
            backgroundColor: cardBg, 
            border: `1px solid ${borderColor}`, 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: shadowStyle,
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '15px', fontWeight: 750 }}>Saved Scripts Hub</span>
              <p style={{ fontSize: '12.5px', color: mutedText, margin: '2px 0 0 0' }}>Access, copy, or delete your previously generated visual script templates.</p>
            </div>
            {savedScripts.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete all saved scripts?")) {
                    updateSavedScriptsStorage([]);
                  }
                }}
                style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '12px', fontWeight: 650, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={13} /> Clear Hub
              </button>
            )}
          </div>

          {savedScripts.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', flex: 1 }}>
              <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.03)', color: mutedText, marginBottom: '14px' }}>
                <Bookmark size={24} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 650, color: secondaryText }}>No scripts saved yet</span>
              <p style={{ fontSize: '12.5px', color: mutedText, textAlign: 'center', maxWidth: '260px', marginTop: '6px', lineHeight: 1.45 }}>
                Generate scripts in the Script Generator or save trending concepts to build your template library.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {savedScripts.map((script) => (
                <div
                  key={script.id}
                  style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 750 }}>{script.title}</span>
                      <span style={{ fontSize: '10px', backgroundColor: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.04)', color: mutedText, padding: '1px 6px', borderRadius: '3px', fontWeight: 600 }}>
                        {script.platform}
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: mutedText, margin: '4px 0 0 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {script.concept}
                    </p>
                    <span style={{ fontSize: '11px', color: mutedText, display: 'block', marginTop: '4px' }}>Saved: {script.savedAt}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        const text = `TITLE: ${script.title}\nPLATFORM: ${script.platform}\nCONCEPT: ${script.concept}\n\nHooks:\n${script.hooks.join('\n')}\n\nSteps:\n${script.scriptSteps.map(s => `[${s.time}] Visual: ${s.visual}\nAudio: ${s.audio}`).join('\n\n')}`;
                        handleCopyText(text, script.id);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: copiedSection === script.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                        color: copiedSection === script.id ? '#10B981' : secondaryText,
                        fontSize: '12px',
                        fontWeight: 650,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {copiedSection === script.id ? <Check size={12} /> : <Copy size={12} />}
                      {copiedSection === script.id ? 'Copied' : 'Copy'}
                    </button>
                    
                    <button
                      onClick={() => {
                        setBrandName(script.title.split(' - ')[0]);
                        setConcept(script.concept);
                        setPlatform(script.platform);
                        setGeneratedScript(script);
                        setActiveTab('generator');
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: isLight ? '#F1F1F4' : 'rgba(255, 255, 255, 0.04)',
                        color: primaryText,
                        fontSize: '12px',
                        fontWeight: 650,
                        cursor: 'pointer'
                      }}
                    >
                      Load
                    </button>

                    <button
                      onClick={(e) => handleDeleteSavedScript(script.id, e)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#EF4444',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* --- TAB CONTENT: CHAT UGC COACH --- */}
      {activeTab === 'chat' && (
        <div 
          style={{ 
            backgroundColor: cardBg, 
            border: `1px solid ${borderColor}`, 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: shadowStyle,
            display: 'flex',
            flexDirection: 'column',
            height: '480px',
            justifyContent: 'space-between'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 750, display: 'block' }}>UGC Script Coach (AI)</span>
                <span style={{ fontSize: '11px', color: mutedText }}>Active to help you write high-retention concepts.</span>
              </div>
            </div>
            
            <button
              onClick={() => setChatMessages(INITIAL_CHAT_MESSAGES)}
              style={{ background: 'none', border: 'none', color: accentColor, fontSize: '11.5px', fontWeight: 650, cursor: 'pointer' }}
            >
              Clear Chat
            </button>
          </div>

          {/* Messages list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  backgroundColor: msg.sender === 'user' 
                    ? accentColor 
                    : (isLight ? '#F1F1F4' : 'rgba(255,255,255,0.03)'),
                  color: msg.sender === 'user' ? '#FFFFFF' : primaryText,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                  borderTopLeftRadius: msg.sender === 'ai' ? '2px' : '12px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.text}
              </div>
            ))}
            
            {isAiTyping && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: isLight ? '#F1F1F4' : 'rgba(255,255,255,0.03)',
                padding: '10px 14px',
                borderRadius: '12px',
                borderTopLeftRadius: '2px',
                display: 'flex',
                gap: '4px',
                alignItems: 'center'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: mutedText, animation: 'pulse 1s infinite alternate' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: mutedText, animation: 'pulse 1s infinite alternate 0.2s' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: mutedText, animation: 'pulse 1s infinite alternate 0.4s' }} />
                
                <style jsx>{`
                  @keyframes pulse {
                    0% { opacity: 0.3; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1.1); }
                  }
                `}</style>
              </div>
            )}
          </div>

          {/* Form input */}
          <form 
            onSubmit={handleSendMessage}
            style={{ 
              display: 'flex', 
              gap: '10px', 
              borderTop: `1px solid ${borderColor}`, 
              paddingTop: '16px' 
            }}
          >
            <input
              type="text"
              placeholder="Ask for hooks, pitch formulas, pricing strategies, or edit request..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '11px 14px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                backgroundColor: isLight ? '#FAF9FB' : '#141416',
                color: primaryText,
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '11px 16px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: accentColor,
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
