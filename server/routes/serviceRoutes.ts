import { Router } from 'express';
import Service from '../models/Service';

const router = Router();

// In-memory fallback if DB not connected
let memoryServices = [
  { id: 's1', title: 'Responsive Frontend Development', description: 'Semantic HTML5, CSS3, JavaScript, React, and Tailwind CSS for lightning-fast modern UIs.', badge: 'Frontend', highlights: ['Mobile-First', 'Accessible', 'Optimized'] },
  { id: 's2', title: 'Generative AI & LLM Integration', description: 'Integrating Gemini API, prompt engineering, and intelligent chatbot features into web applications.', badge: 'AI Specialist', highlights: ['Gemini API', 'Prompt Design', 'Smart Agents'] },
  { id: 's3', title: 'Interactive React Apps', description: 'Building dynamic Single Page Applications with reusable components, state management, and smooth routing.', badge: 'React', highlights: ['TypeScript', 'Hooks', 'REST APIs'] }
];

router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    if (services && services.length > 0) {
      return res.json({ success: true, data: services });
    }
    res.json({ success: true, data: memoryServices });
  } catch (err) {
    res.json({ success: true, data: memoryServices });
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = {
      id: req.body.id || 'service-' + Date.now(),
      title: req.body.title,
      description: req.body.description,
      badge: req.body.badge || 'Frontend',
      highlights: req.body.highlights || []
    };

    const created = await Service.create(newItem);
    memoryServices.push(newItem);
    res.json({ success: true, data: created });
  } catch (err: any) {
    const newItem = {
      id: req.body.id || 'service-' + Date.now(),
      title: req.body.title,
      description: req.body.description,
      badge: req.body.badge || 'Frontend',
      highlights: req.body.highlights || []
    };
    memoryServices.push(newItem);
    res.json({ success: true, data: newItem });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findOneAndDelete({ id });
    memoryServices = memoryServices.filter(s => s.id !== id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err: any) {
    const { id } = req.params;
    memoryServices = memoryServices.filter(s => s.id !== id);
    res.json({ success: true, message: 'Deleted from memory' });
  }
});

export default router;
