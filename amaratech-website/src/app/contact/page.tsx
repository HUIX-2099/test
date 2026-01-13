'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, User, Building2,
  MessageSquare, Shield, Zap, CheckCircle, Globe,
  ArrowRight
} from 'lucide-react';
import styles from './contact.module.css';
import wireflow from '../wireflow.module.css';

const contactMethods = [
  { icon: Phone, label: 'USA', value: '+1 410 855 2206', href: 'tel:+14108552206', code: 'TEL.US' },
  { icon: Phone, label: 'Liberia', value: '+231 77 861 6504', href: 'tel:+231778616504', code: 'TEL.LR' },
  { icon: Mail, label: 'Email', value: 'info@amaratechit.com', href: 'mailto:info@amaratechit.com', code: 'EML.01' },
];

const offices = [
  {
    city: 'Columbia, MD',
    country: 'USA',
    address: '8865 Stanford Blvd, Suite 202 #1003',
    zip: '21045',
    type: 'HEADQUARTERS',
  },
  {
    city: 'Monrovia',
    country: 'Liberia',
    address: 'West Africa Regional Office',
    zip: '',
    type: 'REGIONAL',
  },
];

const services = [
  'Cybersecurity Assessment',
  'Cloud Migration',
  'IT Consulting',
  'Managed Services',
  'Compliance Audit',
  'Other',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [stage, setStage] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would handle form submission here
    setStage(3);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (stage === 1 && formData.name && formData.email) {
      setStage(2);
    }
  };

  return (
    <div className={wireflow.page}>
      <div className={wireflow.gridBg} />
      
      {/* Wire Background */}
      <svg className={styles.wireBg} viewBox="0 0 1400 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="contactWire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C81E1E" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#C81E1E" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 500 Q350 400 700 500 T1400 400"
          stroke="url(#contactWire)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.path
          d="M0 600 Q350 700 700 600 T1400 700"
          stroke="url(#contactWire)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>

      <div className={wireflow.container}>
        {/* Header */}
        <header className={wireflow.pageHeader}>
          <div className={wireflow.breadcrumb}>
            <Link href="/">HOME</Link>
            <span className={wireflow.breadcrumbSep}>/</span>
            <span>CONTACT</span>
          </div>
          
          <div className={wireflow.pageHeaderInner}>
            <div className={wireflow.pageTitle}>
              <span className={wireflow.pageTitleCode}>// CONTACT.INIT</span>
              <h1 className={wireflow.pageTitleMain}>
                Get in <span className={wireflow.pageTitleAccent}>Touch</span>
              </h1>
              <p className={wireflow.pageDescription}>
                Ready to secure your business? Contact our team for a free security assessment or consultation.
              </p>
            </div>
            <div className={wireflow.pageNumber}>04</div>
          </div>
        </header>

        {/* Main Content */}
        <div className={styles.contactGrid}>
          {/* Left - Contact Form */}
          <motion.div 
            className={styles.formSection}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={styles.formCard}>
              {/* Form Header */}
              <div className={styles.formHeader}>
                <div className={styles.formHeaderLeft}>
                  <div className={wireflow.nodeIcon}><MessageSquare size={18} /></div>
                  <div className={styles.formHeaderInfo}>
                    <span className={styles.formHeaderTitle}>NEW REQUEST</span>
                    <span className={styles.formHeaderCode}>REQ-{new Date().getFullYear()}-XXX</span>
                  </div>
                </div>
                <div className={styles.stageTracker}>
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className={`${styles.stageStep} ${stage >= s ? styles.stageActive : ''}`}
                    >
                      {stage > s ? <CheckCircle size={14} /> : s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Indicator */}
              <div className={styles.stageIndicator}>
                <div className={styles.stageNumber}>{stage}</div>
                <div className={styles.stageInfo}>
                  <span className={styles.stageLabel}>STAGE</span>
                  <span className={styles.stageDesc}>
                    {stage === 1 ? 'Contact Info' : stage === 2 ? 'Request Details' : 'Submitted'}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className={styles.form}>
                {stage < 3 ? (
                  <>
                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          <User size={14} />
                          FULL NAME
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={styles.input}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          <Mail size={14} />
                          EMAIL
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={styles.input}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          <Building2 size={14} />
                          COMPANY
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={styles.input}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          <Shield size={14} />
                          SERVICE
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={styles.select}
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        <MessageSquare size={14} />
                        MESSAGE
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.textarea}
                        placeholder="Tell us about your project or security needs..."
                        rows={4}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <Send size={16} />
                      SUBMIT REQUEST
                    </button>
                  </>
                ) : (
                  <div className={styles.successState}>
                    <motion.div
                      className={styles.successIcon}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle size={48} />
                    </motion.div>
                    <h3 className={styles.successTitle}>Request Submitted!</h3>
                    <p className={styles.successDesc}>
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <button 
                      type="button" 
                      className={styles.resetBtn}
                      onClick={() => { setStage(1); setFormData({ name: '', email: '', company: '', service: '', message: '' }); }}
                    >
                      Submit Another Request
                    </button>
                  </div>
                )}
              </form>

              {/* Corner decorations */}
              <div className={`${wireflow.cornerDecor} ${wireflow.topLeft}`} />
              <div className={`${wireflow.cornerDecor} ${wireflow.topRight}`} />
              <div className={`${wireflow.cornerDecor} ${wireflow.bottomLeft}`} />
              <div className={`${wireflow.cornerDecor} ${wireflow.bottomRight}`} />
            </div>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div 
            className={styles.infoSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Direct Contact */}
            <div className={wireflow.nodeCard}>
              <div className={wireflow.nodeHeader}>
                <div className={wireflow.nodeIcon}><Phone size={18} /></div>
                <span className={wireflow.nodeTitle}>DIRECT CONTACT</span>
                <div className={wireflow.nodeStatus}>
                  <span className={wireflow.nodeStatusDot} />
                  24/7
                </div>
              </div>
              <div className={wireflow.nodeBody}>
                <div className={styles.contactList}>
                  {contactMethods.map((method, i) => {
                    const MethodIcon = method.icon;
                    return (
                      <motion.a
                        key={i}
                        href={method.href}
                        className={styles.contactItem}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <div className={styles.contactIcon}>
                          <MethodIcon size={18} />
                        </div>
                        <div className={styles.contactInfo}>
                          <span className={styles.contactLabel}>{method.label}</span>
                          <span className={styles.contactValue}>{method.value}</span>
                        </div>
                        <span className={styles.contactCode}>{method.code}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className={wireflow.nodeCard}>
              <div className={wireflow.nodeHeader}>
                <div className={wireflow.nodeIcon}><MapPin size={18} /></div>
                <span className={wireflow.nodeTitle}>OFFICE LOCATIONS</span>
              </div>
              <div className={wireflow.nodeBody}>
                <div className={styles.officeList}>
                  {offices.map((office, i) => (
                    <motion.div
                      key={i}
                      className={styles.officeCard}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * i }}
                    >
                      <div className={styles.officeType}>{office.type}</div>
                      <h3 className={styles.officeCity}>{office.city}</h3>
                      <span className={styles.officeCountry}>{office.country}</span>
                      <p className={styles.officeAddress}>
                        {office.address}
                        {office.zip && <>, {office.zip}</>}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className={styles.hoursCard}>
              <div className={styles.hoursHeader}>
                <Clock size={18} />
                <span>BUSINESS HOURS</span>
              </div>
              <div className={styles.hoursContent}>
                <div className={styles.hoursRow}>
                  <span>Mon - Fri</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Emergency Support</span>
                  <span className={styles.hours247}>24/7 Available</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div 
          className={styles.ctaBanner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.ctaLeft}>
            <Globe size={24} className={styles.ctaIcon} />
            <div>
              <h3 className={styles.ctaTitle}>Free Security Assessment</h3>
              <p className={styles.ctaDesc}>Get a comprehensive security review of your infrastructure</p>
            </div>
          </div>
          <a href="mailto:info@amaratechit.com?subject=Free Security Assessment Request" className={wireflow.btnPrimary}>
            <Zap size={16} />
            Request Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}
