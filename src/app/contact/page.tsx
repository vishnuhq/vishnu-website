'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactLinks } from '@/components/contact/ContactLinks';
import Magnetic from '@/components/animations/magnetic';

/**
 * Contact Page
 *
 * Displays hero section with letter collision animation and
 * a grid of all contact/social links.
 * Includes scroll button that appears after delay and hides on scroll.
 */
export default function ContactPage() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Delay scroll button appearance by 0.25s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowScrollButton(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Hide scroll button when user scrolls, show again when at top
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

  const scrollToLinks = () => {
    const linksSection = document.getElementById('contact-links');
    if (linksSection) {
      linksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section - Dark background with letter collision */}
      <ContactHero />

      {/* Scroll Button */}
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
                onClick={scrollToLinks}
                aria-label="Scroll to content"
              >
                <span>Scroll</span>
                <ArrowDown strokeWidth={3} className="size-5" />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Links Section - White background with animated grid */}
      <div id="contact-links">
        <ContactLinks />
      </div>
    </main>
  );
}
