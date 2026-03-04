import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BiFolder, BiBriefcase, BiBookOpen, BiRightArrowAlt } from "react-icons/bi";
import PageTransition from "../components/PageTransition";
import SocialLinks from "../components/SocialLinks";

const topSkills = [
  "React", "Next.js", "TypeScript", "Python", "Node.js", "Java Spring Boot",
  "LangChain", "LangGraph", "PostgreSQL", "MongoDB", "Docker",
  "Tailwind CSS", "AWS", "RAG Pipelines", "Agentic AI",
];

const highlights = [
  {
    to: "/projects",
    icon: <BiFolder size="28" />,
    title: "Projects",
    desc: "Apps and tools I've built — from AI agents to full-stack platforms.",
  },
  {
    to: "/experience",
    icon: <BiBriefcase size="28" />,
    title: "Experience",
    desc: "Professional roles and the technologies I've shipped with.",
  },
  {
    to: "/blog",
    icon: <BiBookOpen size="28" />,
    title: "Blog",
    desc: "Thoughts on web development, AI engineering, and more.",
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      <div className="banner">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="banner-left-side"
        >
          <div className="banner-intro">
            I'M <span className="name">DevaRaju Maddhu</span>
          </div>
          <h1 className="heading">
            Full Stack Developer &amp; AI Engineer
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="banner-text"
          >
            Full-stack developer with experience in Next.js, React, TypeScript,
            Node.js, and Java Spring Boot, focused on building AI-native
            applications powered by agentic workflows. I design scalable
            frontends and robust backend services while building autonomous AI
            agents using LangChain and LangGraph for multi-step reasoning, tool
            invocation, and stateful execution.
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="banner-actions"
          >
            <SocialLinks />
          </motion.div>
          <div className="banner-location">Andhra Pradesh, India</div>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          src="/assets/banner.jpeg"
          alt="DevaRaju Maddhu - Full Stack Developer"
          className="banner-image"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        style={{ marginTop: 48 }}
      >
        <div className="flex-between" style={{ marginBottom: 16 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>
            <span className="accent-marker">&gt;</span>
            <h2 className="heading" style={{ fontSize: "1.2rem" }}>What I Work With</h2>
          </div>
          <Link to="/experience" className="link-button" style={{ fontSize: "0.82rem", padding: "6px 12px" }}>
            All skills <BiRightArrowAlt size="16" />
          </Link>
        </div>
        <div className="badges-grid">
          {topSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.4 + i * 0.03 }}
              className="stack-badge"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="highlight-grid">
        {highlights.map((h, i) => (
          <Link key={h.to} to={h.to} className="highlight-card">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            >
              <div className="highlight-card-icon">{h.icon}</div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
