import { Router } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (mongoose.connection?.readyState === 1) {
      const dbProjects = await (Project as any).find().sort({ createdAt: -1 });
      if (dbProjects && dbProjects.length > 0) {
        const normalized = dbProjects.map((p: any) => ({
          ...(p.toObject ? p.toObject() : p),
          id: p.id || p._id?.toString()
        }));
        return res.json({ success: true, data: normalized });
      }
    }
    return res.json({ success: true, data: dataStore.getProjects() });
  } catch (err) {
    return res.json({ success: true, data: dataStore.getProjects() });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const created = dataStore.addProject(req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        await (Project as any).create(created);
      } catch (dbErr) {
        console.warn('MongoDB sync note for project creation');
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
    const updated = dataStore.updateProject(id, req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter: any = { $or: [{ id }] };
        if (mongoose.isValidObjectId(id)) {
          filter.$or.push({ _id: new mongoose.Types.ObjectId(id) });
        }
        await (Project as any).findOneAndUpdate(filter, req.body, { new: true });
      } catch (dbErr) {
        console.error('MongoDB sync note for project update:', dbErr);
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
    dataStore.deleteProject(id);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter: any = { $or: [{ id }] };
        if (mongoose.isValidObjectId(id)) {
          filter.$or.push({ _id: new mongoose.Types.ObjectId(id) });
        }
        await (Project as any).findOneAndDelete(filter);
      } catch (dbErr) {
        console.error('MongoDB sync note for project delete:', dbErr);
      }
    }

    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
