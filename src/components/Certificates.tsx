import React from 'react';
import { Award, CheckCircle, ExternalLink, Calendar, Building2 } from 'lucide-react';
import { Certificate } from '../types';

export const Certificates: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: 'aptech-sem1',
      title: 'Certificate of Achievement: Semester 1 Software Engineering',
      issuer: 'Aptech Computer Education',
      date: '2025 - 2026',
      credentialId: 'APT-SE-SEM1-PASSED',
      description: 'Awarded for exceptional performance in programming logic, HTML5, CSS3, JavaScript ES6+, Bootstrap 5, and responsive frontend systems.',
      skills: ['Semantic HTML5', 'CSS3 Architecture', 'JavaScript Logic', 'Bootstrap Framework']
    },
    {
      id: 'bano-qabil-ai',
      title: 'Generative AI Scholar & Practitioner',
      issuer: 'Bano Qabil Pakistan',
      date: '2025 - 2026',
      credentialId: 'BQ-GENAI-SCHOLAR-2026',
      description: 'Comprehensive scholarship in Prompt Engineering, Large Language Model architectures, Google Gemini API, and building AI-enabled web apps.',
      skills: ['Prompt Engineering', 'Gemini API', 'LLM Integration', 'Python Scripting']
    },
    {
      id: 'frontend-responsive',
      title: 'Modern Responsive Web Design Certification',
      issuer: 'Professional Development Series',
      date: '2025',
      credentialId: 'WEB-DEV-RWD-PRO',
      description: 'Mastery in building mobile-first interfaces, UI accessibility standards, modern flexbox/grid layout dynamics, and cross-browser compatibility.',
      skills: ['Mobile-First Design', 'UI/UX Principles', 'Cross-Browser Testing']
    }
  ];

  return (
    <section 
      id="certificates" 
      className="scroll-mt-24 py-20 relative bg-white dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Proof</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certifications & Honors
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Formal recognitions earned during my academic studies at Aptech and Bano Qabil.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-2xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills Learned */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {cert.credentialId && (
                <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  ID: {cert.credentialId}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
