import { Router } from 'express';
import Project from '../models/Project';

const router = Router();

let inMemoryProjects = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'A modern personal portfolio website built with React, TypeScript, and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'frontend',
    liveUrl: 'https://mariumtabbasum-coder.github.io/My-Portfolio/',
    githubUrl: 'https://github.com/mariumtabbasum-coder',
    features: ['Responsive Design', 'Modern UI Components', 'Interactive Navigation'],
    featured: true
  },
  {
    id: 'olive-grove',
    title: 'Olive Grove Restaurant',
    description: 'A professional restaurant website with dynamic menu showcase and reservation features.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    category: 'frontend',
    liveUrl: 'https://mariumtabbasum-coder.github.io/Olive-Grove-Restaurant/',
    githubUrl: 'https://github.com/mariumtabbasum-coder',
    features: ['Interactive Menu', 'Table Booking UI', 'Visual Brand Story'],
    featured: false
  },
  {
    id: 'knowledge-chatbot',
    title: 'Intelligent Knowledge Chatbot',
    description: 'An AI-powered assistant designed for smart knowledge retrieval.',
    tags: ['Generative AI', 'Python', 'LLM API', 'Prompt Engineering'],
    category: 'javascript',
    liveUrl: '#',
    githubUrl: 'https://github.com/mariumtabbasum-coder',
    features: ['Natural Language Processing', 'Dynamic Responses', 'Smart Knowledge Access'],
    featured: false
  },
  {
    id: 'rag-document',
    title: 'RAG Document System',
    description: 'A Retrieval-Augmented Generation implementation for efficient document processing.',
    tags: ['RAG', 'AI Engineering', 'Vector Search', 'Python'],
    category: 'javascript',
    liveUrl: '#',
    githubUrl: 'https://github.com/mariumtabbasum-coder',
    features: ['Document Embedding', 'Efficient Text Retrieval', 'AI Contextual Analysis'],
    featured: false
  }
];

router.get('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const items = await Project.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: items });
    } else {
      return res.json({ success: true, data: inMemoryProjects });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const mongoose = await import('mongoose');
    const newId = Date.now().toString();
    const payload = { id: newId, ...req.body };
    if (mongoose.connection.readyState === 1) {
      const created = await Project.create(payload);
      return res.json({ success: true, data: created });
    } else {
      inMemoryProjects.push(payload);
      return res.json({ success: true, data: payload });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      const updated = await Project.findOneAndUpdate({ id }, req.body, { new: true });
      return res.json({ success: true, data: updated });
    } else {
      inMemoryProjects = inMemoryProjects.map(p => p.id === id ? { ...p, ...req.body } : p);
      return res.json({ success: true, data: inMemoryProjects.find(p => p.id === id) });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const mongoose = await import('mongoose');
    if (mongoose.connection.readyState === 1) {
      await Project.findOneAndDelete({ id });
      return res.json({ success: true, message: 'Project deleted' });
    } else {
      inMemoryProjects = inMemoryProjects.filter(p => p.id !== id);
      return res.json({ success: true, message: 'Project deleted' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
