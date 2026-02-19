import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Animations from './animations';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'VishnuHQ',
  description:
    'Full Stack Developer. Building scalable, efficient solutions with clean, readable code.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'Web Developer',
    'Vishnu Vardhan Putta',
  ],
  authors: [{ name: 'Vishnu Vardhan Putta' }],
  creator: 'Vishnu Vardhan Putta',
  metadataBase: new URL('https://vishnuhq.com'),
  alternates: {
    canonical: 'https://vishnuhq.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vishnuhq.com',
    siteName: 'VishnuHQ',
    title: 'VishnuHQ',
    description:
      'Full Stack Developer. Building scalable, efficient solutions with clean, readable code.',
    images: [
      {
        url: '/images/og/default.png',
        width: 1200,
        height: 630,
        alt: 'VishnuHQ — Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VishnuHQ',
    description:
      'Full Stack Developer. Building scalable, efficient solutions with clean, readable code.',
    images: ['/images/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`overflow-x-hidden ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vishnu Vardhan Putta',
              jobTitle: 'Full Stack Developer',
              url: 'https://vishnuhq.com',
              email: 'mailto:vishnuhq.me@gmail.com',
              sameAs: [
                'https://github.com/vishnuhq',
                'https://linkedin.com/in/vishnuhq',
                'https://instagram.com/vishnuhq',
              ],
              knowsAbout: [
                'Full Stack Development',
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'Python',
                'DevOps',
              ],
            }),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Animations>
          <Header />
          <main
            id="main-content"
            className="flex flex-col bg-background text-foreground"
          >
            {children}
          </main>
        </Animations>
      </body>
    </html>
  );
}
