'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Shield, Mail, Phone, MapPin, 
  Github, Linkedin, Twitter, Facebook,
  Instagram, Youtube,
  Zap, Server, ArrowUpRight, Navigation
} from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const servicesLinks = [
    { name: 'Microsoft Azure', href: '/services/azure', code: 'AZR' },
    { name: 'Azure Migration Strategy', href: '/services/azure-migration', code: 'MIG' },
    { name: 'Microsoft Office 365', href: '/services/office-365', code: 'O365' },
    { name: 'Cloud Solutions', href: '/services/cloud', code: 'CLD' },
    { name: 'Cyber Security', href: '/services/security', code: 'SEC' },
    { name: 'Penetration Testing', href: '/services/penetration-testing', code: 'PEN' },
    { name: 'Managed IT Support', href: '/services/managed-it', code: 'MIT' },
    { name: 'Artificial Intelligence', href: '/services/ai', code: 'AI' },
  ];

  const companyLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Artificial Intelligence', href: '/services/ai' },
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Events', href: '/events' },
    { name: 'Swag', href: '/swag' },
    { name: 'Blog', href: '/blog' },
    { name: 'Self Assessment', href: '/self-assessment' },
    { name: 'Contact Us', href: '/contact' },
  ];

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
              We are committed to maximizing your investment through our cybersecurity and cloud solutions services. Our expertise spans across a range of modern IT capabilities, including secure cloud migration, advanced threat detection, and unified security protocols. Always forward-thinking, we specialize in enabling small and medium enterprises (SMEs) to adapt to flexible, secure remote work environments while ensuring robust data protection and compliance standards.
            </p>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/AmaraTechITSolutions/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/amaratechit/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com/amaratechit" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/company/amaratech-it-solutions/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://www.yelp.com/biz/amaratech-it-solutions" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Yelp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.14 13.13L15.46 15.15C15.89 15.41 16.01 15.97 15.72 16.38C15.5 16.69 15.17 17 14.8 17.24C14.13 17.68 13.51 17.94 12.95 17.97C12.53 18 12.18 17.73 12.05 17.35L10.96 14.12C10.74 13.45 11.39 12.81 12.14 13.13M11.82 8.17L12.95 4.93C13.08 4.55 13.43 4.28 13.86 4.31C14.42 4.35 15.04 4.6 15.71 5.04C16.08 5.28 16.41 5.59 16.63 5.9C16.92 6.31 16.8 6.87 16.37 7.13L13.05 9.15C12.3 9.47 11.65 8.83 11.82 8.17M10.5 11.5C10.5 11.5 10.5 11.5 10.5 11.5C10.5 10.12 9.38 9 8 9L4.31 8.95C3.89 8.95 3.53 9.23 3.41 9.61C3.23 10.22 3.05 11.04 3.03 11.96C3 12.88 3.14 13.7 3.28 14.32C3.38 14.71 3.72 15 4.14 15.02L7.83 15.18C9.21 15.24 10.37 14.19 10.5 12.81C10.5 12.37 10.5 11.94 10.5 11.5M11.82 14.83L10.69 18.07C10.52 18.74 9.87 19.08 9.12 18.76L5.8 16.74C5.37 16.48 5.25 15.92 5.54 15.51C5.76 15.2 6.09 14.89 6.46 14.65C7.13 14.21 7.75 13.95 8.31 13.92C8.73 13.89 9.08 14.16 9.21 14.54L10.34 17.78M13.05 13.85L16.37 11.83C17.12 11.51 17.77 12.15 17.6 12.81L16.47 16.05C16.34 16.43 15.99 16.7 15.57 16.67C15.01 16.63 14.39 16.38 13.72 15.94C13.35 15.7 13.02 15.39 12.8 15.08C12.51 14.67 12.63 14.11 13.05 13.85"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@amaratechit" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://github.com/AmaraTech-IT-Solutions" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
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
                <span>CONTACT</span>
              </div>
              <div className={styles.contactList}>
                {/* USA Address */}
                <div className={styles.addressBlock}>
                  <span className={styles.addressLabel}>USA Address</span>
                  <div className={styles.contactItem}>
                    <MapPin size={14} />
                    <div className={styles.contactInfo}>
                      <span className={styles.contactValue}>8865 Stanford Blvd, Suite 202 #1003</span>
                      <span className={styles.contactValue}>Columbia, MD 21045, US</span>
                    </div>
                  </div>
                  <a href="tel:+14108552206" className={styles.contactItem}>
                    <Phone size={14} />
                    <div className={styles.contactInfo}>
                      <span className={styles.contactLabel}>Office phone</span>
                      <span className={styles.contactValue}>+1 410 855 2206</span>
                    </div>
                  </a>
                  <a href="mailto:info@amaratechit.com" className={styles.contactItem}>
                    <Mail size={14} />
                    <div className={styles.contactInfo}>
                      <span className={styles.contactValue}>info@amaratechit.com</span>
                    </div>
                  </a>
                </div>
                
                {/* Liberia Address */}
                <div className={styles.addressBlock}>
                  <span className={styles.addressLabel}>Liberia Address</span>
                  <div className={styles.contactItem}>
                    <MapPin size={14} />
                    <div className={styles.contactInfo}>
                      <span className={styles.contactValue}>The Cary & Center St.</span>
                      <span className={styles.contactValue}>Montserrado County, Monrovia, Liberia</span>
                    </div>
                  </div>
                  <a href="tel:+231778616504" className={styles.contactItem}>
                    <Phone size={14} />
                    <div className={styles.contactInfo}>
                      <span className={styles.contactLabel}>Office</span>
                      <span className={styles.contactValue}>+231-77-861-6504</span>
                    </div>
                  </a>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={styles.directionsLink}>
                    <Navigation size={14} />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
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
