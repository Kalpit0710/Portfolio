"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch("/api/updates");
        const data = await res.json();
        setUpdates(data.updates || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const githubUpdates = updates.filter(u => u.type === 'github');
  const linkedinUpdates = updates.filter(u => u.type === 'linkedin');

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white overflow-x-hidden w-full">
      <Navbar />
      
      <section className="py-32 relative z-10 min-h-[80vh]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 tracking-tighter">
              Live <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Updates.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-light">
              A real-time dashboard of my latest professional activities, open-source contributions, and thoughts.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* LinkedIn Section */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                <FaLinkedin className="text-[#0077b5] text-3xl" />
                LinkedIn Posts
              </h2>
              
              <div className="space-y-6">
                {loading ? (
                  <div className="animate-pulse bg-white/5 h-40 rounded-3xl" />
                ) : linkedinUpdates.length === 0 ? (
                  <p className="text-gray-500 italic">No recent LinkedIn posts synced yet.</p>
                ) : (
                  linkedinUpdates.map((update, i) => (
                    <motion.div
                      key={update._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                            <Image src="/avatar.png" alt="Kalpit" width={40} height={40} className="object-cover" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Kalpit Agarwal</h3>
                            <p className="text-xs text-gray-500">{format(new Date(update.postedAt), "MMMM d, yyyy")}</p>
                          </div>
                        </div>
                        <a href={update.url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0077b5] transition-colors">
                          <FaLinkedin size={20} />
                        </a>
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                        {update.content}
                      </p>

                      {update.mediaUrl && (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden mt-4">
                          <img src={update.mediaUrl} alt="Post media" className="object-cover w-full h-full" />
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* GitHub Section */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                <FaGithub className="text-white text-3xl" />
                GitHub Activity
              </h2>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {loading ? (
                  <div className="animate-pulse bg-white/5 h-20 rounded-2xl ml-12" />
                ) : githubUpdates.length === 0 ? (
                  <p className="text-gray-500 italic ml-12">No recent GitHub activity found.</p>
                ) : (
                  githubUpdates.map((update, i) => (
                    <motion.div
                      key={update._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-background group-hover:border-primary/50 text-gray-500 group-hover:text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow transition-colors z-10">
                        <FaGithub size={16} />
                      </div>
                      
                      {/* Card */}
                      <a href={update.url} target="_blank" rel="noreferrer" className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Commit / Push</span>
                          <time className="text-xs text-gray-500">{format(new Date(update.postedAt), "MMM d")}</time>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {update.content}
                        </p>
                      </a>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
