'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Search, 
  Shield, 
  Settings, 
  Activity,
  ArrowRight,
  Brain
} from 'lucide-react';
import styles from './Process.module.css';

const steps = [
  {
    number: '01',
    icon: Brain,
    title: 'AI Consultation',
    desc: 'Analyze your business needs with AI-powered insights and strategic planning.',
    duration: '1 week',
    outputs: ['AI Strategy', 'Use Case Analysis', 'ROI Projection']
  },
  {
    number: '02',
    icon: Search,
    title: 'Assessment',
    desc: 'Comprehensive security audit and vulnerability assessment of your infrastructure.',
    duration: '1-2 weeks',
    outputs: ['Risk Report', 'Gap Analysis', 'Roadmap']
  },
  {
    number: '03',
    icon: Shield,
    title: 'Implementation',
    desc: 'Deploy security controls, configure monitoring, and establish baselines.',
    duration: '2-4 weeks',
    outputs: ['Security Controls', 'Monitoring Setup', 'Policies']
  },
  {
    number: '04',
    icon: Activity,
    title: 'Monitoring',
    desc: 'Continuous 24/7 AI-powered threat monitoring and incident response.',
    duration: 'Ongoing',
    outputs: ['SOC Services', 'Alert Management', 'Reporting']
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={styles.process}>
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLabel}>
            <span className={styles.labelNumber}>[03]</span>
            <span className={styles.labelText}>PROCESS</span>
          </div>
          <h2 className={styles.title}>How We Work</h2>
          <p className={styles.subtitle}>
            A systematic approach to securing your digital infrastructure
          </p>
        </div>

        {/* Process Steps */}
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
              >
                {/* Step Header */}
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepIcon}>
                    <Icon size={20} />
                  </div>
                </div>

                {/* Step Content */}
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>

                {/* Duration */}
                <div className={styles.stepDuration}>
                  <span className={styles.durationLabel}>Duration:</span>
                  <span className={styles.durationValue}>{step.duration}</span>
                </div>

                {/* Outputs */}
                <div className={styles.stepOutputs}>
                  <span className={styles.outputsLabel}>Deliverables:</span>
                  <div className={styles.outputsList}>
                    {step.outputs.map((output, i) => (
                      <span key={i} className={styles.outputTag}>{output}</span>
                    ))}
                  </div>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className={styles.connector}>
                    <ArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className={styles.bottomStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4-8</span>
            <span className={styles.statLabel}>Weeks to Deploy</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Success Rate</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>Support Coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
