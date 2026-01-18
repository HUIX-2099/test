'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cloud, Shield, Settings, Brain, Building2,
  ArrowRight, CheckCircle
} from 'lucide-react';
import { FaMicrosoft } from 'react-icons/fa';
import styles from './services.module.css';

const services = [
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Strategic partnership with Microsoft for cloud transformation and Azure migration.',
    Icon: FaMicrosoft,
    color: '#00A4EF',
    features: ['Azure Migration', 'Cloud Architecture', 'M365 Integration'],
    href: '/services/azure',
  },
  {
    id: 'cloud',
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and architecture for modern businesses.',
    Icon: Cloud,
    color: '#22C55E',
    features: ['Multi-Cloud', 'Hybrid Solutions', 'Cloud Native'],
    href: '/services/cloud',
  },
  {
    id: 'security',
    name: 'Cyber Security',
    description: '24/7 threat monitoring, incident response, and comprehensive security services.',
    Icon: Shield,
    color: '#C81E1E',
    features: ['SOC Services', 'Pen Testing', 'Compliance'],
    href: '/services/security',
  },
  {
    id: 'consulting',
    name: 'IT Consulting',
    description: 'Technology strategy and digital transformation consulting services.',
    Icon: Settings,
    color: '#BFA65F',
    features: ['Strategy', 'Architecture', 'Implementation'],
    href: '/services/consulting',
  },
  {
    id: 'e-governance',
    name: 'E-Governance',
    description: 'Digital solutions for government operations and citizen services.',
    Icon: Building2,
    color: '#00D1FF',
    features: ['Digital ID', 'Portal Systems', 'Data Management'],
    href: '/services/e-governance',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Custom AI and machine learning solutions for business automation.',
    Icon: Brain,
    color: '#A855F7',
    features: ['ML Models', 'NLP', 'Automation'],
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
    <div className={styles.servicesPage}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          
          <motion.div 
            className={styles.headerContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.title}>
              Our <span className={styles.titleAccent}>Services</span>
            </h1>
            <p className={styles.subtitle}>
              A comprehensive suite of IT services designed to transform your business. 
              From cloud migration to cybersecurity, we deliver enterprise-grade solutions.
            </p>
          </motion.div>
        </header>

        {/* Stats Bar */}
        <motion.div 
          className={styles.statsBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const ServiceIcon = service.Icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={service.href} className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <div 
                      className={styles.serviceIcon}
                      style={{ background: `${service.color}15`, color: service.color }}
                    >
                      <ServiceIcon size={28} />
                    </div>
                    <h3 className={styles.serviceName}>{service.name}</h3>
                  </div>

                  <p className={styles.serviceDesc}>{service.description}</p>
                  
                  <div className={styles.serviceFeatures}>
                    {service.features.map((feature, fi) => (
                      <span key={fi} className={styles.featureTag}>
                        <CheckCircle size={12} />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className={styles.serviceFooter}>
                    <span className={styles.learnMore}>
                      Learn More
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className={styles.ctaTitle}>Need a Custom Solution?</h2>
          <p className={styles.ctaDesc}>
            Our team can design and implement custom IT solutions tailored to your specific business needs.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Get Started
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
