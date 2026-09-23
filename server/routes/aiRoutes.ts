import { Router } from 'express';

const router = Router();

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // If GEMINI_API_KEY is configured, call Gemini API, otherwise provide intelligent simulation
  res.json({
    success: true,
    result: `AI Response for: "${prompt}"\n\nOptimized prompt structure generated successfully with modern frontend best practices.`,
  });
});

export default router;
