'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    quote: "AmaraTech transformed our security posture completely. Their 24/7 SOC services detected and neutralized a major threat within minutes.",
    author: "Sarah Chen",
    role: "CISO",
    company: "TechCorp Industries",
    rating: 5,
    image: "SC"
  },
  {
    id: 2,
    quote: "The Azure migration was seamless. Their team's expertise saved us months of work and significantly reduced our cloud costs.",
    author: "Michael Rodriguez",
    role: "VP of Engineering",
    company: "HealthFirst Systems",
    rating: 5,
    image: "MR"
  },
  {
    id: 3,
    quote: "Their CMMC compliance guidance was invaluable. We achieved Level 3 certification ahead of schedule thanks to their structured approach.",
    author: "David Kim",
    role: "CEO",
    company: "DefenseTech Solutions",
    rating: 5,
    image: "DK"
  },
  {
    id: 4,
    quote: "Outstanding support and expertise. AmaraTech helped us implement a zero-trust architecture that exceeded our security requirements.",
    author: "Jennifer Walsh",
    role: "IT Director",
    company: "Federal Solutions Group",
    rating: 5,
    image: "JW"
  },
  {
    id: 5,
    quote: "Their managed IT services reduced our downtime by 95%. The proactive monitoring caught issues before they became problems.",
    author: "Robert Thompson",
    role: "COO",
    company: "MedCore Healthcare",
    rating: 5,
    image: "RT"
  },
  {
    id: 6,
    quote: "Professional, responsive, and incredibly knowledgeable. AmaraTech is our trusted partner for all things cybersecurity.",
    author: "Amanda Foster",
    role: "CTO",
    company: "FinanceFlow Inc",
    rating: 5,
    image: "AF"
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        // Reset when we've scrolled half (the duplicated content)
        if (scrollPos >= track.scrollWidth / 2) {
          scrollPos = 0;
        }
        track.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const scrollLeft = () => {
    const track = trackRef.current;
    if (track) {
      const currentTransform = track.style.transform;
      const match = currentTransform.match(/translateX\(-?(\d+\.?\d*)px\)/);
      const currentPos = match ? parseFloat(match[1]) : 0;
      const cardWidth = 380;
      track.style.transform = `translateX(-${Math.max(0, currentPos - cardWidth)}px)`;
    }
  };

  const scrollRight = () => {
    const track = trackRef.current;
    if (track) {
      const currentTransform = track.style.transform;
      const match = currentTransform.match(/translateX\(-?(\d+\.?\d*)px\)/);
      const currentPos = match ? parseFloat(match[1]) : 0;
      const cardWidth = 380;
      track.style.transform = `translateX(-${currentPos + cardWidth}px)`;
    }
  };

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className={styles.testimonials}>
      <div className={styles.gridOverlay} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerLabel}>[05] TESTIMONIALS</span>
          <h2 className={styles.title}>What Our Clients Say</h2>
        </div>

        {/* Navigation Arrows */}
        <div className={styles.navigation}>
          <button 
            className={styles.navButton} 
            onClick={scrollLeft}
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className={styles.navButton} 
            onClick={scrollRight}
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Testimonials Sliding Track */}
        <div 
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={trackRef} className={styles.track}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: Math.min(index * 0.1, 0.5) }}
              >
                {/* Quote Icon */}
                <div className={styles.quoteIcon}>
                  <Quote size={24} />
                </div>

                {/* Quote Text */}
                <blockquote className={styles.quote}>
                  "{testimonial.quote}"
                </blockquote>

                {/* Rating */}
                <div className={styles.rating}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                {/* Author */}
                <div className={styles.author}>
                  <div className={styles.authorImage}>
                    {testimonial.image}
                  </div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{testimonial.author}</span>
                    <span className={styles.authorRole}>
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4.9</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Retention Rate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
