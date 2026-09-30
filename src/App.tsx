import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { LearningJourney } from './components/LearningJourney';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    const token = localStorage.getItem('admin_token');
    if (token) setAdminToken(token);

    try {
      const saved = localStorage.getItem('theme') || localStorage.getItem('marium_theme');
      const initial = (saved === 'light' || saved === 'dark') ? saved : 'dark';
      setTheme(initial);
      applyTheme(initial);
    } catch (e) {
      applyTheme('dark');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (newTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('marium_theme', newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  // Check if viewing Admin route
  if (currentPath.startsWith('/admin')) {
    if (!adminToken) {
      return <AdminLogin onLoginSuccess={(token) => setAdminToken(token)} />;
    }
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <LearningJourney />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
