import type { Metadata } from "next";
import { BiShow } from "react-icons/bi";

import GlassCard from "@/components/GlassCard";
import PageTransition from "@/components/PageTransition";
import TechStack from "@/components/TechStack";
import { experiences } from "@/lib/experiences";

const description =
  "Professional experience and tech stack of DevaRaju Maddhu — full-stack development, AI engineering, and scalable systems.";

export const metadata: Metadata = {
  title: "Experience",
  description,
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience — DevaRaju Maddhu",
    description,
    url: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <PageTransition>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Experience</h2>
      </div>

      <div className="card-list">
        {experiences.map((item, index) => (
          <GlassCard key={item.title} delay={index * 0.1}>
            <div className="exp-card-header">
              <h3 className="exp-card-title">{item.title}</h3>
              <span className="exp-card-duration">{item.duration}</span>
            </div>
            <p className="exp-card-description">{item.description}</p>
            <p className="exp-card-role">{item.role}</p>
            <div className="exp-card-tags">
              {item.worked_with.map((tech) => (
                <span key={tech} className="exp-card-tag">
                  {tech}
                </span>
              ))}
            </div>
            {item.visit_link && (
              <div className="exp-card-links">
                <a
                  href={item.visit_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                >
                  <BiShow size="16" /> Visit
                </a>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      <div style={{ marginTop: 64 }}>
        <TechStack />
      </div>
    </PageTransition>
  );
}
