import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins on client side only
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom easings for consistent animations
export const easings = {
  smooth: 'power3.out',
  power3In: 'power3.in',
  elastic: 'elastic.out(1, 0.3)',
};

export { gsap, ScrollTrigger };
