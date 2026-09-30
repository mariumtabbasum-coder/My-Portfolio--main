import { Router } from 'express';
import mongoose from 'mongoose';
import Settings from '../models/Settings';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (mongoose.connection?.readyState === 1) {
      const dbSettings = await (Settings as any).findOne();
      if (dbSettings) {
        return res.json({ success: true, data: { ...dataStore.getSettings(), ...dbSettings.toObject() } });
      }
    }
    return res.json({ success: true, data: dataStore.getSettings() });
  } catch (err) {
    return res.json({ success: true, data: dataStore.getSettings() });
  }
});

router.put('/', async (req, res, next) => {
  try {
    const updated = dataStore.updateSettings(req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        await (Settings as any).findOneAndUpdate(
          {},
          { $set: req.body },
          { new: true, upsert: true }
        );
      } catch (dbErr) {
        console.warn('MongoDB sync failed for settings, persisted to local store');
      }
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
