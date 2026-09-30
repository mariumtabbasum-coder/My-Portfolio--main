import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Code2,
  FolderGit2,
  CheckCircle2,
  BookOpen,
  Mail,
  GraduationCap,
  FileText,
  X,
  Download,
  Award,
  Sparkles,
  Phone,
  MapPin,
  Calendar,
  User,
  Info
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [cvViewTab, setCvViewTab] = useState<'structured' | 'pdf'>('structured');

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) setSettings(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const heroBadge = settings?.heroBadge || settings?.profile?.heroBadge || 'Aptech Computer Education • Semester 1 Complete';
  const headlineLine1 = settings?.headlineLine1 || 'Building Modern';
  const headlineLine2 = settings?.headlineLine2 || 'Frontend Experiences & Web Solutions';
  const name = settings?.profile?.name || 'Marium Tabassum';
  const title = settings?.title || settings?.profile?.title || 'Software Engineering Student & Frontend Developer';
  const bio = settings?.bio || settings?.profile?.bio || 'Detail-oriented and motivated Software Engineering student with a strong foundation in front-end web development, semantic HTML5, CSS3, JavaScript, Bootstrap 5, and ongoing Generative AI learning.';
  const btnText = settings?.buttonText || 'View Featured Projects';
  const btnLink = settings?.buttonLink || '#projects';
  const secBtnText = settings?.secondaryCtaText || 'View CV / Resume';
  const location = settings?.location || settings?.profile?.location || 'Karachi, Pakistan';
  const education = settings?.profile?.education || 'Aptech Computer Education (Semester 1 Complete)';
  const course = settings?.profile?.scholarship || 'Bano Qabil Generative AI Course';

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
              {headlineLine1} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">
                {headlineLine2}
              </span>
            </h1>

            {/* Sub-headline / Title */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 bg-slate-100 dark:bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800">
              <Code2 className="w-4 h-4 text-cyan-500" />
              <span>{title}</span>
            </div>

            {/* Professional Summary */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={btnLink}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>{btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* View CV Button -> Opens Modal Directly */}
              <button
                type="button"
                onClick={() => setIsCvModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>{secBtnText}</span>
              </button>
            </div>

            {/* Bottom Proof Badges */}
            <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-start sm:items-center gap-2.5 p-3 sm:p-0 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 sm:bg-transparent border border-slate-200/60 dark:border-slate-800/60 sm:border-none max-w-full">
                <GraduationCap className="w-4 h-4 shrink-0 text-cyan-500 mt-0.5 sm:mt-0" />
                <span className="break-words leading-snug">{education}</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 p-3 sm:p-0 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 sm:bg-transparent border border-slate-200/60 dark:border-slate-800/60 sm:border-none max-w-full">
                <Award className="w-4 h-4 shrink-0 text-blue-500 mt-0.5 sm:mt-0" />
                <span className="break-words leading-snug">{course}</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 p-3 sm:p-0 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 sm:bg-transparent border border-slate-200/60 dark:border-slate-800/60 sm:border-none max-w-full">
                <MapPin className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5 sm:mt-0" />
                <span className="break-words leading-snug">{location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">

              {/* Glowing Card Border */}
              <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Profile Header Inside Card */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md border-2 border-cyan-400/40">
                    MT
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{name}</h3>
                    <p className="text-xs text-purple-400 font-medium">{title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{location}</p>
                  </div>
                </div>

                {/* Skills Preview in Card */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Foundations & Learning</div>
                  <div className="space-y-2">
                    {[
                      { name: 'HTML5 & Semantic Markup', pct: 85 },
                      { name: 'CSS3 & Bootstrap 5', pct: 80 },
                      { name: 'JavaScript (Basics) & DOM', pct: 65 },
                      { name: 'Prompt Engineering & LLM APIs', pct: 65 },
                      { name: 'Python Programming (Basics to Adv.)', pct: 50 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300 font-medium">{item.name}</span>
                          <span className="text-cyan-400 font-bold">{item.pct}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Terminal Snippet */}
                <div className="rounded-xl bg-slate-950 p-4 font-mono text-[11px] text-slate-300 space-y-1.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800/80 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-1 text-slate-400 text-[10px]">developer-profile.ts</span>
                  </div>
                  <p><span className="text-cyan-400">const</span> <span className="text-blue-300">developer</span> = <span className="text-cyan-300">"{name}"</span>;</p>
                  <p><span className="text-cyan-400">const</span> <span className="text-blue-300">role</span> = <span className="text-emerald-300">"Frontend Developer & SE Intern"</span>;</p>
                  <p><span className="text-cyan-400">const</span> <span className="text-blue-300">learning</span> = [<span className="text-cyan-300">"Prompt Engineering"</span>, <span className="text-cyan-300">"RAG"</span>, <span className="text-cyan-300">"LLM APIs"</span>];</p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* CV POPUP MODAL (ACCURATE REAL CV OF MARIUM TABASSUM) */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/50">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {name} — Curriculum Vitae
                  </h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider">
                    WEB DEVELOPER • FRONTEND DEVELOPER • SE INTERN
                  </p>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCvViewTab('structured')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    cvViewTab === 'structured'
                      ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Structured CV
                </button>
                <button
                  type="button"
                  onClick={() => setCvViewTab('pdf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    cvViewTab === 'pdf'
                      ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  PDF Document
                </button>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-3">
                <a
                  href="/cv.pdf"
                  download="Marium_Tabassum_CV.pdf"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF CV</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Tab Switcher */}
            <div className="sm:hidden flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 gap-2">
              <button
                type="button"
                onClick={() => setCvViewTab('structured')}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${
                  cvViewTab === 'structured'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Structured CV
              </button>
              <button
                type="button"
                onClick={() => setCvViewTab('pdf')}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${
                  cvViewTab === 'pdf'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                PDF Document
              </button>
            </div>

            {cvViewTab === 'pdf' ? (
              <div className="flex-1 p-4 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center">
                <iframe
                  src="/cv.pdf#toolbar=0"
                  className="w-full h-[65vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner bg-white"
                  title="Marium Tabassum CV PDF"
                />
              </div>
            ) : (
            /* Modal Body: Structured CV Render matching uploaded image */
            <div className="flex-1 p-5 sm:p-7 overflow-y-auto bg-slate-50 dark:bg-slate-950/70 space-y-6">

              {/* Header / Summary Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      MARIUM <span className="text-cyan-600 dark:text-cyan-400">TABASSUM</span>
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mt-0.5">
                      WEB DEVELOPER • FRONTEND DEVELOPER • SE INTERN
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      <span>0322-2963909</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      <span>mariumtabbasum@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      <span>1148/3 Nazimabad No#3, Urdu Bazar, Karachi</span>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    Professional Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                    Detail-oriented and motivated Software Engineering student with a strong foundation in front-end web development. Currently pursuing a 3-year diploma in Software Engineering (1st semester completed), with practical exposure to HTML, CSS, Bootstrap, basic JavaScript, and jQuery. Actively expanding technical skills through ongoing courses in Python and Generative AI. Known for quick learning, attention to detail, and a strong commitment to growth. Seeking an opportunity as a Web Developer, Frontend Developer, or Software Engineering Intern to apply and further develop technical skills in a professional environment.
                  </p>
                </div>
              </div>

              {/* Information & About Me Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Personal Information */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                    Information
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                      <span className="text-slate-500 dark:text-slate-400">Father Name:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">Tabassum Jamil</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                      <span className="text-slate-500 dark:text-slate-400">Date of Birth:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">23-June-2007</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                      <span className="text-slate-500 dark:text-slate-400">Marital Status:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">Single</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                      <span className="text-slate-500 dark:text-slate-400">CNIC:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">42401-7628362-2</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                      <span className="text-slate-500 dark:text-slate-400">Nationality:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">Pakistani</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-500 dark:text-slate-400">Religion:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">Islam</span>
                    </div>
                  </div>
                </div>

                {/* About Me */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                      About Me
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      A motivated and detail-oriented Software Engineering student currently in my 1st semester of a 3-year diploma program. I have hands-on foundation in HTML, CSS, Bootstrap, basic JavaScript and jQuery, and am actively expanding my skill set with Python and Generative AI. Eager to apply my growing frontend and problem-solving skills to real-world projects as a Web Developer, Frontend Developer, or Software Engineering Intern, while continuing to learn and grow in a professional environment.
                    </p>
                  </div>
                </div>

              </div>

              {/* Education & Certifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Education */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                    Education
                  </h4>
                  <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                        <span>Diploma in Software Engineering</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-semibold">In Progress</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">3-Year Program — 1st Semester Completed (Aptech Computer Education)</p>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                        <span>Intermediate (Pre-Engineering/Science)</span>
                        <span className="text-slate-500">2025</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">Sir Syed Government Girls College</p>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                        <span>Matriculation</span>
                        <span className="text-slate-500">2023</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">The Smart School</p>
                    </div>
                  </div>
                </div>

                {/* Certifications & Skills */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
                      Certifications
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white">Generative AI</span>
                          <span className="text-slate-500 dark:text-slate-400 ml-1.5">— Ongoing (5-month course)</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white">Python</span>
                          <span className="text-slate-500 dark:text-slate-400 ml-1.5">— Basic to Advanced (In progress)</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
                      Technical Skills
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        'HTML & CSS',
                        'Bootstrap',
                        'JavaScript (Basics)',
                        'jQuery (Basics)',
                        'Python (Basics)',
                        'Generative AI (Learning)',
                      ].map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                          <span className="text-cyan-500 dark:text-cyan-400 font-bold">✔</span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Academic Projects / Academic Learning (Ongoing) */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                  Academic Projects / Academic Learning (Ongoing)
                </h4>
                <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="border-l-2 border-purple-500 pl-3">
                    <div className="font-bold text-slate-900 dark:text-white">Diploma in Software Engineering (2025 - Present)</div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">Currently in 1st semester (6 months completed) of a 3-year diploma. Covered so far: HTML, CSS, Basic JavaScript, Bootstrap, Basic jQuery.</p>
                  </div>
                  <div className="border-l-2 border-purple-500 pl-3">
                    <div className="font-bold text-slate-900 dark:text-white">Generative AI Course (In Progress — 5 Months)</div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">Building practical understanding of Generative AI concepts and tools. Expected completion alongside advanced Python skills.</p>
                  </div>
                  <div className="border-l-2 border-purple-500 pl-3">
                    <div className="font-bold text-slate-900 dark:text-white">Python Programming: Basic → Advanced (Ongoing)</div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">Currently comfortable with Python basics; working toward an advanced level.</p>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">References:</span>
                <span>Available on request</span>
              </div>

            </div>
            )}

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
              <span className="text-xs text-slate-500">
                Official CV document for Marium Tabassum
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="/cv.pdf"
                  download="Marium_Tabassum_CV.pdf"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF CV</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
