'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '@/components/animations/magnetic';

/**
 * ScrollButton Component
 *
 * Fixed scroll-down indicator that appears after a short delay
 * and hides when the user scrolls away from the top.
 *
 * @param targetId - The DOM element ID to scroll to on click
 */
export default function ScrollButton({ targetId }: { targetId: string }) {
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
      if (window.scrollY > 0) {
        setShowScrollButton(false);
      } else if (isVisible) {
        setShowScrollButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const scrollToTarget = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
              className="flex flex-col items-center text-xl font-semibold sm:text-2xl"
              onClick={scrollToTarget}
              aria-label="Scroll to content"
            >
              <span>Scroll</span>
              <ArrowDown strokeWidth={3} className="size-5" />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
