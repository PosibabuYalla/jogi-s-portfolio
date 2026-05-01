import { motion } from 'framer-motion';
import { GraduationCap, Award, CalendarDays } from 'lucide-react';

export default function EducationCertifications() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white"><span className="text-gradient">Education</span></h2>
        <div className="glass-card-solid p-6 flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-lg">Bachelor of Technology – Computer Science and Engineering</h3>
            <p className="text-indigo-400 font-semibold text-sm">Kakinada Institute of Engineering and Technology, Kakinada</p>
            <div className="flex flex-wrap gap-3 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1"><CalendarDays size={11} /> Nov 2021 – May 2025</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">CGPA: 7.8 / 10</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white"><span className="text-gradient">Certifications</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Data Science Full Stack Certification', issuer: 'PW Skills (Physics Wallah)', color: 'from-indigo-500 to-violet-500' },
            { title: 'Data Analysis Certification',          issuer: 'Infosys',                    color: 'from-pink-500 to-rose-500' },
          ].map(({ title, issuer, color }) => (
            <div key={title} className="glass-card-solid p-5 flex gap-4 items-start">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                <Award size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="text-sm text-slate-400 mt-0.5">{issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
