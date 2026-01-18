'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, Shield, Settings, Brain, Building2,
  ArrowRight, CheckCircle, Zap, Database, Wifi,
  Users, BarChart3, Lightbulb, Network,
  GraduationCap, Headphones, ChevronDown,
  Landmark, Heart, ShoppingCart, Globe, BookOpen,
  Target, Award, Cog, TrendingUp, Leaf, Code,
  Lock, Mail, Search, AlertTriangle, Server,
  FileCheck, Layers, Map, Briefcase, Star,
  Quote
} from 'lucide-react';
import styles from './services.module.css';

// Core Services matching PDF design
const coreServices = [
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    Icon: Zap,
    color: '#C81E1E',
    items: ['CyberSecurity services', 'IT Cloud Modernization', 'AI-Based Cybersecurity/Tool', 'AI-Learning management system'],
  },
  {
    id: 'it-telecom',
    name: 'IT & Telecom',
    Icon: Network,
    color: '#BFA65F',
    items: ['Consulting', 'IOT Service', 'Capacity Building & Development'],
  },
  {
    id: 'data-management',
    name: 'Data Management',
    Icon: Database,
    color: '#BFA65F',
    items: ['Artificial Intelligence', 'Business Intelligence'],
  },
  {
    id: 'management-solution',
    name: 'Management Solution',
    Icon: Lightbulb,
    color: '#BFA65F',
    items: ['E-Governance Implementation', 'CRM System'],
  },
];

// Industries We Serve
const industries = [
  { name: 'Education', Icon: GraduationCap },
  { name: 'Government', Icon: Landmark },
  { name: 'Healthcare & Insurance', Icon: Heart },
  { name: 'Non-Profit', Icon: Globe },
  { name: 'Retail & Financial Services', Icon: ShoppingCart },
];

// AmaraTech Business Categories
const businessCategories = [
  { name: 'Cloud Solutions', Icon: Cloud },
  { name: 'IT Consulting', Icon: Database },
  { name: 'Cybersecurity & AI Services', Icon: Shield },
  { name: 'Corporate Training', Icon: Users },
  { name: 'E-Governance', Icon: Building2 },
];

// Detailed service categories with sub-services
const serviceCategories = [
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    description: 'Modernize your digital infrastructure with cutting-edge cybersecurity, cloud solutions, and AI-powered tools.',
    Icon: Zap,
    color: '#C81E1E',
    subServices: [
      {
        id: 'cybersecurity',
        name: 'Cybersecurity Strategy & Transformation',
        description: "AmaraTech's Cyber Transformation of Digital Assets strengthens government and organizational cybersecurity frameworks while modernizing identity management systems.",
        Icon: Shield,
        features: ['Cybersecurity Framework Development', 'Identity Management Modernization', 'Digital Asset Protection'],
        href: '/services/security',
      },
      {
        id: 'cloud-modernization',
        name: 'IT Cloud Modernization',
        description: 'Work from anywhere with confidence. Access your data and applications securely from any device, any location—delivering the flexibility and connectivity modern teams need.',
        Icon: Cloud,
        features: ['Azure Migration', 'M365 Modernization', 'Hybrid Cloud Implementation'],
        href: '/services/cloud',
      },
      {
        id: 'ai-cybersecurity',
        name: 'AI Cybersecurity Implementation',
        description: 'Our AI Solutions tool bridges the gap between traditional security assessments and modern risk management needs, enabling organizations to identify, analyze, and mitigate potential threats.',
        Icon: Brain,
        features: ['AI-Based Third-Party Risk Management', 'AI-Based Organization Risk Management', 'AI-Based Startup Risk Framework'],
        href: '/services/ai',
      },
      {
        id: 'ai-lms',
        name: 'AI LMS Platform',
        description: 'AmaraTech LMS Platform delivers AI-powered learning that builds the technical skills teams need for digital transformation.',
        Icon: GraduationCap,
        features: ['AI-Powered Learning', 'Technical Skills Development', 'Custom Training Paths'],
        href: '/services/ai',
      },
    ],
  },
  {
    id: 'data-management',
    name: 'Data Management',
    description: 'Transform raw data into strategic insights with AI and business intelligence solutions.',
    Icon: Database,
    color: '#BFA65F',
    subServices: [
      {
        id: 'artificial-intelligence',
        name: 'Artificial Intelligence',
        description: 'AmaraCloud AI is a cutting-edge cloud solution designed for businesses and government aiming to harness the full potential of artificial intelligence and machine learning.',
        Icon: Brain,
        features: ['Intelligent Business Information Retrieval', 'Real-time Data Extraction', 'Data Visualization'],
        href: '/services/ai',
      },
      {
        id: 'business-intelligence',
        name: 'Business Intelligence',
        description: 'Empower your organization with Business Intelligence solutions that transform raw data into strategic Insights, capture, analyze, and track critical business metrics.',
        Icon: BarChart3,
        features: ['Data Analytics', 'Business Metrics Tracking', 'Investment Decision Support'],
        href: '/services/ai',
      },
    ],
  },
  {
    id: 'it-telecom',
    name: 'IT & Telecom',
    description: 'Strategic IT consulting, IoT services, and capacity building to drive your digital economy.',
    Icon: Network,
    color: '#BFA65F',
    subServices: [
      {
        id: 'consulting',
        name: 'Consulting Service',
        description: 'Strategically outsource your IT infrastructure or select components, and leverage our business strategies, cutting-edge technologies, and deep industry expertise.',
        Icon: Lightbulb,
        features: ['IT Strategy Development', 'Technology Consulting', 'Industry Best Practices'],
        href: '/services/consulting',
      },
      {
        id: 'iot',
        name: 'IOT',
        description: 'Revolutionize the way your organization operates and competes in the digital economy.',
        Icon: Wifi,
        features: ['Enhance Operational Efficiency and Productivity', 'Optimize Resource Allocation', 'Business Continuity'],
        href: '/services/consulting',
      },
      {
        id: 'capacity-building',
        name: 'Capacity Building & Development',
        description: 'Our Capacity Building & Development programs are designed to empower your workforce with the technical expertise and strategic competencies required to drive digital transformation.',
        Icon: Users,
        features: ['Technical Skills Development', 'Leadership & Digital Strategy', 'Change Management', 'Certification & Professional Development'],
        href: '/services/consulting',
      },
    ],
  },
  {
    id: 'management-solution',
    name: 'Management Solution',
    description: 'Streamline operations with CRM systems and e-governance solutions for enhanced efficiency.',
    Icon: Settings,
    color: '#BFA65F',
    subServices: [
      {
        id: 'crm',
        name: 'Customer Relationship Management (CRM)',
        description: 'Customer engagement and drive business growth through strategic CRM implementation and optimization.',
        Icon: Headphones,
        features: ['Elevate Client Service', 'Enhance Marketing Effectiveness', 'Execute Targeted Campaigns', 'Foster Cross-Departmental Collaboration'],
        href: '/services/consulting',
      },
      {
        id: 'e-governance',
        name: 'E-Governance Implementation',
        description: 'Our e-governance consulting services transform complex regulatory requirements into streamlined, manageable processes.',
        Icon: Building2,
        features: ['Digital Identity Management', 'Citizen Engagement Platforms', 'Web Portal Development', 'Workflow Automation'],
        href: '/services/e-governance',
      },
    ],
  },
];

// Value Proposition - IT Operation Process
const valueProposition = [
  {
    title: 'Improve Decision Making',
    icon: TrendingUp,
    items: ['Hybrid/Cloud Implementation', 'Data center implementation'],
  },
  {
    title: 'Mitigate Risk',
    icon: Shield,
    items: ['Improved Change Impact & Risk Assessment'],
  },
  {
    title: 'Better Manage Incidents',
    icon: AlertTriangle,
    items: ['Issue identification & containment', 'Workarounds'],
  },
  {
    title: 'Demystify IT Operational Data',
    icon: Search,
    items: ['Traceability and transparency', 'Get information quicker', 'O365 Modernization'],
  },
  {
    title: 'Minimize Disruption',
    icon: Cog,
    items: ['Quickly address operational issues', 'Enhance Service Continuity'],
  },
  {
    title: 'Standardize and Automate',
    icon: Layers,
    items: ['Reduce process overhead', 'Configure workflows efficiently'],
  },
];

// Technology Trends
const technologyTrends = [
  {
    title: 'AI & Machine Learning',
    description: 'AI and machine learning are maturing and becoming integrated into more products and services.',
    icon: Brain,
  },
  {
    title: 'Digital Sustainability',
    description: 'Using digital technologies to drive emission reduction and cost efficiency.',
    icon: Leaf,
  },
  {
    title: 'Cloud Modernization',
    description: 'Balancing public cloud capabilities with on-premises control and privacy.',
    icon: Cloud,
  },
  {
    title: 'Citizen Dev 2.0',
    description: 'Organizations form relationships easier when open with data and resources.',
    icon: Code,
  },
  {
    title: 'Cybersecurity',
    description: 'Securing networks remains top priority with workforce education.',
    icon: Lock,
  },
];

// Why Work With Us
const whyWorkWithUs = [
  {
    title: 'Customer Centric',
    description: 'We build a strong and reliable partnership with you to help you achieve your business goals.',
    icon: Target,
  },
  {
    title: 'Reliability',
    description: 'Our integrated approach seamlessly blends creativity with business acumen, delivering concrete value.',
    icon: Award,
  },
  {
    title: 'Experience',
    description: 'Our team has 15+ years of industry experience and multiple certifications.',
    icon: Briefcase,
  },
  {
    title: 'Solution Agnostics',
    description: 'We provide tailored IT solutions that drive tangible, measurable end-to-end results.',
    icon: Lightbulb,
  },
];

// AmaraTech Security Solutions
const securitySolutions = [
  {
    title: 'Dark Web ID - Compromise Monitoring',
    icon: Search,
    items: ['24/7/365 Exposure Monitoring', 'Monitor Domains & IP Addresses', 'PII Visibility'],
  },
  {
    title: 'Phishing & Security Training',
    icon: Mail,
    items: ['Phishing Simulator', 'Security Awareness', 'LMS Integration'],
  },
  {
    title: 'Penetration Testing',
    icon: AlertTriangle,
    items: ['Identify Security Gaps', 'Real-time Attack Tracking', 'Industry Best Practices'],
  },
  {
    title: 'Endpoint Protection & MDR',
    icon: Shield,
    items: ['24/7 Attack Prevention', 'Ransomware Prevention', 'Cyber Insurance Support'],
  },
  {
    title: 'Business Email Compromise',
    icon: Mail,
    items: ['Advanced Email Filtering', 'Multi-factor Authentication', 'AI Threat Detection'],
  },
  {
    title: 'Azure Cloud & IT Modernization',
    icon: Cloud,
    items: ['Microsoft Azure Solutions', 'Infrastructure Scaling', 'Cloud Migration'],
  },
];

// Strategic Partners with logos
const strategicPartners = [
  { name: 'Google Cloud', logo: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg' },
  { name: 'Microsoft', logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg' },
  { name: 'AWS', logo: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg' },
  { name: 'Sophos', logo: 'https://www.vectorlogo.zone/logos/sopaboraborazilnet/sopaboraborazilnet-ar21.svg' },
  { name: 'CrowdStrike', logo: 'https://logo.clearbit.com/crowdstrike.com' },
  { name: 'SentinelOne', logo: 'https://logo.clearbit.com/sentinelone.com' },
  { name: 'Proofpoint', logo: 'https://logo.clearbit.com/proofpoint.com' },
  { name: 'Datto', logo: 'https://logo.clearbit.com/datto.com' },
  { name: 'ThreatLocker', logo: 'https://logo.clearbit.com/threatlocker.com' },
  { name: 'Pax8', logo: 'https://logo.clearbit.com/pax8.com' },
  { name: 'Ingram Micro', logo: 'https://logo.clearbit.com/ingrammicro.com' },
  { name: 'TD Synnex', logo: 'https://logo.clearbit.com/synnex.com' },
  { name: 'Extreme Networks', logo: 'https://logo.clearbit.com/extremenetworks.com' },
  { name: 'Dell', logo: 'https://www.vectorlogo.zone/logos/dell/dell-ar21.svg' },
  { name: 'Lenovo', logo: 'https://www.vectorlogo.zone/logos/lenovo/lenovo-ar21.svg' },
];

export default function Services() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('digital-transformation');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section 
        className={styles.heroSection}
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 60px',
          background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L52 17.5V42.5L30 55L8 42.5V17.5L30 5Z' fill='none' stroke='rgba(200,30,30,0.08)' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            opacity: 0.5
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div 
              style={{
                display: 'inline-block',
                padding: '10px 28px',
                background: 'linear-gradient(135deg, rgba(200, 30, 30, 0.2) 0%, rgba(200, 30, 30, 0.1) 100%)',
                border: '1px solid #C81E1E',
                borderRadius: '30px',
                fontSize: '12px',
                color: '#C81E1E',
                letterSpacing: '0.15em',
                fontWeight: 600
              }}
            >
              AI-POWERED SOLUTIONS
            </div>
            <h1 
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.1
              }}
            >
              AMARATECH <span style={{ color: '#C81E1E' }}>IT SOLUTIONS</span>
            </h1>
            <p 
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                letterSpacing: '0.25em',
                margin: 0
              }}
            >
              MANAGED IT SERVICE PROVIDER
            </p>
            <p 
              style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              Protecting and Empowering your Digital Future
            </p>
            <p 
              style={{
                fontSize: '20px',
                color: '#ffffff',
                margin: '16px 0 0',
                fontWeight: 500
              }}
            >
              "Empowering Africa Through Sustainable Digital Transformation"
            </p>
          </motion.div>
        </div>
      </section>

      {/* AmaraTech Business Section */}
      <section 
        style={{
          padding: '80px 0',
          background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
          position: 'relative'
        }}
      >
        {/* Top accent line */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C81E1E, transparent)'
          }}
        />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              margin: '0 0 48px'
            }}
          >
            AMARATECH BUSINESS
          </motion.h2>
          
          <div 
            className={styles.businessGrid}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '40px',
              marginBottom: '60px'
            }}
          >
            {businessCategories.map((item, index) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={index}
                  className={styles.businessItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    minWidth: '120px'
                  }}
                >
                  <div 
                    className={styles.hexagonIcon}
                    style={{
                      width: '80px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(200, 30, 30, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%)',
                      border: '2px solid #C81E1E',
                      borderRadius: '50%',
                      color: '#C81E1E',
                      boxShadow: '0 0 20px rgba(200, 30, 30, 0.3)'
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <span 
                    className={styles.businessLabel}
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      textAlign: 'center',
                      maxWidth: '140px'
                    }}
                  >
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Industries We Serve */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: '#BFA65F',
              textAlign: 'center',
              margin: '60px 0 40px',
              position: 'relative'
            }}
          >
            INDUSTRIES WE SERVE
            <span 
              style={{
                display: 'block',
                width: '200px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #BFA65F, transparent)',
                margin: '16px auto 0'
              }}
            />
          </motion.h3>
          
          <div 
            className={styles.industriesGrid}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '40px'
            }}
          >
            {industries.map((industry, index) => {
              const Icon = industry.Icon;
              return (
                <motion.div
                  key={index}
                  className={styles.industryItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    minWidth: '120px'
                  }}
                >
                  <div 
                    className={styles.hexagonIconGold}
                    style={{
                      width: '80px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(191, 166, 95, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%)',
                      border: '2px solid #BFA65F',
                      borderRadius: '50%',
                      color: '#BFA65F',
                      boxShadow: '0 0 20px rgba(191, 166, 95, 0.3)'
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <span 
                    className={styles.industryLabel}
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      textAlign: 'center',
                      maxWidth: '160px'
                    }}
                  >
                    {industry.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Services Overview */}
      <section 
        style={{
          padding: '80px 0',
          background: '#000000'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              margin: '0 0 48px'
            }}
          >
            CORE SERVICES
          </motion.h2>
          
          <div 
            className={styles.coreServicesGrid}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}
          >
            {coreServices.map((service, index) => {
              const Icon = service.Icon;
              return (
                <motion.div
                  key={service.id}
                  className={styles.coreServiceCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setExpandedCategory(service.id);
                    document.getElementById('detailed-services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '32px 20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    cursor: 'pointer'
                  }}
                >
                  <div 
                    className={styles.coreServiceHexagon} 
                    style={{ 
                      borderColor: service.color,
                      width: '72px',
                      height: '72px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(30, 30, 30, 0.8) 100%)',
                      border: `2px solid ${service.color}`,
                      borderRadius: '50%',
                      marginBottom: '16px',
                      boxShadow: `0 0 20px ${service.color}40`
                    }}
                  >
                    <Icon size={32} style={{ color: service.color }} />
                  </div>
                  <h3 
                    className={styles.coreServiceName} 
                    style={{ 
                      color: service.id === 'digital-transformation' ? '#C81E1E' : '#BFA65F',
                      fontSize: '16px',
                      fontWeight: 700,
                      textAlign: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    {service.name}
                  </h3>
                  <ul 
                    className={styles.coreServiceItems}
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.8,
                      textAlign: 'center'
                    }}
                  >
                    {service.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Categories */}
      <section 
        id="detailed-services" 
        style={{
          padding: '80px 0',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {serviceCategories.map((category, catIndex) => {
              const CategoryIcon = category.Icon;
              const isExpanded = expandedCategory === category.id;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * catIndex }}
                >
                  {/* Category Title Banner */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '20px 32px',
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.95) 100%)',
                      border: `2px solid ${isExpanded ? category.color : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: isExpanded ? '16px 16px 0 0' : '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div 
                        style={{
                          width: '56px',
                          height: '56px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${category.color}15`,
                          border: `2px solid ${category.color}`,
                          borderRadius: '50%'
                        }}
                      >
                        <CategoryIcon size={24} style={{ color: category.color }} />
                      </div>
                      <h2 
                        style={{
                          fontSize: '24px',
                          fontWeight: 700,
                          color: category.color,
                          margin: 0
                        }}
                      >
                        {category.name}
                      </h2>
                    </div>
                    <ChevronDown 
                      size={28} 
                      style={{ 
                        color: category.color,
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </button>

                  {/* Sub-services - Expandable */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div 
                          style={{
                            padding: '32px',
                            background: 'rgba(0, 0, 0, 0.6)',
                            border: `2px solid ${category.color}`,
                            borderTop: 'none',
                            borderRadius: '0 0 16px 16px'
                          }}
                        >
                          {/* Center Icon */}
                          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                            <div 
                              style={{
                                width: '80px',
                                height: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: `${category.color}20`,
                                border: `3px solid ${category.color}`,
                                borderRadius: '50%',
                                boxShadow: `0 0 30px ${category.color}40`
                              }}
                            >
                              <CategoryIcon size={36} style={{ color: category.color }} />
                            </div>
                          </div>
                          
                          {/* Sub-service Cards Grid */}
                          <div 
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                              gap: '24px'
                            }}
                          >
                            {category.subServices.map((subService, subIndex) => {
                              const SubIcon = subService.Icon;
                              return (
                                <motion.div
                                  key={subService.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 * subIndex }}
                                  style={{
                                    background: '#ffffff',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    position: 'relative',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                                  }}
                                >
                                  {/* Top accent bar */}
                                  <div 
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      left: '24px',
                                      right: '24px',
                                      height: '3px',
                                      background: `linear-gradient(90deg, ${category.color}, #BFA65F)`,
                                      borderRadius: '0 0 4px 4px'
                                    }}
                                  />
                                  
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                                    <div 
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: `${category.color}15`,
                                        borderRadius: '10px',
                                        flexShrink: 0,
                                        color: category.color
                                      }}
                                    >
                                      <SubIcon size={22} />
                                    </div>
                                    <h4 
                                      style={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: category.color,
                                        margin: 0,
                                        lineHeight: 1.3
                                      }}
                                    >
                                      {subService.name}
                                    </h4>
                                  </div>
                                  
                                  <p 
                                    style={{
                                      fontSize: '14px',
                                      lineHeight: 1.6,
                                      color: '#333333',
                                      margin: '0 0 16px'
                                    }}
                                  >
                                    {subService.description}
                                  </p>
                                  
                                  <ul 
                                    style={{
                                      listStyle: 'none',
                                      padding: 0,
                                      margin: '0 0 16px',
                                      fontSize: '13px',
                                      color: '#555555',
                                      lineHeight: 1.8
                                    }}
                                  >
                                    {subService.features.map((feature, fi) => (
                                      <li key={fi}>• {feature}</li>
                                    ))}
                                  </ul>
                                  
                                  <Link 
                                    href={subService.href} 
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      color: category.color,
                                      textDecoration: 'none'
                                    }}
                                  >
                                    Learn More <ArrowRight size={14} />
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section 
        style={{
          padding: '100px 0',
          background: 'linear-gradient(180deg, #000000 0%, #0d0d0d 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background hexagon pattern */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 5L93 27.5V72.5L50 95L7 72.5V27.5L50 5Z' fill='none' stroke='%23C81E1E' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', margin: '0 0 16px' }}>
              DIGITAL TRANSFORMATION - <span style={{ color: '#C81E1E' }}>VALUE PROPOSITION</span>
            </h2>
            <p style={{ fontSize: '18px', color: '#BFA65F', letterSpacing: '0.1em' }}>IT Operation Process</p>
          </motion.div>
          
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {valueProposition.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(200, 30, 30, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    border: '1px solid rgba(200, 30, 30, 0.3)',
                    borderRadius: '20px',
                    padding: '32px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  {/* Hexagon background decoration */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '100px',
                      height: '100px',
                      background: 'rgba(200, 30, 30, 0.1)',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      opacity: 0.5
                    }}
                  />
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #C81E1E 0%, #8B0000 100%)',
                      borderRadius: '16px',
                      marginBottom: '20px',
                      boxShadow: '0 8px 30px rgba(200, 30, 30, 0.4)'
                    }}
                  >
                    <Icon size={28} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                    {item.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {item.items.map((point, i) => (
                      <li 
                        key={i} 
                        style={{ 
                          fontSize: '14px', 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px'
                        }}
                      >
                        <span style={{ color: '#C81E1E', marginTop: '2px' }}>◆</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Trends Section */}
      <section 
        style={{
          padding: '100px 0',
          background: '#000000',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '60px' }}
          >
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1 }}>
              TECHNOLOGY
            </h2>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#BFA65F', margin: 0, lineHeight: 1 }}>
              TRENDS
            </h2>
          </motion.div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {technologyTrends.map((trend, index) => {
              const Icon = trend.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '24px 32px',
                    background: '#ffffff',
                    borderRadius: '60px',
                    maxWidth: '600px',
                    marginLeft: isEven ? '0' : 'auto',
                    marginRight: isEven ? 'auto' : '0',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    position: 'relative'
                  }}
                >
                  <div 
                    style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: index === 0 ? '#C81E1E' : '#BFA65F',
                      borderRadius: '50%',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={24} style={{ color: '#ffffff' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px' }}>
                      {trend.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#666666', margin: 0, lineHeight: 1.5 }}>
                      {trend.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AmaraTech Solutions - Security Section */}
      <section 
        style={{
          padding: '100px 0',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '60px'
            }}
          >
            AMARATECH <span style={{ color: '#C81E1E' }}>SOLUTIONS</span>
          </motion.h2>
          
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px',
              marginBottom: '60px'
            }}
          >
            {securitySolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(200, 30, 30, 0.2)',
                    borderRadius: '16px',
                    padding: '28px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '4px',
                      height: '100%',
                      background: 'linear-gradient(180deg, #C81E1E 0%, #BFA65F 100%)'
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div 
                      style={{
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(200, 30, 30, 0.15)',
                        borderRadius: '12px',
                        color: '#C81E1E'
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#C81E1E', margin: 0 }}>
                      {solution.title}
                    </h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {solution.items.map((item, i) => (
                      <li 
                        key={i} 
                        style={{ 
                          fontSize: '14px', 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          marginBottom: '6px',
                          paddingLeft: '16px',
                          position: 'relative'
                        }}
                      >
                        <span style={{ position: 'absolute', left: 0, color: '#BFA65F' }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          
          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              padding: '48px',
              background: 'linear-gradient(135deg, rgba(200, 30, 30, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%)',
              borderRadius: '20px',
              border: '1px solid rgba(200, 30, 30, 0.2)'
            }}
          >
            <Quote size={48} style={{ color: '#C81E1E', marginBottom: '20px' }} />
            <p style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: '#ffffff', margin: 0, lineHeight: 1.5 }}>
              YOU&apos;RE NOT TOO SMALL TO <span style={{ color: '#C81E1E', fontWeight: 700 }}>GET HACKED</span>. 
              YOU&apos;RE JUST TOO SMALL TO <span style={{ color: '#C81E1E', fontWeight: 700 }}>MAKE THE NEWS</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section 
        style={{
          padding: '100px 0',
          background: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background image placeholder */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(200, 30, 30, 0.2) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
        />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '80px'
            }}
          >
            WHY WORK WITH US
          </motion.h2>
          
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px'
            }}
          >
            {whyWorkWithUs.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    padding: '32px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(200, 30, 30, 0.2) 0%, rgba(200, 30, 30, 0.1) 100%)',
                      border: '2px solid #C81E1E',
                      borderRadius: '16px',
                      flexShrink: 0,
                      color: '#C81E1E'
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#C81E1E', margin: '0 0 12px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.7 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Partners Section */}
      <section 
        style={{
          padding: '80px 0',
          background: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}
          >
            <div 
              style={{
                width: '8px',
                height: '40px',
                background: 'linear-gradient(180deg, #C81E1E 0%, #BFA65F 100%)',
                borderRadius: '4px'
              }}
            />
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
              OUR STRATEGIC <span style={{ color: '#C81E1E' }}>PARTNERS</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              alignItems: 'center'
            }}
          >
            {strategicPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                style={{
                  padding: '24px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e8e8e8',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  style={{
                    maxWidth: '120px',
                    maxHeight: '50px',
                    objectFit: 'contain',
                    filter: 'grayscale(0%)',
                    transition: 'all 0.3s ease'
                  }}
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<span style="font-size: 14px; font-weight: 700; color: #333;">${partner.name}</span>`;
                  }}
                />
                <span style={{ 
                  fontSize: '11px', 
                  color: '#888', 
                  marginTop: '8px',
                  textAlign: 'center'
                }}>
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Africa Mission CTA */}
      <section 
        style={{
          padding: '120px 0',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Africa map silhouette placeholder */}
        <div 
          style={{
            position: 'absolute',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '300px',
            height: '350px',
            background: 'linear-gradient(180deg, rgba(0, 150, 255, 0.3) 0%, rgba(0, 150, 255, 0.1) 100%)',
            clipPath: 'polygon(50% 0%, 80% 10%, 100% 35%, 95% 65%, 70% 95%, 50% 100%, 30% 95%, 10% 75%, 0% 50%, 5% 25%, 25% 5%)',
            opacity: 0.3
          }}
        />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              style={{ 
                fontSize: 'clamp(28px, 4vw, 44px)', 
                fontWeight: 700, 
                color: '#ffffff', 
                margin: '0 0 24px',
                lineHeight: 1.3,
                fontStyle: 'italic'
              }}
            >
              Join Us in Turning Africa into a Sustainable Development Partner.
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', margin: '0 0 32px' }}>
              We&apos;re building Technology Solutions for Tomorrow Digital Solutions.
            </p>
            
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 8px' }}>
                You&apos;re not too small to get hacked.
              </p>
              <p style={{ fontSize: '18px', color: '#C81E1E', fontWeight: 700, margin: 0 }}>
                You&apos;re just too small to make the news.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Link
                href="/contact"
                style={{
                  padding: '16px 32px',
                  background: '#ffffff',
                  color: '#1a1a1a',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Contact
              </Link>
              <span style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', color: '#ffffff', fontSize: '14px' }}>
                410-855-2206
              </span>
              <span style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', color: '#ffffff', fontSize: '14px' }}>
                www.amaratechit.com
              </span>
              <span style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', color: '#ffffff', fontSize: '14px' }}>
                info@amaratechit.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: '#000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              padding: '48px',
              background: 'linear-gradient(135deg, rgba(200, 30, 30, 0.15) 0%, rgba(200, 30, 30, 0.05) 100%)',
              border: '2px solid rgba(200, 30, 30, 0.3)',
              borderRadius: '20px',
              textAlign: 'center'
            }}
          >
            <h2 
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 12px'
              }}
            >
              Need a Custom Solution?
            </h2>
            <p 
              style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: '0 0 24px',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              Our team can design and implement custom IT solutions tailored to your specific business needs.
            </p>
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '24px',
                marginBottom: '24px',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <span>📧 info@amaratechit.com</span>
              <span>📞 410-855-2206</span>
              <span>🌐 www.amaratechit.com</span>
            </div>
            <Link 
              href="/contact" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #C81E1E 0%, #9A1616 100%)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '10px'
              }}
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
