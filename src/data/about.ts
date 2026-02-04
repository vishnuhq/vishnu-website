import type { TimelineItem } from '@/types';

/**
 * About Page Data
 *
 * All content for the about page journey sections.
 * To update content, edit the arrays below.
 */

/**
 * Work experience (newest first)
 */
const experienceData: TimelineItem[] = [
  {
    year: '2025',
    title: 'Graduate Teaching Assistant',
    company: 'Stevens Institute of Technology',
    companyUrl: 'https://www.stevens.edu/',
    description:
      'I supported over 300 students in Web Programming and Algorithms graduate courses through weekly office hours, created automated grading scripts to deliver efficient feedback, guided Web Programming students in Node.js, Express, MongoDB, Handlebars, and RESTful API development, and assisted Algorithms students with data structures, searching and sorting, dynamic programming, graph theory, and backtracking.',
  },
  {
    year: '2025',
    title: "Master's Peer Mentor",
    company: 'Stevens Institute of Technology',
    companyUrl: 'https://www.stevens.edu/',
    description:
      "Provided guidance, support, and advice to incoming master’s students as they transitioned into graduate studies. I personally mentored 3 new students throughout their first semester. Met with them bi-weekly to check in, help them navigate academic and campus life, and serve as their first point of contact for connecting with relevant campus resources based on their needs. Also organized and attended campus events designed for new graduate students to help them build connections and expand their peer network.",
  },
];

/**
 * Education (newest first)
 */
const educationData: TimelineItem[] = [
  {
    year: '2025',
    title: 'Master of Science in Computer Science',
    company: 'Stevens Institute of Technology',
    companyUrl: 'https://www.stevens.edu/',
    description: 'At Stevens, I focused on software engineering, algorithms, machine learning, HCI, Agile, and DevOps, learning how to design, implement, and ship scalable, user-centered systems from concept through deployment.',
  },
  {
    year: '2023',
    title: 'Bachelor of Technology in Computer Science and Engineering',
    company: 'Sree Vidyanikethan Engineering College',
    companyUrl: 'https://www.svec.education',
    description: 'During my Bachelor’s, I built a strong foundation in core computer science fundamentals and programming languages, and worked closely with professors on research that led to published papers.',
  },
];

/**
 * Research and publications (newest first)
 */
const researchData: TimelineItem[] = [
  {
    year: '2024',
    title:
      'Applications of Innovations in Computational Intelligence, Big Data Analytics, and Internet of Things',
    company: 'Springer',
    companyUrl:
      'https://www.infoagepub.com/products/Innovations-in-Computational-Intelligence-Big-Data-Analytics-and-Internet-of-Things',
    description:
      'In Innovations in Computational Intelligence, Big Data Analytics and Internet of Things (p. 15)',
  },
  {
    year: '2022',
    title:
      'Real-Time Face Mask Detection from CCTV Video Frames using Deep Neural Networks',
    company: 'IEEE',
    companyUrl: 'https://doi.org/10.1109/ICACRS55517.2022.10029096',
    description:
      'In 2022 International Conference on Automation, Computing and Renewable Systems (ICACRS) (pp. 809\u2013812)',
  },
  {
    year: '2022',
    title: 'Siamese Neural Networks for One-Shot Face Recognition',
    company: 'Springer',
    companyUrl: 'https://doi.org/10.1007/978-981-99-2832-3_80',
    description:
      'In International Conference on Intelligent Healthcare and Computational Neural Modeling (pp. 693\u2013699)',
  },
  {
    year: '2022',
    title: 'Movie Recommendation System Using Deep Learning',
    company: 'Springer',
    companyUrl: 'https://doi.org/10.1007/978-981-99-2832-3_3',
    description:
      'In International Conference on Intelligent Healthcare and Computational Neural Modeling (pp. 17\u201322)',
  },
];

/** Returns work experience timeline entries */
export function getExperienceTimeline(): TimelineItem[] {
  return experienceData;
}

/** Returns education timeline entries */
export function getEducationTimeline(): TimelineItem[] {
  return educationData;
}

/** Returns research/publications timeline entries */
export function getResearchTimeline(): TimelineItem[] {
  return researchData;
}
