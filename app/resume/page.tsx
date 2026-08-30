import type { Metadata } from "next";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import ResumeActions from "@/components/ResumeActions";
import { resumeData } from "@/lib/resume";
import { site } from "@/lib/site";

import "@/styles/resume.css";

const description =
  "Live downloadable resume of DevaRaju Maddhu — Full Stack Developer & AI Engineer specializing in Next.js, React, TypeScript, Python, LangChain, LangGraph, and scalable backend architecture.";

export const metadata: Metadata = {
  title: "Resume | Full Stack Developer & AI Engineer",
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume — DevaRaju Maddhu",
    description,
    url: "/resume",
  },
};

const PDF_HREF = "/DevaRaju%20Maddhu%20Resume.pdf";

export default function ResumePage() {
  return (
    <PageTransition>
      <div className="resume-container">
        <ResumeActions pdfHref={PDF_HREF} />

        {/* Printable paper canvas */}
        <Reveal trigger="mount" className="resume-paper">
          <header className="resume-header">
            <h1 className="resume-name">{resumeData.name}</h1>
            <div className="resume-subhead">{resumeData.title}</div>

            <div className="resume-contact-row">
              <span className="resume-contact-item">
                <BiMap size="15" /> {resumeData.location}
              </span>
              <span className="resume-contact-item">
                <BiPhone size="15" />{" "}
                <a href={`tel:${resumeData.phone.replace(/\s/g, "")}`}>
                  {resumeData.phone}
                </a>
              </span>
              <span className="resume-contact-item">
                <BiEnvelope size="15" />{" "}
                <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
              </span>
              <span className="resume-contact-item">
                LinkedIn:{" "}
                <a href={resumeData.linkedin} target="_blank" rel="noreferrer">
                  https://linkedin.com/in/devaraj764
                </a>
              </span>
              <span className="resume-contact-item">
                GitHub:{" "}
                <a href={resumeData.github} target="_blank" rel="noreferrer">
                  {resumeData.github}
                </a>
              </span>
            </div>
          </header>

          <section className="resume-section">
            <div className="resume-section-title">Career Summary</div>
            <p className="resume-summary-text">{resumeData.summary}</p>
          </section>

          <section className="resume-section">
            <div className="resume-section-title">Work Experience</div>
            {resumeData.workExperience.map((exp) => (
              <div key={exp.company} className="resume-exp-item">
                <div className="resume-exp-header">
                  <div className="resume-exp-title">
                    {exp.role} —{" "}
                    <span className="resume-exp-company">{exp.company}</span> (
                    {exp.location})
                  </div>
                  <div className="resume-exp-duration">{exp.duration}</div>
                </div>
                <ul className="resume-bullets">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="resume-section">
            <div className="resume-section-title">Education &amp; Leadership</div>
            {resumeData.education.map((edu) => (
              <div key={edu.institution} className="resume-exp-item">
                <div className="resume-exp-header">
                  <div className="resume-exp-title">
                    {edu.degree} — {edu.institution}
                  </div>
                  <div className="resume-exp-duration">{edu.year}</div>
                </div>
                <div className="resume-exp-note">
                  {edu.score} | Organizations: {edu.organizations.join(", ")}
                </div>
              </div>
            ))}

            {resumeData.leadership.map((lead) => (
              <div
                key={lead.role}
                className="resume-exp-item"
                style={{ marginTop: 4 }}
              >
                <div className="resume-exp-header">
                  <div className="resume-exp-title">{lead.role}</div>
                  <div className="resume-exp-duration">{lead.duration}</div>
                </div>
                <div className="resume-exp-note">{lead.description}</div>
              </div>
            ))}
          </section>

          <section className="resume-section" style={{ marginBottom: 0 }}>
            <div className="resume-section-title">Skills &amp; Interests</div>
            <div className="resume-skills-list">
              {resumeData.skills.map((s) => (
                <div key={s.category}>
                  <span className="resume-skill-cat">{s.category}: </span>
                  <span className="resume-skill-vals">{s.items}</span>
                </div>
              ))}
              <div>
                <span className="resume-skill-cat">Interests: </span>
                <span className="resume-skill-vals">
                  {resumeData.interests.join(", ")}
                </span>
              </div>
              <div>
                <span className="resume-skill-cat">Projects Portfolio: </span>
                <span className="resume-skill-vals">
                  Detailed case studies &amp; live demos at{" "}
                  <a className="resume-portfolio-link" href={`${site.url}/projects`}>
                    {site.url}/projects ↗
                  </a>
                </span>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </PageTransition>
  );
}
