import { Helmet } from "react-helmet-async";
import { BiShow } from "react-icons/bi";
import experiences from "../data/experiences.json";
import PageTransition from "../components/PageTransition";
import GlassCard from "../components/GlassCard";
import TechStack from "../components/TechStack";

export default function ExperiencePage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Experience — DevaRaju Maddhu</title>
        <meta name="description" content="Professional experience and tech stack of DevaRaju Maddhu — full-stack development, AI engineering, and scalable systems." />
        <meta property="og:title" content="Experience — DevaRaju Maddhu" />
        <meta property="og:description" content="Professional experience and tech stack of DevaRaju Maddhu — full-stack development, AI engineering, and scalable systems." />
        <meta property="og:url" content="https://devarajumaddhu.dev/experience" />
        <link rel="canonical" href="https://devarajumaddhu.dev/experience" />
      </Helmet>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Experience</h2>
      </div>

      <div className="card-list">
        {experiences.map((item, index) => (
          <GlassCard key={index} delay={index * 0.1}>
            <div className="exp-card-header">
              <h3 className="exp-card-title">{item.title}</h3>
              <span className="exp-card-duration">{item.duration}</span>
            </div>
            <p className="exp-card-description">{item.description}</p>
            <p className="exp-card-role">{item.role}</p>
            <div className="exp-card-tags">
              {item.worked_with.map((tech, i) => (
                <span key={i} className="exp-card-tag">{tech}</span>
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
