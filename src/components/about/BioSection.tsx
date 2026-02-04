'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { personalInfo, getExperienceTimeline, getEducationTimeline, getResearchTimeline } from '@/data';
import JourneyTimeline from '@/components/about/JourneyTimeline';

const slideUp = {
  initial: { y: '100%' },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.5, delay: 0.05 * i },
  }),
  closed: { y: '100%', transition: { duration: 0.5 } },
};

const bioSlideUp = {
  initial: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 * i },
  }),
  closed: { opacity: 0, y: 20, transition: { duration: 0.5 } },
};

const fadeIn = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0, transition: { duration: 0.5 } },
};

function JourneySection({
  label,
  heading,
  data,
}: {
  label: string;
  heading: string;
  data: import('@/types').TimelineItem[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-100px' });
  const words = heading.split(' ');

  return (
    <section
      ref={ref}
      className="bg-white px-8 pb-8 sm:px-20 sm:pb-20"
      aria-label={label}
    >
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          {words.map((word, i) => (
            <span key={i} className="inline-flex overflow-hidden">
              <motion.span
                variants={slideUp}
                custom={i}
                initial="initial"
                animate={inView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && '\u00A0'}
            </span>
          ))}
        </h2>
      </div>
      <motion.div
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        variants={fadeIn}
        initial="initial"
        animate={inView ? 'open' : 'closed'}
      >
        <JourneyTimeline data={data} />
      </motion.div>
    </section>
  );
}

/**
 * BioSection
 *
 * About page content below the hero: profile photo with word-by-word
 * animated bio text, followed by experience, education, and research timelines.
 */
export default function BioSection() {
  const { name, aboutImage, fullBio } = personalInfo;
  const experienceData = getExperienceTimeline();
  const educationData = getEducationTimeline();
  const researchData = getResearchTimeline();
  const bioRef = useRef<HTMLElement>(null);
  const isInView = useInView(bioRef, { margin: '-100px' });

  // Build word list with paragraph breaks for word-by-word slideUp
  const paragraphs = fullBio.split('\n\n');

  return (
    <>
      {/* Section 1: White bg — Profile Photo + Bio */}
      <section
        ref={bioRef}
        className="bg-white p-8 sm:p-20"
        aria-label="About Vishnu"
      >
        <div>
          <motion.div
            className="mx-auto mb-8 w-64 sm:float-left sm:mx-0 sm:mr-12 sm:mb-6 sm:w-80 lg:w-96"
            variants={fadeIn}
            initial="initial"
            animate={isInView ? 'open' : 'closed'}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={aboutImage}
                alt={`Profile photo of ${name}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                priority
              />
            </div>
          </motion.div>
          {paragraphs.map((paragraph, pIdx) => (
            <motion.p
              key={pIdx}
              className="mb-4 text-lg leading-relaxed text-gray-900 sm:text-xl"
              variants={bioSlideUp}
              custom={pIdx}
              initial="initial"
              animate={isInView ? 'open' : 'closed'}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Section 2: White bg — Experience */}
      <JourneySection
        label="Work Experience"
        heading="Where I've Worked"
        data={experienceData}
      />

      {/* Section 3: White bg — Education */}
      <JourneySection
        label="Education"
        heading="Where I Studied"
        data={educationData}
      />

      {/* Section 4: White bg — Research & Publications */}
      <JourneySection
        label="Research and Publications"
        heading="What I've Published"
        data={researchData}
      />
    </>
  );
}
