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
    title: 'AI-Powered Detection',
    metric: '99.9%',
    metricLabel: 'ACCURACY',
    status: 'LEARNING',
    color: '#A855F7',
  },
  {
    id: 'MOD_01',
    icon: Shield,
    title: 'Zero Trust Security',
    metric: '24/7',
    metricLabel: 'PROTECTION',
    status: 'ACTIVE',
    color: '#C81E1E',
  },
  {
    id: 'MOD_02',
    icon: Eye,
    title: 'SOC Monitoring',
    metric: '365',
    metricLabel: 'DAYS/YEAR',
    status: 'ONLINE',
    color: '#22C55E',
  },
  {
    id: 'MOD_03',
    icon: Lock,
    title: 'Data Encryption',
    metric: 'AES-256',
    metricLabel: 'MILITARY GRADE',
    status: 'SECURED',
    color: '#00D1FF',
  },
  {
    id: 'MOD_04',
    icon: Zap,
    title: 'Incident Response',
    metric: '<15',
    metricLabel: 'MIN RESPONSE',
    status: 'READY',
    color: '#F59E0B',
  },
  {
    id: 'MOD_05',
    icon: Cloud,
    title: 'Multi-Cloud Security',
    metric: 'AWS',
    metricLabel: 'AZURE & GCP',
    status: 'SYNCED',
    color: '#8B5CF6',
  },
];

const liveStats = [
  { label: 'Endpoints Protected', value: '15,000+', icon: Database },
  { label: 'Threats Blocked Monthly', value: '50,000+', icon: Shield },
  { label: 'Enterprise Clients', value: '100+', icon: Users },
  { label: 'Countries Served', value: '15+', icon: Globe },
];

const features = [
  {
    id: 'FEAT_01',
    icon: Shield,
    title: 'Threat Detection & Response',
    desc: '24/7 AI-powered threat monitoring with sub-15-minute incident response times.',
  },
  {
    id: 'FEAT_02',
    icon: Lock,
    title: 'Penetration Testing',
    desc: 'Comprehensive vulnerability assessments to identify and fix security gaps.',
  },
  {
    id: 'FEAT_03',
    icon: Eye,
    title: 'Security Operations Center',
    desc: 'Dedicated SOC team monitoring your infrastructure around the clock.',
  },
  {
    id: 'FEAT_04',
    icon: Database,
    title: 'Compliance Management',
    desc: 'CMMC, HIPAA, SOC 2, and GDPR compliance consulting and implementation.',
  },
  {
    id: 'FEAT_05',
    icon: Cloud,
    title: 'Cloud Security Posture',
    desc: 'Secure your AWS, Azure, and GCP environments with zero-trust architecture.',
  },
  {
    id: 'FEAT_06',
    icon: Users,
    title: 'Security Awareness Training',
    desc: 'Employee training programs to build a security-first culture.',
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
            <span className={styles.headerLabel}>SECURITY OPERATIONS DASHBOARD</span>
            <div className={styles.headerMeta}>
              <span className={styles.metaItem}>Real-time threat intelligence</span>
              <span className={styles.metaDivider}>|</span>
              <span className={styles.metaItem}>Enterprise protection</span>
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
              <span className={styles.trackCode}>// SECURITY_CAPABILITIES</span>
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
                <span className={styles.statusLabel}>Threat Level</span>
                <span className={styles.statusValue}>LOW</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Last Security Scan</span>
                <span className={styles.statusValue}>JUST NOW</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Active Security Rules</span>
                <span className={styles.statusValue}>2,500+</span>
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
