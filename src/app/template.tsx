'use client';

import { PropsWithChildren, useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import ContactInfo from '@/components/home/ContactInfo';
import PreLoader from '@/components/animations/preLoader';

/**
 * Root Template
 *
 * Wraps all pages with:
 * - Elegant curved transition at bottom
 * - ContactInfo footer
 *
 * Note: Logo is rendered conditionally in Header.tsx (not on homepage)
 */
export default function RootTemplate({ children }: PropsWithChildren) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  // Page load curtain animation state
  const [isLoading, setIsLoading] = useState(true);

  // Check if mobile for responsive curve behavior
  const [isMobile, setIsMobile] = useState(false);

  // Handle curtain animation timing - fast reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate height from 50px to 0 based on scroll progress
  // Mobile needs earlier trigger (0.9), desktop can be later (1.2)
  const input = isMobile ? 0.9 : 1.2;
  const height = useTransform(scrollYProgress, [0, input], [50, 0]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Page load curtain animation */}
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader />}
      </AnimatePresence>

      {/* Main content container - scroll tracked here */}
      <div ref={container} className="relative z-10">
        {/* Page content */}
        {children}

        {/* Curved transition - elegant curve into footer */}
        {/* Uses white bg to match SlidingImages section above */}
        <motion.div style={{ height }} className="relative bg-white">
          <div
            className="absolute left-[-10%] z-10 h-[1050%] w-[120%] rounded-b-[100%] bg-white"
            style={{
              boxShadow: '0 60px 50px rgba(0, 0, 0, 0.748)',
            }}
          />
        </motion.div>
      </div>

      {/* Footer - sits below the curved transition */}
      <ContactInfo />
    </div>
  );
}
