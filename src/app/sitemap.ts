import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-03-04';

  return [
    {
      url: 'https://vishnuhq.com',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://vishnuhq.com/work',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vishnuhq.com/about',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://vishnuhq.com/contact',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
