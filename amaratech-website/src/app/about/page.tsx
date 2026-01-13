'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, Users, Globe, Award, Target, Briefcase,
  CheckCircle, ArrowRight, Zap, MapPin, Calendar,
  Building2, TrendingUp, Heart
} from 'lucide-react';
import styles from './about.module.css';
import wireflow from '../wireflow.module.css';
import ParallaxSection from '../../components/sections/ParallaxSection';

const timeline = [
  { year: '2009', title: 'Foundation', desc: 'AmaraTech IT Solutions established in Maryland, USA', stage: 1 },
  { year: '2012', title: 'Expansion', desc: 'Opened operations in West Africa, serving government clients', stage: 2 },
  { year: '2016', title: 'Microsoft Partnership', desc: 'Achieved Microsoft Gold Partner status', stage: 3 },
  { year: '2020', title: 'SOC Operations', desc: 'Launched 24/7 Security Operations Center', stage: 4 },
  { year: '2024', title: 'ImpactIQ Launch', desc: 'Released AI-powered vulnerability management platform', stage: 5 },
];

const values = [
  { icon: Shield, title: 'Security First', desc: 'We prioritize the protection of our clients\' assets above all else.' },
  { icon: Target, title: 'Excellence', desc: 'We strive for excellence in every solution we deliver.' },
  { icon: Users, title: 'Partnership', desc: 'We build lasting relationships based on trust and mutual success.' },
  { icon: Heart, title: 'Integrity', desc: 'We operate with transparency and ethical standards.' },
];

const certifications = [
  'CISSP', 'CISM', 'CEH', 'Azure Solutions Architect', 
  'AWS Certified', 'ISO 27001 Lead Auditor', 'CMMC Assessor'
];

const locations = [
  { city: 'Columbia, MD', country: 'USA', type: 'Headquarters' },
  { city: 'Monrovia', country: 'Liberia', type: 'Regional Office' },
];

export default function About() {
  return (
    <div className={wireflow.page}>
      <div className={wireflow.gridBg} />
      
      {/* Wire Background */}
      <svg className={styles.wireBg} viewBox="0 0 1400 2000" preserveAspectRatio="none">
        {/* Vertical timeline wire */}
        <motion.line
          x1="700" y1="0" x2="700" y2="2000"
          stroke="#C81E1E"
          strokeWidth="2"
          opacity="0.15"
        />
        {/* Stage connection points */}
        {[300, 500, 700, 900, 1100].map((y, i) => (
          <motion.circle
            key={i}
            cx="700"
            cy={y}
            r="8"
            fill="#0a0a0f"
            stroke="#C81E1E"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 * i }}
          />
        ))}
      </svg>

      <div className={wireflow.container}>
        {/* Header */}
        <header className={wireflow.pageHeader}>
          <div className={wireflow.breadcrumb}>
            <Link href="/">HOME</Link>
            <span className={wireflow.breadcrumbSep}>/</span>
            <span>ABOUT</span>
          </div>
          
          <div className={wireflow.pageHeaderInner}>
            <div className={wireflow.pageTitle}>
              <span className={wireflow.pageTitleCode}>// COMPANY.INFO</span>
              <h1 className={wireflow.pageTitleMain}>
                About <span className={wireflow.pageTitleAccent}>AmaraTech</span>
              </h1>
              <p className={wireflow.pageDescription}>
                Your trusted partner for enterprise-grade IT solutions since 2009. 
                We specialize in cybersecurity, cloud services, and IT consulting, 
                helping organizations navigate the complex landscape of modern technology.
              </p>
            </div>
            <div className={wireflow.pageNumber}>02</div>
          </div>
        </header>

        {/* Mission Section */}
        <motion.div 
          className={styles.missionSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.missionCard}>
            <div className={`${wireflow.connectionPoint} ${wireflow.left}`} />
            <div className={styles.missionHeader}>
              <div className={wireflow.nodeIcon}><Target size={20} /></div>
              <span className={wireflow.nodeTitle}>OUR MISSION</span>
            </div>
            <p className={styles.missionText}>
              To deliver innovative IT solutions that safeguard our clients&apos; systems, 
              ensure compliance, and provide the confidence needed to grow in today&apos;s digital world.
            </p>
            <div className={styles.missionWires}>
              <div className={styles.wireRed} />
              <div className={styles.wireBlue} />
            </div>
          </div>
        </motion.div>

        <ParallaxSection
          kicker="VISION_LAYER"
          title="Engineering clarity behind every decision."
          description="This is the same blueprint image running as a parallax layer behind content — it helps break up long pages and adds depth."
        />

        {/* Timeline Section */}
        <section className={styles.timelineSection}>
          <div className={wireflow.flowLabel}>
            <Calendar size={14} />
            COMPANY_TIMELINE
          </div>

          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * i }}
              >
                {/* Large Stage Number (Industrial Style) */}
                <div className={styles.stageLarge}>
                  <span className={styles.stageBigNum}>{item.stage}</span>
                  <div className={styles.stageLabel}>
                    <span>STAGE</span>
                    <span className={styles.stageTitle}>{item.title.toUpperCase()}</span>
                  </div>
                </div>

                {/* Dashed Connection Line */}
                <div className={styles.timelineConnector}>
                  <svg viewBox="0 0 80 40" preserveAspectRatio="none">
                    <motion.path
                      d="M0 20 L60 20"
                      stroke="#C81E1E"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.15 * i + 0.2, duration: 0.5 }}
                    />
                    <motion.circle 
                      cx="70" cy="20" r="8" 
                      fill="none" 
                      stroke="#C81E1E" 
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 * i + 0.4 }}
                    />
                    <motion.circle 
                      cx="70" cy="20" r="4" 
                      fill="#C81E1E"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 * i + 0.5 }}
                    />
                  </svg>
                </div>

                {/* Content Card (Industrial Panel) */}
                <div className={styles.timelineCard}>
                  <div className={styles.timelineCardInner}>
                    <div className={styles.timelineYear}>{item.year}</div>
                    <p className={styles.timelineDesc}>{item.desc}</p>
                  </div>
                  {/* Corner brackets */}
                  <div className={`${wireflow.cornerDecor} ${wireflow.topLeft}`} />
                  <div className={`${wireflow.cornerDecor} ${wireflow.bottomRight}`} />
                </div>

                {/* TAP Indicator */}
                <motion.div 
                  className={styles.timelineTap}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 * i + 0.3 }}
                >
                  <div className={wireflow.tapIndicatorOutline}>TAP</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className={wireflow.flowLabel}>
            <Heart size={14} />
            CORE_VALUES
          </div>

          <div className={styles.valuesGrid}>
            {values.map((value, i) => {
              const ValueIcon = value.icon;
              return (
                <motion.div
                  key={i}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className={styles.valueIcon}>
                    <ValueIcon size={24} />
                  </div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDesc}>{value.desc}</p>
                  <div className={`${wireflow.cornerDecor} ${wireflow.topRight}`} />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Expertise Section */}
        <section className={styles.expertiseSection}>
          <div className={wireflow.nodeCard}>
            <div className={wireflow.nodeHeader}>
              <div className={wireflow.nodeIcon}><Award size={18} /></div>
              <span className={wireflow.nodeTitle}>CERTIFICATIONS & EXPERTISE</span>
              <div className={wireflow.nodeStatus}>
                <span className={wireflow.nodeStatusDot} />
                VERIFIED
              </div>
            </div>
            <div className={wireflow.nodeBody}>
              <div className={styles.certGrid}>
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    className={styles.certBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <CheckCircle size={14} />
                    {cert}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className={wireflow.nodeFooter}>
              <span className={styles.footerNote}>
                Our team consists of certified professionals with expertise across major cloud platforms and security frameworks.
              </span>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className={styles.locationsSection}>
          <div className={wireflow.flowLabel}>
            <Globe size={14} />
            GLOBAL_PRESENCE
          </div>

          <div className={styles.locationsGrid}>
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                className={styles.locationCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i }}
              >
                <div className={`${wireflow.connectionPoint} ${wireflow.top}`} />
                <div className={styles.locationHeader}>
                  <MapPin size={20} className={styles.locationPin} />
                  <span className={styles.locationType}>{loc.type}</span>
                </div>
                <h3 className={styles.locationCity}>{loc.city}</h3>
                <span className={styles.locationCountry}>{loc.country}</span>
                
                <div className={styles.locationWire}>
                  <motion.div
                    className={styles.locationPulse}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.ctaContent}>
            <Building2 size={32} className={styles.ctaIcon} />
            <h2 className={styles.ctaTitle}>Ready to Partner with Us?</h2>
            <p className={styles.ctaDesc}>
              Let&apos;s discuss how AmaraTech can help secure and transform your IT infrastructure.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={wireflow.btnPrimary}>
                <Zap size={16} />
                Contact Us
              </Link>
              <Link href="/services" className={wireflow.btnSecondary}>
                View Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className={`${wireflow.cornerDecor} ${wireflow.topLeft}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.topRight}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.bottomLeft}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.bottomRight}`} />
        </motion.div>
      </div>
    </div>
  );
}
