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
    icon: Search,
    title: 'Assessment',
    desc: 'Identify vulnerabilities with a comprehensive security review. Evaluate compliance gaps and technology risks.',
    duration: '1-2 weeks',
    outputs: ['Risk Report', 'Gap Analysis', 'Compliance Review']
  },
  {
    number: '02',
    icon: Shield,
    title: 'Implementation',
    desc: 'Deploy tailored cybersecurity and IT solutions. Strengthen cloud, network, and endpoint security.',
    duration: '2-4 weeks',
    outputs: ['Security Controls', 'Cloud Setup', 'Network Hardening']
  },
  {
    number: '03',
    icon: Activity,
    title: 'Ongoing Protection',
    desc: '24/7 threat monitoring and rapid incident response. Continuous updates to stay ahead of evolving threats.',
    duration: 'Ongoing',
    outputs: ['SOC Services', 'Threat Monitoring', 'Incident Response']
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
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            Securing your business doesn&apos;t have to be complicated. At AmaraTech IT, 
            we follow a proven, step-by-step process to protect your organization.
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
      </div>
    </section>
  );
}
