"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeForm, setResumeForm] = useState({ name: "", email: "" });
  const [isRequestingResume, setIsRequestingResume] = useState(false);
  const [resumeStatus, setResumeStatus] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const openResumeModal = () => {
    setResumeStatus(null);
    setResumeModalOpen(true);
  };

  const closeResumeModal = () => {
    setResumeModalOpen(false);
    setIsRequestingResume(false);
  };

  const triggerResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Kalpit-Agarwal-Resume.pdf";
    document.body.append(link);
    link.click();
    link.remove();
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeStatus(null);
    setIsRequestingResume(true);

    try {
      const response = await fetch("/api/resume-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeForm),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to process resume request.");
      }

      setResumeStatus({
        type: "success",
        message: "Resume request submitted. Starting your download now...",
      });

      triggerResumeDownload();
      setResumeForm({ name: "", email: "" });
      setTimeout(closeResumeModal, 800);
    } catch (error) {
      setResumeStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Unable to process resume request right now.",
      });
    } finally {
      setIsRequestingResume(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold text-white z-50">
          Kalpit<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-gray-300 hover:text-primary transition-colors hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
          <button
            type="button"
            onClick={openResumeModal}
            className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-primary transition-all duration-300 border border-white/20 hover:border-primary"
          >
            Download Resume
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center gap-8 z-40"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display text-white hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                type="button"
                role="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResumeModal();
                }}
                className="mt-4 px-8 py-3 rounded-full bg-primary text-white text-lg font-medium"
              >
                Download Resume
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {resumeModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm px-6 flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                className="w-full max-w-md bg-background border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">Download Resume</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Please share your details to continue.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeResumeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close resume form"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleResumeSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="resume-name" className="block text-sm text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      id="resume-name"
                      type="text"
                      value={resumeForm.name}
                      onChange={(e) =>
                        setResumeForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors hover:border-white/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="resume-email" className="block text-sm text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      id="resume-email"
                      type="email"
                      value={resumeForm.email}
                      onChange={(e) =>
                        setResumeForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors hover:border-white/20"
                    />
                  </div>

                  {resumeStatus && (
                    <p
                      className={`text-sm ${
                        resumeStatus.type === "success" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {resumeStatus.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isRequestingResume}
                    className="w-full py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-70"
                  >
                    {isRequestingResume ? "Please wait..." : "Send & Download"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
