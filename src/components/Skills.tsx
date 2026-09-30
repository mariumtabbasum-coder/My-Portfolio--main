import React, { useState, useEffect } from 'react';
import {
  Code2,
  Terminal,
  Layout,
  Layers,
  Workflow,
  CheckCircle2,
  FileCode,
  Globe,
  Settings
} from 'lucide-react';
import { SkillItem } from '../types';

export const Skills: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'programming' | 'tools'>('all');
  const [skillsData, setSkillsData] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/skills')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) {
          setSkillsData(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
        setLoading(false);
      });
  }, []);

  const filteredSkills = filter === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === filter);

  return (
    <section
      id="skills"
      className="scroll-mt-24 py-20 relative bg-slate-50/60 dark:bg-slate-900/40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/60 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & Technical Proficiency
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A comprehensive overview of my frontend engineering toolkit, programming logic, and modern development workflow.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Skills' },
            { id: 'frontend', label: 'Frontend Engineering' },
            { id: 'programming', label: 'Programming & Logic' },
            { id: 'tools', label: 'Tools & Workflow' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === item.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="text-center py-12 text-sm text-slate-400">Loading skills...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {filteredSkills.map((skill: any, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {skill.category === 'frontend' && <Layout className="w-4 h-4" />}
                      {skill.category === 'programming' && <Terminal className="w-4 h-4 text-cyan-500" />}
                      {skill.category === 'tools' && <Settings className="w-4 h-4" />}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {skill.name}
                    </h3>
                  </div>

                  {skill.badge && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {skill.badge}
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Proficiency</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
