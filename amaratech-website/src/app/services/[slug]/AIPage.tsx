'use client';

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Brain, Sparkles, Zap, TrendingUp, Shield, Users, 
  CheckCircle, Send, User, Mail, MessageSquare,
  FileSearch, Video, BarChart3, Database, 
  Search, LineChart, Cpu, Settings, 
  HeartPulse, Building2, GraduationCap, Landmark,
  Bot, FileText, Calculator, Briefcase, Scale,
  ChevronDown, ArrowRight, Target, Rocket,
  Globe, AlertTriangle, FileCode, Fingerprint, ExternalLink
} from "lucide-react";
import { FaGoogle, FaReddit, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from '../services.module.css';

export default function AIPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const threatIntelRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const whyUsInView = useInView(whyUsRef, { once: true, margin: "-100px" });
  const industriesInView = useInView(industriesRef, { once: true, margin: "-100px" });
  const agentsInView = useInView(agentsRef, { once: true, margin: "-100px" });
  const threatIntelInView = useInView(threatIntelRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeAgent, setActiveAgent] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const stats = [
    { value: '95', suffix: '%', label: 'Client satisfaction rate' },
    { value: '70', suffix: '%', label: 'Business Automation' },
    { value: '3.2', suffix: 'x', label: 'Faster Time-to-market' },
  ];

  const aiServices = [
    { icon: FileSearch, title: 'AI-powered document & video analysis', desc: 'Uncover hidden insights from documents and videos' },
    { icon: BarChart3, title: 'Smart leads sentiment analyzer', desc: 'Enhance customer engagement with sentiment analysis' },
    { icon: Search, title: 'Intelligent business information retrieval', desc: 'Simplify complex information access' },
    { icon: LineChart, title: 'Real-time data extraction and visualization', desc: 'Enable faster, data-driven strategies' },
  ];

  const processSteps = [
    { phase: 'Assess', icon: Target, desc: 'AI readiness, data quality, infrastructure and regulatory constraints.' },
    { phase: 'Prototype', icon: Cpu, desc: 'Build fast, low-cost proofs of concept to validate value.' },
    { phase: 'Build', icon: Settings, desc: 'Train models on curated, secured datasets; implement explainability and fairness checks.' },
    { phase: 'Deploy', icon: Rocket, desc: 'Productionize on cloud or hybrid environments with secure APIs and scalable infra.' },
    { phase: 'Operate', icon: BarChart3, desc: 'Monitor accuracy, detect drift, perform security checks and schedule retraining.' },
  ];

  const industries = [
    { name: 'Healthcare', icon: HeartPulse, desc: 'Predictive risk scoring, diagnostic support, and image analysis for better patient outcomes.' },
    { name: 'Finance & Banking', icon: Landmark, desc: 'Fraud detection, credit risk assessments, and customer insights for financial services.' },
    { name: 'Government & Public Sector', icon: Building2, desc: 'Citizen service automation and policy analytics for efficient public services.' },
    { name: 'Education & Non-Profit', icon: GraduationCap, desc: 'Forecasting, resource planning, and personalized learning solutions.' },
  ];

  const agents = [
    { 
      name: 'Rex', 
      title: 'The Website Wizard', 
      icon: Bot,
      features: [
        'Seamless Website Integration: Connects effortlessly with your website to enable conversational AI-driven interactions.',
        'Generative AI Discovery: Provides AI-powered discovery to guide users through content.',
        'Enhanced User Experience: Improves website engagement with context-driven conversations.',
        'Automated Lead Generation: Automatically engages visitors and captures leads.',
      ]
    },
    { name: 'Mike', title: 'The Proofreader', icon: FileText, features: ['Advanced grammar and style checking', 'Context-aware suggestions', 'Multi-language support', 'Tone analysis'] },
    { name: 'Karl', title: 'The Statistician', icon: Calculator, features: ['Automated data analysis', 'Statistical modeling', 'Trend identification', 'Predictive analytics'] },
    { name: 'Sally', title: 'The Sales Assistant', icon: Briefcase, features: ['Lead qualification', 'Sales insights', 'CRM integration', 'Performance tracking'] },
    { name: 'Alan', title: 'The Legal Document Assistant', icon: Scale, features: ['Contract analysis', 'Legal document summarization', 'Compliance checking', 'Risk identification'] },
  ];

  const faqs = [
    { q: 'What types of AI solutions does AmaraTech provide?', a: 'We provide Agentic AI, Generative AI, Machine Learning solutions, document/video analysis, sentiment analysis, and custom AI development tailored to your business needs.' },
    { q: 'How do you ensure AI projects are secure and compliant?', a: 'We implement enterprise-grade security, data encryption, access controls, and ensure compliance with industry regulations like HIPAA, GDPR, and SOC 2.' },
    { q: 'How long does it take to implement an AI project?', a: 'Timeline varies based on complexity. Simple POCs can be delivered in 4-6 weeks, while enterprise solutions may take 3-6 months.' },
    { q: 'What industries benefit most from AI solutions?', a: 'Healthcare, finance, government, education, retail, and manufacturing see significant benefits from AI implementations.' },
    { q: 'How do you measure the success of an AI project?', a: 'We track KPIs like accuracy, efficiency gains, cost savings, user adoption, and ROI metrics aligned with your business goals.' },
    { q: 'Do you offer ongoing support after deployment?', a: 'Yes, we provide continuous monitoring, maintenance, model retraining, and 24/7 support for all deployed solutions.' },
    { q: 'Do I need large amounts of data to start an AI project?', a: 'Not necessarily. We can work with existing data or help you develop data collection strategies. Some solutions work with smaller datasets.' },
    { q: 'Can you integrate AI into our existing systems?', a: 'Yes. We specialize in deploying AI into both cloud and on-premises environments, integrating seamlessly with existing applications, automation pipelines, and IT infrastructure.' },
  ];

  return (
    <div className={styles.aiPage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.aiHero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgNumber}>AI</div>
          <div className={styles.heroGrid} />
        </div>
        
        <div className={styles.aiHeroContainer}>
          <motion.div 
            className={styles.aiHeroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroMeta}>
              <span className={styles.metaIndex}>[AI/ML]</span>
              <span className={styles.metaLabel}>SERVICE</span>
              <span className={styles.metaDivider}>—</span>
              <span className={styles.metaTitle}>Artificial Intelligence</span>
            </div>
            
            <h1 className={styles.aiHeroTitle}>
              Transform Business with <span className={styles.titleAccent}>AI & ML</span> Powered Intelligence
            </h1>
            <p className={styles.heroSubtitle}>
              Elevate your business with AmaraTech IT advanced Agentic AI, Generative AI, and Machine Learning consulting solutions. 
              We partner with organizations to harness intelligent technologies that drive innovation, enhance decision-making, and deliver measurable results.
            </p>

            {/* Stats */}
            <div className={styles.aiStats}>
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.aiStat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                >
                  <div className={styles.aiStatValue}>
                    {stat.value}<span className={styles.aiStatSuffix}>{stat.suffix}</span>
                  </div>
                  <div className={styles.aiStatLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lead Form */}
          <motion.div 
            className={styles.aiLeadForm}
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.leadFormTitle}>Get Started with AI/ML & Gen AI Solutions</h3>
            {submitted ? (
              <div className={styles.successMessage}>
                <CheckCircle size={48} />
                <h4>Thank you!</h4>
                <p>We&apos;ll contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <User size={14} />
                    Your Name
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <Mail size={14} />
                    Business Email
                  </label>
                  <input
                    type="email"
                    className={styles.formInput}
                    placeholder="Name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <MessageSquare size={14} />
                    How Can We Help You
                  </label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="Describe the systems or data you want to protect"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Get Free Quote'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* AI Services Section */}
      <section ref={servicesRef} className={styles.introSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>OUR AI & ML SERVICES</span>
            <h2 className={styles.sectionTitle}>
              Intelligent solutions designed to transform<br/>
              <span className={styles.titleAccent}>how businesses work with data.</span>
            </h2>
          </motion.div>

          <motion.p 
            className={styles.introText}
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 48px' }}
          >
            At AmaraTech IT, we deliver intelligent AI & ML solutions designed to transform the way businesses work with data. 
            From AI-powered document and video analysis that uncovers hidden insights, to smart lead sentiment analyzers that enhance customer engagement, 
            our solutions bring clarity and precision to decision-making.
          </motion.p>

          <div className={styles.featuresGrid}>
            {aiServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className={styles.featureIcon}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.featureTitle}>{service.title}</h3>
                  <p className={styles.featureDesc}>{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className={styles.migrationSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.migrationHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>HOW WE DO IT: OUR PROCESS</span>
            <h2 className={styles.sectionTitle}>
              Steps that reduce risk and<br/>
              <span className={styles.titleAccent}>speed value.</span>
            </h2>
          </motion.div>

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.phase}
                  className={styles.processCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <div className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</div>
                  <div className={styles.processIcon}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.processTitle}>{step.phase}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p 
            className={styles.processNote}
            initial={{ opacity: 0 }}
            animate={processInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            We leverage our cloud and security experience to ensure AI projects are delivered with the same rigor as our cybersecurity and cloud services.
          </motion.p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className={styles.m365Section}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>WHY CHOOSE US</span>
            <h2 className={styles.sectionTitle}>
              AI that delivers real,<br/>
              <span className={styles.titleAccent}>lasting value.</span>
            </h2>
          </motion.div>

          <motion.div 
            className={styles.whyUsContent}
            initial={{ opacity: 0, y: 20 }}
            animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className={styles.introText}>
              At AmaraTech, we believe Artificial Intelligence should deliver more than just innovation — it should create real, lasting value for your business. 
              What sets us apart is our ability to combine advanced AI capabilities with enterprise-grade security and compliance, ensuring that every solution is not only powerful but also safe and reliable.
            </p>
            <p className={styles.introText}>
              Our team of certified experts brings proven experience across industries such as healthcare, finance, government, and education. 
              We take a consultative approach, working closely with your teams to align AI initiatives with strategic goals, reduce risks, and maximize ROI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section ref={industriesRef} className={styles.industriesSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={industriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>INDUSTRY USE CASES</span>
            <h2 className={styles.sectionTitle}>
              AI solutions tailored to<br/>
              <span className={styles.titleAccent}>industry-specific needs.</span>
            </h2>
          </motion.div>

          <div className={styles.industriesTabs}>
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <button
                  key={industry.name}
                  className={`${styles.industryTab} ${activeIndustry === idx ? styles.activeTab : ''}`}
                  onClick={() => setActiveIndustry(idx)}
                >
                  <Icon size={18} />
                  <span>{industry.name}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              className={styles.industryContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p>{industries[activeIndustry].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* AI Agents Section */}
      <section ref={agentsRef} className={styles.agentsSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={agentsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>MEET OUR AI AGENTS</span>
            <h2 className={styles.sectionTitle}>
              A suite of AI-driven solutions designed to<br/>
              <span className={styles.titleAccent}>enhance business operations.</span>
            </h2>
          </motion.div>

          <div className={styles.agentsGrid}>
            <div className={styles.agentsList}>
              {agents.map((agent, idx) => {
                const Icon = agent.icon;
                return (
                  <button
                    key={agent.name}
                    className={`${styles.agentItem} ${activeAgent === idx ? styles.activeAgent : ''}`}
                    onClick={() => setActiveAgent(idx)}
                  >
                    <div className={styles.agentIcon}>
                      <Icon size={20} />
                    </div>
                    <div className={styles.agentInfo}>
                      <span className={styles.agentName}>{agent.name}</span>
                      <span className={styles.agentTitle}>{agent.title}</span>
                    </div>
                    <ArrowRight size={16} className={styles.agentArrow} />
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent}
                className={styles.agentDetails}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.agentDetailHeader}>
                  <Bot size={32} />
                  <div>
                    <h3>{agents[activeAgent].name}</h3>
                    <span>{agents[activeAgent].title}</span>
                  </div>
                </div>
                <ul className={styles.agentFeatures}>
                  {agents[activeAgent].features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={styles.getQuoteBtn}>
                  Get A Quote
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* AI-Driven Threat Intelligence Section */}
      <section ref={threatIntelRef} className={styles.threatIntelSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={threatIntelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>CYBER THREAT INTELLIGENCE</span>
            <h2 className={styles.sectionTitle}>
              AI-Driven Insights for<br/>
              <span className={styles.titleAccent}>Intelligence Analysis</span>
            </h2>
          </motion.div>

          {/* Flow Diagram */}
          <div className={styles.threatFlowContainer}>
            {/* Left Side - Multi-Source Intels */}
            <motion.div 
              className={styles.threatSourceColumn}
              initial={{ opacity: 0, x: -30 }}
              animate={threatIntelInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* CTI Sources */}
              <div className={styles.sourceGroup}>
                <span className={styles.sourceGroupLabel}>AmaraTech CTI</span>
                <div className={styles.sourceCircle}>
                  <Shield size={24} />
                  <span>AmaraTech</span>
                </div>
              </div>

              {/* Reputable Sources */}
              <div className={styles.sourceGroup}>
                <span className={styles.sourceGroupLabel}>Threat Feeds</span>
                <div className={styles.sourceIcons}>
                  <div className={styles.sourceIcon}><Globe size={18} /></div>
                  <div className={styles.sourceIcon}><AlertTriangle size={18} /></div>
                  <div className={styles.sourceIcon}><Database size={18} /></div>
                </div>
              </div>

              {/* Web Sources */}
              <div className={styles.sourceGroup}>
                <span className={styles.sourceGroupLabel}>OSINT Sources</span>
                <div className={styles.sourceIcons}>
                  <div className={styles.sourceIcon}><FaGoogle size={16} /></div>
                  <div className={styles.sourceIcon}><FaXTwitter size={16} /></div>
                  <div className={styles.sourceIcon}><FaReddit size={16} /></div>
                  <div className={styles.sourceIcon}><FaGithub size={16} /></div>
                </div>
              </div>

              {/* Knowledge Base */}
              <div className={styles.sourceGroup}>
                <span className={styles.sourceGroupLabel}>Enterprise Knowledge Base</span>
                <div className={styles.sourceIcon}><Database size={18} /></div>
              </div>
            </motion.div>

            {/* Center - AmaraTech AI Hub */}
            <motion.div 
              className={styles.threatCenterHub}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={threatIntelInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Connection Lines Left */}
              <div className={styles.connectionLinesLeft}>
                <svg viewBox="0 0 100 200" className={styles.connectionSvg}>
                  <path d="M100,20 Q50,20 50,60 Q50,100 100,100" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                  <path d="M100,60 Q60,60 60,100 Q60,100 100,100" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                  <path d="M100,140 Q50,140 50,100 Q50,100 100,100" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                  <path d="M100,180 Q40,180 40,100 Q40,100 100,100" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                </svg>
              </div>

              <div className={styles.hubCenter}>
                <div className={styles.hubIcon}>
                  <Brain size={40} />
                </div>
                <span className={styles.hubLabel}>AmaraTech AI</span>
                <span className={styles.hubSubLabel}>Multi-Agent Intelligence<br/>Platform for Cybersecurity</span>
              </div>

              {/* Connection Lines Right */}
              <div className={styles.connectionLinesRight}>
                <svg viewBox="0 0 100 200" className={styles.connectionSvg}>
                  <path d="M0,100 Q50,100 50,40 Q50,20 100,20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                  <path d="M0,100 Q50,100 50,100 Q50,100 100,100" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                  <path d="M0,100 Q50,100 50,160 Q50,180 100,180" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                </svg>
              </div>
            </motion.div>

            {/* Right Side - Analysis Outputs */}
            <motion.div 
              className={styles.threatOutputColumn}
              initial={{ opacity: 0, x: 30 }}
              animate={threatIntelInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className={styles.outputCard}>
                <div className={styles.outputCardHeader}>
                  <FileCode size={16} />
                  <span>Threat Resolution</span>
                </div>
                <div className={styles.outputCardLines}>
                  <div className={styles.outputLine} style={{ width: '90%' }} />
                  <div className={styles.outputLine} style={{ width: '75%' }} />
                </div>
              </div>

              <div className={styles.outputCard}>
                <div className={styles.outputCardHeader}>
                  <FileText size={16} />
                  <span>IOC Analysis</span>
                </div>
                <div className={styles.outputCardLines}>
                  <div className={styles.outputLine} style={{ width: '85%' }} />
                  <div className={styles.outputLine} style={{ width: '60%' }} />
                  <div className={styles.outputLine} style={{ width: '70%' }} />
                </div>
              </div>

              <div className={styles.outputCard}>
                <div className={styles.outputCardHeader}>
                  <Fingerprint size={16} />
                  <span>Attack Attribution</span>
                </div>
                <div className={styles.outputCardLines}>
                  <div className={styles.outputLine} style={{ width: '80%' }} />
                  <div className={styles.outputLine} style={{ width: '95%' }} />
                  <div className={styles.outputLine} style={{ width: '65%' }} />
                  <div className={styles.outputLine} style={{ width: '50%' }} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Info Cards */}
          <div className={styles.threatInfoGrid}>
            <motion.div 
              className={styles.threatInfoCard}
              initial={{ opacity: 0, y: 20 }}
              animate={threatIntelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <h4>Multi-Source Intelligence</h4>
              <p>Aggregate threat data from premium feeds, open-source intelligence, dark web monitoring, and your enterprise knowledge base—unified in one platform.</p>
            </motion.div>

            <motion.div 
              className={styles.threatInfoCard}
              initial={{ opacity: 0, y: 20 }}
              animate={threatIntelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <h4>AmaraTech AI Engine</h4>
              <p>Our advanced multi-agent AI system provides real-time threat analysis, automated incident response, and predictive security insights.</p>
            </motion.div>

            <motion.div 
              className={styles.threatInfoCard}
              initial={{ opacity: 0, y: 20 }}
              animate={threatIntelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <h4>Actionable Insights</h4>
              <p>Get IOC verdicts, attack attribution, vulnerability assessments, and compliance reports—all delivered with clear remediation guidance.</p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div 
            className={styles.threatCta}
            initial={{ opacity: 0, y: 20 }}
            animate={threatIntelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <a 
              href="https://i.secai.ai/research" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.threatCtaButton}
            >
              <span>Explore Threat Intelligence</span>
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className={styles.faqSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.introHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.sectionLabel}>FAQs</span>
            <h2 className={styles.sectionTitle}>
              Common Questions About Our<br/>
              <span className={styles.titleAccent}>AI Solutions</span>
            </h2>
          </motion.div>

          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className={`${styles.faqItem} ${openFaq === idx ? styles.faqOpen : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <button 
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className={styles.faqChevron} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
