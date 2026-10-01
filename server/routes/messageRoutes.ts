import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message';
import { dataStore } from '../utils/dataStore';
import { sendReplyEmail } from '../utils/emailService';

const router = Router();

// GET all messages
router.get('/', async (req, res, next) => {
  try {
    const dbMsgs = await (Message as any).find().sort({ createdAt: -1 });
    const normalized = dbMsgs.map((m: any) => ({
      ...(m.toObject ? m.toObject() : m),
      id: m.id || m._id?.toString()
    }));
    return res.json({ success: true, data: normalized });
  } catch (err) {
    next(err);
  }
});

// POST create message (Public contact form)
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const newMessage = {
      id: 'msg-' + Date.now(),
      name,
      email,
      message,
      subject: subject || 'Portfolio Inquiry',
      read: false,
      replied: false,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const created = await (Message as any).create(newMessage);
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

    const filter: any = { $or: [{ id }] };
    if (mongoose.isValidObjectId(id)) {
      filter.$or.push({ _id: new mongoose.Types.ObjectId(id) });
    }
    
    const updated = await (Message as any).findOneAndUpdate(filter, { read: Boolean(read) }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Message not found' });

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

    const filter: any = { $or: [{ id }] };
    if (mongoose.isValidObjectId(id)) filter.$or.push({ _id: new mongoose.Types.ObjectId(id) });
    const targetMsg = await (Message as any).findOne(filter);

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
    const updated = await (Message as any).findOneAndUpdate(filter, {
      read: true,
      replied: true,
      replyText: replyText,
      repliedAt: repliedAt
    }, { new: true });

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
    
    const filter: any = { $or: [{ id }] };
    if (mongoose.isValidObjectId(id)) {
      filter.$or.push({ _id: new mongoose.Types.ObjectId(id) });
    }
    
    const deleted = await (Message as any).findOneAndDelete(filter);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    
    return res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
