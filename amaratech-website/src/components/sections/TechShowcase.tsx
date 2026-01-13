'use client';

import React, { useRef, useEffect, useState } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import { Shield, Server, Cloud, Cpu, Lock, Zap, Activity, Database } from 'lucide-react';
import styles from './TechShowcase.module.css';

const techCards = [
  { icon: Shield, title: 'Security', color: '#C81E1E' },
  { icon: Cloud, title: 'Cloud', color: '#00D1FF' },
  { icon: Server, title: 'Infrastructure', color: '#22C55E' },
  { icon: Database, title: 'Data', color: '#C81E1E' },
];

export default function TechShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasAnimated = useRef(false);

  // Intersection Observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsInView(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Main animation sequence
  useEffect(() => {
    if (!isInView) return;

    const svg = svgRef.current;
    const cards = cardsRef.current;

    // 1. Draw main circuit board outline (pencil effect)
    if (svg) {
      const outlinePaths = svg.querySelectorAll('.outline-path');
      const detailPaths = svg.querySelectorAll('.detail-path');
      const nodes = svg.querySelectorAll('.circuit-node');
      const dataLines = svg.querySelectorAll('.data-line');

      // Set up stroke dash for paths
      outlinePaths.forEach((el) => {
        const path = el as SVGPathElement;
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
      });

      detailPaths.forEach((el) => {
        const path = el as SVGPathElement;
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
      });

      dataLines.forEach((el) => {
        const path = el as SVGPathElement;
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
      });

      // Animate outline paths
      animate(outlinePaths, {
        strokeDashoffset: 0,
        duration: 2000,
        delay: stagger(200),
        ease: 'inOutQuad',
      });

      // Animate detail paths
      animate(detailPaths, {
        strokeDashoffset: 0,
        duration: 1000,
        delay: stagger(100, { start: 500 }),
        ease: 'inOutSine',
      });

      // Animate nodes
      animate(nodes, {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(50, { start: 1500 }),
        ease: 'outBack',
      });

      // Continuous data flow
      animate(dataLines, {
        strokeDashoffset: 0,
        duration: 1500,
        loop: true,
        alternate: true,
        ease: 'linear',
        delay: stagger(300, { start: 2000 }),
      });
    }

    // 2. Stagger in tech cards
    if (cards) {
      const cardElements = cards.querySelectorAll('[data-card]');
      animate(cardElements, {
        translateY: [60, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        rotateX: [15, 0],
        duration: 800,
        delay: stagger(150, { start: 1000 }),
        ease: 'outCubic',
      });

      // Card icons pulse
      animate(cards.querySelectorAll('[data-card-icon]'), {
        scale: [1, 1.1, 1],
        duration: 2000,
        loop: true,
        delay: stagger(200, { start: 2000 }),
        ease: 'inOutSine',
      });
    }

  }, [isInView]);

  return (
    <section ref={sectionRef} className={styles.showcase}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>[05] TECH_STACK</span>
          <h2 className={styles.title}>Computing Power</h2>
          <p className={styles.subtitle}>
            Watch our infrastructure come to life with real-time visualization
          </p>
        </div>

        {/* Main SVG Animation */}
        <div className={styles.svgContainer}>
          <svg ref={svgRef} className={styles.svg} viewBox="0 0 800 400" fill="none">
            <defs>
              <filter id="techGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="sketch" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
              </filter>
              <linearGradient id="techRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C81E1E" />
                <stop offset="100%" stopColor="#FF4444" />
              </linearGradient>
              <linearGradient id="techBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D1FF" />
                <stop offset="100%" stopColor="#0088AA" />
              </linearGradient>
              <linearGradient id="techGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
            </defs>

            {/* Main Server Rack - Left */}
            <g className="server-left">
              <path
                className="outline-path"
                d="M 50 100 L 50 300 L 150 300 L 150 100 Z"
                stroke="url(#techRedGrad)"
                strokeWidth="2"
                fill="none"
                filter="url(#techGlow)"
              />
              {/* Server slots */}
              <path className="detail-path" d="M 60 130 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 60 160 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 60 190 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 60 220 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 60 250 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 60 280 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
              
              {/* LEDs */}
              <circle className="circuit-node" cx="65" cy="115" r="3" fill="#22C55E" filter="url(#techGlow)" />
              <circle className="circuit-node" cx="75" cy="115" r="3" fill="#22C55E" filter="url(#techGlow)" />
              <circle className="circuit-node" cx="85" cy="115" r="3" fill="#C81E1E" filter="url(#techGlow)" />
            </g>

            {/* Central Processing Unit */}
            <g className="central-cpu">
              {/* Hexagon processor */}
              <path
                className="outline-path"
                d="M 400 80 L 480 120 L 480 200 L 400 240 L 320 200 L 320 120 Z"
                stroke="url(#techBlueGrad)"
                strokeWidth="3"
                fill="none"
                filter="url(#techGlow)"
              />
              <path
                className="detail-path"
                d="M 400 110 L 450 135 L 450 185 L 400 210 L 350 185 L 350 135 Z"
                stroke="#00D1FF"
                strokeWidth="1.5"
                fill="rgba(0, 209, 255, 0.05)"
              />
              
              {/* Core */}
              <circle className="circuit-node" cx="400" cy="160" r="20" stroke="#00D1FF" strokeWidth="2" fill="none" filter="url(#techGlow)" />
              <circle className="circuit-node" cx="400" cy="160" r="10" fill="#00D1FF" filter="url(#techGlow)" />

              {/* Processor pins */}
              <path className="detail-path" d="M 360 80 V 120" stroke="#00D1FF" strokeWidth="1" fill="none" />
              <path className="detail-path" d="M 380 70 V 110" stroke="#00D1FF" strokeWidth="1" fill="none" />
              <path className="detail-path" d="M 400 65 V 105" stroke="#00D1FF" strokeWidth="1" fill="none" />
              <path className="detail-path" d="M 420 70 V 110" stroke="#00D1FF" strokeWidth="1" fill="none" />
              <path className="detail-path" d="M 440 80 V 120" stroke="#00D1FF" strokeWidth="1" fill="none" />
            </g>

            {/* Server Rack - Right */}
            <g className="server-right">
              <path
                className="outline-path"
                d="M 650 100 L 650 300 L 750 300 L 750 100 Z"
                stroke="url(#techGreenGrad)"
                strokeWidth="2"
                fill="none"
                filter="url(#techGlow)"
              />
              <path className="detail-path" d="M 660 130 H 740" stroke="#22C55E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 660 160 H 740" stroke="#22C55E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 660 190 H 740" stroke="#22C55E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 660 220 H 740" stroke="#22C55E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 660 250 H 740" stroke="#22C55E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 660 280 H 740" stroke="#22C55E" strokeWidth="1.5" fill="none" />

              <circle className="circuit-node" cx="735" cy="115" r="3" fill="#22C55E" filter="url(#techGlow)" />
              <circle className="circuit-node" cx="725" cy="115" r="3" fill="#00D1FF" filter="url(#techGlow)" />
              <circle className="circuit-node" cx="715" cy="115" r="3" fill="#22C55E" filter="url(#techGlow)" />
            </g>

            {/* Connection Lines - Left to Center */}
            <path
              className="outline-path"
              d="M 150 150 Q 200 150 235 140 Q 270 130 320 140"
              stroke="url(#techRedGrad)"
              strokeWidth="2"
              fill="none"
              filter="url(#techGlow)"
            />
            <path
              className="outline-path"
              d="M 150 200 Q 220 200 270 180 Q 320 160 320 180"
              stroke="#C81E1E"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />

            {/* Connection Lines - Right to Center */}
            <path
              className="outline-path"
              d="M 650 150 Q 600 150 565 140 Q 530 130 480 140"
              stroke="url(#techGreenGrad)"
              strokeWidth="2"
              fill="none"
              filter="url(#techGlow)"
            />
            <path
              className="outline-path"
              d="M 650 200 Q 580 200 530 180 Q 480 160 480 180"
              stroke="#22C55E"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />

            {/* Data Highway */}
            <g className="data-highway">
              <path
                className="outline-path"
                d="M 100 350 H 700"
                stroke="#C81E1E"
                strokeWidth="2"
                strokeDasharray="8 4"
                fill="none"
                filter="url(#techGlow)"
              />
              <path
                className="detail-path"
                d="M 100 365 H 700"
                stroke="#00D1FF"
                strokeWidth="2"
                strokeDasharray="8 4"
                fill="none"
                filter="url(#techGlow)"
              />
              <path
                className="detail-path"
                d="M 100 380 H 700"
                stroke="#22C55E"
                strokeWidth="2"
                strokeDasharray="8 4"
                fill="none"
                filter="url(#techGlow)"
              />

              {/* Vertical connections to highway */}
              <path className="detail-path" d="M 100 300 V 350" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 400 240 V 350" stroke="#00D1FF" strokeWidth="1.5" fill="none" />
              <path className="detail-path" d="M 700 300 V 350" stroke="#22C55E" strokeWidth="1.5" fill="none" />
            </g>

            {/* Data flow lines (animated) */}
            <path className="data-line" d="M 100 350 H 300" stroke="#C81E1E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
            <path className="data-line" d="M 300 365 H 500" stroke="#00D1FF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
            <path className="data-line" d="M 500 380 H 700" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />

            {/* Junction nodes */}
            <circle className="circuit-node" cx="100" cy="350" r="5" fill="#C81E1E" filter="url(#techGlow)" />
            <circle className="circuit-node" cx="400" cy="350" r="6" fill="#00D1FF" filter="url(#techGlow)" />
            <circle className="circuit-node" cx="700" cy="350" r="5" fill="#22C55E" filter="url(#techGlow)" />

            {/* Labels */}
            <text x="70" y="320" fill="#C81E1E" fontSize="10" fontFamily="monospace">SRV_01</text>
            <text x="375" y="270" fill="#00D1FF" fontSize="10" fontFamily="monospace">CPU_CORE</text>
            <text x="670" y="320" fill="#22C55E" fontSize="10" fontFamily="monospace">SRV_02</text>
            <text x="350" y="395" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">// DATA_STREAM_ACTIVE</text>
          </svg>
        </div>

        {/* Tech Cards */}
        <div ref={cardsRef} className={styles.cardsGrid}>
          {techCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                data-card
                className={styles.card}
                style={{ '--card-color': card.color, opacity: 0 } as React.CSSProperties}
              >
                <div data-card-icon className={styles.cardIcon} style={{ color: card.color }}>
                  <Icon size={28} />
                </div>
                <span className={styles.cardTitle}>{card.title}</span>
                <div className={styles.cardWire}>
                  <div className={styles.wirePulse} style={{ background: card.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
