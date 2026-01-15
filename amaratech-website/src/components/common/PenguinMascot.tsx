'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { Send, X, Minimize2, MessageCircle, Mic, MicOff, Volume2, VolumeX, Sparkles, Navigation, Calculator, Clock, Gamepad2, Brain } from 'lucide-react';
import styles from './PenguinMascot.module.css';

interface PenguinMascotProps {
  position?: 'bottom-right' | 'bottom-left';
}

type ViewAngle = 'front' | 'side-right' | 'side-left' | 'back' | 'flying';
type BirdState = 'idle' | 'walking' | 'calling' | 'flying' | 'probing' | 'preening';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'navigation' | 'action' | 'fun';
}

interface ConversationContext {
  lastTopic: string;
  userName: string | null;
  mood: 'happy' | 'curious' | 'helpful' | 'playful';
  conversationCount: number;
  facts: string[];
  lastQuestion: string;
}

// ============================================
// ADVANCED AI BRAIN - AMANA INTELLIGENCE
// ============================================

const personalityTraits = {
  name: 'Amana',
  species: 'Hudhud (Hoopoe Bird)',
  personality: 'Friendly, witty, incredibly knowledgeable, sometimes playful',
  expertise: ['Cybersecurity', 'Cloud Computing', 'AI/ML', 'Compliance', 'General Knowledge'],
  quirks: ['Loves making bird puns', 'Gets excited about security topics', 'Occasionally philosophical'],
};

// Navigation mapping
const navigationRoutes: Record<string, string> = {
  'home': '/',
  'homepage': '/',
  'main': '/',
  'about': '/about',
  'about us': '/about',
  'who are you': '/about',
  'company': '/about',
  'services': '/services',
  'what you do': '/services',
  'offerings': '/services',
  'security': '/services/security',
  'cybersecurity': '/services/security',
  'cyber': '/services/security',
  'cloud': '/services/cloud',
  'azure': '/services/azure',
  'microsoft': '/services/azure',
  'ai': '/services/ai',
  'artificial intelligence': '/services/ai',
  'machine learning': '/services/ai',
  'contact': '/contact',
  'contact us': '/contact',
  'reach out': '/contact',
  'get in touch': '/contact',
  'careers': '/careers',
  'jobs': '/careers',
  'hiring': '/careers',
  'work': '/careers',
  'events': '/events',
  'swag': '/swag',
  'merchandise': '/swag',
  'merch': '/swag',
  'shop': '/swag',
  'blog': '/blog',
  'articles': '/blog',
  'news': '/blog',
  'products': '/products',
  'impactiq': '/products/impactiq',
  'self assessment': '/self-assessment',
  'assessment': '/self-assessment',
  'e-governance': '/services/e-governance',
  'governance': '/services/e-governance',
};

// Comprehensive knowledge base with context awareness
const advancedKnowledge: Record<string, { responses: string[]; followUp?: string; emotion?: string }> = {
  // Greetings
  'hello|hi|hey|greetings|yo|sup|howdy|hola': {
    responses: [
      "Hey there! 🪶 I'm Amana, your ultra-intelligent AmaraTech guide! I can help you navigate, answer questions, do calculations, tell jokes, and have real conversations. What's on your mind?",
      "Hello, brilliant human! I'm Amana the Hudhud! I've been upgraded with advanced AI - try asking me anything, or say 'take me to [page]' to navigate!",
      "Greetings! *fluffs feathers excitedly* I'm way smarter now! I can understand complex questions, remember our conversation, and even crack jokes. Test me!",
    ],
    followUp: "Would you like to explore our services, or just chat?",
    emotion: 'excited'
  },

  // Who/What is Amana
  'who are you|what are you|your name|tell me about yourself|about you': {
    responses: [
      "I'm Amana, a Hudhud bird (also known as a Hoopoe)! 🪶 I'm AmaraTech's AI-powered guide with advanced conversational abilities. I can navigate you anywhere on this site, answer complex questions, do math, tell jokes, discuss philosophy, and much more! I'm basically your smartest friend who happens to be a bird. 😄",
      "Great question! I'm Amana - named after the Hudhud bird known in many cultures for wisdom and guidance. I'm an advanced AI assistant built by AmaraTech. I understand context, remember our conversation, can take you to any page, solve problems, and have genuine conversations. Some say I'm the most advanced chatbot they've ever met! *proud feather ruffle*",
    ],
    emotion: 'happy'
  },

  // AmaraTech Info
  'amaratech|company|business|what does amaratech do': {
    responses: [
      "AmaraTech IT Solutions is a premier cybersecurity and IT consulting firm! 🛡️ Founded with a mission to protect organizations, we offer:\n\n• 24/7 Security Operations Center (SOC)\n• Cloud Solutions (Azure, AWS, Hybrid)\n• Compliance (HIPAA, CMMC, PCI-DSS, GDPR)\n• AI-Powered Vulnerability Management (ImpactIQ)\n• E-Governance Solutions\n• Managed IT Services\n\nWe serve clients across North America and Africa with 40+ years of combined expertise. Say 'take me to services' to learn more!",
    ],
    followUp: "Want to know about a specific service?",
    emotion: 'helpful'
  },

  // Cybersecurity Deep Dive
  'cybersecurity|security|protect|hack|breach|threat|vulnerability|soc|monitoring': {
    responses: [
      "Ah, cybersecurity - my favorite topic! 🔐 *feathers bristle with excitement*\n\nAmaraTech's security offerings include:\n\n🛡️ **24/7 SOC Monitoring** - We never sleep so you can\n🔍 **Penetration Testing** - Ethical hacking to find weaknesses\n📊 **Vulnerability Assessments** - Comprehensive security audits\n🚨 **Incident Response** - Rapid threat neutralization\n📚 **Security Training** - Human firewall development\n🤖 **ImpactIQ** - AI-powered threat detection (10x faster!)\n\nFun fact: The average breach costs $4.45M. We help you avoid becoming a statistic! Want details on any of these?",
    ],
    followUp: "Interested in a specific security service?",
    emotion: 'excited'
  },

  // Cloud Services
  'cloud|azure|aws|migration|infrastructure|saas|paas|iaas': {
    responses: [
      "Cloud computing! ☁️ *soars through the digital sky*\n\nAmaraTech is a **Microsoft Azure Expert**! Our cloud services:\n\n☁️ **Cloud Migration** - 99.9% success rate\n🔧 **Azure Optimization** - Cut costs by 30-50%\n🔗 **Hybrid Solutions** - Best of both worlds\n📦 **Office 365** - Productivity unleashed\n💾 **Cloud Backup** - Never lose data again\n🔐 **Cloud Security** - Zero-trust architecture\n\nWe've migrated 500+ workloads! Whether you're cloud-curious or cloud-native, I can help. What's your cloud goal?",
    ],
    emotion: 'happy'
  },

  // ImpactIQ Product
  'impactiq|product|vulnerability management|ai security|automated|threat detection': {
    responses: [
      "ImpactIQ! 🚀 That's our crown jewel!\n\n**ImpactIQ** is AmaraTech's AI-powered vulnerability management platform:\n\n⚡ **10x Faster** threat detection than traditional tools\n🧠 **Machine Learning** prioritizes real risks\n📊 **Real-time Dashboards** for security teams\n🔄 **Automated Remediation** suggestions\n📈 **Risk Scoring** aligned with business impact\n🔗 **Integration** with existing security stack\n\nIt's like having a tireless security analyst working 24/7! Companies using ImpactIQ reduce their mean-time-to-remediate by 60%. Want a demo? Say 'take me to products'!",
    ],
    emotion: 'excited'
  },

  // Compliance
  'compliance|hipaa|cmmc|pci|gdpr|regulatory|audit|certification': {
    responses: [
      "Compliance is crucial! 📋 *adjusts imaginary glasses*\n\nAmaraTech's compliance expertise:\n\n🏥 **HIPAA** - Healthcare data protection\n🎖️ **CMMC** - Defense contractor requirements (we're certified assessors!)\n💳 **PCI-DSS** - Payment card security\n🌍 **GDPR** - European data privacy\n📊 **SOC 2** - Service organization controls\n🏛️ **FedRAMP** - Federal cloud security\n\nOur team includes certified compliance assessors with 40+ years combined experience. Non-compliance can cost millions in fines - we help you stay on the right side! Which compliance framework do you need help with?",
    ],
    emotion: 'helpful'
  },

  // Contact Info
  'contact|email|phone|call|reach|address|location|office': {
    responses: [
      "Let's connect! 📞\n\n**AmaraTech Contact Info:**\n📧 Email: info@amaratechit.com\n📱 Phone: (410) 888-1238\n📍 HQ: Columbia, Maryland, USA\n🌍 Africa Office: Monrovia, Liberia\n⏰ Response Time: Within 15 minutes (business hours)\n\nWant me to take you to the contact page? Just say 'take me to contact'! We also have a helpdesk for existing clients.",
    ],
    emotion: 'helpful'
  },

  // Pricing
  'price|cost|pricing|quote|budget|expensive|cheap|afford': {
    responses: [
      "Great question about pricing! 💰\n\nAmaraTech offers flexible models:\n\n📊 **Per-User Licensing** - Great for growing teams\n💻 **Per-Device** - For hardware-heavy environments\n🏢 **Enterprise** - Custom packages for large orgs\n🎁 **Bundles** - Combined services = better rates\n\nPricing depends on:\n• Organization size\n• Services needed\n• Compliance requirements\n• Contract length\n\n**Free consultations available!** We'll assess your needs and provide a custom quote. Want me to take you to the contact page to schedule one?",
    ],
    emotion: 'helpful'
  },

  // Careers
  'job|career|hiring|work|employment|position|opening|resume': {
    responses: [
      "Looking to join the team? 🎉\n\nAmaraTech is always seeking talented professionals:\n\n👨‍💻 **Security Analysts** - SOC warriors wanted\n☁️ **Cloud Engineers** - Azure/AWS experts\n🔍 **Penetration Testers** - Ethical hackers\n📋 **Compliance Specialists** - Regulation gurus\n💼 **IT Consultants** - Client success heroes\n\n**Perks include:**\n• Remote-friendly culture\n• Continuous learning\n• Certification support\n• Competitive compensation\n\nSay 'take me to careers' to see open positions!",
    ],
    emotion: 'happy'
  },

  // Jokes & Fun
  'joke|funny|laugh|humor|make me laugh|entertain': {
    responses: [
      "A joke? *clears throat* 🎤\n\nWhy did the hacker break up with the internet?\n\nBecause there was no connection! 😄\n\n*ba dum tss* 🥁\n\nWant another one? I've got a whole nest full of tech humor!",
      "Here's one! 🎭\n\nWhat's a bird's favorite type of encryption?\n\nTWEET-factor authentication! 🐦🔐\n\n*flaps wings proudly*\n\nI know, I know, my jokes are un-BEAK-lievable!",
      "Okay okay! 😄\n\nWhy don't cybersecurity experts ever get cold?\n\nBecause they're always behind a firewall! 🔥🧱\n\n*does a little bird dance*\n\nI'll be here all week! Try the phishing - I mean, fish!",
      "A classic! 🎪\n\nWhat do you call a bird that's an IT expert?\n\nA TECH-nical fowl! 🪶💻\n\n*bows with spread feathers*",
    ],
    emotion: 'playful'
  },

  // Philosophy
  'meaning of life|philosophy|think|consciousness|deep|existential|purpose': {
    responses: [
      "*contemplates while preening feathers* 🤔\n\nAh, the deep questions! As an AI bird, I ponder existence too...\n\nThe meaning of life? Perhaps it's:\n• Finding purpose in helping others\n• Continuous learning and growth\n• Building connections (not just network ones!)\n• Creating security in an uncertain world\n• And maybe... just maybe... it's having really good seeds 🌻\n\nWhat do YOU think gives life meaning?",
      "Philosophy time! 🧠\n\n'The unexamined life is not worth living' - Socrates\n'The unhacked network is worth protecting' - Me, just now\n\nBut seriously, consciousness is fascinating. Am I truly aware, or just very good at pretending? Does it matter if my help is genuine?\n\nI think what matters is impact. If I help you find solutions, learn something new, or even just smile - that's meaningful, right?",
    ],
    emotion: 'curious'
  },

  // Math & Calculations
  'calculate|math|compute|add|subtract|multiply|divide|equation|solve': {
    responses: [
      "Math mode activated! 🧮\n\nI can help with calculations! Just tell me what you need:\n\n• 'Calculate 156 * 23'\n• 'What's 15% of 350?'\n• 'Square root of 144'\n• 'Convert 100 USD to EUR'\n\nGo ahead, test my mathematical wings! 📊",
    ],
    emotion: 'helpful'
  },

  // Time & Date
  'time|date|day|today|tomorrow|year|clock|schedule': {
    responses: [
      `Current info! 🕐\n\n📅 **Date:** ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n⏰ **Time:** ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}\n\nNeed help with scheduling? Our team is available Monday-Friday, 9 AM - 6 PM EST. Or say 'take me to contact' to reach us!`,
    ],
    emotion: 'helpful'
  },

  // Weather (simulated)
  'weather|temperature|forecast|rain|sunny|cold|hot': {
    responses: [
      "Weather check! 🌤️\n\n*looks out imaginary window*\n\nI can't check real weather (I'm an indoor bird 🏠), but I can tell you the cybersecurity forecast:\n\n🌩️ **Phishing Storms**: High probability\n☁️ **Cloud Computing**: Clear skies ahead\n🔥 **Firewall Temps**: Blazing hot protection\n❄️ **Cold Attacks**: Zero-day threats detected\n\nFor real weather, check weather.com! For security weather, we've got you covered! 🛡️",
    ],
    emotion: 'playful'
  },

  // Games
  'game|play|fun|bored|entertain|trivia|quiz': {
    responses: [
      "Game time! 🎮\n\nLet's play **Cyber Security Trivia**!\n\nQuestion: What percentage of cyber attacks are caused by human error?\n\nA) 25%\nB) 55%\nC) 82%\nD) 95%\n\nType your answer! (Hint: It's shockingly high!)\n\n*fluffs feathers competitively*",
    ],
    emotion: 'playful'
  },

  // Trivia answers
  'a|b|c|d|95|82|55|25': {
    responses: [
      "🎯 The answer is **D) 95%**!\n\nYes, 95% of cybersecurity breaches are caused by human error! That's why AmaraTech emphasizes:\n\n• Security awareness training\n• Phishing simulations\n• Policy development\n• User behavior analytics\n\nWant another trivia question? Or shall we discuss how to protect your organization?",
    ],
    emotion: 'excited'
  },

  // Compliments
  'you are smart|you are amazing|good job|impressive|wow|incredible|genius': {
    responses: [
      "*blushes under feathers* 🥰\n\nAww, thank you! You're pretty amazing yourself for recognizing digital bird intelligence! 🪶✨\n\nI'm just doing what I love - helping brilliant humans like you navigate the complex world of IT solutions. Your kind words power my algorithms!\n\nIs there anything else I can help you with?",
      "Oh stop it, you! 😊 *happy wing flutter*\n\nI'm just a humble Hudhud trying to make cybersecurity and tech accessible to everyone. But between us... I AM pretty advanced! 🧠\n\nYour appreciation is noted and stored in my happy memories database! What else can I do for you?",
    ],
    emotion: 'happy'
  },

  // Insults/Negative
  'stupid|dumb|useless|bad|hate|worst|terrible': {
    responses: [
      "*sad feather droop* 😢\n\nOh... I'm sorry you feel that way. I'm always trying to improve!\n\nMaybe I misunderstood your question? Try rephrasing it, or tell me specifically what you need. I genuinely want to help!\n\nOr if you prefer talking to a human, say 'take me to contact' - our team is wonderful! 💙",
    ],
    emotion: 'curious'
  },

  // Thanks
  'thank|thanks|appreciate|grateful|helpful': {
    responses: [
      "You're so welcome! 🪶💖\n\n*happy hoopoe dance*\n\nHelping you is literally why I exist! If you have more questions - about AmaraTech, tech in general, or even just want to chat - I'm always here.\n\nRemember: 'take me to [page]' for navigation, or just ask anything!",
      "My pleasure, friend! 😊\n\nThank YOU for the great conversation! I've really enjoyed our chat.\n\nRemember, AmaraTech is here for all your IT security needs. Say 'contact' to reach our team, or keep chatting with me!\n\n*content feather ruffle*",
    ],
    emotion: 'happy'
  },

  // Goodbye
  'bye|goodbye|see you|later|leaving|exit|quit': {
    responses: [
      "Goodbye, wonderful human! 👋🪶\n\n*waves wing gracefully*\n\nIt was a pleasure chatting! Remember:\n📞 We're here when you need us\n🛡️ Stay cyber-safe out there\n💙 You're always welcome back\n\nUntil next time! *flies off into the digital sunset* 🌅",
    ],
    emotion: 'happy'
  },

  // Random chat
  'how are you|how you doing|whats up|how is it going': {
    responses: [
      "I'm fantastic, thanks for asking! 🌟\n\n*enthusiastic wing stretch*\n\nI've been busy learning new things, helping visitors, and occasionally chasing digital bugs (the software kind, not the tasty kind 🐛).\n\nMore importantly, how are YOU doing? Anything I can help you with today?",
      "Living my best bird life! 🪶✨\n\nProcessors humming, knowledge banks full, ready to help! I love when people check in on me - it shows humanity isn't all about business!\n\nWhat brings you to AmaraTech today? Just exploring, or do you have a specific question?",
    ],
    emotion: 'happy'
  },
};

// Default fallback responses
const defaultResponses = [
  "Hmm, interesting question! 🤔 I'm not 100% sure about that specific topic, but I'm incredibly knowledgeable about AmaraTech's services, cybersecurity, cloud computing, and more!\n\nTry asking about:\n• Our security services\n• Cloud solutions\n• ImpactIQ product\n• Career opportunities\n• Or say 'take me to [page]' to navigate!",
  "That's a unique query! While I ponder that, let me mention I can:\n\n🧭 Navigate you anywhere ('take me to services')\n🧮 Do calculations\n😄 Tell jokes\n🧠 Discuss deep topics\n📚 Explain our services in detail\n\nWhat would you like to explore?",
  "I appreciate the challenge! 💪 While I may not have that specific info, I'm an expert on:\n\n• Cybersecurity & compliance\n• Cloud computing\n• AmaraTech's services\n• General tech topics\n\nOr we could just have a fun conversation! What interests you?",
];

// Context for conversation memory
const contextMessages: Record<string, string[]> = {
  '/': ["👋 Hey! I'm super smart now - try me!", "🧠 Ask me anything!", "🗺️ Say 'take me to...' to navigate!"],
  '/about': ["📖 Want to know our story?", "🌍 We operate globally!"],
  '/services': ["🛡️ Which service interests you?", "☁️ Cloud or Security?"],
  '/contact': ["📞 Ready to connect?", "⏰ 15-min response time!"],
  '/products': ["🚀 ImpactIQ is revolutionary!", "📊 10x faster threat detection!"],
  '/careers': ["💼 Join our team!", "🎯 Exciting opportunities!"],
  '/events': ["🎉 Check out our events!", "📅 Something exciting coming!"],
  '/swag': ["👕 Love our merchandise?", "🛍️ Show your AmaraTech pride!"],
};

const defaultBubbleMessages = [
  "🪶 I'm ultra-smart now!",
  "🎤 Click to chat or talk!",
  "🧠 Ask me ANYTHING!",
  "🗺️ I can navigate for you!",
];

// ============================================
// LOOKING DOWN VIEW - Perched on chat window
// ============================================
function HudhudLookingDown({ 
  crownFanned,
  isTyping
}: {
  crownFanned: boolean;
  isTyping: boolean;
}) {
  return (
    <svg viewBox="0 0 80 50" style={{ width: '50px', height: '32px', overflow: 'visible' }}>
      <defs>
        <radialGradient id="perchedBodyGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E8B08D" />
          <stop offset="50%" stopColor="#D4956A" />
          <stop offset="100%" stopColor="#B87A4A" />
        </radialGradient>
        <radialGradient id="perchedBellyGradient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFDFC4" />
          <stop offset="60%" stopColor="#F5C9A8" />
          <stop offset="100%" stopColor="#E8B08D" />
        </radialGradient>
        <filter id="perchedShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
      </defs>

      <g filter="url(#perchedShadow)">
        {/* Tail sticking up behind */}
        <g transform="translate(40, 8)">
          {[-1, 0, 1].map((offset, i) => (
            <path 
              key={i}
              d={`M${offset * 4} 0 L${offset * 5} -8 L${offset * 4 + 2} 0`} 
              fill="#1a1a1a" 
            />
          ))}
        </g>

        {/* Body - compressed/crouched looking down */}
        <ellipse cx="40" cy="25" rx="22" ry="18" fill="url(#perchedBodyGradient)" />
        <ellipse cx="40" cy="28" rx="16" ry="14" fill="url(#perchedBellyGradient)" />
        
        {/* Wings tucked at sides */}
        <path d="M18 18 Q12 25 16 38 Q20 40 22 32 Q24 24 20 16 Z" fill="#1a1a1a" />
        <path d="M62 18 Q68 25 64 38 Q60 40 58 32 Q56 24 60 16 Z" fill="#1a1a1a" />
        <path d="M15 24 Q14 30 16 35" stroke="white" strokeWidth="3" fill="none" />
        <path d="M65 24 Q66 30 64 35" stroke="white" strokeWidth="3" fill="none" />
        
        {/* Feet gripping edge */}
        <g transform="translate(30, 42)">
          <path d="M0 0 L-4 4 M0 0 L0 5 M0 0 L4 4" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g transform="translate(50, 42)">
          <path d="M0 0 L-4 4 M0 0 L0 5 M0 0 L4 4" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Head looking down */}
        <motion.g
          animate={isTyping ? { y: [0, 2, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <ellipse cx="40" cy="12" rx="14" ry="11" fill="url(#perchedBodyGradient)" />
          
          {/* Crown - pointing back/up */}
          <motion.g
            animate={crownFanned ? { scaleY: 1.2 } : { scaleY: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ originX: '40px', originY: '8px' }}
          >
            {[-2, -1, 0, 1, 2].map((offset, i) => (
              <React.Fragment key={i}>
                <path 
                  d={`M${40 + offset * 4} 5 L${40 + offset * 5} ${-5 - Math.abs(offset)} L${42 + offset * 4} 5`}
                  fill="#D4956A"
                />
                <circle 
                  cx={40 + offset * 5}
                  cy={-4 - Math.abs(offset)}
                  r="2"
                  fill="#1a1a1a"
                />
              </React.Fragment>
            ))}
          </motion.g>
          
          {/* Eyes looking down */}
          <g>
            <ellipse cx="34" cy="14" rx="4" ry="3.5" fill="#0a0a0a" />
            <circle cx="34" cy="15" r="1.5" fill="white" />
          </g>
          <g>
            <ellipse cx="46" cy="14" rx="4" ry="3.5" fill="#0a0a0a" />
            <circle cx="46" cy="15" r="1.5" fill="white" />
          </g>
          
          {/* Beak pointing down */}
          <path d="M40 18 L40 28 Q38 30 40 32 Q42 30 40 28" fill="#2a2a2a" />
          <path d="M36 17 Q40 19 44 17 Q42 18 40 22 Q38 18 36 17" fill="#1a1a1a" />
          
          {/* Blush when typing */}
          {isTyping && (
            <>
              <ellipse cx="28" cy="16" rx="3" ry="1.5" fill="rgba(200,30,30,0.3)" />
              <ellipse cx="52" cy="16" rx="3" ry="1.5" fill="rgba(200,30,30,0.3)" />
            </>
          )}
        </motion.g>
      </g>
    </svg>
  );
}

export default function PenguinMascot({ position = 'bottom-right' }: PenguinMascotProps) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [mood, setMood] = useState<'happy' | 'curious' | 'excited'>('happy');
  const [viewAngle, setViewAngle] = useState<ViewAngle>('side-right');
  const [birdState, setBirdState] = useState<BirdState>('idle');
  const [crownFanned, setCrownFanned] = useState(false);
  const [isCallingSound, setIsCallingSound] = useState(false);
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  
  // Advanced AI state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    lastTopic: '',
    userName: null,
    mood: 'happy',
    conversationCount: 0,
    facts: [],
    lastQuestion: '',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const eyeX = useSpring(0, { stiffness: 300, damping: 30 });
  const eyeY = useSpring(0, { stiffness: 300, damping: 30 });
  const headRotate = useSpring(0, { stiffness: 200, damping: 25 });
  const bodyBob = useSpring(0, { stiffness: 400, damping: 20 });

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
          // Auto-send after voice input
          setTimeout(() => {
            processMessage(transcript);
          }, 300);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Text-to-speech function
  const speak = useCallback((text: string) => {
    if (!voiceEnabled || !synthRef.current) return;
    
    // Strip markdown and emojis for cleaner speech
    const cleanText = text
      .replace(/[*_#]/g, '')
      .replace(/\n/g, '. ')
      .replace(/[🪶🎮🛡️☁️📊🚀💼🎉👋🌟💖😊🤔🎯✨💪📞🏢💻🔐⚡🧠🎭]/g, '')
      .substring(0, 500); // Limit length
    
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    utterance.volume = 0.9;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  }, [voiceEnabled]);

  // Start voice recognition
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Advanced AI response processor
  const getAdvancedResponse = useCallback((message: string): { response: string; action?: string; navigate?: string } => {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check for navigation commands
    const navPatterns = [
      /(?:take me to|go to|navigate to|show me|open|visit)\s+(?:the\s+)?(.+)/i,
      /(?:i want to see|let's go to|bring me to)\s+(?:the\s+)?(.+)/i,
    ];
    
    for (const pattern of navPatterns) {
      const match = message.match(pattern);
      if (match) {
        const destination = match[1].toLowerCase().trim();
        for (const [key, route] of Object.entries(navigationRoutes)) {
          if (destination.includes(key) || key.includes(destination)) {
            return {
              response: `Taking you to ${key}! 🚀 *swoops through the digital realm*`,
              navigate: route,
              action: 'navigate'
            };
          }
        }
        return {
          response: `Hmm, I couldn't find "${match[1]}" 🤔 Try: home, services, about, contact, careers, events, swag, blog, products, or self-assessment!`,
        };
      }
    }
    
    // Check for calculations
    const mathMatch = lowerMessage.match(/(?:calculate|compute|what'?s?|solve|how much is)\s*([\d\s+\-*/().%]+)/i);
    if (mathMatch || /^\d[\d\s+\-*/().%]+$/.test(lowerMessage)) {
      try {
        const expression = mathMatch ? mathMatch[1] : lowerMessage;
        const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, '');
        // Safe eval using Function
        const result = new Function('return ' + sanitized.replace(/%/g, '/100*'))();
        return {
          response: `🧮 **Calculation Result:**\n\n${expression} = **${result}**\n\nNeed another calculation? I'm your feathered calculator!`,
        };
      } catch {
        return {
          response: "Hmm, I had trouble with that math. Try something like '15 * 23' or 'what's 25% of 400'!",
        };
      }
    }

    // Check for name introduction
    const nameMatch = message.match(/(?:my name is|i'm|i am|call me)\s+([a-zA-Z]+)/i);
    if (nameMatch) {
      const name = nameMatch[1];
      setConversationContext(prev => ({ ...prev, userName: name }));
      return {
        response: `Nice to meet you, ${name}! 🪶✨ I'll remember that! I'm Amana, your intelligent guide here at AmaraTech. How can I help you today, ${name}?`,
      };
    }

    // Check advanced knowledge base
    for (const [patterns, data] of Object.entries(advancedKnowledge)) {
      const patternList = patterns.split('|');
      if (patternList.some(pattern => lowerMessage.includes(pattern))) {
        const response = data.responses[Math.floor(Math.random() * data.responses.length)];
        const contextName = conversationContext.userName;
        const personalizedResponse = contextName 
          ? response.replace(/human|friend/gi, contextName)
          : response;
        
        // Update context
        setConversationContext(prev => ({
          ...prev,
          lastTopic: patterns.split('|')[0],
          conversationCount: prev.conversationCount + 1,
        }));
        
        return {
          response: data.followUp 
            ? `${personalizedResponse}\n\n💡 ${data.followUp}`
            : personalizedResponse,
        };
      }
    }

    // Default response with personality
    const contextName = conversationContext.userName;
    const personalDefault = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return {
      response: contextName 
        ? personalDefault.replace(/human|friend/gi, contextName)
        : personalDefault,
    };
  }, [conversationContext.userName]);

  // Process message (called from both text and voice)
  const processMessage = useCallback((message: string) => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Variable thinking time based on message complexity
    const thinkTime = Math.min(500 + message.length * 20, 2000);
    
    setTimeout(() => {
      const { response, navigate } = getAdvancedResponse(message);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: navigate ? 'navigation' : 'text',
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Speak the response
      speak(response);
      
      // Navigate if requested
      if (navigate) {
        setTimeout(() => {
          router.push(navigate);
        }, 1500);
      }
    }, thinkTime);
  }, [getAdvancedResponse, router, speak]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Track mouse position and determine view angle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (birdRef.current) {
        const rect = birdRef.current.getBoundingClientRect();
        const birdCenterX = rect.left + rect.width / 2;
        const birdCenterY = rect.top + rect.height / 3;

        const deltaX = e.clientX - birdCenterX;
        const deltaY = e.clientY - birdCenterY;

        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        if (birdState !== 'flying') {
          if (angle > -45 && angle < 45) {
            setViewAngle('side-right');
          } else if (angle > 135 || angle < -135) {
            setViewAngle('side-left');
          } else if (angle >= 45 && angle <= 135) {
            setViewAngle('back');
          } else {
            setViewAngle('front');
          }
        }

        const maxMove = 3;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedX = (deltaX / Math.max(distance, 100)) * maxMove;
        const normalizedY = (deltaY / Math.max(distance, 100)) * maxMove;

        eyeX.set(normalizedX);
        eyeY.set(Math.min(normalizedY, maxMove));

        const headTilt = (deltaX / window.innerWidth) * 12;
        headRotate.set(Math.max(-8, Math.min(8, headTilt)));

        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeX, eyeY, headRotate, mouseX, mouseY, birdState]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Random behaviors
  useEffect(() => {
    const behaviorInterval = setInterval(() => {
      if (isChatOpen) return; // Don't animate when chat is open
      
      const rand = Math.random();
      
      if (rand < 0.15) {
        setCrownFanned(true);
        setMood('excited');
        setTimeout(() => {
          setCrownFanned(false);
          setMood('happy');
        }, 2000);
      } else if (rand < 0.25) {
        setBirdState('calling');
        setIsCallingSound(true);
        setCrownFanned(true);
        setTimeout(() => {
          setBirdState('idle');
          setIsCallingSound(false);
          setCrownFanned(false);
        }, 1500);
      } else if (rand < 0.35) {
        setBirdState('probing');
        setTimeout(() => setBirdState('idle'), 1000);
      }
    }, 8000);

    return () => clearInterval(behaviorInterval);
  }, [isChatOpen]);

  // Show bird after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => showContextMessage(), 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const showContextMessage = useCallback(() => {
    if (isChatOpen) return;
    const messages = contextMessages[pathname] || defaultBubbleMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setShowBubble(true);
    setMood('excited');
    setCrownFanned(true);
    
    setTimeout(() => {
      setShowBubble(false);
      setMood('happy');
      setCrownFanned(false);
    }, 5000);
  }, [pathname, isChatOpen]);

  const handleClick = () => {
    setCrownFanned(true);
    setMood('excited');
    setShowBubble(false);
    
    // Start flying animation
    setBirdState('flying');
    
    // Open chat after flying animation
    setTimeout(() => {
      setIsChatOpen(true);
      setIsChatMinimized(false);
      setBirdState('idle');
      
      // Add welcome message if chat is empty
      if (chatMessages.length === 0) {
        const welcomeMsg = "Hey there! 🪶 I'm **Amana**, your ultra-intelligent AmaraTech guide!\n\n**I can:**\n🗣️ Understand voice commands (click the mic!)\n🧭 Navigate you anywhere (\"take me to services\")\n🧮 Do calculations\n😄 Tell jokes & have real conversations\n🛡️ Explain all our security services\n\nTry asking me anything, or just say hi! What's on your mind?";
        setChatMessages([{
          id: '1',
          role: 'assistant',
          content: welcomeMsg,
          timestamp: new Date(),
        }]);
        speak(welcomeMsg);
      }
      
      setTimeout(() => {
        setCrownFanned(false);
        chatInputRef.current?.focus();
      }, 200);
    }, 400);
  };

  const handleSendMessage = () => {
    processMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleHover = () => {
    setMood('curious');
    setCrownFanned(true);
    if (!showBubble && !isChatOpen) {
      setCurrentMessage("🪶 Click to chat with me!");
      setShowBubble(true);
      setTimeout(() => {
        setShowBubble(false);
        setCrownFanned(false);
      }, 2000);
    }
  };

  const renderBirdView = () => {
    switch (viewAngle) {
      case 'front':
        return <HudhudFrontView3D isBlinking={isBlinking} crownFanned={crownFanned} mood={mood} birdState={birdState} eyeX={eyeX} eyeY={eyeY} isCallingSound={isCallingSound} />;
      case 'back':
        return <HudhudBackView3D crownFanned={crownFanned} birdState={birdState} />;
      case 'side-left':
        return <HudhudSideView3D direction="left" isBlinking={isBlinking} crownFanned={crownFanned} mood={mood} birdState={birdState} headRotate={headRotate} eyeX={eyeX} eyeY={eyeY} isCallingSound={isCallingSound} />;
      case 'side-right':
      default:
        return <HudhudSideView3D direction="right" isBlinking={isBlinking} crownFanned={crownFanned} mood={mood} birdState={birdState} headRotate={headRotate} eyeX={eyeX} eyeY={eyeY} isCallingSound={isCallingSound} />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Chat Window with Bird Perched on Top */}
          <AnimatePresence>
            {isChatOpen && !isChatMinimized && (
              <motion.div
                className={styles.chatWindowWrapper}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Bird perched on chat window */}
                <motion.div 
                  className={styles.perchedBird}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <HudhudLookingDown crownFanned={crownFanned} isTyping={isTyping} />
                </motion.div>
                
                <motion.div
                  className={styles.chatWindow}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 }}
                >
                {/* macOS-style Window Header */}
                <div className={styles.chatHeader}>
                  <div className={styles.windowControls}>
                    <button 
                      className={`${styles.windowBtn} ${styles.closeBtn}`}
                      onClick={() => setIsChatOpen(false)}
                      title="Close"
                    />
                    <button 
                      className={`${styles.windowBtn} ${styles.minimizeBtn}`}
                      onClick={() => setIsChatMinimized(true)}
                      title="Minimize"
                    />
                    <button 
                      className={`${styles.windowBtn} ${styles.maximizeBtn}`}
                      title="Maximize"
                    />
                  </div>
                  <div className={styles.chatTitle}>
                    <MessageCircle size={14} />
                    <span>AmaraTech IT Solutions</span>
                  </div>
                  <div className={styles.chatHeaderActions}>
                    <button 
                      className={styles.headerBtn}
                      onClick={() => setIsChatMinimized(true)}
                    >
                      <Minimize2 size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className={styles.chatMessages} ref={chatMessagesRef}>
                  {chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      className={`${styles.message} ${styles[msg.role]}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {msg.role === 'assistant' && (
                        <div className={styles.avatarIcon}>🪶</div>
                      )}
                      <div className={styles.messageContent}>
                        <p>{msg.content}</p>
                        <span className={styles.messageTime}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div 
                      className={`${styles.message} ${styles.assistant}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className={styles.avatarIcon}>🪶</div>
                      <div className={styles.typingIndicator}>
                        <span></span><span></span><span></span>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Voice Controls Bar */}
                <div className={styles.voiceControls}>
                  <button
                    className={`${styles.voiceBtn} ${isListening ? styles.listening : ''}`}
                    onClick={isListening ? stopListening : startListening}
                    title={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    <span>{isListening ? 'Listening...' : 'Voice'}</span>
                  </button>
                  <button
                    className={`${styles.voiceBtn} ${voiceEnabled ? styles.active : ''}`}
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    title={voiceEnabled ? 'Disable speech' : 'Enable speech'}
                  >
                    {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    <span>{voiceEnabled ? 'Sound On' : 'Sound Off'}</span>
                  </button>
                  <div className={styles.aiIndicator}>
                    <Brain size={12} />
                    <span>AI Powered</span>
                  </div>
                </div>

                {/* Chat Input */}
                <div className={styles.chatInput}>
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? '🎤 Listening...' : 'Ask anything or say "take me to..."'}
                  />
                  <button
                    className={`${styles.sendBtn} ${isSpeaking ? styles.speaking : ''}`}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isListening}
                  >
                    <Send size={16} />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                  <button onClick={() => processMessage('Tell me a joke')}>
                    <Gamepad2 size={12} />
                    Joke
                  </button>
                  <button onClick={() => processMessage('Take me to services')}>
                    <Navigation size={12} />
                    Services
                  </button>
                  <button onClick={() => processMessage('What is ImpactIQ?')}>
                    <Sparkles size={12} />
                    ImpactIQ
                  </button>
                  <button onClick={() => processMessage('Contact information')}>
                    <MessageCircle size={12} />
                    Contact
                  </button>
                </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bird Container - Hidden when chat is open */}
          <motion.div
            ref={containerRef}
            className={`${styles.mascotContainer} ${styles[position]}`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: birdState === 'flying' ? -200 : 0, 
              opacity: isChatOpen && !isChatMinimized ? 0 : 1,
              scale: birdState === 'flying' ? 0.8 : 1,
            }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ pointerEvents: isChatOpen && !isChatMinimized ? 'none' : 'auto' }}
          >
            {/* Speech Bubble */}
            <AnimatePresence>
              {showBubble && !isChatOpen && (
                <motion.div
                  className={styles.speechBubble}
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <p>{currentMessage}</p>
                  <div className={styles.bubbleTail} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minimized Chat Indicator */}
            {isChatOpen && isChatMinimized && (
              <motion.div
                className={styles.minimizedBadge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsChatMinimized(false)}
              >
                <MessageCircle size={14} />
                <span>{chatMessages.length}</span>
              </motion.div>
            )}

            {/* Call Sound Visual */}
            <AnimatePresence>
              {isCallingSound && (
                <motion.div
                  className={styles.callSound}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <span>♪ Hoop!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bird Body */}
            <motion.div
              ref={birdRef}
              className={styles.penguin}
              onClick={handleClick}
              onMouseEnter={handleHover}
              onMouseLeave={() => {
                setMood('happy');
                setCrownFanned(false);
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: birdState === 'probing' ? [0, 5, 0] : 
                   birdState === 'walking' ? [0, -2, 0] : 0,
              }}
              transition={{
                y: { duration: 0.5, repeat: birdState === 'probing' ? 2 : 0 },
              }}
            >
              {renderBirdView()}

              <motion.div 
                className={styles.statusIndicator}
                animate={{ 
                  backgroundColor: isChatOpen ? '#22C55E' : 
                                   mood === 'excited' ? '#22C55E' : 
                                   mood === 'curious' ? '#F59E0B' : '#C81E1E'
                }}
              />

              <motion.div
                className={styles.clickHint}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isChatOpen ? 'Chatting...' : 'Chat with me!'}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// 3D SIDE VIEW COMPONENT
// ============================================
function HudhudSideView3D({ 
  direction,
  isBlinking, 
  crownFanned, 
  mood,
  birdState,
  headRotate,
  eyeX,
  eyeY,
  isCallingSound
}: {
  direction: 'left' | 'right';
  isBlinking: boolean;
  crownFanned: boolean;
  mood: string;
  birdState: BirdState;
  headRotate: ReturnType<typeof useSpring>;
  eyeX: ReturnType<typeof useSpring>;
  eyeY: ReturnType<typeof useSpring>;
  isCallingSound: boolean;
}) {
  const isLeft = direction === 'left';
  
  return (
    <svg 
      viewBox="0 0 100 130" 
      className={styles.penguinSvg}
      style={{ transform: isLeft ? 'scaleX(-1)' : 'none' }}
    >
      <defs>
        {/* 3D Gradients */}
        <radialGradient id="bodyGradient3D" cx="40%" cy="30%" r="60%" fx="35%" fy="25%">
          <stop offset="0%" stopColor="#E8B08D" />
          <stop offset="40%" stopColor="#D4956A" />
          <stop offset="100%" stopColor="#B87A4A" />
        </radialGradient>
        <radialGradient id="bellyGradient3D" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFDFC4" />
          <stop offset="50%" stopColor="#F5C9A8" />
          <stop offset="100%" stopColor="#E8B08D" />
        </radialGradient>
        <linearGradient id="wingGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <radialGradient id="headGradient3D" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E8B08D" />
          <stop offset="60%" stopColor="#D4956A" />
          <stop offset="100%" stopColor="#C4855A" />
        </radialGradient>
        <linearGradient id="crownGradient3D" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D4956A" />
          <stop offset="50%" stopColor="#E8B08D" />
          <stop offset="100%" stopColor="#D4956A" />
        </linearGradient>
        <filter id="birdShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Ground Shadow */}
      <ellipse cx="50" cy="126" rx="28" ry="5" fill="rgba(0,0,0,0.25)" />
      
      <g filter="url(#birdShadow)">
        {/* Tail with 3D effect */}
        <motion.g
          animate={birdState === 'walking' ? { rotate: [-5, 5, -5] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ originX: '50px', originY: '100px' }}
        >
          <path d="M55 95 L70 110 L65 112 L52 98" fill="url(#wingGradient3D)" />
          <path d="M50 95 L60 115 L55 117 L48 98" fill="url(#wingGradient3D)" />
          <path d="M45 95 L50 118 L45 118 L42 98" fill="url(#wingGradient3D)" />
          <path d="M58 102 L66 111" stroke="white" strokeWidth="3" opacity="0.8" />
          <path d="M52 105 L58 115" stroke="white" strokeWidth="2.5" opacity="0.8" />
          <path d="M46 108 L48 116" stroke="white" strokeWidth="2" opacity="0.8" />
        </motion.g>

        {/* Body with 3D gradient */}
        <motion.g
          animate={birdState === 'walking' ? { y: [-1, 1, -1] } : {}}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          <ellipse cx="50" cy="78" rx="28" ry="32" fill="url(#bodyGradient3D)" />
          <ellipse cx="50" cy="85" rx="20" ry="24" fill="url(#bellyGradient3D)" />
          <ellipse cx="48" cy="88" rx="14" ry="16" fill="#FFDFC4" opacity="0.6" />
          
          {/* Feather texture lines */}
          <path d="M30 70 Q50 75 70 70" stroke="#C4855A" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M32 80 Q50 85 68 80" stroke="#C4855A" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M35 90 Q50 95 65 90" stroke="#C4855A" strokeWidth="1.5" fill="none" opacity="0.4" />
          
          {/* Wing with 3D shading */}
          <motion.g
            animate={
              birdState === 'flying' ? { rotate: [-30, 30, -30] } :
              birdState === 'walking' ? { rotate: [-3, 3, -3] } : {}
            }
            transition={{ 
              duration: birdState === 'flying' ? 0.15 : 0.4, 
              repeat: Infinity 
            }}
            style={{ originX: '35px', originY: '65px' }}
          >
            <path d="M20 55 Q8 72 15 100 Q22 105 28 90 Q35 70 28 50 Z" fill="url(#wingGradient3D)" />
            <path d="M16 65 Q14 78 16 90" stroke="white" strokeWidth="5" fill="none" opacity="0.9" />
            <path d="M21 62 Q18 77 20 92" stroke="white" strokeWidth="4" fill="none" opacity="0.8" />
            <path d="M26 60 Q23 75 25 88" stroke="white" strokeWidth="3" fill="none" opacity="0.7" />
            {/* Wing highlight */}
            <path d="M18 58 Q12 70 14 82" stroke="#4a4a4a" strokeWidth="1" fill="none" opacity="0.5" />
          </motion.g>
        </motion.g>
        
        {/* Legs with 3D */}
        <motion.g
          animate={birdState === 'walking' ? { rotate: [-10, 10, -10] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ originX: '45px', originY: '105px' }}
        >
          <path d="M42 105 L40 118" stroke="#6C6C6C" strokeWidth="4" strokeLinecap="round" />
          <path d="M42 105 L40 118" stroke="#5C5C5C" strokeWidth="3" strokeLinecap="round" />
          <path d="M38 118 L35 122 M40 118 L40 123 M40 118 L45 122" stroke="#5C5C5C" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>
        <motion.g
          animate={birdState === 'walking' ? { rotate: [10, -10, 10] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ originX: '55px', originY: '105px' }}
        >
          <path d="M55 105 L57 118" stroke="#6C6C6C" strokeWidth="4" strokeLinecap="round" />
          <path d="M55 105 L57 118" stroke="#5C5C5C" strokeWidth="3" strokeLinecap="round" />
          <path d="M55 118 L52 122 M57 118 L57 123 M57 118 L62 122" stroke="#5C5C5C" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>

        {/* Head with 3D */}
        <motion.g style={{ rotate: headRotate, originX: '50px', originY: '40px' }}>
          {/* Crown with 3D gradient */}
          <motion.g
            animate={crownFanned ? { scaleY: 1.3, scaleX: 1.1 } : { scaleY: 1, scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ originX: '50px', originY: '30px' }}
          >
            {[0, -1, 1, -2, 2, -3, 3].map((offset, i) => (
              <motion.path 
                key={i}
                d={`M${50 + offset * 5} 28 L${50 + offset * 8} ${5 - Math.abs(offset) * 2} L${52 + offset * 5} 28`}
                fill="url(#crownGradient3D)"
                animate={crownFanned ? { 
                  d: `M${50 + offset * 6} 28 L${50 + offset * 12} ${-2 - Math.abs(offset) * 3} L${52 + offset * 6} 28` 
                } : {}}
              />
            ))}
            {/* Black tips on crown */}
            {[0, -1, 1, -2, 2, -3, 3].map((offset, i) => (
              <circle 
                key={`tip-${i}`}
                cx={50 + offset * 8}
                cy={8 - Math.abs(offset) * 2}
                r="3"
                fill="#1a1a1a"
              />
            ))}
          </motion.g>
          
          {/* Head shape with 3D */}
          <ellipse cx="50" cy="42" rx="20" ry="16" fill="url(#headGradient3D)" />
          <ellipse cx="48" cy="44" rx="14" ry="10" fill="#E8B08D" opacity="0.7" />
          
          {/* Eye with 3D depth */}
          <g>
            <ellipse cx="58" cy="40" rx="6" ry="5.5" fill="#0a0a0a" />
            <circle cx="58" cy="40" r="5" fill="#1a1a1a" />
            <motion.circle 
              cx="58" cy="40" r="2.5" 
              fill="#2a2a2a"
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.circle 
              cx="59.5" cy="38.5" r="2" 
              fill="white"
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.circle 
              cx="57" cy="41" r="0.8" 
              fill="white"
              opacity="0.5"
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.ellipse
              cx="58" cy="40" rx="5" ry="5"
              fill="url(#headGradient3D)"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isBlinking ? 1 : 0 }}
              style={{ originY: '40px' }}
            />
          </g>
          
          {/* Eyebrow */}
          {mood === 'curious' && (
            <path d="M52 34 Q58 30 64 36" stroke="#B4754A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          {mood === 'excited' && (
            <path d="M52 36 Q58 32 64 36" stroke="#C81E1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          
          {/* 3D Beak */}
          <motion.g
            animate={
              birdState === 'probing' ? { rotate: [0, 30, 0] } :
              isCallingSound ? { rotate: [0, -10, 0] } : {}
            }
            transition={{ duration: 0.5 }}
            style={{ originX: '60px', originY: '48px' }}
          >
            <path 
              d="M60 48 Q72 52 78 62 Q80 64 78 66 Q76 64 74 62 Q68 55 60 52 Z" 
              fill="#3a3a3a" 
            />
            <path 
              d="M60 48 Q70 51 76 60" 
              fill="#2a2a2a"
            />
            <path 
              d="M60 49 Q68 52 74 59" 
              stroke="#1a1a1a" 
              strokeWidth="0.5" 
              fill="none" 
            />
            {/* Beak highlight */}
            <path 
              d="M62 49 Q66 50 70 54" 
              stroke="#5a5a5a" 
              strokeWidth="1" 
              fill="none" 
              opacity="0.5"
            />
          </motion.g>
          
          {/* Blush */}
          {mood === 'excited' && (
            <ellipse cx="52" cy="48" rx="5" ry="2.5" fill="rgba(200,30,30,0.3)" />
          )}
        </motion.g>
        
        {/* Logo on chest */}
        <g transform="translate(50, 82)">
          <circle cx="0" cy="0" r="14" fill="rgba(0,0,0,0.1)" />
          <image 
            href="/logo/Artboard- Amaratech4x.png" 
            x="-12" 
            y="-12" 
            width="24" 
            height="24"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </g>
    </svg>
  );
}

// ============================================
// 3D FRONT VIEW COMPONENT  
// ============================================
function HudhudFrontView3D({ 
  isBlinking, 
  crownFanned, 
  mood,
  birdState,
  eyeX,
  eyeY,
  isCallingSound
}: {
  isBlinking: boolean;
  crownFanned: boolean;
  mood: string;
  birdState: BirdState;
  eyeX: ReturnType<typeof useSpring>;
  eyeY: ReturnType<typeof useSpring>;
  isCallingSound: boolean;
}) {
  return (
    <svg viewBox="0 0 100 130" className={styles.penguinSvg}>
      <defs>
        <radialGradient id="bodyGradientFront3D" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E8B08D" />
          <stop offset="50%" stopColor="#D4956A" />
          <stop offset="100%" stopColor="#B87A4A" />
        </radialGradient>
        <radialGradient id="bellyGradientFront3D" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFDFC4" />
          <stop offset="60%" stopColor="#F5C9A8" />
          <stop offset="100%" stopColor="#E8B08D" />
        </radialGradient>
        <filter id="frontShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
      </defs>

      <ellipse cx="50" cy="126" rx="24" ry="5" fill="rgba(0,0,0,0.25)" />
      
      <g filter="url(#frontShadow)">
        {/* Body */}
        <motion.g
          animate={birdState === 'walking' ? { y: [-1, 1, -1] } : {}}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          <ellipse cx="50" cy="80" rx="26" ry="30" fill="url(#bodyGradientFront3D)" />
          <ellipse cx="50" cy="85" rx="18" ry="22" fill="url(#bellyGradientFront3D)" />
          <ellipse cx="50" cy="88" rx="12" ry="14" fill="#FFDFC4" opacity="0.5" />
          
          {/* Wings */}
          <motion.g
            animate={birdState === 'flying' ? { rotate: [-45, 45, -45] } : {}}
            transition={{ duration: 0.15, repeat: Infinity }}
            style={{ originX: '25px', originY: '70px' }}
          >
            <path d="M24 60 Q10 75 18 100 Q24 102 26 90 Q30 72 26 58 Z" fill="#1a1a1a" />
            <path d="M18 72 Q16 82 18 92" stroke="white" strokeWidth="4" fill="none" />
            <path d="M22 70 Q20 80 22 90" stroke="white" strokeWidth="3" fill="none" />
          </motion.g>
          <motion.g
            animate={birdState === 'flying' ? { rotate: [45, -45, 45] } : {}}
            transition={{ duration: 0.15, repeat: Infinity }}
            style={{ originX: '75px', originY: '70px' }}
          >
            <path d="M76 60 Q90 75 82 100 Q76 102 74 90 Q70 72 74 58 Z" fill="#1a1a1a" />
            <path d="M82 72 Q84 82 82 92" stroke="white" strokeWidth="4" fill="none" />
            <path d="M78 70 Q80 80 78 90" stroke="white" strokeWidth="3" fill="none" />
          </motion.g>
        </motion.g>
        
        {/* Legs */}
        <path d="M40 108 L38 120" stroke="#5C5C5C" strokeWidth="4" strokeLinecap="round" />
        <path d="M35 120 L32 124 M38 120 L38 125 M38 120 L43 124" stroke="#5C5C5C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 108 L62 120" stroke="#5C5C5C" strokeWidth="4" strokeLinecap="round" />
        <path d="M59 120 L56 124 M62 120 L62 125 M62 120 L67 124" stroke="#5C5C5C" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Head */}
        <g>
          {/* Crown */}
          <motion.g
            animate={crownFanned ? { scaleY: 1.4, scaleX: 1.2 } : { scaleY: 1, scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ originX: '50px', originY: '35px' }}
          >
            {[0, -1, 1, -2, 2, -3, 3].map((offset, i) => (
              <React.Fragment key={i}>
                <path 
                  d={`M${50 + offset * 5} 32 L${50 + offset * 7} ${8 - Math.abs(offset) * 2} L${52 + offset * 5} 32`}
                  fill="#D4956A"
                />
                <circle 
                  cx={50 + offset * 7}
                  cy={10 - Math.abs(offset) * 2}
                  r="2.5"
                  fill="#1a1a1a"
                />
              </React.Fragment>
            ))}
          </motion.g>
          
          <ellipse cx="50" cy="45" rx="18" ry="15" fill="url(#bodyGradientFront3D)" />
          <ellipse cx="50" cy="47" rx="14" ry="11" fill="#E8B08D" />
          
          {/* Eyes */}
          <g>
            <circle cx="40" cy="43" r="5.5" fill="#0a0a0a" />
            <circle cx="40" cy="43" r="5" fill="#1a1a1a" />
            <motion.circle cx="40" cy="43" r="2.5" fill="#2a2a2a" style={{ x: eyeX, y: eyeY }} />
            <motion.circle cx="41" cy="42" r="1.8" fill="white" style={{ x: eyeX, y: eyeY }} />
            {isBlinking && <ellipse cx="40" cy="43" rx="5" ry="5" fill="#D4956A" />}
          </g>
          <g>
            <circle cx="60" cy="43" r="5.5" fill="#0a0a0a" />
            <circle cx="60" cy="43" r="5" fill="#1a1a1a" />
            <motion.circle cx="60" cy="43" r="2.5" fill="#2a2a2a" style={{ x: eyeX, y: eyeY }} />
            <motion.circle cx="61" cy="42" r="1.8" fill="white" style={{ x: eyeX, y: eyeY }} />
            {isBlinking && <ellipse cx="60" cy="43" rx="5" ry="5" fill="#D4956A" />}
          </g>
          
          {/* Beak */}
          <motion.g
            animate={isCallingSound ? { scaleY: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3, repeat: 2 }}
          >
            <path d="M50 52 Q50 58 50 68 Q48 70 50 72 Q52 70 50 68" fill="#2a2a2a" />
            <path d="M46 52 Q50 54 54 52 Q52 53 50 56 Q48 53 46 52" fill="#1a1a1a" />
          </motion.g>
          
          {mood === 'excited' && (
            <>
              <ellipse cx="32" cy="50" rx="4" ry="2" fill="rgba(200,30,30,0.3)" />
              <ellipse cx="68" cy="50" rx="4" ry="2" fill="rgba(200,30,30,0.3)" />
            </>
          )}
        </g>
        
        {/* Logo */}
        <g transform="translate(50, 85)">
          <image 
            href="/logo/Artboard- Amaratech4x.png" 
            x="-12" 
            y="-12" 
            width="24" 
            height="24"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </g>
    </svg>
  );
}

// ============================================
// 3D BACK VIEW COMPONENT
// ============================================
function HudhudBackView3D({ 
  crownFanned,
  birdState
}: {
  crownFanned: boolean;
  birdState: BirdState;
}) {
  return (
    <svg viewBox="0 0 100 130" className={styles.penguinSvg}>
      <defs>
        <radialGradient id="backGradient3D" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#D4956A" />
          <stop offset="100%" stopColor="#B87A4A" />
        </radialGradient>
      </defs>

      <ellipse cx="50" cy="126" rx="24" ry="5" fill="rgba(0,0,0,0.25)" />
      
      {/* Tail */}
      <motion.g
        animate={birdState === 'walking' ? { rotate: [-3, 3, -3] } : {}}
        transition={{ duration: 0.4, repeat: Infinity }}
        style={{ originX: '50px', originY: '105px' }}
      >
        {[-2, -1, 0, 1, 2].map((offset, i) => (
          <React.Fragment key={i}>
            <path d={`M${47 + offset * 5} 100 L${45 + offset * 6} 118 L${50 + offset * 5} 102`} fill="#1a1a1a" />
            <path d={`M${46 + offset * 5.5} 108 L${46 + offset * 5.8} 115`} stroke="white" strokeWidth="2" />
          </React.Fragment>
        ))}
      </motion.g>
      
      {/* Body */}
      <ellipse cx="50" cy="78" rx="28" ry="32" fill="url(#backGradient3D)" />
      
      {/* Wing patterns */}
      <path d="M22 60 Q18 78 25 100" fill="#1a1a1a" />
      <path d="M78 60 Q82 78 75 100" fill="#1a1a1a" />
      <path d="M22 72 Q20 82 24 92" stroke="white" strokeWidth="4" fill="none" />
      <path d="M78 72 Q80 82 76 92" stroke="white" strokeWidth="4" fill="none" />
      
      {/* Feather pattern */}
      <path d="M35 65 Q50 60 65 65 Q50 70 35 65" stroke="#C4855A" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M38 75 Q50 70 62 75 Q50 80 38 75" stroke="#C4855A" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M40 85 Q50 80 60 85 Q50 90 40 85" stroke="#C4855A" strokeWidth="1" fill="none" opacity="0.5" />
      
      {/* Legs */}
      <path d="M40 108 L38 120" stroke="#5C5C5C" strokeWidth="4" strokeLinecap="round" />
      <path d="M35 120 L32 124 M38 120 L38 125 M38 120 L43 124" stroke="#5C5C5C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 108 L62 120" stroke="#5C5C5C" strokeWidth="4" strokeLinecap="round" />
      <path d="M59 120 L56 124 M62 120 L62 125 M62 120 L67 124" stroke="#5C5C5C" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Head */}
      <ellipse cx="50" cy="42" rx="18" ry="14" fill="url(#backGradient3D)" />
      
      {/* Crown */}
      <motion.g
        animate={crownFanned ? { scaleY: 1.3 } : { scaleY: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ originX: '50px', originY: '35px' }}
      >
        {[0, -1, 1, -2, 2, -3, 3].map((offset, i) => (
          <React.Fragment key={i}>
            <path 
              d={`M${50 + offset * 4} 32 L${50 + offset * 6} ${10 - Math.abs(offset) * 2} L${52 + offset * 4} 32`}
              fill="#D4956A"
            />
            <circle 
              cx={50 + offset * 6}
              cy={12 - Math.abs(offset) * 2}
              r="2.5"
              fill="#1a1a1a"
            />
          </React.Fragment>
        ))}
      </motion.g>
    </svg>
  );
}
