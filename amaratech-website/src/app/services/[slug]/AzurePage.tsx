'use client';

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  Cloud, Shield, Server, Database, Cpu, Settings, 
  CheckCircle, Send, User, Mail, Phone, 
  MessageSquare, FileText, Layers, Zap,
  Monitor, Globe
} from "lucide-react";
import styles from '../services.module.css';

export default function AzurePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const migrationRef = useRef<HTMLDivElement>(null);
  const m365Ref = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const migrationInView = useInView(migrationRef, { once: true, margin: "-100px" });
  const m365InView = useInView(m365Ref, { once: true, margin: "-100px" });
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
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const azureFeatures = [
    { icon: Cloud, title: 'Azure App Service', desc: 'Build and host web apps, mobile backends, and RESTful APIs' },
    { icon: Cpu, title: 'Machine Learning', desc: 'Build, train, and deploy machine learning models at scale' },
    { icon: Zap, title: 'Azure Functions', desc: 'Event-driven serverless compute platform' },
    { icon: Settings, title: 'Azure DevOps', desc: 'Development collaboration tools for planning and shipping' },
    { icon: Layers, title: 'Logic Apps', desc: 'Automate workflows and integrate apps, data, and services' },
    { icon: Server, title: 'Virtual Machines', desc: 'Provision Windows and Linux virtual machines in seconds' },
  ];

  const migrationIcons = [
    { icon: Database, label: 'Data Migration' },
    { icon: Shield, label: 'Security' },
    { icon: Cloud, label: 'Cloud Storage' },
    { icon: Server, label: 'Infrastructure' },
    { icon: Cpu, label: 'Compute' },
    { icon: Globe, label: 'Global Scale' },
  ];

  return (
    <div className={styles.azurePage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.azureHero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgNumber}>AZURE</div>
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
              <span className={styles.metaIndex}>[03]</span>
              <span className={styles.metaLabel}>SERVICE</span>
              <span className={styles.metaDivider}>—</span>
              <span className={styles.metaTitle}>Microsoft Partner</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Microsoft <span className={styles.titleAccent}>Azure</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Elevating your business to new horizons of efficiency, security, and success.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.heroImage}
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image 
              src="/other_images/asure_page.png" 
              alt="Azure Cloud Services" 
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
            <span className={styles.sectionLabel}>INTRODUCING THE POWER OF AMARATECH IT AND MICROSOFT AZURE</span>
            <h2 className={styles.sectionTitle}>
              Unlocking Limitless Possibilities with<br/>
              <span className={styles.titleAccent}>Microsoft Azure.</span>
            </h2>
          </motion.div>

          <motion.div 
            className={styles.introContent}
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className={styles.introText}>
              At AmaraTech IT Solutions, we are proud to announce our strategic partnership with Microsoft, 
              a collaboration designed to revolutionize the way businesses embrace cloud technology. Through 
              this powerful alliance, we bring you the unparalleled capabilities of Microsoft Azure, coupled 
              with AmaraTech IT expert consulting services.
            </p>
            <p className={styles.introText}>
              With Azure you can create cross platform experiences for your end users supporting Azure App Service, 
              and Machine Learning. You can build scalable and web workloads that are custom to your business 
              utilizing Azure Functions, Azure DevOps and Logic Apps. You can drive innovation for your existing 
              applications and products by using Azure Virtual Machines, Azure Kubernetes Service, and Synapse Analytics. 
              Let AmaraTech leverage Azure tools to improve your operations.
            </p>
          </motion.div>

          {/* Azure Features Grid */}
          <div className={styles.featuresGrid}>
            {azureFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={introInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className={styles.featureIcon}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Azure Migration Section */}
      <section ref={migrationRef} className={styles.migrationSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.migrationHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={migrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>AZURE MIGRATION</span>
            <h2 className={styles.sectionTitle}>
              Looking for an Azure Partner to help you migrate your data?<br/>
              <span className={styles.titleAccent}>You&apos;ve come to the right Team.</span>
            </h2>
          </motion.div>

          {/* Migration Icons */}
          <div className={styles.migrationGrid}>
            {migrationIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className={styles.migrationIcon}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={migrationInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className={styles.iconCircle}>
                    <Icon size={32} />
                  </div>
                  <span className={styles.iconLabel}>{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Microsoft 365 Section */}
      <section ref={m365Ref} className={styles.m365Section}>
        <div className={styles.container}>
          <div className={styles.m365Content}>
            <motion.div 
              className={styles.m365Text}
              initial={{ opacity: 0, x: -30 }}
              animate={m365InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.sectionLabel}>MICROSOFT 365</span>
              <h2 className={styles.sectionTitle}>
                A complete, intelligent solution that empowers everyone to be creative and work together, 
                <span className={styles.titleAccent}> securely.</span>
              </h2>
              <p className={styles.m365Desc}>
                Boost productivity with Microsoft Word, Excel, PowerPoint, Microsoft Teams, and more—all in one place.
              </p>
              <p className={styles.m365Desc}>
                We will help you build a comprehensive migration strategy that assist you in harnessing the power of 
                Microsoft 365. This will ensure that your environment post migration can hit the ground running. 
                Additionally, our team will coordinate Microsoft solutions across complex hybrid IT environments – 
                and ease the burden of security configuration, maintenance, and support.
              </p>
              
              <div className={styles.m365Features}>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>Word, Excel, PowerPoint</span>
                </div>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>Microsoft Teams</span>
                </div>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>SharePoint & OneDrive</span>
                </div>
                <div className={styles.m365Feature}>
                  <CheckCircle size={18} />
                  <span>Enterprise Security</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.m365Visual}
              initial={{ opacity: 0, x: 30 }}
              animate={m365InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.m365Card}>
                <div className={styles.m365CardHeader}>
                  <Monitor size={24} />
                  <span>Microsoft 365</span>
                </div>
                <div className={styles.m365CardApps}>
                  <div className={styles.appIcon} style={{ background: '#185ABD' }}>W</div>
                  <div className={styles.appIcon} style={{ background: '#107C41' }}>X</div>
                  <div className={styles.appIcon} style={{ background: '#C43E1C' }}>P</div>
                  <div className={styles.appIcon} style={{ background: '#5059C9' }}>T</div>
                </div>
                <div className={styles.m365CardStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>99.9%</span>
                    <span className={styles.statLabel}>Uptime SLA</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>300M+</span>
                    <span className={styles.statLabel}>Users Worldwide</span>
                  </div>
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
              For any questions regarding our products or services, our dedicated customer support team is here to assist you.
            </h2>
            <p className={styles.contactSubtext}>
              Feel free to reach out to us via email or phone, and we will respond as soon as possible.
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
