import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    siteName: 'Marium Tabassum Portfolio',
    theme: 'dark',
    availableForHire: true,
  });
});

export default router;
