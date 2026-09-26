import React, { useState } from 'react';
import { 
  GraduationCap, 
  Target, 
  BookOpen, 
  Check, 
  Award,
  Code2,
  Layers
} from 'lucide-react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'journey' | 'education' | 'philosophy'>('journey');

  return (
    <section 
      id="about" 
      className="scroll-mt-24 py-20 relative bg-white dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Crafting Code with Passion & Purpose
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A look into my academic journey, technical foundations, and goals in Software Engineering and Modern Frontend Web Development.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex gap-1">
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'journey'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              My Journey
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'education'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Education & Aptech
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'philosophy'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vision & Goals
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'journey' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  My software development journey combines disciplined Software Engineering fundamentals with cutting-edge Generative AI exploration. I am currently pursuing a Software Engineering Diploma at <strong className="text-slate-900 dark:text-white font-semibold">Aptech Computer Education</strong>, where I successfully completed Semester 1, mastering HTML5, CSS3, JavaScript ES6+, Bootstrap 5, jQuery, and Python while continuing with upcoming semesters.
                </p>
                <p>
                  In parallel, I am actively expanding my capabilities through the <strong className="text-slate-900 dark:text-white font-semibold">Bano Qabil Generative AI Program</strong>. As part of my learning journey, I am developing practical knowledge of Large Language Models (LLMs), prompt engineering, LLM APIs, and RAG (Retrieval-Augmented Generation) concepts to craft next-generation web applications.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <Check className="w-4 h-4 text-cyan-500" />
                    <span>Clean Code Practice</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <Check className="w-4 h-4 text-cyan-500" />
                    <span>AI-Powered Workflows</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900 dark:to-slate-800 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  Key Milestones
                </h3>
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                    <span>Completed Semester 1 in Software Engineering at Aptech Computer Education and continuing remaining semesters.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                    <span>Mastered responsive web layouts using Flexbox, CSS Grid, Bootstrap 5, JavaScript, and Python logic foundations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                    <span>Developed web applications like Olive Grove Restaurant and Alberto Watch, while learning Generative AI at Bano Qabil.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      Aptech Computer Education
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Software Engineering Diploma (Semester 1 Complete • Continuing)
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Rigorous hands-on curriculum covering programming logic, structured problem solving, responsive web development, Bootstrap 5, JavaScript, jQuery, and Python. Semester 1 successfully completed and continuing upcoming semesters.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">HTML5/CSS3</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">JavaScript ES6</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Bootstrap 5</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">jQuery</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Python</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      Bano Qabil — Generative AI Program
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Generative AI Specialization (In Progress • 5–6 Months)
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Specialized program covering Generative AI fundamentals, Large Language Models (LLMs), Prompt Engineering, LLM APIs, RAG & knowledge retrieval concepts, and AI-enhanced web applications.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Generative AI</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">LLMs</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Prompt Engineering</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">LLM APIs</span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">RAG Concepts</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'philosophy' && (
            <div className="p-7 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                My Core Principles & Engineering Vision
              </h3>
              <p>
                I believe modern software development requires solid fundamentals: developers who understand core algorithms, semantic layout structure, and clean responsive interfaces build better, faster, and more accessible web products.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">1. Usability First</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Interfaces must feel effortless and visually engaging on any screen size.</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">2. Strong Fundamentals</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Solid grasp of semantic markup, CSS architecture, and JS execution.</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">3. Continuous Curiosity</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">Actively building production-ready applications and modern web tools.</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
