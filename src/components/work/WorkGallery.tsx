'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getAllWork, getAllCategories, categoryLabels } from '@/data';
import Magnetic from '@/components/animations/magnetic';
import type { Work, WorkCategory } from '@/types';

/**
 * Category filter tabs with animated highlight indicator.
 * Allows filtering work items by category.
 */
function CategoryFilters({
  categories,
  active,
  onSelect,
}: {
  categories: WorkCategory[];
  active: WorkCategory | null;
  onSelect: (cat: WorkCategory | null) => void;
}) {
  return (
    <div
      className="mb-10 flex flex-wrap justify-center gap-3"
      role="tablist"
      aria-label="Filter projects by category"
    >
      <Magnetic>
        <button
          role="tab"
          aria-selected={active === null}
          onClick={() => onSelect(null)}
          className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 sm:text-base ${
            active === null
              ? 'bg-teal-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {active === null && (
            <motion.span
              layoutId="filter-highlight"
              className="absolute inset-0 rounded-full bg-teal-500"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">All</span>
        </button>
      </Magnetic>

      {categories.map((cat) => (
        <Magnetic key={cat}>
          <button
            role="tab"
            aria-selected={active === cat}
            onClick={() => onSelect(cat)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 sm:text-base ${
              active === cat
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="filter-highlight"
                className="absolute inset-0 rounded-full bg-teal-500"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{categoryLabels[cat]}</span>
          </button>
        </Magnetic>
      ))}
    </div>
  );
}

/**
 * Individual work card with image, description, tech tags, and action links.
 * Animates in with staggered fade and lifts on hover.
 */
function GalleryCard({
  item,
  index,
  onReadMore,
}: {
  item: Work;
  index: number;
  onReadMore: (item: Work, button: HTMLButtonElement) => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{
        y: -4,
        transition: { type: 'spring', stiffness: 300, damping: 24 },
      }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      {/* Image — 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden">
        {!imageError ? (
          <Image
            src={item.mainImage}
            alt={`${item.title} preview`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-600/60 to-gray-900">
            <span className="px-4 text-center text-xl font-bold text-white/80 sm:text-2xl">
              {item.title}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Short description — fully visible, no truncation */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-900 sm:text-base">
          {item.shortDescription}
        </p>

        {/* Top 5 tech tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {item.topTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 sm:text-sm sm:px-3 sm:py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom row: GitHub, Live, Read More — all on one line */}
        <div className="flex items-center gap-4">
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 sm:text-base"
              aria-label={`View ${item.title} on GitHub`}
            >
              <svg
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          )}
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 sm:text-base"
              aria-label={`View ${item.title} live site`}
            >
              <svg
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live
            </a>
          )}

          {/* Read More — pushed to the right */}
          <button
            onClick={(e) => onReadMore(item, e.currentTarget)}
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 sm:text-base"
            aria-label={`Read more about ${item.title}`}
          >
            Read More
            <svg
              className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Full-detail modal overlay for a work item.
 * Includes focus trap, ESC-to-close, body scroll lock, and focus restoration.
 */
function DetailModal({
  item,
  onClose,
}: {
  item: Work;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const paragraphs = item.fullDescription.split('\n\n').filter(Boolean);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} details`}
    >
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          aria-label="Close dialog"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title + GitHub / Live links — same line */}
        <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 pr-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {item.title}
          </h2>
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 sm:text-base"
            >
              <svg
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          )}
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 sm:text-base"
            >
              <svg
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live
            </a>
          )}
        </div>

        {/* Full description */}
        <div className="mb-6 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-gray-700 sm:text-base">
              {p}
            </p>
          ))}
        </div>

        {/* Full tech stack */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 sm:px-3 sm:py-1 sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const slideUp = {
  initial: { y: '100%' },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: { y: '100%', transition: { duration: 0.5 } },
};

const introLine =
  'A collection of my work spanning software engineering, design, research, and everything in between.';

/**
 * WorkGallery
 *
 * Filterable grid of work items with category tabs, animated cards,
 * and a detail modal. Used on the `/work` page.
 */
export default function WorkGallery() {
  const allWork = getAllWork();
  const categories = getAllCategories();
  const [activeFilter, setActiveFilter] = useState<WorkCategory | null>(null);
  const [modalItem, setModalItem] = useState<Work | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(introRef, { margin: '-100px' });

  const filtered = activeFilter
    ? allWork.filter((w) => w.category.includes(activeFilter))
    : allWork;

  const handleReadMore = useCallback((item: Work, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setModalItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalItem(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <section
      className="bg-white px-6 py-16 sm:px-12 sm:py-20 lg:px-20"
      aria-label="Work Gallery"
    >
      <div className="mx-auto max-w-7xl">
        {/* Intro text — word-by-word slide-up animation */}
        <p
          ref={introRef}
          className="mb-10 text-center text-base leading-snug text-gray-900 sm:text-3xl"
        >
          {introLine.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                initial="initial"
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        {/* Category filter bar */}
        <CategoryFilters
          categories={categories}
          active={activeFilter}
          onSelect={setActiveFilter}
        />

        {/* Card grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <GalleryCard
                key={item.slug}
                item={item}
                index={index}
                onReadMore={handleReadMore}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {modalItem && (
          <DetailModal item={modalItem} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
