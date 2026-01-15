'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './TechShowcase.module.css';

export default function TechShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle through steps
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 6);
    }, 2500);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={sectionRef} className={styles.showcase}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div className={styles.titleRow}>
            <span className={styles.bullet}>•</span>
            <h2 className={styles.title}>Hacking Humans with AI as a Service</h2>
          </div>
          <span className={styles.bullet}>•</span>
        </motion.div>

        {/* Attack Flow Diagram */}
        <div className={styles.diagram}>
          
          {/* Row 1: Attacker with callout */}
          <motion.div 
            className={styles.row1}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.attackerGroup}>
              <motion.div 
                className={`${styles.iconBox} ${activeStep === 0 ? styles.active : ''}`}
                animate={activeStep === 0 ? { scale: [1, 1.05, 1] } : {}}
              >
                <svg viewBox="0 0 50 50" className={styles.hackerIcon}>
                  <path d="M25 5 Q38 5 40 20 Q40 28 38 32 L12 32 Q10 28 10 20 Q12 5 25 5" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                  <circle cx="19" cy="20" r="2" fill="#C81E1E" className={styles.eye}/>
                  <circle cx="31" cy="20" r="2" fill="#C81E1E" className={styles.eye}/>
                  <path d="M12 32 L12 45 L38 45 L38 32" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                </svg>
              </motion.div>
              <motion.div 
                className={styles.downArrow}
                animate={activeStep === 0 ? { y: [0, 5, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <svg viewBox="0 0 20 30"><path d="M10 0 V25 M3 18 L10 27 L17 18" stroke="#C81E1E" strokeWidth="2" fill="none"/></svg>
              </motion.div>
              <motion.div 
                className={`${styles.iconBox} ${styles.emailBox} ${activeStep === 1 ? styles.active : ''}`}
                animate={activeStep === 1 ? { scale: [1, 1.1, 1] } : {}}
              >
                <svg viewBox="0 0 40 30" className={styles.emailIcon}>
                  <rect x="2" y="2" width="36" height="26" rx="2" fill="#1a1a1a" stroke="#666" strokeWidth="1"/>
                  <path d="M2 5 L20 18 L38 5" stroke="#666" strokeWidth="1" fill="none"/>
                </svg>
              </motion.div>
            </div>
            
            <motion.div 
              className={styles.callout}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p>Attacker Sends a well-crafted spear phishing email harvesting 2FA login credentials</p>
            </motion.div>
          </motion.div>

          {/* Row 2: Main Flow - Victim -> Email -> Page -> Server */}
          <motion.div 
            className={styles.row2}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            {/* Victim callout above */}
            <div className={styles.victimCallout}>
              <p>Victim opens the email and clicks on the phishing URL which is similar to AmaraTech SSO Page and provides login</p>
            </div>
            
            <div className={styles.flowRow}>
              {/* Victim at computer */}
              <motion.div 
                className={`${styles.iconBox} ${styles.victimBox} ${activeStep === 2 ? styles.active : ''}`}
                animate={activeStep === 2 ? { scale: [1, 1.05, 1] } : {}}
              >
                <svg viewBox="0 0 60 50" className={styles.victimIcon}>
                  {/* Person */}
                  <circle cx="15" cy="15" r="8" fill="#E8B08D"/>
                  <rect x="8" y="23" width="14" height="20" rx="3" fill="#2563EB"/>
                  {/* Desk/Computer */}
                  <rect x="28" y="25" width="28" height="18" rx="2" fill="#333" stroke="#444" strokeWidth="1"/>
                  <rect x="30" y="27" width="24" height="13" fill="#1a1a1a"/>
                  <rect x="35" y="43" width="14" height="4" fill="#444"/>
                  {/* Arm reaching to keyboard */}
                  <path d="M22 32 L30 35" stroke="#E8B08D" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </motion.div>

              {/* Arrow */}
              <motion.div 
                className={styles.flowArrow}
                animate={activeStep === 2 ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <svg viewBox="0 0 60 20">
                  <path d="M0 10 H50 M45 5 L55 10 L45 15" stroke="#C81E1E" strokeWidth="2" fill="none"/>
                </svg>
              </motion.div>

              {/* Email with @ */}
              <motion.div 
                className={`${styles.iconBox} ${activeStep === 2 ? styles.active : ''}`}
                animate={activeStep === 2 ? { rotate: [0, -5, 5, 0] } : {}}
              >
                <svg viewBox="0 0 40 35" className={styles.atEmail}>
                  <rect x="2" y="5" width="36" height="25" rx="2" fill="#fff" stroke="#666"/>
                  <circle cx="20" cy="17" r="8" fill="none" stroke="#333" strokeWidth="2"/>
                  <path d="M20 12 Q28 17 20 22" stroke="#333" strokeWidth="2" fill="none"/>
                </svg>
              </motion.div>

              {/* Arrow */}
              <div className={styles.flowArrow}>
                <svg viewBox="0 0 40 20">
                  <path d="M0 10 H30 M25 5 L35 10 L25 15" stroke="#888" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Phishing Page */}
              <motion.div 
                className={`${styles.iconBox} ${styles.pageBox} ${activeStep === 2 ? styles.active : ''}`}
                animate={activeStep === 2 ? { boxShadow: ['0 0 0 rgba(200,30,30,0)', '0 0 15px rgba(200,30,30,0.5)', '0 0 0 rgba(200,30,30,0)'] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg viewBox="0 0 45 35" className={styles.pageIcon}>
                  <rect x="2" y="2" width="41" height="31" rx="2" fill="#fff" stroke="#C81E1E" strokeWidth="2"/>
                  <rect x="5" y="5" width="35" height="4" fill="#eee"/>
                  <rect x="5" y="12" width="20" height="3" fill="#ddd"/>
                  <rect x="5" y="18" width="25" height="3" fill="#ddd"/>
                  <rect x="5" y="24" width="15" height="5" rx="1" fill="#C81E1E"/>
                </svg>
              </motion.div>

              {/* Arrow */}
              <div className={styles.flowArrow}>
                <svg viewBox="0 0 40 20">
                  <path d="M0 10 H30 M25 5 L35 10 L25 15" stroke="#888" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Server/Database */}
              <motion.div 
                className={`${styles.iconBox} ${styles.serverBox} ${activeStep === 3 ? styles.active : ''}`}
                animate={activeStep === 3 ? { scale: [1, 1.08, 1] } : {}}
              >
                <svg viewBox="0 0 40 50" className={styles.serverIcon}>
                  <ellipse cx="20" cy="10" rx="16" ry="6" fill="#00A4EF" stroke="#0078D4"/>
                  <rect x="4" y="10" width="32" height="30" fill="#00A4EF" stroke="#0078D4"/>
                  <ellipse cx="20" cy="40" rx="16" ry="6" fill="#0078D4"/>
                  <ellipse cx="20" cy="20" rx="16" ry="4" fill="none" stroke="#0078D4" strokeWidth="1"/>
                  <ellipse cx="20" cy="30" rx="16" ry="4" fill="none" stroke="#0078D4" strokeWidth="1"/>
                </svg>
              </motion.div>
            </div>

            {/* Server callout to the right */}
            <motion.div 
              className={styles.serverCallout}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p>Attacker Server Captures the credentials and login into the Victims mail server</p>
            </motion.div>
          </motion.div>

          {/* Row 3: Bidirectional arrows */}
          <motion.div 
            className={styles.row3}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className={styles.biArrows}
              animate={activeStep === 3 ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <svg viewBox="0 0 200 30">
                <path d="M20 15 H180" stroke="#D4AF37" strokeWidth="2"/>
                <path d="M20 15 L30 8 M20 15 L30 22" stroke="#D4AF37" strokeWidth="2"/>
                <path d="M180 15 L170 8 M180 15 L170 22" stroke="#D4AF37" strokeWidth="2"/>
              </svg>
            </motion.div>
            <div className={styles.redirectCallout}>
              <p>After successful login, the attacker server sends a redirection to the original SSO webpage of the Victim</p>
            </div>
          </motion.div>

          {/* Row 4: Cookie capture flow */}
          <motion.div 
            className={styles.row4}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.flowRow}>
              {/* Website/WWW */}
              <motion.div 
                className={`${styles.iconBox} ${activeStep === 4 ? styles.active : ''}`}
                animate={activeStep === 4 ? { scale: [1, 1.05, 1] } : {}}
              >
                <svg viewBox="0 0 50 40" className={styles.wwwIcon}>
                  <rect x="2" y="2" width="46" height="36" rx="3" fill="#1a1a1a" stroke="#444"/>
                  <text x="25" y="25" textAnchor="middle" fill="#888" fontSize="10" fontFamily="monospace">WWW</text>
                </svg>
              </motion.div>

              {/* Arrow */}
              <div className={styles.flowArrow}>
                <svg viewBox="0 0 40 20">
                  <path d="M0 10 H30 M25 5 L35 10 L25 15" stroke="#888" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Cookie icon */}
              <motion.div 
                className={styles.cookieEmoji}
                animate={activeStep === 4 ? { y: [0, -5, 0], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.6 }}
              >
                🍪
              </motion.div>

              {/* Arrow */}
              <div className={styles.flowArrow}>
                <svg viewBox="0 0 40 20">
                  <path d="M0 10 H30 M25 5 L35 10 L25 15" stroke="#888" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Attacker small */}
              <motion.div 
                className={`${styles.iconBox} ${activeStep === 4 ? styles.active : ''}`}
                animate={activeStep === 4 ? { scale: [1, 1.05, 1] } : {}}
              >
                <svg viewBox="0 0 40 40" className={styles.hackerSmall}>
                  <path d="M20 4 Q30 4 32 14 Q32 20 30 24 L10 24 Q8 20 8 14 Q10 4 20 4" fill="#1a1a1a" stroke="#333"/>
                  <circle cx="15" cy="14" r="1.5" fill="#C81E1E" className={styles.eye}/>
                  <circle cx="25" cy="14" r="1.5" fill="#C81E1E" className={styles.eye}/>
                  <path d="M10 24 L10 36 L30 36 L30 24" fill="#1a1a1a" stroke="#333"/>
                </svg>
              </motion.div>

              {/* Arrow */}
              <div className={styles.flowArrow}>
                <svg viewBox="0 0 40 20">
                  <path d="M0 10 H30 M25 5 L35 10 L25 15" stroke="#888" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Laptop/Globe */}
              <motion.div 
                className={`${styles.iconBox} ${activeStep === 5 ? styles.active : ''}`}
                animate={activeStep === 5 ? { scale: [1, 1.05, 1] } : {}}
              >
                <svg viewBox="0 0 45 35" className={styles.laptopIcon}>
                  <rect x="5" y="2" width="35" height="24" rx="2" fill="#1a1a1a" stroke="#444"/>
                  <circle cx="22" cy="14" r="8" fill="none" stroke="#22C55E" strokeWidth="1.5"/>
                  <path d="M22 6 V22 M14 14 H30" stroke="#22C55E" strokeWidth="1"/>
                  <path d="M16 10 Q22 14 28 10 M16 18 Q22 14 28 18" stroke="#22C55E" strokeWidth="0.8" fill="none"/>
                  <path d="M2 28 L5 26 H40 L43 28 H2" fill="#333"/>
                </svg>
              </motion.div>
            </div>

            {/* Callouts for row 4 */}
            <div className={styles.row4Callouts}>
              <div className={styles.cookieCallout}>
                <p>Attacker Server also capture post login cookie</p>
              </div>
              <div className={styles.reuseCallout}>
                <p>Attacker reuses the saved cookie to login to the users account from a different location</p>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div 
            className={styles.hackedMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1, type: 'spring' }}
          >
            <span>Boom You are hacked!!</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
