'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Shield, Mail, Phone, MapPin, ExternalLink, 
  Github, Linkedin, Twitter, Facebook,
  Zap, Server, Lock, Cpu, Globe, ArrowUpRight
} from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const servicesLinks = [
    { name: 'Microsoft Azure', href: '/services/azure', code: 'AZR' },
    { name: 'Cloud Solutions', href: '/services/cloud', code: 'CLD' },
    { name: 'Cyber Security', href: '/services/security', code: 'SEC' },
    { name: 'IT Consulting', href: '/services/consulting', code: 'CNS' },
    { name: 'E-Governance', href: '/services/e-governance', code: 'GOV' },
    { name: 'AI Solutions', href: '/services/ai', code: 'AI' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Platform', href: '/platform' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const certifications = ['SOC 2', 'ISO 27001', 'CMMC', 'HIPAA', 'FedRAMP'];

  return (
    <footer className={styles.footer}>
      {/* Top wire decoration */}
      <div className={styles.topWire}>
        <svg viewBox="0 0 1400 20" preserveAspectRatio="none">
          <motion.path
            d="M0 10 L1400 10"
            stroke="#C81E1E"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          />
          {/* Connection nodes */}
          {[200, 400, 600, 800, 1000, 1200].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy="10"
              r="5"
              fill="#0a0a0f"
              stroke="#C81E1E"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 * i }}
              viewport={{ once: true }}
            />
          ))}
        </svg>
      </div>

      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoMark}>
                <Image 
                  src="/logo/AmaraTech IT Logo (new) - dark bg.png" 
                  alt="AmaraTech IT Solutions" 
                  width={180}
                  height={45}
                  className={styles.logoImage}
                />
              </div>
            </Link>

            <p className={styles.tagline}>
              Enterprise-grade cybersecurity and IT solutions. Protecting businesses worldwide since 2009.
            </p>

            {/* Quick Stats */}
            <div className={styles.quickStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>100+</span>
                <span className={styles.statLabel}>Clients</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>99.9%</span>
                <span className={styles.statLabel}>Uptime</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/company/amaratech-it-solutions/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/amaratechit" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Twitter size={18} />
              </a>
              <a href="https://www.facebook.com/AmaraTechITSolutions/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Facebook size={18} />
              </a>
              <a href="https://github.com/AmaraTech-IT-Solutions" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className={styles.linksSection}>
            {/* Services */}
            <div className={styles.linkColumn}>
              <div className={styles.columnHeader}>
                <Server size={16} />
                <span>SERVICES</span>
              </div>
              <nav className={styles.linkList}>
                {servicesLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.link}>
                    <span className={styles.linkCode}>[{link.code}]</span>
                    <span className={styles.linkName}>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div className={styles.linkColumn}>
              <div className={styles.columnHeader}>
                <Shield size={16} />
                <span>COMPANY</span>
              </div>
              <nav className={styles.linkList}>
                {companyLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.link}>
                    <span className={styles.linkName}>{link.name}</span>
                    <ArrowUpRight size={12} className={styles.linkArrow} />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className={styles.linkColumn}>
              <div className={styles.columnHeader}>
                <Zap size={16} />
                <span>CONNECT</span>
              </div>
              <div className={styles.contactList}>
                <a href="tel:+14108552206" className={styles.contactItem}>
                  <Phone size={14} />
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>USA</span>
                    <span className={styles.contactValue}>+1 410 855 2206</span>
                  </div>
                </a>
                <a href="tel:+231778616504" className={styles.contactItem}>
                  <Phone size={14} />
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>LIBERIA</span>
                    <span className={styles.contactValue}>+231 77 861 6504</span>
                  </div>
                </a>
                <a href="mailto:info@amaratechit.com" className={styles.contactItem}>
                  <Mail size={14} />
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>EMAIL</span>
                    <span className={styles.contactValue}>info@amaratechit.com</span>
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <MapPin size={14} />
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>HQ</span>
                    <span className={styles.contactValue}>Columbia, MD 21045</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Bar */}
        <div className={styles.certBar}>
          <div className={styles.certHeader}>
            <Lock size={14} />
            <span>CERTIFICATIONS</span>
          </div>
          <div className={styles.certList}>
            {certifications.map((cert, i) => (
              <motion.span
                key={i}
                className={styles.certBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} AmaraTech IT Solutions. All rights reserved.
            </span>
          </div>
          <div className={styles.bottomCenter}>
            <div className={styles.systemStatus}>
              <span className={styles.statusDot} />
              <span>SYS.ONLINE</span>
            </div>
          </div>
          <div className={styles.bottomRight}>
            <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
            <span className={styles.legalSep}>│</span>
            <Link href="/terms" className={styles.legalLink}>Terms</Link>
            <span className={styles.legalSep}>│</span>
            <span className={styles.version}>v2.0.26</span>
          </div>
        </div>
      </div>

      {/* Bottom wire decoration */}
      <div className={styles.bottomWire}>
        <svg viewBox="0 0 1400 10" preserveAspectRatio="none">
          <motion.path
            d="M0 5 L500 5"
            stroke="#C81E1E"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.path
            d="M900 5 L1400 5"
            stroke="#00D1FF"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </svg>
      </div>

      {/* Corner decorations */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />
    </footer>
  );
}
