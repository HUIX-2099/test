'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Users, Globe } from 'lucide-react';
import { FaMicrosoft, FaAws, FaShieldAlt, FaNetworkWired, FaLock, FaServer } from 'react-icons/fa';
import styles from './TrustedBy.module.css';

const partners = [
  { name: 'Microsoft', tier: 'Gold Partner', Icon: FaMicrosoft, color: '#00A4EF' },
  { name: 'AWS', tier: 'Advanced Partner', Icon: FaAws, color: '#FF9900' },
  { name: 'Cisco', tier: 'Premier Partner', Icon: FaNetworkWired, color: '#1BA0D7' },
  { name: 'Fortinet', tier: 'Expert Partner', Icon: FaShieldAlt, color: '#EE3124' },
  { name: 'CrowdStrike', tier: 'MSSP Partner', Icon: FaServer, color: '#FF0000' },
  { name: 'Palo Alto', tier: 'Certified', Icon: FaLock, color: '#F04E23' },
];

const stats = [
  { number: '100+', label: 'Clients Served', icon: Shield },
  { number: '99.9%', label: 'Uptime SLA', icon: Award },
  { number: '24/7', label: 'Support Coverage', icon: Users },
  { number: '2', label: 'Continents', icon: Globe },
];

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.trustedBy}>
      <div className={styles.container}>
        {/* Stats Bar */}
        <div className={styles.statsBar}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Icon size={16} className={styles.statIcon} />
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Partners Section */}
        <div className={styles.partnersSection}>
          <div className={styles.partnersHeader}>
            <span className={styles.partnersLabel}>[TRUSTED PARTNERS]</span>
            <div className={styles.partnersDivider} />
          </div>

          <div className={styles.partnersGrid}>
            {partners.map((partner, index) => {
              const PartnerIcon = partner.Icon;
              return (
                <motion.div
                  key={index}
                  className={styles.partnerCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: partner.color,
                    boxShadow: `0 0 30px ${partner.color}30`
                  }}
                >
                  <motion.div 
                    className={styles.partnerLogo}
                    whileHover={{ color: partner.color }}
                  >
                    <PartnerIcon size={32} />
                  </motion.div>
                  <div className={styles.partnerInfo}>
                    <span className={styles.partnerName}>{partner.name}</span>
                    <span className={styles.partnerTier}>{partner.tier}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className={styles.certifications}>
          <span className={styles.certLabel}>CERTIFICATIONS:</span>
          <div className={styles.certList}>
            {['SOC 2 Type II', 'ISO 27001', 'CMMC Level 3', 'HIPAA', 'FedRAMP'].map((cert, index) => (
              <motion.span
                key={index}
                className={styles.certBadge}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(200, 30, 30, 0.5)' }}
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
