"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to send message.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. Please check your email for confirmation.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Unable to send your message right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="max-w-6xl"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Let&apos;s Work <span className="text-primary italic">Together</span>
              </h2>
              <p className="text-gray-400 mb-12 text-lg">
                I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
              
              <div className="space-y-6 mb-12">
                <a href="mailto:kalpit677@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors border border-white/10">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-lg">kalpit677@gmail.com</span>
                </a>
                
                <a href="tel:+918360656716" className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors border border-white/10">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-lg">+91-8360656716</span>
                </a>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/kalpit-agarwal/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 bg-white/5 rounded-full hover:bg-[#0077b5] border border-white/10 hover:border-[#0077b5] hover:text-white text-gray-400 transition-all transform hover:-translate-y-1"
                  aria-label="View LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/Kalpit0710" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 bg-white/5 rounded-full hover:bg-white border border-white/10 hover:border-white hover:text-black text-gray-400 transition-all transform hover:-translate-y-1"
                  aria-label="View GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <motion.form 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-white/5 p-8 border border-white/10 rounded-3xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors hover:border-white/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors hover:border-white/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea 
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={4}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none hover:border-white/20"
                  ></textarea>
                </div>

                {status && (
                  <p
                    className={`text-sm ${
                      status.type === "success" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 transform active:scale-95 duration-200 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </motion.form>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
