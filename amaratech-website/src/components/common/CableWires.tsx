'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CableWires.module.css';

interface WireProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'white';
  thickness?: number;
  animated?: boolean;
  delay?: number;
  pulse?: boolean;
}

export function Wire({ 
  startX, 
  startY, 
  endX, 
  endY, 
  color = 'red', 
  thickness = 2,
  animated = true,
  delay = 0,
  pulse = false
}: WireProps) {
  // Create a curved path between two points
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const curvature = Math.abs(endY - startY) * 0.5;
  
  const pathD = `M ${startX} ${startY} Q ${midX} ${midY + curvature} ${endX} ${endY}`;

  const colorMap = {
    red: '#C81E1E',
    blue: '#00D1FF',
    green: '#22C55E',
    yellow: '#F59E0B',
    white: 'rgba(255,255,255,0.3)'
  };

  return (
    <g className={styles.wire}>
      {/* Glow effect */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={colorMap[color]}
        strokeWidth={thickness + 4}
        strokeLinecap="round"
        opacity={0.2}
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
      />
      {/* Main cable */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={colorMap[color]}
        strokeWidth={thickness}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
      />
      {/* Pulse animation */}
      {pulse && (
        <motion.circle
          r={3}
          fill={colorMap[color]}
          filter="url(#glow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: 'linear',
            delay 
          }}
          style={{ offsetPath: `path('${pathD}')` }}
        />
      )}
      {/* Connection nodes */}
      <motion.circle
        cx={startX}
        cy={startY}
        r={4}
        fill={colorMap[color]}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.5 }}
      />
      <motion.circle
        cx={endX}
        cy={endY}
        r={4}
        fill={colorMap[color]}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 1 }}
      />
    </g>
  );
}

interface CableSystemProps {
  className?: string;
}

export function CableSystem({ className }: CableSystemProps) {
  return (
    <svg 
      className={`${styles.cableSystem} ${className || ''}`} 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Red cables */}
      <Wire startX={0} startY={20} endX={30} endY={50} color="red" delay={0} pulse />
      <Wire startX={0} startY={40} endX={25} endY={70} color="red" delay={0.2} />
      <Wire startX={70} startY={50} endX={100} endY={30} color="red" delay={0.4} pulse />
      
      {/* Blue cables */}
      <Wire startX={0} startY={60} endX={35} endY={40} color="blue" delay={0.3} />
      <Wire startX={65} startY={60} endX={100} endY={50} color="blue" delay={0.5} pulse />
      <Wire startX={0} startY={80} endX={40} endY={85} color="blue" delay={0.7} />
      
      {/* Green data cables */}
      <Wire startX={50} startY={0} endX={50} endY={30} color="green" delay={0.6} thickness={1} />
      <Wire startX={50} startY={70} endX={50} endY={100} color="green" delay={0.8} thickness={1} />
    </svg>
  );
}

// Animated wire that connects two elements
interface ConnectorWireProps {
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  color?: 'red' | 'blue' | 'green';
}

export function ConnectorWire({ fromRef, toRef, color = 'red' }: ConnectorWireProps) {
  const [path, setPath] = useState('');

  useEffect(() => {
    const updatePath = () => {
      if (!fromRef.current || !toRef.current) return;
      
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();
      
      const startX = fromRect.right;
      const startY = fromRect.top + fromRect.height / 2;
      const endX = toRect.left;
      const endY = toRect.top + toRect.height / 2;
      
      const midX = (startX + endX) / 2;
      
      setPath(`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [fromRef, toRef]);

  const colorMap = {
    red: '#C81E1E',
    blue: '#00D1FF',
    green: '#22C55E'
  };

  return (
    <svg className={styles.connectorWire}>
      <defs>
        <filter id="wireGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke={colorMap[color]}
        strokeWidth={2}
        filter="url(#wireGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// Decorative robot guts panel
export function RobotGutsPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${styles.robotPanel} ${className || ''}`}>
      {/* Left wire cluster */}
      <div className={styles.wireClusterLeft}>
        <div className={`${styles.wireBundle} ${styles.red}`} />
        <div className={`${styles.wireBundle} ${styles.blue}`} />
        <div className={`${styles.wireBundle} ${styles.red}`} />
        <div className={`${styles.wireBundle} ${styles.green}`} />
      </div>
      
      {/* Top connectors */}
      <div className={styles.topConnectors}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.connector}>
            <div className={styles.connectorPin} />
            <div className={`${styles.connectorWire} ${i % 2 === 0 ? styles.red : styles.blue}`} />
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className={styles.panelContent}>
        {children}
      </div>
      
      {/* Bottom circuit traces */}
      <div className={styles.circuitTraces}>
        <svg viewBox="0 0 200 20" preserveAspectRatio="none">
          <path d="M0 10 L50 10 L55 5 L100 5 L105 10 L150 10 L155 15 L200 15" 
                stroke="#C81E1E" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M0 15 L30 15 L35 10 L80 10 L85 5 L130 5 L135 10 L200 10" 
                stroke="#00D1FF" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      </div>
      
      {/* Right wire cluster */}
      <div className={styles.wireClusterRight}>
        <div className={`${styles.wireBundle} ${styles.blue}`} />
        <div className={`${styles.wireBundle} ${styles.red}`} />
        <div className={`${styles.wireBundle} ${styles.green}`} />
      </div>
    </div>
  );
}

// Data flow animation
export function DataFlowWire({ className }: { className?: string }) {
  return (
    <div className={`${styles.dataFlowContainer} ${className || ''}`}>
      <svg className={styles.dataFlowSvg} viewBox="0 0 400 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C81E1E" stopOpacity="0" />
            <stop offset="50%" stopColor="#C81E1E" stopOpacity="1" />
            <stop offset="100%" stopColor="#C81E1E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D1FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D1FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Static wires */}
        <path d="M0 30 Q100 30 150 50 T300 50 T400 30" 
              stroke="rgba(229,57,53,0.2)" strokeWidth="2" fill="none" />
        <path d="M0 70 Q100 70 150 50 T300 50 T400 70" 
              stroke="rgba(0,209,255,0.2)" strokeWidth="2" fill="none" />
        
        {/* Animated data packets */}
        <motion.circle
          r="4"
          fill="#C81E1E"
          filter="url(#glow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ offsetPath: "path('M0 30 Q100 30 150 50 T300 50 T400 30')" }}
        />
        <motion.circle
          r="4"
          fill="#00D1FF"
          filter="url(#glow)"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1.5 }}
          style={{ offsetPath: "path('M0 70 Q100 70 150 50 T300 50 T400 70')" }}
        />
      </svg>
    </div>
  );
}
