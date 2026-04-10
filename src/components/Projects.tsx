"use client";

import { MouseEvent } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

type Project = {
  title: string;
  date: string;
  tech: string[];
  features: string[];
  badge?: string;
};

const projects: Project[] = [
  {
    title: "School Fee Management System",
    date: "March 2025 - April 2025",
    tech: ["Laravel", "MySQL"],
    badge: "Enterprise ready",
    features: [
      "Engineered online fee payments system.",
      "Integrated comprehensive admin panel.",
      "Implemented automated fee calculation and receipt generation.",
    ],
  },
  {
    title: "Website for School",
    date: "November 2024 - December 2024",
    tech: ["HTML", "CSS", "ReactJS", "Bootstrap", "MongoDB"],
    features: [
      "Built fully responsive website for J. R. Preparatory School.",
      "Implemented front-end and back-end for seamless experience.",
      "Integrated contact forms with validation.",
    ],
  },
  {
    title: "Student Result Management System",
    date: "June 2024 – July 2024",
    tech: ["PHP"],
    features: [
      "Designed secure portal for academic results.",
      "Developed system to streamline result entry and publication.",
      "Incorporated role-based access for data privacy.",
    ],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 cursor-pointer relative"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-16 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.3),transparent_35%)] blur-3xl" />
        </div>

        <div className="relative space-y-4" style={{ transform: "translateZ(50px)" }}>
          <div className="flex items-center justify-between">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              {project.date}
            </span>
            {project.badge && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/30">
                {project.badge}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold font-display text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          <ul className="space-y-3 mb-8">
            {project.features.map((feature: string, i: number) => (
              <li key={i} className="text-gray-400 text-sm flex items-start">
                <span className="text-primary mr-2 mt-1">✦</span>
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div 
          className="relative mt-auto flex flex-wrap gap-2 pt-6 border-t border-white/10"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60" />
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-accent bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 flex items-center gap-4">
            <span className="text-primary text-2xl">04.</span> Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
