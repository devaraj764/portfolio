import type { Metadata } from "next";

import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import { site } from "@/lib/site";

import "@/styles/globals.css";
import "@/styles/app.css";
import "@/styles/blog.css";
import "@/styles/enhancements.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    images: [site.banner],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.banner],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: site.name,
    jobTitle: "Full Stack Developer & AI Engineer",
    url: site.url,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Andhra Pradesh",
      addressCountry: "India",
    },
    sameAs: [site.linkedin, site.github],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="page-top" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <ScrollProgress />
          <div className="site-shell">
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
