'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './IdlePenguins.module.css';

// Hudhud (Hoopoe) - Upupa epops
// Known for: crown crest, "hoop-hoop" call, probing behavior, undulating flight

interface Hudhud {
  id: number;
  x: number;
  delay: number;
  direction: 'left' | 'right';
  speed: number;
  size: number;
  behavior: 'walking' | 'flying' | 'calling' | 'probing';
}

const IDLE_TIMEOUT = 30000;
const MAX_HUDHUDS = 5;

export default function IdlePenguins() {
  const [isIdle, setIsIdle] = useState(false);
  const [hudhuds, setHudhuds] = useState<Hudhud[]>([]);
  const [nextId, setNextId] = useState(0);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    setHudhuds([]);
  }, []);

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

  useEffect(() => {
    if (!isIdle) return;

    const spawnHudhud = () => {
      if (hudhuds.length >= MAX_HUDHUDS) return;

      const behaviors: Hudhud['behavior'][] = ['walking', 'flying', 'calling', 'probing'];
      const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];

      const newHudhud: Hudhud = {
        id: nextId,
        x: Math.random() * (window.innerWidth - 80),
        delay: Math.random() * 2,
        direction: Math.random() > 0.5 ? 'left' : 'right',
        speed: 1.5 + Math.random() * 2,
        size: 45 + Math.random() * 25,
        behavior: randomBehavior,
      };

      setHudhuds(prev => [...prev, newHudhud]);
      setNextId(prev => prev + 1);
    };

    spawnHudhud();
    const spawnInterval = setInterval(spawnHudhud, 4000);
    return () => clearInterval(spawnInterval);
  }, [isIdle, hudhuds.length, nextId]);

  const removeHudhud = (id: number) => {
    setHudhuds(prev => prev.filter(h => h.id !== id));
  };

  if (!isIdle) return null;

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {hudhuds.map(hudhud => (
          hudhud.behavior === 'flying' ? (
            <FlyingHudhud
              key={hudhud.id}
              hudhud={hudhud}
              onExit={() => removeHudhud(hudhud.id)}
            />
          ) : (
            <WalkingHudhud
              key={hudhud.id}
              hudhud={hudhud}
              onExit={() => removeHudhud(hudhud.id)}
            />
          )
        ))}
      </AnimatePresence>
      
      <motion.div
        className={styles.idleMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 2 }}
      >
        <span>🪶 The Hudhud flock (Upupa epops) has arrived! Move your mouse to continue.</span>
      </motion.div>
    </div>
  );
}

// ============================================
// WALKING HUDHUD COMPONENT
// ============================================
function WalkingHudhud({
  hudhud,
  onExit
}: {
  hudhud: Hudhud;
  onExit: () => void;
}) {
  const [isWalking, setIsWalking] = useState(false);
  const [currentX, setCurrentX] = useState(hudhud.x);
  const [direction, setDirection] = useState(hudhud.direction);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isProbing, setIsProbing] = useState(false);
  const [crownFanned, setCrownFanned] = useState(false);
  const shouldExitRef = useRef(false);
  const hasExitedRef = useRef(false);

  // Handle exit in a separate effect
  useEffect(() => {
    if (shouldExitRef.current && !hasExitedRef.current) {
      hasExitedRef.current = true;
      onExit();
    }
  }, [currentX, onExit]);

  useEffect(() => {
    const walkTimer = setTimeout(() => {
      setIsWalking(true);
    }, 2000 + hudhud.delay * 1000);
    return () => clearTimeout(walkTimer);
  }, [hudhud.delay]);

  // Walking animation
  useEffect(() => {
    if (!isWalking) return;

    const walkInterval = setInterval(() => {
      setCurrentX(prev => {
        const newX = direction === 'right' ? prev + hudhud.speed : prev - hudhud.speed;

        if (newX < 0 || newX > window.innerWidth - hudhud.size) {
          setDirection(d => d === 'left' ? 'right' : 'left');
          return prev;
        }

        if (Math.random() < 0.008) {
          setDirection(d => d === 'left' ? 'right' : 'left');
        }

        if (Math.random() < 0.0008) {
          shouldExitRef.current = true;
        }

        return newX;
      });
    }, 60);

    return () => clearInterval(walkInterval);
  }, [isWalking, direction, hudhud.speed, hudhud.size]);

  // Random behaviors
  useEffect(() => {
    if (!isWalking) return;

    const behaviorInterval = setInterval(() => {
      const rand = Math.random();
      
      if (rand < 0.2) {
        // Make calling sound
        setIsCalling(true);
        setCrownFanned(true);
        setTimeout(() => {
          setIsCalling(false);
          setCrownFanned(false);
        }, 1200);
      } else if (rand < 0.4) {
        // Probe for food
        setIsProbing(true);
        setTimeout(() => setIsProbing(false), 800);
      } else if (rand < 0.5) {
        // Fan crown
        setCrownFanned(true);
        setTimeout(() => setCrownFanned(false), 1500);
      }
    }, 3000);

    return () => clearInterval(behaviorInterval);
  }, [isWalking]);

  // Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className={styles.walkingPenguin}
      style={{ 
        left: currentX,
        width: hudhud.size,
        height: hudhud.size * 1.4,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isProbing ? 8 : 0, 
        opacity: 1,
        scaleX: direction === 'left' ? -1 : 1,
      }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ 
        y: { type: 'spring', stiffness: 80, damping: 12, delay: hudhud.delay },
        scaleX: { duration: 0.2 }
      }}
    >
      {/* Call sound visual */}
      {isCalling && (
        <motion.div
          style={{
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: '#D4956A',
            fontWeight: 'bold',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1.5] }}
          transition={{ duration: 1 }}
        >
          ♪ Hoop!
        </motion.div>
      )}
      
      <svg viewBox="0 0 60 80" className={styles.penguinSvg}>
        {/* Shadow */}
        <ellipse cx="30" cy="76" rx="12" ry="3" fill="rgba(0,0,0,0.2)" />
        
        {/* Tail - Black with white bands */}
        <motion.g
          animate={isWalking ? { rotate: [-4, 4, -4] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ originX: '30px', originY: '58px' }}
        >
          <path d="M32 55 L40 65 L38 67 L31 57" fill="#1a1a1a" />
          <path d="M30 55 L35 68 L32 69 L29 57" fill="#1a1a1a" />
          <path d="M28 55 L28 70 L26 70 L26 57" fill="#1a1a1a" />
          <path d="M35 60 L38 65" stroke="white" strokeWidth="1.5" />
          <path d="M31 62 L33 67" stroke="white" strokeWidth="1.5" />
          <path d="M27 63 L27 68" stroke="white" strokeWidth="1.5" />
        </motion.g>

        {/* Body */}
        <motion.g
          animate={isWalking ? { y: [-0.5, 0.5, -0.5] } : {}}
          transition={{ duration: 0.35, repeat: Infinity }}
        >
          {/* Main body - Cinnamon */}
          <ellipse cx="30" cy="48" rx="16" ry="20" fill="#D4956A" />
          
          {/* Belly */}
          <ellipse cx="30" cy="52" rx="11" ry="14" fill="#E8B08D" />
          <ellipse cx="30" cy="54" rx="8" ry="10" fill="#F5C9A8" />
          
          {/* Feather lines */}
          <path d="M18 42 Q30 46 42 42" stroke="#C4855A" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M20 50 Q30 54 40 50" stroke="#C4855A" strokeWidth="0.8" fill="none" opacity="0.6" />
          
          {/* Wing - Black with white stripes */}
          <motion.g
            animate={isWalking ? { rotate: [-4, 4, -4] } : {}}
            transition={{ duration: 0.35, repeat: Infinity }}
            style={{ originX: '18px', originY: '45px' }}
          >
            <path d="M14 38 Q8 50 12 62 Q16 65 18 56 Q22 44 18 36 Z" fill="#1a1a1a" />
            <path d="M11 45 Q10 52 11 58" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M15 43 Q13 51 14 60" stroke="white" strokeWidth="1.8" fill="none" />
          </motion.g>
        </motion.g>
        
        {/* Legs */}
        <motion.g
          animate={isWalking ? { rotate: [-12, 12, -12] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ originX: '26px', originY: '66px' }}
        >
          <path d="M25 65 L23 74" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 74 L18 77 M23 74 L23 78 M23 74 L27 77" stroke="#5C5C5C" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
        <motion.g
          animate={isWalking ? { rotate: [12, -12, 12] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ originX: '34px', originY: '66px' }}
        >
          <path d="M34 65 L36 74" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 74 L31 77 M36 74 L36 78 M36 74 L40 77" stroke="#5C5C5C" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Head */}
        <motion.g
          animate={isProbing ? { rotate: [0, 25, 0] } : {}}
          transition={{ duration: 0.4, repeat: isProbing ? 2 : 0 }}
          style={{ originX: '30px', originY: '30px' }}
        >
          {/* Crown/Crest */}
          <motion.g
            animate={crownFanned ? { scaleY: 1.4, scaleX: 1.15 } : { scaleY: 1, scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ originX: '30px', originY: '22px' }}
          >
            {/* Crown feathers */}
            <motion.path d="M30 18 L30 4 L31 18" fill="#D4956A" />
            <path d="M30 4 L30 7 L31 7 L31 4" fill="#1a1a1a" />
            
            <motion.path d="M27 19 L23 5 L29 19" fill="#D4956A" />
            <path d="M23 5 L24 8 L28 6 L27 3" fill="#1a1a1a" />
            
            <motion.path d="M33 19 L37 5 L31 19" fill="#D4956A" />
            <path d="M37 5 L36 8 L32 6 L33 3" fill="#1a1a1a" />
            
            <motion.path d="M24 20 L18 8 L27 20" fill="#D4956A" />
            <path d="M18 8 L20 11 L24 8 L22 5" fill="#1a1a1a" />
            
            <motion.path d="M36 20 L42 8 L33 20" fill="#D4956A" />
            <path d="M42 8 L40 11 L36 8 L38 5" fill="#1a1a1a" />
            
            <motion.path d="M21 22 L12 12 L25 22" fill="#D4956A" />
            <path d="M12 12 L15 14 L19 11 L16 9" fill="#1a1a1a" />
            
            <motion.path d="M39 22 L48 12 L35 22" fill="#D4956A" />
            <path d="M48 12 L45 14 L41 11 L44 9" fill="#1a1a1a" />
          </motion.g>
          
          {/* Head shape */}
          <ellipse cx="30" cy="28" rx="12" ry="10" fill="#D4956A" />
          <ellipse cx="30" cy="29" rx="10" ry="8" fill="#E5A57A" />
          
          {/* Eye */}
          <g>
            <circle cx="36" cy="26" r="3.5" fill="#1a1a1a" />
            <circle cx="36" cy="26" r="1.8" fill="#2a2a2a" />
            <circle cx="37" cy="25" r="1" fill="white" />
            {isBlinking && <ellipse cx="36" cy="26" rx="3.5" ry="3.5" fill="#D4956A" />}
          </g>
          
          {/* Long curved beak */}
          <motion.g
            animate={
              isProbing ? { rotate: [0, 20, 0] } :
              isCalling ? { rotate: [0, -8, 0] } : {}
            }
            transition={{ duration: 0.3 }}
            style={{ originX: '38px', originY: '30px' }}
          >
            <path d="M38 30 Q48 33 52 40 Q54 42 52 44 Q50 42 48 40 Q44 35 38 33 Z" fill="#2a2a2a" />
            <path d="M38 30 Q42 32 45 35" stroke="#1a1a1a" strokeWidth="0.8" fill="none" />
          </motion.g>
        </motion.g>
        
        {/* AmaraTech logo on chest */}
        <image 
          href="/logo/Artboard- Amaratech4x.png" 
          x="22" 
          y="46" 
          width="16" 
          height="16"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </motion.div>
  );
}

// ============================================
// FLYING HUDHUD COMPONENT
// ============================================
function FlyingHudhud({ 
  hudhud, 
  onExit 
}: { 
  hudhud: Hudhud; 
  onExit: () => void;
}) {
  const [currentX, setCurrentX] = useState(hudhud.x);
  const [currentY, setCurrentY] = useState(typeof window !== 'undefined' ? window.innerHeight - 200 : 400);
  const [direction] = useState(hudhud.direction);
  const [isBlinking, setIsBlinking] = useState(false);
  const shouldExitRef = useRef(false);
  const hasExitedRef = useRef(false);

  // Handle exit in a separate effect
  useEffect(() => {
    if (shouldExitRef.current && !hasExitedRef.current) {
      hasExitedRef.current = true;
      onExit();
    }
  }, [currentX, onExit]);

  // Undulating flight pattern - characteristic of Hoopoe
  useEffect(() => {
    let phase = 0;
    const flyInterval = setInterval(() => {
      phase += 0.1;
      
      setCurrentX(prev => {
        const newX = direction === 'right' ? prev + hudhud.speed * 1.5 : prev - hudhud.speed * 1.5;
        
        if (newX < -100 || newX > window.innerWidth + 100) {
          shouldExitRef.current = true;
        }
        
        return newX;
      });
      
      // Undulating flight (up and down)
      setCurrentY(() => {
        const baseY = window.innerHeight - 200;
        return baseY + Math.sin(phase) * 50;
      });
    }, 50);

    return () => clearInterval(flyInterval);
  }, [direction, hudhud.speed]);

  // Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 100);
    }, 2500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      className={styles.flyingPenguin}
      style={{ 
        left: currentX,
        top: currentY,
        width: hudhud.size * 1.8,
        height: hudhud.size,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        scaleX: direction === 'left' ? -1 : 1,
        rotate: direction === 'right' ? [-5, 5, -5] : [5, -5, 5],
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        opacity: { delay: hudhud.delay },
        rotate: { duration: 0.3, repeat: Infinity }
      }}
    >
      <svg viewBox="0 0 100 60" className={styles.penguinSvg}>
        {/* Flying Hudhud - undulating flight is characteristic */}
        
        {/* Tail */}
        <g>
          <path d="M8 30 L0 26 L3 30 L0 34 L8 30" fill="#1a1a1a" />
          <path d="M2 28 L5 30" stroke="white" strokeWidth="1" />
          <path d="M2 32 L5 30" stroke="white" strokeWidth="1" />
        </g>
        
        {/* Body */}
        <ellipse cx="35" cy="30" rx="22" ry="12" fill="#D4956A" />
        <ellipse cx="38" cy="31" rx="16" ry="8" fill="#E8B08D" />
        
        {/* Wings - rapid flapping with white bands visible */}
        <motion.g
          animate={{ rotate: [-25, 25, -25] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          style={{ originX: '35px', originY: '30px' }}
        >
          {/* Upper wing */}
          <path d="M25 28 Q20 10 45 5 Q55 8 50 25 Q40 28 25 28" fill="#1a1a1a" />
          <path d="M30 20 Q35 12 42 8" stroke="white" strokeWidth="3" fill="none" />
          <path d="M34 24 Q38 17 45 12" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M38 27 Q41 21 47 16" stroke="white" strokeWidth="2" fill="none" />
        </motion.g>
        <motion.g
          animate={{ rotate: [25, -25, 25] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          style={{ originX: '35px', originY: '30px' }}
        >
          {/* Lower wing */}
          <path d="M25 32 Q20 50 45 55 Q55 52 50 35 Q40 32 25 32" fill="#1a1a1a" />
          <path d="M30 40 Q35 48 42 52" stroke="white" strokeWidth="3" fill="none" />
          <path d="M34 36 Q38 43 45 48" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M38 33 Q41 39 47 44" stroke="white" strokeWidth="2" fill="none" />
        </motion.g>
        
        {/* Head */}
        <g>
          {/* Crown - always fanned in flight */}
          <motion.g
            animate={{ scaleY: [1.2, 1.5, 1.2] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            style={{ originX: '65px', originY: '28px' }}
          >
            <path d="M62 26 L58 18 L64 27" fill="#D4956A" />
            <path d="M58 18 L59 21 L63 19 L62 16" fill="#1a1a1a" />
            <path d="M65 25 L62 15 L67 26" fill="#D4956A" />
            <path d="M62 15 L63 18 L67 16 L66 13" fill="#1a1a1a" />
            <path d="M67 24 L66 12 L69 25" fill="#D4956A" />
            <path d="M66 12 L67 15 L69 14 L68 11" fill="#1a1a1a" />
            <path d="M69 25 L70 15 L71 26" fill="#D4956A" />
            <path d="M70 15 L69 18 L72 17 L71 14" fill="#1a1a1a" />
          </motion.g>
          
          <ellipse cx="65" cy="30" rx="12" ry="9" fill="#D4956A" />
          <ellipse cx="67" cy="31" rx="9" ry="7" fill="#E5A57A" />
          
          {/* Eye */}
          <circle cx="70" cy="28" r="3" fill="#1a1a1a" />
          <circle cx="71" cy="27" r="1" fill="white" />
          {isBlinking && <ellipse cx="70" cy="28" rx="3" ry="3" fill="#D4956A" />}
          
          {/* Beak */}
          <path d="M76 32 Q86 34 92 40 Q94 42 92 44 Q90 42 88 40 Q82 36 76 35 Z" fill="#2a2a2a" />
        </g>
        
        {/* Feet tucked */}
        <path d="M32 38 L34 42 L36 38" stroke="#5C5C5C" strokeWidth="1.5" fill="none" />
        <path d="M38 38 L40 42 L42 38" stroke="#5C5C5C" strokeWidth="1.5" fill="none" />
        
        {/* Logo */}
        <image 
          href="/logo/Artboard- Amaratech4x.png" 
          x="30" 
          y="25" 
          width="14" 
          height="14"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </motion.div>
  );
}
