import { Router } from 'express';
import Skill from '../models/Skill';

const router = Router();

let inMemorySkills = [
  { id: '1', name: 'HTML', level: 85, category: 'frontend', badge: 'Intermediate' },
  { id: '2', name: 'CSS', level: 85, category: 'frontend', badge: 'Intermediate' },
  { id: '3', name: 'JavaScript', level: 60, category: 'frontend', badge: 'Elementary' },
  { id: '4', name: 'Bootstrap', level: 80, category: 'frontend', badge: 'Intermediate' },
  { id: '5', name: 'jQuery', level: 60, category: 'frontend', badge: 'Elementary' },
  { id: '6', name: 'Python', level: 40, category: 'programming', badge: 'Beginner' },
  { id: '7', name: 'Generative AI', level: 50, category: 'tools', badge: 'Currently Learning' },
];

router.get('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const items = await Skill.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: items });
    } else {
      return res.json({ success: true, data: inMemorySkills });
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
      const created = await Skill.create(payload);
      return res.json({ success: true, data: created });
    } else {
      inMemorySkills.push(payload);
      return res.json({ success: true, data: payload });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const updated = await Skill.findOneAndUpdate({ id }, req.body, { new: true });
      return res.json({ success: true, data: updated });
    } else {
      inMemorySkills = inMemorySkills.map(s => s.id === id ? { ...s, ...req.body } : s);
      return res.json({ success: true, data: inMemorySkills.find(s => s.id === id) });
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
      await Skill.findOneAndDelete({ id });
      return res.json({ success: true, message: 'Skill deleted' });
    } else {
      inMemorySkills = inMemorySkills.filter(s => s.id !== id);
      return res.json({ success: true, message: 'Skill deleted' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
