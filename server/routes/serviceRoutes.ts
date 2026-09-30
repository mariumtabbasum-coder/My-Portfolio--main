import { Router } from 'express';
import mongoose from 'mongoose';
import Service from '../models/Service';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection?.readyState === 1) {
      const dbServices = await (Service as any).find();
      if (dbServices && dbServices.length > 0) {
        const normalized = dbServices.map((s: any) => ({
          ...(s.toObject ? s.toObject() : s),
          id: s.id || s._id?.toString()
        }));
        return res.json({ success: true, data: normalized });
      }
    }
    return res.json({ success: true, data: dataStore.getServices() });
  } catch (err) {
    return res.json({ success: true, data: dataStore.getServices() });
  }
});

router.post('/', async (req, res) => {
  try {
    const created = dataStore.addService(req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        await (Service as any).create(created);
      } catch (e) {
        console.warn('MongoDB sync note for service');
      }
    }

    return res.json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create service' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = dataStore.updateService(id, req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Service as any).findOneAndUpdate(filter, req.body, { new: true });
      } catch (e) {
        console.warn('MongoDB sync note for service update');
      }
    }

    return res.json({ success: true, data: updated || { ...req.body, id } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update service' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    dataStore.deleteService(id);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Service as any).findOneAndDelete(filter);
      } catch (e) {
        console.warn('MongoDB sync note for service delete');
      }
    }

    return res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
});

export default router;
