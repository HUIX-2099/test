'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }: StaggerContainerProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: index * staggerDelay,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const words = text.split(' ');

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.5,
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <motion.div
      className={className}
      animate={{
        textShadow: [
          '0 0 10px var(--color-primary)',
          '2px 0 10px var(--color-primary), -2px 0 10px var(--cyan-accent)',
          '0 0 10px var(--color-primary)',
        ],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 2,
      }}
    >
      {text}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function FloatingElement({ children, className = '', intensity = 10 }: FloatingElementProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      const moveX = (e.clientX - centerX) / centerX;
      const moveY = (e.clientY - centerY) / centerY;
      
      x.set(moveX * intensity);
      y.set(moveY * intensity);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, intensity]);

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function BlurReveal({ children, className = '' }: BlurRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        filter: `blur(${blur}px)`,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RotateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}

export function RotateOnScroll({ children, className = '', rotation = 360 }: RotateOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotation]);

  return (
    <motion.div ref={ref} className={className} style={{ rotate }}>
      {children}
    </motion.div>
  );
}
