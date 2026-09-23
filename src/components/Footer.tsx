import React from 'react';
import { ArrowUp, Heart, Sparkles, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200/70 dark:border-slate-850 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              MT
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                Marium Tabassum
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Software Engineering & Generative AI Portfolio
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#home" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors">Skills</a>
            <a href="#ai-lab" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">AI Lab</a>
            <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
          </div>

          {/* Back to top */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} Marium Tabassum. Built with React 19, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Aptech Computer Education</span>
            <span>•</span>
            <span>Bano Qabil Scholar</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
