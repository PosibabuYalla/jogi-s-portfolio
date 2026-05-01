import { Suspense, useRef, lazy, Component } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, ArrowRight } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

/* ── Error boundary so a Three.js crash never blanks the page ── */
class ErrorBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return <BrainFallback />;
    return this.props.children;
  }
}

/* ── Fallback shown while loading or on error ── */
function BrainFallback() {
  return (
    <div className="w-[380px] h-[380px] rounded-3xl bg-gradient-to-br from-intelligence to-slate-800 flex items-center justify-center shadow-2xl border border-white/10">
      <div className="text-center space-y-4">
        <div className="text-7xl">🧠</div>
        <p className="text-white font-bold text-lg">AI / ML</p>
        <p className="text-indigo-400 text-sm font-medium">Engineer</p>
        <div className="flex justify-center gap-2 flex-wrap px-4">
          {['LangChain', 'RAG', 'FastAPI', 'LLM'].map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Lazy-loaded 3D canvas ── */
const Brain3D = lazy(() =>
  import('./Brain3D').catch(() => ({ default: BrainFallback }))
);

export default function HeroSection({ onNav }) {
  return (
    <section className="min-h-[85vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Left */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="space-y-6">
          <div>
            <motion.span
              {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-indigo-500 font-medium text-sm tracking-widest uppercase mb-3"
            >
              Hello, I'm
            </motion.span>
            <motion.h1
              {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            >
              Joginaidu{' '}
              <span className="text-gradient">Surla</span>
            </motion.h1>
          </div>

          <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="text-xl font-semibold text-indigo-500">
            AI/ML Engineer | Generative AI Enthusiast
          </motion.p>

          <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="text-slate-400 leading-relaxed max-w-lg">
            Recent CS graduate building production-ready GenAI applications and scalable backend systems. Delivered a full-stack admin suite with Agentic AI acceleration, 15+ secured REST APIs at sub-200ms latency, and 40% dashboard query optimization.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Phone size={14} className="text-indigo-500" /> +91-9014313819</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-pink-500" /> Bengaluru, Karnataka</span>
            <span className="flex items-center gap-1.5"><Mail size={14} className="text-amber-500" /> joginaidu1025@gmail.com</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap gap-3">
            <button
              onClick={() => onNav('projects')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
            >
              View Projects <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNav('contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-indigo-500 text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition-all"
            >
              <Mail size={16} /> Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Right – 3D Brain */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex justify-center items-center relative"
        >
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-indigo-400/25 to-pink-400/25 blur-3xl animate-pulse-glow" />

          <div className="relative w-[380px] h-[380px]">
            <ErrorBoundary>
              <Suspense fallback={<BrainFallback />}>
                <Brain3D />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Floating chips */}
          {[
            { label: 'LangChain', pos: 'top-6 right-4',    color: 'text-indigo-400 border-indigo-500/30', delay: 0 },
            { label: 'RAG',       pos: 'bottom-10 right-6', color: 'text-pink-400 border-pink-500/30',    delay: 0.5 },
            { label: 'FastAPI',   pos: 'bottom-16 left-4',  color: 'text-emerald-400 border-emerald-500/30', delay: 1 },
            { label: 'LLM',       pos: 'top-12 left-2',     color: 'text-amber-400 border-amber-500/30',  delay: 1.5 },
          ].map(({ label, pos, color, delay }) => (
            <motion.div
              key={label}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
              className={`absolute ${pos} px-3 py-1.5 rounded-full bg-white/5 backdrop-blur border shadow-lg text-xs font-semibold ${color}`}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
