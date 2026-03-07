/**
 * Data Layer Index
 *
 * Re-exports all data and helper functions for easy importing.
 *
 * @example
 * import { socialLinks, personalInfo } from '@/data';
 */

// Work
export {
  getAllWork,
  getFeaturedWork,
  getAllCategories,
  categoryLabels,
} from './work';

// Social Links
export {
  getFooterSocialLinks,
  getContactPageLinks,
} from './social';

// Personal Info
export { personalInfo } from './personal';

// About page
export {
  getExperienceTimeline,
  getEducationTimeline,
  getResearchTimeline,
} from './about';
