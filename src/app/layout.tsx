import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-beta-mauve-10.vercel.app"
);
const siteName = "Kalpit Agarwal Portfolio";
const siteTitle = "Kalpit Agarwal | Full Stack Developer";
const siteDescription =
  "Full Stack Developer at MAQ Software specializing in C# .NET, React, and Azure DevOps. Building enterprise-ready products with UX-first design and clean, scalable engineering.";

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: "%s | Kalpit Agarwal",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Kalpit Agarwal", url: siteUrl }],
  creator: "Kalpit Agarwal",
  publisher: "Kalpit Agarwal",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Kalpit Agarwal",
    "Full Stack Developer",
    "C# .NET",
    "React",
    "Azure DevOps",
    "Azure",
    "TypeScript",
    "Portfolio",
    "Frontend Engineer",
    "Backend Engineer",
    "Software Engineer",
  ],
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description:
      "Portfolio featuring enterprise-ready projects, UX-first design, and full stack engineering experience.",
    url: siteUrl,
    siteName,
    images: [
      {
        url: new URL("/opengraph-image", siteUrl),
        width: 1200,
        height: 630,
        alt: siteTitle,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Full stack engineer focused on production-ready web experiences, enterprise systems, and clean UI motion.",
    images: [new URL("/twitter-image", siteUrl)],
  },
  appleWebApp: {
    title: "Kalpit Agarwal",
    statusBarStyle: "black-translucent",
    capable: true,
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
      { url: "/favicon.svg", type: "image/svg+xml" },
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
