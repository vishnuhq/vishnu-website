import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Contact | VishnuHQ',
  description:
    'Get in touch with Vishnu Vardhan Putta. Email, social links, and more.',
  alternates: {
    canonical: 'https://vishnuhq.com/contact',
  },
  openGraph: {
    title: 'Contact | VishnuHQ',
    description:
      'Contact and social links for Vishnu Vardhan Putta.',
    url: 'https://vishnuhq.com/contact',
    type: 'website',
    siteName: 'VishnuHQ',
    images: [
      {
        url: '/images/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Contact Vishnu Vardhan Putta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | VishnuHQ',
    description:
      'Contact and social links for Vishnu Vardhan Putta.',
    images: ['/images/og/default.png'],
  },
};

export default function ContactLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
