import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err?.name === 'MongooseError' || err?.name === 'MongoNetworkError' || (err?.message && err.message.includes('buffering timed out'))) {
    console.log('ℹ️ Database offline — returning mock fallback');
    if (req.method === 'GET') {
      return res.json({ success: true, data: req.path.endsWith('s') || req.path.endsWith('s/') ? [] : {} });
    }
    return res.status(503).json({ error: 'Service temporarily unavailable (database offline)' });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err?.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err?.stack,
  });
}

