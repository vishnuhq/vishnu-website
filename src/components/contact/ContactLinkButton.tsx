'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SocialIcon } from '@/components/icons/SocialIcons';
import Magnetic from '@/components/animations/magnetic';

interface ContactLinkButtonProps {
  name: string;
  url: string;
  icon: string;
  displayText: string;
}

/**
 * ContactLinkButton Component
 *
 * Large teal pill button with icon and username for contact page.
 * Features GSAP sweep animation on hover matching PillButton style.
 * Full width to ensure consistent sizing across all buttons.
 */
export function ContactLinkButton({ name, url, icon, displayText }: ContactLinkButtonProps) {
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

  // Determine if email link
  const isEmail = icon === 'email';
  const href = isEmail ? `mailto:${url}` : url;
  const target = isEmail ? undefined : '_blank';
  const rel = isEmail ? undefined : 'noopener noreferrer';

  return (
    <Magnetic fullWidth>
      <a
        href={href}
        target={target}
        rel={rel}
        className="relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-teal-500 px-8 py-4 text-lg text-white sm:gap-4 sm:px-12 sm:py-5 sm:text-xl"
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        aria-label={`${name}: ${displayText}`}
      >
        <SocialIcon name={icon} className="relative z-10 size-5 shrink-0 sm:size-6" />
        <span className="relative z-10 truncate">{displayText}</span>
        <div
          ref={circle}
          className="absolute left-1/2 top-[100%] h-[150%] w-full -translate-x-1/2 rounded-full bg-teal-400"
        />
      </a>
    </Magnetic>
  );
}

export default ContactLinkButton;
