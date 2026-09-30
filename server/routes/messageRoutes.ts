import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (mongoose.connection?.readyState === 1) {
      const dbMsgs = await (Message as any).find().sort({ createdAt: -1 });
      if (dbMsgs && dbMsgs.length > 0) {
        const normalized = dbMsgs.map((m: any) => ({
          ...(m.toObject ? m.toObject() : m),
          id: m.id || m._id?.toString()
        }));
        return res.json({ success: true, data: normalized });
      }
    }
    return res.json({ success: true, data: dataStore.getMessages() });
  } catch (err) {
    return res.json({ success: true, data: dataStore.getMessages() });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const created = dataStore.addMessage(req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        await (Message as any).create(created);
      } catch (dbErr) {
        console.warn('MongoDB sync note for message creation');
      }
    }

    return res.json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    dataStore.deleteMessage(id);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Message as any).findOneAndDelete(filter);
      } catch (dbErr) {
        console.warn('MongoDB sync note for message delete');
      }
    }

    return res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
