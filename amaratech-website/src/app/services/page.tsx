'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cloud, Shield, Settings, Brain, Building2, Server,
  ArrowRight, Zap, CheckCircle, Activity
} from 'lucide-react';
import { FaMicrosoft } from 'react-icons/fa';
import styles from './services.module.css';
import wireflow from '../wireflow.module.css';

const services = [
  {
    id: 'azure',
    code: 'AZR',
    name: 'Microsoft Azure',
    description: 'Strategic partnership with Microsoft for cloud transformation and Azure migration.',
    Icon: FaMicrosoft,
    color: '#00A4EF',
    features: ['Azure Migration', 'Cloud Architecture', 'M365 Integration'],
    status: 'ACTIVE',
    href: '/services/azure',
  },
  {
    id: 'cloud',
    code: 'CLD',
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and architecture for modern businesses.',
    Icon: Cloud,
    color: '#22C55E',
    features: ['Multi-Cloud', 'Hybrid Solutions', 'Cloud Native'],
    status: 'ACTIVE',
    href: '/services/cloud',
  },
  {
    id: 'security',
    code: 'SEC',
    name: 'Cyber Security',
    description: '24/7 threat monitoring, incident response, and comprehensive security services.',
    Icon: Shield,
    color: '#C81E1E',
    features: ['SOC Services', 'Pen Testing', 'Compliance'],
    status: 'CRITICAL',
    href: '/services/security',
  },
  {
    id: 'consulting',
    code: 'CNS',
    name: 'IT Consulting',
    description: 'Technology strategy and digital transformation consulting services.',
    Icon: Settings,
    color: '#BFA65F',
    features: ['Strategy', 'Architecture', 'Implementation'],
    status: 'ACTIVE',
    href: '/services/consulting',
  },
  {
    id: 'e-governance',
    code: 'GOV',
    name: 'E-Governance',
    description: 'Digital solutions for government operations and citizen services.',
    Icon: Building2,
    color: '#00D1FF',
    features: ['Digital ID', 'Portal Systems', 'Data Management'],
    status: 'ACTIVE',
    href: '/services/e-governance',
  },
  {
    id: 'ai',
    code: 'AI',
    name: 'Artificial Intelligence',
    description: 'Custom AI and machine learning solutions for business automation.',
    Icon: Brain,
    color: '#A855F7',
    features: ['ML Models', 'NLP', 'Automation'],
    status: 'NEW',
    href: '/services/ai',
  },
];

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Support Coverage' },
  { value: '15+', label: 'Years Experience' },
];

export default function Services() {
  return (
    <div className={wireflow.page}>
      <div className={wireflow.gridBg} />
      
      {/* Wire Connections Background */}
      <svg className={styles.wireBg} viewBox="0 0 1400 1200" preserveAspectRatio="none">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Vertical main wire */}
        <motion.path
          d="M700 0 L700 1200"
          stroke="#C81E1E"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        {/* Horizontal branches */}
        {[200, 400, 600, 800, 1000].map((y, i) => (
          <motion.path
            key={i}
            d={`M${i % 2 === 0 ? 100 : 700} ${y} L${i % 2 === 0 ? 700 : 1300} ${y}`}
            stroke={i % 2 === 0 ? '#C81E1E' : '#00D1FF'}
            strokeWidth="1"
            strokeDasharray="8 4"
            fill="none"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.3 }}
          />
        ))}
        {/* Animated data packets */}
        <motion.circle
          r="4"
          fill="#C81E1E"
          filter="url(#glow)"
          animate={{ cy: [0, 1200] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          cx="700"
        />
      </svg>

      <div className={wireflow.container}>
        {/* Header */}
        <header className={wireflow.pageHeader}>
          <div className={wireflow.breadcrumb}>
            <Link href="/">HOME</Link>
            <span className={wireflow.breadcrumbSep}>/</span>
            <span>SERVICES</span>
          </div>
          
          <div className={wireflow.pageHeaderInner}>
            <div className={wireflow.pageTitle}>
              <span className={wireflow.pageTitleCode}>// SERVICES_MODULE.INIT</span>
              <h1 className={wireflow.pageTitleMain}>
                Our <span className={wireflow.pageTitleAccent}>Services</span>
              </h1>
              <p className={wireflow.pageDescription}>
                A comprehensive suite of IT services designed to transform your business. 
                From cloud migration to cybersecurity, we&apos;ve got you covered with enterprise-grade solutions.
              </p>
            </div>
            <div className={wireflow.pageNumber}>II.01</div>
          </div>
        </header>

        {/* Stats Bar */}
        <motion.div 
          className={styles.statsBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Flow Section Label */}
        <div className={wireflow.flowLabel}>
          <Server size={14} />
          SERVICE_MODULES
        </div>

        {/* Flow Navigation Hint */}
        <motion.div 
          className={styles.flowHint}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={wireflow.tapIndicator}>TAP</div>
          <div className={styles.flowHintLine}>
            <svg viewBox="0 0 100 20" preserveAspectRatio="none">
              <motion.path 
                d="M0 10 L80 10" 
                stroke="#C81E1E" 
                strokeWidth="2" 
                strokeDasharray="6 4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <circle cx="90" cy="10" r="5" fill="#C81E1E" />
            </svg>
          </div>
          <span className={styles.flowHintText}>Quick navigation on services</span>
        </motion.div>

        {/* Services Grid */}
        <div className={styles.servicesFlow}>
          {services.map((service, index) => {
            const ServiceIcon = service.Icon;
            return (
              <motion.div
                key={service.id}
                className={styles.serviceNode}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {/* Connection Points */}
                <div className={`${wireflow.connectionPoint} ${wireflow.top}`} />
                <div className={`${wireflow.connectionPoint} ${wireflow.bottom}`} />
                {index % 3 !== 2 && <div className={`${wireflow.connectionPoint} ${wireflow.right}`} />}
                {index % 3 !== 0 && <div className={`${wireflow.connectionPoint} ${wireflow.left}`} />}
                
                {/* Node Card */}
                <Link href={service.href} className={styles.serviceCard}>
                  {/* Header */}
                  <div className={styles.serviceHeader}>
                    <motion.div 
                      className={styles.serviceIcon}
                      style={{ background: `${service.color}20`, color: service.color }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <ServiceIcon size={24} />
                    </motion.div>
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceCode}>[{service.code}]</span>
                      <h3 className={styles.serviceName}>{service.name}</h3>
                    </div>
                    <div className={`${wireflow.statusBadge} ${service.status === 'CRITICAL' ? wireflow.critical : service.status === 'NEW' ? wireflow.pending : wireflow.active}`}>
                      <span className={wireflow.nodeStatusDot} style={{ background: service.status === 'CRITICAL' ? '#C81E1E' : service.status === 'NEW' ? '#A855F7' : '#22C55E' }} />
                      {service.status}
                    </div>
                  </div>

                  {/* Body */}
                  <div className={styles.serviceBody}>
                    <p className={styles.serviceDesc}>{service.description}</p>
                    
                    {/* Features */}
                    <div className={styles.serviceFeatures}>
                      {service.features.map((feature, fi) => (
                        <span key={fi} className={styles.featureTag}>
                          <CheckCircle size={10} />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className={styles.serviceFooter}>
                    <span className={styles.exploreBtn}>
                      <Activity size={14} />
                      EXPLORE
                      <ArrowRight size={14} />
                    </span>
                    <div className={styles.wireDeco}>
                      <div className={styles.wireRed} />
                      <div className={styles.wireBlue} />
                    </div>
                  </div>
                </Link>

                {/* Tap Indicator for each card */}
                <motion.div 
                  className={styles.cardTap}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + 0.1 * index }}
                >
                  <div className={wireflow.tapIndicatorOutline}>TAP</div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Flow Connection Lines SVG */}
        <svg className={styles.flowConnectionsSvg} viewBox="0 0 1400 600" preserveAspectRatio="none">
          {/* Horizontal connections */}
          <motion.path
            d="M220 100 L380 100"
            stroke="#C81E1E"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M620 100 L780 100"
            stroke="#C81E1E"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          {/* Vertical connections */}
          <motion.path
            d="M200 200 L200 280"
            stroke="#C81E1E"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </svg>

        {/* CTA Section */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeft}>
              <span className={wireflow.pageTitleCode}>// QUICK_NAVIGATION</span>
              <h2 className={styles.ctaTitle}>Need a Custom Solution?</h2>
              <p className={styles.ctaDesc}>
                Our team can design and implement custom IT solutions tailored to your specific business needs.
              </p>
            </div>
            <Link href="/contact" className={wireflow.btnPrimary}>
              <Zap size={16} />
              INIT.CONSULTATION
            </Link>
          </div>
          
          {/* Corner decorations */}
          <div className={`${wireflow.cornerDecor} ${wireflow.topLeft}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.topRight}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.bottomLeft}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.bottomRight}`} />
        </motion.div>
      </div>
    </div>
  );
}
