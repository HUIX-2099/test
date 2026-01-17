'use client';

import { motion } from 'framer-motion';
import styles from './legal.module.css';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, request a quote, subscribe to our newsletter, or contact us for support. This may include:
      
• Personal identification information (name, email address, phone number)
• Company information (company name, job title, industry)
• Technical information (IP address, browser type, device information)
• Usage data (pages visited, time spent on site, referral source)
• Communication preferences`
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send promotional communications (with your consent)
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent security incidents
• Comply with legal obligations`
    },
    {
      title: 'Information Sharing',
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:

• With service providers who assist in our operations
• To comply with legal obligations or law enforcement requests
• To protect our rights, privacy, safety, or property
• In connection with a merger, acquisition, or sale of assets
• With your explicit consent`
    },
    {
      title: 'Data Security',
      content: `We implement industry-standard security measures to protect your personal information, including:

• SSL/TLS encryption for data in transit
• Encrypted storage for sensitive data at rest
• Regular security audits and penetration testing
• Access controls and authentication mechanisms
• Employee training on data protection best practices`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

• Access and receive a copy of your personal data
• Correct inaccurate or incomplete information
• Request deletion of your personal data
• Object to or restrict processing of your data
• Data portability (receive data in a structured format)
• Withdraw consent at any time
• Lodge a complaint with a supervisory authority`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to:

• Remember your preferences and settings
• Understand how you use our website
• Improve our services and user experience
• Analyze website traffic and performance
• Deliver relevant content and advertisements

You can manage cookie preferences through your browser settings.`
    },
    {
      title: 'Contact Us',
      content: `If you have questions about this Privacy Policy or our data practices, please contact us:

Email: privacy@amaratechit.com
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
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Last updated: January 2026
          </p>
          <p className={styles.intro}>
            At AmaraTech IT Solutions, we are committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or use our services.
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
