import React, { useState, useEffect } from 'react';
import {
  LogOut,
  Code2,
  FolderGit2,
  MessageSquare,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Save,
  Check,
  Award,
  Layers,
  Briefcase,
  Compass,
  Home,
  User,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'home' | 'about' | 'skills' | 'projects' | 'services' | 'journey' | 'certificates' | 'messages'>('settings');
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [settings, setSettings] = useState<any>({
    emails: ['mariumtabbasum@gmail.com'],
    phone: '+92 300 1234567',
    buttonText: 'View Projects',
    buttonLink: '#projects',
    secondaryCtaText: 'View CV',
    secondaryCtaLink: '/resume.pdf',
    contactBtnText: 'Send Message',
    links: {
      github: 'https://github.com/mariumtabbasum-coder',
      linkedin: 'https://linkedin.com/in/mariumtabbasum',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    profile: {
      name: 'Marium Tabassum',
      title: 'Software Engineering Student & AI-Focused Web Developer',
      education: 'Aptech Computer Education (Semester 1 Complete)',
      scholarship: 'Bano Qabil Generative AI Scholar',
      location: 'Karachi, Pakistan',
      bio: 'Passionate software engineering student and frontend developer building responsive web applications and exploring generative AI solutions.',
      heroBadge: 'Aptech Computer Education • Semester 1 Complete',
      responseTimeText: 'Typical Response: Within 24 Hours'
    }
  });

  const [savedStatus, setSavedStatus] = useState(false);

  // Form states
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 80, category: 'frontend', badge: 'Intermediate' });

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'frontend',
    tags: 'React, TypeScript',
    liveUrl: '',
    githubUrl: '',
    features: 'Responsive Design, Modern UI',
    techStack: 'React, Tailwind CSS',
    imageUrl: '',
    featured: false
  });

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({ title: '', description: '', badge: 'Frontend', highlights: 'Mobile-First, Accessible' });

  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ period: '2026', title: '', organization: 'Aptech', description: '', status: 'completed', highlights: 'Core Concepts' });

  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [newCertificate, setNewCertificate] = useState({ title: '', issuer: 'Aptech', date: '2025', description: '', credentialId: '', skills: 'HTML, CSS, JavaScript' });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [sRes, pRes, srvRes, mRes, cRes, msgRes, setRes] = await Promise.all([
        fetch('/api/skills').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/services').then(r => r.json()),
        fetch('/api/learning').then(r => r.json()),
        fetch('/api/certificates').then(r => r.json()),
        fetch('/api/messages').then(r => r.json()),
        fetch('/api/settings').then(r => r.json())
      ]);
      if (sRes.success) setSkills(sRes.data);
      if (pRes.success) setProjects(pRes.data);
      if (srvRes.success) setServices(srvRes.data);
      if (mRes.success) setMilestones(mRes.data);
      if (cRes.success) setCertificates(cRes.data);
      if (msgRes.success) setMessages(msgRes.data);
      if (setRes.success && setRes.data) setSettings(setRes.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
        setSavedStatus(true);
        setTimeout(() => setSavedStatus(false), 3000);
      }
    } catch (err) {
      console.error('Error saving settings', err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSkill)
    });
    setIsAddingSkill(false);
    setNewSkill({ name: '', level: 80, category: 'frontend', badge: 'Intermediate' });
    fetchAll();
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      alert('Title and Description are required!');
      return;
    }
    const formatted = {
      ...newProject,
      tags: typeof newProject.tags === 'string' ? newProject.tags.split(',').map((t: string) => t.trim()) : newProject.tags,
      features: typeof newProject.features === 'string' ? newProject.features.split(',').map((f: string) => f.trim()) : newProject.features,
      techStack: typeof newProject.techStack === 'string' ? newProject.techStack.split(',').map((s: string) => s.trim()) : newProject.techStack
    };
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatted)
    });
    setIsAddingProject(false);
    setNewProject({ title: '', description: '', category: 'frontend', tags: 'React, TypeScript', liveUrl: '', githubUrl: '', features: 'Responsive Design', techStack: 'React', imageUrl: '', featured: false });
    fetchAll();
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = {
      ...newService,
      highlights: typeof newService.highlights === 'string' ? newService.highlights.split(',').map((h: string) => h.trim()) : newService.highlights
    };
    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatted)
    });
    setIsAddingService(false);
    setNewService({ title: '', description: '', badge: 'Frontend', highlights: 'Mobile-First, Accessible' });
    fetchAll();
  };

  const handleCreateMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = {
      ...newMilestone,
      highlights: typeof newMilestone.highlights === 'string' ? newMilestone.highlights.split(',').map((h: string) => h.trim()) : newMilestone.highlights
    };
    await fetch('/api/learning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatted)
    });
    setIsAddingMilestone(false);
    setNewMilestone({ period: '2026', title: '', organization: 'Aptech', description: '', status: 'completed', highlights: 'Core Concepts' });
    fetchAll();
  };

  const handleCreateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = {
      ...newCertificate,
      skills: typeof newCertificate.skills === 'string' ? newCertificate.skills.split(',').map((s: string) => s.trim()) : newCertificate.skills
    };
    await fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatted)
    });
    setIsAddingCertificate(false);
    setNewCertificate({ title: '', issuer: 'Aptech', date: '2025', description: '', credentialId: '', skills: 'HTML, CSS, JavaScript' });
    fetchAll();
  };

  const handleDelete = async (type: string, id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      fetchAll();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <nav className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-6 shrink-0">
        <div className="text-white font-extrabold text-base mb-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">M</div>
          Master CMS
        </div>

        <div className="flex-1 space-y-1.5 overflow-y-auto">
          {[
            { id: 'settings', label: 'Website Settings', icon: SettingsIcon },
            { id: 'home', label: 'Home / Hero', icon: Home },
            { id: 'about', label: 'About & Profile', icon: User },
            { id: 'services', label: 'Services', icon: Layers, count: services.length },
            { id: 'journey', label: 'Journey & Milestones', icon: Compass, count: milestones.length },
            { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
            { id: 'skills', label: 'Skills', icon: Code2, count: skills.length },
            { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
            { id: 'messages', label: 'Contact Messages', icon: MessageSquare, count: messages.length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800/80 text-white">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/50 flex items-center gap-3 transition-all mt-4"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-extrabold text-white capitalize">
              {activeTab === 'settings' ? 'Global Website Settings & CMS' : `${activeTab.replace('-', ' ')} Management`}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Control all text, links, profile details, and portfolio content from A to Z.</p>
          </div>
          <div className="flex items-center gap-3">
            {savedStatus && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                <Check className="w-4 h-4" /> Saved Successfully!
              </span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <span>Preview Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* 1. WEBSITE SETTINGS TAB */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Global Contact & Communication</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="text"
                    value={settings.emails?.[0] || ''}
                    onChange={e => setSettings({ ...settings, emails: [e.target.value] })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone || ''}
                    onChange={e => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Social Media Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={settings.links?.github || ''}
                    onChange={e => setSettings({ ...settings, links: { ...settings.links, github: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={settings.links?.linkedin || ''}
                    onChange={e => setSettings({ ...settings, links: { ...settings.links, linkedin: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Global Settings
              </button>
            </div>
          </form>
        )}

        {/* 2. HOME / HERO TAB */}
        {activeTab === 'home' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Hero Section Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Hero Status Badge Text</label>
                  <input
                    type="text"
                    value={settings.profile?.heroBadge || ''}
                    onChange={e => setSettings({ ...settings, profile: { ...settings.profile, heroBadge: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={settings.buttonText || ''}
                    onChange={e => setSettings({ ...settings, buttonText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Primary CTA Button Link (e.g. #projects)</label>
                  <input
                    type="text"
                    value={settings.buttonLink || ''}
                    onChange={e => setSettings({ ...settings, buttonLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Secondary Button Text (CV Modal trigger)</label>
                  <input
                    type="text"
                    value={settings.secondaryCtaText || ''}
                    onChange={e => setSettings({ ...settings, secondaryCtaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Hero Settings
              </button>
            </div>
          </form>
        )}

        {/* 3. ABOUT & PROFILE TAB */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">About & Profile Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={settings.profile?.name || ''}
                    onChange={e => setSettings({ ...settings, profile: { ...settings.profile, name: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={settings.profile?.title || ''}
                    onChange={e => setSettings({ ...settings, profile: { ...settings.profile, title: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={settings.profile?.location || ''}
                    onChange={e => setSettings({ ...settings, profile: { ...settings.profile, location: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Education / Aptech Details</label>
                  <input
                    type="text"
                    value={settings.profile?.education || ''}
                    onChange={e => setSettings({ ...settings, profile: { ...settings.profile, education: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Scholarship / Bano Qabil Details</label>
                  <input
                    type="text"
                    value={settings.profile?.scholarship || ''}
                    onChange={e => setSettings({ ...settings, profile: { ...settings.profile, scholarship: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Main Bio Paragraph</label>
                  <textarea
                    rows={4}
                    value={settings.profile?.bio || ''}
                    onChange={e => setSettings({ ...settings, profile: { ...settings.profile, bio: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save About Settings
              </button>
            </div>
          </form>
        )}

        {/* 4. SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-200">Manage Services</h2>
              <button
                onClick={() => setIsAddingService(!isAddingService)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            {isAddingService && (
              <form onSubmit={handleCreateService} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">New Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Service Title"
                    value={newService.title}
                    onChange={e => setNewService({ ...newService, title: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Badge (e.g. Frontend)"
                    value={newService.badge}
                    onChange={e => setNewService({ ...newService, badge: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <div className="sm:col-span-2">
                    <textarea
                      required
                      rows={2}
                      placeholder="Service Description"
                      value={newService.description}
                      onChange={e => setNewService({ ...newService, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Highlights (comma separated, e.g. Mobile-First, Accessible)"
                      value={newService.highlights}
                      onChange={e => setNewService({ ...newService, highlights: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddingService(false)} className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs bg-blue-600 text-white font-bold">Save Service</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {services.map((srv: any) => (
                <div key={srv.id || srv._id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{srv.title}</h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-950 text-cyan-300 border border-blue-800">{srv.badge}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{srv.description}</p>
                  </div>
                  <button onClick={() => handleDelete('services', srv.id || srv._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-950/50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. JOURNEY / MILESTONES TAB */}
        {activeTab === 'journey' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-200">Journey & Milestones</h2>
              <button
                onClick={() => setIsAddingMilestone(!isAddingMilestone)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Milestone
              </button>
            </div>

            {isAddingMilestone && (
              <form onSubmit={handleCreateMilestone} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">New Milestone</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Period (e.g. 2025 - 2026)"
                    value={newMilestone.period}
                    onChange={e => setNewMilestone({ ...newMilestone, period: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Title (e.g. Aptech Software Engineering)"
                    value={newMilestone.title}
                    onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Organization (e.g. Aptech)"
                    value={newMilestone.organization}
                    onChange={e => setNewMilestone({ ...newMilestone, organization: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <select
                    value={newMilestone.status}
                    onChange={e => setNewMilestone({ ...newMilestone, status: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                  <div className="sm:col-span-2">
                    <textarea
                      required
                      rows={2}
                      placeholder="Description"
                      value={newMilestone.description}
                      onChange={e => setNewMilestone({ ...newMilestone, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddingMilestone(false)} className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs bg-blue-600 text-white font-bold">Save Milestone</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {milestones.map((m: any) => (
                <div key={m.id || m._id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cyan-400">{m.period}</span>
                      <h4 className="font-bold text-white text-sm">{m.title}</h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold bg-slate-800 text-slate-300">{m.status}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{m.description}</p>
                  </div>
                  <button onClick={() => handleDelete('learning', m.id || m._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-950/50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CERTIFICATES TAB */}
        {activeTab === 'certificates' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-200">Manage Certificates</h2>
              <button
                onClick={() => setIsAddingCertificate(!isAddingCertificate)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Certificate
              </button>
            </div>

            {isAddingCertificate && (
              <form onSubmit={handleCreateCertificate} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">New Certificate</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Certificate Title"
                    value={newCertificate.title}
                    onChange={e => setNewCertificate({ ...newCertificate, title: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Issuer (e.g. Aptech Computer Education)"
                    value={newCertificate.issuer}
                    onChange={e => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Date / Year (e.g. 2025)"
                    value={newCertificate.date}
                    onChange={e => setNewCertificate({ ...newCertificate, date: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Skills (comma separated)"
                    value={newCertificate.skills}
                    onChange={e => setNewCertificate({ ...newCertificate, skills: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <div className="sm:col-span-2">
                    <textarea
                      required
                      rows={2}
                      placeholder="Description"
                      value={newCertificate.description}
                      onChange={e => setNewCertificate({ ...newCertificate, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddingCertificate(false)} className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs bg-blue-600 text-white font-bold">Save Certificate</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {certificates.map((c: any) => (
                <div key={c.id || c._id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{c.title}</h4>
                      <span className="text-xs text-cyan-400">({c.issuer} - {c.date})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{c.description}</p>
                  </div>
                  <button onClick={() => handleDelete('certificates', c.id || c._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-950/50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-200">Manage Skills</h2>
              <button
                onClick={() => setIsAddingSkill(!isAddingSkill)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            {isAddingSkill && (
              <form onSubmit={handleCreateSkill} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">New Skill</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Skill Name (e.g. React)"
                    value={newSkill.name}
                    onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    placeholder="Proficiency Level (%)"
                    value={newSkill.level}
                    onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <select
                    value={newSkill.category}
                    onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="frontend">Frontend & Web</option>
                    <option value="programming">Programming</option>
                    <option value="tools">AI & Tools</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Badge (e.g. Intermediate)"
                    value={newSkill.badge}
                    onChange={e => setNewSkill({ ...newSkill, badge: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddingSkill(false)} className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs bg-blue-600 text-white font-bold">Save Skill</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((s: any) => (
                <div key={s.id || s._id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{s.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400">{s.level}%</span>
                    </div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider">{s.category}</span>
                  </div>
                  <button onClick={() => handleDelete('skills', s.id || s._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-950/50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-200">Manage Projects & Image Upload</h2>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            {isAddingProject && (
              <form onSubmit={handleCreateProject} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">New Project Details (Title & Description Required)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Project Title *"
                    value={newProject.title}
                    onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <select
                    value={newProject.category}
                    onChange={e => setNewProject({ ...newProject, category: e.target.value as any })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="frontend">Frontend & UI/UX</option>
                    <option value="javascript">JavaScript Apps</option>
                    <option value="responsive">Responsive</option>
                  </select>
                  <div className="sm:col-span-2">
                    <textarea
                      required
                      rows={3}
                      placeholder="Project Description *"
                      value={newProject.description}
                      onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  {/* Image Upload Field */}
                  <div className="sm:col-span-2 space-y-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <label className="block text-xs font-semibold text-slate-300">Project Image (Upload File or paste Image URL)</label>
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Upload Image File</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      <span className="text-xs text-slate-400">or paste URL below:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="https://example.com/image.png or base64"
                      value={newProject.imageUrl}
                      onChange={e => setNewProject({ ...newProject, imageUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1"
                    />
                    {newProject.imageUrl && (
                      <div className="w-32 h-20 rounded-lg overflow-hidden border border-slate-700 mt-2">
                        <img src={newProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Live URL (Optional)"
                    value={newProject.liveUrl}
                    onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL (Optional)"
                    value={newProject.githubUrl}
                    onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma separated: React, TypeScript)"
                    value={newProject.tags}
                    onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Key Features (comma separated)"
                    value={newProject.features}
                    onChange={e => setNewProject({ ...newProject, features: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsAddingProject(false)} className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs bg-blue-600 text-white font-bold cursor-pointer">Save Project</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {projects.map((p: any) => (
                <div key={p.id || p._id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} className="w-16 h-12 rounded-lg object-cover border border-slate-700" />
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 text-xs">No Img</div>
                    )}
                    <div>
                      <h4 className="font-bold text-white text-sm">{p.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{p.description}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete('projects', p.id || p._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-950/50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-lg font-bold text-slate-200">Contact Form Submissions Inbox ({messages.length})</h2>
            {messages.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
                No messages received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m: any) => (
                  <div key={m.id || m._id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-sm">{m.name} <span className="text-xs font-normal text-slate-400">&lt;{m.email}&gt;</span></h4>
                        <div className="text-xs font-semibold text-cyan-400 mt-0.5">Subject: {m.subject || 'General Inquiry'}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500">{m.date || m.createdAt?.substring(0, 10)}</span>
                        <button onClick={() => handleDelete('messages', m.id || m._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-950/50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};
