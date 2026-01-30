'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { personalInfo, getFooterSocialLinks } from '@/data';
import { SocialIcon } from '@/components/icons/SocialIcons';
import Magnetic from '@/components/animations/magnetic';
import PillButton from '@/components/animations/pillButton';

/**
 * ContactInfo Component (Footer)
 *
 * Footer that slides up from behind the curved transition element.
 * ALL CONTENT CENTERED on both mobile and desktop.
 */
export default function ContactInfo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  // Scroll-based transforms - content slides up from behind curve
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  // Email slides from left, button slides from right
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const { name, email, profileImage, footer } = personalInfo;
  const { jobSeekingMessage, tagline, contactButtonText, copyrightText, copyrightStartYear } = footer;
  const socialLinks = getFooterSocialLinks();
  const currentYear = new Date().getFullYear();
  const copyrightYears = currentYear === copyrightStartYear
    ? `${copyrightStartYear}`
    : `${copyrightStartYear}-${currentYear}`;

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className="relative flex min-h-screen flex-col items-center bg-background px-6 pt-32 pb-24 text-white will-change-transform backface-hidden transform-gpu"
    >
      <div className="flex min-h-full w-[90%] flex-1 flex-col items-center pt-[100px] sm:pt-[150px]">
        {/* Top content */}
        <div className="flex flex-col items-center">
          {/* Profile picture - CENTERED */}
          <div className="pb-6">
            <div className="relative h-20 w-20 overflow-hidden rounded-full sm:h-[100px] sm:w-[100px]">
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover"
                priority
                sizes="100px"
              />
            </div>
          </div>

          {/* Message text - CENTERED with max-width on large screens */}
          <div className="max-w-3xl pb-8 text-center">
            <p className="text-base leading-relaxed text-gray-300 md:text-lg">
              {jobSeekingMessage}
            </p>
          </div>

          {/* Email and Button - CENTERED, stacked vertically */}
          <div className="flex flex-col items-center gap-4">
            {/* Email - slides from left */}
            <motion.div style={{ x: xLeft }} className="will-change-transform transform-gpu">
              <a
                href={`mailto:${email}`}
                className="inline-block rounded-full border border-gray-600 px-4 py-1.5 text-base text-white transition-colors hover:border-teal-400 hover:text-teal-400 sm:px-5 sm:py-2 sm:text-lg"
                aria-label={`Send email to ${email}`}
              >
                {email}
              </a>
            </motion.div>

            {/* Button - slides from right */}
            <motion.div style={{ x: xRight }} className="will-change-transform transform-gpu">
              <Link href="/contact">
                <PillButton>{contactButtonText}</PillButton>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom section - pushed to bottom with min gap from content above */}
        <div className="mt-auto w-full pt-12 sm:pt-16">
          {/* Horizontal line - full width */}
          <div className="w-full border-b border-gray-600" />

          {/* Footer info section - Tagline | Social Icons | Copyright */}
          <div className="mt-8 flex w-full flex-col items-center gap-8 text-center sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            {/* Tagline - LEFT */}
            <p className="flex-1 text-sm text-gray-400 sm:text-left">{tagline}</p>

            {/* Social Icons - CENTER */}
            <div className="flex flex-1 items-center justify-center gap-4">
              {socialLinks.map((link) => (
                <Magnetic key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors hover:bg-teal-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    aria-label={`Visit ${link.name}`}
                  >
                    <SocialIcon name={link.icon} className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
            </div>

            {/* Copyright - RIGHT */}
            <div className="flex flex-1 flex-col items-center gap-0.5 sm:items-end">
              <p className="text-sm text-gray-400">
                &copy; {copyrightYears} {name}
              </p>
              <p className="text-xs text-gray-500">{copyrightText}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
