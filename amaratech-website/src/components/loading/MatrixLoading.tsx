'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MatrixLoading.module.css';

export default function MatrixLoading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete'>('loading');

  useEffect(() => {
    // Simple progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('complete');
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.loadingContainer}
        >
          {/* Grid background */}
          <div className={styles.gridBg} />
          
          {/* Corner decorations */}
          <div className={`${styles.corner} ${styles.topLeft}`}>+</div>
          <div className={`${styles.corner} ${styles.topRight}`}>+</div>
          <div className={`${styles.corner} ${styles.bottomLeft}`}>+</div>
          <div className={`${styles.corner} ${styles.bottomRight}`}>+</div>

          {/* Main content */}
          <div className={styles.content}>
            {/* Left side - Pixelated Eye Icon */}
            <motion.div 
              className={styles.iconPanel}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Pixelated Security Eye SVG */}
              <svg className={styles.pixelEye} viewBox="0 0 64 64" fill="none">
                {/* Outer frame squares */}
                <rect x="8" y="24" width="4" height="4" fill="#C81E1E" />
                <rect x="12" y="20" width="4" height="4" fill="#C81E1E" />
                <rect x="16" y="16" width="4" height="4" fill="#C81E1E" />
                <rect x="20" y="12" width="4" height="4" fill="#C81E1E" />
                <rect x="24" y="8" width="4" height="4" fill="#C81E1E" />
                <rect x="28" y="8" width="8" height="4" fill="#C81E1E" />
                <rect x="36" y="8" width="4" height="4" fill="#C81E1E" />
                <rect x="40" y="12" width="4" height="4" fill="#C81E1E" />
                <rect x="44" y="16" width="4" height="4" fill="#C81E1E" />
                <rect x="48" y="20" width="4" height="4" fill="#C81E1E" />
                <rect x="52" y="24" width="4" height="4" fill="#C81E1E" />
                
                {/* Bottom frame */}
                <rect x="8" y="36" width="4" height="4" fill="#C81E1E" />
                <rect x="12" y="40" width="4" height="4" fill="#C81E1E" />
                <rect x="16" y="44" width="4" height="4" fill="#C81E1E" />
                <rect x="20" y="48" width="4" height="4" fill="#C81E1E" />
                <rect x="24" y="52" width="4" height="4" fill="#C81E1E" />
                <rect x="28" y="52" width="8" height="4" fill="#C81E1E" />
                <rect x="36" y="52" width="4" height="4" fill="#C81E1E" />
                <rect x="40" y="48" width="4" height="4" fill="#C81E1E" />
                <rect x="44" y="44" width="4" height="4" fill="#C81E1E" />
                <rect x="48" y="40" width="4" height="4" fill="#C81E1E" />
                <rect x="52" y="36" width="4" height="4" fill="#C81E1E" />
                
                {/* Inner eye circle */}
                <motion.rect 
                  x="24" y="24" width="4" height="4" fill="#C81E1E"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.rect 
                  x="28" y="20" width="8" height="4" fill="#C81E1E"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                />
                <motion.rect 
                  x="36" y="24" width="4" height="4" fill="#C81E1E"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.rect 
                  x="24" y="36" width="4" height="4" fill="#C81E1E"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.rect 
                  x="28" y="40" width="8" height="4" fill="#C81E1E"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
                <motion.rect 
                  x="36" y="36" width="4" height="4" fill="#C81E1E"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                
                {/* Center pupil */}
                <motion.rect 
                  x="28" y="28" width="8" height="8" 
                  fill="#C81E1E"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: '32px 32px' }}
                />
              </svg>

              {/* Status indicator */}
              <div className={styles.statusRow}>
                <span className={styles.statusDot} />
                <span className={styles.statusCode}>■ SYS_ACTIVE</span>
              </div>
            </motion.div>

            {/* Right side - Text content */}
            <motion.div 
              className={styles.textPanel}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className={styles.title}>
                AI-POWERED<br />
                <span className={styles.titleAccent}>SECURITY</span>
              </h1>
              
              <p className={styles.description}>
                Automatically monitors infrastructure,<br />
                identifies threats, and highlights critical<br />
                security risks.
              </p>

              <div className={styles.features}>
                <div className={styles.featureItem}>
                  <span className={styles.featureNum}>[1]</span>
                  <span>DETECTS NETWORK ANOMALIES</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureNum}>[2]</span>
                  <span>PROTECTS CLOUD INFRASTRUCTURE</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureNum}>[3]</span>
                  <span>ENSURES COMPLIANCE & SECURITY</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                  <motion.div 
                    className={styles.progressFill}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className={styles.progressInfo}>
                  <span className={styles.progressNum}>{Math.min(Math.round(progress), 100)}</span>
                  <span className={styles.progressTotal}>/100</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom status */}
          <div className={styles.bottomBar}>
            <span>AMARATECH.SYS</span>
            <span className={styles.version}>v2.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
