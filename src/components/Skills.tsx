"use client";

import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { Code2, Wrench, Database } from "lucide-react";

const softSkillsData = [
  { subject: 'Problem Solving', A: 95, fullMark: 100 },
  { subject: 'Leadership', A: 90, fullMark: 100 },
  { subject: 'Teamwork', A: 95, fullMark: 100 },
  { subject: 'Communication', A: 85, fullMark: 100 },
  { subject: 'Adaptability', A: 90, fullMark: 100 },
  { subject: 'Project Management', A: 85, fullMark: 100 },
];

const frameworksData = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Express.js', level: 80 },
  { name: 'ASP.NET / .NET Core', level: 80 },
  { name: 'Laravel', level: 75 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'Bootstrap', level: 80 },
  { name: 'TypeScript', level: 85 },
];

const languagesData = ["C#", "C++", "Java", "PHP", "JavaScript", "SQL"];
const toolsData = [
  "MongoDB",
  "MySQL",
  "Azure Portal",
  "Azure DevOps",
  "Power BI",
  "Git & GitHub",
  "Postman",
  "VS Code / Visual Studio"
];
const databasesData = ["MongoDB", "MySQL"];
const coreConceptsData = [
  "REST APIs",
  "Authentication & Authorization",
  "MVC Architecture",
  "Object-Oriented Programming (OOP)",
  "Data Structures & Algorithms",
  "Software Development Lifecycle (SDLC)"
];

type RadarDotProps = {
  cx?: number;
  cy?: number;
  value?: number;
  payload?: { subject?: string };
};

const renderActiveDot = ({ cx, cy, value, payload }: RadarDotProps) => {
  if (cx == null || cy == null || value == null) return null;

  const isTopLabel = payload?.subject === 'Problem Solving';
  const textY = isTopLabel ? cy + 18 : cy - 10;
  const textBaseline = isTopLabel ? 'hanging' : 'auto';

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#3b82f6" stroke="#0f172a" strokeWidth={2} />
      <text
        x={cx}
        y={textY}
        textAnchor="middle"
        dominantBaseline={textBaseline}
        fill="#e5e7eb"
        fontSize={12}
        fontWeight={600}
      >
        {value}%
      </text>
    </g>
  );
};

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
            <div className="space-y-8">
              {/* Soft Skills Radar */}
              <div className="bg-white/2 rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-colors backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-8 tracking-wide">Soft Skills</h3>
                <div className="h-87.5 w-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%" minHeight={280} minWidth={0}>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={softSkillsData}>
                      <PolarGrid stroke="#ffffff" strokeOpacity={0.1} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Tooltip
                        cursor={{ stroke: '#3b82f6', strokeOpacity: 0.3 }}
                        formatter={(
                          value:
                            | number
                            | string
                            | readonly (number | string)[]
                            | undefined
                        ) => {
                          const displayValue = Array.isArray(value) ? value[0] : value;
                          return [displayValue == null ? "--" : `${displayValue}%`, "Score"];
                        }}
                        contentStyle={{
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(59, 130, 246, 0.4)',
                          borderRadius: '10px',
                          color: '#e5e7eb'
                        }}
                        labelStyle={{ color: '#93c5fd', fontWeight: 600 }}
                      />
                      <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#colorUv)"
                        fillOpacity={0.6}
                        dot={{ r: 3, fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 1 }}
                        activeDot={renderActiveDot}
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
                <p className="mt-6 text-base font-semibold text-white/35 leading-relaxed">
                  I approach team work with clear communication, steady leadership, and a bias toward practical
                  problem solving. These scores reflect how I collaborate, adapt, and keep projects moving forward
                  without over-emphasizing the spotlight.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/2 rounded-3xl p-6 border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {languagesData.map(lang => (
                      <span
                        key={lang}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        <Code2 className="h-3.5 w-3.5 text-primary" />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/2 rounded-3xl p-6 border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Databases</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {databasesData.map((db) => (
                      <span
                        key={db}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        <Database className="h-3.5 w-3.5 text-primary" />
                        {db}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Technical Skills Bars custom UI */}
              <div className="bg-white/2 rounded-3xl p-8 border border-white/10 hover:border-accent/50 transition-colors backdrop-blur-xl">
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
                          className="h-full bg-linear-to-r from-primary to-accent rounded-full relative"
                        >
                          <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-r from-transparent to-white/50 blur-[2px]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/2 rounded-3xl p-6 border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Tools</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {toolsData.map(tool => (
                      <span
                        key={tool}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        <Wrench className="h-3.5 w-3.5 text-accent" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/2 rounded-3xl p-6 border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Core Concepts</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {coreConceptsData.map((concept) => (
                      <span
                        key={concept}
                        className="px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                      >
                        {concept}
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
