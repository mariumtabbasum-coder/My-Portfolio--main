import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  res.json({ success: true, message: 'Authenticated successfully', token: 'mock-token' });
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

router.get('/me', (req, res) => {
  res.json({
    user: {
      name: 'Marium Tabassum',
      role: 'admin',
      email: 'mariumtabbasum@gmail.com',
    },
  });
});

export default router;
