"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const projects = [
  {
    title: "School Fee Management System",
    date: "March 2025 - April 2025",
    tech: ["Laravel", "MySQL"],
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

function ProjectCard({ project, index }: { project: any; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
        className="h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 cursor-pointer group"
      >
        <div style={{ transform: "translateZ(50px)" }}>
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            {project.date}
          </span>
          <h3 className="text-2xl font-bold font-display text-white mb-6 group-hover:text-primary transition-colors">
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
          className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-white/10"
          style={{ transform: "translateZ(30px)" }}
        >
          {project.tech.map((t: string) => (
            <span key={t} className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              {t}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
