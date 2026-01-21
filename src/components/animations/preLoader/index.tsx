'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Custom easing for smooth motion
const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function PreLoader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // SVG path for curved bottom edge
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.5, ease: customEase },
    },
  };

  // Curtain slide up animation - fast
  const slideUp = {
    initial: {
      y: 0,
    },
    exit: {
      y: '-100%',
      transition: { duration: 0.6, ease: customEase },
    },
  };

  // Logo - appears instantly, rotates and fades out
  const logoAnimation = {
    initial: {
      opacity: 1,
      rotate: 0,
    },
    animate: {
      opacity: 1,
      rotate: 0,
    },
    exit: {
      opacity: 0,
      rotate: 180,
      transition: { duration: 0.4, ease: customEase },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {dimension.width > 0 && (
        <>
          {/* VishnuHQ Logo - rotates as it fades out */}
          <motion.div
            variants={logoAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10"
          >
            <Image
              src="/images/logo.svg"
              alt="VishnuHQ Logo"
              width={120}
              height={120}
              className="h-28 w-28 sm:h-40 sm:w-40"
              priority
            />
          </motion.div>

          {/* Curved SVG bottom edge */}
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full fill-background">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
