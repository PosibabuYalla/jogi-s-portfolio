import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const suggestions = [
  "What projects has Jogi built?",
  "What technologies does he use?",
  "Tell me about his experience",
  "How good is he in AI/ML?",
];

const responses = {
  "What projects has Jogi built?":
    "Jogi built SmartPDFBot — a RAG app using LangChain + ChromaDB + Groq (Llama-3) that cuts PDF search time by 85% with sub-300ms retrieval. He's also building Utsawa Admin Panel with 15+ REST APIs at sub-200ms, JWT+RBAC security, and Agentic AI that sped up dev 3×. Plus an AI/ML Microservices Suite with EfficientNet-B4 deepfake detection (92% acc.), ResNet-50 DR classification, and YOLOv8 OCR.",
  "What technologies does he use?":
    "Jogi's core stack: Python, FastAPI, LangChain, ChromaDB, RAG pipelines, EfficientNet-B4, ResNet-50, YOLOv8, Tesseract OCR, Docker, PostgreSQL, SQLAlchemy, MLflow, React, CrewAI, and OpenAI/LLaMA APIs.",
  "Tell me about his experience":
    "Jogi interned as an Assistant Python Developer at Corporate Innovative Technologies (Aug 2025–Mar 2026) deploying 4+ AI microservices under 200ms and building a RAG chatbot that reduced HR tickets by 20%. Before that, he was a Software Research Intern at iHub-Data, IIIT Hyderabad (Jun–Aug 2023) building LSTM forecasting models with MAPE < 12%.",
  "How good is he in AI/ML?":
    "Jogi is highly proficient in AI/ML. His skills include Python, LangChain, RAG Architecture, Scikit-learn, and Agentic AI (CrewAI, ReAct, Tool Calling). He has shipped production AI systems with measurable impact: 85% search time reduction, 20% HR ticket reduction, 92% deepfake detection accuracy, and 3× dev speed with Agentic AI.",
};

const fallback = "Jogi is an AI/ML Engineer specializing in GenAI, RAG pipelines, and scalable FastAPI backends. Ask me about his projects, skills, or experience!";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
        />
      ))}
    </div>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Jogi's AI assistant. Ask me anything about his skills, projects, or experience! 👋" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text) => {
    const q = text || input.trim();
    if (!q) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: 'assistant', text: responses[q] || fallback }]);
    }, 1000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-900">AI <span className="text-gradient">Assistant</span></h2>

      <div className="glass-card-solid overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-intelligence to-slate-800">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 p-0.5">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">AI ASSISTANT (Ask Me!)</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
            </p>
          </div>
        </div>

        <div className="h-[280px] overflow-y-auto p-4 space-y-3 bg-black/20">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-white/5 p-0.5">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-br-sm'
                    : 'bg-white/5 text-slate-300 border border-white/10 shadow-sm rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-white/5 p-0.5">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/10">
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all font-medium">
              {s}
            </button>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-white/10 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-indigo-500 bg-white/5 text-white placeholder-slate-500"
          />
          <button onClick={() => send()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
            <Send size={15} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
