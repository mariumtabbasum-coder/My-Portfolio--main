import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: 'Aptech Faculty', comment: 'Marium demonstrates exceptional problem-solving and clean frontend structure.' },
      { name: 'Project Collaborator', comment: 'Passionate about modern AI APIs and responsive aesthetics.' },
    ],
  });
});

export default router;
