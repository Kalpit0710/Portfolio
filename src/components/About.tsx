"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

function AnimatedCounter({ end, suffix = "", text }: { end: number; suffix?: string; text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col">
      <span className="text-4xl font-display font-bold text-white">
        {count}
        <span className="text-primary">{suffix}</span>
      </span>
      <span className="text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">{text}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-background relative z-10 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-linear-to-tr from-accent/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div 
          className="max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 flex items-center gap-4">
            <span className="text-primary text-2xl">01.</span> About Me
          </h2>
          
          <div className="grid lg:grid-cols-[1fr_minmax(300px,_350px)] gap-16 items-start">
            <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
              <div className="space-y-6">
                <p>
                  I am a passionate <strong className="text-white">Full Stack Developer</strong> and <strong className="text-white">Associate Software Engineer</strong> currently working at MAQ Software. I specialize in developing scalable, web-based enterprise solutions for global clients using C# .NET and ReactJS.
                </p>
                <p>
                  My experience spans across the full software lifecycle, from converting complex requirements into production-ready features, to managing deployments via Azure DevOps, and generating business insights using Power BI.
                </p>
                <p>
                  Beyond coding, I possess strong leadership and operational skills, demonstrated during my tenure as the <strong className="text-white">Chief Executive Officer</strong> of the student organization Wissen.
                </p>
                <p>
                  As CEO, I oversaw the strategic planning and execution of 25+ high-profile events, including massive tech fests and the prestigious 25th Annual NOSPlan Convention. I thrive at the intersection of technical excellence and impactful leadership.
                </p>
              </div>

              {/* Stats Section */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-8">
                <AnimatedCounter end={7} suffix="+" text="Projects Built" />
                <AnimatedCounter end={1} suffix="+" text="Years Experience" />
                <AnimatedCounter end={25} suffix="+" text="Events Led" />
              </div>
            </div>

            {/* Avatar Section */}
            <motion.div 
              className="relative mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-linear-to-tr from-primary to-accent rounded-3xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500 blur-md" />
              <div className="absolute inset-0 bg-linear-to-tr from-primary to-accent rounded-3xl rotate-6 opacity-50 group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute inset-0 bg-background rounded-3xl overflow-hidden border border-white/10 z-10">
                <Image 
                  src="/avatar.png" 
                  alt="Kalpit Agarwal Avatar" 
                  fill 
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
