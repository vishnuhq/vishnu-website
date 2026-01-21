'use client';

import React, { PropsWithChildren, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import Magnetic from '@/components/animations/magnetic';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

/**
 * PillButton Component
 *
 * Compact pill-shaped button with GSAP sweep animation on hover.
 * Text size matches Description's rightText for consistency.
 * Includes arrow icon to indicate clickability.
 *
 * @example
 * <PillButton>Click me</PillButton>
 */
export default function PillButton({
  children,
  className,
  ...attributes
}: PropsWithChildren<Props>) {
  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
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
    timeline.current?.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <button
        className={cn(
          'relative flex cursor-pointer items-center gap-2 overflow-hidden',
          'rounded-full bg-teal-500 px-4 py-1.5 sm:px-5 sm:py-2',
          'text-base font-normal text-white sm:text-lg',
          className
        )}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        <span className="relative z-10 whitespace-nowrap">{children}</span>
        <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5" />
        <div
          ref={circle}
          className="absolute left-1/2 top-[100%] h-[150%] w-full -translate-x-1/2 rounded-full bg-teal-400"
        />
      </button>
    </Magnetic>
  );
}
