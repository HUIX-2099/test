'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import styles from './Testimonials.module.css';

// Helper to get initials
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0] || '').join('').toUpperCase();
};

const testimonials = [
  {
    id: 1,
    quote: "AmaraTech has been a game-changer for Snapper Hill Clinic. They helped us overcome IT challenges by implementing a secure, real-time solution that connects our team seamlessly while protecting sensitive healthcare data.",
    author: "Masmina Sirleaf",
    service: "Snapper Hill Clinic",
    company: "Snapper Hill Clinic",
    logo: "/testimonials/snapperhill.png",
  },
  {
    id: 2,
    quote: "[AmaraTech] orchestrated a comprehensive enterprise-wide infrastructure transformation that fundamentally enhanced our organization's security posture... through their expertise, we achieved CMMC Level 2 certification.",
    author: "Preston",
    service: "Cyber Security",
    company: "ORMANCE",
    logo: "/testimonials/ormance.png",
  },
  {
    id: 3,
    quote: "AmaraTech IT Solutions has been a huge asset to my business and its overall operations. AmaraTech IT has assisted us with obtaining O365, Google Suite, and has managed the back-end of our IT processes since its establishment.",
    author: "Letisha Vinson",
    service: "Cloud Solutions",
    company: "VMI",
    logo: "/testimonials/vmi.png",
  },
  {
    id: 4,
    quote: "For the past 3 years, AmaraTech IT Solutions have been supporting our organization. They provided IT Consultation for our African Heritage Festival. Our experience has been awesome and they continue to provide great service.",
    author: "Kemi Adetola",
    service: "IT Consulting",
    company: "African Heritage Festival",
    logo: "/testimonials/ahf.png",
  },
  {
    id: 5,
    quote: "When we were looking out for a cloud solution, there were some challenges concerning payment. Fortunately, AmaraTech provided a seamless solution that transformed our operations.",
    author: "Folley Fahnbulleh",
    service: "Office 365 Implementation",
    company: "Liberia Renewable Energy",
    logo: "/testimonials/lre.png",
  },
  {
    id: 6,
    quote: "AmaraTech IT have added so much value to my business this past year, especially during the height of COVID when I needed the most IT support and restructure. I had a meeting with Alieu and within weeks, my entire IT infrastructure was transformed.",
    author: "Abubakar Kamara",
    service: "Microsoft 365 & VOIP",
    company: "Healthcare Provider",
    logo: "/testimonials/healthcare.png",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (id: number) => {
    setFailedImages(prev => new Set(prev).add(id));
  };

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
          <h2 className={styles.title}>Hear from our Clients.</h2>
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
                {/* Author Header */}
                <div className={styles.authorHeader}>
                  <div className={styles.authorLogo}>
                    {failedImages.has(testimonial.id) ? (
                      <span className={styles.logoFallback}>
                        {getInitials(testimonial.author)}
                      </span>
                    ) : (
                      <Image
                        src={testimonial.logo}
                        alt={testimonial.company}
                        width={50}
                        height={50}
                        className={styles.logoImage}
                        onError={() => handleImageError(testimonial.id)}
                      />
                    )}
                  </div>
                  <span className={styles.authorName}>{testimonial.author}</span>
                </div>

                {/* Service Type */}
                <div className={styles.serviceType}>
                  <span className={styles.serviceLabel}>{testimonial.service}</span>
                </div>

                {/* Quote Text */}
                <blockquote className={styles.quote}>
                  {testimonial.quote}
                </blockquote>

                {/* Bottom Accent */}
                <div className={styles.cardAccent} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
