'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Shield, Cloud, Lock, Server, Users, CheckCircle2, 
  ArrowRight, ArrowLeft, AlertTriangle, Send, User, Mail, 
  Phone, Building2, ChevronRight, FileCheck, 
  ShieldCheck, ShieldAlert, RefreshCw, Database, Wifi,
  Key, Eye, FileWarning, MonitorCheck
} from 'lucide-react';
import styles from './self-assessment.module.css';

type AssessmentCategory = {
  id: string;
  title: string;
  icon: React.ElementType;
  questions: {
    id: string;
    question: string;
    options: { value: number; label: string }[];
  }[];
};

const assessmentCategories: AssessmentCategory[] = [
  {
    id: 'access',
    title: 'Access Control',
    icon: Key,
    questions: [
      {
        id: 'mfa',
        question: 'Does your organization use multi-factor authentication (MFA) for all critical systems?',
        options: [
          { value: 0, label: 'No MFA in place' },
          { value: 1, label: 'MFA for some systems' },
          { value: 2, label: 'MFA for most systems' },
          { value: 3, label: 'MFA enforced across all systems' },
        ],
      },
      {
        id: 'password',
        question: 'How does your organization manage passwords?',
        options: [
          { value: 0, label: 'No password policy' },
          { value: 1, label: 'Basic password requirements' },
          { value: 2, label: 'Password manager + policy' },
          { value: 3, label: 'Enterprise password management with rotation' },
        ],
      },
    ],
  },
  {
    id: 'data',
    title: 'Data Protection',
    icon: Database,
    questions: [
      {
        id: 'backup',
        question: 'How often does your organization backup critical data?',
        options: [
          { value: 0, label: 'No regular backups' },
          { value: 1, label: 'Monthly backups' },
          { value: 2, label: 'Weekly backups' },
          { value: 3, label: 'Daily automated backups with testing' },
        ],
      },
      {
        id: 'encryption',
        question: 'Is your sensitive data encrypted at rest and in transit?',
        options: [
          { value: 0, label: 'No encryption' },
          { value: 1, label: 'Some encryption in place' },
          { value: 2, label: 'Encryption for most data' },
          { value: 3, label: 'Full encryption with key management' },
        ],
      },
    ],
  },
  {
    id: 'network',
    title: 'Network Security',
    icon: Wifi,
    questions: [
      {
        id: 'firewall',
        question: 'Does your organization have firewall and intrusion detection systems?',
        options: [
          { value: 0, label: 'No firewall/IDS' },
          { value: 1, label: 'Basic firewall only' },
          { value: 2, label: 'Firewall + basic monitoring' },
          { value: 3, label: 'Next-gen firewall with IDS/IPS' },
        ],
      },
      {
        id: 'segmentation',
        question: 'Is your network segmented to limit lateral movement?',
        options: [
          { value: 0, label: 'Flat network' },
          { value: 1, label: 'Basic segmentation' },
          { value: 2, label: 'VLANs for critical systems' },
          { value: 3, label: 'Zero-trust architecture' },
        ],
      },
    ],
  },
  {
    id: 'awareness',
    title: 'Security Awareness',
    icon: Users,
    questions: [
      {
        id: 'training',
        question: 'Do employees receive regular security awareness training?',
        options: [
          { value: 0, label: 'No training' },
          { value: 1, label: 'Annual training' },
          { value: 2, label: 'Quarterly training' },
          { value: 3, label: 'Continuous training with phishing simulations' },
        ],
      },
      {
        id: 'incident',
        question: 'Do employees know how to report security incidents?',
        options: [
          { value: 0, label: 'No process' },
          { value: 1, label: 'Informal process' },
          { value: 2, label: 'Documented process' },
          { value: 3, label: 'Clear process with regular drills' },
        ],
      },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Security',
    icon: Cloud,
    questions: [
      {
        id: 'cloud-config',
        question: 'Are your cloud environments configured according to security best practices?',
        options: [
          { value: 0, label: 'Default configurations' },
          { value: 1, label: 'Some hardening' },
          { value: 2, label: 'Following CIS benchmarks' },
          { value: 3, label: 'Automated compliance monitoring' },
        ],
      },
      {
        id: 'cloud-access',
        question: 'How do you manage access to cloud resources?',
        options: [
          { value: 0, label: 'Shared credentials' },
          { value: 1, label: 'Individual accounts' },
          { value: 2, label: 'IAM with basic policies' },
          { value: 3, label: 'Least-privilege IAM with regular audits' },
        ],
      },
    ],
  },
];

export default function SelfAssessmentPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  
  const [step, setStep] = useState<'intro' | 'assessment' | 'results' | 'contact'>('intro');
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalQuestions = assessmentCategories.reduce((acc, cat) => acc + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const maxScore = totalQuestions * 3;
  const currentScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
  const scorePercentage = Math.round((currentScore / maxScore) * 100);

  const getScoreLevel = () => {
    if (scorePercentage >= 80) return { level: 'Excellent', color: '#22C55E', icon: ShieldCheck };
    if (scorePercentage >= 60) return { level: 'Good', color: '#F59E0B', icon: Shield };
    if (scorePercentage >= 40) return { level: 'Needs Improvement', color: '#F97316', icon: ShieldAlert };
    return { level: 'Critical', color: '#EF4444', icon: AlertTriangle };
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const currentCategoryData = assessmentCategories[currentCategory];
  const CategoryIcon = currentCategoryData?.icon;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgNumber}>ASSESS</div>
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
              <span className={styles.metaIndex}>[SECURITY]</span>
              <span className={styles.metaLabel}>ASSESSMENT</span>
              <span className={styles.metaDivider}>—</span>
              <span className={styles.metaTitle}>Free Evaluation</span>
            </div>

            <h1 className={styles.heroTitle}>
              Self <span className={styles.titleAccent}>Assessment</span>
            </h1>
            <p className={styles.heroSubtitle}>
              We are committed to maximizing your investment through our cybersecurity and cloud solutions services. 
              Our expertise spans across a range of modern IT capabilities, including secure cloud migration, 
              advanced threat detection, and unified security protocols.
            </p>
            <p className={styles.heroSubtitle}>
              Take our free security assessment to evaluate your organization&apos;s cybersecurity posture and 
              receive personalized recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className={styles.assessmentSection}>
        <div className={styles.container}>
          <AnimatePresence mode="wait">
            {/* Intro Step */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                className={styles.introCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.introIcon}>
                  <Shield size={48} />
                </div>
                <h2>Cybersecurity Self-Assessment</h2>
                <p>
                  This assessment will help evaluate your organization&apos;s security posture across 5 key areas. 
                  It takes approximately 5 minutes to complete.
                </p>

                <div className={styles.categoryPreview}>
                  {assessmentCategories.map((cat, idx) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.id} className={styles.categoryItem}>
                        <div className={styles.categoryIcon}>
                          <Icon size={20} />
                        </div>
                        <span>{cat.title}</span>
                      </div>
                    );
                  })}
                </div>

                <button 
                  className={styles.startButton}
                  onClick={() => setStep('assessment')}
                >
                  Start Assessment
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {/* Assessment Step */}
            {step === 'assessment' && (
              <motion.div
                key="assessment"
                className={styles.assessmentCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Progress */}
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                  />
                </div>
                <div className={styles.progressText}>
                  {answeredQuestions} of {totalQuestions} questions answered
                </div>

                {/* Category Tabs */}
                <div className={styles.categoryTabs}>
                  {assessmentCategories.map((cat, idx) => {
                    const Icon = cat.icon;
                    const categoryAnswered = cat.questions.every(q => answers[q.id] !== undefined);
                    return (
                      <button
                        key={cat.id}
                        className={`${styles.categoryTab} ${currentCategory === idx ? styles.activeTab : ''} ${categoryAnswered ? styles.completedTab : ''}`}
                        onClick={() => setCurrentCategory(idx)}
                      >
                        <Icon size={18} />
                        <span>{cat.title}</span>
                        {categoryAnswered && <CheckCircle2 size={14} className={styles.checkIcon} />}
                      </button>
                    );
                  })}
                </div>

                {/* Questions */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCategory}
                    className={styles.questionsContainer}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.categoryHeader}>
                      <CategoryIcon size={24} />
                      <h3>{currentCategoryData.title}</h3>
                    </div>

                    {currentCategoryData.questions.map((question, qIdx) => (
                      <div key={question.id} className={styles.questionBlock}>
                        <p className={styles.questionText}>
                          <span className={styles.questionNumber}>{qIdx + 1}.</span>
                          {question.question}
                        </p>
                        <div className={styles.optionsGrid}>
                          {question.options.map((option) => (
                            <button
                              key={option.value}
                              className={`${styles.optionButton} ${answers[question.id] === option.value ? styles.selectedOption : ''}`}
                              onClick={() => handleAnswer(question.id, option.value)}
                            >
                              <div className={styles.optionRadio}>
                                {answers[question.id] === option.value && <div className={styles.optionDot} />}
                              </div>
                              <span>{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className={styles.navButtons}>
                  <button
                    className={styles.navButton}
                    onClick={() => setCurrentCategory(prev => prev - 1)}
                    disabled={currentCategory === 0}
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>

                  {currentCategory < assessmentCategories.length - 1 ? (
                    <button
                      className={styles.navButtonPrimary}
                      onClick={() => setCurrentCategory(prev => prev + 1)}
                    >
                      Next
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      className={styles.navButtonPrimary}
                      onClick={() => setStep('results')}
                      disabled={answeredQuestions < totalQuestions}
                    >
                      View Results
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Results Step */}
            {step === 'results' && (
              <motion.div
                key="results"
                className={styles.resultsCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.scoreSection}>
                  <div 
                    className={styles.scoreCircle}
                    style={{ '--score-color': getScoreLevel().color } as React.CSSProperties}
                  >
                    <div className={styles.scoreValue}>{scorePercentage}%</div>
                    <div className={styles.scoreLabel}>Security Score</div>
                  </div>
                  
                  <div className={styles.scoreInfo}>
                    <div className={styles.scoreLevelBadge} style={{ background: getScoreLevel().color }}>
                      {React.createElement(getScoreLevel().icon, { size: 18 })}
                      <span>{getScoreLevel().level}</span>
                    </div>
                    <p className={styles.scoreDescription}>
                      {scorePercentage >= 80 && "Your organization has strong security practices in place. Continue maintaining these standards."}
                      {scorePercentage >= 60 && scorePercentage < 80 && "Good foundation, but there are areas that could benefit from improvement."}
                      {scorePercentage >= 40 && scorePercentage < 60 && "Several security gaps identified. We recommend addressing these promptly."}
                      {scorePercentage < 40 && "Critical security improvements needed. Contact us for immediate assistance."}
                    </p>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className={styles.breakdownSection}>
                  <h3>Category Breakdown</h3>
                  <div className={styles.breakdownGrid}>
                    {assessmentCategories.map(cat => {
                      const Icon = cat.icon;
                      const catScore = cat.questions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
                      const catMax = cat.questions.length * 3;
                      const catPercent = Math.round((catScore / catMax) * 100);
                      return (
                        <div key={cat.id} className={styles.breakdownItem}>
                          <div className={styles.breakdownHeader}>
                            <Icon size={18} />
                            <span>{cat.title}</span>
                            <span className={styles.breakdownScore}>{catPercent}%</span>
                          </div>
                          <div className={styles.breakdownBar}>
                            <div 
                              className={styles.breakdownFill}
                              style={{ width: `${catPercent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.resultsActions}>
                  <button
                    className={styles.retakeButton}
                    onClick={() => {
                      setAnswers({});
                      setCurrentCategory(0);
                      setStep('intro');
                    }}
                  >
                    <RefreshCw size={16} />
                    Retake Assessment
                  </button>
                  <button
                    className={styles.contactButton}
                    onClick={() => setStep('contact')}
                  >
                    Get Expert Consultation
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Contact Step */}
            {step === 'contact' && (
              <motion.div
                key="contact"
                className={styles.contactCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2>Get Your Detailed Security Report</h2>
                <p>Our experts will analyze your results and provide personalized recommendations.</p>

                {submitted ? (
                  <div className={styles.successMessage}>
                    <CheckCircle2 size={48} />
                    <h3>Thank you!</h3>
                    <p>We&apos;ll send your detailed report and contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label><User size={14} /> Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label><Mail size={14} /> Email</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label><Phone size={14} /> Phone</label>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label><Building2 size={14} /> Company</label>
                        <input
                          type="text"
                          placeholder="Company name"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : (
                        <>
                          <Send size={16} />
                          Send Report Request
                        </>
                      )}
                    </button>
                  </form>
                )}

                <button 
                  className={styles.backButton}
                  onClick={() => setStep('results')}
                >
                  <ArrowLeft size={16} />
                  Back to Results
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
