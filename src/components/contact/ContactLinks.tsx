'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { getContactPageLinks, personalInfo } from '@/data';
import { ContactLinkButton } from './ContactLinkButton';

const slideUp = {
  initial: {
    y: '100%',
  },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: '100%',
    transition: { duration: 0.5 },
  },
};

// Text content - split into two lines for gap
const line1 = "Whether you want to talk code, collaborate on a project, watch my content, or just say hello, I'm always happy to connect.";
const line2 = "Here's where you can find me across the web.";

/**
 * ContactLinks Component
 *
 * Displays all contact links in a 2-column grid (desktop) or 1-column (mobile).
 * Text animates word-by-word with slide-up reveal.
 * Buttons animate in from left/right based on scroll position.
 */
export function ContactLinks() {
  const socialLinks = getContactPageLinks();
  const { email } = personalInfo;
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger text animation when section is visible
  const isInView = useInView(containerRef, { margin: '-100px' });

  // Scroll-linked transforms for button entrance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Create email link item
  const emailLink = {
    name: 'Email',
    url: email,
    icon: 'email',
    displayText: email,
    displayOrder: 1,
  };

  // Combine email with social links
  const allLinks = [emailLink, ...socialLinks];

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-center bg-white px-6 py-16 sm:px-12 sm:py-24"
    >
      {/* Intro Text */}
      <div className="mb-12 max-w-4xl text-center sm:mb-16">
        {/* Line 1 */}
        <p className="m-0 text-base leading-snug text-gray-900 sm:text-3xl">
          {line1.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                initial="initial"
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        {/* Line 2 - with vertical gap */}
        <p className="m-0 mt-4 text-base leading-snug text-gray-900 sm:mt-6 sm:text-3xl">
          {line2.split(' ').map((word, index) => (
            <span
              key={`l2-${index}`}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index + line1.split(' ').length}
                initial="initial"
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>

      {/* Links Grid */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:gap-10 sm:px-8">
        {allLinks.map((link, index) => {
          const isLeftColumn = index % 2 === 0;

          return (
            <motion.div
              key={link.name}
              style={{ x: isLeftColumn ? xLeft : xRight, opacity: buttonOpacity }}
            >
              <ContactLinkButton
                name={link.name}
                url={link.url}
                icon={link.icon}
                displayText={link.displayText}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default ContactLinks;
