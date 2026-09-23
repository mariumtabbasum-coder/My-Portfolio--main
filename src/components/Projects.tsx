import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  CheckCircle2,
  Code2
} from 'lucide-react';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'javascript' | 'responsive'>('all');

  const projectsData: Project[] = [
    {
      id: 'alberto-watch',
      title: 'Alberto Watch Luxury E-Commerce',
      description: 'A high-end luxury watch showcase with interactive timepiece view, elegant product catalog, smooth scroll transitions, and brand story.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Responsive Design'],
      category: 'frontend',
      liveUrl: 'https://mariumtabbasum-coder.github.io/Alberto-Watch/',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      features: [
        'Interactive product carousel',
        'Luxury dark/gold aesthetic',
        'Cross-device responsive layout'
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      featured: true
    },
    {
      id: 'daily-design',
      title: 'Daily Design Agency Platform',
      description: 'Digital agency web application featuring creative service offerings, dynamic client portfolio, and interactive contact workflows.',
      tags: ['JavaScript ES6+', 'Modern UI/UX', 'CSS Flexbox/Grid', 'Client Portal'],
      category: 'frontend',
      liveUrl: 'https://daily-design-jade.vercel.app/',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      features: [
        'Filterable agency portfolio',
        'Service inquiry system',
        'Modern micro-interactions'
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Vercel'],
      featured: true
    },
    {
      id: 'cafe-midnight',
      title: 'Cafe Midnight Culinary Portal',
      description: 'A modern coffeehouse and restaurant website with dynamic menu filtering, reservation booking interface, and customer review highlights.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap 5'],
      category: 'javascript',
      liveUrl: '#',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      features: [
        'Live menu filter by category',
        'Table reservation modal form',
        'Optimized mobile navigation'
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'jQuery']
    },
    {
      id: 'academic-dashboard',
      title: 'Aptech Student Progress Dashboard',
      description: 'A student portal interface built during Aptech Semester 1 to track coursework, coding exercises, and software engineering milestones.',
      tags: ['Software Engineering', 'HTML5', 'CSS3', 'Bootstrap 5'],
      category: 'frontend',
      liveUrl: '#',
      githubUrl: 'https://github.com/mariumtabbasum-coder',
      features: [
        'Module progress tracking',
        'Grade & attendance visualization',
        'Aptech curriculum alignment'
      ],
      techStack: ['HTML5', 'Bootstrap 5', 'CSS3', 'JavaScript']
    }
  ];

  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      className="scroll-mt-24 py-20 relative bg-slate-50/60 dark:bg-slate-900/40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Projects & Web Solutions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A selection of live web projects demonstrating frontend design, clean code, and practical software engineering.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'frontend', label: 'Frontend & UI/UX' },
            { id: 'javascript', label: 'JavaScript Apps' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 max-w-5xl mx-auto">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
            >
              {/* Card Header Banner */}
              <div className="p-6 pb-4 bg-gradient-to-br from-slate-100/80 via-white to-slate-50 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {project.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Highlights:</div>
                  {project.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a
                    href={project.liveUrl}
                    target={project.liveUrl?.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
