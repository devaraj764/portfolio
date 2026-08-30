import Image from "next/image";
import Link from "next/link";
import {
  BiFolder,
  BiBriefcase,
  BiBookOpen,
  BiRightArrowAlt,
} from "react-icons/bi";

import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/lib/site";

const topSkills = [
  "React", "Next.js", "TypeScript", "Python", "Node.js", "LangChain", "LangGraph", "PostgreSQL", "MongoDB", "Docker",
  "Tailwind CSS", "AWS", "RAG Pipelines", "Agentic AI",
];

const highlights = [
  {
    href: "/projects",
    icon: <BiFolder size="28" />,
    title: "Projects",
    desc: "Apps and tools I've built — from AI agents to full-stack platforms.",
  },
  {
    href: "/experience",
    icon: <BiBriefcase size="28" />,
    title: "Experience",
    desc: "Professional roles and the technologies I've shipped with.",
  },
  {
    href: "/blog",
    icon: <BiBookOpen size="28" />,
    title: "Blog",
    desc: "Thoughts on web development, AI engineering, and more.",
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      <div className="banner">
        <Reveal trigger="mount" className="banner-left-side" y={50} duration={0.5}>
          <div className="banner-intro">
            I&apos;M <span className="name">{site.name}</span>
          </div>
          <h1 className="heading">Full Stack Developer &amp; AI Engineer</h1>
          <Reveal trigger="mount" y={0} delay={0.2} className="banner-text">
            Full-stack developer with experience in Next.js, React, TypeScript,
            and Node.js, focused on building AI-native applications powered by
            agentic workflows. I design scalable
            frontends and robust backend services while building autonomous AI
            agents using LangChain and LangGraph for multi-step reasoning, tool
            invocation, and stateful execution.
          </Reveal>
          <Reveal trigger="mount" y={0} delay={0.3} className="banner-actions">
            <SocialLinks />
          </Reveal>
          <div className="banner-location">{site.location}</div>
        </Reveal>
        <Reveal trigger="mount" y={0} scale={0.9} delay={0.1} duration={0.5}>
          <Image
            src={site.banner}
            alt={`${site.name} - Full Stack Developer`}
            className="banner-image"
            width={2755}
            height={2756}
            priority
          />
        </Reveal>
      </div>

      <Reveal trigger="mount" delay={0.35} style={{ marginTop: 48 }}>
        <div className="flex-between" style={{ marginBottom: 16 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>
            <span className="accent-marker">&gt;</span>
            <h2 className="heading" style={{ fontSize: "1.2rem" }}>
              What I Work With
            </h2>
          </div>
          <Link
            href="/experience"
            className="link-button"
            style={{ fontSize: "0.82rem", padding: "6px 12px" }}
          >
            All skills <BiRightArrowAlt size="16" />
          </Link>
        </div>
        <div className="badges-grid">
          {topSkills.map((skill, i) => (
            <Reveal
              key={skill}
              trigger="mount"
              className="stack-badge"
              y={0}
              scale={0.9}
              duration={0.25}
              delay={0.4 + i * 0.03}
            >
              {skill}
            </Reveal>
          ))}
        </div>
      </Reveal>

      <div className="highlight-grid">
        {highlights.map((h, i) => (
          <Link key={h.href} href={h.href} className="highlight-card">
            <Reveal trigger="mount" delay={0.4 + i * 0.1}>
              <div className="highlight-card-icon">{h.icon}</div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </Reveal>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
