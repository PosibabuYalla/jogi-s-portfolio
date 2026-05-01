import { motion } from 'framer-motion';
import { Zap, Cpu, Database, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Zap,        value: '15+',  label: 'REST APIs Built',           color: 'from-indigo-500 to-violet-500' },
  { icon: Cpu,        value: '4+',   label: 'AI Microservices Deployed', color: 'from-pink-500 to-rose-500' },
  { icon: Database,   value: '10K+', label: 'Records Handled',           color: 'from-emerald-400 to-cyan-500' },
  { icon: TrendingUp, value: '40%',  label: 'Query Optimization',        color: 'from-amber-400 to-orange-500' },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {stats.map(({ icon: Icon, value, label, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass-card-solid p-5 flex flex-col gap-3"
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">{value}</p>
            <p className="text-xs text-slate-400 font-medium leading-tight mt-0.5">{label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
