/**
 * Data Layer Index
 *
 * Re-exports all data and helper functions for easy importing.
 *
 * @example
 * import { work, socialLinks, personalInfo, navLinks } from '@/data';
 */

// Work
export {
  work,
  getAllWork,
  getFeaturedWork,
  getAllCategories,
  categoryLabels,
} from './work';

// Social Links
export {
  socialLinks,
  getPrimarySocialLinks,
  getAllSocialLinks,
  getFooterSocialLinks,
  getContactPageLinks,
} from './social';

// Personal Info
export { personalInfo } from './personal';

// Navigation
export { navLinks } from './navigation';
