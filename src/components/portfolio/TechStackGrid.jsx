import { motion } from 'framer-motion';
import { Code2, Database, BarChart2, Brain, Link, Cpu, GitBranch, Container, FlaskConical, Layers, Network, Workflow, GitFork, Server, Box } from 'lucide-react';

const stack = [
  { icon: Code2,        name: 'Python',      color: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
  { icon: Database,     name: 'SQL',          color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: BarChart2,    name: 'Pandas',       color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: Layers,       name: 'NumPy',        color: 'text-blue-400',   bg: 'bg-blue-500/10' },
  { icon: FlaskConical, name: 'Scikit-learn', color: 'text-rose-400',   bg: 'bg-rose-500/10' },
  { icon: Link,         name: 'LangChain',    color: 'text-emerald-400',bg: 'bg-emerald-500/10' },
  { icon: Box,          name: 'ChromaDB',     color: 'text-pink-400',   bg: 'bg-pink-500/10' },
  { icon: Brain,        name: 'OpenAI',       color: 'text-slate-300',  bg: 'bg-slate-500/10' },
  { icon: Cpu,          name: 'LLaMA',        color: 'text-amber-400',  bg: 'bg-amber-500/10' },
  { icon: Workflow,     name: 'CrewAI',       color: 'text-fuchsia-400',bg: 'bg-fuchsia-500/10' },
  { icon: Server,       name: 'FastAPI',      color: 'text-teal-400',   bg: 'bg-teal-500/10' },
  { icon: Container,    name: 'Docker',       color: 'text-sky-400',    bg: 'bg-sky-500/10' },
  { icon: Network,      name: 'MLflow',       color: 'text-cyan-400',   bg: 'bg-cyan-500/10' },
  { icon: GitBranch,    name: 'Git',          color: 'text-red-400',    bg: 'bg-red-500/10' },
  { icon: GitFork,      name: 'GitHub',       color: 'text-slate-300',  bg: 'bg-slate-500/10' },
];

export default function TechStackGrid() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">Tech <span className="text-gradient">Stack</span></h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {stack.map(({ icon: Icon, name, color, bg }) => (
          <motion.div key={name} whileHover={{ y: -4, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}
            className="glass-card-solid p-4 flex flex-col items-center gap-2 cursor-default">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center border border-white/5`}>
              <Icon size={20} className={color} />
            </div>
            <span className="text-xs font-medium text-slate-400 text-center">{name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
