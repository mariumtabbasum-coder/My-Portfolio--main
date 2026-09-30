import React, { useState, useEffect } from 'react';
import {
  LogOut,
  Code2,
  FolderGit2,
  MessageSquare,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Save,
  Check,
  Award,
  Layers,
  Compass,
  Home,
  User,
  Upload,
  Image as ImageIcon,
  Mail,
  Globe,
  Phone,
  MapPin,
  Eye,
  Edit2,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'home' | 'about' | 'skills' | 'projects' | 'services' | 'journey' | 'certificates' | 'contact' | 'social' | 'messages'
  >('home');

  // Server data states
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    heroBadge: '',
    headlineLine1: '',
    headlineLine2: '',
    title: '',
    bio: '',
    buttonText: '',
    buttonLink: '',
    secondaryCtaText: '',
    secondaryCtaLink: '',
    aboutHeading: '',
    aboutSubtitle: '',
    aboutBio: '',
    journeyText: '',
    aptechDetails: '',
    scholarshipDetails: '',
    philosophyText: '',
    email: '',
    emails: [''],
    phone: '',
    location: '',
    responseTimeText: '',
    availabilityStatus: '',
    contactHeading: '',
    contactSubtitle: '',
    links: {
      github: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
    },
    profile: {
      name: '',
      title: '',
      education: '',
      scholarship: '',
      location: '',
      bio: '',
      heroBadge: '',
      responseTimeText: '',
    }
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Add / Edit Modal States
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [skillForm, setSkillForm] = useState({ name: '', level: 80, category: 'frontend', badge: 'Intermediate' });

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'frontend',
    tags: '',
    techStack: '',
    features: '',
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
    featured: false,
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', badge: 'Frontend Core', highlights: '' });

  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<any | null>(null);
  const [milestoneForm, setMilestoneForm] = useState({ period: '2025 - Present', title: '', organization: 'Aptech', description: '', status: 'completed', highlights: '' });

  const [isAddingCertificate, setIsAddingCertificate] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<any | null>(null);
  const [certificateForm, setCertificateForm] = useState({ title: '', issuer: 'Aptech Computer Education', date: '2025', credentialId: '', description: '', skills: '' });

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
        fetch('/api/settings').then(r => r.json()),
      ]);

      if (sRes?.success && Array.isArray(sRes.data)) setSkills(sRes.data);
      if (pRes?.success && Array.isArray(pRes.data)) setProjects(pRes.data);
      if (srvRes?.success && Array.isArray(srvRes.data)) setServices(srvRes.data);
      if (mRes?.success && Array.isArray(mRes.data)) setMilestones(mRes.data);
      if (cRes?.success && Array.isArray(cRes.data)) setCertificates(cRes.data);
      if (msgRes?.success && Array.isArray(msgRes.data)) setMessages(msgRes.data);
      if (setRes?.success && setRes.data) setSettings(setRes.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    }
  };

  // --- Save Settings ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
        showNotification('Settings saved successfully!');
      } else {
        showNotification('Settings saved locally.');
      }
    } catch (err) {
      console.error('Error saving settings', err);
      showNotification('Settings saved locally.');
    }
  };

  // --- Image Upload Handler ---
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        setProjectForm(prev => ({ ...prev, imageUrl: data.url }));
        showNotification('Image uploaded successfully!');
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProjectForm(prev => ({ ...prev, imageUrl: reader.result as string }));
          showNotification('Image preview set successfully!');
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm(prev => ({ ...prev, imageUrl: reader.result as string }));
        showNotification('Image preview set locally.');
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // --- Skills CRUD ---
  const openNewSkillModal = () => {
    setEditingSkill(null);
    setSkillForm({ name: '', level: 80, category: 'frontend', badge: 'Intermediate' });
    setIsAddingSkill(true);
  };

  const openEditSkillModal = (skill: any) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name || '',
      level: skill.level || 75,
      category: skill.category || 'frontend',
      badge: skill.badge || 'Learning',
    });
    setIsAddingSkill(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    const skillId = editingSkill ? (editingSkill.id || editingSkill._id) : null;
    if (skillId) {
      const res = await fetch(`/api/skills/${skillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillForm),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Skill "${skillForm.name}" updated!`);
      }
    } else {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillForm),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Skill "${skillForm.name}" added!`);
      }
    }

    setIsAddingSkill(false);
    fetchAll();
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!id) return;
    setSkills(prev => prev.filter(s => (s.id || s._id) !== id));
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Skill "${name}" deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
    fetchAll();
  };

  // --- Projects CRUD ---
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      category: 'frontend',
      tags: '',
      techStack: '',
      features: '',
      liveUrl: '',
      githubUrl: '',
      imageUrl: '',
      featured: false,
    });
    setIsAddingProject(true);
  };

  const openEditProjectModal = (proj: any) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      description: proj.description || '',
      category: proj.category || 'frontend',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : (proj.tags || ''),
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || ''),
      features: Array.isArray(proj.features) ? proj.features.join(', ') : (proj.features || ''),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      imageUrl: proj.imageUrl || '',
      featured: Boolean(proj.featured),
    });
    setIsAddingProject(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      showNotification('Title and description are required.');
      return;
    }

    const payload = {
      ...projectForm,
      tags: projectForm.tags ? projectForm.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      techStack: projectForm.techStack ? projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean) : [],
      features: projectForm.features ? projectForm.features.split(',').map(s => s.trim()).filter(Boolean) : [],
      liveUrl: projectForm.liveUrl.trim(),
      githubUrl: projectForm.githubUrl.trim(),
    };

    const projId = editingProject ? (editingProject.id || editingProject._id) : null;
    if (projId) {
      const res = await fetch(`/api/projects/${projId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Project "${payload.title}" updated!`);
      }
    } else {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Project "${payload.title}" added!`);
      }
    }

    setIsAddingProject(false);
    fetchAll();
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!id) return;
    setProjects(prev => prev.filter(p => (p.id || p._id) !== id));
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Project "${title}" deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
    fetchAll();
  };

  // --- Services CRUD ---
  const openNewServiceModal = () => {
    setEditingService(null);
    setServiceForm({ title: '', description: '', badge: 'Frontend Core', highlights: '' });
    setIsAddingService(true);
  };

  const openEditServiceModal = (srv: any) => {
    setEditingService(srv);
    setServiceForm({
      title: srv.title || '',
      description: srv.description || '',
      badge: srv.badge || 'Frontend Core',
      highlights: Array.isArray(srv.highlights) ? srv.highlights.join(', ') : (srv.highlights || ''),
    });
    setIsAddingService(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) return;

    const payload = {
      ...serviceForm,
      highlights: serviceForm.highlights ? serviceForm.highlights.split(',').map(h => h.trim()).filter(Boolean) : [],
    };

    const srvId = editingService ? (editingService.id || editingService._id) : null;
    if (srvId) {
      const res = await fetch(`/api/services/${srvId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Service "${payload.title}" updated!`);
      }
    } else {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Service "${payload.title}" created!`);
      }
    }

    setIsAddingService(false);
    fetchAll();
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (!id) return;
    setServices(prev => prev.filter(s => (s.id || s._id) !== id));
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Service "${title}" deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
    fetchAll();
  };

  // --- Milestones CRUD ---
  const openNewMilestoneModal = () => {
    setEditingMilestone(null);
    setMilestoneForm({ period: '2025 - Present', title: '', organization: 'Aptech', description: '', status: 'completed', highlights: '' });
    setIsAddingMilestone(true);
  };

  const openEditMilestoneModal = (m: any) => {
    setEditingMilestone(m);
    setMilestoneForm({
      period: m.period || '',
      title: m.title || '',
      organization: m.organization || '',
      description: m.description || '',
      status: m.status || 'completed',
      highlights: Array.isArray(m.highlights) ? m.highlights.join(', ') : (m.highlights || ''),
    });
    setIsAddingMilestone(true);
  };

  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.title.trim()) return;

    const payload = {
      ...milestoneForm,
      highlights: milestoneForm.highlights ? milestoneForm.highlights.split(',').map(h => h.trim()).filter(Boolean) : [],
    };

    const mId = editingMilestone ? (editingMilestone.id || editingMilestone._id) : null;
    if (mId) {
      const res = await fetch(`/api/learning/${mId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Milestone updated!`);
      }
    } else {
      const res = await fetch('/api/learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Milestone created!`);
      }
    }

    setIsAddingMilestone(false);
    fetchAll();
  };

  const handleDeleteMilestone = async (id: string, title: string) => {
    if (!id) return;
    setMilestones(prev => prev.filter(m => (m.id || m._id) !== id));
    try {
      const res = await fetch(`/api/learning/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Milestone "${title}" deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
    fetchAll();
  };

  // --- Certificates CRUD ---
  const openNewCertificateModal = () => {
    setEditingCertificate(null);
    setCertificateForm({ title: '', issuer: 'Aptech Computer Education', date: '2025', credentialId: '', description: '', skills: '' });
    setIsAddingCertificate(true);
  };

  const openEditCertificateModal = (c: any) => {
    setEditingCertificate(c);
    setCertificateForm({
      title: c.title || '',
      issuer: c.issuer || '',
      date: c.date || '',
      credentialId: c.credentialId || '',
      description: c.description || '',
      skills: Array.isArray(c.skills) ? c.skills.join(', ') : (c.skills || ''),
    });
    setIsAddingCertificate(true);
  };

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateForm.title.trim()) return;

    const payload = {
      ...certificateForm,
      skills: certificateForm.skills ? certificateForm.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    const certId = editingCertificate ? (editingCertificate.id || editingCertificate._id) : null;
    if (certId) {
      const res = await fetch(`/api/certificates/${certId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Certificate updated!`);
      }
    } else {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Certificate created!`);
      }
    }

    setIsAddingCertificate(false);
    fetchAll();
  };

  const handleDeleteCertificate = async (id: string, title: string) => {
    if (!id) return;
    setCertificates(prev => prev.filter(c => (c.id || c._id) !== id));
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Certificate "${title}" deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
    fetchAll();
  };

  // --- Messages CRUD ---
  const handleDeleteMessage = async (id: string, sender: string) => {
    if (!id) return;
    setMessages(prev => prev.filter(m => (m.id || m._id) !== id));
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Message from "${sender}" deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
    fetchAll();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin';
  };

  const navItems = [
    { id: 'home', label: 'Home / Hero', icon: Home },
    { id: 'about', label: 'About & Profile', icon: User },
    { id: 'skills', label: 'Skills & Stack', icon: Code2, count: skills.length },
    { id: 'projects', label: 'Projects Portfolio', icon: FolderGit2, count: projects.length },
    { id: 'services', label: 'Services', icon: Layers, count: services.length },
    { id: 'journey', label: 'Journey & Roadmap', icon: Compass, count: milestones.length },
    { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'social', label: 'Social Links', icon: Globe },
    { id: 'messages', label: 'Contact Messages', icon: MessageSquare, count: messages.length },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-6 shrink-0">
        <div className="text-white font-extrabold text-base mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md">
              MT
            </div>
            <span>Portfolio CMS</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            title="Open Public Site"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Site</span>
          </a>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive ? 'bg-amber-600 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 flex items-center gap-2.5 transition-all mt-6 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Portal</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">

        {/* 1. HOME / HERO SECTION */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Home className="w-5 h-5 text-amber-400" />
                <span>Home / Hero Section Management</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Customize the main headline, hero badge, summary text, and primary call-to-actions.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Top Badge</label>
                  <input
                    type="text"
                    value={settings.heroBadge || ''}
                    onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                    placeholder="Aptech Computer Education • Semester 1 Complete"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={settings.profile?.name || ''}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, name: e.target.value } })}
                    placeholder="Marium Tabassum"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Headline (Line 1)</label>
                  <input
                    type="text"
                    value={settings.headlineLine1 || ''}
                    onChange={(e) => setSettings({ ...settings, headlineLine1: e.target.value })}
                    placeholder="Building Modern"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Headline Highlight (Line 2)</label>
                  <input
                    type="text"
                    value={settings.headlineLine2 || ''}
                    onChange={(e) => setSettings({ ...settings, headlineLine2: e.target.value })}
                    placeholder="Frontend Experiences & Web Solutions"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle / Job Title</label>
                <input
                  type="text"
                  value={settings.title || ''}
                  onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  placeholder="Software Engineering Student & Frontend Developer"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Bio Paragraph</label>
                <textarea
                  rows={3}
                  value={settings.bio || ''}
                  onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                  placeholder="Bio text displayed on the hero..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Button Text</label>
                  <input
                    type="text"
                    value={settings.buttonText || ''}
                    onChange={(e) => setSettings({ ...settings, buttonText: e.target.value })}
                    placeholder="View Featured Projects"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Button Link</label>
                  <input
                    type="text"
                    value={settings.buttonLink || ''}
                    onChange={(e) => setSettings({ ...settings, buttonLink: e.target.value })}
                    placeholder="#projects"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Secondary Button Text</label>
                  <input
                    type="text"
                    value={settings.secondaryCtaText || ''}
                    onChange={(e) => setSettings({ ...settings, secondaryCtaText: e.target.value })}
                    placeholder="View CV / Resume"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Home / Hero Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* 2. ABOUT & PROFILE SECTION */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                <span>About & Profile Management</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Edit the About headings, Journey narrative, Aptech education details, and vision.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={settings.aboutHeading || ''}
                    onChange={(e) => setSettings({ ...settings, aboutHeading: e.target.value })}
                    placeholder="Crafting Code with Passion & Purpose"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Section Subtitle</label>
                  <input
                    type="text"
                    value={settings.aboutSubtitle || ''}
                    onChange={(e) => setSettings({ ...settings, aboutSubtitle: e.target.value })}
                    placeholder="A look into my academic journey..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">My Journey (Tab 1)</label>
                <textarea
                  rows={4}
                  value={settings.journeyText || ''}
                  onChange={(e) => setSettings({ ...settings, journeyText: e.target.value })}
                  placeholder="Journey narrative..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Aptech Education Details (Tab 2 - Card 1)</label>
                <textarea
                  rows={3}
                  value={settings.aptechDetails || ''}
                  onChange={(e) => setSettings({ ...settings, aptechDetails: e.target.value })}
                  placeholder="Aptech diploma curriculum..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bano Qabil Generative AI Course (Tab 2 - Card 2)</label>
                <textarea
                  rows={3}
                  value={settings.scholarshipDetails || ''}
                  onChange={(e) => setSettings({ ...settings, scholarshipDetails: e.target.value })}
                  placeholder="Bano Qabil Generative AI curriculum..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vision & Goals (Tab 3)</label>
                <textarea
                  rows={3}
                  value={settings.philosophyText || ''}
                  onChange={(e) => setSettings({ ...settings, philosophyText: e.target.value })}
                  placeholder="Core engineering principles..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save About Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* 3. SKILLS SECTION */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-amber-400" />
                  <span>Skills Management</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add, edit, or remove technical skills and proficiency percentages.
                </p>
              </div>
              <button
                onClick={openNewSkillModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Skill</span>
              </button>
            </div>

            {/* Add / Edit Skill Modal */}
            {isAddingSkill && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white">
                    {editingSkill ? `Edit Skill: ${editingSkill.name}` : 'Add New Technical Skill'}
                  </h3>
                  <button onClick={() => setIsAddingSkill(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveSkill} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name *</label>
                      <input
                        type="text"
                        required
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        placeholder="e.g. Prompt Engineering"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={skillForm.badge}
                        onChange={(e) => setSkillForm({ ...skillForm, badge: e.target.value })}
                        placeholder="e.g. Learning / Intermediate"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Proficiency Level: {skillForm.level}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                      <select
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      >
                        <option value="frontend">Frontend & UI</option>
                        <option value="programming">Programming & Logic</option>
                        <option value="tools">Tools & AI</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingSkill(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      {editingSkill ? 'Update Skill' : 'Save Skill'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Current Skills Table with Working Edit & Delete Buttons */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/60 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Skill Name</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Proficiency</th>
                    <th className="px-5 py-3">Badge</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {skills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-white">{skill.name}</td>
                      <td className="px-5 py-3.5 capitalize text-amber-400">{skill.category}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: `${skill.level}%` }} />
                          </div>
                          <span className="font-semibold text-slate-300">{skill.level}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {skill.badge || 'Learning'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditSkillModal(skill)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit skill"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSkill(skill.id || skill._id, skill.name)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors cursor-pointer"
                            title="Delete skill"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. PROJECTS SECTION */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-amber-400" />
                  <span>Projects Portfolio Management</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Upload project images, write detailed descriptions, and manage live links.
                </p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Add / Edit Project Modal */}
            {isAddingProject && (
              <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white">
                    {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Portfolio Project'}
                  </h3>
                  <button onClick={() => setIsAddingProject(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  {/* Image Upload Control */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                    <label className="block text-xs font-semibold text-slate-200">
                      Project Showcase Image (Upload file or provide link)
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {projectForm.imageUrl ? (
                        <div className="w-32 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 relative group">
                          <img src={projectForm.imageUrl} alt="Project preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setProjectForm(prev => ({ ...prev, imageUrl: '' }))}
                            className="absolute top-1 right-1 p-1 rounded-md bg-red-600 text-white opacity-90 hover:opacity-100 cursor-pointer"
                            title="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-20 rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 shrink-0 text-[10px]">
                          <ImageIcon className="w-6 h-6 mb-1 text-slate-600" />
                          <span>No Image</span>
                        </div>
                      )}

                      <div className="flex-1 space-y-2 w-full">
                        <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <span>{isUploadingImage ? 'Uploading...' : 'Choose Image File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-slate-400">Supported: PNG, JPEG, SVG, WebP (up to 10MB)</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title * (Required)</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. Alberto Watch Portal"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      >
                        <option value="frontend">Frontend & UI/UX</option>
                        <option value="javascript">JavaScript Apps</option>
                        <option value="responsive">Responsive Sites</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description * (Required)</label>
                    <textarea
                      required
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Comprehensive project summary..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Live Demo URL <span className="text-amber-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        placeholder="https://example.com/demo"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        GitHub Repository URL <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={projectForm.tags}
                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                        placeholder="HTML5, CSS3, Bootstrap 5"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack (Comma-separated)</label>
                      <input
                        type="text"
                        value={projectForm.techStack}
                        onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                        placeholder="HTML5, CSS3, JavaScript"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Key Features (Comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.features}
                      onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                      placeholder="Interactive Menu, Responsive Grid, Fast Performance"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="featuredProject"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <label htmlFor="featuredProject" className="text-xs text-slate-300 cursor-pointer">
                      Mark as Featured Project on Home & Portfolio
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      {editingProject ? 'Update Project' : 'Publish Project'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects List with Working Edit and Delete Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {proj.imageUrl ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                            <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold shrink-0">
                            <Code2 className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                          <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                            {proj.category}
                          </span>
                        </div>
                      </div>

                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {proj.tags && proj.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.map((t: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] bg-slate-800 text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-slate-400 hover:underline flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditProjectModal(proj)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id || proj._id, proj.title)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. SERVICES SECTION */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>Services Management</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Configure current honest service offerings without React/MERN claims.
                </p>
              </div>
              <button
                onClick={openNewServiceModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {isAddingService && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white">
                    {editingService ? `Edit Service: ${editingService.title}` : 'Add Service Offering'}
                  </h3>
                  <button onClick={() => setIsAddingService(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title *</label>
                      <input
                        type="text"
                        required
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        placeholder="e.g. Responsive Website Development"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label>
                      <input
                        type="text"
                        value={serviceForm.badge}
                        onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                        placeholder="e.g. Frontend Core"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Service details..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Highlights (Comma-separated)</label>
                    <input
                      type="text"
                      value={serviceForm.highlights}
                      onChange={(e) => setServiceForm({ ...serviceForm, highlights: e.target.value })}
                      placeholder="Mobile-First, Semantic HTML5, Cross-browser compatibility"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingService(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      {editingService ? 'Update Service' : 'Save Service'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">{srv.title}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                      {srv.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>
                  <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditServiceModal(srv)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                      title="Edit service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(srv.id || srv._id, srv.title)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 cursor-pointer"
                      title="Delete service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. JOURNEY & MILESTONES */}
        {activeTab === 'journey' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>Learning Journey & Timeline Management</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage chronological academic and technical milestones.
                </p>
              </div>
              <button
                onClick={openNewMilestoneModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>
            </div>

            {isAddingMilestone && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white">
                    {editingMilestone ? `Edit Milestone: ${editingMilestone.title}` : 'Add Journey Milestone'}
                  </h3>
                  <button onClick={() => setIsAddingMilestone(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveMilestone} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Period *</label>
                      <input
                        type="text"
                        required
                        value={milestoneForm.period}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, period: e.target.value })}
                        placeholder="2025 - Present"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Milestone Title *</label>
                      <input
                        type="text"
                        required
                        value={milestoneForm.title}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                        placeholder="Diploma in Software Engineering"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
                      <input
                        type="text"
                        value={milestoneForm.organization}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, organization: e.target.value })}
                        placeholder="Aptech Computer Education"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={milestoneForm.description}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                      placeholder="Milestone details..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                      <select
                        value={milestoneForm.status}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, status: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Highlights (Comma-separated)</label>
                      <input
                        type="text"
                        value={milestoneForm.highlights}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, highlights: e.target.value })}
                        placeholder="HTML5, CSS3, JavaScript"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingMilestone(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      {editingMilestone ? 'Update Milestone' : 'Save Milestone'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-3">
              {milestones.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">{m.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-semibold">{m.period}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{m.organization} • {m.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditMilestoneModal(m)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                      title="Edit milestone"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMilestone(m.id || m._id, m.title)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 cursor-pointer"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. CERTIFICATES SECTION */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Certificates & Credentials Management</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage academic certificates, course recognitions, and credential records.
                </p>
              </div>
              <button
                onClick={openNewCertificateModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certificate</span>
              </button>
            </div>

            {isAddingCertificate && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white">
                    {editingCertificate ? `Edit Certificate: ${editingCertificate.title}` : 'Add Certificate'}
                  </h3>
                  <button onClick={() => setIsAddingCertificate(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveCertificate} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={certificateForm.title}
                        onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                        placeholder="Software Engineering Diploma"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Issuer *</label>
                      <input
                        type="text"
                        required
                        value={certificateForm.issuer}
                        onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                        placeholder="Aptech Computer Education"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                      <input
                        type="text"
                        value={certificateForm.date}
                        onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })}
                        placeholder="2025"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={certificateForm.description}
                      onChange={(e) => setCertificateForm({ ...certificateForm, description: e.target.value })}
                      placeholder="Certificate details..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Skills Covered (Comma-separated)</label>
                    <input
                      type="text"
                      value={certificateForm.skills}
                      onChange={(e) => setCertificateForm({ ...certificateForm, skills: e.target.value })}
                      placeholder="HTML5, CSS3, JavaScript"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCertificate(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      {editingCertificate ? 'Update Certificate' : 'Save Certificate'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                    <p className="text-xs text-amber-400 mt-0.5">{cert.issuer} • {cert.date}</p>
                    <p className="text-xs text-slate-400 mt-2">{cert.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditCertificateModal(cert)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                      title="Edit certificate"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCertificate(cert.id || cert._id, cert.title)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 cursor-pointer"
                      title="Delete certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. CONTACT INFO SECTION */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" />
                <span>Contact Info Management</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure your public email address, phone, city, and response commitments.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Direct Email Address *</label>
                  <input
                    type="email"
                    required
                    value={settings.email || settings.emails?.[0] || ''}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value, emails: [e.target.value] })}
                    placeholder="mariumtabbasum@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone || ''}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="0322-2963909"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={settings.location || ''}
                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                    placeholder="Karachi, Pakistan"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Typical Response Time</label>
                  <input
                    type="text"
                    value={settings.responseTimeText || ''}
                    onChange={(e) => setSettings({ ...settings, responseTimeText: e.target.value })}
                    placeholder="Within 24 Hours"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Section Title</label>
                  <input
                    type="text"
                    value={settings.contactHeading || ''}
                    onChange={(e) => setSettings({ ...settings, contactHeading: e.target.value })}
                    placeholder="Let's Collaborate & Connect"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Section Subtitle</label>
                  <input
                    type="text"
                    value={settings.contactSubtitle || ''}
                    onChange={(e) => setSettings({ ...settings, contactSubtitle: e.target.value })}
                    placeholder="Have a project in mind..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Info Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* 9. SOCIAL LINKS SECTION */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <span>Social Media Links Management</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Control the social profile buttons displayed across the navbar, contact section, and footer.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Profile Link</label>
                <input
                  type="text"
                  value={settings.links?.github || ''}
                  onChange={(e) => setSettings({ ...settings, links: { ...settings.links, github: e.target.value } })}
                  placeholder="https://github.com/mariumtabbasum-coder"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile Link</label>
                <input
                  type="text"
                  value={settings.links?.linkedin || ''}
                  onChange={(e) => setSettings({ ...settings, links: { ...settings.links, linkedin: e.target.value } })}
                  placeholder="https://linkedin.com/in/mariumtabbasum"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Twitter / X</label>
                  <input
                    type="text"
                    value={settings.links?.twitter || ''}
                    onChange={(e) => setSettings({ ...settings, links: { ...settings.links, twitter: e.target.value } })}
                    placeholder="https://twitter.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Facebook</label>
                  <input
                    type="text"
                    value={settings.links?.facebook || ''}
                    onChange={(e) => setSettings({ ...settings, links: { ...settings.links, facebook: e.target.value } })}
                    placeholder="https://facebook.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Instagram</label>
                  <input
                    type="text"
                    value={settings.links?.instagram || ''}
                    onChange={(e) => setSettings({ ...settings, links: { ...settings.links, instagram: e.target.value } })}
                    placeholder="https://instagram.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Social Links</span>
              </button>
            </form>
          </div>
        )}

        {/* 10. MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <span>Visitor Messages Inbox</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Read inquiries sent from your portfolio's public contact form.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                {messages.length} Total Messages
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 space-y-2">
                <MessageSquare className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <h3 className="font-bold text-white text-sm">Inbox is empty</h3>
                <p className="text-xs">No visitor messages received yet. Test it by submitting the public contact form!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{msg.name}</h4>
                          <span className="text-xs text-amber-400">({msg.email})</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-300 mt-0.5">Subject: {msg.subject || 'Direct Inquiry'}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500">{msg.date}</span>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                          className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id || msg._id, msg.name)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                      {msg.message}
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

export default AdminDashboard;
