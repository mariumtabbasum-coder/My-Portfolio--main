import { Router } from 'express';
import Settings from '../models/Settings';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const settings = await Settings.findOne();
      if (settings && settings.profile) {
        return res.json({
          name: settings.profile.name,
          title: settings.profile.title,
          education: settings.profile.education,
          scholarship: settings.profile.scholarship,
          email: settings.emails?.[0] || 'mariumtabbasum@gmail.com',
          location: settings.profile.location,
          bio: settings.profile.bio,
          heroBadge: settings.profile.heroBadge,
          responseTimeText: settings.profile.responseTimeText
        });
      }
    }
    return res.json({
      name: 'Marium Tabassum',
      title: 'Software Engineering Student & AI-Focused Web Developer',
      education: 'Aptech Computer Education (Semester 1 Complete)',
      scholarship: 'Bano Qabil Generative AI Scholar',
      email: 'mariumtabbasum@gmail.com',
      location: 'Karachi, Pakistan',
      bio: 'Passionate software engineering student and frontend developer building responsive web applications and exploring generative AI solutions.',
      heroBadge: 'Aptech Computer Education • Semester 1 Complete',
      responseTimeText: 'Typical Response: Within 24 Hours'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
