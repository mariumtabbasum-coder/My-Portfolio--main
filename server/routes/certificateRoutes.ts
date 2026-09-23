import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: '1', title: 'Semester 1 Software Engineering', issuer: 'Aptech Computer Education' },
      { id: '2', title: 'Generative AI Scholar', issuer: 'Bano Qabil' },
    ],
  });
});

export default router;
