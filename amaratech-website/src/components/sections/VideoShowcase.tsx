'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import styles from './VideoShowcase.module.css';

interface VideoShowcaseProps {
  videoSrc?: string;
  posterImage?: string;
  title?: string;
  description?: string;
}

export default function VideoShowcase({
  videoSrc = '/videos/Updated AmaraTech IT Solutions Screensaver w Secure Login V1.mp4',
  posterImage = '/other_images/AmaraTech IT Solutions.png',
  title = 'Experience AmaraTech',
  description = 'See how our solutions protect and empower businesses worldwide.',
}: VideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

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
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className={styles.showcase} ref={containerRef}>
      <div className={styles.gridOverlay} />
      
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>// VIDEO_SHOWCASE</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          className={styles.videoWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => !isPlaying && setShowControls(true)}
        >
          {/* Decorative frame */}
          <div className={styles.frameTop}>
            <span className={styles.frameLabel}>AMARATECH_MEDIA</span>
            <div className={styles.frameDots}>
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
            </div>
          </div>

          <div className={styles.videoContainer}>
            <video
              ref={videoRef}
              className={styles.video}
              poster={posterImage}
              muted={isMuted}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play overlay */}
            {!isPlaying && (
              <motion.div
                className={styles.playOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={togglePlay}
              >
                <motion.div
                  className={styles.playButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={40} fill="white" />
                </motion.div>
                <span className={styles.playText}>Click to play</span>
              </motion.div>
            )}

            {/* Controls */}
            {showControls && (
              <motion.div
                className={styles.controls}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button 
                  className={styles.controlBtn} 
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  className={styles.controlBtn} 
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button 
                  className={styles.controlBtn} 
                  onClick={handleFullscreen}
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={20} />
                </button>
              </motion.div>
            )}
          </div>

          {/* Corner decorations */}
          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerTR}`} />
          <div className={`${styles.corner} ${styles.cornerBL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
        </motion.div>

        {/* Side images */}
        <motion.div
          className={styles.sideImages}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.sideImage}>
            <img 
              src="/other_images/Map Shirt 1 (Black shirt).png" 
              alt="AmaraTech Global Presence" 
            />
            <span className={styles.sideImageLabel}>GLOBAL_REACH</span>
          </div>
          <div className={styles.sideImage}>
            <img 
              src="/other_images/Application Logo (175x30pixels) (1).png" 
              alt="AmaraTech Application" 
            />
            <span className={styles.sideImageLabel}>BRANDING</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
