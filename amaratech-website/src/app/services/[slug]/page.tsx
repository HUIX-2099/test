import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlassCard from "@/components/common/GlassCard";
import Button from "@/components/common/Button";

const services: Record<string, {
  title: string;
  description: string;
  content: string;
  features: string[];
}> = {
  azure: {
    title: 'Microsoft Azure',
    description: 'Strategic partnership with Microsoft for cloud transformation and Azure migration.',
    content: 'At AmaraTech IT Solutions, we are proud to announce our strategic partnership with Microsoft, a collaboration designed to revolutionize the way businesses embrace cloud technology. Our Azure services help organizations migrate, optimize, and manage their cloud infrastructure with confidence.',
    features: [
      'Azure Migration Strategy',
      'Microsoft Office 365',
      'Cloud Infrastructure Management',
      'Azure Security & Compliance',
      'Cost Optimization',
      '24/7 Azure Monitoring',
    ],
  },
  cloud: {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and architecture for modern businesses.',
    content: 'Transform your IT infrastructure with scalable cloud solutions designed for modern businesses. From networking to storage, we provide comprehensive cloud services that help organizations achieve agility, scalability, and cost-efficiency.',
    features: [
      'Cloud Architecture Design',
      'Infrastructure Scaling',
      'Data Storage Solutions',
      'Cloud Security',
      'Disaster Recovery',
      'Multi-Cloud Strategy',
    ],
  },
  security: {
    title: 'Cyber Security',
    description: '24/7 threat monitoring, incident response, and comprehensive security services.',
    content: 'Protect your digital assets with enterprise-grade cybersecurity services. Our team provides 24/7 threat detection, monitoring, and rapid incident response to ensure your systems are protected at all times. We specialize in advanced threat prevention and security posture management.',
    features: [
      '24/7 Threat Monitoring',
      'Data Protection',
      'Incident Response',
      'Security Audits',
      'Penetration Testing',
      'Security Training',
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
    content: 'Streamline government operations with modern e-governance solutions. From licensing to compliance reporting, we help public sector organizations digitize efficiently while ensuring security, compliance, and citizen satisfaction.',
    features: [
      'Digital Licensing Systems',
      'Compliance Reporting',
      'Citizen Services Portal',
      'Document Management',
      'Workflow Automation',
      'Data Analytics',
    ],
  },
  ai: {
    title: 'Artificial Intelligence',
    description: 'Custom AI and machine learning solutions for business automation.',
    content: 'Harness the power of AI to automate processes, gain insights, and drive innovation. We develop custom AI solutions tailored to your business needs, from machine learning models to intelligent automation systems.',
    features: [
      'AI Strategy & Planning',
      'Machine Learning Solutions',
      'AI Integration Services',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services[params.slug];
  
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

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug];

  if (!service) {
    notFound();
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
    </div>
  );
}
