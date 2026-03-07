import type { SocialLink } from '@/types';

/**
 * Social media and professional links
 * displayOrder determines position on contact page (lower = first)
 */
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/vishnuhq',
    icon: 'github',
    primary: true,
    username: 'vishnuhq',
    displayText: 'github.com/vishnuhq',
    displayOrder: 3,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vishnuhq',
    icon: 'linkedin',
    primary: true,
    username: 'vishnuhq',
    displayText: 'linkedin.com/in/vishnuhq',
    displayOrder: 2,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/vishnuhq',
    icon: 'instagram',
    primary: true,
    username: 'vishnuhq',
    displayText: 'instagram.com/vishnuhq',
    displayOrder: 4,
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/vishnuhq',
    icon: 'leetcode',
    primary: false,
    username: 'vishnuhq',
    displayText: 'leetcode.com/vishnuhq',
    displayOrder: 5,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@vishnuhq',
    icon: 'youtube',
    primary: false,
    username: '@vishnuhq',
    displayText: 'youtube.com/@vishnuhq',
    displayOrder: 6,
  },
];

/**
 * Get footer social links (GitHub, LinkedIn, Instagram only)
 */
export function getFooterSocialLinks(): SocialLink[] {
  const footerNames = ['GitHub', 'LinkedIn', 'Instagram'];
  return socialLinks.filter((link) => footerNames.includes(link.name));
}

/**
 * Get all social links sorted by displayOrder for contact page
 */
export function getContactPageLinks(): SocialLink[] {
  return [...socialLinks].sort((a, b) => a.displayOrder - b.displayOrder);
}
