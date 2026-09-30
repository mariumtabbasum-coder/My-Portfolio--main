import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}-${cleanName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Multipart form upload
router.post('/', upload.single('image') as any, (req: any, res: any) => {
  if (req.file) {
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.json({ success: true, url: fileUrl });
  }

  // Support base64 upload in body if sent via JSON
  if (req.body?.image && typeof req.body.image === 'string' && req.body.image.startsWith('data:image')) {
    try {
      const matches = req.body.image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1].split('/')[1] || 'png';
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `${Date.now()}-upload.${ext}`;
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, buffer);
        return res.json({ success: true, url: `/uploads/${filename}` });
      }
    } catch (err) {
      console.error('Error writing base64 image:', err);
    }
    // Fallback: return data url as-is
    return res.json({ success: true, url: req.body.image });
  }

  res.status(400).json({ success: false, message: 'No image file provided' });
});

export default router;
