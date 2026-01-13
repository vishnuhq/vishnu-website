'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { easings } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/animations/magnetic';

interface MenuButtonProps {
  /** Whether the menu is currently open */
  isActive: boolean;
  /** Callback to toggle the menu */
  onToggle: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MenuButton Component
 *
 * Animated circular toggle button for the navigation menu.
 * Size: 40px on mobile (1.25x for easier touch) / 44px on md+ (desktop).
 * Features a hamburger icon that transforms into an X when active.
 * Uses GSAP for smooth icon animations and hover sweep effect.
 *
 * @example
 * <MenuButton isActive={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
 */
export default function MenuButton({
  isActive,
  onToggle,
  className,
}: MenuButtonProps) {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  // Hamburger → X animation
  // Lines are absolutely positioned at center, spread vertically for hamburger
  // For X: lines rotate and meet at center
  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const duration = reducedMotion ? 0 : 0.3;
    // Line spacing: 6px for both mobile (40px) and desktop (44px) buttons
    const lineSpacing = 6;

    if (isActive) {
      // Transform to X - lines meet at center and rotate
      gsap.to(line1Ref.current, {
        rotation: 45,
        y: 0, // Move to center
        duration,
        ease: easings.smooth,
      });
      gsap.to(line2Ref.current, {
        opacity: 0,
        scaleX: 0,
        duration: duration * 0.6,
        ease: easings.smooth,
      });
      gsap.to(line3Ref.current, {
        rotation: -45,
        y: 0, // Move to center
        duration,
        ease: easings.smooth,
      });
    } else {
      // Transform back to hamburger - lines spread out
      gsap.to(line1Ref.current, {
        rotation: 0,
        y: -lineSpacing,
        duration,
        ease: easings.smooth,
      });
      gsap.to(line2Ref.current, {
        opacity: 1,
        scaleX: 1,
        duration: duration * 0.6,
        delay: duration * 0.2,
        ease: easings.smooth,
      });
      gsap.to(line3Ref.current, {
        rotation: 0,
        y: lineSpacing,
        duration,
        ease: easings.smooth,
      });
    }
  }, [isActive]);

  // Set initial hamburger state
  useEffect(() => {
    if (!line1Ref.current || !line3Ref.current) return;
    // Line spacing: 6px for both mobile (40px) and desktop (44px) buttons
    const lineSpacing = 6;
    gsap.set(line1Ref.current, { y: -lineSpacing });
    gsap.set(line3Ref.current, { y: lineSpacing });
  }, []);

  // Hover sweep animation (adapted for circular button)
  useEffect(() => {
    hoverTimeline.current = gsap.timeline({ paused: true });
    hoverTimeline.current
      .to(
        circle.current,
        { top: '-25%', width: '150%', duration: 0.2, ease: 'power3.in' },
        'enter'
      )
      .to(
        circle.current,
        { top: '-150%', width: '125%', duration: 0.12 },
        'exit'
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    hoverTimeline.current?.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      hoverTimeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <button
        onClick={onToggle}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        className={cn(
          // Size: h-10 w-10 (40px) on mobile for easy touch, md:h-11 md:w-11 (44px) for desktop
          'relative z-50 h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-teal-500 md:h-11 md:w-11',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          className
        )}
        aria-expanded={isActive}
        aria-controls="main-menu"
        aria-label={isActive ? 'Close menu' : 'Open menu'}
      >
        {/* Hamburger / X Icon - lines absolutely positioned at center */}
        <div
          className="relative z-10 flex h-full w-full items-center justify-center"
          aria-hidden="true"
        >
          {/* All 3 lines stacked at center, positioned with transforms */}
          {/* Line width ~45% of button: 18px for 40px mobile, 20px for 44px md+ */}
          <span
            ref={line1Ref}
            className="absolute h-[2px] w-[18px] origin-center rounded-full bg-white md:w-5"
          />
          <span
            ref={line2Ref}
            className="absolute h-[2px] w-[18px] origin-center rounded-full bg-white md:w-5"
          />
          <span
            ref={line3Ref}
            className="absolute h-[2px] w-[18px] origin-center rounded-full bg-white md:w-5"
          />
        </div>
        {/* Hover sweep circle - darker teal for contrast on teal-500 menu */}
        <div
          ref={circle}
          className="absolute left-1/2 top-[100%] h-[150%] w-full -translate-x-1/2 rounded-full bg-teal-600"
        />
      </button>
    </Magnetic>
  );
}
