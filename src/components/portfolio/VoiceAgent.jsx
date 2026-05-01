import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw } from 'lucide-react';

/* ── Knowledge base about Jogi ── */
const KB = {
  greetings: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'howdy'],
  name: ['who are you', 'your name', 'introduce yourself', 'tell me about yourself', 'who is jogi', 'who is joginaidu'],
  skills: ['skills', 'technologies', 'tech stack', 'what do you know', 'expertise', 'proficient'],
  projects: ['projects', 'built', 'created', 'portfolio', 'work', 'applications', 'apps'],
  experience: ['experience', 'internship', 'worked', 'job', 'company', 'career'],
  education: ['education', 'degree', 'college', 'university', 'study', 'studied', 'cgpa', 'gpa'],
  contact: ['contact', 'email', 'phone', 'reach', 'hire', 'available', 'location'],
  ai: ['ai', 'machine learning', 'ml', 'deep learning', 'llm', 'rag', 'langchain', 'generative'],
  certifications: ['certification', 'certificate', 'course', 'training'],
};

const RESPONSES = {
  greetings: "Hello! I'm Jogi's AI voice assistant. I'm here to tell you all about Joginaidu Surla — an AI and ML engineer based in Bengaluru. Feel free to ask me anything about his skills, projects, experience, or how to get in touch!",
  name: "Joginaidu Surla is a passionate AI and ML Engineer based in Bengaluru, Karnataka. He's a recent Computer Science graduate from Kakinada Institute of Engineering and Technology, with a CGPA of 7.8. Since graduating in May 2025, he has been building production-ready Generative AI applications and scalable backend systems. He specializes in RAG pipelines, LLM applications, and FastAPI microservices.",
  skills: "Jogi is highly skilled across multiple domains. In programming, he excels in Python, SQL, Pandas, and NumPy. For machine learning, he uses Scikit-learn, hypothesis testing, and feature engineering. In the Generative AI space, he's proficient in LangChain, RAG Architecture, ChromaDB, and OpenAI and LLaMA APIs. He also works with Agentic AI frameworks like CrewAI and ReAct. For deployment, he uses Docker, FastAPI, MLflow, Git, and GitHub.",
  projects: "Jogi has built some impressive projects! First, SmartPDFBot — a RAG-powered document assistant using LangChain, ChromaDB, and Groq's Llama-3 that reduces PDF search time by 85% with sub-300 millisecond retrieval. Second, Utsawa Admin Panel — a full-stack system with 15 plus REST APIs handling 10,000 plus records at sub-200 millisecond response times, secured with JWT and RBAC, and powered by Agentic AI that sped up development 3 times. Third, an AI and ML Microservices Suite featuring EfficientNet-B4 deepfake detection at 92% accuracy, ResNet-50 diabetic retinopathy classification, and YOLOv8 plus Tesseract OCR for ID card extraction.",
  experience: "Jogi has two key internship experiences. At Corporate Innovative Technologies from August 2025 to March 2026, he deployed 4 plus AI microservices under 200 milliseconds, built a RAG chatbot that reduced HR tickets by 20%, and led 4 knowledge transfer sessions. Earlier, at iHub-Data at IIIT Hyderabad from June to August 2023, he built an LSTM forecasting model achieving MAPE under 12%, and created Pandas ETL pipelines that cut data preparation time by 30%.",
  education: "Jogi holds a Bachelor of Technology in Computer Science and Engineering from Kakinada Institute of Engineering and Technology, Kakinada. He graduated in May 2025 with a CGPA of 7.8 out of 10.",
  contact: "You can reach Joginaidu Surla at joginaidu1025 at gmail dot com, or call him at plus 91 dash 9014313819. He's currently based in Bengaluru, Karnataka, and is actively seeking opportunities in AI, ML, and backend engineering.",
  ai: "Jogi is deeply passionate about Generative AI and LLMs. He has hands-on production experience with LangChain, RAG pipelines, ChromaDB vector databases, and Agentic AI frameworks like CrewAI and ReAct. He has built systems that achieved 85% search time reduction, 20% HR ticket reduction, and 92% deepfake detection accuracy. He's proficient in OpenAI and LLaMA APIs and has deployed multiple AI microservices in production environments.",
  certifications: "Jogi holds two certifications — a Data Science Full Stack Certification from PW Skills, also known as Physics Wallah, and a Data Analysis Certification from Infosys.",
  fallback: "That's a great question! I can tell you about Jogi's skills, projects, work experience, education, AI expertise, certifications, or how to contact him. What would you like to know?",
};

function matchIntent(text) {
  const lower = text.toLowerCase();
  for (const [intent, keywords] of Object.entries(KB)) {
    if (keywords.some(k => lower.includes(k))) return intent;
  }
  return 'fallback';
}

/* ── Animated waveform bars ── */
function Waveform({ active, color = '#6366F1' }) {
  return (
    <div className="flex items-center gap-[3px] h-8">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ background: color }}
          animate={active ? {
            height: ['4px', `${8 + Math.random() * 24}px`, '4px'],
          } : { height: '4px' }}
          transition={{
            duration: 0.4 + Math.random() * 0.4,
            repeat: active ? Infinity : 0,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ── Pulsing orb ── */
function VoiceOrb({ state }) {
  const colors = {
    idle:      { bg: 'from-slate-700 to-slate-800', ring: 'border-slate-600', glow: '' },
    listening: { bg: 'from-indigo-600 to-violet-600', ring: 'border-indigo-400', glow: 'shadow-indigo-500/50' },
    thinking:  { bg: 'from-pink-600 to-rose-600',   ring: 'border-pink-400',   glow: 'shadow-pink-500/50' },
    speaking:  { bg: 'from-emerald-500 to-cyan-500', ring: 'border-emerald-400', glow: 'shadow-emerald-500/50' },
  };
  const c = colors[state];

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse rings */}
      {state !== 'idle' && (
        <>
          <motion.div
            className={`absolute w-36 h-36 rounded-full border ${c.ring} opacity-30`}
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className={`absolute w-28 h-28 rounded-full border ${c.ring} opacity-40`}
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}
      {/* Core orb */}
      <motion.div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${c.bg} flex items-center justify-center shadow-2xl ${c.glow} border-2 ${c.ring}`}
        animate={state !== 'idle' ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: state !== 'idle' ? Infinity : 0 }}
      >
        {state === 'idle'      && <Mic size={28} className="text-slate-400" />}
        {state === 'listening' && <Mic size={28} className="text-white" />}
        {state === 'thinking'  && (
          <motion.div className="flex gap-1">
            {[0,1,2].map(i => (
              <motion.span key={i} className="w-2 h-2 rounded-full bg-white"
                animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
            ))}
          </motion.div>
        )}
        {state === 'speaking'  && <Volume2 size={28} className="text-white" />}
      </motion.div>
    </div>
  );
}

const STATE_LABELS = {
  idle:      'Click the mic to start',
  listening: 'Listening...',
  thinking:  'Thinking...',
  speaking:  'Speaking...',
};

export default function VoiceAgent() {
  const [agentState, setAgentState] = useState('idle');
  const [transcript, setTranscript]   = useState('');
  const [response, setResponse]       = useState('');
  const [history, setHistory]         = useState([]);
  const [muted, setMuted]             = useState(false);
  const [supported, setSupported]     = useState(true);

  const recognitionRef = useRef(null);
  const synthRef       = useRef(window.speechSynthesis);
  const utteranceRef   = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setSupported(false); return; }

    const rec = new SpeechRecognition();
    rec.continuous      = false;
    rec.interimResults  = false;
    rec.lang            = 'en-US';

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      setAgentState('thinking');

      setTimeout(() => {
        const intent = matchIntent(text);
        const reply  = RESPONSES[intent];
        setResponse(reply);
        setHistory(h => [...h, { user: text, agent: reply }]);
        setAgentState('speaking');
        if (!muted) speak(reply);
        else setAgentState('idle');
      }, 600);
    };

    rec.onerror = () => setAgentState('idle');
    rec.onend   = () => { if (agentState === 'listening') setAgentState('idle'); };

    recognitionRef.current = rec;
  }, [muted]);

  const speak = (text) => {
    synthRef.current.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate   = 0.95;
    utter.pitch  = 1.05;
    utter.volume = 1;

    // Pick a good English voice if available
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
      || voices.find(v => v.lang === 'en-US')
      || voices[0];
    if (preferred) utter.voice = preferred;

    utter.onend = () => setAgentState('idle');
    utteranceRef.current = utter;
    synthRef.current.speak(utter);
  };

  const startListening = () => {
    if (agentState !== 'idle') return;
    synthRef.current.cancel();
    setTranscript('');
    setResponse('');
    setAgentState('listening');
    recognitionRef.current?.start();
  };

  const stopAll = () => {
    recognitionRef.current?.stop();
    synthRef.current.cancel();
    setAgentState('idle');
  };

  const reset = () => {
    stopAll();
    setHistory([]);
    setTranscript('');
    setResponse('');
  };

  const suggestions = [
    'Who is Joginaidu?',
    'What are his skills?',
    'Tell me about his projects',
    'What is his experience?',
    'How can I contact him?',
  ];

  const handleSuggestion = (text) => {
    if (agentState !== 'idle') return;
    setTranscript(text);
    setAgentState('thinking');
    setTimeout(() => {
      const intent = matchIntent(text);
      const reply  = RESPONSES[intent];
      setResponse(reply);
      setHistory(h => [...h, { user: text, agent: reply }]);
      setAgentState('speaking');
      if (!muted) speak(reply);
      else setAgentState('idle');
    }, 600);
  };

  if (!supported) {
    return (
      <div className="glass-card-solid p-8 text-center space-y-3">
        <MicOff size={40} className="text-slate-500 mx-auto" />
        <p className="text-white font-semibold">Voice not supported</p>
        <p className="text-slate-400 text-sm">Your browser doesn't support the Web Speech API. Try Chrome or Edge.</p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Voice <span className="text-gradient">AI Agent</span></h2>
        <div className="flex items-center gap-2">
          <button onClick={() => { setMuted(m => !m); synthRef.current.cancel(); }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button onClick={reset}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="glass-card-solid overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">JS</div>
            <div>
              <p className="text-white text-sm font-semibold">Jogi's Voice AI Agent</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className={`w-1.5 h-1.5 rounded-full ${agentState === 'idle' ? 'bg-slate-500' : 'bg-emerald-400 animate-pulse'}`} />
                {STATE_LABELS[agentState]}
              </div>
            </div>
          </div>
          {muted && <span className="text-xs text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-full">Muted</span>}
        </div>

        {/* Main orb area */}
        <div className="px-6 py-8 flex flex-col items-center gap-6">
          <VoiceOrb state={agentState} />

          {/* Waveform */}
          <div className="h-8 flex items-center">
            <Waveform
              active={agentState === 'listening' || agentState === 'speaking'}
              color={agentState === 'speaking' ? '#10B981' : '#6366F1'}
            />
          </div>

          {/* Mic button */}
          <button
            onClick={agentState === 'idle' ? startListening : stopAll}
            className={`px-8 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center gap-2 ${
              agentState === 'idle'
                ? 'bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 text-white hover:opacity-90 shadow-lg shadow-indigo-500/25'
                : 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30'
            }`}
          >
            {agentState === 'idle' ? <><Mic size={16} /> Speak to Jogi's Agent</> : <><MicOff size={16} /> Stop</>}
          </button>
        </div>

        {/* Transcript + Response */}
        <AnimatePresence>
          {(transcript || response) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-4 space-y-3 border-t border-white/10 pt-4"
            >
              {transcript && (
                <div className="flex items-start gap-3">
                  <span className="text-xs text-slate-500 mt-0.5 w-12 flex-shrink-0">You:</span>
                  <p className="text-sm text-slate-300 bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex-1">{transcript}</p>
                </div>
              )}
              {response && (
                <div className="flex items-start gap-3">
                  <span className="text-xs text-indigo-400 mt-0.5 w-12 flex-shrink-0">Jogi:</span>
                  <p className="text-sm text-slate-300 bg-indigo-500/10 px-3 py-2 rounded-xl border border-indigo-500/20 flex-1">{response}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestion chips */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-slate-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button key={s} onClick={() => handleSuggestion(s)}
                disabled={agentState !== 'idle'}
                className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 text-slate-400 border border-white/10 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation history */}
        {history.length > 0 && (
          <div className="px-6 pb-6 border-t border-white/10 pt-4 space-y-3 max-h-48 overflow-y-auto">
            <p className="text-xs text-slate-500">Conversation history</p>
            {history.map((h, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] text-slate-500 w-10 flex-shrink-0 mt-0.5">You</span>
                  <p className="text-xs text-slate-400">{h.user}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] text-indigo-400 w-10 flex-shrink-0 mt-0.5">Jogi</span>
                  <p className="text-xs text-slate-500 line-clamp-2">{h.agent}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
