'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Shield, Globe, Activity, CheckCircle2, Clock, Zap, 
  Server, Lock, Users, Award, TrendingUp, ArrowRight,
  Building2, Cpu, Brain, Plus, Minus, Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.css';

// FAQ Data
const faqs = [
  {
    question: 'What cybersecurity services do you offer?',
    answer: 'Comprehensive security including 24/7 threat monitoring, penetration testing, incident response, and compliance consulting (CMMC, HIPAA, SOC 2).'
  },
  {
    question: 'How quickly can you respond to incidents?',
    answer: 'Our SOC team provides 24/7/365 coverage with an average incident response time of under 15 minutes.'
  },
  {
    question: 'Do you support cloud migrations?',
    answer: 'Yes, we are Microsoft Azure Gold Partners and AWS Advanced Partners specializing in secure cloud migrations.'
  },
  {
    question: 'What industries do you serve?',
    answer: 'Healthcare, defense contractors, financial services, government agencies, and enterprises across all sectors.'
  },
];

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState('');
  const [activeService, setActiveService] = useState(0);
  const [matrixColumns, setMatrixColumns] = useState<Array<{chars: string[], left: string, duration: number, delay: number}>>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked by browser, show play button
        setIsPlaying(false);
      });
    }
  }, []);

  // Video controls
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

        {/* Main Content - 3 Column Layout */}
        <div className={styles.mainContent}>
          
          {/* Left Column - Hero Text */}
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
              and IT consulting. Trusted by government agencies and Fortune 500 companies.
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
                Get Free Assessment
              </Link>
              <Link href="/services" className={styles.ctaSecondary}>
                Services
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
              <span>Trusted by 100+ organizations</span>
            </motion.div>
          </div>

          {/* Center Column - Video */}
          <motion.div 
            className={styles.videoColumn}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.videoWrapper}>
              <div className={styles.videoFrame}>
                <span className={styles.videoLabel}>// AMARATECH_PROMO</span>
                <div className={styles.videoFrameDots}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={styles.videoContainer}>
                <video
                  ref={videoRef}
                  className={styles.video}
                  poster="/other_images/AmaraTech IT Solutions.png"
                  muted
                  loop
                  playsInline
                  autoPlay
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/videos/AmaraTech .mp4" type="video/mp4" />
                </video>

                {/* Play Overlay */}
                {!isPlaying && (
                  <div className={styles.videoOverlay} onClick={toggleVideo}>
                    <motion.div 
                      className={styles.playBtn}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={24} fill="white" />
                    </motion.div>
                  </div>
                )}

                {/* Video Controls */}
                {isPlaying && (
                  <div className={styles.videoControls}>
                    <button onClick={toggleVideo} className={styles.controlBtn}>
                      <Pause size={14} />
                    </button>
                    <button onClick={toggleMute} className={styles.controlBtn}>
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.videoCaption}>
              <span>About AmaraTech</span>
            </div>
          </motion.div>

          {/* Right Column - FAQ */}
          <motion.div 
            className={styles.faqColumn}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.faqHeader}>
              <span className={styles.faqHeaderLabel}>FAQ</span>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${styles.faqItem} ${openFaqIndex === index ? styles.faqOpen : ''}`}
                >
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span className={styles.questionText}>{faq.question}</span>
                    <span className={styles.questionIcon}>
                      {openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        className={styles.faqAnswer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <Link href="/contact" className={styles.faqCta}>
              More Questions? Contact Us →
            </Link>
          </motion.div>
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
