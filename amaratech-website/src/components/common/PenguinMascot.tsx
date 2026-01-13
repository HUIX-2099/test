'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './PenguinMascot.module.css';

interface PenguinMascotProps {
  position?: 'bottom-right' | 'bottom-left';
}

// Context-aware messages based on page/section - AMANA the Security Owl
const contextMessages: Record<string, string[]> = {
  '/': [
    "👋 Welcome! I'm Amana, your security guardian!",
    "🔐 Scroll down to explore our services!",
    "☁️ Check out our cloud solutions below!",
    "⚡ Click me for quick tips!",
    "🦉 I'm Amana - always watching, always protecting!",
  ],
  '/about': [
    "📖 Learn about our 15+ years of excellence!",
    "🌍 We serve clients across 3 continents!",
    "🏆 Scroll to see our certifications!",
    "🦉 Amana sees all! Let me show you around!",
  ],
  '/services': [
    "🛡️ Explore our cybersecurity services!",
    "☁️ We're Microsoft Azure experts!",
    "🔒 Need compliance help? We've got you!",
    "🦉 My wise recommendation: AI consulting!",
  ],
  '/contact': [
    "📞 Ready to chat? Fill out the form!",
    "⏰ We respond within 15 minutes!",
    "🤝 Let's secure your business together!",
    "🦉 Hoot hoot! Don't be shy, reach out!",
  ],
  '/products': [
    "🚀 Check out ImpactIQ - our AI platform!",
    "📊 Real-time vulnerability detection!",
    "⚡ 10x faster threat identification!",
    "🦉 Even my owl eyes can't match ImpactIQ!",
  ],
};

const defaultMessages = [
  "🔐 Did you know? AmaraTech protects thousands of endpoints!",
  "☁️ Our cloud migrations have a 99.9% success rate!",
  "🛡️ We're CMMC & HIPAA compliance experts!",
  "🌍 We serve clients across the US and West Africa!",
  "⚡ ImpactIQ detects vulnerabilities 10x faster!",
  "👋 Hi! I'm Amana, your security owl!",
  "🔒 Zero-trust architecture is our specialty!",
  "📊 Over 15 years of IT excellence!",
  "🦉 I watch over your security 24/7!",
  "💡 Fun fact: Owls can rotate their heads 270°!",
  "👁️ My glowing eyes see all threats!",
];

const guideTips = [
  { trigger: 'scroll_top', message: "⬆️ Scroll up to see our hero section!" },
  { trigger: 'scroll_bottom', message: "⬇️ Keep scrolling for more!" },
  { trigger: 'idle', message: "🦉 Amana here! Need help? Click me!" },
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
      setCurrentMessage("🦉 Hoot! I'm Amana! Click for tips!");
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
            {/* Owl SVG with animated parts - Security Mascot */}
            <svg viewBox="0 0 100 120" className={styles.penguinSvg}>
              {/* Shadow */}
              <ellipse cx="50" cy="115" rx="20" ry="4" fill="rgba(0,0,0,0.3)" />

              {/* Body */}
              <motion.g
                animate={isWaving ? { rotate: [-3, 3, -3, 3, 0] } : {}}
                transition={{ duration: 0.8 }}
                style={{ originX: '50px', originY: '70px' }}
              >
                {/* Main body - dark brown/charcoal */}
                <ellipse cx="50" cy="72" rx="30" ry="38" fill="#2d2d3a" />
                
                {/* Chest feathers pattern */}
                <ellipse cx="50" cy="78" rx="20" ry="28" fill="#3d3d4a" />
                <ellipse cx="50" cy="82" rx="16" ry="22" fill="#4a4a5a" />
                
                {/* Feather texture lines */}
                <path d="M35 65 Q50 70 65 65" stroke="#555" strokeWidth="0.5" fill="none" opacity="0.5" />
                <path d="M38 75 Q50 80 62 75" stroke="#555" strokeWidth="0.5" fill="none" opacity="0.5" />
                <path d="M40 85 Q50 90 60 85" stroke="#555" strokeWidth="0.5" fill="none" opacity="0.5" />
                
                {/* Left Wing */}
                <motion.path
                  d="M20 55 Q10 70 15 90 Q20 95 25 85 Q30 70 25 55 Z"
                  fill="#2d2d3a"
                  animate={isWaving ? { 
                    rotate: [-15, 15, -15, 15, 0],
                  } : {}}
                  transition={{ duration: 0.8 }}
                  style={{ originX: '25px', originY: '70px' }}
                />
                
                {/* Right Wing */}
                <motion.path
                  d="M80 55 Q90 70 85 90 Q80 95 75 85 Q70 70 75 55 Z"
                  fill="#2d2d3a"
                  animate={isWaving ? { 
                    rotate: [15, -15, 15, -15, 0],
                  } : {}}
                  transition={{ duration: 0.8 }}
                  style={{ originX: '75px', originY: '70px' }}
                />
              </motion.g>
              
              {/* Head - rotates to follow cursor */}
              <motion.g style={{ rotate: headRotate, originX: '50px', originY: '35px' }}>
                {/* Ear tufts */}
                <path d="M25 20 L30 5 L38 22" fill="#2d2d3a" />
                <path d="M75 20 L70 5 L62 22" fill="#2d2d3a" />
                
                {/* Head shape */}
                <ellipse cx="50" cy="35" rx="28" ry="25" fill="#2d2d3a" />
                
                {/* Facial disc - owl's signature feature */}
                <ellipse cx="50" cy="38" rx="24" ry="20" fill="#3d3d4a" />
                <ellipse cx="50" cy="40" rx="20" ry="16" fill="#4a4a5a" />
                
                {/* Left Eye - Large owl eyes with red glow */}
                <g>
                  {/* Eye glow */}
                  <motion.circle 
                    cx="38" cy="35" r="12" 
                    fill="rgba(200, 30, 30, 0.2)"
                    animate={{ r: [12, 14, 12], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <circle cx="38" cy="35" r="10" fill="#1a1a1a" />
                  <circle cx="38" cy="35" r="8" fill="#C81E1E" />
                  <motion.circle 
                    cx="38" 
                    cy="35" 
                    r="4" 
                    fill="#1a1a1a"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  <motion.circle 
                    cx="40" 
                    cy="33" 
                    r="2" 
                    fill="white"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  {/* Eyelid for blinking */}
                  <motion.ellipse
                    cx="38" cy="35" rx="10" ry="10"
                    fill="#2d2d3a"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isBlinking ? 1 : 0 }}
                    style={{ originY: '35px' }}
                  />
                </g>
                
                {/* Right Eye */}
                <g>
                  {/* Eye glow */}
                  <motion.circle 
                    cx="62" cy="35" r="12" 
                    fill="rgba(200, 30, 30, 0.2)"
                    animate={{ r: [12, 14, 12], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <circle cx="62" cy="35" r="10" fill="#1a1a1a" />
                  <circle cx="62" cy="35" r="8" fill="#C81E1E" />
                  <motion.circle 
                    cx="62" 
                    cy="35" 
                    r="4" 
                    fill="#1a1a1a"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  <motion.circle 
                    cx="64" 
                    cy="33" 
                    r="2" 
                    fill="white"
                    style={{ 
                      x: eyeX,
                      y: eyeY
                    }}
                  />
                  {/* Eyelid for blinking */}
                  <motion.ellipse
                    cx="62" cy="35" rx="10" ry="10"
                    fill="#2d2d3a"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isBlinking ? 1 : 0 }}
                    style={{ originY: '35px' }}
                  />
                </g>
                
                {/* Eyebrows based on mood */}
                {mood === 'curious' && (
                  <>
                    <path d="M28 22 Q38 18 48 24" stroke="#2d2d3a" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M72 22 Q62 18 52 24" stroke="#2d2d3a" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </>
                )}
                {mood === 'excited' && (
                  <>
                    <path d="M28 26 Q38 22 48 26" stroke="#C81E1E" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M72 26 Q62 22 52 26" stroke="#C81E1E" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </>
                )}
                
                {/* Beak */}
                <path d="M46 48 L50 56 L54 48 Q50 50 46 48" fill="#D4AF37" />
                
                {/* Blush marks when excited */}
                {mood === 'excited' && (
                  <>
                    <ellipse cx="28" cy="45" rx="4" ry="2" fill="rgba(200,30,30,0.3)" />
                    <ellipse cx="72" cy="45" rx="4" ry="2" fill="rgba(200,30,30,0.3)" />
                  </>
                )}
              </motion.g>
              
              {/* Talons/Feet */}
              <motion.g
                animate={isWaving ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 0.4, repeat: isWaving ? 2 : 0 }}
              >
                <path d="M38 108 L35 115 M40 108 L40 116 M42 108 L45 115" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <path d="M58 108 L55 115 M60 108 L60 116 M62 108 L65 115" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              </motion.g>
              
              {/* AmaraTech Logo on chest */}
              <g transform="translate(50, 78)">
                <image 
                  href="/logo/Artboard- Amaratech4x.png" 
                  x="-12" 
                  y="-12" 
                  width="24" 
                  height="24"
                  preserveAspectRatio="xMidYMid meet"
                />
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
              I'm Amana!
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
