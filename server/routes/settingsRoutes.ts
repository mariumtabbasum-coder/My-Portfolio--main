import { Router } from 'express';
import Settings from '../models/Settings';

const router = Router();

// In-memory fallback if MongoDB is not connected
let inMemorySettings = {
  emails: ['mariumtabbasum@gmail.com'],
  phone: '+92 300 1234567',
  buttonText: 'View Projects',
  buttonLink: '#projects',
  secondaryCtaText: 'Download CV',
  secondaryCtaLink: '/resume.pdf',
  contactBtnText: 'Send Message',
  links: {
    github: 'https://github.com/mariumtabbasum-coder',
    linkedin: 'https://linkedin.com/in/mariumtabbasum',
    twitter: 'https://twitter.com/marium',
    facebook: '',
    instagram: ''
  },
  profile: {
    name: 'Marium Tabassum',
    title: 'Software Engineering Student & AI-Focused Web Developer',
    education: 'Aptech Computer Education (Semester 1 Complete)',
    scholarship: 'Bano Qabil Generative AI Scholar',
    location: 'Karachi, Pakistan',
    bio: 'Passionate software engineering student and frontend developer building responsive web applications and exploring generative AI solutions.',
    heroBadge: 'Aptech Computer Education • Semester 1 Complete',
    responseTimeText: 'Typical Response: Within 24 Hours'
  }
};

router.get('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create(inMemorySettings);
      }
      return res.json({ success: true, data: settings });
    } else {
      return res.json({ success: true, data: inMemorySettings });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { emails, phone, buttonText, buttonLink, secondaryCtaText, secondaryCtaLink, contactBtnText, links, profile } = req.body;
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const updateData: any = {};
      if (emails !== undefined) updateData.emails = emails;
      if (phone !== undefined) updateData.phone = phone;
      if (buttonText !== undefined) updateData.buttonText = buttonText;
      if (buttonLink !== undefined) updateData.buttonLink = buttonLink;
      if (secondaryCtaText !== undefined) updateData.secondaryCtaText = secondaryCtaText;
      if (secondaryCtaLink !== undefined) updateData.secondaryCtaLink = secondaryCtaLink;
      if (contactBtnText !== undefined) updateData.contactBtnText = contactBtnText;
      if (links !== undefined) updateData.links = links;
      if (profile !== undefined) updateData.profile = profile;

      const settings = await Settings.findOneAndUpdate(
        {},
        { $set: updateData },
        { new: true, upsert: true }
      );
      return res.json({ success: true, data: settings });
    } else {
      inMemorySettings = {
        emails: emails ?? inMemorySettings.emails,
        phone: phone ?? inMemorySettings.phone,
        buttonText: buttonText ?? inMemorySettings.buttonText,
        buttonLink: buttonLink ?? inMemorySettings.buttonLink,
        secondaryCtaText: secondaryCtaText ?? inMemorySettings.secondaryCtaText,
        secondaryCtaLink: secondaryCtaLink ?? inMemorySettings.secondaryCtaLink,
        contactBtnText: contactBtnText ?? inMemorySettings.contactBtnText,
        links: { ...inMemorySettings.links, ...(links || {}) },
        profile: { ...inMemorySettings.profile, ...(profile || {}) }
      };
      return res.json({ success: true, data: inMemorySettings });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
