import { Router } from 'express';

const router = Router();

const skills = [
  { name: 'Semantic HTML5', level: 95, category: 'frontend' },
  { name: 'CSS3 & Responsive Design', level: 92, category: 'frontend' },
  { name: 'JavaScript (ES6+)', level: 88, category: 'frontend' },
  { name: 'Bootstrap 5', level: 90, category: 'frontend' },
  { name: 'jQuery', level: 85, category: 'frontend' },
  { name: 'Generative AI Fundamentals', level: 88, category: 'ai' },
  { name: 'Prompt Engineering', level: 92, category: 'ai' },
  { name: 'Google Gemini API', level: 85, category: 'ai' },
  { name: 'Python Programming', level: 80, category: 'tools' },
];

router.get('/', (req, res) => {
  res.json({ success: true, count: skills.length, data: skills });
});

export default router;
