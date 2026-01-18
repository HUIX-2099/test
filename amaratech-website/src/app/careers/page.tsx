'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Briefcase, MapPin, Clock, ArrowRight, Send, 
  User, Mail, Phone, FileText, MessageSquare,
  Building2, Users, Rocket, Heart
} from 'lucide-react';
import styles from './careers.module.css';

type JobOpening = {
  id: string;
  title: string;
  status: string;
  location: string;
};

const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Business Strategist',
    status: 'Full-Time',
    location: 'Remote / Hybrid',
  },
  {
    id: '2',
    title: 'Senior Network Engineer',
    status: 'Full-Time',
    location: 'Remote / Hybrid',
  },
  {
    id: '3',
    title: 'Procurement Officer',
    status: 'Full-Time',
    location: 'Remote / Hybrid',
  },
  {
    id: '4',
    title: 'Senior Cloud Data Architect',
    status: 'Full-Time',
    location: 'Remote / Hybrid',
  },
  {
    id: '5',
    title: 'Marketing Associate',
    status: 'Full-Time',
    location: 'Remote / Hybrid',
  },
  {
    id: '6',
    title: 'Cloud Security Engineer',
    status: 'Full-Time',
    location: 'Remote / Hybrid',
  },
];

const benefits = [
  { icon: Building2, title: 'Flexible Work', description: 'Remote and hybrid options available' },
  { icon: Users, title: 'Great Team', description: 'Collaborate with industry experts' },
  { icon: Rocket, title: 'Growth', description: 'Career development opportunities' },
  { icon: Heart, title: 'Benefits', description: 'Comprehensive health & wellness' },
];

export default function CareersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const jobsRef = useRef<HTMLDivElement>(null);
  const jobsInView = useInView(jobsRef, { once: true, margin: '-100px' });
  const contactRef = useRef<HTMLDivElement>(null);
  const contactInView = useInView(contactRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/other_images/career-banner.png"
            alt="Careers at AmaraTech"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroMeta}>
              <span className={styles.metaIndex}>[CAREERS]</span>
              <span className={styles.metaDivider}>—</span>
              <span className={styles.metaLabel}>JOIN OUR TEAM</span>
            </div>

            <h1 className={styles.heroTitle}>
              Work <span className={styles.titleAccent}>With Us</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Join our team for growth, innovation, and success.
            </p>
          </motion.div>
        </div>

        {/* Decorative clouds */}
        <div className={styles.cloudsDecor}>
          <Image
            src="/other_images/clouds.png"
            alt=""
            width={200}
            height={120}
            className={styles.cloudImage}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  className={styles.benefitCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className={styles.benefitIcon}>
                    <Icon size={24} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section ref={jobsRef} className={styles.jobsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={jobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>Current Openings</h2>
            <p>Explore opportunities to join our growing team</p>
          </motion.div>

          <div className={styles.jobsGrid}>
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                className={styles.jobCard}
                initial={{ opacity: 0, y: 30 }}
                animate={jobsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.jobHeader}>
                  <div className={styles.jobIcon}>
                    <Briefcase size={20} />
                  </div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                </div>

                <div className={styles.jobDetails}>
                  <div className={styles.jobDetail}>
                    <span className={styles.detailLabel}>Status:</span>
                    <span className={styles.statusBadge}>
                      <Clock size={12} />
                      {job.status}
                    </span>
                  </div>
                  <div className={styles.jobDetail}>
                    <span className={styles.detailLabel}>Location:</span>
                    <span className={styles.locationBadge}>
                      <MapPin size={12} />
                      {job.location}
                    </span>
                  </div>
                </div>

                <button className={styles.applyButton}>
                  Apply Now
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactWrapper}>
            <motion.div
              className={styles.contactInfo}
              initial={{ opacity: 0, x: -30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2>Get in Touch</h2>
              <p>
                For any questions regarding our products or services, our dedicated 
                customer support team is here to assist you. Feel free to reach out 
                to us via email or phone, and we will respond as soon as possible.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <Mail size={18} />
                  <span>info@amaratechit.com</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={18} />
                  <span>+1 410 855 2206</span>
                </div>
              </div>

              {/* Decorative illustration */}
              <div className={styles.illustration}>
                <Image
                  src="/other_images/clouds.png"
                  alt=""
                  width={180}
                  height={100}
                />
              </div>
            </motion.div>

            <motion.div
              className={styles.contactForm}
              initial={{ opacity: 0, x: 30 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <Send size={32} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>
                      <User size={14} />
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>
                        <Mail size={14} />
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>
                        <Phone size={14} />
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <FileText size={14} />
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      <MessageSquare size={14} />
                      Message
                    </label>
                    <textarea
                      placeholder="Your message..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send size={16} />
                        Send
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
