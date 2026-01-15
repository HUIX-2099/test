'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Cloud, 
  Shield, 
  Settings, 
  Building2,
  Server,
  Cpu,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import styles from './CoreBusiness.module.css';

const services = [
  {
    id: 'cloud',
    index: '01',
    name: 'Cloud Solutions',
    shortName: 'Cloud',
    icon: Cloud,
    description: 'Seamless cloud migration, management, and optimization. We help businesses leverage Azure, AWS, and hybrid cloud environments for efficiency and security.',
    href: '/services/cloud',
  },
  {
    id: 'security',
    index: '02',
    name: 'Cyber Security',
    shortName: 'Security',
    icon: Shield,
    description: 'Comprehensive cybersecurity services including threat detection, vulnerability assessments, penetration testing, and 24/7 security operations.',
    href: '/services/security',
  },
  {
    id: 'azure',
    index: '03',
    name: 'Microsoft Azure',
    shortName: 'Azure',
    icon: Cpu,
    description: 'Expert Microsoft Azure solutions including migration, optimization, and management. Leverage the full power of Azure cloud infrastructure.',
    href: '/services/azure',
  },
  {
    id: 'governance',
    index: '04',
    name: 'E-Governance',
    shortName: 'E-Gov',
    icon: Building2,
    description: 'Digital transformation solutions for government agencies. Modernize public services with secure, efficient, and citizen-focused technology.',
    href: '/services/e-governance',
  },
  {
    id: 'it-ops',
    index: '05',
    name: 'IT Operations',
    shortName: 'IT Ops',
    icon: Server,
    description: 'Reliable IT operations with proactive monitoring, patching, and performance optimization to keep systems secure and available.',
    href: '/services/it-ops',
  },
  {
    id: 'consulting',
    index: '06',
    name: 'IT Consulting',
    shortName: 'Consulting',
    icon: Settings,
    description: 'Technology-driven guidance to improve existing methods. We define strategy and roadmaps, clarify requirements, and deliver essential documentation.',
    href: '/services/consulting',
  },
];

export default function CoreBusiness() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const active = services[activeIndex];

  // Calculate positions for 6 nodes in a hexagonal pattern
  const getNodePosition = (index: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180); // Start from top, 60° apart
    const radius = 180;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <section ref={ref} className={styles.section}>
      {/* Background Elements */}
      <div className={styles.bgNumber}>02</div>
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Section Header */}
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.headerMeta}>
            <span className={styles.metaIndex}>[02]</span>
            <span className={styles.metaLabel}>SERVICES</span>
            <span className={styles.metaDivider}>—</span>
            <span className={styles.metaTitle}>Core Business</span>
          </div>
          <h2 className={styles.title}>
            AmaraTech IT <span className={styles.titleAccent}>Solutions</span>
          </h2>
          <p className={styles.subtitle}>
            Delivering cloud, cybersecurity, and IT operations services for organizations worldwide. 
            Our certified professionals design tailored solutions to drive your digital transformation.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className={styles.contentGrid}>
          
          {/* Left: Service List */}
          <motion.div 
            className={styles.serviceList}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.id}
                  className={`${styles.serviceItem} ${isActive ? styles.serviceItemActive : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={styles.serviceIndex}>{service.index}</span>
                  <span className={styles.serviceName}>{service.name}</span>
                  <ChevronRight className={styles.serviceArrow} size={16} />
                </button>
              );
            })}
          </motion.div>

          {/* Center: Circular Diagram */}
          <motion.div 
            className={styles.circleWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.circleContainer}>
              {/* Orbital Rings */}
              <div className={styles.orbitRing} />
              <div className={styles.orbitRingOuter} />
              
              {/* Connection Lines */}
              <svg className={styles.connectionSvg} viewBox="-200 -200 400 400">
                {services.map((_, index) => {
                  const pos = getNodePosition(index);
                  return (
                    <line
                      key={index}
                      x1="0"
                      y1="0"
                      x2={pos.x}
                      y2={pos.y}
                      className={`${styles.connectionLine} ${activeIndex === index ? styles.connectionLineActive : ''}`}
                    />
                  );
                })}
              </svg>

              {/* Center Node */}
              <div className={styles.centerNode}>
                <div className={styles.centerPulse} />
                <div className={styles.centerContent}>
                  <span className={styles.centerLabel}>CORE</span>
                  <span className={styles.centerTitle}>AmaraTech</span>
                </div>
              </div>

              {/* Service Nodes */}
              {services.map((service, index) => {
                const Icon = service.icon;
                const pos = getNodePosition(index);
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={service.id}
                    className={`${styles.node} ${isActive ? styles.nodeActive : ''}`}
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: `calc(50% + ${pos.y}px)`,
                    }}
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={styles.nodeGlow} />
                    <Icon size={22} className={styles.nodeIcon} />
                    <span className={styles.nodeLabel}>{service.shortName}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Detail Panel */}
          <motion.div 
            className={styles.detailPanel}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>// SERVICE DETAIL //</span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className={styles.panelContent}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              >
                <div className={styles.panelIndex}>{active.index}</div>
                <h3 className={styles.panelTitle}>{active.name}</h3>
                <p className={styles.panelDescription}>{active.description}</p>
                
                <Link href={active.href} className={styles.panelButton}>
                  <span>EXPLORE SERVICE</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Spec Bar */}
        <motion.div 
          className={styles.specBar}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={styles.specItem}>
            <span className={styles.specLabel}>SERVICES</span>
            <span className={styles.specValue}>06</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>COVERAGE</span>
            <span className={styles.specValue}>Worldwide</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>CERTIFIED</span>
            <span className={styles.specValue}>ISO 27001 · CMMC</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>SUPPORT</span>
            <span className={styles.specValue}>24/7</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
