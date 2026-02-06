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
  },
};

export default function WorkLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
