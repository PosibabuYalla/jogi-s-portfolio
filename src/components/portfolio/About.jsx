import { motion } from 'framer-motion';
import { Brain, Rocket, Users } from 'lucide-react';

const highlights = [
  { icon: Brain,  title: 'GenAI & LLM Expertise', desc: 'LangChain, RAG Architecture, Vector DBs, OpenAI/LLaMA APIs — built and shipped in production.', color: 'from-indigo-500 to-violet-500' },
  { icon: Rocket, title: 'Fast Delivery',          desc: 'Shipped 15+ secured REST APIs at sub-200ms latency with Agentic AI accelerating dev speed 3×.', color: 'from-pink-500 to-rose-500' },
  { icon: Users,  title: 'Collaborative',          desc: 'Led 4 KT sessions, authored 12 pages of deployment docs, collaborated with PhD scholars at IIIT Hyderabad.', color: 'from-emerald-400 to-cyan-500' },
];

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-white">About <span className="text-gradient">Me</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-slate-400 leading-relaxed">
          <p>I'm <span className="font-semibold text-white">Joginaidu Surla</span>, a recent Computer Science graduate focused on building production-ready GenAI applications and scalable backend systems.</p>
          <p>Since graduating in May 2025, I've delivered a full-stack admin suite with Agentic AI acceleration, engineered 15+ secured REST APIs handling 10K+ records at sub-200ms latency, and optimized dashboard queries by 40%.</p>
          <p>Proficient in Python, FastAPI, LangChain, and MLOps fundamentals — I bridge the gap between AI research and production engineering to deliver fast, reliable, and impactful solutions.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Python', 'FastAPI', 'LangChain', 'RAG', 'Docker', 'PostgreSQL', 'CrewAI', 'MLflow'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">{t}</span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {highlights.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass-card-solid p-4 flex gap-4 items-start">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{title}</h3>
                <p className="text-slate-400 text-sm mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
