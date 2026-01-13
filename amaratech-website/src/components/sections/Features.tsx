'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Lock, 
  Eye, 
  Server, 
  Cloud,
  TrendingUp,
  Users,
  Globe,
  CheckCircle2,
  Activity,
  Database,
  Brain
} from 'lucide-react';
import { useRef } from 'react';
import styles from './Features.module.css';

const securityModules = [
  {
    id: 'MOD_00',
    icon: Brain,
    title: 'AI Analytics',
    metric: '50+',
    metricLabel: 'AI MODELS',
    status: 'LEARNING',
    color: '#A855F7',
  },
  {
    id: 'MOD_01',
    icon: Shield,
    title: 'Zero Trust',
    metric: '99.9%',
    metricLabel: 'ACCURACY',
    status: 'ACTIVE',
    color: '#C81E1E',
  },
  {
    id: 'MOD_02',
    icon: Eye,
    title: 'Threat Detection',
    metric: '24/7',
    metricLabel: 'MONITORING',
    status: 'ONLINE',
    color: '#22C55E',
  },
  {
    id: 'MOD_03',
    icon: Lock,
    title: 'Encryption',
    metric: 'AES-256',
    metricLabel: 'STANDARD',
    status: 'SECURED',
    color: '#00D1FF',
  },
  {
    id: 'MOD_04',
    icon: Zap,
    title: 'Response Time',
    metric: '<15',
    metricLabel: 'MINUTES',
    status: 'READY',
    color: '#F59E0B',
  },
  {
    id: 'MOD_05',
    icon: Cloud,
    title: 'Cloud Security',
    metric: '3',
    metricLabel: 'PLATFORMS',
    status: 'SYNCED',
    color: '#8B5CF6',
  },
];

const liveStats = [
  { label: 'Endpoints Protected', value: '12,847', icon: Database },
  { label: 'Threats Blocked Today', value: '2,341', icon: Shield },
  { label: 'Active Clients', value: '156', icon: Users },
  { label: 'Global Regions', value: '15', icon: Globe },
];

const features = [
  {
    id: 'FEAT_01',
    icon: Shield,
    title: 'Zero Trust Architecture',
    desc: 'Never trust, always verify. Complete identity verification for every access request.',
  },
  {
    id: 'FEAT_02',
    icon: Eye,
    title: '24/7 Threat Monitoring',
    desc: 'AI-powered surveillance detecting anomalies in real-time.',
  },
  {
    id: 'FEAT_03',
    icon: Lock,
    title: 'Data Encryption',
    desc: 'Military-grade AES-256 encryption for data at rest and in transit.',
  },
  {
    id: 'FEAT_04',
    icon: Zap,
    title: 'Rapid Response',
    desc: 'Sub-minute incident response with automated containment.',
  },
  {
    id: 'FEAT_05',
    icon: Server,
    title: 'Infrastructure Security',
    desc: 'Hardened servers and continuous compliance monitoring.',
  },
  {
    id: 'FEAT_06',
    icon: Cloud,
    title: 'Cloud Protection',
    desc: 'Comprehensive security for AWS, Azure, and hybrid clouds.',
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <section ref={containerRef} className={styles.features}>
      {/* Background Effects */}
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerLabel}>SECURITY OPERATIONS CENTER</span>
            <div className={styles.headerMeta}>
              <span className={styles.metaItem}>STATUS: OPERATIONAL</span>
              <span className={styles.metaDivider}>|</span>
              <span className={styles.metaItem}>THREAT LEVEL: LOW</span>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.statusDots}>
              <span className={styles.dotActive} />
              <span className={styles.dotActive} />
              <span className={styles.dotActive} />
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className={styles.mainGrid}>
          {/* Left - Security Modules Dashboard */}
          <div className={styles.networkPanel}>
            <div className={styles.networkViz}>
              {/* Security Modules Grid */}
              <div className={styles.modulesGrid}>
                {securityModules.map((module, index) => {
                  const Icon = module.icon;
                  const isActive = activeModule === module.id;
                  return (
                    <motion.div
                      key={module.id}
                      className={`${styles.moduleCard} ${isActive ? styles.moduleActive : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setActiveModule(module.id)}
                      onMouseLeave={() => setActiveModule(null)}
                    >
                      <div className={styles.moduleHeader}>
                        <div className={styles.moduleIcon} style={{ color: module.color }}>
                          <Icon size={18} />
                        </div>
                        <span className={styles.moduleStatus} style={{ color: module.color }}>
                          {module.status}
                        </span>
                      </div>
                      <div className={styles.moduleTitle}>{module.title}</div>
                      <div className={styles.moduleMetric}>
                        <span className={styles.metricValue} style={{ color: module.color }}>
                          {module.metric}
                        </span>
                        <span className={styles.metricLabel}>{module.metricLabel}</span>
                      </div>
                      <div className={styles.moduleProgress}>
                        <motion.div 
                          className={styles.progressBar}
                          style={{ backgroundColor: module.color }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: '100%' } : {}}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Live Stats Bar */}
              <div className={styles.liveStatsBar}>
                {liveStats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className={styles.liveStat}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <StatIcon size={14} className={styles.liveStatIcon} />
                      <span className={styles.liveStatValue}>{stat.value}</span>
                      <span className={styles.liveStatLabel}>{stat.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right - Features List */}
          <div className={styles.tracksPanel}>
            <div className={styles.trackHeader}>
              <span className={styles.trackCode}>// SECURITY_FEATURES</span>
              <Activity size={16} className={styles.trackActivity} />
            </div>

            <div className={styles.tracksSection}>
              <div className={styles.tracksList}>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = activeModule === `MOD_0${index + 1}`;
                  return (
                    <motion.div
                      key={feature.id}
                      className={`${styles.trackItem} ${isActive ? styles.trackActive : ''}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onMouseEnter={() => setActiveModule(`MOD_0${index + 1}`)}
                      onMouseLeave={() => setActiveModule(null)}
                    >
                      <span className={styles.trackNum}>{String(index + 1).padStart(2, '0')}.</span>
                      <div className={styles.trackIconWrap}>
                        <Icon size={16} className={styles.trackIcon} />
                      </div>
                      <div className={styles.trackContent}>
                        <span className={styles.trackName}>{feature.title}</span>
                        <span className={styles.trackDesc}>{feature.desc}</span>
                      </div>
                      <CheckCircle2 size={14} className={styles.trackCheck} />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className={styles.systemStatus}>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>System Health</span>
                <span className={styles.statusValue}>OPTIMAL</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Last Scan</span>
                <span className={styles.statusValue}>2 MIN AGO</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Active Rules</span>
                <span className={styles.statusValue}>1,247</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerLogo}>◊</span>
            <span className={styles.footerCopy}>© {new Date().getFullYear()} AMARATECH™</span>
          </div>
          <div className={styles.footerCenter}>
            <span>■</span>
            <span>8865 STANFORD BLVD, SUITE 202</span>
          </div>
          <div className={styles.footerRight}>
            <span>COLUMBIA, MD 21045</span>
          </div>
        </div>
      </div>
    </section>
  );
}
