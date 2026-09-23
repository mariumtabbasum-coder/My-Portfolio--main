import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { title: 'Responsive Frontend Development', desc: 'Semantic HTML5, CSS3, JavaScript, Tailwind/Bootstrap' },
      { title: 'Generative AI Integration', desc: 'Gemini API client tools & Prompt Engineering' },
    ],
  });
});

export default router;
