import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Work | VishnuHQ',
  description:
    'Explore projects built by Vishnu Vardhan Putta.',
  alternates: {
    canonical: 'https://vishnuhq.com/work',
  },
  openGraph: {
    title: 'Work | VishnuHQ',
    description:
      'Projects and work by Vishnu Vardhan Putta.',
    url: 'https://vishnuhq.com/work',
    type: 'website',
    siteName: 'VishnuHQ',
    images: [
      {
        url: '/images/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Work by Vishnu Vardhan Putta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | VishnuHQ',
    description:
      'Projects and work by Vishnu Vardhan Putta.',
    images: ['/images/og/default.png'],
  },
};

export default function WorkLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
