'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Rocket, 
  Bell,
  ArrowRight,
  Shield,
  Activity,
  Lock,
  Cloud,
  Sparkles,
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
  },
  {
    id: '02',
    icon: Sparkles,
    title: 'AI-Powered Analytics',
    desc: 'Machine learning algorithms analyze threats in real-time',
  },
  {
    id: '03',
    icon: Activity,
    title: 'Real-time Monitoring',
    desc: '24/7 system health and security event tracking',
  },
  {
    id: '04',
    icon: Shield,
    title: 'Zero-Trust Security',
    desc: 'Every access request verified and authenticated',
  },
  {
    id: '05',
    icon: Cloud,
    title: 'Cloud Integration',
    desc: 'Seamless Azure, AWS, and hybrid cloud support',
  },
  {
    id: '06',
    icon: Lock,
    title: 'Compliance Ready',
    desc: 'CMMC, HIPAA, SOC 2 built into the workflow',
  },
];

export default function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.products}>
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerLabel}>[04] PLATFORM</span>
          <h2 className={styles.title}>Our Platform</h2>
          <p className={styles.subtitle}>
            Building the next generation of enterprise security and IT management
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Left - Coming Soon Card */}
          <motion.div
            className={styles.comingSoonCard}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>[COMING SOON]</span>
              <span className={styles.cardYear}>2026</span>
            </div>

            <div className={styles.comingSoonContent}>
              <div className={styles.comingSoonIcon}>
                <Rocket size={40} />
              </div>

              <h3 className={styles.comingSoonTitle}>Something Amazing is Coming</h3>
              <p className={styles.comingSoonDesc}>
                We&apos;re building a powerful platform to revolutionize how you manage 
                security, cloud infrastructure, and IT operations.
              </p>

              <Link href="/contact" className={styles.notifyButton}>
                <Bell size={16} />
                <span>Notify Me When Ready</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.featureHeader}>
                    <span className={styles.featureNumber}>{feature.id}</span>
                    <div className={styles.featureIcon}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
