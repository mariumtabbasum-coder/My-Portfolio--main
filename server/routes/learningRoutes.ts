import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { period: '2025 - 2026', title: 'Aptech Software Engineering - Semester 1 Complete' },
      { period: '2025 - Present', title: 'Bano Qabil Generative AI Scholarship' },
    ],
  });
});

export default router;
