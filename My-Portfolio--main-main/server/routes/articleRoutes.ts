import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: '1', title: 'Why Frontend Developers Must Learn Prompt Engineering', date: '2026' },
      { id: '2', title: 'Building Mobile-First Websites with Semantic HTML5', date: '2025' },
    ],
  });
});

export default router;
