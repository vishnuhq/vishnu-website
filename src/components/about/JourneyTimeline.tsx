'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import type { TimelineItem } from '@/types';

interface JourneyTimelineProps {
  data: TimelineItem[];
}

const slideUp = {
  initial: { y: '100%' },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.5, delay: 0.05 * i },
  }),
  closed: { y: '100%', transition: { duration: 0.5 } },
};

/**
 * JourneyTimeline
 *
 * Vertical timeline with staggered slide-up entries.
 * Used for experience, education, and research sections on the about page.
 */
export default function JourneyTimeline({ data }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '-100px' });

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-1">
        {data.map((item, i) => {
          const isLastItem = i === data.length - 1;

          return (
            <div key={i} className="overflow-hidden">
              <motion.div
                variants={slideUp}
                custom={i}
                initial="initial"
                animate={isInView ? 'open' : 'closed'}
                className="group relative"
              >
                <div
                  className={`grid py-4 sm:grid-cols-[60px_1fr] sm:gap-4 sm:py-6 ${
                    isLastItem ? '' : 'border-b border-gray-200'
                  }`}
                >
                  <div className="items-start sm:px-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                        item.highlight
                          ? 'bg-teal-500/10 text-teal-500'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        {item.title}
                      </h3>
                      {item.companyUrl ? (
                        <Link
                          href={item.companyUrl}
                          className="text-sm font-medium text-teal-500 transition-colors hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @{item.company}
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-gray-400">
                          @{item.company}
                        </span>
                      )}
                    </div>
                    <p className="max-w-2xl text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
