"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Associate Software Engineer",
    company: "MAQ Software",
    timeline: "Since November 2025",
    description: "Develop web-based enterprise solutions for global clients using C# .NET and ReactJS, contributing to production-ready feature delivery. Collaborate with cross-functional teams to convert requirements into scalable solutions, gain hands-on experience with Microsoft Azure Portal services, and support deployment and workflow management using Azure DevOps. Additionally, worked with Power BI to understand data visualization and reporting for business insights."
  },
  {
    role: "Chief Executive Officer",
    company: "Student Organization Wissen",
    timeline: "August 2023 – August 2025",
    description: "As CEO of Wissen Organization, responsibilities include overseeing the strategic planning and on-ground execution of over 25 high-profile events at Lovely Professional University. These initiatives range from tech fests and coding championships to the prestigious 25th Annual NOSPlan Convention. The role demands meticulous coordination, operational excellence, and the delivery of impactful experiences across large-scale academic and professional platforms."
  }
];

export default function Experiences() {
  return (
    <section id="experience" className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16 flex items-center gap-4">
            <span className="text-primary text-2xl">03.</span> Experience
          </h2>

          <div className="relative border-l-2 border-primary/30 pl-8 md:pl-0 md:border-none space-y-12">
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2"></div>
            
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row relative ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-3 md:left-1/2 md:-translate-x-1/2 top-1.5 w-5 h-5 rounded-full bg-background border-4 border-primary z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                
                {/* Content Box */}
                <div className={`md:w-1/2 md:px-12 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"} mb-8 md:mb-0`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                  >
                    <span className="text-primary font-medium tracking-wider text-sm block mb-2">{exp.timeline}</span>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-lg text-gray-400 mb-6 font-medium">{exp.company}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
