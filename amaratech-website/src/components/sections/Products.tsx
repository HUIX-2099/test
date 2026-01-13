'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { 
  Rocket, 
  Bell,
  Sparkles,
  ArrowRight,
  Shield,
  Cpu,
  Activity,
  Lock,
  Cloud,
  Zap,
  Database,
  Terminal,
  Brain
} from 'lucide-react';
import Link from 'next/link';
import styles from './Products.module.css';

const features = [
  {
    id: '01',
    icon: Brain,
    title: 'AI Consulting',
    desc: 'Enterprise AI strategy, ML models, and intelligent automation',
    color: '#A855F7',
  },
  {
    id: '02',
    icon: Sparkles,
    title: 'AI-Powered Analytics',
    desc: 'Machine learning algorithms analyze threats in real-time',
    color: '#C81E1E',
  },
  {
    id: '03',
    icon: Activity,
    title: 'Real-time Monitoring',
    desc: '24/7 system health and security event tracking',
    color: '#00D1FF',
  },
  {
    id: '04',
    icon: Shield,
    title: 'Zero-Trust Security',
    desc: 'Every access request verified and authenticated',
    color: '#22C55E',
  },
  {
    id: '05',
    icon: Cloud,
    title: 'Cloud Integration',
    desc: 'Seamless Azure, AWS, and hybrid cloud support',
    color: '#C81E1E',
  },
  {
    id: '06',
    icon: Lock,
    title: 'Compliance Ready',
    desc: 'CMMC, HIPAA, SOC 2 built into the workflow',
    color: '#00D1FF',
  },
];

// Matrix rain effect numbers
const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [matrixColumns, setMatrixColumns] = useState<string[][]>([]);
  const hasAnimated = useRef(false);

  // Generate matrix rain
  useEffect(() => {
    const cols = 20;
    const newColumns: string[][] = [];
    for (let i = 0; i < cols; i++) {
      const col: string[] = [];
      const length = Math.floor(Math.random() * 8) + 4;
      for (let j = 0; j < length; j++) {
        col.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
      }
      newColumns.push(col);
    }
    setMatrixColumns(newColumns);
  }, []);

  // Anime.js scroll-triggered animations
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const svg = svgRef.current;
    const features = featuresRef.current;
    const stats = statsRef.current;

    // SVG path drawing animation (pencil effect)
    if (svg) {
      const paths = svg.querySelectorAll('path');
      const circles = svg.querySelectorAll('circle');

      // Set up stroke dash for paths
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
      });

      animate(paths, {
        strokeDashoffset: 0,
        duration: 2000,
        delay: stagger(150),
        ease: 'inOutQuad',
      });

      animate(circles, {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(100, { start: 1500 }),
        ease: 'outBack',
      });
    }

    // Feature cards stagger animation
    if (features) {
      const cards = features.querySelectorAll('[data-feature-card]');
      animate(cards, {
        translateY: [40, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 800,
        delay: stagger(100, { start: 300 }),
        ease: 'outCubic',
      });
    }

    // Stats counter animation
    if (stats) {
      animate(stats.querySelectorAll('[data-stat-box]'), {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(150, { start: 600 }),
        ease: 'outCubic',
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className={styles.products}>
      <div className={styles.gridOverlay} />
      
      {/* Matrix Rain Background */}
      <div className={styles.matrixRain}>
        {matrixColumns.map((col, i) => (
          <motion.div
            key={i}
            className={styles.matrixColumn}
            style={{ left: `${(i / matrixColumns.length) * 100}%` }}
            initial={{ y: '-100%', opacity: 0 }}
            animate={isInView ? { 
              y: ['0%', '100%'],
              opacity: [0, 0.3, 0.3, 0]
            } : {}}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          >
            {col.map((char, j) => (
              <span key={j}>{char}</span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Animated Circuit Lines - Enhanced with anime.js */}
      <svg ref={svgRef} className={styles.circuitLines} viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="pencilTexture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C81E1E" stopOpacity="0"/>
            <stop offset="50%" stopColor="#C81E1E" stopOpacity="1"/>
            <stop offset="100%" stopColor="#C81E1E" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D1FF" stopOpacity="0"/>
            <stop offset="50%" stopColor="#00D1FF" stopOpacity="1"/>
            <stop offset="100%" stopColor="#00D1FF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0"/>
            <stop offset="50%" stopColor="#22C55E" stopOpacity="1"/>
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Main Horizontal Lines - Pencil Drawing Effect */}
        <path
          d="M 0 200 H 400 L 450 250 H 950 L 1000 200 H 1400"
          stroke="url(#redGrad)"
          strokeWidth="2"
          fill="none"
          filter="url(#circuitGlow)"
          opacity="0.7"
        />
        <path
          d="M 0 600 H 300 L 350 550 H 1050 L 1100 600 H 1400"
          stroke="url(#blueGrad)"
          strokeWidth="2"
          fill="none"
          filter="url(#circuitGlow)"
          opacity="0.7"
        />
        
        {/* Secondary circuit traces */}
        <path
          d="M 100 100 Q 150 150 200 100 T 300 100 T 400 100"
          stroke="#C81E1E"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          filter="url(#pencilTexture)"
        />
        <path
          d="M 1000 100 Q 1050 150 1100 100 T 1200 100 T 1300 100"
          stroke="#00D1FF"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
          filter="url(#pencilTexture)"
        />
        <path
          d="M 600 700 Q 650 650 700 700 T 800 700"
          stroke="url(#greenGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        
        {/* Vertical Lines */}
        <path
          d="M 200 0 V 150 L 250 200 V 600 L 200 650 V 800"
          stroke="#C81E1E"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M 1200 0 V 150 L 1150 200 V 600 L 1200 650 V 800"
          stroke="#00D1FF"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M 700 0 V 300 L 650 350 V 450 L 700 500 V 800"
          stroke="#22C55E"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
        />

        {/* Cross-hatching pattern (pencil style) */}
        <path d="M 500 300 L 550 350 M 520 300 L 570 350 M 540 300 L 590 350" stroke="#C81E1E" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M 850 300 L 900 350 M 870 300 L 920 350 M 890 300 L 940 350" stroke="#00D1FF" strokeWidth="0.5" fill="none" opacity="0.3" />

        {/* Connection Nodes */}
        <circle cx="450" cy="250" r="6" fill="#C81E1E" filter="url(#circuitGlow)" />
        <circle cx="950" cy="250" r="6" fill="#00D1FF" filter="url(#circuitGlow)" />
        <circle cx="350" cy="550" r="6" fill="#22C55E" filter="url(#circuitGlow)" />
        <circle cx="1050" cy="550" r="6" fill="#C81E1E" filter="url(#circuitGlow)" />
        <circle cx="700" cy="400" r="8" fill="#22C55E" filter="url(#circuitGlow)" />

        {/* Data Pulse Animation */}
        <motion.circle
          r="4"
          fill="#C81E1E"
          filter="url(#circuitGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={isInView ? { offsetDistance: ['0%', '100%'] } : {}}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          style={{ offsetPath: "path('M 0 200 H 400 L 450 250 H 950 L 1000 200 H 1400')" }}
        />
        <motion.circle
          r="4"
          fill="#00D1FF"
          filter="url(#circuitGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={isInView ? { offsetDistance: ['0%', '100%'] } : {}}
          transition={{ duration: 5, repeat: Infinity, delay: 3 }}
          style={{ offsetPath: "path('M 0 600 H 300 L 350 550 H 1050 L 1100 600 H 1400')" }}
        />
        <motion.circle
          r="3"
          fill="#22C55E"
          filter="url(#circuitGlow)"
          initial={{ offsetDistance: '0%' }}
          animate={isInView ? { offsetDistance: ['0%', '100%'] } : {}}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
          style={{ offsetPath: "path('M 700 0 V 300 L 650 350 V 450 L 700 500 V 800')" }}
        />
      </svg>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerLabel}>[04] PLATFORM</span>
            <h2 className={styles.title}>Our Platform</h2>
            <div className={styles.headerBinary}>
              <span>01001001 01010100</span>
              <span className={styles.binaryHighlight}>// NEXT_GEN</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.statusPanel}>
              <div className={styles.statusRow}>
                <Terminal size={14} />
                <span>STATUS:</span>
                <motion.span 
                  className={styles.statusValue}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  BUILDING
                </motion.span>
              </div>
              <div className={styles.statusRow}>
                <Cpu size={14} />
                <span>ETA:</span>
                <span className={styles.statusValue}>2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Left - Coming Soon Card */}
          <motion.div
            className={styles.comingSoonCard}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardFrame}>
              <span className={styles.cardFrameLabel}>// LAUNCH_PREVIEW</span>
              <div className={styles.cardFrameDots}>
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }} />
              </div>
            </div>

            <div className={styles.comingSoonContent}>
              <motion.div 
                className={styles.comingSoonIcon}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket size={48} />
                <div className={styles.iconRings}>
                  <motion.span 
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.span 
                    animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
              </motion.div>

              <div className={styles.comingSoonText}>
                <h3>Something Amazing is Coming</h3>
                <p>
                  We're building a powerful platform to revolutionize how you manage 
                  security, cloud infrastructure, and IT operations.
                </p>
              </div>

              <motion.div
                className={styles.notifySection}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Link href="/contact" className={styles.notifyButton}>
                  <Bell size={18} />
                  Notify Me When Ready
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <div className={styles.comingSoonDecor}>
                <div className={styles.decorLine} />
                <motion.span 
                  className={styles.decorText}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LAUNCHING 2026
                </motion.span>
                <div className={styles.decorLine} />
              </div>
            </div>
          </motion.div>

          {/* Right - Features Grid with anime.js */}
          <div ref={featuresRef} className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  data-feature-card
                  className={styles.featureCard}
                  style={{ 
                    '--feature-color': feature.color,
                    opacity: 0,
                  } as React.CSSProperties}
                >
                  <div className={styles.featureNumber}>{feature.id}</div>
                  <div className={styles.featureIcon}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                  <div className={styles.featureWire}>
                    <motion.div 
                      className={styles.wirePulse}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats with anime.js counter animation */}
        <div ref={statsRef} className={styles.bottomStats}>
          <div data-stat-box className={styles.statBox} style={{ opacity: 0 }}>
            <Zap size={16} />
            <span data-stat-value data-target="99.99" className={styles.statValue}>0</span>
            <span className={styles.statUnit}>%</span>
            <span className={styles.statLabel}>Uptime SLA</span>
          </div>
          <div data-stat-box className={styles.statBox} style={{ opacity: 0 }}>
            <Shield size={16} />
            <span data-stat-value data-target="256" className={styles.statValue}>0</span>
            <span className={styles.statUnit}>-bit</span>
            <span className={styles.statLabel}>Encryption</span>
          </div>
          <div data-stat-box className={styles.statBox} style={{ opacity: 0 }}>
            <Activity size={16} />
            <span className={styles.statPrefix}>&lt;</span>
            <span data-stat-value data-target="50" className={styles.statValue}>0</span>
            <span className={styles.statUnit}>ms</span>
            <span className={styles.statLabel}>Response Time</span>
          </div>
          <div data-stat-box className={styles.statBox} style={{ opacity: 0 }}>
            <Lock size={16} />
            <span className={styles.statValue}>SOC 2</span>
            <span className={styles.statLabel}>Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
