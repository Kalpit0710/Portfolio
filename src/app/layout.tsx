import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Kalpit Agarwal | Full Stack Developer",
    template: "%s | Kalpit Agarwal",
  },
  description:
    "Full Stack Developer at MAQ Software specializing in C# .NET, React, and Azure DevOps. Building production-ready, recruiter-friendly web experiences.",
  applicationName: "Kalpit Agarwal Portfolio",
  creator: "Kalpit Agarwal",
  publisher: "Kalpit Agarwal",
  keywords: [
    "Kalpit Agarwal",
    "Full Stack Developer",
    "C# .NET",
    "React",
    "Azure DevOps",
    "Portfolio",
    "Frontend Engineer",
    "Backend Engineer",
    "Software Engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kalpit Agarwal | Full Stack Developer",
    description:
      "Portfolio featuring enterprise-ready projects, UX-first design, and full stack engineering experience.",
    url: siteUrl,
    siteName: "Kalpit Agarwal Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kalpit Agarwal Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalpit Agarwal | Full Stack Developer",
    description:
      "Full stack engineer focused on production-ready web experiences, enterprise systems, and clean UI motion.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/file.svg", type: "image/svg+xml" },
    ],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground antialiased min-h-screen selection:bg-primary/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
