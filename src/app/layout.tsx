import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main
          id="main-content"
          className="flex flex-col bg-background text-foreground"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
