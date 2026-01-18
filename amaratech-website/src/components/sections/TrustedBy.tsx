'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Handshake } from 'lucide-react';
import { FaMicrosoft, FaAws, FaShieldAlt, FaNetworkWired, FaLock, FaServer } from 'react-icons/fa';
import styles from './TrustedBy.module.css';

const partners = [
  { name: 'Microsoft', Icon: FaMicrosoft, color: '#00A4EF' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
  { name: 'Cisco', Icon: FaNetworkWired, color: '#1BA0D7' },
  { name: 'Fortinet', Icon: FaShieldAlt, color: '#EE3124' },
  { name: 'CrowdStrike', Icon: FaServer, color: '#FF0000' },
  { name: 'Palo Alto', Icon: FaLock, color: '#F04E23' },
];

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section ref={ref} className={styles.trustedBy}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerBadge}>
            <Handshake size={18} />
            <span>PARTNERSHIPS</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Our Strategic <span className={styles.titleAccent}>Relationships</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Certified partnerships with industry leaders to deliver enterprise-grade solutions
          </p>
        </motion.div>

        {/* Sliding Partners Track */}
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderTrack}>
            {duplicatedPartners.map((partner, index) => {
              const PartnerIcon = partner.Icon;
              const docNumber = String((index % partners.length) + 1).padStart(2, '0');
              
              return (
                <div
                  key={index}
                  className={styles.partnerCard}
                  style={{ '--partner-color': partner.color } as React.CSSProperties}
                >
                  {/* Doc Number */}
                  <div className={styles.docNumber}>
                    <span className={styles.docNum}>{docNumber}</span>
                  </div>
                  
                  {/* Partner Icon */}
                  <div className={styles.partnerLogo}>
                    <PartnerIcon size={36} />
                  </div>
                  
                  {/* Partner Name */}
                  <span className={styles.partnerName}>{partner.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
