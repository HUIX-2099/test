import type { Metadata } from "next";
import ProductCard from "@/components/common/ProductCard";
import styles from '../products.module.css';

export const metadata: Metadata = {
  title: "ImpactIQ - AI-Powered Vulnerability Management | AmaraTech",
  description: "Transform security findings into financial intelligence with ImpactIQ. Real-time risk quantification, financial impact analysis, and CFO-ready business intelligence.",
  openGraph: {
    title: "ImpactIQ - AI-Powered Vulnerability Management | AmaraTech",
    description: "Transform security findings into financial intelligence with ImpactIQ.",
  },
};

export default function ImpactIQ() {
  return (
    <div style={{ paddingTop: '90px', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 600, marginBottom: '16px', color: 'var(--color-text-primary)', textAlign: 'center' }}>
          ImpactIQ
        </h1>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '64px', textAlign: 'center', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          AI-Powered Vulnerability Management Platform
        </p>
        <ProductCard
          title="ImpactIQ"
          subtitle="AI-Powered Vulnerability Management"
          description="We're working at the intersection of cybersecurity intelligence and financial impact analysis to transform every security finding into CFO-ready business intelligence. ImpactIQ quantifies cyber risk in dollars, not just severity levels, helping security teams communicate business impact effectively."
          features={[
            'Real-time Risk Quantification - Overall risk score based on monitored applications',
            'Financial Impact Analysis - Quantifies security risks in monetary terms (e.g., $310K exposure tracking)',
            'Automated Vulnerability Management - Categorizes by severity (Critical, High, Medium, Low)',
            'SLA Compliance Tracking - Monitors remediation within service levels',
            'Application-Specific Insights - Risk distribution by application for targeted remediation',
            'CFO-Ready Business Intelligence - Executive dashboards and reporting',
          ]}
          learnMoreHref="#"
          actionHref="https://security.amaratechit.com"
          actionLabel="Access ImpactIQ Platform"
          className={styles.productCard}
        />
      </div>
    </div>
  );
}
