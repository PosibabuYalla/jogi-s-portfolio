import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const projects = [
  {
    title: 'SmartPDFBot – AI Document Assistant',
    desc: 'RAG app (FastAPI + Streamlit) that answers questions from PDFs, slashing manual search time by 85%. HuggingFace embeddings + ChromaDB for semantic search under 300ms. Integrated Groq (Llama-3) and Gemini APIs, cutting response time by 40% with 95%+ accuracy.',
    flow: ['PDF Upload', 'HuggingFace Embeddings', 'ChromaDB', 'Groq/Gemini LLM', 'Response'],
    tags: ['Streamlit', 'FastAPI', 'LangChain', 'ChromaDB', 'Llama-3', 'Gemini'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Utsawa – Admin Panel (Ongoing)',
    desc: '15+ REST APIs handling 10K+ records at sub-200ms. Real-time KPI dashboard with 7 metrics; SQL join optimization cut query latency by 40%. Secured with JWT + RBAC. Agentic AI sped up development 3× and reduced API calls by 80%.',
    flow: ['Dashboard', 'JWT + RBAC', 'FastAPI Layer', 'PostgreSQL', 'Analytics'],
    tags: ['FastAPI', 'PostgreSQL', 'React', 'SQLAlchemy', 'Agentic AI', 'JWT'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'AI/ML Microservices Suite',
    desc: 'Deployed 4+ AI microservices: EfficientNet-B4 deepfake detection (92% accuracy), ResNet-50 diabetic retinopathy classification, and YOLOv8 + Tesseract OCR ID card extraction — all under 200ms inference time.',
    flow: ['Deepfake Detection', 'DR Classification', 'ID Card Extraction'],
    tags: ['FastAPI', 'EfficientNet-B4', 'ResNet-50', 'YOLOv8', 'Tesseract OCR', 'Docker'],
    color: 'from-emerald-400 to-cyan-500',
  },
];

function ProjectCard({ title, desc, flow, tags, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className="glass-card-solid p-6 flex flex-col gap-4 h-full"
    >
      <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${color}`} />
      <div>
        <h3 className="font-bold text-white text-lg leading-tight">{title}</h3>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">{desc}</p>
      </div>
      <div className="flex flex-wrap items-center gap-1 text-xs">
        {flow.map((step, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300 font-medium">{step}</span>
            {i < flow.length - 1 && <ArrowRight size={10} className="text-slate-600" />}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map(t => (
          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">{t}</span>
        ))}
      </div>
      <a href="https://github.com/Jo9gi" target="_blank" rel="noreferrer"
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition-colors mt-1">
        <GithubIcon /> View on GitHub
      </a>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">Featured <span className="text-gradient">Projects</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => <ProjectCard key={p.title} {...p} />)}
      </div>
    </motion.section>
  );
}
