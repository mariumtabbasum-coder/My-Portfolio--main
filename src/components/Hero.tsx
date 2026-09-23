import React from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Code2, 
  FolderGit2, 
  CheckCircle2, 
  Laptop2,
  BookOpen,
  Mail,
  GraduationCap
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="scroll-mt-24 pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/15 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/60 text-blue-800 dark:text-cyan-300 text-xs font-semibold mb-6 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Aptech Computer Education • Semester 1 Complete</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              Building Modern <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">
                Web Experiences
              </span>{' '}
              with Clean Code.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Hi, I'm <strong className="text-slate-900 dark:text-white font-semibold">Marium Tabassum</strong> — a Software Engineering student at Aptech (Semester 1 complete). I specialize in responsive frontend development, modern UI architecture, and clean code with HTML5, CSS3, JavaScript ES6+, Bootstrap 5, and Python.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-98 flex items-center gap-2 group"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-200" />
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#journey"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all hover:scale-[1.02]"
              >
                My Journey
              </a>

              <a
                href="#contact"
                className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Trust / Focus Badges */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Semantic HTML5 & CSS3
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                JavaScript ES6+ & Python
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                Bootstrap 5 & Responsive Design
              </span>
            </div>

          </div>

          {/* Right Column: Code & Tech Visual Dashboard Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with Glassmorphism */}
              <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/40">
                
                {/* Header of Developer Card */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 font-bold text-xl">
                      MT
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        Marium Tabassum
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Karachi, Pakistan
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Available
                  </span>
                </div>

                {/* Academic Highlights */}
                <div className="my-5 space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 shrink-0">
                      <Laptop2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Aptech Computer Education
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Semester 1 Complete • Software Engineering
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Bano Qabil Pakistan
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Web Technologies & Modern Coding
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Terminal Preview */}
                <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed border border-slate-800">
                  <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-800/80 text-slate-400 text-[10px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-1 text-slate-400">developer-profile.ts</span>
                  </div>
                  <p><span className="text-cyan-400">const</span> <span className="text-blue-300">focus</span> = [<span className="text-amber-300">"Frontend Engineering"</span>, <span className="text-amber-300">"Responsive UI"</span>];</p>
                  <p><span className="text-cyan-400">const</span> <span className="text-blue-300">status</span> = <span className="text-emerald-300">"Open for developer roles"</span>;</p>
                </div>

              </div>

              {/* Decorative Floating Stat */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">100%</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Responsive Code</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
