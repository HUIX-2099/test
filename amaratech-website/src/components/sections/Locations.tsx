'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Settings, Shield, GraduationCap, Building2, HeartPulse, Heart, Landmark, Download } from 'lucide-react';
import styles from './Locations.module.css';

const offices = [
  {
    id: 'us',
    country: 'United States',
    city: 'Columbia, MD',
    address: '8865 Stanford Blvd, Suite 202',
    phone: '+1 410 855 2206',
    flag: '🇺🇸',
    isHQ: true,
  },
  {
    id: 'liberia',
    country: 'Liberia',
    city: 'Monrovia',
    address: 'Monrovia Office',
    phone: '+231 77 861 6504',
    flag: '🇱🇷',
    isHQ: false,
  },
];

const processSteps = [
  {
    index: '01',
    title: 'Assessment',
    icon: Search,
    description: 'Identify vulnerabilities with a comprehensive security review. Evaluate compliance gaps and technology risks.',
    duration: '1-2 weeks',
    deliverables: ['Risk Report', 'Gap Analysis', 'Compliance Review'],
  },
  {
    index: '02',
    title: 'Implementation',
    icon: Settings,
    description: 'Deploy tailored cybersecurity and IT solutions. Strengthen cloud, network, and endpoint security.',
    duration: '2-4 weeks',
    deliverables: ['Security Controls', 'Cloud Setup', 'Network Hardening'],
  },
  {
    index: '03',
    title: 'Ongoing Protection',
    icon: Shield,
    description: '24/7 threat monitoring and rapid incident response. Continuous updates to stay ahead of evolving threats.',
    duration: 'Ongoing',
    deliverables: ['SOC Services', 'Threat Monitoring', 'Incident Response'],
  },
];

const industries = [
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'government', name: 'Government', icon: Building2 },
  { id: 'healthcare', name: 'Health Care', icon: HeartPulse },
  { id: 'nonprofit', name: 'Non-Profit', icon: Heart },
  { id: 'retail', name: 'Retail & Banking', icon: Landmark },
];

export default function Locations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.locations}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.headerLabel}>[03] PROCESS</span>
            <h2 className={styles.sectionTitle}>How It Works</h2>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerMeta}>SECTION / 03 · METHODOLOGY</span>
          </div>
        </div>

        <p className={styles.sectionDesc}>
          Securing your business doesn&apos;t have to be complicated. At AmaraTech IT, we follow a proven, step-by-step process to protect your organization.
        </p>

        {/* Process Steps - 3 Cards in a Row */}
        <div className={styles.processGrid}>
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.index}
                className={styles.processCard}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>{step.index}</span>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                </div>
                
                <p className={styles.cardDescription}>{step.description}</p>
                
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Duration:</span>
                    <span className={styles.metaValue}>{step.duration}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Deliverables:</span>
                    <div className={styles.deliverables}>
                      {step.deliverables.map((item, i) => (
                        <span key={i} className={styles.deliverableTag}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industries + Download Row */}
        <div className={styles.twoColumnGrid}>
          {/* Industries We Serve */}
          <motion.div
            className={styles.industriesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.industriesHeader}>
              <span className={styles.industriesLabel}>[04] INDUSTRIES</span>
              <h3 className={styles.industriesTitle}>Industries We Serve</h3>
            </div>
            <div className={styles.industriesGrid}>
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <motion.div
                    key={industry.id}
                    className={styles.industryItem}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={styles.industryIcon}>
                      <Icon size={20} />
                    </div>
                    <span className={styles.industryName}>{industry.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Download CTA */}
          <motion.div
            className={styles.downloadSection}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.downloadContent}>
              <span className={styles.downloadLabel}>[05] COMPANY_PROFILE</span>
              <h3 className={styles.downloadTitle}>Unlock the Power of AmaraTech IT</h3>
              <p className={styles.downloadDesc}>
                Discover how we help businesses thrive in the digital era. Download our company profile to explore our full range of services.
              </p>
              <a href="/downloads/amaratech-profile.pdf" className={styles.downloadButton}>
                <Download size={16} />
                Download Profile
              </a>
            </div>
          </motion.div>
        </div>

        {/* Story + Video Grid - Full Width */}
        <div className={styles.storyVideoGrid}>
          {/* Our Story */}
          <motion.div
            className={styles.storySection}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.storyHeader}>
              <span className={styles.storyLabel}>[06] ABOUT_US</span>
              <h3 className={styles.storyTitle}>Our Story</h3>
            </div>
            <p className={styles.storyText}>
              At AmaraTech IT Solutions, we are committed to delivering excellence in every service we provide. Our mission is to empower our community with accessible, top-tier solutions, and to continually innovate to meet your needs. Thank you for trusting us to be part of your journey. Together, we grow stronger.
            </p>
          </motion.div>

          {/* YouTube Video */}
          <motion.div
            className={styles.youtubeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <div className={styles.youtubeHeader}>
              <span className={styles.youtubeLabel}>[07] VIDEO</span>
              <span className={styles.youtubeMeta}>AMARATECH_MEDIA</span>
            </div>
            <div className={styles.youtubeWrapper}>
              <iframe
                src="https://www.youtube.com/embed/wstteIwaSKk?si=egeK5gPmetHx2UpT"
                title="AmaraTech IT Solutions"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className={styles.youtubeIframe}
              />
            </div>
          </motion.div>
        </div>

        {/* Office Cards - Full Width at Bottom */}
        <div className={styles.officesRow}>
          {offices.map((office, index) => (
            <motion.div
              key={office.id}
              className={styles.officeCard}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <span className={styles.officeFlag}>{office.flag}</span>
              <div className={styles.officeInfo}>
                <span className={styles.officeCity}>{office.city}</span>
                <span className={styles.officePhone}>{office.phone}</span>
              </div>
              {office.isHQ && <span className={styles.hqBadge}>HQ</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
