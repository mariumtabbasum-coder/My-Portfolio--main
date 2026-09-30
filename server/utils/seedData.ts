import mongoose from 'mongoose';
import Settings from '../models/Settings';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Certificate from '../models/Certificate';

export async function seedInitialData() {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('🌱 MongoDB not connected; skipping automatic seeding.');
      return;
    }

    console.log('🌱 Running automatic database seeding check...');

    // 1. Settings Seeding
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({
        emails: ['mariumtabbasum@gmail.com'],
        phone: '+92 300 1234567',
        buttonText: 'View Projects',
        buttonLink: '#projects',
        secondaryCtaText: 'Download CV',
        secondaryCtaLink: '/resume.pdf',
        contactBtnText: 'Send Message',
        links: {
          github: 'https://github.com/mariumtabbasum-coder',
          linkedin: 'https://linkedin.com/in/mariumtabbasum',
          twitter: 'https://twitter.com/marium',
          facebook: '',
          instagram: ''
        },
        profile: {
          name: 'Marium Tabassum',
          title: 'Software Engineering Student & AI-Focused Web Developer',
          education: 'Aptech Computer Education (Semester 1 Complete)',
          scholarship: 'Bano Qabil Generative AI Scholar',
          location: 'Karachi, Pakistan',
          bio: 'Passionate software engineering student and frontend developer building responsive web applications and exploring generative AI solutions.',
          heroBadge: 'Aptech Computer Education • Semester 1 Complete',
          responseTimeText: 'Typical Response: Within 24 Hours'
        }
      });
      console.log('✅ Seeded default Website Settings.');
    }

    // 2. Projects Seeding
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          id: 'portfolio-website',
          title: 'Portfolio Website',
          description: 'A modern personal portfolio website built with React, TypeScript, and Tailwind CSS, featuring smooth transitions and dark mode.',
          tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
          category: 'frontend',
          liveUrl: 'https://mariumtabbasum-coder.github.io/My-Portfolio/',
          githubUrl: 'https://github.com/mariumtabbasum-coder',
          features: ['Responsive Design', 'Modern UI Components', 'Interactive Navigation'],
          techStack: ['React', 'Tailwind CSS', 'TypeScript'],
          featured: true
        },
        {
          id: 'olive-grove',
          title: 'Olive Grove Restaurant',
          description: 'A professional restaurant website with dynamic menu showcase, reservation features, and high-end culinary visual design.',
          tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
          category: 'frontend',
          liveUrl: 'https://mariumtabbasum-coder.github.io/Olive-Grove-Restaurant/',
          githubUrl: 'https://github.com/mariumtabbasum-coder',
          features: ['Interactive Menu', 'Table Booking UI', 'Visual Brand Story'],
          techStack: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
          featured: false
        },
        {
          id: 'knowledge-chatbot',
          title: 'Intelligent Knowledge Chatbot',
          description: 'An AI-powered assistant designed for smart knowledge retrieval and interactive conversation using modern LLM APIs.',
          tags: ['Generative AI', 'Python', 'LLM API', 'Prompt Engineering'],
          category: 'javascript',
          liveUrl: '#',
          githubUrl: 'https://github.com/mariumtabbasum-coder',
          features: ['Natural Language Processing', 'Dynamic Responses', 'Smart Knowledge Access'],
          techStack: ['Python', 'Generative AI', 'API Integration'],
          featured: false
        },
        {
          id: 'rag-document',
          title: 'RAG Document System',
          description: 'A Retrieval-Augmented Generation implementation for efficient document processing and intelligent text analysis.',
          tags: ['RAG', 'AI Engineering', 'Vector Search', 'Python'],
          category: 'javascript',
          liveUrl: '#',
          githubUrl: 'https://github.com/mariumtabbasum-coder',
          features: ['Document Embedding', 'Efficient Text Retrieval', 'AI Contextual Analysis'],
          techStack: ['Python', 'AI Tools', 'Data Processing'],
          featured: false
        }
      ]);
      console.log('✅ Seeded default Projects.');
    }

    // 3. Skills Seeding
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        { id: '1', name: 'HTML', level: 85, category: 'frontend', badge: 'Intermediate' },
        { id: '2', name: 'CSS', level: 85, category: 'frontend', badge: 'Intermediate' },
        { id: '3', name: 'JavaScript', level: 60, category: 'frontend', badge: 'Elementary' },
        { id: '4', name: 'Bootstrap', level: 80, category: 'frontend', badge: 'Intermediate' },
        { id: '5', name: 'jQuery', level: 60, category: 'frontend', badge: 'Elementary' },
        { id: '6', name: 'Python', level: 40, category: 'programming', badge: 'Beginner' },
        { id: '7', name: 'Generative AI', level: 50, category: 'tools', badge: 'Currently Learning' }
      ]);
      console.log('✅ Seeded default Skills.');
    }

    // 4. Certificates Seeding
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      await Certificate.insertMany([
        {
          id: '1',
          title: 'Semester 1 Software Engineering',
          issuer: 'Aptech Computer Education',
          date: '2025',
          description: 'Completed foundational software engineering curriculum covering core programming concepts, HTML, CSS, and JavaScript.',
          skills: ['HTML', 'CSS', 'JavaScript', 'Programming Fundamentals']
        },
        {
          id: '2',
          title: 'Generative AI Scholar',
          issuer: 'Bano Qabil',
          date: '2025',
          description: 'Scholarship recipient and trainee in cutting-edge Generative AI and prompt engineering technologies.',
          skills: ['Generative AI', 'Prompt Engineering', 'AI Tools']
        }
      ]);
      console.log('✅ Seeded default Certificates.');
    }

    console.log('✨ Database seeding complete.');
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}
