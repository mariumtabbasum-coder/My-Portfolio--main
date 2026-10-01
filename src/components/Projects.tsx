import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  CheckCircle2,
  Code2,
  Info,
  X,
  Eye
} from 'lucide-react';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'javascript' | 'responsive'>('all');
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) {
          setProjectsData(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

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
            { id: 'responsive', label: 'Responsive Sites' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-2xs flex flex-col animate-pulse"
              >
                {/* Skeleton Image Banner */}
                <div className="w-full h-48 bg-slate-200 dark:bg-slate-800/80 relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-700/60" />
                </div>

                {/* Skeleton Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="space-y-1.5 pt-1">
                      <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-800/60 rounded" />
                      <div className="h-3.5 w-5/6 bg-slate-100 dark:bg-slate-800/60 rounded" />
                    </div>
                  </div>

                  {/* Skeleton Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800/80 rounded-md" />
                    <div className="h-5 w-20 bg-slate-100 dark:bg-slate-800/80 rounded-md" />
                    <div className="h-5 w-14 bg-slate-100 dark:bg-slate-800/80 rounded-md" />
                  </div>

                  {/* Skeleton Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-slate-200 dark:bg-slate-800" />
                      <div className="h-6 w-6 rounded-lg bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-sm text-slate-500">No projects found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
              >
                {/* Project Image Banner */}
                {project.imageUrl ? (
                  <div className="w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {project.featured && (
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-44 bg-gradient-to-br from-blue-900/30 via-slate-900 to-cyan-950/40 p-6 flex flex-col justify-between border-b border-slate-100 dark:border-slate-800 relative">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center font-bold">
                        <Code2 className="w-5 h-5" />
                      </div>
                      {project.featured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                      {project.category || 'Frontend Project'}
                    </span>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== '' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400"
                          title="Live Preview"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {project.githubUrl && project.githubUrl !== '#' && project.githubUrl.trim() !== '' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {selectedProject.imageUrl && (
                <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Full Project Description
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.features && selectedProject.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Key Features & Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Technologies & Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-3">
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && selectedProject.liveUrl.trim() !== '' ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Website</span>
                  </a>
                ) : (
                  <a
                    href={selectedProject.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Website</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;
