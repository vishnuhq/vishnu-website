# Personal Website (vishnuhq.com)

My personal website. Built with Next.js and React, deployed on Vercel. Check it out at [vishnuhq.com](https://vishnuhq.com).

Currently has 4 pages but I plan on updating it to have more in the future. Everything is statically generated at build time and all content lives in TypeScript data files, so updating anything is just editing a file without touching components. Pushes to main auto-deploy to Vercel.

Has scroll-driven animations with GSAP, smooth scrolling with Lenis, parallax sections, responsive across all screen sizes, WCAG 2.2 AAA accessible, and SEO set up with structured data and a sitemap.

## Tech Stack

| Layer | What |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 + ScrollTrigger, Framer Motion 12 |
| Smooth Scroll | Lenis |
| Linting | ESLint 10 with accessibility and React plugins |
| Formatting | Prettier with Tailwind class sorting |
| Deployment | Vercel |

## Setup

Needs Node.js 20 or higher.

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # Run ESLint
npm run format   # Format everything with Prettier
```
