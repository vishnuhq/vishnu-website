'use client';

import Link from 'next/link';
import Image from 'next/image';
import Magnetic from '@/components/animations/magnetic';

/**
 * Logo Component
 *
 * VishnuHQ branding with SVG logo and text.
 * Features magnetic hover effect.
 * Positioned absolutely so it doesn't affect document flow.
 *
 * @example
 * <Logo />
 */
export default function Logo() {
  return (
    <div className="absolute left-4 top-6 z-30">
      <Magnetic>
        <Link
          href="/"
          aria-label="Go to home page"
          className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/logo.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 sm:h-9 sm:w-9"
            priority
          />
          <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="text-white">Vishnu</span>
            <span className="text-teal-400">HQ</span>
          </span>
        </Link>
      </Magnetic>
    </div>
  );
}
