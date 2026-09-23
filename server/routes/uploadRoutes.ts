import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.json({ success: true, url: '/uploads/sample.png' });
});

export default router;
