'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PillButton from '@/components/animations/pillButton';
import type { Work } from '@/types';

type Props = {
  work: Work[];
};

// Alternating background colors for work cards
const cardColors = ['#21242b', '#d4e3ec', '#21242b'];

/**
 * WorkCard - Displays work image with fallback to title
 * 16:9 aspect ratio, responsive sizing that scales with viewport
 */
function WorkCard({
  item,
  color,
}: {
  item: Work;
  color: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="flex w-[70vw] flex-shrink-0 items-center justify-center shadow-lg sm:w-[30vw]"
      style={{ backgroundColor: color, aspectRatio: '16/9' }}
    >
      {imageError ? (
        <div className="flex h-full w-full items-center justify-center p-4">
          <h3
            className="text-center text-lg font-semibold sm:text-2xl"
            style={{ color: color === '#d4e3ec' ? '#21242b' : '#ffffff' }}
          >
            {item.title}
          </h3>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <Image
            alt={item.title}
            src={item.mainImage}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 640px) 70vw, 30vw"
            onError={() => setImageError(true)}
          />
        </div>
      )}
    </div>
  );
}

/**
 * SlidingImages Section
 *
 * Horizontal parallax gallery on the home page showing featured work.
 * Two rows scroll in opposite directions based on scroll progress.
 */
export default function SlidingImages({ work }: Props) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Split work items into two rows: first 3 and next 3
  const row1 = work.slice(0, 3);
  const row2 = work.slice(3, 6);

  return (
    <div
      ref={container}
      className="relative z-10 flex flex-col gap-[3vw] overflow-hidden bg-white py-8"
    >
      {/* Row 1 - First 3 items */}
      <motion.div
        style={{ x: x1 }}
        className="flex w-full justify-center gap-4 sm:gap-8"
      >
        {row1.map((item, index) => (
          <WorkCard
            key={item.slug}
            item={item}
            color={cardColors[index % cardColors.length]}
          />
        ))}
      </motion.div>

      {/* Row 2 - Next 3 items */}
      <motion.div
        style={{ x: x2 }}
        className="flex w-full justify-center gap-4 sm:gap-8"
      >
        {row2.map((item, index) => (
          <WorkCard
            key={item.slug}
            item={item}
            color={cardColors[(index + 1) % cardColors.length]}
          />
        ))}
      </motion.div>

      {/* View Work Button */}
      <div className="flex w-full justify-center py-4">
        <Link href="/work">
          <PillButton>
            View My Work
          </PillButton>
        </Link>
      </div>
    </div>
  );
}
