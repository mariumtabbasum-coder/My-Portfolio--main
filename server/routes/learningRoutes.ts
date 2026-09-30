import { Router } from 'express';
import mongoose from 'mongoose';
import Milestone from '../models/Milestone';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection?.readyState === 1) {
      const dbMilestones = await (Milestone as any).find();
      if (dbMilestones && dbMilestones.length > 0) {
        const normalized = dbMilestones.map((m: any) => ({
          ...(m.toObject ? m.toObject() : m),
          id: m.id || m._id?.toString()
        }));
        return res.json({ success: true, data: normalized });
      }
    }
    return res.json({ success: true, data: dataStore.getMilestones() });
  } catch (err) {
    return res.json({ success: true, data: dataStore.getMilestones() });
  }
});

router.post('/', async (req, res) => {
  try {
    const created = dataStore.addMilestone(req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        await (Milestone as any).create(created);
      } catch (e) {
        console.warn('MongoDB sync note for milestone');
      }
    }

    return res.json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create milestone' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = dataStore.updateMilestone(id, req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Milestone as any).findOneAndUpdate(filter, req.body, { new: true });
      } catch (e) {
        console.warn('MongoDB sync note for milestone update');
      }
    }

    return res.json({ success: true, data: updated || { ...req.body, id } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update milestone' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    dataStore.deleteMilestone(id);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Milestone as any).findOneAndDelete(filter);
      } catch (e) {
        console.warn('MongoDB sync note for milestone delete');
      }
    }

    return res.json({ success: true, message: 'Milestone deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete milestone' });
  }
});

export default router;
