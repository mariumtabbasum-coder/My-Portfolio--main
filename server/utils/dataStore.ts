import fs from 'fs';
import path from 'path';

export interface SiteSettings {
  // Hero / Home section
  heroBadge: string;
  headlineLine1: string;
  headlineLine2: string;
  title: string;
  bio: string;
  buttonText: string;
  buttonLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;

  // About section
  aboutHeading: string;
  aboutSubtitle: string;
  aboutBio: string;
  journeyText: string;
  journeyMilestone1: string;
  journeyMilestone2: string;
  journeyMilestone3: string;
  aptechDetails: string;
  scholarshipDetails: string;
  philosophyText: string;

  // Contact Info
  email: string;
  emails: string[];
  phone: string;
  location: string;
  responseTimeText: string;
  availabilityStatus: string;
  contactHeading: string;
  contactSubtitle: string;

  // Social Links
  links: {
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };

  // Profile metadata
  profile: {
    name: string;
    title: string;
    education: string;
    scholarship: string;
    location: string;
    bio: string;
    heroBadge: string;
    responseTimeText: string;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'programming' | 'tools';
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'all' | 'frontend' | 'javascript' | 'responsive';
  tags: string[];
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  highlights: string[];
}

export interface MilestoneItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  skills: string[];
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read?: boolean;
  replied?: boolean;
  replyText?: string;
  repliedAt?: string;
}

export interface StoreData {
  settings: SiteSettings;
  skills: SkillItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  milestones: MilestoneItem[];
  certificates: CertificateItem[];
  messages: MessageItem[];
}

export const defaultData: StoreData = {
  settings: {
    heroBadge: 'Aptech Computer Education • Semester 1 Complete',
    headlineLine1: 'Building Modern',
    headlineLine2: 'Frontend Experiences & Web Solutions',
    title: 'Software Engineering Student & Frontend Developer',
    bio: 'Detail-oriented and motivated Software Engineering student with a strong foundation in front-end web development, semantic HTML5, CSS3, JavaScript, Bootstrap 5, and ongoing Generative AI learning.',
    buttonText: 'View Featured Projects',
    buttonLink: '#projects',
    secondaryCtaText: 'View CV',
    secondaryCtaLink: '/cv.pdf',

    aboutHeading: 'Crafting Code with Passion & Purpose',
    aboutSubtitle: 'A look into my academic journey, technical foundations, and goals in Software Engineering and Modern Frontend Web Development.',
    aboutBio: 'A motivated and detail-oriented Software Engineering student currently in my 1st semester of a 3-year diploma program at Aptech. I have hands-on foundation in HTML, CSS, Bootstrap, basic JavaScript, and jQuery, and am actively expanding my skillset with Python and Generative AI.',
    journeyText: 'Started with foundational web technologies and quickly discovered a deep fascination for clean, modular user interfaces and intuitive interactive web solutions.',
    journeyMilestone1: 'Completed Semester 1 in Software Engineering at Aptech Computer Education and continuing remaining semesters.',
    journeyMilestone2: 'Mastered responsive web layouts using Flexbox, CSS Grid, Bootstrap 5, JavaScript, and Python logic foundations.',
    journeyMilestone3: 'Developed web applications like Olive Grove Restaurant, while learning Generative AI at Bano Qabil.',
    aptechDetails: 'Aptech Computer Education — 3-Year Diploma in Software Engineering (1st Semester Completed, In Progress). Covered so far: Semantic HTML5, CSS3, Responsive Web Design, Bootstrap 5, JavaScript ES6+, and jQuery.',
    scholarshipDetails: 'Bano Qabil Generative AI Course — 5-month course covering Generative AI principles, prompt engineering, and LLM application design.',
    philosophyText: 'Committed to writing accessible, responsive, and performance-conscious frontend code that bridges intuitive design with software engineering rigour.',

    email: 'mariumtabbasum@gmail.com',
    emails: ['mariumtabbasum@gmail.com'],
    phone: '0322-2963909',
    location: 'Karachi, Pakistan',
    responseTimeText: 'Within 24 Hours',
    availabilityStatus: 'Open for Opportunities & Collaborations',
    contactHeading: "Let's Collaborate & Connect",
    contactSubtitle: 'Have a project in mind, an opportunity, or want to discuss web development? Feel free to send a message.',

    links: {
      github: 'https://github.com/mariumtabbasum-coder',
      linkedin: 'https://linkedin.com/in/mariumtabbasum',
      twitter: '',
      facebook: '',
      instagram: '',
    },

    profile: {
      name: 'Marium Tabassum',
      title: 'Software Engineering Student & Frontend Developer',
      education: 'Aptech Computer Education (Semester 1 Complete)',
      scholarship: 'Bano Qabil Generative AI Course',
      location: 'Karachi, Pakistan',
      bio: 'Detail-oriented and motivated Software Engineering student with a strong foundation in front-end web development, semantic HTML5, CSS3, JavaScript, Bootstrap 5, and ongoing Generative AI learning.',
      heroBadge: 'Aptech Computer Education • Semester 1 Complete',
      responseTimeText: 'Typical Response: Within 24 Hours',
    },
  },

  skills: [
    { id: '1', name: 'HTML & CSS', level: 85, category: 'frontend', badge: 'Intermediate' },
    { id: '2', name: 'Bootstrap 5', level: 80, category: 'frontend', badge: 'Intermediate' },
    { id: '3', name: 'JavaScript (Basics)', level: 65, category: 'frontend', badge: 'Elementary' },
    { id: '4', name: 'jQuery (Basics)', level: 60, category: 'frontend', badge: 'Elementary' },
    { id: '5', name: 'Python (Basics to Advanced)', level: 50, category: 'programming', badge: 'Ongoing' },
    { id: '6', name: 'Prompt Engineering', level: 65, category: 'tools', badge: 'Learning' },
    { id: '7', name: 'RAG (Retrieval-Augmented Generation)', level: 55, category: 'tools', badge: 'Learning' },
    { id: '8', name: 'LLM APIs', level: 60, category: 'tools', badge: 'Learning' },
    { id: '9', name: 'Embeddings', level: 50, category: 'tools', badge: 'Learning' },
  ],

  projects: [
    {
      id: 'watch-company-portal',
      title: 'Watch Company & Products Portal',
      description: 'A luxury watch company website featuring an elegant dark and gold visual style, products showcase grid, store locator directory, dedicated customer support section, and fully responsive design across desktop and mobile screens.',
      category: 'frontend',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Responsive Design'],
      techStack: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
      features: [
        'Luxury Dark & Gold Aesthetic',
        'Interactive Products Showcase Grid',
        'Store Locator Directory',
        'Customer Support Section',
        'Fully Mobile-First Responsive Layout'
      ],
      liveUrl: '',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      imageUrl: '',
      featured: true,
    },
    {
      id: 'olive-grove',
      title: 'Olive Grove Restaurant',
      description: 'A professional culinary showcase website with dynamic menu presentation, reservation interface, and high-end visual aesthetics.',
      category: 'frontend',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
      techStack: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
      features: ['Interactive Menu Cards', 'Table Reservation UI', 'Smooth Responsive Navigation'],
      liveUrl: 'https://mariumtabbasum-coder.github.io/Olive-Grove-Restaurant/',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      imageUrl: '',
      featured: true,
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      description: 'A personal portfolio website with smooth transitions, dark mode, responsive layouts, and an integrated management CMS.',
      category: 'frontend',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
      techStack: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript'],
      features: ['Responsive Mobile-First UI', 'Dynamic Project Modals', 'Admin CMS Dashboard', 'Integrated Contact Pipeline'],
      liveUrl: 'https://mariumtabbasum-coder.github.io/My-Portfolio/',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      imageUrl: '/icon.svg',
      featured: false,
    },
    {
      id: 'knowledge-chatbot',
      title: 'Intelligent Knowledge Chatbot Prototype',
      description: 'An AI-powered assistant designed for smart knowledge retrieval and interactive conversation using modern LLM APIs and prompt engineering.',
      category: 'javascript',
      tags: ['Generative AI', 'Python', 'LLM API', 'Prompt Engineering'],
      techStack: ['Python', 'Generative AI', 'LLM API', 'REST'],
      features: ['Natural Language Processing', 'Contextual Recall', 'Structured Prompt Design'],
      liveUrl: '',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      imageUrl: '',
      featured: false,
    },
    {
      id: 'rag-document',
      title: 'RAG Document System Concept',
      description: 'A Retrieval-Augmented Generation implementation for efficient document processing and intelligent text analysis.',
      category: 'javascript',
      tags: ['RAG', 'AI Engineering', 'Vector Search', 'Python'],
      techStack: ['Python', 'Embeddings', 'Information Retrieval'],
      features: ['Document Parsing', 'Semantic Search', 'Synthesized Answer Generation'],
      liveUrl: '',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      imageUrl: '',
      featured: false,
    },
  ],

  services: [
    {
      id: 's1',
      title: 'Responsive Website Development',
      description: 'Crafting clean, accessible, and mobile-friendly websites that work smoothly across smartphones, tablets, and desktop screens using modern semantic HTML5, CSS3, JavaScript, and Bootstrap 5.',
      badge: 'Frontend Core',
      highlights: ['Mobile-first design', 'Semantic HTML5', 'Cross-browser compatibility'],
    },
    {
      id: 's2',
      title: 'Website Layout Redesign & Modernization',
      description: 'Improving outdated website layouts with cleaner structure, responsive design, improved usability, and modern visual presentation.',
      badge: 'UI Enhancement',
      highlights: ['Layout structuring', 'UI/UX cleanup', 'Visual presentation'],
    },
    {
      id: 's3',
      title: 'Generative AI & Prompt Engineering',
      description: 'Practical prompt engineering, structured LLM API integration, and AI-assisted workflows based on ongoing coursework.',
      badge: 'AI Learning',
      highlights: ['Prompt engineering', 'LLM APIs', 'RAG concepts'],
    },
    {
      id: 's4',
      title: 'Custom Landing Pages',
      description: 'Creating focused and responsive landing pages for small businesses, events, and personal projects with clean visual structure and clear calls-to-action.',
      badge: 'Web Layouts',
      highlights: ['Fast loading', 'Clean semantic structure', 'Interactive components'],
    },
  ],

  milestones: [
    {
      id: 'm1',
      period: '2025 - Present',
      title: 'Diploma in Software Engineering',
      organization: 'Aptech Computer Education',
      description: '3-Year Program — 1st Semester Completed. Practical exposure to HTML, CSS, Bootstrap, basic JavaScript, and jQuery.',
      status: 'in-progress',
      highlights: ['HTML5 & CSS3 Mastery', 'Bootstrap 5 Responsive Layouts', 'Basic JavaScript & jQuery Logic'],
    },
    {
      id: 'm2',
      period: '2025 - Present',
      title: 'Generative AI Course',
      organization: 'Bano Qabil',
      description: 'Specialized 5-month course covering Generative AI principles, prompt engineering, and LLM application design.',
      status: 'in-progress',
      highlights: ['Google Gemini API', 'Prompt Design Strategies', 'AI Web Integration'],
    },
    {
      id: 'm3',
      period: '2025',
      title: 'Intermediate (Pre-Engineering/Science)',
      organization: 'Sir Syed Government Girls College',
      description: 'Completed higher secondary education with a strong analytical and scientific curriculum.',
      status: 'completed',
      highlights: ['Mathematics', 'Physics', 'Analytical Problem-Solving'],
    },
  ],

  certificates: [
    {
      id: 'c1',
      title: 'Software Engineering Diploma (1st Semester)',
      issuer: 'Aptech Computer Education',
      date: '2025',
      description: 'Successfully completed the 1st semester curriculum covering foundational programming, web design, and scripting.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
    },
    {
      id: 'c2',
      title: 'Generative AI Course (5 Months)',
      issuer: 'Bano Qabil',
      date: '2025 - Ongoing',
      description: 'Specialized program advancing skills in modern AI tools, prompt architecture, and intelligent application engineering.',
      skills: ['Generative AI', 'Prompt Engineering', 'Python Basics'],
    },
    {
      id: 'c3',
      title: 'Python Programming (Basic to Advanced)',
      issuer: 'Technical Training',
      date: '2025 - Ongoing',
      description: 'Course in Python language fundamentals, data structures, algorithms, and practical programming workflows.',
      skills: ['Python Basics', 'Algorithms', 'Logic Building'],
    },
  ],

  messages: [
    {
      id: 'msg-demo-1',
      name: 'Sarah Khan',
      email: 'sarah@example.com',
      subject: 'Frontend Collaboration Opportunity',
      message: 'Hello Marium! I reviewed your portfolio and was impressed by your Aptech progress and responsive designs. We have an upcoming web project and would love to collaborate.',
      date: '2026-09-28 14:30',
    },
    {
      id: 'msg-demo-2',
      name: 'Tariq Mehmood',
      email: 'tariq@techagency.pk',
      subject: 'Frontend Internship Inquiry',
      message: 'Hi Marium, we have an opening for a Junior Frontend Developer / SE Intern at our Karachi office. Your profile looks like a great match. Please let us know if you are available.',
      date: '2026-09-29 11:15',
    },
  ],
};

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

class DataStore {
  private data: StoreData;

  constructor() {
    this.data = this.loadFromDisk();
  }

  private loadFromDisk(): StoreData {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          ...defaultData,
          ...parsed,
          settings: { ...defaultData.settings, ...(parsed.settings || {}) },
          skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : defaultData.skills,
          projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : defaultData.projects,
          services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : defaultData.services,
          milestones: Array.isArray(parsed.milestones) && parsed.milestones.length > 0 ? parsed.milestones : defaultData.milestones,
          certificates: Array.isArray(parsed.certificates) && parsed.certificates.length > 0 ? parsed.certificates : defaultData.certificates,
          messages: Array.isArray(parsed.messages) ? parsed.messages : defaultData.messages,
        };
      }
    } catch (e) {
      console.error('Error loading data from disk, using defaults:', e);
    }
    this.saveToDisk(defaultData);
    return JSON.parse(JSON.stringify(defaultData));
  }

  public saveToDisk(data: StoreData) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving data to disk:', e);
    }
  }

  public resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(defaultData));
    this.saveToDisk(this.data);
    return this.data;
  }

  // --- Settings ---
  public getSettings(): SiteSettings {
    return this.data.settings;
  }

  public updateSettings(partial: Partial<SiteSettings>): SiteSettings {
    this.data.settings = {
      ...this.data.settings,
      ...partial,
      links: { ...this.data.settings.links, ...(partial.links || {}) },
      profile: {
        ...this.data.settings.profile,
        ...(partial.profile || {}),
        name: partial.profile?.name ?? this.data.settings.profile.name,
        title: partial.title ?? partial.profile?.title ?? this.data.settings.profile.title,
        bio: partial.bio ?? partial.profile?.bio ?? this.data.settings.profile.bio,
        location: partial.location ?? partial.profile?.location ?? this.data.settings.profile.location,
        heroBadge: partial.heroBadge ?? partial.profile?.heroBadge ?? this.data.settings.profile.heroBadge,
      },
    };
    if (partial.email) {
      this.data.settings.emails = [partial.email];
    }
    this.saveToDisk(this.data);
    return this.data.settings;
  }

  // --- Skills ---
  public getSkills(): SkillItem[] {
    return this.data.skills;
  }

  public addSkill(skill: Omit<SkillItem, 'id'> & { id?: string }): SkillItem {
    const newSkill: SkillItem = {
      id: skill.id || 'skill-' + Date.now(),
      name: skill.name,
      level: Number(skill.level) || 75,
      category: skill.category || 'frontend',
      badge: skill.badge || 'Learning',
    };
    this.data.skills.push(newSkill);
    this.saveToDisk(this.data);
    return newSkill;
  }

  public updateSkill(id: string, skill: Partial<SkillItem>): SkillItem | null {
    const idx = this.data.skills.findIndex(s => s.id === id || (s as any)._id === id);
    if (idx === -1) return null;
    this.data.skills[idx] = {
      ...this.data.skills[idx],
      ...skill,
      level: skill.level !== undefined ? Number(skill.level) : this.data.skills[idx].level,
    };
    this.saveToDisk(this.data);
    return this.data.skills[idx];
  }

  public deleteSkill(id: string): boolean {
    const initialLen = this.data.skills.length;
    this.data.skills = this.data.skills.filter(s => s.id !== id && (s as any)._id !== id);
    if (this.data.skills.length !== initialLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }

  // --- Projects ---
  public getProjects(): ProjectItem[] {
    return this.data.projects;
  }

  public addProject(project: Omit<ProjectItem, 'id'> & { id?: string }): ProjectItem {
    const newProj: ProjectItem = {
      id: project.id || 'project-' + Date.now(),
      title: project.title,
      description: project.description,
      category: project.category || 'frontend',
      tags: Array.isArray(project.tags) ? project.tags : [],
      techStack: Array.isArray(project.techStack) ? project.techStack : [],
      features: Array.isArray(project.features) ? project.features : [],
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      imageUrl: project.imageUrl || '',
      featured: Boolean(project.featured),
    };
    this.data.projects.unshift(newProj);
    this.saveToDisk(this.data);
    return newProj;
  }

  public updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
    const idx = this.data.projects.findIndex(p => p.id === id || (p as any)._id === id);
    if (idx === -1) return null;
    this.data.projects[idx] = {
      ...this.data.projects[idx],
      ...updates,
      tags: updates.tags !== undefined ? (Array.isArray(updates.tags) ? updates.tags : []) : this.data.projects[idx].tags,
      techStack: updates.techStack !== undefined ? (Array.isArray(updates.techStack) ? updates.techStack : []) : this.data.projects[idx].techStack,
      features: updates.features !== undefined ? (Array.isArray(updates.features) ? updates.features : []) : this.data.projects[idx].features,
    };
    this.saveToDisk(this.data);
    return this.data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id && (p as any)._id !== id);
    if (this.data.projects.length !== initialLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }

  // --- Services ---
  public getServices(): ServiceItem[] {
    return this.data.services;
  }

  public addService(service: Omit<ServiceItem, 'id'> & { id?: string }): ServiceItem {
    const newService: ServiceItem = {
      id: service.id || 'service-' + Date.now(),
      title: service.title,
      description: service.description,
      badge: service.badge || 'Frontend',
      highlights: Array.isArray(service.highlights) ? service.highlights : [],
    };
    this.data.services.push(newService);
    this.saveToDisk(this.data);
    return newService;
  }

  public updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const idx = this.data.services.findIndex(s => s.id === id || (s as any)._id === id);
    if (idx === -1) return null;
    this.data.services[idx] = {
      ...this.data.services[idx],
      ...updates,
    };
    this.saveToDisk(this.data);
    return this.data.services[idx];
  }

  public deleteService(id: string): boolean {
    const initialLen = this.data.services.length;
    this.data.services = this.data.services.filter(s => s.id !== id && (s as any)._id !== id);
    if (this.data.services.length !== initialLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }

  // --- Milestones / Journey ---
  public getMilestones(): MilestoneItem[] {
    return this.data.milestones;
  }

  public addMilestone(milestone: Omit<MilestoneItem, 'id'> & { id?: string }): MilestoneItem {
    const newM: MilestoneItem = {
      id: milestone.id || 'milestone-' + Date.now(),
      period: milestone.period || '2025 - Present',
      title: milestone.title,
      organization: milestone.organization,
      description: milestone.description,
      status: milestone.status || 'completed',
      highlights: Array.isArray(milestone.highlights) ? milestone.highlights : [],
    };
    this.data.milestones.push(newM);
    this.saveToDisk(this.data);
    return newM;
  }

  public updateMilestone(id: string, updates: Partial<MilestoneItem>): MilestoneItem | null {
    const idx = this.data.milestones.findIndex(m => m.id === id || (m as any)._id === id);
    if (idx === -1) return null;
    this.data.milestones[idx] = {
      ...this.data.milestones[idx],
      ...updates,
    };
    this.saveToDisk(this.data);
    return this.data.milestones[idx];
  }

  public deleteMilestone(id: string): boolean {
    const initialLen = this.data.milestones.length;
    this.data.milestones = this.data.milestones.filter(m => m.id !== id && (m as any)._id !== id);
    if (this.data.milestones.length !== initialLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }

  // --- Certificates ---
  public getCertificates(): CertificateItem[] {
    return this.data.certificates;
  }

  public addCertificate(cert: Omit<CertificateItem, 'id'> & { id?: string }): CertificateItem {
    const newC: CertificateItem = {
      id: cert.id || 'cert-' + Date.now(),
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date || '2025',
      credentialId: cert.credentialId || '',
      description: cert.description || '',
      skills: Array.isArray(cert.skills) ? cert.skills : [],
    };
    this.data.certificates.push(newC);
    this.saveToDisk(this.data);
    return newC;
  }

  public updateCertificate(id: string, updates: Partial<CertificateItem>): CertificateItem | null {
    const idx = this.data.certificates.findIndex(c => c.id === id || (c as any)._id === id);
    if (idx === -1) return null;
    this.data.certificates[idx] = {
      ...this.data.certificates[idx],
      ...updates,
    };
    this.saveToDisk(this.data);
    return this.data.certificates[idx];
  }

  public deleteCertificate(id: string): boolean {
    const initialLen = this.data.certificates.length;
    this.data.certificates = this.data.certificates.filter(c => c.id !== id && (c as any)._id !== id);
    if (this.data.certificates.length !== initialLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }

  // --- Messages ---
  public getMessages(): MessageItem[] {
    return this.data.messages;
  }

  public addMessage(msg: { name: string; email: string; subject?: string; message: string }): MessageItem {
    const newMsg: MessageItem = {
      id: 'msg-' + Date.now(),
      name: msg.name,
      email: msg.email,
      subject: msg.subject || 'Direct Inquiry',
      message: msg.message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      replied: false,
    };
    this.data.messages.unshift(newMsg);
    this.saveToDisk(this.data);
    return newMsg;
  }

  public updateMessage(id: string, updates: Partial<MessageItem>): MessageItem | null {
    const idx = this.data.messages.findIndex(m => m.id === id || (m as any)._id === id);
    if (idx === -1) return null;
    this.data.messages[idx] = {
      ...this.data.messages[idx],
      ...updates,
    };
    this.saveToDisk(this.data);
    return this.data.messages[idx];
  }

  public deleteMessage(id: string): boolean {
    const initialLen = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id && (m as any)._id !== id);
    if (this.data.messages.length !== initialLen) {
      this.saveToDisk(this.data);
      return true;
    }
    return false;
  }
}

export const dataStore = new DataStore();
