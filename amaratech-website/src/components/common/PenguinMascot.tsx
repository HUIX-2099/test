'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './PenguinMascot.module.css';

interface PenguinMascotProps {
  position?: 'bottom-right' | 'bottom-left';
}

// Context-aware messages based on page/section
const contextMessages: Record<string, string[]> = {
  '/': [
    "👋 Welcome! I'm Penny, your security guide!",
    "🔐 Scroll down to explore our services!",
    "☁️ Check out our cloud solutions below!",
    "⚡ Click me for quick tips!",
  ],
  '/about': [
    "📖 Learn about our 15+ years of excellence!",
    "🌍 We serve clients across 3 continents!",
    "🏆 Scroll to see our certifications!",
  ],
  '/services': [
    "🛡️ Explore our cybersecurity services!",
    "☁️ We're Microsoft Azure experts!",
    "🔒 Need compliance help? We've got you!",
  ],
  '/contact': [
    "📞 Ready to chat? Fill out the form!",
    "⏰ We respond within 15 minutes!",
    "🤝 Let's secure your business together!",
  ],
  '/products': [
    "🚀 Check out ImpactIQ - our AI platform!",
    "📊 Real-time vulnerability detection!",
    "⚡ 10x faster threat identification!",
  ],
};

const defaultMessages = [
  "🔐 Did you know? AmaraTech protects thousands of endpoints!",
  "☁️ Our cloud migrations have a 99.9% success rate!",
  "🛡️ We're CMMC & HIPAA compliance experts!",
  "🌍 We serve clients across the US and West Africa!",
  "⚡ ImpactIQ detects vulnerabilities 10x faster!",
  "👋 Hi! I'm Penny, your friendly security penguin!",
  "🔒 Zero-trust architecture is our specialty!",
  "📊 Over 15 years of IT excellence!",
];

const guideTips = [
  { trigger: 'scroll_top', message: "⬆️ Scroll up to see our hero section!" },
  { trigger: 'scroll_bottom', message: "⬇️ Keep scrolling for more!" },
  { trigger: 'idle', message: "💡 Need help? Click me for guidance!" },
];

export default function PenguinMascot({ position = 'bottom-right' }: PenguinMascotProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const penguinRef = useRef<HTMLDivElement>(null);
  
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [mood, setMood] = useState<'happy' | 'curious' | 'excited'>('happy');

  // Cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const eyeX = useSpring(0, { stiffness: 300, damping: 30 });
  const eyeY = useSpring(0, { stiffness: 300, damping: 30 });
  const headRotate = useSpring(0, { stiffness: 200, damping: 25 });

  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (penguinRef.current) {
        const rect = penguinRef.current.getBoundingClientRect();
        const penguinCenterX = rect.left + rect.width / 2;
        const penguinCenterY = rect.top + rect.height / 3; // Eye level

        // Calculate relative position
        const deltaX = e.clientX - penguinCenterX;
        const deltaY = e.clientY - penguinCenterY;

        // Normalize eye movement (max 4px movement)
        const maxMove = 4;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedX = (deltaX / Math.max(distance, 100)) * maxMove;
        const normalizedY = (deltaY / Math.max(distance, 100)) * maxMove;

        eyeX.set(normalizedX);
        eyeY.set(Math.min(normalizedY, maxMove)); // Limit upward look

        // Head rotation based on horizontal position
        const headTilt = (deltaX / window.innerWidth) * 15;
        headRotate.set(Math.max(-10, Math.min(10, headTilt)));

        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeX, eyeY, headRotate, mouseX, mouseY]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Show penguin after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Initial greeting
      setTimeout(() => {
        showContextMessage();
      }, 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Context-aware messaging
  const showContextMessage = useCallback(() => {
    const messages = contextMessages[pathname] || defaultMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setShowBubble(true);
    setMood('excited');
    
    setTimeout(() => {
      setShowBubble(false);
      setMood('happy');
    }, 5000);
  }, [pathname]);

  // Scroll detection for guide tips
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(idleTimer);
      
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollY < 100) {
        setMood('curious');
      } else if (scrollY > maxScroll - 100) {
        setMood('happy');
      }

      // Reset idle timer
      idleTimer = setTimeout(() => {
        if (!showBubble && Math.random() > 0.7) {
          const tip = guideTips[Math.floor(Math.random() * guideTips.length)];
          setCurrentMessage(tip.message);
          setShowBubble(true);
          setTimeout(() => setShowBubble(false), 4000);
        }
      }, 10000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(idleTimer);
    };
  }, [showBubble]);

  // Handle click
  const handleClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 800);
    showContextMessage();
  };

  // Handle hover
  const handleHover = () => {
    setMood('curious');
    if (!showBubble) {
      setCurrentMessage("💡 Click me for tips!");
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className={`${styles.mascotContainer} ${styles[position]}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Speech Bubble */}
          <AnimatePresence>
            {showBubble && (
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

          {/* Penguin Body */}
          <motion.div
            ref={penguinRef}
            className={styles.penguin}
            onClick={handleClick}
            onMouseEnter={handleHover}
            onMouseLeave={() => setMood('happy')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Penguin SVG with animated parts */}
            <svg viewBox="0 0 100 120" className={styles.penguinSvg}>
              {/* Shadow */}
              <ellipse cx="50" cy="115" rx="25" ry="5" fill="rgba(0,0,0,0.2)" />

              {/* Body */}
              <motion.g
                animate={isWaving ? { rotate: [-2, 2, -2, 2, 0] } : {}}
                transition={{ duration: 0.8 }}
                style={{ originX: '50px', originY: '70px' }}
              >
                <ellipse cx="50" cy="70" rx="35" ry="45" fill="#1a1a2e" />
                
                {/* Belly */}
                <ellipse cx="50" cy="75" rx="22" ry="32" fill="#f8f8f8" />
                
                {/* Left Wing */}
                <motion.ellipse
                  cx="18" cy="65" rx="12" ry="28"
                  fill="#1a1a2e"
                  animate={isWaving ? { 
                    rotate: [-30, 30, -30, 30, 0],
                    y: [-5, 5, -5, 5, 0]
                  } : {}}
                  transition={{ duration: 0.8 }}
                  style={{ originX: '25px', originY: '50px' }}
                />
                
                {/* Right Wing */}
                <motion.ellipse
                  cx="82" cy="65" rx="12" ry="28"
                  fill="#1a1a2e"
                  animate={isWaving ? { 
                    rotate: [30, -30, 30, -30, 0],
                    y: [5, -5, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.8 }}
                  style={{ originX: '75px', originY: '50px' }}
                />
              </motion.g>
              
              {/* Head - rotates to follow cursor */}
              <motion.g style={{ rotate: headRotate, originX: '50px', originY: '30px' }}>
                <circle cx="50" cy="30" r="25" fill="#1a1a2e" />
                
                {/* Face */}
                <ellipse cx="50" cy="35" rx="18" ry="15" fill="#f8f8f8" />
                
                {/* Left Eye */}
                <g>
                  <circle cx="42" cy="28" r="6" fill="white" />
                  <motion.circle 
                    cx="42" 
                    cy="28" 
                    r="3.5" 
                    fill="#1a1a2e"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  <motion.circle 
                    cx="43" 
                    cy="27" 
                    r="1.2" 
                    fill="white"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  {/* Eyelid for blinking */}
                  <motion.ellipse
                    cx="42" cy="28" rx="6" ry="6"
                    fill="#1a1a2e"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isBlinking ? 1 : 0 }}
                    style={{ originY: '28px' }}
                  />
                </g>
                
                {/* Right Eye */}
                <g>
                  <circle cx="58" cy="28" r="6" fill="white" />
                  <motion.circle 
                    cx="58" 
                    cy="28" 
                    r="3.5" 
                    fill="#1a1a2e"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  <motion.circle 
                    cx="59" 
                    cy="27" 
                    r="1.2" 
                    fill="white"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  {/* Eyelid for blinking */}
                  <motion.ellipse
                    cx="58" cy="28" rx="6" ry="6"
                    fill="#1a1a2e"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isBlinking ? 1 : 0 }}
                    style={{ originY: '28px' }}
                  />
                </g>
                
                {/* Eyebrows based on mood */}
                {mood === 'curious' && (
                  <>
                    <line x1="38" y1="20" x2="46" y2="22" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
                    <line x1="62" y1="22" x2="54" y2="20" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
                {mood === 'excited' && (
                  <>
                    <line x1="38" y1="22" x2="46" y2="20" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
                    <line x1="62" y1="20" x2="54" y2="22" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
                
                {/* Beak */}
                <path d="M45 38 L50 48 L55 38 Z" fill="#ff9500" />
                
                {/* Blush marks when excited */}
                {mood === 'excited' && (
                  <>
                    <ellipse cx="35" cy="38" rx="4" ry="2" fill="rgba(255,150,150,0.5)" />
                    <ellipse cx="65" cy="38" rx="4" ry="2" fill="rgba(255,150,150,0.5)" />
                  </>
                )}
              </motion.g>
              
              {/* Feet */}
              <motion.g
                animate={isWaving ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 0.4, repeat: isWaving ? 2 : 0 }}
              >
                <ellipse cx="40" cy="112" rx="10" ry="5" fill="#ff9500" />
                <ellipse cx="60" cy="112" rx="10" ry="5" fill="#ff9500" />
              </motion.g>
              
              {/* Security badge */}
              <g>
                <rect x="43" y="52" width="14" height="12" rx="2" fill="#C81E1E" />
                <circle cx="50" cy="58" r="3" fill="#ffd700" />
                <text x="50" y="61" textAnchor="middle" fontSize="4" fill="#1a1a2e" fontWeight="bold">★</text>
              </g>
            </svg>

            {/* Status indicator */}
            <motion.div 
              className={styles.statusIndicator}
              animate={{ 
                backgroundColor: mood === 'excited' ? '#22C55E' : 
                                 mood === 'curious' ? '#F59E0B' : '#C81E1E'
              }}
            />

            {/* Click hint */}
            <motion.div
              className={styles.clickHint}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click me!
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
