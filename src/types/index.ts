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
