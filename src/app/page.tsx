'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SlidingImages from '@/components/home/SlidingImages';
import { LetterCollision } from '@/components/animations/textAnimations/scrollText';
import Magnetic from '@/components/animations/magnetic';
import Description from '@/components/home/Description/description';
import { getFeaturedWork } from '@/data/work';

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);

  // Get first 6 featured work items sorted by order
  const featuredWork = useMemo(() => {
    return getFeaturedWork().slice(0, 6);
  }, []);

  // Delay scroll button appearance by 0.25s
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

  const scrollToDescription = () => {
    const descriptionSection = document.getElementById('description');
    if (descriptionSection) {
      descriptionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollContainerRef} className="overflow-x-hidden">
      <LetterCollision />
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
                onClick={scrollToDescription}
                aria-label="Scroll to content"
              >
                <span>Scroll</span>
                <ArrowDown strokeWidth={3} className="size-5" />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
      <div id="description">
        <Description />
      </div>
      <SlidingImages work={featuredWork} />
    </div>
  );
}
