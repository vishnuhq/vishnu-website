import type { Work, WorkCategory } from '@/types';

/**
 * All work data
 *
 * Work items are ordered by the `order` field (lower = first)
 * Featured items appear on the home page
 */
export const work: Work[] = [
  {
    slug: 'filetrace',
    title: 'FileTrace',
    shortDescription:
      'An audit-first file management platform that gives you complete visibility into how your files are used and shared. Upload, share, organize, rename, delete, every action gets logged with who did it, when, and from where.',
    fullDescription: `FileTrace is an audit-first file management platform that gives you complete visibility into how your files are accessed and shared.

You can upload and organize files into categories like Personal, Work, Documents, or Archive. Sharing works two ways: generate a public link for anyone to access, or share directly with another user by username or email. Both sharing methods support configurable expiration times, download limits, and can be revoked at any point.

The audit trail records every action taken on your files. Uploads, downloads, renames, shares, category changes, deletions, and even failed attempts to access expired links. Each entry logs who performed the action, when it happened, their IP address, and their location.

The frontend uses React with Vite and Tailwind CSS, and the backend is built with Node.js, Express, and MongoDB Atlas. The whole backend is containerized with Docker and deployed on AWS. EC2 runs the server, S3 handles file storage (encrypted with AES-256) and frontend hosting, and CloudFront handles CDN distribution. CI/CD pipelines run on both GitHub Actions and GitLab CI, with Trivy and npm audit scanning for vulnerabilities on every run.`,
    mainImage: '/images/work/filetrace/filetrace.webp',
    githubUrl: 'https://github.com/vishnuhq/filetrace',
    techStack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Axios',
      'Node.js',
      'Express',
      'MongoDB Atlas',
      'Zod',
      'JWT',
      'bcrypt',
      'Helmet',
      'AWS EC2',
      'AWS S3',
      'CloudFront',
      'CloudWatch',
      'Docker',
      'GitHub Actions',
      'GitLab CI',
      'Trivy',
      'Vitest',
    ],
    topTech: ['MERN Stack', 'AWS', 'Docker', 'CI/CD'],
    category: ['fullstack', 'devops'],
    featured: true,
    order: 1,
  },
  {
    slug: 'peer-tutor-connect',
    title: 'Peer-Tutor Connect',
    shortDescription:
      'A peer tutoring platform that cuts the typical 24-48 hour wait for academic help down to minutes through course-specific forums. Designed through an iterative, human-centered process with multiple rounds of user testing.',
    fullDescription: `Peer-Tutor Connect is a peer tutoring platform where students help each other with coursework through course-specific discussion forums. Students in online courses often face 24-48 hour delays when reaching out through emails, Canvas messages, or office hours. This platform brings that wait time down to minutes by connecting classmates who can answer questions directly.

Students log in and see forums for each course they are enrolled in. They can post questions, respond to others in threaded conversations, mark responses as helpful, and resolve questions once they get the answer they need. Anonymous posting is available for anyone who feels uncomfortable asking publicly. The platform also has a notification system that lets students know when someone responds to their question.

The design went through five prototype iterations: a low-fidelity paper prototype, a medium-fidelity Figma mockup, and three rounds of high-fidelity working builds, each tested with 8-10 real users. Feedback was collected through both qualitative and quantitative metrics, and every round directly shaped the next version. The final iteration reduced average question response time by 71%.

The application meets WCAG 2.2 AAA guidelines, scoring 100 out of 100 on Lighthouse accessibility with zero issues in axe DevTools and full keyboard and screen reader support verified through VoiceOver. The project was also evaluated against Nielsen's 10 usability heuristics and Maeda's Laws of Simplicity.

The frontend is built with React, Vite, and Tailwind CSS, and the backend runs on Node.js with Express and MongoDB, with Jest and Supertest for testing.`,
    mainImage: '/images/work/peer-tutor-connect/peertutorconnect.webp',
    githubUrl: 'https://github.com/vishnuhq/peer-tutor-connect',
    techStack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Axios',
      'Node.js',
      'Express',
      'MongoDB',
      'express-session',
      'express-validator',
      'bcrypt',
      'Helmet',
      'Jest',
      'Supertest',
    ],
    topTech: ['MERN Stack', 'HCI'],
    category: ['fullstack'],
    featured: true,
    order: 2,
  },
  {
    slug: 'face-mask-detection',
    title: 'Face Mask Detection',
    shortDescription:
      'A deep learning system that detects whether someone is wearing a face mask properly, improperly, or not at all. Developed using transfer learning with MobileNetV2, with a web interface for real-time and image-based detection.',
    fullDescription: `This is a deep learning system that classifies face masks into three categories: properly worn, improperly worn, and not worn at all.

The model uses transfer learning with MobileNetV2 as the base architecture. MobileNetV2 was chosen for its balance between accuracy and speed, which makes it practical for real-time detection without needing heavy hardware. The model was trained on a Kaggle dataset organized into the three mask classes.

The model reached 97.83% accuracy with precision and recall between 96% and 99% for each class. Validation loss came in at 0.0613.

A web interface was built using Flask and Bootstrap 5 for using with a webcam or uploading images for analysis. All model training code, data preprocessing, and evaluation metrics are included in the repository.

This project started as a 2021 team project with two-class classification (with mask / without mask), which I later developed further to include the third class for incorrectly worn masks.`,
    mainImage: '/images/work/face-mask-detection/facemaskdetection.webp',
    githubUrl: 'https://github.com/vishnuhq/face-mask-detection',
    techStack: [
      'Python',
      'TensorFlow',
      'MobileNetV2',
      'OpenCV',
      'Flask',
      'Bootstrap',
      'JavaScript',
      'NumPy',
      'Matplotlib',
    ],
    topTech: ['TensorFlow', 'OpenCV', 'Flask'],
    category: ['aiml'],
    featured: true,
    order: 3,
  },
  {
    slug: 'photography-spot-finder',
    title: 'Photography Spot Finder',
    shortDescription:
      'A platform for photographers to discover and share the best photography locations in and around New York City. Browse spots on an interactive map, rate, comment, and join monthly photo contests voted by the community.',
    fullDescription: `Photography Spot Finder is a community platform where photographers discover and share the best shooting locations in and around New York City.

The landing page highlights the top three rated spots of the month and the current photo contest leaders, along with a search bar for finding spots by location or tag. The spots list page shows all submissions with filters for timestamp, tags, ratings, and keywords.

Each photography spot includes a description, accessibility details (public, restricted, free, paid), best shooting times, up to three photos, and up to five optional tags. Spots are displayed on an interactive Mapbox map showing exact locations. Users can also search for nearby spots by entering a distance radius, with results plotted on the map.

Spots can be rated on a scale of 1 to 10, and users can leave comments sharing tips or experiences. A monthly photo contest lets users submit shots taken at featured spots, and the community votes through upvotes and downvotes to pick the winners.

User profiles display all submitted spots, ratings, comments, favorite spots, and contest entries. Users can edit their profile, manage their content, and verify their email through OTP to get a verified badge. Public profiles let anyone view a user's activity and submissions. There is also a search feature for finding other users by name or username. An admin panel handles moderation for reported content.

The backend is built with Node.js, Express, and MongoDB, using Handlebars for server-side rendering. Images are stored through Cloudinary. Unit tests run through Jest with a GitHub Actions CI pipeline.`,
    mainImage: '/images/work/photography-spot-finder/photographyspotfinder.webp',
    githubUrl: 'https://github.com/vishnuhq/photography-spot-finder',
    techStack: [
      'Node.js',
      'Express',
      'MongoDB',
      'Handlebars',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Mapbox API',
      'Cloudinary',
      'bcrypt',
      'express-session',
      'Jest',
      'GitHub Actions',
    ],
    topTech: ['Express', 'MongoDB', 'Mapbox'],
    category: ['fullstack'],
    featured: true,
    order: 4,
  },
  {
    slug: 'ml-classifiers-comparison',
    title: 'ML Classifiers Comparison',
    shortDescription:
      'A comparative study of 7 machine learning algorithms predicting smoking status from health screening data. Each model is evaluated on accuracy, precision, recall, F1 score, and ROC-AUC on full and reduced feature sets.',
    fullDescription: `This project compares 7 machine learning classification algorithms head-to-head on a real health dataset. The goal is to predict whether someone is a smoker based on their biological signals and health screening data from the Kaggle Body Signal of Smoking dataset.

The dataset started with 55,692 records and was cleaned down to 44,084 after removing duplicates and outliers. Five new features were engineered from domain knowledge (BMI, blood pressure ratio, cholesterol ratio, LDL-HDL ratio, and hypertension flag), bringing the total to 30 features. A reduced set of 16 features was selected using Random Forest importance ranking.

The 7 algorithms tested are K-Nearest Neighbors, Decision Tree, Random Forest, Support Vector Machine, Naive Bayes, Logistic Regression, and Neural Network. Each was trained and evaluated on both feature sets using an 80/20 stratified train-test split.

Random Forest scored the highest accuracy at 75.38% and the best ROC-AUC at 0.8385. Logistic Regression with balanced class weights captured the most smokers with 93.27% recall and the highest F1 score. Neural Network had the best precision at 66.21%. Cutting the feature set nearly in half cost less than 1% average performance, and some models actually did better with fewer features.

The analysis is documented across 9 Jupyter notebooks, covering data exploration and cleaning, each individual model, and a final comparison with visualizations and performance tables.`,
    mainImage: '/images/work/ml-classifiers-comparison/mlclassifierscomparison.webp',
    githubUrl: 'https://github.com/vishnuhq/ml-classifiers-comparison',
    techStack: [
      'Python',
      'Jupyter Notebook',
      'pandas',
      'NumPy',
      'matplotlib',
      'seaborn',
      'scikit-learn',
      'ydata-profiling',
    ],
    topTech: ['Python', 'scikit-learn', 'Jupyter'],
    category: ['aiml'],
    featured: true,
    order: 5,
  },
  {
    slug: 'personal-website',
    title: 'Personal Website',
    shortDescription:
      'The website you are looking at right now. Originally built with HTML, CSS, and JavaScript, then rebuilt from scratch using Next.js and React for fast performance, responsive design, and server-side rendering.',
    fullDescription: `This is the site you are currently browsing. It was originally a static site built with HTML, CSS, and JavaScript, and was later rebuilt from the ground up using Next.js and React with the App Router. TypeScript handles type safety across the codebase, and Tailwind CSS is used for all styling.

Animations are split across two libraries. GSAP with ScrollTrigger powers scroll-driven effects like the letter collision on page heroes and parallax sections. Framer Motion handles component-level transitions like page enters, filter animations, and modal overlays. Lenis provides the smooth scrolling foundation underneath.

The site is fully responsive across all screen sizes, built for fast performance, and follows WCAG 2.2 AAA accessibility standards.

All content lives in separate TypeScript data files, so adding a new project or updating a bio is just editing a file without touching any components. The site deploys automatically to Vercel whenever code is pushed to the main branch on GitHub.`,
    mainImage: '/images/work/personal-website/personalwebsite.webp',
    liveUrl: 'https://vishnuhq.com',
    githubUrl: 'https://github.com/vishnuhq/vishnu-website',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'Lenis',
      'Vercel',
    ],
    topTech: ['Next.js', 'React', 'TypeScript'],
    category: ['frontend'],
    featured: true,
    order: 6,
  },
  {
    slug: 'smart-posture-monitoring',
    title: 'Smart Posture Monitoring, AKA Ducktor',
    shortDescription:
      'A desktop app that monitors your posture through your webcam and nudges you when you start slouching. Includes customizable break reminders and posture-improving exercises. All processing runs locally on your machine.',
    fullDescription: `Smart Posture Monitoring (also called Ducktor) is a desktop application that helps you maintain healthy posture while working at your computer. It uses your webcam to monitor how you are sitting and sends a notification when it detects slouching or poor alignment.

The app was built during the Quack Hacks hackathon using Electron for the desktop framework and TensorFlow.js with the MoveNet model for real-time pose estimation. All detection runs locally on your machine, so no webcam data is sent to any server.

Along with posture monitoring, the app includes customizable break reminders at intervals you set and a carousel of simple exercises like chest releases, shoulder rolls, and spine stretches. Notifications use a duck theme to keep things light.`,
    mainImage: '/images/work/smart-posture-monitoring/ducktor.webp',
    githubUrl: 'https://github.com/vishnuhq/ducktor',
    techStack: [
      'Electron',
      'TensorFlow.js',
      'MoveNet',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Node.js',
    ],
    topTech: ['Electron', 'TensorFlow.js', 'JavaScript'],
    category: ['aiml', 'desktop'],
    featured: true,
    order: 7,
  },
];

/** Returns all work items sorted by display order (ascending). */
export function getAllWork(): Work[] {
  return [...work].sort((a, b) => a.order - b.order);
}

/** Returns featured work items for the home page, sorted by order. */
export function getFeaturedWork(): Work[] {
  return work.filter((w) => w.featured).sort((a, b) => a.order - b.order);
}

/** Returns all unique categories present across work items. */
export function getAllCategories(): WorkCategory[] {
  const categories = new Set<WorkCategory>();
  work.forEach((w) => w.category.forEach((c) => categories.add(c)));
  return Array.from(categories);
}

/**
 * Category display names
 */
export const categoryLabels: Record<WorkCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack',
  aiml: 'AI/ML',
  desktop: 'Desktop',
  mobile: 'Mobile',
  devops: 'DevOps',
};
