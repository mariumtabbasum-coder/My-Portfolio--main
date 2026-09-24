import { Router } from 'express';

const router = Router();

router.get('/summary', (req, res) => {
  res.json({
    success: true,
    views: 1240,
    uniqueVisitors: 480,
    messagesCount: 18,
    activeExperiments: 3,
  });
});

export default router;
