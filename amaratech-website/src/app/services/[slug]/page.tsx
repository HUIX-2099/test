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
