'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, ArrowRight, Shield, CheckCircle2, Clock, Activity, Award } from 'lucide-react';
import Link from 'next/link';
import styles from './CTA.module.css';

const benefits = [
  'Free security assessment',
  '24/7 expert support',
  'No long-term contracts',
  'Money-back guarantee',
];

const stats = [
  { value: '15min', label: 'Response Time', icon: Clock },
  { value: '99.9%', label: 'Uptime SLA', icon: Activity },
  { value: 'SOC 2', label: 'Certified', icon: Award },
  { value: '24/7', label: 'Support', icon: Shield },
];

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.cta}>
      {/* Grid Background */}
      <div className={styles.gridOverlay} />
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        {/* Left Panel - Content */}
        <motion.div
          className={styles.leftPanel}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.sectionLabel}>[06] GET_STARTED</span>
            <div className={styles.badge}>
              <Shield size={14} />
              <span>SECURITY FIRST</span>
            </div>
          </div>

          {/* Content */}
          <div className={styles.content}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Ready to secure your<br />
              <span className={styles.accent}>digital infrastructure?</span>
            </motion.h2>

            <motion.p
              className={styles.description}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Partner with AmaraTech for innovative IT solutions, 
              cloud infrastructure, and digital transformation.
            </motion.p>

            {/* Benefits */}
            <motion.div
              className={styles.benefits}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <CheckCircle2 size={16} />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Link href="/contact" className={styles.primaryButton}>
                <Zap size={18} />
                Start Free Assessment
              </Link>
              <Link href="/services" className={styles.secondaryButton}>
                View Services
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Stats Grid */}
        <motion.div
          className={styles.rightPanel}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.statCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <StatIcon size={20} className={styles.statIcon} />
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Floating AI Button */}
      <motion.button
        className={styles.aiButton}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.aiIcon}>✦</span>
        Ask Amara
      </motion.button>
    </section>
  );
}
