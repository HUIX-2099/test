'use client';

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  Cloud, Shield, Server, Database, Cpu, Settings, 
  CheckCircle, Send, User, Mail, Phone, 
  MessageSquare, FileText, Zap, TrendingUp,
  Lock, DollarSign, Users, Rocket, Code,
  RefreshCw, Link2, ArrowRight, Layers
} from "lucide-react";
import styles from '../services.module.css';

export default function CloudPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const strategyInView = useInView(strategyRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
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

  const strategyItems = [
    { 
      index: '01', 
      icon: CheckCircle, 
      title: 'Cloud Readiness Assessment', 
      desc: 'Moving to the cloud can be a complex process. Our team can perform a comprehensive assessment of your current IT infrastructure, business processes, and applications to determine your readiness for the cloud.' 
    },
    { 
      index: '02', 
      icon: Layers, 
      title: 'Cloud Migration Planning', 
      desc: 'Migrating to the cloud requires careful planning and execution to minimize disruption to your business operations. Our team can work with you to develop a detailed migration plan that ensures a smooth and seamless transition.' 
    },
    { 
      index: '03', 
      icon: Lock, 
      title: 'Cloud Security and Compliance', 
      desc: 'We know that security and compliance are critical considerations when it comes to the cloud. Our team can help you assess and mitigate security risks and ensure that your cloud infrastructure is compliant with regulations.' 
    },
    { 
      index: '04', 
      icon: DollarSign, 
      title: 'Cloud Cost Optimization', 
      desc: 'Managing cloud costs can be a challenge. We ensure you\'re getting the most value from your cloud investments by identifying cost-saving opportunities and developing a cost management strategy.' 
    },
    { 
      index: '05', 
      icon: Users, 
      title: 'Cloud Vendor Selection', 
      desc: 'We know that selecting the right cloud vendor is crucial to the success of your cloud strategy. Our team can help you evaluate different cloud vendors and make an informed decision based on your requirements.' 
    },
    { 
      index: '06', 
      icon: Rocket, 
      title: 'Drive Innovation', 
      desc: 'We help you minimize negative impacts to business continuity, and reduce the time required for your migration. Deploy virtual machines, modernize applications, and develop apps across cloud and hybrid environments.' 
    },
  ];

  const cloudServices = [
    { icon: Code, title: 'Development', desc: 'Custom cloud application development' },
    { icon: TrendingUp, title: 'Optimization', desc: 'Performance and cost optimization' },
    { icon: Link2, title: 'Integration', desc: 'Seamless system integrations' },
    { icon: RefreshCw, title: 'Migration', desc: 'Smooth cloud migrations' },
    { icon: Settings, title: 'Support & Maintenance', desc: '24/7 support services' },
  ];

  return (
    <div className={styles.azurePage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.azureHero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgNumber}>CLOUD</div>
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
              <span className={styles.metaIndex}>[01]</span>
              <span className={styles.metaLabel}>SERVICE</span>
              <span className={styles.metaDivider}>—</span>
              <span className={styles.metaTitle}>Cloud Technology</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Cloud <span className={styles.titleAccent}>Solutions</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Ensure you&apos;re using the most secure and accessible Technology.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.heroImage}
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image 
              src="/other_images/cloud-application-as-a-service-1-min.png" 
              alt="Cloud Solutions" 
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
            <span className={styles.sectionLabel}>INNOVATE YOUR DIGITAL ENTERPRISE WITH OUR CLOUD EXPERIENCE</span>
            <h2 className={styles.sectionTitle}>
              Dream, Build, and Transform with our<br/>
              <span className={styles.titleAccent}>Cloud Solutions.</span>
            </h2>
          </motion.div>

          <motion.div 
            className={styles.introContent}
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className={styles.introText}>
              Migrating your business to cloud technology requires careful planning and execution. 
              With AmaraTech IT Cloud Strategy & Assessment services, you can embark on your cloud journey. 
              Whether you&apos;d like to move your business over to the cloud or are seeking support for current 
              cloud technologies you use, we can help you meet your business goals and save time and money 
              with our bespoke cloud IT services.
            </p>
            <p className={styles.introText}>
              Build apps faster, make smarter business decisions, and connect people anywhere.
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

      {/* Cloud Strategy Section */}
      <section ref={strategyRef} className={styles.migrationSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.migrationHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={strategyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>OUR CLOUD STRATEGY & ASSESSMENT</span>
            <h2 className={styles.sectionTitle}>
              Delivering solutions for business and maximizing value<br/>
              <span className={styles.titleAccent}>while excelling at the basics.</span>
            </h2>
          </motion.div>

          {/* Strategy Grid */}
          <div className={styles.strategyGrid}>
            {strategyItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className={styles.strategyCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={strategyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className={styles.strategyIndex}>{item.index}</div>
                  <div className={styles.strategyIcon}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.strategyTitle}>{item.title}</h3>
                  <p className={styles.strategyDesc}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cloud Application as a Service Section */}
      <section ref={servicesRef} className={styles.m365Section}>
        <div className={styles.container}>
          <div className={styles.m365Content}>
            <motion.div 
              className={styles.m365Text}
              initial={{ opacity: 0, x: -30 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.sectionLabel}>CLOUD APPLICATION AS A SERVICE</span>
              <h2 className={styles.sectionTitle}>
                Bespoke cloud solutions that drive innovation,
                <span className={styles.titleAccent}> agility, and cost-efficiency.</span>
              </h2>
              <p className={styles.m365Desc}>
                Are you tired of the daunting task of developing cloud-based applications that optimize productivity? 
                Look no further than AmaraTech IT. Our Cloud Application Services take care of the entire process, 
                allowing businesses to focus on their core functions.
              </p>
              <p className={styles.m365Desc}>
                Our skilled team is committed to designing, developing, and deploying bespoke cloud solutions 
                that drive innovation, agility, and cost-efficiency across your organization.
              </p>
              
              <div className={styles.m365Features}>
                {cloudServices.slice(0, 4).map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <div key={idx} className={styles.m365Feature}>
                      <Icon size={18} />
                      <span>{service.title}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              className={styles.m365Visual}
              initial={{ opacity: 0, x: 30 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.servicesCard}>
                <div className={styles.m365CardHeader}>
                  <Cloud size={24} />
                  <span>Cloud Services</span>
                </div>
                <div className={styles.servicesList}>
                  {cloudServices.map((service, idx) => {
                    const Icon = service.icon;
                    return (
                      <div key={idx} className={styles.serviceItem}>
                        <div className={styles.serviceItemIcon}>
                          <Icon size={18} />
                        </div>
                        <div className={styles.serviceItemText}>
                          <span className={styles.serviceItemTitle}>{service.title}</span>
                          <span className={styles.serviceItemDesc}>{service.desc}</span>
                        </div>
                        <ArrowRight size={16} className={styles.serviceItemArrow} />
                      </div>
                    );
                  })}
                </div>
                <button className={styles.getStartedBtn}>
                  <span>Get Started Now</span>
                  <ArrowRight size={16} />
                </button>
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
              Ready to transform your business with cloud technology?
            </h2>
            <p className={styles.contactSubtext}>
              Contact us today to discuss your cloud strategy and start your digital transformation journey.
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
