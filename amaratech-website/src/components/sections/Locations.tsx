'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { animate, stagger, createTimeline } from 'animejs';
import { MapPin, Phone, Globe, Server, Cpu, HardDrive, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import styles from './Locations.module.css';

const offices = [
  {
    id: 'us',
    country: 'United States',
    city: 'Columbia, MD',
    address: '8865 Stanford Blvd, Suite 202',
    phone: '+1 410 855 2206',
    flag: '🇺🇸',
    isHQ: true,
  },
  {
    id: 'liberia',
    country: 'Liberia',
    city: 'Monrovia',
    address: 'Monrovia Office',
    phone: '+231 77 861 6504',
    flag: '🇱🇷',
    isHQ: false,
  },
];

export default function Locations() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const techSetupRef = useRef<HTMLDivElement>(null);
  const wiringSvgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const hasAnimated = useRef(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isVideoInView = useInView(videoContainerRef, { once: true, margin: '-50px' });

  // Auto-play video when it comes into view
  useEffect(() => {
    if (isVideoInView && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser, user can click to play
      });
    }
  }, [isVideoInView]);

  // Anime.js animations for tech setup
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const techSetup = techSetupRef.current;
    const wiringSvg = wiringSvgRef.current;

    // Wire drawing animation
    if (wiringSvg) {
      const paths = wiringSvg.querySelectorAll('path');
      const nodes = wiringSvg.querySelectorAll('circle');

      // Set up stroke dash for paths
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
      });

      // Pencil-style drawing
      animate(paths, {
        strokeDashoffset: 0,
        duration: 1500,
        delay: stagger(200),
        ease: 'inOutQuad',
      });

      // Pop in nodes
      animate(nodes, {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(100, { start: 1200 }),
        ease: 'outBack',
      });

      // Data flow pulse animation
      animate(wiringSvg.querySelectorAll('.data-pulse'), {
        translateX: [0, 100],
        opacity: [0, 1, 1, 0],
        duration: 2000,
        loop: true,
        delay: stagger(500, { start: 2000 }),
        ease: 'linear',
      });
    }

    // Server unit entrance
    if (techSetup) {
      const serverEl = techSetup.querySelector('[data-server]');
      if (serverEl) {
        animate(serverEl, {
          translateX: [-50, 0],
          opacity: [0, 1],
          duration: 800,
          delay: 300,
          ease: 'outCubic',
        });
      }

      // Monitor entrance
      const monitorEl = techSetup.querySelector('[data-monitor]');
      if (monitorEl) {
        animate(monitorEl, {
          translateY: [-30, 0],
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 800,
          delay: 500,
          ease: 'outCubic',
        });
      }

      // Keyboard entrance
      const keyboardEl = techSetup.querySelector('[data-keyboard]');
      if (keyboardEl) {
        animate(keyboardEl, {
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 600,
          delay: 700,
          ease: 'outCubic',
        });
      }

      // LED blink animation
      animate(techSetup.querySelectorAll('[data-led]'), {
        opacity: [0.3, 1, 0.3],
        duration: 800,
        loop: true,
        delay: stagger(200),
        ease: 'inOutSine',
      });
    }
  }, [isInView]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const togglePlay = () => {
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
    <section ref={ref} className={styles.locations}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left - Video Showcase */}
          <div className={styles.leftPanel}>
            <div className={styles.header}>
              <span className={styles.headerLabel}>[03] VIDEO_SHOWCASE</span>
              <h2 className={styles.title}>Experience AmaraTech</h2>
              <p className={styles.headerDesc}>
                See how our solutions protect and empower businesses worldwide.
              </p>
            </div>

            {/* Video Player */}
            <motion.div
              className={styles.videoWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.videoFrame}>
                <span className={styles.videoFrameLabel}>AMARATECH_MEDIA</span>
                <div className={styles.videoFrameDots}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div ref={videoContainerRef} className={styles.videoContainer}>
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
                  <source src="/videos/Updated AmaraTech IT Solutions Screensaver w Secure Login V1.mp4" type="video/mp4" />
                </video>

                {/* Play Overlay */}
                {!isPlaying && (
                  <div className={styles.playOverlay} onClick={togglePlay}>
                    <motion.div
                      className={styles.playButton}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={32} fill="white" />
                    </motion.div>
                    <span className={styles.playText}>Click to play</span>
                  </div>
                )}

                {/* Controls */}
                {isPlaying && (
                  <div className={styles.videoControls}>
                    <button className={styles.controlBtn} onClick={togglePlay}>
                      <Pause size={16} />
                    </button>
                    <button className={styles.controlBtn} onClick={toggleMute}>
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Office Cards - Compact */}
            <div className={styles.officesRow}>
              {offices.map((office, index) => (
                <motion.div
                  key={office.id}
                  className={styles.officeCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span className={styles.officeFlag}>{office.flag}</span>
                  <div className={styles.officeInfo}>
                    <span className={styles.officeCity}>{office.city}</span>
                    <span className={styles.officePhone}>{office.phone}</span>
                  </div>
                  {office.isHQ && <span className={styles.hqBadge}>HQ</span>}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Animated Tech Setup with anime.js */}
          <motion.div
            className={styles.rightPanel}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div ref={techSetupRef} className={styles.techSetup}>
              {/* Enhanced Wiring SVG with anime.js */}
              <svg ref={wiringSvgRef} className={styles.wiring} viewBox="0 0 400 300" preserveAspectRatio="none">
                <defs>
                  <filter id="wireGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="pencilWire" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <linearGradient id="wireRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C81E1E" />
                    <stop offset="100%" stopColor="#FF6B6B" />
                  </linearGradient>
                  <linearGradient id="wireBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D1FF" />
                    <stop offset="100%" stopColor="#00A3CC" />
                  </linearGradient>
                </defs>

                {/* Red wire - Server to Monitor (pencil style) */}
                <path
                  d="M 60 80 Q 80 80 90 100 T 120 140 T 150 120"
                  stroke="url(#wireRedGrad)"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#wireGlow)"
                  strokeLinecap="round"
                />
                {/* Blue wire - Server to Monitor */}
                <path
                  d="M 60 100 Q 85 110 100 130 T 130 150 T 155 130"
                  stroke="url(#wireBlueGrad)"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#wireGlow)"
                  strokeLinecap="round"
                />
                {/* Red wire - Monitor to Keyboard */}
                <path
                  d="M 200 220 Q 200 240 180 250 T 160 270"
                  stroke="#C81E1E"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#wireGlow)"
                  strokeLinecap="round"
                />
                {/* Blue wire - Monitor to Keyboard */}
                <path
                  d="M 220 220 Q 220 245 240 255 T 260 270"
                  stroke="#00D1FF"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#wireGlow)"
                  strokeLinecap="round"
                />
                {/* Additional detail wires */}
                <path
                  d="M 65 90 Q 90 95 110 125"
                  stroke="#22C55E"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#wireGlow)"
                  opacity="0.7"
                  strokeLinecap="round"
                />

                {/* Connection nodes */}
                <circle cx="60" cy="80" r="4" fill="#C81E1E" filter="url(#wireGlow)" />
                <circle cx="60" cy="100" r="4" fill="#00D1FF" filter="url(#wireGlow)" />
                <circle cx="150" cy="120" r="5" fill="#C81E1E" filter="url(#wireGlow)" />
                <circle cx="155" cy="130" r="5" fill="#00D1FF" filter="url(#wireGlow)" />
                <circle cx="200" cy="220" r="3" fill="#C81E1E" filter="url(#wireGlow)" />
                <circle cx="220" cy="220" r="3" fill="#00D1FF" filter="url(#wireGlow)" />

                {/* Data pulse particles */}
                <circle className="data-pulse" cx="70" cy="85" r="3" fill="#C81E1E" filter="url(#wireGlow)" opacity="0" />
                <circle className="data-pulse" cx="70" cy="105" r="3" fill="#00D1FF" filter="url(#wireGlow)" opacity="0" />
              </svg>

              {/* Server Unit with anime.js */}
              <div 
                data-server
                className={styles.serverUnit}
                style={{
                  transform: isHovering ? `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)` : 'none',
                  opacity: 0,
                }}
              >
                <div className={styles.serverTop}>
                  <div className={styles.serverVent} />
                  <div className={styles.serverVent} />
                  <div className={styles.serverVent} />
                </div>
                <div className={styles.serverBody}>
                  <div className={styles.serverDrive}>
                    <HardDrive size={14} />
                    <div data-led className={styles.driveLed} />
                  </div>
                  <div className={styles.serverDrive}>
                    <HardDrive size={14} />
                    <div data-led className={styles.driveLed} />
                  </div>
                  <div className={styles.serverDrive}>
                    <Cpu size={14} />
                    <div data-led className={styles.driveLed} />
                  </div>
                </div>
                <div className={styles.serverFoot} />
              </div>

              {/* Vintage Monitor with anime.js */}
              <div 
                data-monitor
                className={styles.monitorContainer}
                style={{
                  transform: isHovering ? `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)` : 'none',
                  opacity: 0,
                }}
              >
                <div className={styles.monitor}>
                  <div className={styles.monitorBezel}>
                    <div className={styles.screen}>
                      {/* Screen Content */}
                      <div className={styles.screenContent}>
                        <motion.div 
                          className={styles.scanline}
                          animate={{ y: ['-100%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                        <div className={styles.terminalHeader}>
                          <span>AMARATECH_SYSTEM v2.0</span>
                          <div className={styles.terminalDots}>
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                        <div className={styles.terminalBody}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                          >
                            <p className={styles.terminalLine}>
                              <span className={styles.prompt}>&gt;</span> SYSTEM STATUS: <span className={styles.success}>ONLINE</span>
                            </p>
                            <p className={styles.terminalLine}>
                              <span className={styles.prompt}>&gt;</span> NODES: <span className={styles.highlight}>2 ACTIVE</span>
                            </p>
                            <p className={styles.terminalLine}>
                              <span className={styles.prompt}>&gt;</span> UPTIME: 99.97%
                            </p>
                            <motion.p 
                              className={styles.terminalLine}
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <span className={styles.prompt}>&gt;</span> <span className={styles.cursor}>_</span>
                            </motion.p>
                          </motion.div>
                        </div>
                      </div>
                      <div className={styles.screenGlow} />
                    </div>
                    <div className={styles.monitorLogo}>
                      <Server size={12} />
                      <span>AMARA</span>
                    </div>
                  </div>
                  <div className={styles.monitorStand} />
                  <div className={styles.monitorBase} />
                </div>

                {/* Keyboard with anime.js */}
                <div data-keyboard className={styles.keyboard} style={{ opacity: 0 }}>
                  <div className={styles.keyboardBody}>
                    <div className={styles.keyRow}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div 
                          key={i} 
                          className={styles.key}
                          animate={isHovering && i % 3 === 0 ? { y: [0, -2, 0] } : {}}
                          transition={{ duration: 0.2, delay: i * 0.05 }}
                        />
                      ))}
                    </div>
                    <div className={styles.keyRow}>
                      {Array.from({ length: 11 }).map((_, i) => (
                        <motion.div 
                          key={i} 
                          className={styles.key}
                          animate={isHovering && i % 4 === 0 ? { y: [0, -2, 0] } : {}}
                          transition={{ duration: 0.2, delay: i * 0.03 }}
                        />
                      ))}
                    </div>
                    <div className={styles.keyRow}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className={styles.key} />
                      ))}
                    </div>
                    <div className={styles.keyRow}>
                      <div className={styles.key} />
                      <div className={`${styles.key} ${styles.spaceBar}`} />
                      <div className={styles.key} />
                    </div>
                  </div>
                  <div className={styles.keyboardLed}>
                    <motion.span 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
