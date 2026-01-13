'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, Globe, Activity, CheckCircle2, Clock, Zap, 
  Server, Lock, Users, Award, TrendingUp, ArrowRight,
  Building2, Cpu, Brain
} from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.css';

// Key differentiators / value props
const trustBadges = [
  { label: 'Microsoft Partner', icon: Award },
  { label: 'CMMC Ready', icon: Shield },
  { label: 'HIPAA Compliant', icon: Lock },
  { label: 'SOC 2 Type II', icon: CheckCircle2 },
];

// Core services with real descriptions - AI FIRST
const coreServices = [
  {
    code: 'AI',
    title: 'AI Consulting',
    description: 'Machine learning, automation, and intelligent systems for enterprise transformation',
    stat: '50+',
    statLabel: 'AI implementations',
    color: '#A855F7',
    href: '/services/ai-consulting',
  },
  {
    code: 'SEC',
    title: 'Cybersecurity',
    description: '24/7 threat monitoring, incident response, and vulnerability management',
    stat: '2,847+',
    statLabel: 'threats blocked this month',
    color: '#C81E1E',
    href: '/services/security',
  },
  {
    code: 'CLD',
    title: 'Cloud Solutions',
    description: 'Azure & AWS migration, architecture, and managed cloud services',
    stat: '99.97%',
    statLabel: 'uptime SLA',
    color: '#00D1FF',
    href: '/services/cloud',
  },
  {
    code: 'GOV',
    title: 'E-Governance',
    description: 'Digital transformation for government agencies and public sector',
    stat: '15+',
    statLabel: 'government clients',
    color: '#22C55E',
    href: '/services/e-governance',
  },
];

// Key stats
const heroStats = [
  { value: '15+', label: 'Years Experience', icon: Clock },
  { value: '100+', label: 'Projects Delivered', icon: TrendingUp },
  { value: '24/7', label: 'SOC Monitoring', icon: Activity },
  { value: '2', label: 'Global Offices', icon: Globe },
];

// Matrix rain characters
const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState('');
  const [activeService, setActiveService] = useState(0);
  const [matrixColumns, setMatrixColumns] = useState<Array<{chars: string[], left: string, duration: number, delay: number}>>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Generate matrix rain columns
  useEffect(() => {
    const cols = 25;
    const newColumns: Array<{chars: string[], left: string, duration: number, delay: number}> = [];
    for (let i = 0; i < cols; i++) {
      const chars: string[] = [];
      const length = Math.floor(Math.random() * 12) + 6;
      for (let j = 0; j < length; j++) {
        chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
      }
      newColumns.push({
        chars,
        left: `${(i / cols) * 100}%`,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 10,
      });
    }
    setMatrixColumns(newColumns);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Rotate through services
    const serviceInterval = setInterval(() => {
      setActiveService(prev => (prev + 1) % coreServices.length);
    }, 4000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(serviceInterval);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Background Effects */}
      <div className={styles.gridOverlay} />
      <div className={styles.scanLines} />
      
      {/* Matrix Rain Effect */}
      <div className={styles.matrixRain}>
        {matrixColumns.map((col, i) => (
          <div
            key={i}
            className={styles.matrixColumn}
            style={{
              left: col.left,
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {col.chars.map((char, j) => (
              <span key={j}>{char}</span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Animated Background Gradient */}
      <div className={styles.gradientOrb} />

      {/* Cable Decorations */}
      <div className={styles.cableDecoration}>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        <svg className={styles.cableLeft} viewBox="0 0 100 400" preserveAspectRatio="none">
          <motion.path 
            d="M0 50 Q 30 50 50 100 T 80 200 T 50 300 T 100 400" 
            stroke="#C81E1E" 
            strokeWidth="2" 
            fill="none" 
            filter="url(#glowRed)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0 100 Q 40 100 60 150 T 70 250 T 40 350 T 100 450" 
            stroke="#00D1FF" 
            strokeWidth="2" 
            fill="none" 
            filter="url(#glowBlue)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>

        <svg className={styles.cableRight} viewBox="0 0 100 400" preserveAspectRatio="none">
          <motion.path 
            d="M100 80 Q 70 80 50 130 T 20 230 T 50 330 T 0 420" 
            stroke="#C81E1E" 
            strokeWidth="2" 
            fill="none" 
            filter="url(#glowRed)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.path 
            d="M100 150 Q 60 150 40 200 T 30 300 T 60 380 T 0 450" 
            stroke="#00D1FF" 
            strokeWidth="2" 
            fill="none" 
            filter="url(#glowBlue)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.8, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <motion.div className={styles.container} style={{ opacity, scale }}>
        
        {/* Top Bar - Status & Trust */}
        <div className={styles.topBar}>
          <div className={styles.statusIndicator}>
            <span className={styles.statusDot} />
            <span>ALL SYSTEMS OPERATIONAL</span>
            <span className={styles.statusDivider}>|</span>
            <Clock size={12} />
            <span className={styles.liveTime}>{time} UTC</span>
          </div>
          <div className={styles.trustBadges}>
            {trustBadges.map((badge, i) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div 
                  key={i} 
                  className={styles.trustBadge}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <BadgeIcon size={12} />
                  <span>{badge.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          
          {/* Left - Hero Text */}
          <div className={styles.heroText}>
            <motion.div 
              className={styles.eyebrow}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Shield size={16} />
              <span>ENTERPRISE IT SOLUTIONS</span>
            </motion.div>

            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Secure Your Business.<br />
              <span className={styles.headlineAccent}>Scale With Confidence.</span>
            </motion.h1>

            <motion.p
              className={styles.subheadline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              AmaraTech delivers enterprise-grade cybersecurity, cloud infrastructure, 
              and IT consulting. Trusted by government agencies and Fortune 500 companies 
              across the US and Africa.
            </motion.p>

            {/* Key Stats Row */}
            <motion.div 
              className={styles.statsRow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {heroStats.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div key={i} className={styles.statCard}>
                    <StatIcon size={16} className={styles.statIcon} />
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/contact" className={styles.ctaPrimary}>
                <Zap size={18} />
                Get Free Security Assessment
              </Link>
              <Link href="/services" className={styles.ctaSecondary}>
                Explore Services
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Client Logos Hint */}
            <motion.div 
              className={styles.clientHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Users size={14} />
              <span>Trusted by 100+ organizations including government agencies</span>
            </motion.div>
          </div>

          {/* Right - Service Cards */}
          <div className={styles.serviceShowcase}>
            <div className={styles.serviceHeader}>
              <span className={styles.serviceHeaderLabel}>CORE CAPABILITIES</span>
              <div className={styles.serviceNav}>
                {coreServices.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.serviceNavDot} ${activeService === i ? styles.active : ''}`}
                    onClick={() => setActiveService(i)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.serviceCards}>
              {coreServices.map((service, i) => (
                <motion.div
                  key={service.code}
                  className={`${styles.serviceCard} ${activeService === i ? styles.activeCard : ''}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  onClick={() => setActiveService(i)}
                  style={{ '--accent-color': service.color } as React.CSSProperties}
                >
                  <div className={styles.serviceCardHeader}>
                    <span className={styles.serviceCode}>[{service.code}]</span>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                  </div>
                  
                  <p className={styles.serviceDesc}>{service.description}</p>
                  
                  <div className={styles.serviceStatRow}>
                    <div className={styles.serviceStat}>
                      <span className={styles.serviceStatValue} style={{ color: service.color }}>
                        {service.stat}
                      </span>
                      <span className={styles.serviceStatLabel}>{service.statLabel}</span>
                    </div>
                    <Link href={service.href} className={styles.serviceLink}>
                      Learn more <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Active indicator bar */}
                  <motion.div 
                    className={styles.serviceActiveBar}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeService === i ? 1 : 0 }}
                    style={{ background: service.color }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Visualization Preview */}
            <div className={styles.vizPreview}>
              <div className={styles.vizCircle}>
                <svg viewBox="0 0 100 100" className={styles.vizSvg}>
                  <defs>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C81E1E" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C81E1E" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(200,30,30,0.2)" strokeWidth="0.5" strokeDasharray="4 2" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(200,30,30,0.3)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(200,30,30,0.4)" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="15" fill="url(#centerGlow)" />
                  <motion.circle 
                    cx="50" cy="50" r="8" 
                    fill="#C81E1E"
                    animate={{ r: [8, 10, 8], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Orbiting nodes */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + 35 * Math.cos(rad);
                    const y = 50 + 35 * Math.sin(rad);
                    return (
                      <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="3"
                        fill={i === 2 ? '#00D1FF' : i === 4 ? '#22C55E' : '#C81E1E'}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                    );
                  })}
                </svg>
                <div className={styles.vizLabel}>
                  <Cpu size={14} />
                  <span>ACTIVE MONITORING</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.locationBadge}>
            <Building2 size={14} />
            <span>Columbia, MD</span>
            <span className={styles.locationDivider}>•</span>
            <span>Monrovia, Liberia</span>
          </div>
          <div className={styles.contactInfo}>
            <span>+1 (410) 855-2206</span>
            <span className={styles.contactDivider}>|</span>
            <span>info@amaratechit.com</span>
          </div>
          <div className={styles.scrollHint}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>Scroll to explore</span>
              <ArrowRight size={14} style={{ transform: 'rotate(90deg)' }} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
