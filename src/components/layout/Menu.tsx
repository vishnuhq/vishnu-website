'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap, easings } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/animations/magnetic';
import MenuButton from './MenuButton';
import { navLinks } from '@/data/navigation';

// Animation timing constants (2x faster than original)
const TIMING = {
  duration: 0.375,
  stagger: 0.05,
  backdropFade: 0.1875,
  linkAnimation: 0.3,
  linkDelay: 0.1125,
  closeDelay: 0.1,
} as const;

/**
 * Menu Component
 *
 * Navigation menu with two separate views:
 * - Mobile (< 768px): Full-page teal fill with centered links
 * - Desktop (>= 768px): Side panel with teal background
 *
 * Uses GSAP for smooth animations with 2x faster timing.
 */
export default function Menu() {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const isHomepage = pathname === '/';

  // Track mounted state for SSR hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Responsive detection for mobile/desktop views
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  // Handle body scroll lock
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  // Show button helper function
  const showButton = useCallback((animate = true) => {
    if (!buttonContainerRef.current) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (animate && !reducedMotion) {
      gsap.to(buttonContainerRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    } else {
      gsap.set(buttonContainerRef.current, { scale: 1 });
    }
  }, []);

  // Scroll-triggered visibility (homepage only)
  // Uses native scroll listener for reliability with Lenis smooth scroll
  useEffect(() => {
    if (!buttonContainerRef.current || !isMounted) return;

    const button = buttonContainerRef.current;
    let hasShown = false;

    if (isHomepage) {
      const scrollThreshold = window.innerHeight;

      // Always start hidden on homepage
      gsap.set(button, { scale: 0 });

      // Native scroll handler - more reliable than ScrollTrigger with Lenis
      const handleScroll = () => {
        if (hasShown) return; // Only trigger once

        if (window.scrollY >= scrollThreshold) {
          hasShown = true;
          showButton(true);
        }
      };

      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Check immediately after a delay (handles navigation case)
      // Multiple checks to handle race condition with template.tsx scroll reset
      const checkScroll = () => {
        if (!hasShown && window.scrollY >= scrollThreshold) {
          hasShown = true;
          gsap.set(button, { scale: 1 });
        }
      };

      // Check at various times to handle different timing scenarios
      requestAnimationFrame(checkScroll);
      setTimeout(checkScroll, 100);
      setTimeout(checkScroll, 500); // After template.tsx scrollTo(0,0) at 400ms

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Non-homepage: always visible
      gsap.set(button, { scale: 1 });
    }
  }, [isHomepage, isMobile, isMounted, showButton]);

  // Animate menu panel
  useEffect(() => {
    if (!isMounted) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!menuRef.current || !linksRef.current) return;

    const duration = reducedMotion ? 0 : TIMING.duration;
    const staggerDuration = reducedMotion ? 0 : TIMING.stagger;

    if (isActive) {
      // Open animation - backdrop (desktop only)
      if (!isMobile && backdropRef.current) {
        gsap.to(backdropRef.current, {
          opacity: 1,
          duration: TIMING.backdropFade,
          ease: easings.smooth,
        });
      }

      // Different clip-path for mobile vs desktop
      // Mobile: originates from bottom-right (where button is)
      // Desktop: polygon animation from top
      const openClipPath = isMobile
        ? 'circle(150% at calc(100% - 2.5rem) calc(100% - 2.5rem))'
        : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

      gsap.to(menuRef.current, {
        clipPath: openClipPath,
        duration,
        ease: easings.smooth,
      });

      // Animate links with stagger
      const links = linksRef.current.children;
      gsap.fromTo(
        links,
        { y: 50, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: TIMING.linkAnimation,
          stagger: staggerDuration,
          ease: easings.smooth,
          delay: TIMING.linkDelay,
        }
      );
    } else {
      // Close animation - backdrop (desktop only)
      if (!isMobile && backdropRef.current) {
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: TIMING.backdropFade,
          delay: TIMING.closeDelay * 1.5,
          ease: easings.smooth,
        });
      }

      // Different clip-path for mobile vs desktop
      // Mobile: closes to bottom-right (where button is)
      const closeClipPath = isMobile
        ? 'circle(0% at calc(100% - 2.5rem) calc(100% - 2.5rem))'
        : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';

      gsap.to(menuRef.current, {
        clipPath: closeClipPath,
        duration,
        delay: TIMING.closeDelay,
        ease: easings.smooth,
      });

      // Animate links out
      const links = linksRef.current.children;
      gsap.to(links, {
        y: -30,
        opacity: 0,
        duration: TIMING.duration * 0.5,
        stagger: TIMING.stagger * 0.5,
        ease: easings.power3In,
      });
    }
  }, [isActive, isMobile, isMounted]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isActive]);

  // Link component shared between mobile and desktop
  const renderLinks = () =>
    navLinks.map((link) => (
      <div
        key={link.href}
        className="opacity-0"
        style={{ perspective: '120px', transformOrigin: 'bottom' }}
      >
        <Magnetic>
          <Link
            href={link.href}
            onClick={() => setIsActive(false)}
            className={cn(
              'block font-semibold tracking-tight',
              'text-2xl md:text-3xl lg:text-4xl',
              'text-white transition-colors hover:text-black/80',
              'focus-visible:outline-none focus-visible:text-black/80'
            )}
            tabIndex={isActive ? 0 : -1}
          >
            {link.label}
          </Link>
        </Magnetic>
      </div>
    ));

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Backdrop (desktop only) */}
      {!isMobile && (
        <div
          ref={backdropRef}
          className={cn(
            'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm',
            'pointer-events-none opacity-0',
            isActive && 'pointer-events-auto'
          )}
          onClick={() => setIsActive(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel - conditionally styled for mobile vs desktop */}
      <div
        ref={menuRef}
        id="main-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          isMobile
            ? // Mobile: Full-page, circle originates from bottom-right (button position)
              'fixed inset-0 z-40 bg-teal-500 [clip-path:circle(0%_at_calc(100%_-_2.5rem)_calc(100%_-_2.5rem))]'
            : // Desktop: Side panel
              'fixed right-8 top-7 z-40 w-[280px] rounded-3xl bg-teal-500 origin-top-right lg:w-[320px] [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]'
        )}
      >
        <nav
          ref={linksRef}
          className={cn(
            isMobile
              ? 'flex h-full flex-col items-center justify-center gap-5'
              : 'flex min-h-[320px] flex-col justify-center gap-3 p-8 lg:p-10'
          )}
          aria-label="Main navigation"
        >
          {renderLinks()}
        </nav>
      </div>

      {/* Menu Button - Bottom-right on mobile, top-right on desktop */}
      <div className="fixed bottom-8 right-8 z-50 md:bottom-auto md:top-7">
        <div ref={buttonContainerRef} className="origin-center">
          <MenuButton
            isActive={isActive}
            onToggle={() => setIsActive(!isActive)}
          />
        </div>
      </div>
    </>
  );
}
