'use client';

import { motion } from 'framer-motion';
import styles from '../privacy/legal.module.css';

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using AmaraTech IT Solutions' website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all visitors, users, and others who access or use our services.`
    },
    {
      title: 'Description of Services',
      content: `AmaraTech IT Solutions provides:

• Cloud infrastructure and migration services
• Cybersecurity consulting and managed security services
• AI and machine learning solutions
• IT consulting and digital transformation
• E-governance solutions
• Managed IT support services

Service availability and features may vary by region and are subject to change.`
    },
    {
      title: 'User Responsibilities',
      content: `You agree to:

• Provide accurate and complete information when using our services
• Maintain the confidentiality of your account credentials
• Notify us immediately of any unauthorized access
• Use our services only for lawful purposes
• Comply with all applicable laws and regulations
• Not interfere with or disrupt our services
• Not attempt to gain unauthorized access to any systems`
    },
    {
      title: 'Intellectual Property',
      content: `All content, features, and functionality of our website and services are owned by AmaraTech IT Solutions and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

You may not:
• Copy, modify, or distribute our content without permission
• Use our trademarks without written consent
• Reverse engineer or attempt to extract source code
• Remove any copyright or proprietary notices`
    },
    {
      title: 'Service Level Agreements',
      content: `For managed services, specific service level agreements (SLAs) will be provided in your service contract. These SLAs may include:

• Uptime guarantees and availability targets
• Response time commitments
• Support hours and escalation procedures
• Compensation terms for SLA breaches

SLA terms supersede general terms where applicable.`
    },
    {
      title: 'Payment Terms',
      content: `• All fees are quoted in US dollars unless otherwise specified
• Payment is due within 30 days of invoice date
• Late payments may incur interest charges
• We reserve the right to suspend services for non-payment
• Prices are subject to change with 30 days notice
• Refunds are handled on a case-by-case basis`
    },
    {
      title: 'Limitation of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

• Our liability is limited to the amount paid for services in the preceding 12 months
• We are not liable for indirect, incidental, or consequential damages
• We do not guarantee uninterrupted or error-free service
• We are not responsible for third-party content or services
• Force majeure events relieve us of liability

Some jurisdictions do not allow limitation of certain damages, so some limitations may not apply to you.`
    },
    {
      title: 'Confidentiality',
      content: `Both parties agree to:

• Protect confidential information with reasonable care
• Use confidential information only for intended purposes
• Not disclose confidential information to third parties
• Return or destroy confidential information upon request

This obligation survives termination of services.`
    },
    {
      title: 'Termination',
      content: `Either party may terminate services:

• With 30 days written notice for convenience
• Immediately for material breach
• Immediately if the other party becomes insolvent

Upon termination:
• Outstanding fees become immediately due
• Access to services will be revoked
• Data export options will be provided per our data retention policy`
    },
    {
      title: 'Governing Law',
      content: `These terms are governed by the laws of the State of Maryland, United States, without regard to conflict of law principles.

Any disputes shall be resolved through:
1. Good faith negotiation
2. Mediation
3. Binding arbitration or court proceedings in Maryland`
    },
    {
      title: 'Contact Information',
      content: `For questions about these Terms of Service:

Email: legal@amaratechit.com
Phone: +1 410 855 2206
Address: 8865 Stanford Blvd, Suite 202 #1003, Columbia, MD 21045, US`
    }
  ];

  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>LEGAL</span>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Last updated: January 2026
          </p>
          <p className={styles.intro}>
            These Terms of Service govern your use of AmaraTech IT Solutions&apos; website and services. 
            Please read these terms carefully before using our services. By using our services, 
            you agree to be bound by these terms.
          </p>
        </motion.div>

        <div className={styles.content}>
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              className={styles.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <p className={styles.sectionContent}>{section.content}</p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
