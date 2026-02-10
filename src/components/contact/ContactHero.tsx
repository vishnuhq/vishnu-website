'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Text content for contact page hero
// Line 1: "Vishnu Vardhan Putta" - each word separate to prevent breaking
const nameWords = ['Vishnu', 'Vardhan', 'Putta'];

// Line 2: "From code to content, find me here" - each word/phrase separate
const taglineWords = ['From', 'code', 'to', 'content,', 'find', 'me'];
const taglineHighlight = 'here';

// Size classes - matching home page proportions but adjusted for contact page
// Name: scales from 2rem (mobile) to 10rem (desktop) - fits on single line
const nameSize = 'text-[clamp(2rem,8vw,10rem)]';
// Tagline: scales from 1.65rem (mobile) to 4.5rem (desktop) - smaller than name
const taglineSize = 'text-[clamp(1.65rem,4.5vw,4.5rem)]';

// Collision intensity multiplier
const COLLISION_INTENSITY = 2;

// Pre-defined speeds to avoid hydration mismatch
const LETTER_SPEEDS = [
  0.85, 1.23, 0.92, 1.45, 1.12, 0.88, 1.35, 0.95, 1.28, 0.82,
  1.42, 0.91, 1.18, 1.05, 0.87, 1.38, 0.93, 1.25, 1.08, 0.89,
  1.32, 0.96, 1.15, 1.02, 0.84, 1.48, 0.98, 1.22, 1.06, 0.86,
  0.9, 1.3, 0.94, 1.2, 1.1, 0.83, 1.4, 0.97, 1.16, 1.04,
];

// Pre-defined rotations
const LETTER_ROTATIONS = [
  -15, 22, -8, 28, -20, 12, -25, 18, -5, 30,
  -12, 25, -18, 8, -28, 15, -22, 5, -10, 20,
  -30, 10, -15, 25, -8, 18, -25, 12, -20, 28,
  -5, 22, -12, 30, -18, 8, -28, 15, -10, 25,
];

function getSpeedForIndex(index: number): number {
  return LETTER_SPEEDS[index % LETTER_SPEEDS.length];
}

function getRotationForIndex(index: number): number {
  return LETTER_ROTATIONS[index % LETTER_ROTATIONS.length];
}

const animateLettersOnScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll('.contact-letter');

  letterElements?.forEach((letter: Element, index: number) => {
    gsap.to(letter, {
      y: (_i, el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '1');
        const baseMovement = (1 - speed) * ScrollTrigger.maxScroll(window);
        return baseMovement > 0 ? baseMovement * COLLISION_INTENSITY : baseMovement;
      },
      ease: 'power2.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        invalidateOnRefresh: true,
        scrub: 0.5,
      },
      rotation: getRotationForIndex(index),
    });
  });
};

function LetterDisplay({
  word,
  startIndex,
  colorClass = 'text-white',
  sizeClass = nameSize,
}: {
  word: string;
  startIndex: number;
  colorClass?: string;
  sizeClass?: string;
}) {
  return (
    <div className="flex flex-nowrap">
      {word.split('').map((letter, i) => (
        <div
          key={i}
          className={`contact-letter font-semibold ${colorClass} ${sizeClass} leading-none`}
          data-speed={getSpeedForIndex(startIndex + i)}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}

// Word spacer component - responsive gap between words
function WordSpacer({ size = 'normal' }: { size?: 'normal' | 'small' }) {
  const sizeClass =
    size === 'small'
      ? 'w-2 xs:w-3 sm:w-4 md:w-5'
      : 'w-3 xs:w-4 sm:w-6 md:w-8 lg:w-10';
  return <div className={sizeClass} />;
}

/**
 * ContactHero Component
 *
 * Hero section for contact page with letter collision animation.
 * Uses same pattern as home page - each word wrapped in flex-nowrap.
 * Contains overflow to prevent letters leaking into next section.
 */
export function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    animateLettersOnScroll(containerRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Calculate cumulative letter indices for continuous animation
  let letterIndex = 0;

  // Get starting index for a word and increment counter
  const getStartIndex = (word: string) => {
    const start = letterIndex;
    letterIndex += word.length;
    return start;
  };

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-background">
      <div className="flex h-full flex-col items-center justify-center gap-4 px-4 sm:gap-6 sm:px-8">
        {/* Line 1: Vishnu Vardhan Putta (single line, flex-nowrap per word) */}
        <div className="flex flex-nowrap items-baseline justify-center">
          {nameWords.map((word, wordIndex) => (
            <div key={word} className="flex items-baseline">
              <LetterDisplay
                word={word}
                startIndex={getStartIndex(word)}
                colorClass={word === 'Putta' ? 'text-teal-400' : 'text-white'}
              />
              {wordIndex < nameWords.length - 1 && <WordSpacer />}
            </div>
          ))}
        </div>

        {/* Line 2: From code to content, find me here (can wrap, but words don't break) */}
        <div className="flex flex-wrap items-baseline justify-center gap-y-1">
          {taglineWords.map((word, wordIndex) => (
            <div key={`tag-${wordIndex}`} className="flex items-baseline">
              <LetterDisplay
                word={word}
                startIndex={getStartIndex(word)}
                sizeClass={taglineSize}
              />
              <WordSpacer size="small" />
            </div>
          ))}
          {/* "here" in teal */}
          <LetterDisplay
            word={taglineHighlight}
            startIndex={getStartIndex(taglineHighlight)}
            sizeClass={taglineSize}
            colorClass="text-teal-400"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactHero;
