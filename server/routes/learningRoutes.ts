import { Router } from 'express';
import Milestone from '../models/Milestone';

const router = Router();

let memoryMilestones = [
  { id: 'm1', period: '2025 - 2026', title: 'Aptech Software Engineering', organization: 'Aptech Learning', description: 'Comprehensive professional software engineering curriculum covering modern frontend and backend development.', status: 'completed', highlights: ['Advanced JavaScript', 'React & TypeScript', 'Database Design'] },
  { id: 'm2', period: '2025 - Present', title: 'Bano Qabil Generative AI Scholarship', organization: 'Bano Qabil & Alkhidmat', description: 'Specialized scholarship program focusing on Generative AI, LLMs, prompt engineering, and modern AI agent architectures.', status: 'in-progress', highlights: ['Gemini API', 'Prompt Engineering', 'AI Integrations'] },
  { id: 'm3', period: '2026 - Future', title: 'Full-Stack & Cloud Specialization', organization: 'Advanced Certification', description: 'Expanding expertise into cloud deployment, microservices, and advanced AI application systems.', status: 'upcoming', highlights: ['Cloud Architecture', 'DevOps Basics', 'AI Workflows'] }
];

router.get('/', async (req, res) => {
  try {
    const milestones = await Milestone.find();
    if (milestones && milestones.length > 0) {
      return res.json({ success: true, data: milestones });
    }
    res.json({ success: true, data: memoryMilestones });
  } catch (err) {
    res.json({ success: true, data: memoryMilestones });
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = {
      id: req.body.id || 'milestone-' + Date.now(),
      period: req.body.period,
      title: req.body.title,
      organization: req.body.organization || 'Self',
      description: req.body.description,
      status: req.body.status || 'completed',
      highlights: req.body.highlights || []
    };

    const created = await Milestone.create(newItem);
    memoryMilestones.push(newItem);
    res.json({ success: true, data: created });
  } catch (err: any) {
    const newItem = {
      id: req.body.id || 'milestone-' + Date.now(),
      period: req.body.period,
      title: req.body.title,
      organization: req.body.organization || 'Self',
      description: req.body.description,
      status: req.body.status || 'completed',
      highlights: req.body.highlights || []
    };
    memoryMilestones.push(newItem);
    res.json({ success: true, data: newItem });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Milestone.findOneAndDelete({ id });
    memoryMilestones = memoryMilestones.filter(m => m.id !== id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err: any) {
    const { id } = req.params;
    memoryMilestones = memoryMilestones.filter(m => m.id !== id);
    res.json({ success: true, message: 'Deleted from memory' });
  }
});

export default router;
