'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, AlertTriangle, TrendingUp, BarChart3, 
  Activity, ExternalLink, ChevronRight, DollarSign,
  Target, Clock, CheckCircle, XCircle, Zap, Eye,
  Lock, Server, Database, Cpu
} from 'lucide-react';
import styles from './products.module.css';
import wireflow from '../wireflow.module.css';

const vulnerabilityData = [
  { id: 'VUL-001', severity: 'Critical', asset: 'Web Server', impact: '$145,000', status: 'Open', sla: '2d' },
  { id: 'VUL-002', severity: 'High', asset: 'Database', impact: '$89,000', status: 'In Progress', sla: '5d' },
  { id: 'VUL-003', severity: 'Medium', asset: 'API Gateway', impact: '$34,000', status: 'Open', sla: '14d' },
  { id: 'VUL-004', severity: 'Critical', asset: 'Auth Service', impact: '$210,000', status: 'Resolved', sla: '1d' },
  { id: 'VUL-005', severity: 'Low', asset: 'CDN', impact: '$8,500', status: 'Open', sla: '30d' },
];

const features = [
  { icon: Target, title: 'Risk Assessment', desc: 'Overall risk score based on monitored applications' },
  { icon: DollarSign, title: 'Financial Impact', desc: 'Quantifies security risks in monetary terms' },
  { icon: Activity, title: 'Vulnerability Mgmt', desc: 'Categorizes by severity (Critical, High, Medium, Low)' },
  { icon: Clock, title: 'SLA Compliance', desc: 'Monitors remediation within service levels' },
];

const metrics = [
  { value: '87', label: 'Risk Score', suffix: '/100', color: '#C81E1E' },
  { value: '$310K', label: 'Total Exposure', suffix: '', color: '#FBBF24' },
  { value: '23', label: 'Critical Issues', suffix: '', color: '#EF4444' },
  { value: '94%', label: 'SLA Compliance', suffix: '', color: '#22C55E' },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={wireflow.page}>
      <div className={wireflow.gridBg} />
      
      {/* Wire Background */}
      <svg className={styles.wireBg} viewBox="0 0 1400 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C81E1E" stopOpacity="0" />
            <stop offset="50%" stopColor="#C81E1E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C81E1E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 400 Q350 300 700 400 T1400 400"
          stroke="url(#wireGrad)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </svg>

      <div className={wireflow.container}>
        {/* Header */}
        <header className={wireflow.pageHeader}>
          <div className={wireflow.breadcrumb}>
            <Link href="/">HOME</Link>
            <span className={wireflow.breadcrumbSep}>/</span>
            <span>PRODUCTS</span>
          </div>
          
          <div className={wireflow.pageHeaderInner}>
            <div className={wireflow.pageTitle}>
              <span className={wireflow.pageTitleCode}>// PRODUCTS.IMPACTIQ</span>
              <h1 className={wireflow.pageTitleMain}>
                Protocol <span className={wireflow.pageTitleAccent}>Details</span>
              </h1>
              <p className={wireflow.pageDescription}>
                Transform security findings into CFO-ready business intelligence. 
                Quantify cyber risk in dollars, not just severity levels.
              </p>
            </div>
            <div className={wireflow.pageNumber}>III.02</div>
          </div>
        </header>

        {/* Product Hero Card */}
        <motion.div 
          className={styles.productHero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.productHeroLeft}>
            <div className={styles.productLogo}>
              <Shield size={40} />
              <div className={styles.productLogoPulse} />
            </div>
            <div className={styles.productInfo}>
              <span className={styles.productLabel}>FEATURED PRODUCT</span>
              <h2 className={styles.productName}>ImpactIQ</h2>
              <span className={styles.productSub}>AI-Powered Vulnerability Management</span>
            </div>
          </div>
          <div className={styles.productHeroRight}>
            <Link href="/products/impactiq" className={wireflow.btnSecondary}>
              <Eye size={16} />
              View Details
            </Link>
            <a href="https://security.amaratechit.com" target="_blank" rel="noopener noreferrer" className={wireflow.btnPrimary}>
              <ExternalLink size={16} />
              Access Platform
            </a>
          </div>
        </motion.div>

        {/* Metrics Dashboard */}
        <div className={styles.metricsGrid}>
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              className={styles.metricCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className={styles.metricValue} style={{ color: metric.color }}>
                {metric.value}
                <span className={styles.metricSuffix}>{metric.suffix}</span>
              </div>
              <div className={styles.metricLabel}>{metric.label}</div>
              <div className={styles.metricWire} style={{ background: `linear-gradient(90deg, ${metric.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            {['overview', 'vulnerabilities', 'features'].map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className={styles.tabsWire}>
            <motion.div 
              className={styles.tabsWireActive}
              animate={{ left: activeTab === 'overview' ? '0%' : activeTab === 'vulnerabilities' ? '33.33%' : '66.66%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              className={styles.tabContent}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className={styles.overviewGrid}>
                <div className={styles.overviewMain}>
                  <div className={wireflow.nodeCard}>
                    <div className={wireflow.nodeHeader}>
                      <div className={wireflow.nodeIcon}><BarChart3 size={18} /></div>
                      <span className={wireflow.nodeTitle}>Risk Analysis</span>
                      <div className={wireflow.nodeStatus}>
                        <span className={wireflow.nodeStatusDot} />
                        LIVE
                      </div>
                    </div>
                    <div className={wireflow.nodeBody}>
                      <div className={styles.chartPlaceholder}>
                        <div className={styles.chartBars}>
                          {[80, 60, 90, 45, 75, 55, 85, 70, 95, 50].map((h, i) => (
                            <motion.div 
                              key={i}
                              className={styles.chartBar}
                              style={{ height: `${h}%` }}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: 0.1 * i, duration: 0.5 }}
                            />
                          ))}
                        </div>
                        <div className={styles.chartLabels}>
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m, i) => (
                            <span key={i}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.overviewSide}>
                  <div className={wireflow.nodeCard}>
                    <div className={wireflow.nodeHeader}>
                      <div className={wireflow.nodeIcon}><AlertTriangle size={18} /></div>
                      <span className={wireflow.nodeTitle}>Severity Distribution</span>
                    </div>
                    <div className={wireflow.nodeBody}>
                      <div className={styles.severityList}>
                        {[
                          { label: 'Critical', count: 23, color: '#EF4444' },
                          { label: 'High', count: 45, color: '#F97316' },
                          { label: 'Medium', count: 89, color: '#FBBF24' },
                          { label: 'Low', count: 134, color: '#22C55E' },
                        ].map((item, i) => (
                          <div key={i} className={styles.severityItem}>
                            <div className={styles.severityDot} style={{ background: item.color }} />
                            <span className={styles.severityLabel}>{item.label}</span>
                            <span className={styles.severityCount}>{item.count}</span>
                            <div className={styles.severityBar}>
                              <motion.div 
                                className={styles.severityFill}
                                style={{ background: item.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.count / 150) * 100}%` }}
                                transition={{ delay: 0.2 * i }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'vulnerabilities' && (
            <motion.div
              key="vulnerabilities"
              className={styles.tabContent}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className={wireflow.nodeCard}>
                <div className={wireflow.nodeHeader}>
                  <div className={wireflow.nodeIcon}><Database size={18} /></div>
                  <span className={wireflow.nodeTitle}>Latest Vulnerabilities</span>
                  <div className={wireflow.nodeStatus}>
                    <span className={wireflow.nodeStatusDot} />
                    MONITORING
                  </div>
                </div>
                <div className={styles.tableWrapper}>
                  <table className={wireflow.dataTable}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Severity</th>
                        <th>Asset</th>
                        <th>Financial Impact</th>
                        <th>Status</th>
                        <th>SLA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vulnerabilityData.map((vuln, i) => (
                        <motion.tr
                          key={vuln.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <td><code className={styles.vulnId}>{vuln.id}</code></td>
                          <td>
                            <span className={`${wireflow.statusBadge} ${
                              vuln.severity === 'Critical' ? wireflow.critical : 
                              vuln.severity === 'High' ? wireflow.pending : 
                              wireflow.active
                            }`}>
                              {vuln.severity}
                            </span>
                          </td>
                          <td>{vuln.asset}</td>
                          <td className={styles.impactValue}>{vuln.impact}</td>
                          <td>
                            {vuln.status === 'Resolved' ? (
                              <CheckCircle size={16} className={styles.iconSuccess} />
                            ) : vuln.status === 'In Progress' ? (
                              <Activity size={16} className={styles.iconWarning} />
                            ) : (
                              <XCircle size={16} className={styles.iconError} />
                            )}
                            {vuln.status}
                          </td>
                          <td>{vuln.sla}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div
              key="features"
              className={styles.tabContent}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className={styles.featuresGrid}>
                {features.map((feature, i) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      className={styles.featureCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className={`${wireflow.connectionPoint} ${wireflow.left}`} />
                      <div className={styles.featureIcon}>
                        <FeatureIcon size={24} />
                      </div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDesc}>{feature.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.ctaIcons}>
            <Lock size={24} />
            <Server size={24} />
            <Cpu size={24} />
          </div>
          <h3 className={styles.ctaTitle}>Ready to quantify your cyber risk?</h3>
          <p className={styles.ctaDesc}>
            Get started with ImpactIQ and transform how your organization understands security threats.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={wireflow.btnPrimary}>
              <Zap size={16} />
              Request Demo
            </Link>
          </div>
          
          <div className={`${wireflow.cornerDecor} ${wireflow.topLeft}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.topRight}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.bottomLeft}`} />
          <div className={`${wireflow.cornerDecor} ${wireflow.bottomRight}`} />
        </motion.div>
      </div>
    </div>
  );
}
