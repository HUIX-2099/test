'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './CircuitBackground.module.css';

export default function CircuitBackground() {
  return (
    <div className={styles.circuitBg}>
      <svg 
        className={styles.circuitSvg} 
        viewBox="0 0 1200 2000" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filters */}
          <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Circuit pattern */}
          <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="none" />
            <path d="M0 50 L30 50 L35 45 L45 45 L50 50 L100 50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none" />
            <path d="M50 0 L50 30 L45 35 L45 45 L50 50 L50 100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.02)" />
          </pattern>
        </defs>

        {/* Background pattern */}
        <rect width="100%" height="100%" fill="url(#circuitPattern)" />

        {/* Main CPU/Chip outline */}
        <g className={styles.cpuChip}>
          {/* Central processor rectangle */}
          <motion.rect
            x="400" y="300" width="400" height="300"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
            rx="8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Inner chip detail */}
          <rect x="450" y="350" width="300" height="200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" rx="4" />
          <rect x="480" y="380" width="240" height="140" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" rx="2" />
          
          {/* CPU label */}
          <text x="600" y="460" textAnchor="middle" fill="rgba(255,255,255,0.06)" fontSize="12" fontFamily="monospace">
            AMARATECH.CPU
          </text>
        </g>

        {/* Top connection pins */}
        {[420, 460, 500, 540, 580, 620, 660, 700, 740, 780].map((x, i) => (
          <g key={`top-${i}`}>
            <motion.line
              x1={x} y1="300" x2={x} y2="250"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            />
            <rect x={x - 3} y="245" width="6" height="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Bottom connection pins */}
        {[420, 460, 500, 540, 580, 620, 660, 700, 740, 780].map((x, i) => (
          <g key={`bottom-${i}`}>
            <motion.line
              x1={x} y1="600" x2={x} y2="650"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
            />
            <rect x={x - 3} y="649" width="6" height="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Left connection pins */}
        {[330, 370, 410, 450, 490, 530, 570].map((y, i) => (
          <g key={`left-${i}`}>
            <motion.line
              x1="400" y1={y} x2="350" y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.1 * i + 1, duration: 0.5 }}
            />
            <rect x="341" y={y - 3} width="6" height="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Right connection pins */}
        {[330, 370, 410, 450, 490, 530, 570].map((y, i) => (
          <g key={`right-${i}`}>
            <motion.line
              x1="800" y1={y} x2="850" y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.1 * i + 1.5, duration: 0.5 }}
            />
            <rect x="853" y={y - 3} width="6" height="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Circuit traces from CPU */}
        <g className={styles.traces}>
          {/* Left traces */}
          <motion.path
            d="M341 330 L200 330 L200 200 L100 200"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
          />
          <motion.path
            d="M341 410 L280 410 L280 150 L150 150"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.2, duration: 1.5 }}
          />
          <motion.path
            d="M341 490 L250 490 L250 700 L100 700"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.4, duration: 1.5 }}
          />

          {/* Right traces */}
          <motion.path
            d="M859 330 L1000 330 L1000 200 L1100 200"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.6, duration: 1.5 }}
          />
          <motion.path
            d="M859 450 L950 450 L950 600 L1050 600"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.8, duration: 1.5 }}
          />
        </g>

        {/* Memory modules - left side */}
        <g className={styles.memoryModule}>
          <rect x="50" y="180" width="80" height="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" rx="2" />
          <text x="90" y="205" textAnchor="middle" fill="rgba(255,255,255,0.04)" fontSize="8" fontFamily="monospace">RAM.01</text>
          
          <rect x="50" y="680" width="80" height="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" rx="2" />
          <text x="90" y="705" textAnchor="middle" fill="rgba(255,255,255,0.04)" fontSize="8" fontFamily="monospace">RAM.02</text>
        </g>

        {/* Memory modules - right side */}
        <g className={styles.memoryModule}>
          <rect x="1070" y="180" width="80" height="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" rx="2" />
          <text x="1110" y="205" textAnchor="middle" fill="rgba(255,255,255,0.04)" fontSize="8" fontFamily="monospace">SEC.01</text>
          
          <rect x="1020" y="580" width="80" height="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" rx="2" />
          <text x="1060" y="605" textAnchor="middle" fill="rgba(255,255,255,0.04)" fontSize="8" fontFamily="monospace">NET.01</text>
        </g>

        {/* Power distribution section - bottom */}
        <g className={styles.powerSection}>
          <rect x="200" y="850" width="800" height="150" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" rx="4" />
          
          {/* Power cells */}
          {[250, 350, 450, 550, 650, 750, 850, 950].map((x, i) => (
            <rect key={i} x={x} y="870" width="40" height="110" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" rx="2" />
          ))}
          
          {/* Power label */}
          <text x="600" y="940" textAnchor="middle" fill="rgba(255,255,255,0.03)" fontSize="10" fontFamily="monospace">
            POWER.DISTRIBUTION
          </text>
        </g>

        {/* Top section - camera/sensors */}
        <g className={styles.sensorSection}>
          <rect x="450" y="50" width="300" height="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" rx="4" />
          
          {/* Camera modules */}
          <circle cx="500" cy="100" r="25" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="500" cy="100" r="15" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          <circle cx="500" cy="100" r="8" fill="rgba(255,255,255,0.02)" />
          
          <circle cx="600" cy="100" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <circle cx="600" cy="100" r="10" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          
          <rect x="650" y="80" width="80" height="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" rx="2" />
        </g>

        {/* Side components - left */}
        <g className={styles.sideComponents}>
          <rect x="30" y="350" width="60" height="200" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" rx="2" />
          {[370, 410, 450, 490, 530].map((y, i) => (
            <line key={i} x1="30" y1={y} x2="90" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          ))}
        </g>

        {/* Side components - right */}
        <g className={styles.sideComponents}>
          <rect x="1110" y="350" width="60" height="200" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" rx="2" />
          {[370, 410, 450, 490, 530].map((y, i) => (
            <line key={i} x1="1110" y1={y} x2="1170" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          ))}
        </g>

        {/* Bottom section - connectors */}
        <g className={styles.connectors}>
          <rect x="100" y="1050" width="200" height="80" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" rx="4" />
          <rect x="500" y="1050" width="200" height="80" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" rx="4" />
          <rect x="900" y="1050" width="200" height="80" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" rx="4" />
          
          {/* Connector ports */}
          {[120, 160, 200, 240, 280].map((x, i) => (
            <rect key={`c1-${i}`} x={x} y="1070" width="15" height="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" rx="1" />
          ))}
          {[520, 560, 600, 640, 680].map((x, i) => (
            <rect key={`c2-${i}`} x={x} y="1070" width="15" height="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" rx="1" />
          ))}
          {[920, 960, 1000, 1040, 1080].map((x, i) => (
            <rect key={`c3-${i}`} x={x} y="1070" width="15" height="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" rx="1" />
          ))}
        </g>

        {/* Animated data pulses */}
        <g className={styles.dataPulses}>
          <motion.circle
            r="3"
            fill="#C81E1E"
            opacity="0.6"
            filter="url(#circuitGlow)"
            animate={{
              cx: [341, 200, 200, 100],
              cy: [330, 330, 200, 200],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
          <motion.circle
            r="3"
            fill="#00D1FF"
            opacity="0.6"
            filter="url(#circuitGlow)"
            animate={{
              cx: [859, 1000, 1000, 1100],
              cy: [330, 330, 200, 200],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: 2
            }}
          />
          <motion.circle
            r="2"
            fill="#22C55E"
            opacity="0.5"
            filter="url(#circuitGlow)"
            animate={{
              cx: [341, 250, 250, 100],
              cy: [490, 490, 700, 700],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: 1
            }}
          />
        </g>

        {/* Outer frame */}
        <rect x="20" y="20" width="1160" height="1150" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" rx="8" />
        
        {/* Corner markers */}
        <path d="M20 50 L20 20 L50 20" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
        <path d="M1150 20 L1180 20 L1180 50" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
        <path d="M1180 1140 L1180 1170 L1150 1170" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
        <path d="M50 1170 L20 1170 L20 1140" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
