import { Router } from 'express';
import Message from '../models/Message';

const router = Router();

let inMemoryMessages = [
  {
    id: '1',
    name: 'Sarah Khan',
    email: 'sarah@example.com',
    subject: 'Frontend Collaboration',
    message: 'Hello Marium, I checked your portfolio and would like to discuss a frontend project with you.',
    date: '2026-09-26 14:30'
  },
  {
    id: '2',
    name: 'Ali Ahmed',
    email: 'ali@example.com',
    subject: 'Internship Opportunity',
    message: 'We have an opening for a Junior Frontend Developer position at our firm.',
    date: '2026-09-25 10:15'
  }
];

router.get('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const items = await Message.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: items });
    } else {
      return res.json({ success: true, data: inMemoryMessages });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    const newMsg = {
      id: Date.now().toString(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...req.body
    };
    if (mongoose.connection.readyState === 1) {
      const created = await Message.create(newMsg);
      return res.json({ success: true, data: created });
    } else {
      inMemoryMessages.unshift(newMsg);
      return res.json({ success: true, data: newMsg });
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
      await Message.findOneAndDelete({ id });
      return res.json({ success: true, message: 'Message deleted' });
    } else {
      inMemoryMessages = inMemoryMessages.filter(m => m.id !== id);
      return res.json({ success: true, message: 'Message deleted' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
