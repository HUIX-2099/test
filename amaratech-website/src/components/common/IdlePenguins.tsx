'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './IdlePenguins.module.css';

interface Owl {
  id: number;
  x: number;
  delay: number;
  direction: 'left' | 'right';
  speed: number;
  size: number;
}

const IDLE_TIMEOUT = 30000; // 30 seconds of inactivity
const MAX_OWLS = 5;

export default function IdlePenguins() {
  const [isIdle, setIsIdle] = useState(false);
  const [owls, setOwls] = useState<Owl[]>([]);
  const [nextId, setNextId] = useState(0);

  // Reset idle timer on any user activity
  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    setOwls([]);
  }, []);

  // Detect idle state
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const startIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, IDLE_TIMEOUT);
    };

    const handleActivity = () => {
      if (isIdle) {
        resetIdleTimer();
      }
      startIdleTimer();
    };

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    startIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isIdle, resetIdleTimer]);

  // Spawn owls when idle
  useEffect(() => {
    if (!isIdle) return;

    const spawnOwl = () => {
      if (owls.length >= MAX_OWLS) return;

      const newOwl: Owl = {
        id: nextId,
        x: Math.random() * (window.innerWidth - 60),
        delay: Math.random() * 2,
        direction: Math.random() > 0.5 ? 'left' : 'right',
        speed: 1.5 + Math.random() * 2,
        size: 35 + Math.random() * 20,
      };

      setOwls(prev => [...prev, newOwl]);
      setNextId(prev => prev + 1);
    };

    // Spawn first owl immediately
    spawnOwl();

    // Spawn more owls over time
    const spawnInterval = setInterval(spawnOwl, 4000);

    return () => clearInterval(spawnInterval);
  }, [isIdle, owls.length, nextId]);

  // Remove owl when it walks off screen
  const removeOwl = (id: number) => {
    setOwls(prev => prev.filter(o => o.id !== id));
  };

  if (!isIdle) return null;

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {owls.map(owl => (
          <WalkingOwl
            key={owl.id}
            owl={owl}
            onExit={() => removeOwl(owl.id)}
          />
        ))}
      </AnimatePresence>
      
      {/* Idle message */}
      <motion.div
        className={styles.idleMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 2 }}
      >
        <span>🦉 Amana&apos;s parliament came to watch! Move your mouse to continue.</span>
      </motion.div>
    </div>
  );
}

// Individual walking owl component
function WalkingOwl({ 
  owl, 
  onExit 
}: { 
  owl: Owl; 
  onExit: () => void;
}) {
  const [isWalking, setIsWalking] = useState(false);
  const [currentX, setCurrentX] = useState(owl.x);
  const [direction, setDirection] = useState(owl.direction);
  const [isBlinking, setIsBlinking] = useState(false);

  // Start walking after landing
  useEffect(() => {
    const walkTimer = setTimeout(() => {
      setIsWalking(true);
    }, 2000 + owl.delay * 1000);

    return () => clearTimeout(walkTimer);
  }, [owl.delay]);

  // Walking animation
  useEffect(() => {
    if (!isWalking) return;

    const walkInterval = setInterval(() => {
      setCurrentX(prev => {
        const newX = direction === 'right' ? prev + owl.speed : prev - owl.speed;
        
        // Change direction at edges or randomly
        if (newX < 0 || newX > window.innerWidth - owl.size) {
          setDirection(d => d === 'left' ? 'right' : 'left');
          return prev;
        }

        // Random direction change
        if (Math.random() < 0.008) {
          setDirection(d => d === 'left' ? 'right' : 'left');
        }

        // Small chance to exit
        if (Math.random() < 0.0008) {
          onExit();
        }

        return newX;
      });
    }, 60);

    return () => clearInterval(walkInterval);
  }, [isWalking, direction, owl.speed, owl.size, onExit]);

  // Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className={styles.walkingPenguin}
      style={{ 
        left: currentX,
        width: owl.size,
        height: owl.size * 1.3,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        scaleX: direction === 'left' ? -1 : 1,
      }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ 
        y: { type: 'spring', stiffness: 80, damping: 12, delay: owl.delay },
        scaleX: { duration: 0.2 }
      }}
    >
      <svg viewBox="0 0 50 65" className={styles.penguinSvg}>
        {/* Body */}
        <ellipse cx="25" cy="40" rx="16" ry="20" fill="#2d2d3a" />
        
        {/* Chest feathers */}
        <ellipse cx="25" cy="43" rx="11" ry="14" fill="#3d3d4a" />
        <ellipse cx="25" cy="45" rx="8" ry="10" fill="#4a4a5a" />
        
        {/* Left Wing */}
        <motion.path
          d="M10 32 Q5 42 8 52 Q12 55 14 48 Q16 38 12 30 Z"
          fill="#2d2d3a"
          animate={isWalking ? { 
            rotate: [-5, 5, -5],
          } : {}}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ originX: '12px', originY: '40px' }}
        />
        
        {/* Right Wing */}
        <motion.path
          d="M40 32 Q45 42 42 52 Q38 55 36 48 Q34 38 38 30 Z"
          fill="#2d2d3a"
          animate={isWalking ? { 
            rotate: [5, -5, 5],
          } : {}}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ originX: '38px', originY: '40px' }}
        />
        
        {/* Ear tufts */}
        <path d="M14 12 L17 4 L21 14" fill="#2d2d3a" />
        <path d="M36 12 L33 4 L29 14" fill="#2d2d3a" />
        
        {/* Head */}
        <ellipse cx="25" cy="18" rx="14" ry="12" fill="#2d2d3a" />
        
        {/* Facial disc */}
        <ellipse cx="25" cy="20" rx="12" ry="10" fill="#3d3d4a" />
        <ellipse cx="25" cy="21" rx="10" ry="8" fill="#4a4a5a" />
        
        {/* Eyes with red glow */}
        <g>
          <motion.circle 
            cx="19" cy="18" r="6" 
            fill="rgba(200, 30, 30, 0.3)"
            animate={{ r: [6, 7, 6], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <circle cx="19" cy="18" r="5" fill="#1a1a1a" />
          <circle cx="19" cy="18" r="4" fill="#C81E1E" />
          <circle cx="19" cy="18" r="2" fill="#1a1a1a" />
          <circle cx="20" cy="17" r="1" fill="white" />
          {isBlinking && <ellipse cx="19" cy="18" rx="5" ry="5" fill="#2d2d3a" />}
        </g>
        <g>
          <motion.circle 
            cx="31" cy="18" r="6" 
            fill="rgba(200, 30, 30, 0.3)"
            animate={{ r: [6, 7, 6], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <circle cx="31" cy="18" r="5" fill="#1a1a1a" />
          <circle cx="31" cy="18" r="4" fill="#C81E1E" />
          <circle cx="31" cy="18" r="2" fill="#1a1a1a" />
          <circle cx="32" cy="17" r="1" fill="white" />
          {isBlinking && <ellipse cx="31" cy="18" rx="5" ry="5" fill="#2d2d3a" />}
        </g>
        
        {/* Beak */}
        <path d="M23 25 L25 30 L27 25 Q25 26 23 25" fill="#D4AF37" />
        
        {/* Talons */}
        <motion.g
          animate={isWalking ? { y: [0, -1, 0] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <path d="M19 58 L17 62 M20 58 L20 63 M21 58 L23 62" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
        <motion.g
          animate={isWalking ? { y: [0, 1, 0] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <path d="M29 58 L27 62 M30 58 L30 63 M31 58 L33 62" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
        
        {/* Small AmaraTech logo on chest */}
        <image 
          href="/logo/Artboard- Amaratech4x.png" 
          x="17" 
          y="38" 
          width="16" 
          height="16"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </motion.div>
  );
}
