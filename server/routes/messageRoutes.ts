import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message';
import { dataStore } from '../utils/dataStore';
import { sendReplyEmail } from '../utils/emailService';

const router = Router();

// GET all messages
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

// POST create message (Public contact form)
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

// PUT mark message as read/unread
router.put('/:id/read', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const updated = dataStore.updateMessage(id, { read: Boolean(read) });

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Message as any).findOneAndUpdate(filter, { read: Boolean(read) }, { new: true });
      } catch (dbErr) {
        console.warn('MongoDB sync note for message read update');
      }
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

// POST reply to message via email
router.post('/:id/reply', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText || !replyText.trim()) {
      return res.status(400).json({ success: false, message: 'Reply text cannot be empty.' });
    }

    const messages = dataStore.getMessages();
    const targetMsg = messages.find(m => m.id === id || (m as any)._id === id);

    if (!targetMsg) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    // Send email using email service
    const emailResult = await sendReplyEmail({
      to: targetMsg.email,
      subject: `Re: ${targetMsg.subject || 'Portfolio Inquiry'}`,
      text: replyText,
    });

    const repliedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated = dataStore.updateMessage(id, {
      read: true,
      replied: true,
      replyText: replyText,
      repliedAt: repliedAt,
    });

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Message as any).findOneAndUpdate(filter, {
          read: true,
          replied: true,
          replyText: replyText,
          repliedAt: repliedAt
        }, { new: true });
      } catch (dbErr) {
        console.warn('MongoDB sync note for message reply update');
      }
    }

    return res.json({
      success: true,
      data: updated,
      message: emailResult.message,
      simulated: emailResult.simulated
    });
  } catch (err) {
    next(err);
  }
});

// DELETE message
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
