import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Send, 
  Copy, 
  Check, 
  RefreshCw, 
  Code, 
  Lightbulb, 
  Cpu, 
  Terminal,
  Zap,
  ArrowRight
} from 'lucide-react';

export const AiLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'prompt' | 'code' | 'advisor'>('prompt');
  const [promptInput, setPromptInput] = useState('');
  const [promptOutput, setPromptOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pre-configured intelligent responses based on Marium's Generative AI knowledge
  const handleGenerate = () => {
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setCopied(false);

    setTimeout(() => {
      if (activeTool === 'prompt') {
        setPromptOutput(
          `### 🎯 Optimized Gemini Prompt\n\n` +
          `**System Role:** You are a senior frontend engineer specializing in responsive, accessible web design.\n\n` +
          `**User Request:** "${promptInput.trim()}"\n\n` +
          `**Refined Instructions:**\n` +
          `1. Implement semantic HTML5 markup with ARIA landmarks.\n` +
          `2. Use modern CSS (Flexbox/Grid) with responsive mobile-first breakpoints.\n` +
          `3. Keep JavaScript modular, event-driven, and optimized.\n` +
          `4. Return clean, production-ready code with concise inline explanations.`
        );
      } else if (activeTool === 'code') {
        setPromptOutput(
          `### 🔍 Code Analysis & Explanation\n\n` +
          `**Input Snippet:**\n\`\`\`javascript\n${promptInput.trim()}\n\`\`\`\n\n` +
          `**Key Insights:**\n` +
          `- **Architecture:** Clean declarative logic with modern ES6+ standards.\n` +
          `- **Execution:** Event listeners or functions execute asynchronously without blocking DOM render.\n` +
          `- **Best Practice Tip:** Ensure error boundaries or fallback states are handled for smooth user experience.`
        );
      } else {
        setPromptOutput(
          `### 💡 AI Roadmap Recommendation for: "${promptInput.trim()}"\n\n` +
          `1. **Core Foundation:** Master HTML5/CSS3 layout models and JavaScript event loops.\n` +
          `2. **Modern Tooling:** Integrate Git version control, Vite build workflows, and component architecture.\n` +
          `3. **AI Enhancement:** Connect Google Gemini API for intelligent content generation and personalized UX.\n` +
          `4. **Portfolio Impact:** Deploy live interactive demos showing real problem-solving.`
        );
      }
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (promptOutput) {
      navigator.clipboard.writeText(promptOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const setPreset = (text: string) => {
    setPromptInput(text);
  };

  return (
    <section 
      id="ai-lab" 
      className="scroll-mt-24 py-20 relative bg-white dark:bg-slate-950 transition-colors"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/60 dark:to-blue-950/60 border border-cyan-200/80 dark:border-cyan-800/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Interactive Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Innovation Lab
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Experiment with Generative AI tools built to demonstrate prompt engineering, code synthesis, and LLM integrations.
          </p>
        </div>

        {/* AI Lab Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/60 overflow-hidden">
          
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-850/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Gemini Prompt & Code Studio
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Powered by Generative AI Engineering Concepts
                </p>
              </div>
            </div>

            {/* Tool Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => { setActiveTool('prompt'); setPromptOutput(''); }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTool === 'prompt'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Prompt Optimizer
              </button>
              <button
                onClick={() => { setActiveTool('code'); setPromptOutput(''); }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTool === 'code'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Code Explainer
              </button>
              <button
                onClick={() => { setActiveTool('advisor'); setPromptOutput(''); }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTool === 'advisor'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tech Advisor
              </button>
            </div>
          </div>

          {/* Interactive Workspace Body */}
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Quick Preset Buttons */}
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Prompt Presets:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTool === 'prompt' && (
                  <>
                    <button
                      onClick={() => setPreset('Create a responsive navigation bar with dark mode toggle')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      Responsive Navbar Prompt
                    </button>
                    <button
                      onClick={() => setPreset('Design an accessible contact form with realtime client validation')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      Contact Form Specification
                    </button>
                    <button
                      onClick={() => setPreset('Build a modern card component with glassmorphism in Tailwind CSS')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      Glassmorphism Card Prompt
                    </button>
                  </>
                )}

                {activeTool === 'code' && (
                  <>
                    <button
                      onClick={() => setPreset('const toggleTheme = () => document.documentElement.classList.toggle("dark");')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      Dark Mode Toggle JS
                    </button>
                    <button
                      onClick={() => setPreset('fetch("/api/data").then(res => res.json()).then(console.log);')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      Fetch API Promise
                    </button>
                  </>
                )}

                {activeTool === 'advisor' && (
                  <>
                    <button
                      onClick={() => setPreset('How to transition from Aptech Semester 1 to full-stack frontend engineer?')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      Semester 1 Next Steps
                    </button>
                    <button
                      onClick={() => setPreset('Best ways to integrate Gemini API into personal portfolio projects?')}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
                    >
                      Gemini API Integration Tips
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Input Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {activeTool === 'prompt' && 'Enter your raw idea or prompt:'}
                {activeTool === 'code' && 'Paste code snippet to explain:'}
                {activeTool === 'advisor' && 'Ask a software engineering or AI question:'}
              </label>
              
              <div className="relative">
                <textarea
                  rows={3}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={
                    activeTool === 'prompt'
                      ? 'e.g., Create a responsive navigation bar with dark mode toggle...'
                      : activeTool === 'code'
                        ? 'e.g., function calculateSum(a, b) { return a + b; }'
                        : 'e.g., How can a student learn prompt engineering effectively?'
                  }
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleGenerate}
                  disabled={!promptInput.trim() || isGenerating}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating with AI...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Generate Result</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Display */}
            {promptOutput && (
              <div className="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 relative group">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Output Generated
                  </span>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                  </button>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {promptOutput}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
