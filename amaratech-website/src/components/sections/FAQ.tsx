'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Shield, Award, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './FAQ.module.css';

const whyChooseUs = [
  {
    index: '01',
    title: '15+ Years Experience',
    description: 'Our team has 15+ years of industry experience and multiple certifications.',
    icon: Award,
  },
  {
    index: '02',
    title: 'Measurable Outcomes',
    description: 'We take pride in delivering customized IT solutions that produce measurable outcomes.',
    icon: Shield,
  },
  {
    index: '03',
    title: 'Reliable Partnership',
    description: 'We build a strong and reliable partnership with you to help you achieve your business goals.',
    icon: Users,
  },
  {
    index: '04',
    title: 'Certified Expertise',
    description: 'CISSP, Microsoft, AWS, and compliance-certified professionals.',
    icon: Award,
  },
  {
    index: '05',
    title: '24/7 Threat Monitoring',
    description: 'Always-on protection against evolving cyber risks.',
    icon: Clock,
  },
];

const faqs = [
  {
    question: 'What services does AmaraTech IT provide?',
    answer: 'We specialize in cybersecurity, cloud solutions, IT support, and compliance consulting for businesses of all sizes.'
  },
  {
    question: 'How is AmaraTech IT different from others?',
    answer: 'We combine 15+ years of experience with certified expertise (CISSP, Microsoft, AWS) and a genuine partnership approach. We deliver customized solutions with measurable outcomes.'
  },
  {
    question: 'Do you offer 24/7 support?',
    answer: 'Yes, our SOC team provides 24/7/365 coverage with an average incident response time of under 15 minutes.'
  },
  {
    question: 'Can you help with compliance requirements?',
    answer: 'Absolutely. We have dedicated compliance specialists for CMMC, HIPAA, SOC 2, GDPR, and other regulatory frameworks.'
  },
  {
    question: 'What industries does AmaraTech IT serve?',
    answer: 'We serve education, government, healthcare, non-profit, retail, banking, and enterprises across all sectors.'
  },
  {
    question: 'How quickly can you respond to a cyber incident?',
    answer: 'Our incident response team is available 24/7 and begins containment and recovery immediately upon detection or notification.'
  },
  {
    question: 'Do you provide ongoing IT management or one-time projects?',
    answer: 'We offer both! Choose from monthly managed services, project-based engagements, or retainer options based on your needs.'
  },
  {
    question: 'What size businesses do you work with?',
    answer: 'We work with businesses of all sizes, from small startups to Fortune 500 companies and government agencies.'
  },
  {
    question: 'Where is AmaraTech IT located?',
    answer: 'Our main office is at 8865 Stanford Blvd, Suite 202, Columbia, MD 21045. We also have offices in Monrovia, Liberia.'
  },
  {
    question: 'How can I get started with AmaraTech IT?',
    answer: 'Contact us for a free security assessment! Call us at +1 410 855 2206 or email info@amaratechit.com to get started.'
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className={styles.faq}>
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerLabel}>[06] FAQ</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Common questions about our services and approach
          </p>
        </div>

        {/* Main Two Column Layout */}
        <div className={styles.mainContent}>
          {/* FAQ List */}
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className={styles.questionNumber}>[{String(index + 1).padStart(2, '0')}]</span>
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={styles.questionIcon}>
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Section */}
          <motion.div
          className={styles.whyChooseSection}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Background Number */}
          <span className={styles.bgNumber}>07</span>

          {/* Section Header */}
          <div className={styles.whyHeader}>
            <div className={styles.whyHeaderLeft}>
              <span className={styles.whyLabel}>[07] WHY_CHOOSE_US</span>
              <h3 className={styles.whyTitle}>
                Why Choose <span className={styles.titleAccent}>AmaraTech</span>
              </h3>
            </div>
            <div className={styles.whyHeaderRight}>
              <span className={styles.whyMeta}>SECTION / 07 · VALUE</span>
            </div>
          </div>

          <p className={styles.whyDescription}>
            Delivering solutions for business and maximizing value for money while excelling at the basics.
          </p>

          {/* Image */}
          <div className={styles.whyImageWrapper}>
            <Image
              src="/other_images/fqa.webp"
              alt="AmaraTech Cybersecurity Solutions"
              width={400}
              height={300}
              className={styles.whyImage}
            />
          </div>

          {/* Benefits List */}
          <div className={styles.benefitsList}>
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.index}
                  className={styles.benefitItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span className={styles.benefitIndex}>[{item.index}]</span>
                  <div className={styles.benefitIcon}>
                    <Icon size={18} />
                  </div>
                  <div className={styles.benefitContent}>
                    <h4 className={styles.benefitTitle}>{item.title}</h4>
                    <p className={styles.benefitDesc}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hire Us CTA */}
          <div className={styles.hireCta}>
            <Link href="/contact" className={styles.hireButton}>
              HIRE US TODAY
              <ArrowRight size={14} />
            </Link>
            <span className={styles.hireRef}>p. 07</span>
          </div>

          {/* Bottom Meta */}
          <div className={styles.whyMeta2}>
            <span className={styles.metaItem}>TYPE: ENTERPRISE</span>
            <span className={styles.metaDivider}>|</span>
            <span className={styles.metaItem}>CAT: PARTNERSHIP</span>
            <span className={styles.metaDivider}>|</span>
            <span className={styles.metaItem}>REV: 2026.01</span>
          </div>
        </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          className={styles.contactCTA}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span className={styles.ctaText}>Still have questions?</span>
          <a href="/contact" className={styles.ctaLink}>
            Contact our team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
