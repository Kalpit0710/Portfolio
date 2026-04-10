"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Technology - Computer Science and Engineering",
      institution: "Lovely Professional University",
      location: "Phagwara, Punjab",
      score: "CGPA: 8.71",
      date: "Since August 2022"
    },
    {
      degree: "Intermediate (12th)",
      institution: "St. Joseph's Sen. Sec. School",
      location: "Puranpur, Pilibhit",
      score: "Percentage: 90%",
      date: "April 2021 - March 2022"
    },
    {
      degree: "Matriculation (10th)",
      institution: "St. Joseph's Sen. Sec. School",
      location: "Puranpur, Pilibhit",
      score: "Percentage: 89%",
      date: "April 2020 - March 2021"
    }
  ];

  return (
    <section id="education" className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 flex items-center gap-4">
            <span className="text-primary text-2xl">07.</span> Education
          </h2>

          <div className="space-y-8">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors text-primary mt-1">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  {i !== education.length - 1 && (
                    <div className="w-[2px] h-full bg-white/10 my-2 group-hover:bg-primary/50 transition-colors"></div>
                  )}
                </div>

                <div className="pb-8">
                  <span className="text-primary font-mono text-sm block mb-1 tracking-wider uppercase">{edu.date}</span>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{edu.degree}</h3>
                  <h4 className="text-lg text-gray-300 font-medium mb-3">{edu.institution}, {edu.location}</h4>
                  <p className="text-gray-400 font-mono bg-white/5 inline-block px-3 py-1 rounded border border-white/10">{edu.score}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
