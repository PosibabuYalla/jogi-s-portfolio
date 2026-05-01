import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mic, MicOff, X, Send, Volume2, VolumeX, RotateCcw } from 'lucide-react';

/* ── Shared knowledge base ── */
const KB = {
  greetings:     ['hi', 'hello', 'hey', 'good morning', 'good evening'],
  name:          ['who are you', 'your name', 'introduce', 'tell me about yourself', 'who is jogi', 'who is joginaidu'],
  skills:        ['skills', 'technologies', 'tech stack', 'what do you know', 'expertise', 'proficient'],
  projects:      ['projects', 'built', 'created', 'portfolio', 'work', 'applications'],
  experience:    ['experience', 'internship', 'worked', 'job', 'company', 'career'],
  education:     ['education', 'degree', 'college', 'university', 'study', 'cgpa'],
  contact:       ['contact', 'email', 'phone', 'reach', 'hire', 'available', 'location'],
  ai:            ['ai', 'machine learning', 'ml', 'llm', 'rag', 'langchain', 'generative'],
  certifications:['certification', 'certificate', 'course'],
};

const RESPONSES = {
  greetings:      "Hi! I'm Jogi's AI assistant. Ask me anything about Joginaidu Surla — his skills, projects, experience, or how to contact him!",
  name:           "Joginaidu Surla is an AI/ML Engineer based in Bengaluru. He's a CS graduate (May 2025, CGPA 7.8) from KIET, specializing in GenAI, RAG pipelines, LLM applications, and scalable FastAPI microservices.",
  skills:         "Jogi's skills: Python, LangChain, RAG Architecture, SQL, Scikit-learn, Docker, FastAPI, MLflow, and Agentic AI with CrewAI & ReAct. He also works with OpenAI, LLaMA, ChromaDB, and PostgreSQL.",
  projects:       "Jogi built: (1) SmartPDFBot — RAG app cutting PDF search time by 85% using LangChain + ChromaDB + Groq Llama-3. (2) Utsawa Admin Panel — 15+ REST APIs at sub-200ms, JWT+RBAC, Agentic AI 3× dev speed. (3) AI/ML Microservices Suite — EfficientNet-B4 deepfake detection (92% acc.), ResNet-50 DR classification, YOLOv8 OCR.",
  experience:     "Jogi interned at Corporate Innovative Technologies (Aug 2025–Mar 2026) deploying 4+ AI microservices under 200ms and building a RAG chatbot that cut HR tickets by 20%. Earlier at iHub-Data, IIIT Hyderabad (Jun–Aug 2023) he built LSTM forecasting models with MAPE < 12%.",
  education:      "BTech in Computer Science & Engineering from Kakinada Institute of Engineering and Technology (Nov 2021 – May 2025), CGPA: 7.8/10.",
  contact:        "Reach Jogi at joginaidu1025@gmail.com or +91-9014313819. He's in Bengaluru, Karnataka and actively seeking AI/ML opportunities.",
  ai:             "Jogi is production-experienced in GenAI: LangChain, RAG, ChromaDB, OpenAI/LLaMA APIs, CrewAI, ReAct framework. He's achieved 85% search time reduction, 20% HR ticket reduction, and 92% deepfake detection accuracy in real deployments.",
  certifications: "Jogi holds a Data Science Full Stack Certification from PW Skills (Physics Wallah) and a Data Analysis Certification from Infosys.",
  fallback:       "I can tell you about Jogi's skills, projects, experience, education, AI expertise, certifications, or contact info. What would you like to know?",
};

function matchIntent(text) {
  const lower = text.toLowerCase();
  for (const [intent, keywords] of Object.entries(KB)) {
    if (keywords.some(k => lower.includes(k))) return intent;
  }
  return 'fallback';
}

/* ── Waveform ── */
function Waveform({ active }) {
  return (
    <div className="flex items-center gap-[2px] h-5">
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="w-0.5 rounded-full bg-indigo-400"
          animate={active ? { height: ['3px', `${6 + Math.random() * 12}px`, '3px'] } : { height: '3px' }}
          transition={{ duration: 0.35 + Math.random() * 0.3, repeat: active ? Infinity : 0, delay: i * 0.06 }}
        />
      ))}
    </div>
  );
}

/* ── Chat Panel ── */
function ChatPanel() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Jogi's AI assistant. Ask me anything! 👋" },
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
      setMessages(m => [...m, { role: 'assistant', text: RESPONSES[matchIntent(q)] }]);
    }, 900);
  };

  const chips = ["What projects?", "His skills?", "Experience?", "Contact info?"];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-1.5`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-white/5 p-0.5">
                <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-br-sm'
                : 'bg-white/10 text-slate-300 border border-white/10 rounded-bl-sm'
            }`}>{msg.text}</div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex items-end gap-1.5">
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-white/5 p-0.5">
              <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1">
              {[0,1,2].map(i => (
                <motion.span key={i} className="w-1 h-1 rounded-full bg-slate-400"
                  animate={{ y: [0,-4,0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i*0.15 }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Chips */}
      <div className="px-3 pb-2 flex flex-wrap gap-1">
        {chips.map(c => (
          <button key={c} onClick={() => send(c)}
            className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all">
            {c}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 pb-3 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask me anything..."
          className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500" />
        <button onClick={() => send()}
          className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}

/* ── Voice Panel ── */
function VoicePanel() {
  const [state, setState]       = useState('idle'); // idle | listening | thinking | speaking
  const [transcript, setTranscript] = useState('');
  const [response, setResponse]     = useState('');
  const [muted, setMuted]           = useState(false);
  const [supported, setSupported]   = useState(true);
  const recognitionRef = useRef(null);
  const synthRef       = useRef(window.speechSynthesis);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
    const rec = new SR();
    rec.continuous = false; rec.interimResults = false; rec.lang = 'en-US';
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      setState('thinking');
      setTimeout(() => {
        const reply = RESPONSES[matchIntent(text)];
        setResponse(reply);
        setState('speaking');
        if (!muted) {
          synthRef.current.cancel();
          const utter = new SpeechSynthesisUtterance(reply);
          utter.rate = 0.95; utter.pitch = 1.05;
          const voices = synthRef.current.getVoices();
          const v = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
          if (v) utter.voice = v;
          utter.onend = () => setState('idle');
          synthRef.current.speak(utter);
        } else setState('idle');
      }, 600);
    };
    rec.onerror = () => setState('idle');
    recognitionRef.current = rec;
  }, [muted]);

  const startListening = () => {
    if (state !== 'idle') return;
    synthRef.current.cancel();
    setTranscript(''); setResponse('');
    setState('listening');
    recognitionRef.current?.start();
  };

  const stop = () => {
    recognitionRef.current?.stop();
    synthRef.current.cancel();
    setState('idle');
  };

  const stateColors = {
    idle:      'from-slate-600 to-slate-700',
    listening: 'from-indigo-500 to-violet-600',
    thinking:  'from-pink-500 to-rose-600',
    speaking:  'from-emerald-500 to-cyan-500',
  };

  const stateLabel = { idle: 'Tap mic to speak', listening: 'Listening...', thinking: 'Thinking...', speaking: 'Speaking...' };

  if (!supported) return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
      <MicOff size={32} className="text-slate-500" />
      <p className="text-slate-400 text-xs text-center">Voice not supported. Use Chrome or Edge.</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-between h-full py-4 px-3">
      {/* Orb */}
      <div className="flex flex-col items-center gap-3 flex-1 justify-center">
        <div className="relative flex items-center justify-center">
          {state !== 'idle' && (
            <motion.div className="absolute w-20 h-20 rounded-full border border-indigo-400/40"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }} />
          )}
          <motion.button
            onClick={state === 'idle' ? startListening : stop}
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${stateColors[state]} flex items-center justify-center shadow-lg border border-white/10`}
            animate={state !== 'idle' ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 1.2, repeat: state !== 'idle' ? Infinity : 0 }}
          >
            {state === 'idle'      && <Mic size={22} className="text-white" />}
            {state === 'listening' && <Mic size={22} className="text-white" />}
            {state === 'thinking'  && (
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-white"
                    animate={{ y: [0,-5,0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i*0.15 }} />
                ))}
              </div>
            )}
            {state === 'speaking'  && <Volume2 size={22} className="text-white" />}
          </motion.button>
        </div>

        <Waveform active={state === 'listening' || state === 'speaking'} />
        <p className="text-xs text-slate-400">{stateLabel[state]}</p>
      </div>

      {/* Transcript / Response */}
      {(transcript || response) && (
        <div className="w-full space-y-2 mb-2">
          {transcript && (
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <p className="text-[10px] text-slate-500 mb-0.5">You said:</p>
              <p className="text-xs text-slate-300">{transcript}</p>
            </div>
          )}
          {response && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2 max-h-24 overflow-y-auto">
              <p className="text-[10px] text-indigo-400 mb-0.5">Jogi's Agent:</p>
              <p className="text-xs text-slate-300">{response}</p>
            </div>
          )}
        </div>
      )}

      {/* Mute + Reset */}
      <div className="flex gap-2">
        <button onClick={() => { setMuted(m => !m); synthRef.current.cancel(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs transition-colors">
          {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={() => { stop(); setTranscript(''); setResponse(''); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs transition-colors">
          <RotateCcw size={12} /> Reset
        </button>
      </div>
    </div>
  );
}

/* ── Main Floating Widget ── */
export default function FloatingWidget({ forceOpen = false }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab]   = useState('chat');

  useEffect(() => {
    if (forceOpen) { setOpen(true); setTab('chat'); }
  }, [forceOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 h-[460px] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(160deg,#161b27 0%,#1a0d2e 100%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-pink-500/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 p-0.5">
                  <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Jogi's AI Assistant</p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-white/10">
              {[
                { id: 'chat',  label: 'Chat',  icon: MessageCircle },
                { id: 'voice', label: 'Voice', icon: Mic },
              ].map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all ${
                    tab === id
                      ? 'text-white border-b-2 border-indigo-500 bg-indigo-500/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-hidden">
              {tab === 'chat'  && <ChatPanel />}
              {tab === 'voice' && <VoicePanel />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-2xl shadow-indigo-500/40 border border-white/20"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="mc" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
