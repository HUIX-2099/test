'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, 
  Shield, 
  Briefcase, 
  FileText, 
  Cpu, 
  Globe,
  ChevronRight,
  Layers,
  Lock,
  Server,
  Database,
  Zap,
  Brain
} from 'lucide-react';
import Link from 'next/link';
import styles from './Services.module.css';

const serviceCategories = [
  {
    id: 'ai',
    label: 'AI consulting',
    count: 5,
    icon: Brain,
    color: '#A855F7',
    services: [
      { name: 'AI Strategy', desc: 'Enterprise AI roadmap and implementation' },
      { name: 'Machine Learning', desc: 'Custom ML models for business intelligence' },
      { name: 'Process Automation', desc: 'Intelligent workflow automation' },
      { name: 'Predictive Analytics', desc: 'Data-driven forecasting solutions' },
      { name: 'AI Integration', desc: 'Seamless AI into existing systems' },
    ]
  },
  {
    id: 'cloud',
    label: 'cloud services',
    count: 4,
    icon: Cloud,
    color: '#00D1FF',
    services: [
      { name: 'Microsoft Azure', desc: 'Enterprise cloud infrastructure and migration' },
      { name: 'AWS Solutions', desc: 'Scalable cloud architecture design' },
      { name: 'Cloud Migration', desc: 'Seamless on-premise to cloud integration' },
      { name: 'Cloud Security', desc: 'Zero-trust cloud protection' },
    ]
  },
  {
    id: 'security',
    label: 'cybersecurity',
    count: 5,
    icon: Shield,
    color: '#C81E1E',
    services: [
      { name: 'Threat Detection', desc: 'AI-powered 24/7 monitoring' },
      { name: 'Penetration Testing', desc: 'Comprehensive vulnerability assessment' },
      { name: 'Incident Response', desc: 'Rapid breach containment' },
      { name: 'Security Audits', desc: 'Complete infrastructure review' },
      { name: 'SOC Services', desc: 'Security Operations Center' },
    ]
  },
  {
    id: 'egovernance',
    label: 'e-governance',
    count: 4,
    icon: Globe,
    color: '#BFA65F',
    services: [
      { name: 'Digital Government', desc: 'Modernizing public sector services' },
      { name: 'Citizen Services', desc: 'User-centric digital portals' },
      { name: 'Data Management', desc: 'Secure government data solutions' },
      { name: 'Process Automation', desc: 'Streamlining administrative workflows' },
    ]
  },
  {
    id: 'consulting',
    label: 'IT consulting',
    count: 4,
    icon: Briefcase,
    color: '#22C55E',
    services: [
      { name: 'Digital Strategy', desc: 'Technology roadmap planning' },
      { name: 'Infrastructure', desc: 'Network architecture design' },
      { name: 'Compliance', desc: 'Regulatory requirement support' },
      { name: 'Training', desc: 'Security awareness programs' },
    ]
  },
];

const featuredServices = [
  {
    number: '01',
    title: 'AI CONSULTING & INTELLIGENT AUTOMATION',
    icon: Brain,
  },
  {
    number: '02',
    title: 'CLOUD INFRASTRUCTURE DESIGN & MIGRATION',
    icon: Cloud,
  },
  {
    number: '03',
    title: 'ENTERPRISE CYBERSECURITY PROTECTION',
    icon: Shield,
  },
];

const areas = [
  { label: 'areas', icon: Layers },
  { label: 'disciplines', icon: Database },
  { label: 'industries', icon: Globe },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className={styles.services}>
      {/* Grid overlay */}
      <div className={styles.gridOverlay} />

      {/* Subtle accent line - minimal decoration */}
      <div className={styles.accentLine} />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconBox}>
              <Server size={20} />
            </div>
            <div>
              <span className={styles.sectionLabel}>services</span>
              <h2 className={styles.sectionTitle}>knowledge lab</h2>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.areas}>
              {areas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <button key={index} className={styles.areaButton}>
                    <Icon size={14} />
                    <span>{area.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Left Side - Service Categories */}
          <div className={styles.categoriesPanel}>
            <div className={styles.categoriesGrid}>
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    className={`${styles.categoryCard} ${activeCategory === category.id ? styles.active : ''}`}
                    onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ '--category-color': category.color } as React.CSSProperties}
                  >
                    <div className={styles.categoryIcon}>
                      <Icon size={20} />
                    </div>
                    <div className={styles.categoryInfo}>
                      <span className={styles.categoryLabel}>+ {category.label}</span>
                      <span className={styles.categoryCount}>&gt; {category.count} services</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Category Details */}
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  className={styles.categoryDetails}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.servicesList}>
                    {serviceCategories
                      .find(c => c.id === activeCategory)
                      ?.services.map((service, index) => (
                        <motion.div
                          key={index}
                          className={styles.serviceItem}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onMouseEnter={() => setHoveredService(index)}
                          onMouseLeave={() => setHoveredService(null)}
                        >
                          <span className={styles.serviceNumber}>[{String(index + 1).padStart(2, '0')}]</span>
                          <div className={styles.serviceInfo}>
                            <span className={styles.serviceName}>{service.name}</span>
                            <span className={styles.serviceDesc}>{service.desc}</span>
                          </div>
                          <ChevronRight 
                            size={16} 
                            className={`${styles.serviceArrow} ${hoveredService === index ? styles.visible : ''}`}
                          />
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side - Featured Panel */}
          <div className={styles.featuredPanel}>
            <div className={styles.featuredHeader}>
              <div className={styles.featuredBadge}>
                <Shield size={20} />
              </div>
              <div className={styles.featuredTitle}>
                <span className={styles.featuredLabel}>AI-POWERED</span>
                <h3>SECURITY<br />OPERATIONS</h3>
              </div>
            </div>

            <p className={styles.featuredDesc}>
              Automatically monitors your infrastructure,
              identifies threats, and highlights critical
              security risks.
            </p>

            <div className={styles.featuredList}>
              {featuredServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    className={styles.featuredItem}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className={styles.featuredNumber}>[{service.number}]</span>
                    <Icon size={16} className={styles.featuredIcon} />
                    <span className={styles.featuredText}>{service.title}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className={styles.featuredFooter}>
              <div className={styles.pageIndicator}>
                <span className={styles.pageCurrent}>1</span>
                <span className={styles.pageDivider}>/5</span>
              </div>
              <Link href="/services" className={styles.viewAllLink}>
                View All Services →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <div className={styles.navBreadcrumb}>
            <span className={styles.navIcon}>☰</span>
            <span>notebook</span>
            <ChevronRight size={14} />
            <span className={styles.navActive}>services</span>
          </div>
          <div className={styles.loadMore}>
            <button className={styles.loadMoreButton}>
              ↓ Load more ···
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
