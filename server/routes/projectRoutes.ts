import { Router } from 'express';

const router = Router();

const projects = [
  {
    id: 'ai-studio',
    title: 'AI Lab Prompt & Code Studio',
    description: 'An interactive developer utility powered by Gemini API concepts for prompt engineering, real-time code analysis, and software guidance.',
    tags: ['Google Gemini API', 'React 19', 'Tailwind CSS', 'TypeScript'],
    category: 'ai',
  },
  {
    id: 'alberto-watch',
    title: 'Alberto Watch Luxury E-Commerce',
    description: 'A high-end luxury watch showcase with interactive timepiece view, elegant product catalog, smooth scroll transitions, and brand story.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    category: 'frontend',
  },
  {
    id: 'daily-design',
    title: 'Daily Design Agency Platform',
    description: 'Digital agency web application featuring creative service offerings, dynamic client portfolio, and interactive contact workflows.',
    tags: ['JavaScript ES6+', 'Modern UI/UX', 'CSS Flexbox/Grid'],
    category: 'frontend',
  },
];

router.get('/', (req, res) => {
  res.json({ success: true, count: projects.length, data: projects });
});

export default router;
