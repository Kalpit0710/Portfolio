"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certificates = [
  { name: "Ethical Hacking", issuer: "NPTEL by IIT Kharagpur", date: "October 2024" },
  { name: "Building Web Applications in PHP", issuer: "Coursera", date: "November 2024" },
  { name: "Generative AI Primer", issuer: "Vanderbilt University", date: "January 2024" },
  { name: "Become a Full-Stack Web Developer", issuer: "LinkedIn", date: "February 2023" },
  { name: "Mastering Data Structures & Algorithms using C/C++", issuer: "Udemy", date: "December 2023" },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="max-w-5xl"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 flex items-center gap-4">
            <span className="text-primary text-2xl">05.</span> Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group"
              >
                <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
                  <Award className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{cert.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                  <span className="text-xs font-mono text-gray-500">{cert.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
