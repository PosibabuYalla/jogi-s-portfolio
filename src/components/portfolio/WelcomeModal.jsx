import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mic, Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeModal({ onOpenWidget }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setShow(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleAction = () => {
    setShow(false);
    setTimeout(() => onOpenWidget(), 300);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.05 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md pointer-events-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
              style={{ background: 'linear-gradient(145deg, #161b27 0%, #1a0d2e 60%, #0d1117 100%)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Glow blobs */}
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

              {/* Close */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={15} />
              </button>

              <div className="relative px-8 pt-10 pb-8 space-y-6">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
                    <Sparkles size={11} /> AI-Powered Assistant
                  </span>
                </motion.div>

                {/* Avatar + heading */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-center space-y-4"
                >
                  {/* Animated orb avatar */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/40 to-pink-500/40 blur-xl"
                      />
                      <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl border-2 border-white/10 bg-white/5 p-1">
                        <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-1.5 rounded-full border border-dashed border-indigo-400/30"
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-extrabold text-white leading-tight">
                      Curious about{' '}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-400">
                        Joginaidu?
                      </span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Don't just scroll — <span className="text-white font-medium">ask me anything</span> about his skills, projects, and experience. I'll answer instantly.
                    </p>
                  </div>
                </motion.div>

                {/* Feature pills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {[
                    { icon: MessageCircle, label: 'Chat with AI', desc: 'Type your questions', color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
                    { icon: Mic,           label: 'Talk by Voice', desc: 'Speak naturally', color: 'from-pink-500/20 to-pink-600/10',   border: 'border-pink-500/20',   text: 'text-pink-400' },
                  ].map(({ icon: Icon, label, desc, color, border, text }) => (
                    <div key={label} className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-3.5 space-y-1.5`}>
                      <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${text}`}>
                        <Icon size={16} />
                      </div>
                      <p className="text-white text-xs font-semibold">{label}</p>
                      <p className="text-slate-500 text-[11px]">{desc}</p>
                    </div>
                  ))}
                </motion.div>

                {/* Sample questions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  className="space-y-2"
                >
                  <p className="text-[11px] text-slate-500 font-medium">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['"What projects has he built?"', '"What are his skills?"', '"How to contact him?"'].map(q => (
                      <span key={q} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">{q}</span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <button
                    onClick={handleAction}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/30"
                  >
                    <Sparkles size={15} /> Try the AI Assistant <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => setShow(false)}
                    className="w-full py-2.5 rounded-2xl text-slate-500 text-xs hover:text-slate-300 transition-colors"
                  >
                    Maybe later — I'll explore on my own
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
