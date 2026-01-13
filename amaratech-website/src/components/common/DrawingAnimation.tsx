'use client';

import React, { useRef, useEffect, useState } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import styles from './DrawingAnimation.module.css';

interface DrawingAnimationProps {
  type?: 'circuit' | 'network' | 'shield' | 'cloud';
}

export default function DrawingAnimation({ type = 'circuit' }: DrawingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsInView(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !svgRef.current) return;

    const svg = svgRef.current;
    const paths = svg.querySelectorAll('path');
    const circles = svg.querySelectorAll('circle');
    const rects = svg.querySelectorAll('rect');
    const texts = svg.querySelectorAll('text');

    // Set up stroke dash for paths
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });

    // 1. Draw all paths (pencil stroke effect)
    animate(paths, {
      strokeDashoffset: 0,
      duration: 1500,
      delay: stagger(80),
      ease: 'inOutSine',
    });

    // 2. Fade in circles
    animate(circles, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 400,
      delay: stagger(60, { start: 700 }),
      ease: 'outBack',
    });

    // 3. Pop in rectangles
    animate(rects, {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 300,
      delay: stagger(50, { start: 1100 }),
      ease: 'outCubic',
    });

    // 4. Fade in text labels
    animate(texts, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
      delay: stagger(100, { start: 1300 }),
      ease: 'outCubic',
    });

    // Continuous animation for glowing elements
    animate(svg.querySelectorAll('.glow-pulse'), {
      opacity: [0.5, 1, 0.5],
      scale: [0.95, 1.05, 0.95],
      duration: 2000,
      loop: true,
      ease: 'inOutSine',
    });

  }, [isInView]);

  const renderCircuit = () => (
    <svg ref={svgRef} className={styles.svg} viewBox="0 0 400 300" fill="none">
      <defs>
        <filter id="drawGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C81E1E" />
          <stop offset="50%" stopColor="#00D1FF" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* Main circuit board outline */}
      <path
        d="M 50 50 L 350 50 L 350 250 L 50 250 Z"
        stroke="#C81E1E"
        strokeWidth="2"
        fill="none"
        filter="url(#drawGlow)"
      />

      {/* Horizontal traces */}
      <path d="M 70 80 H 180" stroke="#00D1FF" strokeWidth="1.5" fill="none" />
      <path d="M 220 80 H 330" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
      <path d="M 70 150 H 150 L 170 130 H 250 L 270 150 H 330" stroke="url(#circuitGrad)" strokeWidth="2" fill="none" filter="url(#drawGlow)" />
      <path d="M 70 220 H 330" stroke="#22C55E" strokeWidth="1.5" fill="none" />

      {/* Vertical traces */}
      <path d="M 100 80 V 220" stroke="#00D1FF" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 200 50 V 100 L 180 120 V 180 L 200 200 V 250" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
      <path d="M 300 80 V 220" stroke="#22C55E" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Diagonal connections */}
      <path d="M 150 100 L 180 130" stroke="#00D1FF" strokeWidth="1.5" fill="none" />
      <path d="M 250 100 L 220 130" stroke="#C81E1E" strokeWidth="1.5" fill="none" />

      {/* IC Chips */}
      <rect x="130" y="160" width="60" height="40" rx="4" stroke="#C81E1E" strokeWidth="2" fill="rgba(200,30,30,0.1)" />
      <rect x="210" y="160" width="60" height="40" rx="4" stroke="#00D1FF" strokeWidth="2" fill="rgba(0,209,255,0.1)" />

      {/* Chip pins */}
      <path d="M 140 160 V 150" stroke="#C81E1E" strokeWidth="1" />
      <path d="M 155 160 V 150" stroke="#C81E1E" strokeWidth="1" />
      <path d="M 170 160 V 150" stroke="#C81E1E" strokeWidth="1" />
      <path d="M 220 160 V 150" stroke="#00D1FF" strokeWidth="1" />
      <path d="M 240 160 V 150" stroke="#00D1FF" strokeWidth="1" />
      <path d="M 260 160 V 150" stroke="#00D1FF" strokeWidth="1" />

      {/* Connection nodes */}
      <circle cx="100" cy="80" r="4" fill="#00D1FF" className="glow-pulse" filter="url(#drawGlow)" />
      <circle cx="200" cy="150" r="5" fill="#C81E1E" className="glow-pulse" filter="url(#drawGlow)" />
      <circle cx="300" cy="80" r="4" fill="#22C55E" className="glow-pulse" filter="url(#drawGlow)" />
      <circle cx="100" cy="220" r="4" fill="#00D1FF" filter="url(#drawGlow)" />
      <circle cx="200" cy="220" r="4" fill="#C81E1E" filter="url(#drawGlow)" />
      <circle cx="300" cy="220" r="4" fill="#22C55E" filter="url(#drawGlow)" />

      {/* Central processor */}
      <circle cx="200" cy="150" r="15" stroke="#C81E1E" strokeWidth="2" fill="none" filter="url(#drawGlow)" />
      <circle cx="200" cy="150" r="8" fill="#C81E1E" className="glow-pulse" filter="url(#drawGlow)" />

      {/* Labels */}
      <text x="145" y="185" fill="#C81E1E" fontSize="8" fontFamily="monospace">CPU_01</text>
      <text x="225" y="185" fill="#00D1FF" fontSize="8" fontFamily="monospace">MEM_02</text>
      <text x="165" y="270" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">// CIRCUIT_ACTIVE</text>
    </svg>
  );

  const renderNetwork = () => (
    <svg ref={svgRef} className={styles.svg} viewBox="0 0 400 300" fill="none">
      <defs>
        <filter id="netGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central hub */}
      <circle cx="200" cy="150" r="30" stroke="#00D1FF" strokeWidth="3" fill="rgba(0,209,255,0.1)" filter="url(#netGlow)" />
      <circle cx="200" cy="150" r="15" fill="#00D1FF" className="glow-pulse" filter="url(#netGlow)" />

      {/* Network nodes */}
      <circle cx="80" cy="80" r="20" stroke="#C81E1E" strokeWidth="2" fill="rgba(200,30,30,0.1)" />
      <circle cx="320" cy="80" r="20" stroke="#C81E1E" strokeWidth="2" fill="rgba(200,30,30,0.1)" />
      <circle cx="80" cy="220" r="20" stroke="#22C55E" strokeWidth="2" fill="rgba(34,197,94,0.1)" />
      <circle cx="320" cy="220" r="20" stroke="#22C55E" strokeWidth="2" fill="rgba(34,197,94,0.1)" />

      {/* Node cores */}
      <circle cx="80" cy="80" r="8" fill="#C81E1E" className="glow-pulse" filter="url(#netGlow)" />
      <circle cx="320" cy="80" r="8" fill="#C81E1E" className="glow-pulse" filter="url(#netGlow)" />
      <circle cx="80" cy="220" r="8" fill="#22C55E" className="glow-pulse" filter="url(#netGlow)" />
      <circle cx="320" cy="220" r="8" fill="#22C55E" className="glow-pulse" filter="url(#netGlow)" />

      {/* Connection lines */}
      <path d="M 100 95 L 175 135" stroke="#C81E1E" strokeWidth="2" fill="none" filter="url(#netGlow)" />
      <path d="M 300 95 L 225 135" stroke="#C81E1E" strokeWidth="2" fill="none" filter="url(#netGlow)" />
      <path d="M 100 205 L 175 165" stroke="#22C55E" strokeWidth="2" fill="none" filter="url(#netGlow)" />
      <path d="M 300 205 L 225 165" stroke="#22C55E" strokeWidth="2" fill="none" filter="url(#netGlow)" />

      {/* Cross connections */}
      <path d="M 100 80 H 300" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5 5" fill="none" />
      <path d="M 100 220 H 300" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5 5" fill="none" />
      <path d="M 80 100 V 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5 5" fill="none" />
      <path d="M 320 100 V 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5 5" fill="none" />

      {/* Labels */}
      <text x="65" y="55" fill="#C81E1E" fontSize="9" fontFamily="monospace">NODE_A</text>
      <text x="295" y="55" fill="#C81E1E" fontSize="9" fontFamily="monospace">NODE_B</text>
      <text x="65" y="260" fill="#22C55E" fontSize="9" fontFamily="monospace">NODE_C</text>
      <text x="295" y="260" fill="#22C55E" fontSize="9" fontFamily="monospace">NODE_D</text>
      <text x="178" y="155" fill="#00D1FF" fontSize="9" fontFamily="monospace">HUB</text>
    </svg>
  );

  const renderShield = () => (
    <svg ref={svgRef} className={styles.svg} viewBox="0 0 400 300" fill="none">
      <defs>
        <filter id="shieldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C81E1E" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* Shield outline */}
      <path
        d="M 200 30 L 320 70 L 320 150 Q 320 220 200 270 Q 80 220 80 150 L 80 70 Z"
        stroke="url(#shieldGrad)"
        strokeWidth="3"
        fill="none"
        filter="url(#shieldGlow)"
      />

      {/* Inner shield */}
      <path
        d="M 200 55 L 295 85 L 295 145 Q 295 200 200 240 Q 105 200 105 145 L 105 85 Z"
        stroke="#00D1FF"
        strokeWidth="2"
        fill="rgba(0,209,255,0.05)"
      />

      {/* Checkmark */}
      <path
        d="M 150 150 L 180 180 L 250 110"
        stroke="#22C55E"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#shieldGlow)"
      />

      {/* Security rings */}
      <circle cx="200" cy="150" r="50" stroke="#C81E1E" strokeWidth="1" fill="none" strokeDasharray="5 10" className="glow-pulse" />
      <circle cx="200" cy="150" r="70" stroke="#00D1FF" strokeWidth="1" fill="none" strokeDasharray="3 8" />

      {/* Lock icon */}
      <rect x="185" y="200" width="30" height="25" rx="3" stroke="#C81E1E" strokeWidth="2" fill="none" />
      <path d="M 190 200 V 190 Q 190 175 200 175 Q 210 175 210 190 V 200" stroke="#C81E1E" strokeWidth="2" fill="none" />
      <circle cx="200" cy="212" r="3" fill="#C81E1E" className="glow-pulse" filter="url(#shieldGlow)" />

      {/* Labels */}
      <text x="170" y="285" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">PROTECTED</text>
    </svg>
  );

  const renderCloud = () => (
    <svg ref={svgRef} className={styles.svg} viewBox="0 0 400 300" fill="none">
      <defs>
        <filter id="cloudGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main cloud */}
      <path
        d="M 100 180 Q 60 180 60 140 Q 60 100 110 100 Q 120 60 180 60 Q 240 60 260 100 Q 320 95 340 130 Q 360 165 320 180 Z"
        stroke="#00D1FF"
        strokeWidth="3"
        fill="rgba(0,209,255,0.1)"
        filter="url(#cloudGlow)"
      />

      {/* Cloud details */}
      <path d="M 120 140 Q 140 120 180 130" stroke="#00D1FF" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M 200 100 Q 240 90 280 110" stroke="#00D1FF" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Server icons inside cloud */}
      <rect x="130" y="120" width="40" height="35" rx="3" stroke="#C81E1E" strokeWidth="2" fill="rgba(200,30,30,0.2)" />
      <rect x="180" y="110" width="40" height="45" rx="3" stroke="#22C55E" strokeWidth="2" fill="rgba(34,197,94,0.2)" />
      <rect x="230" y="120" width="40" height="35" rx="3" stroke="#C81E1E" strokeWidth="2" fill="rgba(200,30,30,0.2)" />

      {/* Server status lights */}
      <circle cx="140" cy="130" r="3" fill="#22C55E" className="glow-pulse" filter="url(#cloudGlow)" />
      <circle cx="190" cy="120" r="3" fill="#22C55E" className="glow-pulse" filter="url(#cloudGlow)" />
      <circle cx="240" cy="130" r="3" fill="#22C55E" className="glow-pulse" filter="url(#cloudGlow)" />

      {/* Download arrows */}
      <path d="M 150 180 V 220 L 140 210 M 150 220 L 160 210" stroke="#00D1FF" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 200 180 V 230 L 190 220 M 200 230 L 210 220" stroke="#C81E1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 250 180 V 220 L 240 210 M 250 220 L 260 210" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Connection dots */}
      <circle cx="150" cy="240" r="5" fill="#00D1FF" filter="url(#cloudGlow)" />
      <circle cx="200" cy="250" r="5" fill="#C81E1E" filter="url(#cloudGlow)" />
      <circle cx="250" cy="240" r="5" fill="#22C55E" filter="url(#cloudGlow)" />

      {/* Labels */}
      <text x="165" y="275" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">CLOUD_SYNC</text>
    </svg>
  );

  const renderContent = () => {
    switch (type) {
      case 'network':
        return renderNetwork();
      case 'shield':
        return renderShield();
      case 'cloud':
        return renderCloud();
      default:
        return renderCircuit();
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {renderContent()}
    </div>
  );
}
