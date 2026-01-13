'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ScrollCables.module.css';

export default function ScrollCables() {
  const { scrollYProgress } = useScroll();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Transform scroll progress to cable animations - ALL hooks must be at top level
  const cable1Progress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const cable2Progress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const cable3Progress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const cable4Progress = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const cable5Progress = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

  // Data packet Y positions - moved to top level
  const packet1Y = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const packet2Y = useTransform(scrollYProgress, [0, 1], [200, 1200]);
  const packet3Y = useTransform(scrollYProgress, [0.2, 1], [0, 900]);
  const rightPacket1Y = useTransform(scrollYProgress, [0, 1], [100, 1100]);
  const rightPacket2Y = useTransform(scrollYProgress, [0.1, 1], [0, 900]);

  if (!isClient) return null;

  return (
    <div className={styles.scrollCables}>
      <svg 
        className={styles.cablesSvg} 
        viewBox="0 0 100 2000" 
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C81E1E" stopOpacity="0" />
            <stop offset="50%" stopColor="#C81E1E" stopOpacity="1" />
            <stop offset="100%" stopColor="#C81E1E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D1FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D1FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left side cables */}
        <g className={styles.leftCables}>
          {/* Cable 1 - Main power cable */}
          <motion.path
            d="M10 0 L10 300 Q10 350 30 400 L30 600 Q30 650 10 700 L10 1000"
            stroke="#C81E1E"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
            style={{ pathLength: cable1Progress }}
          />
          
          {/* Cable 2 - Data cable */}
          <motion.path
            d="M25 0 L25 200 Q25 250 40 300 L40 500 Q40 550 25 600 L25 900"
            stroke="#00D1FF"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            style={{ pathLength: cable2Progress }}
          />

          {/* Cable nodes/connectors */}
          <motion.circle
            cx="10" cy="300" r="6"
            fill="#0a0a0f"
            stroke="#C81E1E"
            strokeWidth="2"
            style={{ opacity: cable1Progress }}
          />
          <motion.circle
            cx="30" cy="600" r="5"
            fill="#0a0a0f"
            stroke="#C81E1E"
            strokeWidth="2"
            style={{ opacity: cable1Progress }}
          />
          <motion.circle
            cx="40" cy="500" r="4"
            fill="#0a0a0f"
            stroke="#00D1FF"
            strokeWidth="2"
            style={{ opacity: cable2Progress }}
          />
        </g>

        {/* Right side cables */}
        <g className={styles.rightCables}>
          {/* Cable 3 - Network cable */}
          <motion.path
            d="M90 0 L90 400 Q90 450 70 500 L70 800 Q70 850 90 900 L90 1200"
            stroke="#22C55E"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            style={{ pathLength: cable3Progress }}
          />

          {/* Cable 4 - Secondary data */}
          <motion.path
            d="M75 0 L75 350 Q75 400 60 450 L60 700 Q60 750 75 800 L75 1100"
            stroke="#C81E1E"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
            style={{ pathLength: cable4Progress }}
          />

          {/* Cable nodes */}
          <motion.circle
            cx="70" cy="500" r="5"
            fill="#0a0a0f"
            stroke="#22C55E"
            strokeWidth="2"
            style={{ opacity: cable3Progress }}
          />
          <motion.circle
            cx="60" cy="700" r="4"
            fill="#0a0a0f"
            stroke="#C81E1E"
            strokeWidth="2"
            style={{ opacity: cable4Progress }}
          />
        </g>

        {/* Cross connections */}
        <g className={styles.crossConnections}>
          <motion.path
            d="M10 700 Q50 750 90 800"
            stroke="#C81E1E"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            fill="none"
            opacity="0.4"
            style={{ pathLength: cable5Progress }}
          />
          <motion.path
            d="M25 600 Q50 650 75 700"
            stroke="#00D1FF"
            strokeWidth="1"
            strokeDasharray="4 2"
            fill="none"
            opacity="0.3"
            style={{ pathLength: cable5Progress }}
          />
        </g>

        {/* Animated data packets */}
        <g className={styles.dataPackets}>
          <motion.circle
            r="4"
            fill="#C81E1E"
            filter="url(#cableGlow)"
            style={{ cx: 10, cy: packet1Y }}
          />
          <motion.circle
            r="3"
            fill="#00D1FF"
            filter="url(#cableGlow)"
            style={{ cx: 90, cy: packet2Y }}
          />
          <motion.circle
            r="3"
            fill="#22C55E"
            filter="url(#cableGlow)"
            style={{ cx: 70, cy: packet3Y }}
          />
        </g>

        {/* Server icons at connection points */}
        <g className={styles.serverIcons}>
          {/* Left server */}
          <motion.g style={{ opacity: cable1Progress }}>
            <rect x="2" y="980" width="16" height="25" fill="none" stroke="#C81E1E" strokeWidth="1" rx="2" />
            <line x1="5" y1="985" x2="15" y2="985" stroke="#C81E1E" strokeWidth="0.5" />
            <line x1="5" y1="990" x2="15" y2="990" stroke="#C81E1E" strokeWidth="0.5" />
            <line x1="5" y1="995" x2="15" y2="995" stroke="#C81E1E" strokeWidth="0.5" />
            <circle cx="10" cy="1000" r="2" fill="#22C55E" />
          </motion.g>

          {/* Right server */}
          <motion.g style={{ opacity: cable3Progress }}>
            <rect x="82" y="1180" width="16" height="25" fill="none" stroke="#00D1FF" strokeWidth="1" rx="2" />
            <line x1="85" y1="1185" x2="95" y2="1185" stroke="#00D1FF" strokeWidth="0.5" />
            <line x1="85" y1="1190" x2="95" y2="1190" stroke="#00D1FF" strokeWidth="0.5" />
            <circle cx="90" cy="1198" r="2" fill="#22C55E" />
          </motion.g>

          {/* Monitor icon */}
          <motion.g style={{ opacity: cable2Progress }}>
            <rect x="20" y="880" width="20" height="15" fill="none" stroke="#00D1FF" strokeWidth="1" rx="1" />
            <line x1="30" y1="895" x2="30" y2="900" stroke="#00D1FF" strokeWidth="1" />
            <line x1="25" y1="900" x2="35" y2="900" stroke="#00D1FF" strokeWidth="1" />
          </motion.g>
        </g>
      </svg>

      {/* Right side cable SVG */}
      <svg 
        className={`${styles.cablesSvg} ${styles.rightSide}`}
        viewBox="0 0 100 2000" 
        preserveAspectRatio="none"
      >
        {/* Mirror of left cables */}
        <motion.path
          d="M90 0 L90 300 Q90 350 70 400 L70 600 Q70 650 90 700 L90 1000"
          stroke="#C81E1E"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
          style={{ pathLength: cable1Progress }}
        />
        <motion.path
          d="M75 0 L75 200 Q75 250 60 300 L60 500 Q60 550 75 600 L75 900"
          stroke="#00D1FF"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          style={{ pathLength: cable2Progress }}
        />
        
        {/* Data packets */}
        <motion.circle
          r="4"
          fill="#C81E1E"
          filter="url(#cableGlow)"
          style={{ cx: 90, cy: rightPacket1Y }}
        />
        <motion.circle
          r="3"
          fill="#00D1FF"
          filter="url(#cableGlow)"
          style={{ cx: 60, cy: rightPacket2Y }}
        />
      </svg>
    </div>
  );
}
