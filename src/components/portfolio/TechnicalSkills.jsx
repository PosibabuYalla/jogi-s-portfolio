import { useState } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import SkillBar from './SkillBar';

const categories = ['All Skills', 'Programming & Data', 'ML & Statistics', 'GenAI & LLM Stack', 'Agentic AI', 'MLOps & Deployment'];

const allSkills = [
  { name: 'Python', value: 95, cat: 'Programming & Data' },
  { name: 'SQL', value: 90, cat: 'Programming & Data' },
  { name: 'Pandas / NumPy', value: 90, cat: 'Programming & Data' },
  { name: 'Scikit-learn', value: 88, cat: 'ML & Statistics' },
  { name: 'LangChain', value: 92, cat: 'GenAI & LLM Stack' },
  { name: 'RAG Architecture', value: 90, cat: 'GenAI & LLM Stack' },
  { name: 'Agentic AI', value: 85, cat: 'Agentic AI' },
  { name: 'Docker / FastAPI / MLflow', value: 88, cat: 'MLOps & Deployment' },
];

const radarData = [
  { subject: 'Python', A: 95 }, { subject: 'SQL', A: 90 },
  { subject: 'ML & Stats', A: 88 }, { subject: 'GenAI & LLM', A: 91 },
  { subject: 'Agentic AI', A: 85 }, { subject: 'MLOps', A: 88 },
];

export default function TechnicalSkills() {
  const [active, setActive] = useState('All Skills');
  const filtered = active === 'All Skills' ? allSkills : allSkills.filter(s => s.cat === active);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">Technical <span className="text-gradient">Skills</span></h2>
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              active === cat
                ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card-solid p-6 space-y-4">
          {filtered.map(s => <SkillBar key={s.name} name={s.name} value={s.value} />)}
        </div>
        <div className="glass-card-solid p-6 flex flex-col items-center justify-center">
          <p className="text-sm font-semibold text-slate-400 mb-4">Skills Radar</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff15" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Radar dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.25} animationDuration={1500} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.section>
  );
}
