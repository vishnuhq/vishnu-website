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
  },
};

export default function AboutLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
