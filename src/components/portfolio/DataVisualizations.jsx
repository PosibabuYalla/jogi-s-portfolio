import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const latencyData = [
  { month: 'Jan', ms: 180 }, { month: 'Feb', ms: 220 },
  { month: 'Mar', ms: 150 }, { month: 'Apr', ms: 280 }, { month: 'May', ms: 120 },
];

const skillsData = [
  { name: 'Expert',       value: 40, color: '#6366F1' },
  { name: 'Advanced',     value: 35, color: '#EC4899' },
  { name: 'Intermediate', value: 15, color: '#10B981' },
  { name: 'Beginner',     value: 10, color: '#F59E0B' },
];

const impacts = [
  { label: 'Search Time Reduced',    value: '85%', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { label: 'Query Latency Improved', value: '40%', color: 'text-pink-400',   bg: 'bg-pink-500/10 border-pink-500/20' },
  { label: 'HR Tickets Reduced',     value: '20%', color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { label: 'Dev Speed Increased',    value: '3x',  color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20' },
];

const CustomLabel = ({ cx, cy }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
    <tspan x={cx} dy="-0.3em" fontSize="18" fontWeight="700" fill="#e2e8f0">90%</tspan>
    <tspan x={cx} dy="1.4em" fontSize="11" fill="#94a3b8">Overall</tspan>
  </text>
);

export default function DataVisualizations() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">Data <span className="text-gradient">Visualizations</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card-solid p-5 space-y-3">
          <p className="font-semibold text-slate-300 text-sm">API Performance (Latency)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={latencyData} barSize={28}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="ms" />
              <Tooltip contentStyle={{ background: '#161b27', border: '1px solid #ffffff15', borderRadius: 8, color: '#e2e8f0' }} formatter={v => [`${v}ms`, 'Latency']} />
              <Bar dataKey="ms" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card-solid p-5 space-y-3">
          <p className="font-semibold text-slate-300 text-sm">Skills Proficiency</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={skillsData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" labelLine={false} label={<CustomLabel />}>
                {skillsData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card-solid p-5 space-y-3">
          <p className="font-semibold text-slate-300 text-sm">Projects Impact</p>
          <div className="grid grid-cols-2 gap-3 h-[200px] content-center">
            {impacts.map(({ label, value, color, bg }) => (
              <div key={label} className={`rounded-xl p-3 text-center border ${bg}`}>
                <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
