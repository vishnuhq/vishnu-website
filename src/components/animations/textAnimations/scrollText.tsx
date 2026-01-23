'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Text content - 2-line hierarchy
// Line 1: "VishnuHQ" (biggest)
const brandName1 = 'Vishnu';
const brandName2 = 'HQ';
// Line 2: "I make software slightly less chaotic" (smaller, "chaotic" in teal)
const word1 = 'I';
const word2 = 'make';
const word3 = 'software';
const word4 = 'slightly';
const word5 = 'less';
const word6 = 'chaotic';

// Size classes for text hierarchy
const brandLineSize = 'text-[clamp(3.5rem,12vw,16rem)]'; // Biggest - VishnuHQ
// Tagline: 2rem min (mobile), 5vw scales nicely, 6rem max (fills screen on desktop)
const taglineSize = 'text-[clamp(2rem,5vw,6rem)]';

// Collision intensity multiplier (2 = 100% more movement)
const COLLISION_INTENSITY = 2;

// Pre-defined speeds to avoid hydration mismatch (deterministic)
// Values < 1 move DOWN, values > 1 move UP during scroll
const LETTER_SPEEDS = [
  0.85, 1.23, 0.92, 1.45, 1.12, 0.88, 1.35, 0.95, 1.28, 0.82,
  1.42, 0.91, 1.18, 1.05, 0.87, 1.38, 0.93, 1.25, 1.08, 0.89,
  1.32, 0.96, 1.15, 1.02, 0.84, 1.48, 0.98, 1.22, 1.06, 0.86,
];

// Pre-defined rotations to avoid hydration mismatch
const LETTER_ROTATIONS = [
  -15, 22, -8, 28, -20, 12, -25, 18, -5, 30,
  -12, 25, -18, 8, -28, 15, -22, 5, -10, 20,
  -30, 10, -15, 25, -8, 18, -25, 12, -20, 28,
];

function getSpeedForIndex(index: number): number {
  return LETTER_SPEEDS[index % LETTER_SPEEDS.length];
}

function getRotationForIndex(index: number): number {
  return LETTER_ROTATIONS[index % LETTER_ROTATIONS.length];
}

const animateLettersOnScroll = (containerRef: RefObject<HTMLDivElement | null>) => {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll('.letter');

  letterElements?.forEach((letter: Element, index: number) => {
    gsap.to(letter, {
      y: (_i, el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '1');
        const baseMovement = (1 - speed) * ScrollTrigger.maxScroll(window);
        // Only amplify downward movement (positive values), keep upward same
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

// LetterDisplay renders each letter of a word wrapped in flex-nowrap to prevent word breaking
function LetterDisplay({
  word,
  startIndex,
  colorClass = 'text-white',
  sizeClass = brandLineSize,
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
          className={`letter font-semibold ${colorClass} ${sizeClass} leading-none`}
          data-speed={getSpeedForIndex(startIndex + i)}
        >
          {letter === ' ' ? '\u00A0' : letter}
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

export function LetterCollision() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    animateLettersOnScroll(containerRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Calculate cumulative letter indices for each word
  // Line 1: "Vishnu" (6) + "HQ" (2) = 8 letters
  // Line 2: "I" (1) + "make" (4) + "software" (8) + "slightly" (8) + "less" (4) + "chaotic" (7) = 32 letters
  const idxBrand1 = 0;
  const idxBrand2 = idxBrand1 + brandName1.length;
  const idx1 = idxBrand2 + brandName2.length;
  const idx2 = idx1 + word1.length;
  const idx3 = idx2 + word2.length;
  const idx4 = idx3 + word3.length;
  const idx5 = idx4 + word4.length;
  const idx6 = idx5 + word5.length;

  return (
    <div ref={containerRef} className="scroll-smooth bg-background">
      <div className="flex h-screen flex-col items-center justify-center gap-2 px-4 pb-24 sm:gap-4 sm:px-8">
        {/* Line 1: VishnuHQ (biggest) */}
        <div className="flex flex-nowrap items-baseline justify-center">
          <LetterDisplay word={brandName1} startIndex={idxBrand1} />
          <LetterDisplay
            word={brandName2}
            startIndex={idxBrand2}
            colorClass="text-teal-400"
          />
        </div>
        {/* Line 2: I make software slightly less chaotic (chaotic in teal) */}
        <div className="flex flex-wrap items-baseline justify-center gap-y-1">
          <LetterDisplay word={word1} startIndex={idx1} sizeClass={taglineSize} />
          <WordSpacer size="small" />
          <LetterDisplay word={word2} startIndex={idx2} sizeClass={taglineSize} />
          <WordSpacer size="small" />
          <LetterDisplay word={word3} startIndex={idx3} sizeClass={taglineSize} />
          <WordSpacer size="small" />
          <LetterDisplay word={word4} startIndex={idx4} sizeClass={taglineSize} />
          <WordSpacer size="small" />
          <LetterDisplay word={word5} startIndex={idx5} sizeClass={taglineSize} />
          <WordSpacer size="small" />
          <LetterDisplay
            word={word6}
            startIndex={idx6}
            sizeClass={taglineSize}
            colorClass="text-teal-400"
          />
        </div>
      </div>
    </div>
  );
}

export default LetterCollision;
