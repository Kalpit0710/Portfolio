"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-primary text-2xl">01.</span> About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 text-gray-400 text-lg leading-relaxed">
            <div className="space-y-6">
              <p>
                I am a passionate <strong className="text-white">Full Stack Developer</strong> and <strong className="text-white">Associate Software Engineer</strong> currently working at MAQ Software. I specialize in developing scalable, web-based enterprise solutions for global clients using C# .NET and ReactJS.
              </p>
              <p>
                My experience spans across the full software lifecycle, from converting complex requirements into production-ready features, to managing deployments via Azure DevOps, and generating business insights using Power BI.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                Beyond coding, I possess strong leadership and operational skills, demonstrated during my tenure as the <strong className="text-white">Chief Executive Officer</strong> of the student organization Wissen.
              </p>
              <p>
                As CEO, I oversaw the strategic planning and execution of 25+ high-profile events, including massive tech fests and the prestigious 25th Annual NOSPlan Convention. I thrive at the intersection of technical excellence and impactful leadership.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
