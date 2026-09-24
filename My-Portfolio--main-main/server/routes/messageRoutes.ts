import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(`📩 New message received from ${name} (${email}): ${subject} - ${message}`);
  res.json({ success: true, message: 'Message sent successfully!' });
});

export default router;
