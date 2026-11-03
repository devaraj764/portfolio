import Image from "next/image";
import Link from "next/link";
import { BiFolder, BiBriefcase, BiRightArrowAlt, BiArrowBack, BiMap, BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import BuildProcess from "@/components/BuildProcess";
import CopyEmail from "@/components/CopyEmail";
import InteractiveSurface from "@/components/InteractiveSurface";
import HeroGraphic from "@/components/HeroGraphic";
import { getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

const topSkills = ["React", "Next.js", "TypeScript", "Python", "Node.js", "LangChain", "LangGraph", "PostgreSQL", "MongoDB", "Docker", "Tailwind CSS", "AWS", "RAG Pipelines", "Agentic AI", "Redis", "Qdrant", "Cloudflare R2", "Remotion"];
const highlights = [
  { href: "/projects", icon: <BiFolder />, title: "Built with purpose", label: "Explore projects", desc: "From AI agents to full-stack platforms. A closer look at the things I've brought to life." },
  { href: "/experience", icon: <BiBriefcase />, title: "Learning by shipping", label: "My experience", desc: "The teams, challenges, and technologies that have shaped the way I build." },
];
const projectImages: Record<string, string> = {
  u2ubeframes: "/assets/u2ubeframes/look-blueprint-diagram.webp",
  ai4contracts: "/assets/ai4contracts/contracts-list-page.webp",
  schedbee: "/assets/schedbee/booking-schedbee.webp",
  "rentalgaadi-management": "/assets/rentalgaadi/userfront-hero.png",
  musoclef: "/assets/musoclef/courses-list.webp",
  indoqatar: "/assets/indoqatar/home-1.webp",
};

export default function HomePage() {
  const featured = getAllProjects().slice(0, 2);
  return (
    <PageTransition>
      <section className="home-hero" aria-labelledby="hero-title">
        <Reveal trigger="mount" className="hero-copy" duration={0.65}>
          <div className="eyebrow"><span className="status-dot" /> FULL STACK DEVELOPER &amp; AI ENGINEER</div>
          <p className="hero-intro">Hi, I&apos;m {site.name} <span className="hello-mark" aria-hidden="true">↗</span></p>
          <h1 id="hero-title">Turning ideas into<br /><span className="gradient-text">intelligent</span><br />experiences<span className="hero-period">.</span></h1>
          <p className="hero-description">I build thoughtful web applications and AI agents that solve real problems. From the first interface to the reasoning behind it.</p>
          <div className="hero-cta-row">
            <Link href="#selected-work" className="primary-button">Explore my work <BiRightArrowAlt size={22} /></Link>
            <Link href="/contact" className="text-link">Let&apos;s talk <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-meta">
            <span><BiMap size={15} />{site.location}</span>
            <span className="meta-divider" />
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><BiLogoGithub size={20} /></a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BiLogoLinkedinSquare size={20} /></a>
            <a href={site.resumePdf} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
          </div>
        </Reveal>
        <Reveal trigger="mount" className="hero-visual" delay={0.15} duration={0.8} y={15}><HeroGraphic /></Reveal>
        <a href="#selected-work" className="scroll-cue"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="toolkit-section" aria-labelledby="toolkit-title">
        <Reveal><div className="toolkit-heading"><span className="eyebrow" id="toolkit-title">THE TOOLKIT</span><span>Good ideas deserve the right tools.</span></div></Reveal>
        <div className="badges-grid home-skills">{topSkills.map((skill, i) => <Reveal key={skill} className="stack-badge" delay={i * 0.025} y={8}>{skill}</Reveal>)}</div>
      </section>

      <section id="selected-work" className="selected-work" aria-labelledby="work-title">
        <Reveal className="home-section-header"><div><div className="eyebrow">01 / SELECTED WORK</div><h2 id="work-title">A few things I&apos;ve built<span className="hero-period">.</span></h2></div><Link href="/projects" className="text-link">All projects <BiRightArrowAlt size={20} /></Link></Reveal>
        <div className="featured-grid">
          {featured.map((project, index) => <Reveal key={project.slug} delay={index * 0.1}>
            <InteractiveSurface className="project-surface"><Link href={`/projects/${project.slug}`} className="featured-card">
              <div className="featured-image">
                {projectImages[project.slug] ? <Image src={projectImages[project.slug]} alt={`${project.title.split(" — ")[0]} project preview`} width={800} height={450} sizes="(max-width: 768px) 100vw, 50vw" /> : <div className="project-placeholder"><BiFolder size={64} /></div>}
                <span className="project-index">0{index + 1}</span><span className="project-open" aria-hidden="true"><BiArrowBack /></span>
              </div>
              <div className="featured-content"><div className="featured-tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><h3>{project.title.split(" — ")[0]}</h3><p>{project.excerpt}</p><span className="project-details">Explore project <BiRightArrowAlt size={20} /></span></div>
            </Link></InteractiveSurface>
          </Reveal>)}
        </div>
      </section>

      <section className="approach-section" aria-labelledby="approach-title">
        <Reveal><div className="eyebrow">02 / HOW I BUILD</div><h2 id="approach-title">From interface to intelligence<span className="hero-period">.</span></h2></Reveal>
        <Reveal delay={0.1}><BuildProcess /></Reveal>
      </section>

      <section className="explore-section" aria-labelledby="explore-title">
        <Reveal><div className="eyebrow">03 / BEYOND THE CODE</div><h2 id="explore-title">Always building. Always curious.</h2></Reveal>
        <div className="highlight-grid">{highlights.map((h, i) => <Reveal key={h.href} delay={i * 0.08}><Link href={h.href} className="highlight-card"><div className="highlight-card-top"><div className="highlight-card-icon">{h.icon}</div><span>0{i + 1}</span></div><h3>{h.title}</h3><p>{h.desc}</p><span className="highlight-card-link">{h.label} <BiRightArrowAlt size={20} /></span></Link></Reveal>)}</div>
      </section>
      <Reveal className="home-contact"><div><span className="eyebrow">HAVE SOMETHING IN MIND?</span><h2>Let&apos;s make it happen<span className="hero-period">.</span></h2><p>A thoughtful product starts with a conversation.</p><CopyEmail /></div><Link href="/contact" className="primary-button">Get in touch <BiRightArrowAlt size={22} /></Link></Reveal>
    </PageTransition>
  );
}
