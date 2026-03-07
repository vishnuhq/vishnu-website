'use client';

import { AboutHero } from '@/components/about/AboutHero';
import BioSection from '@/components/about/BioSection';
import ScrollButton from '@/components/ui/ScrollButton';

/**
 * About Page
 *
 * Sections:
 * 1. Hero — text collision animation (dark bg)
 * 2. Bio — profile photo + bio text (white bg)
 * 3. Experience + Education + Research (white bg)
 *
 * template.tsx auto-wraps with curved transition + ContactInfo footer.
 */
export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <ScrollButton targetId="about-bio" />
      <div id="about-bio">
        <BioSection />
      </div>
    </div>
  );
}
