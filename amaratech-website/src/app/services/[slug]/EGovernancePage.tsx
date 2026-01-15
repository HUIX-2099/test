'use client';

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  Building2, Shield, Users, Globe, 
  CheckCircle, Send, User, Mail, Phone, 
  MessageSquare, FileText, Fingerprint, 
  UserCheck, Layout, GraduationCap, 
  Workflow, Server, Key, ScanFace
} from "lucide-react";
import styles from '../services.module.css';

export default function EGovernancePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const identityInView = useInView(identityRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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

  const egovServices = [
    { 
      icon: Fingerprint, 
      title: 'Digital Identity Management', 
      desc: 'Implementation of secure digital identity solutions for citizens and government services.' 
    },
    { 
      icon: Users, 
      title: 'Citizen Engagement Platforms', 
      desc: 'Interactive platforms that connect citizens with government services seamlessly.' 
    },
    { 
      icon: Layout, 
      title: 'Web Portal Development', 
      desc: 'Custom government portals for efficient service delivery and information access.' 
    },
    { 
      icon: GraduationCap, 
      title: 'Training and Capacity Building', 
      desc: 'Comprehensive training programs for government staff on digital systems.' 
    },
    { 
      icon: Workflow, 
      title: 'Workflow Automation', 
      desc: 'Streamlined processes that reduce paperwork and improve efficiency.' 
    },
    { 
      icon: Server, 
      title: 'Infrastructure Management', 
      desc: 'Robust IT infrastructure setup and management for government operations.' 
    },
  ];

  const identityFeatures = [
    { 
      icon: Fingerprint, 
      title: 'Secure Digital Identity', 
      desc: 'Implementation of secure digital identity solutions for all stakeholders.' 
    },
    { 
      icon: Key, 
      title: 'Authentication Services', 
      desc: 'Robust authentication and authorization services for secure access.' 
    },
    { 
      icon: ScanFace, 
      title: 'Biometric Systems', 
      desc: 'Advanced biometric and multi-factor authentication systems.' 
    },
  ];

  return (
    <div className={styles.azurePage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.azureHero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgNumber}>E-GOV</div>
          <div className={styles.heroGrid} />
        </div>
        
        <div className={styles.heroContainer}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroMeta}>
              <span className={styles.metaIndex}>[04]</span>
              <span className={styles.metaLabel}>SERVICE</span>
              <span className={styles.metaDivider}>—</span>
              <span className={styles.metaTitle}>Digital Government</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              E-<span className={styles.titleAccent}>Governance</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Let us help simplify your business operations with our E-governance services.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.heroImage}
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image 
              src="/other_images/egorvance.png" 
              alt="E-Governance Solutions" 
              width={600} 
              height={500}
              className={styles.heroImg}
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className={styles.introSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>DIGITAL TRANSFORMATION FOR GOVERNMENT</span>
            <h2 className={styles.sectionTitle}>
              Simplify Operations, Enhance<br/>
              <span className={styles.titleAccent}>Citizen Services.</span>
            </h2>
          </motion.div>

          <motion.div 
            className={styles.introContent}
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className={styles.introText}>
              We make it easy to manage your operations, such as licensing, compliance, and reporting processes, 
              training and capacity building and more, so you can focus on growing your business while we take 
              care of the paperwork and government interactions.
            </p>
            <p className={styles.introText}>
              Our comprehensive e-governance solutions help government agencies modernize their operations, 
              improve citizen engagement, and deliver services more efficiently and transparently.
            </p>
          </motion.div>

          {/* Cloud Visual */}
          <motion.div
            className={styles.cloudVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={introInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image 
              src="/other_images/clouds.png" 
              alt="Cloud Technology" 
              width={400} 
              height={200}
              className={styles.cloudImg}
            />
          </motion.div>
        </div>
      </section>

      {/* E-Governance Services Section */}
      <section ref={servicesRef} className={styles.migrationSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.migrationHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>E-GOVERNANCE SERVICES</span>
            <h2 className={styles.sectionTitle}>
              Comprehensive Solutions for<br/>
              <span className={styles.titleAccent}>Modern Government.</span>
            </h2>
          </motion.div>

          {/* Services Grid */}
          <div className={styles.strategyGrid}>
            {egovServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className={styles.strategyCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className={styles.strategyIcon}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.strategyTitle}>{service.title}</h3>
                  <p className={styles.strategyDesc}>{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Digital Identity Section */}
      <section ref={identityRef} className={styles.m365Section}>
        <div className={styles.container}>
          <div className={styles.m365Content}>
            <motion.div 
              className={styles.m365Text}
              initial={{ opacity: 0, x: -30 }}
              animate={identityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.sectionLabel}>DIGITAL IDENTITY MANAGEMENT</span>
              <h2 className={styles.sectionTitle}>
                Secure, Reliable Identity Solutions for
                <span className={styles.titleAccent}> Government Services.</span>
              </h2>
              <p className={styles.m365Desc}>
                Implementation of secure digital identity solutions that enable seamless authentication 
                and authorization across all government platforms and services.
              </p>
              <p className={styles.m365Desc}>
                Our identity management systems incorporate the latest security standards, including 
                biometric verification and multi-factor authentication, ensuring citizen data remains 
                protected while enabling convenient access to services.
              </p>
              
              <div className={styles.m365Features}>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>Secure Authentication</span>
                </div>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>Biometric Systems</span>
                </div>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>Multi-factor Auth</span>
                </div>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>Data Protection</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.m365Visual}
              initial={{ opacity: 0, x: 30 }}
              animate={identityInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.identityCard}>
                <div className={styles.m365CardHeader}>
                  <Shield size={24} />
                  <span>Identity Services</span>
                </div>
                <div className={styles.identityFeatures}>
                  {identityFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className={styles.identityFeature}>
                        <div className={styles.identityFeatureIcon}>
                          <Icon size={24} />
                        </div>
                        <div className={styles.identityFeatureText}>
                          <span className={styles.identityFeatureTitle}>{feature.title}</span>
                          <span className={styles.identityFeatureDesc}>{feature.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className={styles.contactSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.contactHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>GET IN TOUCH</span>
            <h2 className={styles.sectionTitle}>
              Ready to modernize your government services?
            </h2>
            <p className={styles.contactSubtext}>
              Contact us today to discuss your e-governance needs and start your digital transformation journey.
            </p>
          </motion.div>

          <motion.form 
            className={styles.contactForm}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {submitted ? (
              <div className={styles.successMessage}>
                <CheckCircle size={48} />
                <h3>Thank you for your message!</h3>
                <p>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <User size={16} />
                      Name
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <Mail size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      className={styles.formInput}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <Phone size={16} />
                      Phone
                    </label>
                    <input
                      type="tel"
                      className={styles.formInput}
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FileText size={16} />
                      Subject
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <MessageSquare size={16} />
                    Message
                  </label>
                  <textarea
                    className={styles.formTextarea}
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
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
