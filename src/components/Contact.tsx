import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = 'mariumtabbasum@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="contact" 
      className="scroll-mt-24 py-20 relative bg-white dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's Collaborate & Connect
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Have a project in mind, an opportunity, or want to discuss modern web development? Feel free to send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Open for frontend development opportunities, internships, and collaborative software engineering projects.
                </p>
              </div>

              {/* Email Pill */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Direct Email</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {emailAddress}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0 border border-slate-200/60 dark:border-slate-600/60"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Pill */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-100 dark:border-cyan-900/50">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Location</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Karachi, Pakistan
                  </div>
                </div>
              </div>

              {/* Social Connects */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  Find me on:
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/mariumtabbasum-coder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all flex items-center gap-2 text-xs font-semibold shadow-2xs"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>

                  <a
                    href="mailto:mariumtabbasum@gmail.com"
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition-all flex items-center gap-2 text-xs font-semibold shadow-2xs"
                  >
                    <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <span>Send Mail</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                <span>Send a Direct Message</span>
              </h3>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                    Thank you, your message has been sent!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    I will review your message and respond to your email as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Khan"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Collaboration on Frontend Project"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
