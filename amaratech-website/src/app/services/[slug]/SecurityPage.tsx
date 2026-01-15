'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, Lock, Eye, AlertTriangle, Server, Mail, 
  User, Globe, ArrowRight, Database, Key, Zap,
  CheckCircle, XCircle, Monitor, Wifi, FileWarning
} from 'lucide-react';
import styles from './security.module.css';

const securityServices = [
  {
    icon: Eye,
    title: '24/7 Threat Monitoring',
    description: 'Continuous surveillance of your systems to detect and respond to threats in real-time.',
  },
  {
    icon: Shield,
    title: 'Data Protection',
    description: 'Comprehensive encryption and access controls to safeguard your sensitive information.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description: 'Rapid response team ready to contain and remediate security incidents.',
  },
  {
    icon: Lock,
    title: 'Penetration Testing',
    description: 'Identify vulnerabilities before attackers do with our ethical hacking services.',
  },
  {
    icon: FileWarning,
    title: 'Security Audits',
    description: 'Thorough assessment of your security posture with actionable recommendations.',
  },
  {
    icon: User,
    title: 'Security Training',
    description: 'Empower your team to recognize and prevent social engineering attacks.',
  },
];

const attackSteps = [
  {
    id: 1,
    title: 'Attacker Sends Phishing Email',
    description: 'A well-crafted spear phishing email harvesting 2FA login credentials',
    icon: Mail,
    position: 'left',
  },
  {
    id: 2,
    title: 'Victim Clicks Phishing URL',
    description: 'Victim opens email and clicks on the phishing URL similar to AmaraTech SSO Page',
    icon: User,
    position: 'left',
  },
  {
    id: 3,
    title: 'Credentials Captured',
    description: 'Attacker server captures credentials and logs into the victim\'s mail server',
    icon: Database,
    position: 'right',
  },
  {
    id: 4,
    title: 'Redirect to Original SSO',
    description: 'After successful login, attacker sends redirect to original SSO webpage',
    icon: Globe,
    position: 'center',
  },
  {
    id: 5,
    title: 'Post-Login Cookie Captured',
    description: 'Attacker server also captures post-login session cookie',
    icon: Key,
    position: 'right',
  },
  {
    id: 6,
    title: 'Account Compromised',
    description: 'Attacker reuses the saved cookie to login from a different location',
    icon: Monitor,
    position: 'right',
  },
];

export default function SecurityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const attackRef = useRef<HTMLDivElement>(null);
  const attackInView = useInView(attackRef, { once: true, margin: '-50px' });

  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-advance attack animation
  useEffect(() => {
    if (!attackInView || !isAnimating) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= attackSteps.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [attackInView, isAnimating]);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgText}>SECURITY</div>
          <div className={styles.heroGrid} />
          <div className={styles.heroGlow} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroBadge}>
              <Shield size={16} />
              Enterprise Security
            </div>
            <h1 className={styles.heroTitle}>
              Protect Your Business with <span className={styles.titleAccent}>Advanced Cyber Security</span>
            </h1>
            <p className={styles.heroDescription}>
              24/7 threat monitoring, incident response, and comprehensive security services 
              to safeguard your digital assets from evolving cyber threats.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryButton}>
                Get Security Assessment
                <ArrowRight size={18} />
              </Link>
              <Link href="/self-assessment" className={styles.secondaryButton}>
                Take Self Assessment
              </Link>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.shieldIcon}>
              <Shield size={80} />
              <div className={styles.shieldPulse} />
              <div className={styles.shieldPulse2} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className={styles.servicesSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2>Our Security Services</h2>
            <p>Comprehensive protection for your organization</p>
          </motion.div>

          <div className={styles.servicesGrid}>
            {securityServices.map((service, index) => (
              <motion.div
                key={service.title}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.serviceIcon}>
                  <service.icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attack Flow Animation Section */}
      <section ref={attackRef} className={styles.attackSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={attackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.warningBadge}>
              <AlertTriangle size={16} />
              Understanding the Threat
            </div>
            <h2>Hacking Humans with AI as a Service</h2>
            <p>See how modern phishing attacks work - and why security awareness matters</p>
          </motion.div>

          {/* Attack Flow Diagram */}
          <div className={styles.attackDiagram}>
            {/* Attack Flow Visualization */}
            <div className={styles.attackFlow}>
              {/* Attacker Side */}
              <motion.div
                className={styles.attackerNode}
                initial={{ opacity: 0, x: -50 }}
                animate={attackInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={`${styles.nodeIcon} ${styles.attackerIcon}`}>
                  <User size={32} />
                </div>
                <span>Attacker</span>
              </motion.div>

              {/* Center Flow */}
              <div className={styles.flowCenter}>
                {attackSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`${styles.flowStep} ${activeStep === index ? styles.activeStep : ''} ${activeStep > index ? styles.completedStep : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={attackInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    onClick={() => {
                      setActiveStep(index);
                      setIsAnimating(false);
                    }}
                  >
                    <div className={styles.stepNumber}>{step.id}</div>
                    <div className={styles.stepIcon}>
                      <step.icon size={20} />
                    </div>
                    <div className={styles.stepContent}>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                    {activeStep === index && (
                      <motion.div
                        className={styles.stepIndicator}
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Victim Side */}
              <motion.div
                className={styles.victimNode}
                initial={{ opacity: 0, x: 50 }}
                animate={attackInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={`${styles.nodeIcon} ${styles.victimIcon}`}>
                  <Monitor size={32} />
                </div>
                <span>Victim</span>
              </motion.div>
            </div>

            {/* Animated Connection Lines */}
            <svg className={styles.connectionLines} viewBox="0 0 1000 400" preserveAspectRatio="none">
              <motion.path
                d="M100,200 C300,200 300,100 500,100"
                stroke="url(#attackGradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={attackInView && activeStep >= 0 ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M500,100 C700,100 700,200 900,200"
                stroke="url(#attackGradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={attackInView && activeStep >= 2 ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.path
                d="M900,200 C700,200 700,300 500,300"
                stroke="url(#warningGradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={attackInView && activeStep >= 4 ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 1.1 }}
              />
              <defs>
                <linearGradient id="attackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C81E1E" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
                <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
            </svg>

            {/* Warning Message */}
            <motion.div
              className={styles.warningMessage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={attackInView && activeStep === 5 ? { opacity: 1, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <XCircle size={24} />
              <span>Boom! You are hacked!!</span>
            </motion.div>
          </div>

          {/* Controls */}
          <div className={styles.attackControls}>
            <button
              className={styles.controlButton}
              onClick={() => {
                setActiveStep(0);
                setIsAnimating(true);
              }}
            >
              <Zap size={16} />
              Restart Animation
            </button>
            <div className={styles.stepIndicators}>
              {attackSteps.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.stepDot} ${activeStep === index ? styles.activeDot : ''}`}
                  onClick={() => {
                    setActiveStep(index);
                    setIsAnimating(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protection CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.ctaContent}>
              <CheckCircle size={48} className={styles.ctaIcon} />
              <h2>Don&apos;t Be the Next Victim</h2>
              <p>
                Protect your organization from sophisticated phishing attacks and other cyber threats.
                Our security experts are ready to help you build a robust defense strategy.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className={styles.primaryButton}>
                  Schedule a Consultation
                  <ArrowRight size={18} />
                </Link>
                <Link href="/self-assessment" className={styles.outlineButton}>
                  Free Security Assessment
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
