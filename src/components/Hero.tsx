import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Terminal,
  Code2,
  FolderGit2,
  CheckCircle2,
  Laptop2,
  BookOpen,
  Mail,
  GraduationCap,
  FileText,
  X,
  Download,
  ExternalLink
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(res => {
      if (res.success && res.data) setSettings(res.data);
    }).catch(err => console.error(err));

    fetch('/api/profile').then(r => r.json()).then(data => {
      if (data) setProfile(data);
    }).catch(err => console.error(err));
  }, []);

  const heroBadge = settings?.profile?.heroBadge || profile?.heroBadge || 'Aptech Computer Education • Semester 1 Complete';
  const name = profile?.name || settings?.profile?.name || 'Marium Tabassum';
  const bio = settings?.profile?.bio || profile?.bio || 'Passionate software engineering student and frontend developer building responsive web applications and exploring generative AI solutions.';
  const btnText = settings?.buttonText || 'View Featured Projects';
  const btnLink = settings?.buttonLink || '#projects';
  const secBtnText = settings?.secondaryCtaText || 'View CV';
  const location = profile?.location || settings?.profile?.location || 'Karachi, Pakistan';
  const education = profile?.education || settings?.profile?.education || 'Aptech Computer Education (Semester 1 Complete)';
  const scholarship = profile?.scholarship || settings?.profile?.scholarship || 'Bano Qabil Generative AI Scholar';

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
              <span>{heroBadge}</span>
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
              Hi, I'm <strong className="text-slate-900 dark:text-white font-semibold">{name}</strong> — {bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10">
              <a
                href={btnLink}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-98 flex items-center gap-2 group"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-200" />
                <span>{btnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* View CV Button triggering Modal */}
              <button
                onClick={() => setIsCvModalOpen(true)}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-500" />
                <span>{secBtnText}</span>
              </button>

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
                        {name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {location}
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
                        Aptech Learning Center
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {education}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Generative AI Program
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {scholarship}
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

      {/* CV Popup Modal */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {name} - Curriculum Vitae
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Software Engineering & Frontend Developer CV
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Marium_Tabassum_CV.pdf"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>

                <button
                  onClick={() => setIsCvModalOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / CV Preview */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950/50 space-y-6">

              {/* CV Summary Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{name}</h2>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400 mt-0.5">Software Engineering Student & AI-Focused Web Developer</p>
                  </div>
                  <div className="text-right text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <div>Karachi, Pakistan</div>
                    <div>mariumtabbasum@gmail.com</div>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Professional Summary</h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Dedicated software engineering student completing foundational curriculum at Aptech Computer Education and advancing expertise in Generative AI via Bano Qabil. Proficient in HTML5, CSS3, JavaScript, Bootstrap, React, and responsive frontend design.
                  </p>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Education & Certifications</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">Aptech Computer Education</span>
                      <span className="text-slate-500">Semester 1 Complete (2025 - 2026)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">Bano Qabil Generative AI Scholarship</span>
                      <span className="text-slate-500">2025 - Present</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Key Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Bootstrap 5', 'Python', 'Generative AI Tools'].map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
              <span className="text-xs text-slate-500">Ready for internships & frontend developer roles</span>
              <a
                href="/resume.pdf"
                download="Marium_Tabassum_CV.pdf"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/25 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF CV</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
