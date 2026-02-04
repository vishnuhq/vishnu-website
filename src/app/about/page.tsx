'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AboutHero } from '@/components/about/AboutHero';
import BioSection from '@/components/about/BioSection';
import Magnetic from '@/components/animations/magnetic';

/**
 * About Page
 *
 * Sections:
 * 1. Hero — text collision animation (dark bg)
 * 2. Bio — profile photo + bio text (white bg)
 * 3. Experience + Education + Research (white bg)
 *
 * template.tsx auto-wraps with curved transition + ContactInfo footer.
 */
export default function AboutPage() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowScrollButton(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY > 0) {
        setShowScrollButton(false);
      } else if (isVisible) {
        setShowScrollButton(true);
      }
    };

    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const scrollToBio = () => {
    const bioSection = document.getElementById('about-bio');
    if (bioSection) {
      bioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="overflow-x-hidden">
      <AboutHero />

      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -8, 0],
            }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              opacity: { duration: 0.3 },
              y: {
                duration: 0.6,
                ease: 'easeOut',
                times: [0, 0.5, 1],
              },
            }}
            className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-8"
          >
            <Magnetic>
              <button
                type="button"
                className="flex cursor-pointer flex-col items-center text-xl font-semibold sm:text-2xl"
                onClick={scrollToBio}
                aria-label="Scroll to content"
              >
                <span>Scroll</span>
                <ArrowDown strokeWidth={3} className="size-5" />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="about-bio">
        <BioSection />
      </div>
    </main>
  );
}
