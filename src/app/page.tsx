import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experiences from "@/components/Experiences";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#kalpit-agarwal`,
        name: "Kalpit Agarwal",
        jobTitle: "Full Stack Developer",
        description:
          "Full Stack Developer at MAQ Software specializing in C# .NET, React, and Azure DevOps.",
        email: "mailto:kalpit677@gmail.com",
        telephone: "+91-8360656716",
        url: siteUrl,
        worksFor: {
          "@type": "Organization",
          name: "MAQ Software",
        },
        sameAs: [
          "https://www.linkedin.com/in/kalpit-agarwal/",
          "https://github.com/Kalpit0710",
        ],
        knowsAbout: [
          "C#",
          ".NET",
          "React",
          "Azure DevOps",
          "Power BI",
          "UX",
          "Web Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Kalpit Agarwal Portfolio",
        description:
          "Portfolio of Kalpit Agarwal, Full Stack Developer building enterprise-ready and recruiter-friendly web experiences.",
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: "Kalpit Agarwal | Full Stack Developer",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#kalpit-agarwal` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Certificates />
      <Achievements />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
