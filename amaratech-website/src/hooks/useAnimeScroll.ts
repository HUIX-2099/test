'use client';

import { useEffect, useRef, RefObject } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import type { JSAnimation, AnimationParams, Timeline } from 'animejs';

interface AnimeScrollOptions {
  threshold?: number;
  once?: boolean;
}

// Hook to trigger anime.js animation when element enters viewport
export function useAnimeScroll<T extends HTMLElement>(
  animationConfig: AnimationParams,
  options: AnimeScrollOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);
  const { threshold = 0.2, once = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;

            animate(element, animationConfig);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animationConfig, threshold, once]);

  return ref;
}

// Hook for staggered element animations
export function useAnimeStagger(
  selector: string,
  containerRef: RefObject<HTMLElement | null>,
  animationConfig: AnimationParams,
  options: AnimeScrollOptions = {}
) {
  const hasAnimated = useRef(false);
  const { threshold = 0.2, once = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;

            const elements = container.querySelectorAll(selector);
            animate(elements, animationConfig);
          }
        });
      },
      { threshold }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [selector, containerRef, animationConfig, threshold, once]);
}

// Hook for SVG path drawing animation
export function useAnimePathDraw(
  pathRef: RefObject<SVGPathElement | null>,
  options: AnimeScrollOptions & { duration?: number; delay?: number } = {}
) {
  const hasAnimated = useRef(false);
  const { threshold = 0.3, once = true, duration = 2000, delay = 0 } = options;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get total path length
    const pathLength = path.getTotalLength();
    
    // Set initial state
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) return;
            hasAnimated.current = true;

            animate(path, {
              strokeDashoffset: 0,
              ease: 'inOutQuad',
              duration,
              delay,
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(path);
    return () => observer.disconnect();
  }, [pathRef, threshold, once, duration, delay]);
}

// Re-export anime.js functions
export { animate, stagger, createTimeline };
export type { JSAnimation, AnimationParams, Timeline };
