import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const info = [
  { icon: Mail,   label: 'Email',    value: 'joginaidu1025@gmail.com', color: 'from-indigo-500 to-violet-500' },
  { icon: Phone,  label: 'Phone',    value: '+91-9014313819',          color: 'from-pink-500 to-rose-500' },
  { icon: MapPin, label: 'Location', value: 'Bengaluru, Karnataka',    color: 'from-emerald-400 to-cyan-500' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-indigo-500 bg-white/5 text-white placeholder-slate-500";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">Get In <span className="text-gradient">Touch</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-slate-400 leading-relaxed">I'm actively seeking opportunities in AI/ML and backend engineering. Whether it's a full-time role, collaboration, or just a chat about AI — feel free to reach out!</p>
          {info.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="glass-card-solid p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="glass-card-solid p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Name</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inputCls} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Email</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className={inputCls} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Message</label>
            <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your project or opportunity..." className={`${inputCls} resize-none`} />
          </div>
          <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25">
            {sent ? '✓ Message Sent!' : <><Send size={15} /> Send Message</>}
          </button>
        </form>
      </div>
    </motion.section>
  );
}
