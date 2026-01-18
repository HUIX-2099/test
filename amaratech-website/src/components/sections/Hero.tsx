'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, ArrowRight, Shield, Cloud, FileCheck, CheckCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

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

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Animated Hexagon Background */}
      <div className={styles.hexagonBackground}>
        <div className={styles.hexagonLarge} />
        <div className={styles.hexagonMedium} />
        <div className={styles.hexagonSmall} />
      </div>

      {/* Floating Hexagons */}
      <div className={styles.floatingHexes}>
        <div className={`${styles.floatHex} ${styles.floatHex1}`} />
        <div className={`${styles.floatHex} ${styles.floatHex2}`} />
        <div className={`${styles.floatHex} ${styles.floatHex3}`} />
        <div className={`${styles.floatHex} ${styles.floatHex4}`} />
      </div>
      
      {/* Background Grid */}
      <div className={styles.gridOverlay} />
      
      {/* Large Background Number */}
      <div className={styles.bgNumber}>01</div>

      {/* Brand Showcase - Hexagon Logo */}
      <motion.div 
        className={styles.brandShowcase}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className={styles.brandHexagon}>
          <Image 
            src="/design/AmaraTech.png" 
            alt="AmaraTech Hexagon Logo" 
            width={280}
            height={280}
            priority
          />
        </div>
        <span className={styles.brandTagline}>Innovation • Security • Excellence</span>
      </motion.div>

      <motion.div className={styles.container} style={{ opacity }}>
        
        {/* Top Meta Bar */}
        <div className={styles.metaBar}>
          <div className={styles.metaLeft}>
            <span className={styles.metaLabel}>SECTION</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaValue}>01</span>
          </div>
          <div className={styles.metaRight}>
            <Image 
              src="/logo/Artboard- Amaratech4x.png" 
              alt="AmaraTech IT Solutions" 
              width={140} 
              height={40}
              className={styles.metaLogo}
            />
          </div>
        </div>

        {/* Main 3-Column Content */}
        <div className={styles.mainContent}>
          
          {/* Column 1: Primary Message */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.columnHeader}>
              <span className={styles.columnNumber}>[01]</span>
              <span className={styles.columnLabel}>OVERVIEW</span>
            </div>
            
            <div className={styles.columnContent}>
              <h1 className={styles.headline}>
                <span className={styles.headlineSmall}>Managed Cybersecurity &amp; IT Services</span>
                <br />
                <span className={styles.headlineAccent}>Trusted Partner for Businesses Nationwide</span>
              </h1>
              
              <p className={styles.description}>
                Your Trusted Partner in Digital Security
                <br />
                At AmaraTech IT, we deliver enterprise grade cybersecurity and IT solutions
                that safeguard your systems, ensure compliance, and give your business
                the confidence to grow in today&apos;s digital world.
              </p>

              {/* Capabilities */}
              <div className={styles.capabilities}>
                <div className={styles.capItem}>
                  <Shield size={16} />
                  <span>Threat Detection</span>
                </div>
                <div className={styles.capItem}>
                  <Cloud size={16} />
                  <span>Cloud & Email Security</span>
                </div>
                <div className={styles.capItem}>
                  <FileCheck size={16} />
                  <span>Compliance & Risk Management</span>
                </div>
              </div>

              {/* Contact & CTA */}
              <div className={styles.ctaSection}>
                <a href="tel:4108552206" className={styles.phoneLink}>
                  <Phone size={14} />
                  <span>Call us Today: 410 855 2206</span>
                </a>
                <Link href="/contact" className={styles.ctaPrimary}>
                  BOOK CONSULT
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Video */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={styles.columnHeader}>
              <span className={styles.columnNumber}>[02]</span>
              <span className={styles.columnLabel}>MEDIA</span>
            </div>
            
            <div className={styles.videoWrapper}>
              <div className={styles.videoFrame}>
                <span className={styles.videoLabel}>AMARATECH_PROMO.MP4</span>
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

                {!isPlaying && (
                  <div className={styles.videoOverlay} onClick={toggleVideo}>
                    <motion.div 
                      className={styles.playBtn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={24} fill="white" />
                    </motion.div>
                  </div>
                )}

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
          </motion.div>

          {/* Column 3: Compliance Services */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.columnHeader}>
              <span className={styles.columnNumber}>[03]</span>
              <span className={styles.columnLabel}>COMPLIANCE</span>
            </div>
            
            <div className={styles.columnContent}>
              <h2 className={styles.subHeadline}>
                Advanced Compliance & Security Readiness Services
              </h2>
              
              <p className={styles.subDescription}>
                Certified cybersecurity experts helping you meet compliance with confidence
              </p>

              {/* Compliance Badge */}
              <div className={styles.complianceBadge}>
                <Image 
                  src="/other_images/compliant.png" 
                  alt="Cybersecurity Maturity Model Compliant" 
                  width={120}
                  height={120}
                  className={styles.complianceImage}
                />
              </div>

              {/* Services List */}
              <div className={styles.servicesList}>
                <div className={styles.serviceItem}>
                  <CheckCircle size={16} />
                  <span>Gap Analysis & Risk Assessments</span>
                </div>
                <div className={styles.serviceItem}>
                  <CheckCircle size={16} />
                  <span>Step-by-Step Compliance Roadmaps</span>
                </div>
                <div className={styles.serviceItem}>
                  <CheckCircle size={16} />
                  <span>Expert-Led Security Training & Advisory</span>
                </div>
              </div>

              <Link href="/services/security" className={styles.ctaSecondary}>
                Learn More
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Spec Bar */}
        <div className={styles.specBar}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>LOCATION</span>
            <span className={styles.specValue}>Columbia, MD · Monrovia, LR</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>EMAIL</span>
            <span className={styles.specValue}>info@amaratechit.com</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>PHONE</span>
            <span className={styles.specValue}>+1 410 855 2206</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>REV</span>
            <span className={styles.specValue}>2026.01</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
