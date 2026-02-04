/**
 * Type definitions for the portfolio website
 */

/**
 * Work category for filtering
 */
export type WorkCategory = 'frontend' | 'backend' | 'fullstack' | 'aiml' | 'desktop' | 'mobile' | 'devops';

/**
 * Work item data structure
 */
export interface Work {
  /** URL-friendly identifier */
  slug: string;
  /** Work title */
  title: string;
  /** Short description for cards (< 150 words) */
  shortDescription: string;
  /** Full description for modal (multi-paragraph) */
  fullDescription: string;
  /** Path to main image in /public/images/work/ */
  mainImage: string;
  /** GitHub repository URL */
  githubUrl?: string;
  /** Live deployment URL */
  liveUrl?: string;
  /** Complete list of technologies used */
  techStack: string[];
  /** Top technologies shown on card (1–5 items) */
  topTech: string[];
  /** Categories for filtering */
  category: WorkCategory[];
  /** Show on home page featured section */
  featured: boolean;
  /** Sort order (lower = first) */
  order: number;
}

/**
 * Timeline item for the about page journey sections
 * Used for experience, education, and research/publications
 */
export interface TimelineItem {
  /** Display year (e.g., '2025', 'Now') */
  year: string;
  /** Role, degree, or paper title */
  title: string;
  /** Company, institution, or publisher */
  company: string;
  /** Optional link for the company/institution/DOI */
  companyUrl?: string;
  /** Conversational description */
  description: string;
  /** Highlight with teal accent (use for current/active items) */
  highlight?: boolean;
}

/**
 * Social link data structure
 */
export interface SocialLink {
  /** Platform name */
  name: string;
  /** Full URL */
  url: string;
  /** Icon identifier */
  icon: string;
  /** Show prominently on main pages */
  primary: boolean;
  /** Display username (e.g., "vishnuhq", "@vishnuhq") */
  username: string;
  /** Text to display on contact page button (e.g., "github.com/vishnuhq") */
  displayText: string;
  /** Order for contact page display (lower = first) */
  displayOrder: number;
}

/**
 * Navigation item
 */
export interface NavItem {
  /** Display label */
  label: string;
  /** Route path */
  href: string;
}

/**
 * Home page description section content
 */
export interface DescriptionContent {
  /** First phrase line (animated word-by-word) */
  phrase1: string;
  /** Second phrase line (animated word-by-word) */
  phrase2: string;
  /** First right-side paragraph */
  rightText1: string;
  /** Second right-side paragraph */
  rightText2: string;
  /** CTA button text */
  buttonText: string;
  /** CTA button link */
  buttonLink: string;
}

/**
 * Footer section content
 */
export interface FooterContent {
  /** Job seeking message displayed in footer */
  jobSeekingMessage: string;
  /** Skills tagline (e.g., "Full Stack • API Design • DevOps • HCI") */
  tagline: string;
  /** Contact button text */
  contactButtonText: string;
  /** Copyright additional text */
  copyrightText: string;
  /** Year the site was first published */
  copyrightStartYear: number;
}

/**
 * Personal/bio data
 */
export interface PersonalInfo {
  /** Full name */
  name: string;
  /** Job title/role */
  title: string;
  /** Short tagline */
  tagline: string;
  /** Extended bio for about page */
  fullBio: string;
  /** Contact email */
  email: string;
  /** Location */
  location: string;
  /** Profile image path */
  profileImage: string;
  /** About page image path */
  aboutImage: string;
  /** Home page description section */
  description: DescriptionContent;
  /** Footer section content */
  footer: FooterContent;
}
