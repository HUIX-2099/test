'use client';

import React, { useRef, useEffect, useState } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import styles from './ServerAnimation.module.css';

export default function ServerAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Main animation sequence
  useEffect(() => {
    if (!isInView || !svgRef.current) return;

    const svg = svgRef.current;

    // Get all paths for pencil drawing effect
    const serverPaths = svg.querySelectorAll('.server-line');
    const dataPaths = svg.querySelectorAll('.data-line');
    const connectionPaths = svg.querySelectorAll('.connection-line');
    const nodes = svg.querySelectorAll('.node');
    const dataPackets = svg.querySelectorAll('.data-packet');
    const pulseRings = svg.querySelectorAll('.pulse-ring');

    // Set up stroke dash for all paths
    const allPaths = [...serverPaths, ...dataPaths, ...connectionPaths];
    allPaths.forEach((el) => {
      const path = el as SVGPathElement;
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });

    // 1. Draw server outline (pencil effect)
    animate(serverPaths, {
      strokeDashoffset: 0,
      duration: 1500,
      delay: stagger(100),
      ease: 'inOutQuad',
    });

    // 2. Draw connection lines
    animate(connectionPaths, {
      strokeDashoffset: 0,
      duration: 1000,
      delay: stagger(150, { start: 1000 }),
      ease: 'inOutSine',
    });

    // 3. Pop in nodes
    animate(nodes, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(80, { start: 1500 }),
      ease: 'outBack',
    });

    // 4. Draw data flow lines
    animate(dataPaths, {
      strokeDashoffset: 0,
      duration: 800,
      delay: stagger(100, { start: 1800 }),
      ease: 'inOutQuad',
    });

    // 5. Continuous data packet animation
    animate(dataPackets, {
      translateX: [0, 300],
      opacity: [0, 1, 1, 0],
      duration: 3000,
      delay: stagger(500, { start: 2500 }),
      loop: true,
      ease: 'linear',
    });

    // 6. Pulse ring animation
    animate(pulseRings, {
      scale: [1, 2],
      opacity: [0.8, 0],
      duration: 2000,
      delay: stagger(400, { start: 2000 }),
      loop: true,
      ease: 'outSine',
    });

  }, [isInView]);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.svgWrapper}
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
        }}
      >
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox="0 0 600 400"
          fill="none"
        >
          <defs>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pencil texture filter */}
            <filter id="pencil" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Gradients */}
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C81E1E" />
              <stop offset="100%" stopColor="#FF4444" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D1FF" />
              <stop offset="100%" stopColor="#0099CC" />
            </linearGradient>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>

          {/* Server Rack - Left */}
          <g className="server-group" filter="url(#pencil)">
            {/* Server 1 outline */}
            <path
              className="server-line"
              d="M 50 80 L 50 200 L 150 200 L 150 80 L 50 80"
              stroke="url(#redGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            {/* Server slots */}
            <path className="server-line" d="M 60 100 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 60 120 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 60 140 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 60 160 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 60 180 H 140" stroke="#C81E1E" strokeWidth="1.5" fill="none" />

            {/* Status LEDs */}
            <circle className="node" cx="65" cy="90" r="3" fill="#22C55E" filter="url(#glow)" />
            <circle className="node" cx="75" cy="90" r="3" fill="#22C55E" filter="url(#glow)" />
            <circle className="node" cx="85" cy="90" r="3" fill="#C81E1E" filter="url(#glow)" />
          </g>

          {/* Central Processing Hub */}
          <g className="hub-group">
            {/* Main hexagon */}
            <path
              className="server-line"
              d="M 300 120 L 350 150 L 350 210 L 300 240 L 250 210 L 250 150 Z"
              stroke="url(#blueGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            {/* Inner hexagon */}
            <path
              className="server-line"
              d="M 300 145 L 330 162 L 330 198 L 300 215 L 270 198 L 270 162 Z"
              stroke="#00D1FF"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            {/* Core */}
            <circle className="node" cx="300" cy="180" r="15" fill="none" stroke="#00D1FF" strokeWidth="2" filter="url(#glow)" />
            <circle className="node" cx="300" cy="180" r="8" fill="#00D1FF" filter="url(#glow)" />
            
            {/* Pulse rings */}
            <circle className="pulse-ring" cx="300" cy="180" r="20" fill="none" stroke="#00D1FF" strokeWidth="1" />
            <circle className="pulse-ring" cx="300" cy="180" r="20" fill="none" stroke="#00D1FF" strokeWidth="1" />
          </g>

          {/* Server Rack - Right */}
          <g className="server-group" filter="url(#pencil)">
            <path
              className="server-line"
              d="M 450 80 L 450 200 L 550 200 L 550 80 L 450 80"
              stroke="url(#greenGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
            />
            <path className="server-line" d="M 460 100 H 540" stroke="#22C55E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 460 120 H 540" stroke="#22C55E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 460 140 H 540" stroke="#22C55E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 460 160 H 540" stroke="#22C55E" strokeWidth="1.5" fill="none" />
            <path className="server-line" d="M 460 180 H 540" stroke="#22C55E" strokeWidth="1.5" fill="none" />

            <circle className="node" cx="535" cy="90" r="3" fill="#22C55E" filter="url(#glow)" />
            <circle className="node" cx="525" cy="90" r="3" fill="#00D1FF" filter="url(#glow)" />
            <circle className="node" cx="515" cy="90" r="3" fill="#22C55E" filter="url(#glow)" />
          </g>

          {/* Connection Lines - Left to Center */}
          <path
            className="connection-line"
            d="M 150 120 Q 200 120 220 150 Q 240 180 250 180"
            stroke="url(#redGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
          />
          <path
            className="connection-line"
            d="M 150 160 Q 190 160 210 175 Q 230 190 250 190"
            stroke="#C81E1E"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />

          {/* Connection Lines - Right to Center */}
          <path
            className="connection-line"
            d="M 450 120 Q 400 120 380 150 Q 360 180 350 180"
            stroke="url(#greenGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
          />
          <path
            className="connection-line"
            d="M 450 160 Q 410 160 390 175 Q 370 190 350 190"
            stroke="#22C55E"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />

          {/* Data Flow Lines */}
          <g className="data-flow">
            {/* Bottom data highway */}
            <path
              className="data-line"
              d="M 100 280 H 500"
              stroke="#C81E1E"
              strokeWidth="2"
              strokeDasharray="10 5"
              fill="none"
              filter="url(#glow)"
            />
            <path
              className="data-line"
              d="M 100 300 H 500"
              stroke="#00D1FF"
              strokeWidth="2"
              strokeDasharray="10 5"
              fill="none"
              filter="url(#glow)"
            />
            <path
              className="data-line"
              d="M 100 320 H 500"
              stroke="#22C55E"
              strokeWidth="2"
              strokeDasharray="10 5"
              fill="none"
              filter="url(#glow)"
            />

            {/* Vertical connections to data highway */}
            <path className="connection-line" d="M 100 200 V 280" stroke="#C81E1E" strokeWidth="1.5" fill="none" />
            <path className="connection-line" d="M 300 240 V 280" stroke="#00D1FF" strokeWidth="1.5" fill="none" />
            <path className="connection-line" d="M 500 200 V 280" stroke="#22C55E" strokeWidth="1.5" fill="none" />
          </g>

          {/* Data Packets */}
          <g className="packets">
            <rect className="data-packet" data-direction="right" x="100" y="276" width="12" height="8" rx="2" fill="#C81E1E" filter="url(#glow)" />
            <rect className="data-packet" data-direction="left" x="400" y="296" width="12" height="8" rx="2" fill="#00D1FF" filter="url(#glow)" />
            <rect className="data-packet" data-direction="right" x="150" y="316" width="12" height="8" rx="2" fill="#22C55E" filter="url(#glow)" />
          </g>

          {/* Connection Nodes */}
          <circle className="node" cx="100" cy="280" r="5" fill="#C81E1E" filter="url(#glow)" />
          <circle className="node" cx="300" cy="280" r="5" fill="#00D1FF" filter="url(#glow)" />
          <circle className="node" cx="500" cy="280" r="5" fill="#22C55E" filter="url(#glow)" />

          {/* Binary/Hex Labels */}
          <text className="label" x="50" y="220" fill="#C81E1E" fontSize="10" fontFamily="monospace">0x7F01</text>
          <text className="label" x="275" y="260" fill="#00D1FF" fontSize="10" fontFamily="monospace">CORE_01</text>
          <text className="label" x="450" y="220" fill="#22C55E" fontSize="10" fontFamily="monospace">0xAE02</text>
          <text className="label" x="280" y="350" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">// DATA_STREAM_ACTIVE</text>
        </svg>
      </div>

      {/* Floating particles */}
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
