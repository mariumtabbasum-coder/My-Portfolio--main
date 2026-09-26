import React from 'react';
import {
  Laptop,
  Layout,
  Sparkles,
  Bot,
  CheckCircle2,
  Code2
} from 'lucide-react';

export const Services: React.FC = () => {
  const servicesData = [
    {
      id: 'responsive-web',
      title: 'Responsive Website Development',
      description: 'Crafting clean, accessible, and mobile-friendly websites that work smoothly across smartphones, tablets, and desktop screens using modern HTML5, CSS3, JavaScript, and Bootstrap.',
      icon: Laptop,
      badge: 'Frontend Core',
      highlights: ['Mobile-first design', 'Semantic HTML5', 'Cross-browser compatibility']
    },
    {
      id: 'website-redesign',
      title: 'Website Redesign & Modernization',
      description: 'Improving outdated website layouts with cleaner structure, responsive design, improved usability, and modern visual presentation.',
      icon: Layout,
      badge: 'UI Enhancement',
      highlights: ['Layout structuring', 'UI/UX cleanup', 'Performance tuning']
    },
    {
      id: 'landing-pages',
      title: 'Custom Landing Pages',
      description: 'Creating focused and responsive landing pages for small businesses, events, personal portfolios, and digital projects with clear calls-to-action.',
      icon: Code2,
      badge: 'Conversion Focused',
      highlights: ['Fast loading speed', 'Clear CTAs', 'Interactive components']
    },
    {
      id: 'ai-exploration',
      title: 'AI Chatbot & Tool Exploration',
      description: 'Exploring Generative AI solutions, prompt-based workflows, AI chatbot concepts, and emerging AI-powered tools as part of my ongoing learning journey.',
      icon: Bot,
      badge: 'Generative AI',
      highlights: ['Prompt engineering', 'AI assistant workflows', 'RAG concepts']
    }
  ];

  return (
    <section
      id="services"
      className="scroll-mt-24 py-20 relative bg-white dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/60 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Services & Collaboration</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What I Can Do For You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Professional frontend development, responsive design, and exploratory AI solutions tailored for your projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="p-7 rounded-3xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-cyan-300 border border-blue-200/60 dark:border-blue-800/60">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Key Focus:</div>
                    {service.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>Available for Projects</span>
                  <a
                    href="#contact"
                    className="text-blue-600 dark:text-cyan-400 hover:underline font-bold"
                  >
                    Inquire Now →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
