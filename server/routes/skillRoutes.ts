import { Router } from 'express';
import mongoose from 'mongoose';
import Skill from '../models/Skill';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (mongoose.connection?.readyState === 1) {
      const dbSkills = await (Skill as any).find().sort({ createdAt: -1 });
      if (dbSkills && dbSkills.length > 0) {
        const normalized = dbSkills.map((s: any) => ({
          ...(s.toObject ? s.toObject() : s),
          id: s.id || s._id?.toString()
        }));
        return res.json({ success: true, data: normalized });
      }
    }
    return res.json({ success: true, data: dataStore.getSkills() });
  } catch (err) {
    return res.json({ success: true, data: dataStore.getSkills() });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const created = dataStore.addSkill(req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        await (Skill as any).create(created);
      } catch (dbErr) {
        console.warn('MongoDB sync note for skill creation');
      }
    }

    return res.json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = dataStore.updateSkill(id, req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Skill as any).findOneAndUpdate(filter, req.body, { new: true });
      } catch (dbErr) {
        console.warn('MongoDB sync note for skill update');
      }
    }

    return res.json({ success: true, data: updated || { ...req.body, id } });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    dataStore.deleteSkill(id);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Skill as any).findOneAndDelete(filter);
      } catch (dbErr) {
        console.warn('MongoDB sync note for skill delete');
      }
    }

    return res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
