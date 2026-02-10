'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Animations Provider - Wraps the app with Lenis smooth scroll
 *
 * Lenis is a lightweight, performant smooth scroll library
 * Replaces locomotive-scroll which is deprecated
 *
 * Features:
 * - Smooth, responsive scrolling (lerp-based)
 * - Auto-hide scrollbar (adds/removes .is-scrolling class on html)
 *
 * @see https://lenis.darkroom.engineering/
 */
export default function Animations({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Use lerp for immediate responsiveness (higher = snappier, 0.1 is default)
      lerp: 0.25,

      // Wheel multiplier for scroll speed (1 is default)
      wheelMultiplier: 1,

      // Touch multiplier for mobile scroll speed
      touchMultiplier: 2,

      // Enable smooth scrolling for wheel events
      smoothWheel: true,

      // Let Lenis handle its own animation frame for better performance
      autoRaf: true,
    });

    lenisRef.current = lenis;

    const htmlElement = document.documentElement;

    // Auto-hide scrollbar: add class when scrolling, remove after 1s of inactivity
    const handleScroll = () => {
      htmlElement.classList.add('is-scrolling');

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Remove class after 1 second of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        htmlElement.classList.remove('is-scrolling');
      }, 1000);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.destroy();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      htmlElement.classList.remove('is-scrolling');
    };
  }, []);

  return <div className="main">{children}</div>;
}
