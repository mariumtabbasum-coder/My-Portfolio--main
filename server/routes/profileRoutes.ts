import { Router } from 'express';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', (req, res) => {
  const settings = dataStore.getSettings();
  res.json({
    name: settings.profile.name || 'Marium Tabassum',
    title: settings.profile.title || settings.title,
    education: settings.profile.education,
    scholarship: settings.profile.scholarship,
    email: settings.email || settings.emails[0] || 'mariumtabbasum@gmail.com',
    location: settings.location || settings.profile.location,
    bio: settings.bio || settings.profile.bio,
    heroBadge: settings.heroBadge || settings.profile.heroBadge,
    responseTimeText: settings.responseTimeText || settings.profile.responseTimeText,
  });
});

export default router;
