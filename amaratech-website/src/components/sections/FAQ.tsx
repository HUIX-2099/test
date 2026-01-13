'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'What cybersecurity services do you offer?',
    answer: 'We provide comprehensive security services including 24/7 threat monitoring, penetration testing, incident response, compliance consulting (CMMC, HIPAA, SOC 2), and managed security services through our Security Operations Center (SOC).'
  },
  {
    question: 'How quickly can you respond to security incidents?',
    answer: 'Our SOC team provides 24/7/365 coverage with an average incident response time of under 15 minutes. Critical threats are escalated immediately to our senior security analysts.'
  },
  {
    question: 'Do you support cloud migrations?',
    answer: 'Yes, we are Microsoft Azure Gold Partners and AWS Advanced Partners. We specialize in secure cloud migrations, hybrid cloud architectures, and cloud security posture management.'
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve healthcare, defense contractors, financial services, government agencies, and enterprises across all sectors. Our solutions are tailored to meet industry-specific compliance requirements.'
  },
  {
    question: 'How do you ensure compliance with regulations?',
    answer: 'We have dedicated compliance specialists who stay current with CMMC, HIPAA, SOC 2, GDPR, and other regulations. We provide gap assessments, implementation support, and ongoing compliance monitoring.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing including monthly managed services, project-based engagements, and retainer options. Contact us for a custom quote based on your specific needs and organization size.'
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isVideoInView = useInView(videoContainerRef, { once: true, margin: '-50px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play video when it comes into view
  useEffect(() => {
    if (isVideoInView && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser, user can click to play
      });
    }
  }, [isVideoInView]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <section ref={ref} className={styles.faq}>
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerLabel}>[06] FAQ</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Common questions about our services and approach
          </p>
        </div>

        {/* Main Content Grid - FAQ + Video */}
        <div className={styles.mainContent}>
          {/* FAQ List */}
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className={styles.questionNumber}>[{String(index + 1).padStart(2, '0')}]</span>
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={styles.questionIcon}>
                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Video Panel */}
          <motion.div
            className={styles.videoPanel}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.videoWrapper}>
              <div className={styles.videoFrame}>
                <span className={styles.videoLabel}>// AMARATECH_PROMO</span>
                <div className={styles.videoFrameDots}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div ref={videoContainerRef} className={styles.videoContainer}>
                <video
                  ref={videoRef}
                  className={styles.video}
                  poster="/other_images/AmaraTech IT Solutions.png"
                  muted
                  loop
                  playsInline
                  autoPlay
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/videos/AmaraTech .mp4" type="video/mp4" />
                </video>

                {/* Play Overlay */}
                {!isPlaying && (
                  <div className={styles.videoOverlay} onClick={toggleVideo}>
                    <motion.div 
                      className={styles.playBtn}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={28} fill="white" />
                    </motion.div>
                    <span className={styles.playLabel}>Watch Video</span>
                  </div>
                )}

                {/* Video Controls */}
                {isPlaying && (
                  <div className={styles.videoControls}>
                    <button onClick={toggleVideo} className={styles.controlBtn}>
                      <Pause size={16} />
                    </button>
                    <button onClick={toggleMute} className={styles.controlBtn}>
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Video Caption */}
            <div className={styles.videoCaption}>
              <span className={styles.captionTitle}>About AmaraTech</span>
              <span className={styles.captionDesc}>
                Learn about our mission, services, and global impact
              </span>
            </div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          className={styles.contactCTA}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <span className={styles.ctaText}>Still have questions?</span>
          <a href="/contact" className={styles.ctaLink}>
            Contact our team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
