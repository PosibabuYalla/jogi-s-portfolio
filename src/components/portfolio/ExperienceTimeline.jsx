import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const experiences = [
  {
    role: 'Assistant Python Developer Intern',
    company: 'Corporate Innovative Technologies',
    period: 'Aug 2025 – Mar 2026',
    location: 'Vijayawada, AP',
    bullets: [
      'Deployed 4+ AI microservices (FastAPI/Flask) serving EfficientNet-B4 deepfake detection (92% acc.), ResNet-50 diabetic retinopathy classification, and YOLOv8 + Tesseract OCR ID card extraction — all under 200ms inference.',
      'Built a RAG-powered internal chatbot using LangChain and ChromaDB, reducing HR ticket volume by 20% with sub-3-second response times across 500+ policy documents.',
      'Engineered a full-stack Diabetic Retinopathy Predictor (React + FastAPI) with model confidence visualization, tested by 15+ beta users in a production-like environment.',
      'Led 4 knowledge transfer sessions and authored 12 pages of deployment documentation covering Docker containerization and API versioning best practices.',
    ],
  },
  {
    role: 'Software Research Intern',
    company: 'iHub-Data, IIIT Hyderabad',
    period: 'Jun 2023 – Aug 2023',
    location: 'Hyderabad, TS',
    bullets: [
      'Developed a time-series forecasting pipeline using LSTM and Linear Regression on public mobility datasets, achieving MAPE under 12% on 30-day predictions after hyperparameter tuning.',
      'Built reusable Pandas-based ETL scripts that standardized and cleaned 5+ heterogeneous datasets, reducing data preparation time for the research team by 30%.',
      'Collaborated with PhD scholars to reproduce experimental results and documented workflows in Overleaf/LaTeX for a conference submission draft.',
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">Work <span className="text-gradient">Experience</span></h2>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-pink-500 to-amber-400 rounded-full" />
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
              <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 border-2 border-[#0D1117] shadow" />
              <div className="glass-card-solid p-6 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                    <p className="text-indigo-400 font-semibold text-sm">{exp.company}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">{exp.period}</span>
                    <p className="flex items-center gap-1 text-xs text-slate-500 justify-end"><MapPin size={11} /> {exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
