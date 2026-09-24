import React from 'react';
import { Milestone, Sparkles, CheckCircle2, Clock, Compass } from 'lucide-react';
import { TimelineMilestone } from '../types';

export const LearningJourney: React.FC = () => {
  const milestones: TimelineMilestone[] = [
    {
      period: 'Semester 1 • 2025 - 2026',
      title: 'Software Engineering Core Foundation',
      organization: 'Aptech Computer Education',
      description: 'Mastered programming fundamentals, structured algorithms, modern responsive frontend web architecture with HTML5, CSS3, JavaScript ES6+, Bootstrap 5, and jQuery.',
      highlights: [
        'Built full responsive websites & web layouts',
        'Demonstrated strong problem-solving in semester exams',
        'Engineered clean DOM manipulation and event-driven interfaces'
      ],
      status: 'completed'
    },
    {
      period: '2025 - Present',
      title: 'Generative AI Scholarship & Engineering',
      organization: 'Bano Qabil',
      description: 'Awarded scholarship to explore the frontier of AI application development, prompt engineering methodologies, and Google Gemini API integration.',
      highlights: [
        'Mastered Zero-shot, Few-shot, and Chain-of-Thought prompting',
        'Implemented Gemini API client endpoints for interactive assistants',
        'Explored Python programming for AI script automation'
      ],
      status: 'in-progress'
    },
    {
      period: '2026 & Beyond',
      title: 'Advanced Full-Stack Engineering & AI Agents',
      organization: 'Future Milestone',
      description: 'Expanding into full-stack development, server-side APIs, database modeling with MongoDB, and autonomous generative agentic workflows.',
      highlights: [
        'Full-stack REST API development with Express & Node.js',
        'Advanced state management in React 19',
        'AI agent workflows and real-time streaming'
      ],
      status: 'upcoming'
    }
  ];

  return (
    <section 
      id="journey" 
      className="scroll-mt-24 py-20 relative bg-slate-50/60 dark:bg-slate-900/40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Roadmap & Milestones</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Learning & Academic Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A chronological timeline of how I am progressing as a software engineer and AI practitioner.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {milestones.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
              
              {/* Timeline Indicator Pin */}
              <div className="relative z-10 w-10 sm:w-16 h-10 sm:h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-xs group-hover:border-cyan-500 transition-colors">
                {item.status === 'completed' && (
                  <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-500" />
                )}
                {item.status === 'in-progress' && (
                  <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-500 animate-pulse" />
                )}
                {item.status === 'upcoming' && (
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-slate-400" />
                )}
              </div>

              {/* Timeline Card Content */}
              <div className="flex-1 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    {item.period}
                  </span>
                  
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    item.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : item.status === 'in-progress'
                        ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'Active Now' : 'Planned'}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                  {item.organization}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
