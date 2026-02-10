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
  },
};

export default function ContactLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
