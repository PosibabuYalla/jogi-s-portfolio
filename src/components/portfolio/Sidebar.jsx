import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Code2, FolderOpen, Briefcase, Award, GraduationCap,
  BarChart2, Bot, Mail, Download, Menu, X,
} from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const navItems = [
  { id: 'home',           label: 'Home',           icon: Home },
  { id: 'about',          label: 'About',          icon: User },
  { id: 'skills',         label: 'Skills',         icon: Code2 },
  { id: 'projects',       label: 'Projects',       icon: FolderOpen },
  { id: 'experience',     label: 'Experience',     icon: Briefcase },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'education',      label: 'Education',      icon: GraduationCap },
  { id: 'visualizations', label: 'Visualizations', icon: BarChart2 },
  { id: 'assistant',      label: 'AI Assistant',   icon: Bot },
  { id: 'contact',        label: 'Contact',        icon: Mail },
];

function SidebarContent({ active, onNav }) {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-xl object-contain bg-white/5 p-1 flex-shrink-0" />
        <div>
          <p className="text-white font-semibold text-xs leading-tight">JOGINAIDU SURLA</p>
          <p className="text-pink-400 text-[10px] font-medium tracking-wide">AI/ML ENGINEER</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active === id
                ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-center gap-4">
          <a href="https://github.com/Jo9gi" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <GithubIcon />
          </a>
          <a href="https://www.linkedin.com/in/joginaidu-surla/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <LinkedinIcon />
          </a>
          <a href="mailto:joginaidu1025@gmail.com" className="text-slate-400 hover:text-white transition-colors">
            <Mail size={18} />
          </a>
        </div>
        <a
          href="/Joginaidu_Surla.pdf"
          download="Joginaidu_Surla.pdf"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Download size={14} /> Download CV
        </a>
      </div>
    </div>
  );
}

export default function Sidebar({ active, onNav }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[220px] flex-col z-40" style={{background:'linear-gradient(160deg,#0D1117 0%,#1e0a3c 50%,#0D1117 100%)'}}>
        <SidebarContent active={active} onNav={onNav} />
      </aside>

      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-white rounded-lg" style={{background:'#1e0a3c'}}
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -220 }} animate={{ x: 0 }} exit={{ x: -220 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="md:hidden fixed left-0 top-0 h-screen w-[220px] z-50" style={{background:'linear-gradient(160deg,#0D1117 0%,#1e0a3c 50%,#0D1117 100%)'}}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X size={18} />
              </button>
              <SidebarContent active={active} onNav={(id) => { onNav(id); setOpen(false); }} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
