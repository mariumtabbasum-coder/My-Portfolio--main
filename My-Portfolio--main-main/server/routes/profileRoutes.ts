import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    name: 'Marium Tabassum',
    title: 'Software Engineering Student & AI-Focused Web Developer',
    education: 'Aptech Computer Education (Semester 1 Complete)',
    scholarship: 'Bano Qabil Generative AI Scholar',
    email: 'mariumtabbasum@gmail.com',
    location: 'Karachi, Pakistan',
  });
});

export default router;
