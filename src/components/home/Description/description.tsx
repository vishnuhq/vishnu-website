'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { opacity, slideUp } from './anim';
import PillButton from '@/components/animations/pillButton';
import Link from 'next/link';
import { personalInfo } from '@/data';

/**
 * Description Section
 *
 * Two-column layout on the home page with word-by-word slide-up
 * animation on the left and fade-in paragraphs + CTA on the right.
 */
export default function Description() {
  const {
    phrase1,
    phrase2,
    rightText1,
    rightText2,
    buttonText,
    buttonLink,
  } = personalInfo.description;

  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div
      ref={description}
      className="relative flex flex-col justify-center gap-12 bg-white p-8 text-gray-900 sm:mt-[200px] sm:flex-row sm:p-20"
    >
      <div className="sm:flex-[3]">
        <p className="m-0 gap-2 text-base leading-snug sm:text-3xl">
          {phrase1.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
        <p className="m-0 mt-4 gap-2 text-base leading-snug sm:text-3xl">
          {phrase2.split(' ').map((word, index) => (
            <span
              key={`p2-${index}`}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index + phrase1.split(' ').length}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-[2]">
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 pb-3 font-light text-gray-700 sm:text-lg"
        >
          {rightText1}
        </motion.p>
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 font-light text-gray-700 sm:text-lg"
        >
          {rightText2}
        </motion.p>
        <div className="mt-6">
          <Link href={buttonLink}>
            <PillButton>
              {buttonText}
            </PillButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
