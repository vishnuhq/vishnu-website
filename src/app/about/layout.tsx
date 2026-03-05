import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'About | VishnuHQ',
  description:
    'Learn about Vishnu Vardhan Putta. A full-stack developer, teaching assistant, and CS graduate from Stevens Institute of Technology.',
  alternates: {
    canonical: 'https://vishnuhq.com/about',
  },
  openGraph: {
    title: 'About | VishnuHQ',
    description:
      'Skills, experience, education and research by Vishnu Vardhan Putta.',
    url: 'https://vishnuhq.com/about',
    type: 'profile',
    siteName: 'VishnuHQ',
    images: [
      {
        url: '/images/og/default.png',
        width: 1200,
        height: 630,
        alt: 'About Vishnu Vardhan Putta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | VishnuHQ',
    description:
      'Skills, experience, education and research by Vishnu Vardhan Putta.',
    images: ['/images/og/default.png'],
  },
};

export default function AboutLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
