"use client";

import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

const softSkillsData = [
  { subject: 'Problem Solving', A: 95, fullMark: 100 },
  { subject: 'Leadership', A: 90, fullMark: 100 },
  { subject: 'Team Player', A: 95, fullMark: 100 },
  { subject: 'Communication', A: 85, fullMark: 100 },
  { subject: 'Adaptability', A: 90, fullMark: 100 },
  { subject: 'Project Mgmt', A: 85, fullMark: 100 },
];

const frameworksData = [
  { name: 'React', level: 90 },
  { name: 'NodeJS', level: 85 },
  { name: 'ASP.Net', level: 80 },
  { name: 'Tailwind', level: 95 },
  { name: 'TypeScript', level: 85 },
];

const languagesData = ["C#", "C++", "Java", "PHP"];
const toolsData = ["MongoDB", "Azure Portal", "Azure DevOps"];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
           className="max-w-6xl"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 flex items-center gap-4">
            <span className="text-primary text-2xl">02.</span> Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Soft Skills Radar */}
            <div className="bg-white/[0.02] rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-colors backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-8 tracking-wide">Soft Skills</h3>
              <div className="h-[350px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%" minHeight={280} minWidth={0}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={softSkillsData}>
                    <PolarGrid stroke="#ffffff" strokeOpacity={0.1} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#colorUv)"
                      fillOpacity={0.6}
                    />
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Technical Skills Bars custom UI */}
            <div className="space-y-8">
              <div className="bg-white/[0.02] rounded-3xl p-8 border border-white/10 hover:border-accent/50 transition-colors backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-8 tracking-wide">Frameworks & Libraries</h3>
                
                <div className="space-y-6">
                  {frameworksData.map((item, i) => (
                    <div key={item.name} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-medium text-gray-300">{item.name}</span>
                        <span className="text-xs font-mono text-primary">{item.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                        >
                          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-transparent to-white/50 blur-[2px]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smaller Tiles */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/[0.02] rounded-3xl p-6 border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {languagesData.map(lang => (
                      <span key={lang} className="px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] rounded-3xl p-6 border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Tools</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {toolsData.map(tool => (
                      <span key={tool} className="px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
