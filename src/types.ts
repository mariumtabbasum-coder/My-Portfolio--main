export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: 'all' | 'frontend' | 'ai' | 'javascript';
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  techStack: string[];
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'programming' | 'ai' | 'tools';
  badge?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  skills: string[];
}

export interface TimelineMilestone {
  period: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}
