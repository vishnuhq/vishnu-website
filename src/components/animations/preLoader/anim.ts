// Opacity animation for logo/content inside loader
export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.1 },
  },
};

// Custom easing curve for smooth motion
const customEase = [0.76, 0, 0.24, 1] as const;

// Main slide-up curtain animation
export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: customEase, delay: 0.2 },
  },
};
