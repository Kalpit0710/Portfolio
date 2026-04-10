"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Star } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Promoted to CEO of Wissen",
      desc: "Joined as a volunteer and through dedication, got promoted to CEO of the student organization."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Hosted Largest LPU Events",
      desc: "Spearheaded the organization and execution of the largest events at Lovely Professional University."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Dean's Top 10% Students",
      desc: "Achieved distinction for outstanding academic performance and contributions to extra-curriculars."
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="max-w-5xl"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 flex items-center gap-4">
            <span className="text-primary text-2xl">06.</span> Key Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-primary/50 transition-colors text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
