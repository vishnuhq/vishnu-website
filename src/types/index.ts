/**
 * Type definitions for the portfolio website
 */

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
