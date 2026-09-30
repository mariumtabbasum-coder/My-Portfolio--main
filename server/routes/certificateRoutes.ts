import { Router } from 'express';
import mongoose from 'mongoose';
import Certificate from '../models/Certificate';
import { dataStore } from '../utils/dataStore';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (mongoose.connection?.readyState === 1) {
      const dbCerts = await (Certificate as any).find().sort({ createdAt: -1 });
      if (dbCerts && dbCerts.length > 0) {
        const normalized = dbCerts.map((c: any) => ({
          ...(c.toObject ? c.toObject() : c),
          id: c.id || c._id?.toString()
        }));
        return res.json({ success: true, data: normalized });
      }
    }
    return res.json({ success: true, data: dataStore.getCertificates() });
  } catch (err) {
    return res.json({ success: true, data: dataStore.getCertificates() });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const created = dataStore.addCertificate(req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        await (Certificate as any).create(created);
      } catch (dbErr) {
        console.warn('MongoDB sync note for certificate creation');
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
    const updated = dataStore.updateCertificate(id, req.body);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Certificate as any).findOneAndUpdate(filter, req.body, { new: true });
      } catch (dbErr) {
        console.warn('MongoDB sync note for certificate update');
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
    dataStore.deleteCertificate(id);

    if (mongoose.connection?.readyState === 1) {
      try {
        const filter = {
          $or: [
            { id },
            ...(mongoose.isValidObjectId(id) ? [{ _id: new mongoose.Types.ObjectId(id) }] : [{ _id: id }])
          ]
        };
        await (Certificate as any).findOneAndDelete(filter);
      } catch (dbErr) {
        console.warn('MongoDB sync note for certificate delete');
      }
    }

    return res.json({ success: true, message: 'Certificate deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
