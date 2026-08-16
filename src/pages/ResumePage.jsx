import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BiDownload,
  BiCheck,
  BiCopy,
  BiEnvelope,
  BiPhone,
  BiGlobe,
  BiMap,
  BiCodeAlt
} from "react-icons/bi";
import PageTransition from "../components/PageTransition";
import { resumeData } from "../data/resumeData";
import "../styles/resume.css";

export default function ResumePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Resume — DevaRaju Maddhu | Full Stack Developer & AI Engineer</title>
        <meta
          name="description"
          content="Live downloadable resume of DevaRaju Maddhu — Full Stack Developer & AI Engineer specializing in Next.js, React, TypeScript, Python, LangChain, LangGraph, and scalable backend architecture."
        />
        <link rel="canonical" href="https://devarajumaddhu.dev/resume" />
      </Helmet>

      <div className="resume-container">
        {/* Top Control Bar */}
        <div className="resume-actions-bar">
          <div className="resume-actions-info">
            <BiCodeAlt size="20" style={{ color: "#3b82f6" }} />
            <span>Live Data Sync (Auto-updates with portfolio projects & experience)</span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleCopyLink}
              className="link-button"
              style={{ fontSize: "0.85rem", padding: "8px 14px" }}
            >
              {copied ? <BiCheck size="18" /> : <BiCopy size="18" />}
              {copied ? "Link Copied!" : "Share Link"}
            </button>

            <a
              href="/DevaRaju%20Maddhu%20Resume.pdf"
              download="DevaRaju_Maddhu_Resume.pdf"
              className="link-button"
              style={{
                fontSize: "0.85rem",
                padding: "8px 16px",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <BiDownload size="18" /> Download PDF
            </a>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="resume-paper"
        >
          {/* Header */}
          <header className="resume-header">
            <h1 className="resume-name">{resumeData.name}</h1>
            <div className="resume-subhead">{resumeData.title}</div>

            <div className="resume-contact-row">
              <span className="resume-contact-item">
                <BiMap size="15" /> {resumeData.location}
              </span>
              <span className="resume-contact-item">
                <BiPhone size="15" /> <a href={`tel:${resumeData.phone}`}>{resumeData.phone}</a>
              </span>
              <span className="resume-contact-item">
                <BiEnvelope size="15" /> <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
              </span>
              <span className="resume-contact-item">
                LinkedIn: <a href={resumeData.linkedin} target="_blank" rel="noreferrer">https://linkedin.com/in/devaraj764</a>
              </span>
              <span className="resume-contact-item">
                GitHub: <a href={resumeData.github} target="_blank" rel="noreferrer">https://github.com/devaraj764</a>
              </span>
            </div>
          </header>

          {/* Objective / Summary */}
          <section className="resume-section">
            <div className="resume-section-title">Career Summary</div>
            <p className="resume-summary-text">{resumeData.summary}</p>
          </section>

          {/* Work Experience */}
          <section className="resume-section">
            <div className="resume-section-title">Work Experience</div>
            {resumeData.workExperience.map((exp) => (
              <div key={exp.company} className="resume-exp-item">
                <div className="resume-exp-header">
                  <div className="resume-exp-title">
                    {exp.role} — <span className="resume-exp-company">{exp.company}</span> ({exp.location})
                  </div>
                  <div className="resume-exp-duration">{exp.duration}</div>
                </div>
                <ul className="resume-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Education & Leadership */}
          <section className="resume-section">
            <div className="resume-section-title">Education & Leadership</div>
            {resumeData.education.map((edu) => (
              <div key={edu.institution} className="resume-exp-item">
                <div className="resume-exp-header">
                  <div className="resume-exp-title">
                    {edu.degree} — {edu.institution}
                  </div>
                  <div className="resume-exp-duration">{edu.year}</div>
                </div>
                <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: 1 }}>
                  {edu.score} | Organizations: {edu.organizations.join(", ")}
                </div>
              </div>
            ))}

            {resumeData.leadership.map((lead) => (
              <div key={lead.role} className="resume-exp-item" style={{ marginTop: 4 }}>
                <div className="resume-exp-header">
                  <div className="resume-exp-title">{lead.role}</div>
                  <div className="resume-exp-duration">{lead.duration}</div>
                </div>
                <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: 1 }}>
                  {lead.description}
                </div>
              </div>
            ))}
          </section>

          {/* Skills & Interests */}
          <section className="resume-section" style={{ marginBottom: 0 }}>
            <div className="resume-section-title">Skills & Interests</div>
            <div className="resume-skills-list" style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "0.81rem", lineHeight: "1.35" }}>
              {resumeData.skills.map((s) => (
                <div key={s.category}>
                  <span className="resume-skill-cat" style={{ fontWeight: "700", color: "#0f172a" }}>{s.category}: </span>
                  <span className="resume-skill-vals" style={{ color: "#334155" }}>{s.items}</span>
                </div>
              ))}
              <div style={{ marginTop: "1px" }}>
                <span className="resume-skill-cat" style={{ fontWeight: "700", color: "#0f172a" }}>Interests: </span>
                <span className="resume-skill-vals" style={{ color: "#334155" }}>{resumeData.interests.join(", ")}</span>
              </div>
              <div style={{ marginTop: "1px" }}>
                <span className="resume-skill-cat" style={{ fontWeight: "700", color: "#0f172a" }}>Projects Portfolio: </span>
                <span className="resume-skill-vals" style={{ color: "#334155" }}>
                  Detailed case studies & live demos at{" "}
                  <a href="https://devaraju-portfolio.web.app/projects/" target="_blank" rel="noreferrer" style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>
                    https://devaraju-portfolio.web.app/projects/ ↗
                  </a>
                </span>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </PageTransition>
  );
}
