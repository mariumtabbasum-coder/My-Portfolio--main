import { Router } from 'express';

const router = Router();

router.get('/experiments', (req, res) => {
  res.json({
    success: true,
    experiments: [
      { id: 'exp-1', name: 'Gemini Prompt Optimization', status: 'active' },
      { id: 'exp-2', name: 'Frontend Code Synthesis', status: 'active' },
      { id: 'exp-3', name: 'Semantic Layout Analyzer', status: 'ready' },
    ],
  });
});

export default router;
