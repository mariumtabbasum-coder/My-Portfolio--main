import { Router } from 'express';
import Certificate from '../models/Certificate';

const router = Router();

let inMemoryCertificates = [
  { id: '1', title: 'Semester 1 Software Engineering', issuer: 'Aptech Computer Education', date: '2025', description: 'Foundational software engineering curriculum.', skills: ['HTML', 'CSS', 'JavaScript'] },
  { id: '2', title: 'Generative AI Scholar', issuer: 'Bano Qabil', date: '2025', description: 'Generative AI & Prompt Engineering.', skills: ['Generative AI', 'Prompt Engineering'] },
];

router.get('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const items = await Certificate.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: items });
    } else {
      return res.json({ success: true, data: inMemoryCertificates });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    const newId = Date.now().toString();
    const payload = { id: newId, ...req.body };
    if (mongoose.connection.readyState === 1) {
      const created = await Certificate.create(payload);
      return res.json({ success: true, data: created });
    } else {
      inMemoryCertificates.push(payload);
      return res.json({ success: true, data: payload });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      await Certificate.findOneAndDelete({ id });
      return res.json({ success: true, message: 'Certificate deleted' });
    } else {
      inMemoryCertificates = inMemoryCertificates.filter(c => c.id !== id);
      return res.json({ success: true, message: 'Certificate deleted' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
