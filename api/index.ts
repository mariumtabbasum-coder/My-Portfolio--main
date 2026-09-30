import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

import { connectDB } from '../server/config/db';
import { seedInitialData } from '../server/utils/seedData';
import authRoutes from '../server/routes/authRoutes';
import profileRoutes from '../server/routes/profileRoutes';
import projectRoutes from '../server/routes/projectRoutes';
import skillRoutes from '../server/routes/skillRoutes';
import learningRoutes from '../server/routes/learningRoutes';
import certificateRoutes from '../server/routes/certificateRoutes';
import serviceRoutes from '../server/routes/serviceRoutes';
import messageRoutes from '../server/routes/messageRoutes';
import settingsRoutes from '../server/routes/settingsRoutes';
import uploadRoutes from '../server/routes/uploadRoutes';
import aiRoutes from '../server/routes/aiRoutes';
import testimonialRoutes from '../server/routes/testimonialRoutes';
import articleRoutes from '../server/routes/articleRoutes';
import analyticsRoutes from '../server/routes/analyticsRoutes';
import { errorHandler } from '../server/middleware/errorMiddleware';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

let isInitialized = false;
async function initDB() {
  if (!isInitialized) {
    try {
      await connectDB();
      await seedInitialData();
    } catch (err) {
      console.error('Serverless init DB note:', err);
    }
    isInitialized = true;
  }
}

app.use(async (req, res, next) => {
  await initDB();
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use('/api', errorHandler);

export default app;
