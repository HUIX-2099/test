import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlassCard from "@/components/common/GlassCard";
import Button from "@/components/common/Button";
import Features from "@/components/sections/Features";
import TechShowcase from "@/components/sections/TechShowcase";
import AzurePage from "./AzurePage";
import CloudPage from "./CloudPage";
import EGovernancePage from "./EGovernancePage";
import AIPage from "./AIPage";
import SecurityPage from "./SecurityPage";

const services: Record<string, {
  title: string;
  description: string;
  content: string;
  features: string[];
  showSecurityDashboard?: boolean;
  customComponent?: boolean;
}> = {
  azure: {
    title: 'Microsoft Azure',
    description: 'Strategic partnership with Microsoft for cloud transformation and Azure migration.',
    content: '',
    features: [],
    customComponent: true,
  },
  'azure-migration': {
    title: 'Azure Migration Strategy',
    description: 'Seamless migration to Microsoft Azure with minimal downtime and maximum efficiency.',
    content: 'Our Azure migration experts guide you through every step of your cloud journey. We assess your current infrastructure, develop a comprehensive migration strategy, and execute the migration with minimal disruption to your business operations.',
    features: [
      'Infrastructure Assessment',
      'Migration Planning & Strategy',
      'Application Modernization',
      'Data Migration & Validation',
      'Hybrid Cloud Configuration',
      'Post-Migration Optimization',
      'Cost Analysis & Optimization',
      '24/7 Migration Support',
    ],
  },
  'office-365': {
    title: 'Microsoft Office 365',
    description: 'Complete Microsoft 365 deployment, migration, and management services.',
    content: 'Transform your workplace with Microsoft 365. We provide end-to-end deployment, migration from legacy systems, user training, and ongoing management to ensure your organization gets the most out of your Microsoft investment.',
    features: [
      'Microsoft 365 Deployment',
      'Email Migration (Exchange, Gmail)',
      'SharePoint & OneDrive Setup',
      'Teams Implementation',
      'Security & Compliance Configuration',
      'User Training & Adoption',
      'License Optimization',
      'Ongoing Administration',
    ],
  },
  cloud: {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and architecture for modern businesses.',
    content: '',
    features: [],
    customComponent: true,
  },
  security: {
    title: 'Cyber Security',
    description: '24/7 threat monitoring, incident response, and comprehensive security services.',
    content: '',
    features: [],
    customComponent: true,
  },
  'penetration-testing': {
    title: 'Penetration Testing',
    description: 'Comprehensive security assessments to identify vulnerabilities before attackers do.',
    content: 'Our certified ethical hackers perform thorough penetration testing to identify security weaknesses in your systems, applications, and networks. We provide detailed reports with actionable remediation guidance to strengthen your security posture.',
    features: [
      'Network Penetration Testing',
      'Web Application Testing',
      'Mobile Application Testing',
      'API Security Testing',
      'Social Engineering Assessments',
      'Wireless Security Testing',
      'Cloud Security Assessment',
      'Compliance-Focused Testing (PCI-DSS, HIPAA)',
    ],
  },
  'managed-it': {
    title: 'Managed IT Support',
    description: 'Proactive IT management and 24/7 support to keep your business running smoothly.',
    content: 'Focus on your core business while we handle your IT infrastructure. Our managed IT services provide proactive monitoring, maintenance, and support to prevent issues before they impact your operations.',
    features: [
      '24/7 Help Desk Support',
      'Proactive System Monitoring',
      'Patch Management',
      'Backup & Disaster Recovery',
      'Network Management',
      'Endpoint Security',
      'Vendor Management',
      'IT Strategy & Planning',
    ],
  },
  consulting: {
    title: 'IT Consulting',
    description: 'Technology strategy and digital transformation consulting services.',
    content: 'Leverage our expertise to make informed technology decisions. Our consulting services help align your IT strategy with your business goals, providing guidance on digital transformation, technology selection, and implementation strategies.',
    features: [
      'Technology Strategy',
      'Digital Transformation',
      'Technology Assessment',
      'IT Roadmap Planning',
      'Vendor Selection',
      'Implementation Guidance',
    ],
  },
  'e-governance': {
    title: 'E-Governance',
    description: 'Digital solutions for government operations and citizen services.',
    content: '',
    features: [],
    customComponent: true,
  },
  ai: {
    title: 'Artificial Intelligence',
    description: 'Custom AI and machine learning solutions for business automation.',
    content: '',
    features: [],
    customComponent: true,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug];
  
  if (!service) {
    return {
      title: 'Service Not Found | AmaraTech',
    };
  }

  return {
    title: `${service.title} | AmaraTech IT Solutions`,
    description: service.description,
    openGraph: {
      title: `${service.title} | AmaraTech IT Solutions`,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    notFound();
  }

  // Render custom pages
  if (slug === 'azure') {
    return <AzurePage />;
  }
  
  if (slug === 'cloud') {
    return <CloudPage />;
  }
  
  if (slug === 'e-governance') {
    return <EGovernancePage />;
  }
  
  if (slug === 'ai') {
    return <AIPage />;
  }
  
  if (slug === 'security') {
    return <SecurityPage />;
  }

  return (
    <div style={{ paddingTop: '90px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 600, marginBottom: '16px', color: 'var(--color-text-primary)' }}>
          {service.title}
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '48px' }}>
          {service.description}
        </p>
        <GlassCard className="service-detail-card">
          <div style={{ padding: '48px' }}>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
              {service.content}
            </p>
            <div style={{ width: '60px', height: '2px', background: 'var(--color-primary)', borderRadius: '2px', marginBottom: '32px' }}></div>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: 'var(--color-text-primary)' }}>
              Key Features
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {service.features.map((feature, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '16px' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="primary" size="lg">
              Get Started
            </Button>
          </div>
        </GlassCard>
      </div>
      
      {/* Security Dashboard & Attack Flow - Only shown on security page */}
      {service.showSecurityDashboard && (
        <>
          <Features />
          <TechShowcase />
        </>
      )}
    </div>
  );
}
