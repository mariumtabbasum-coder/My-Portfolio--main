import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { connectDB } from './server/config/db';
import { seedInitialData } from './server/utils/seedData';
import authRoutes from './server/routes/authRoutes';
import profileRoutes from './server/routes/profileRoutes';
import projectRoutes from './server/routes/projectRoutes';
import skillRoutes from './server/routes/skillRoutes';
import aiLabRoutes from './server/routes/aiLabRoutes';
import learningRoutes from './server/routes/learningRoutes';
import certificateRoutes from './server/routes/certificateRoutes';
import serviceRoutes from './server/routes/serviceRoutes';
import messageRoutes from './server/routes/messageRoutes';
import settingsRoutes from './server/routes/settingsRoutes';
import uploadRoutes from './server/routes/uploadRoutes';
import aiRoutes from './server/routes/aiRoutes';
import testimonialRoutes from './server/routes/testimonialRoutes';
import articleRoutes from './server/routes/articleRoutes';
import analyticsRoutes from './server/routes/analyticsRoutes';
import { errorHandler } from './server/middleware/errorMiddleware';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database Connection and Seed Data
  await connectDB();
  await seedInitialData();

  // Core Middleware
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Static uploads folder
  const uploadsDir = path.join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/skills', skillRoutes);
  app.use('/api/ai-lab', aiLabRoutes);
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

  // Error Handler Middleware for API
  app.use('/api', errorHandler);

  // Vite middleware for development / Static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
