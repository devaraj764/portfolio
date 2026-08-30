"use client";

import type { ReactNode } from "react";
import {
  BiLogoAws,
  BiLogoCss3,
  BiLogoDocker,
  BiLogoFirebase,
  BiLogoGit,
  BiLogoHtml5,
  BiLogoJavascript,
  BiLogoMongodb,
  BiLogoNodejs,
  BiLogoPostgresql,
  BiLogoReact,
  BiLogoRedux,
  BiLogoTailwindCss,
  BiLogoTypescript,
  BiLogoVisualStudio,
} from "react-icons/bi";
import {
  TbBrandFramerMotion,
  TbBrandNextjs,
  TbBrandReactNative,
  TbRobot,
} from "react-icons/tb";
import {
  SiExpress,
  SiTablecheck,
  SiSocketdotio,
  SiBun,
  SiPrisma,
  SiPm2,
} from "react-icons/si";
import {
  FaBullseye,
  FaBrain,
  FaLink,
  FaServer,
  FaProjectDiagram,
  FaDatabase,
} from "react-icons/fa";
import {
  AiOutlineQuestion,
} from "react-icons/ai";

import Reveal from "./Reveal";

type TechItem = { title: string; logo: ReactNode };
type Category = { label: string; items: TechItem[] };

const categories: Category[] = [
  {
    label: "Languages",
    items: [
      { title: "HTML", logo: <BiLogoHtml5 size="18" /> },
      { title: "CSS", logo: <BiLogoCss3 size="18" /> },
      { title: "JavaScript", logo: <BiLogoJavascript size="18" /> },
      { title: "TypeScript", logo: <BiLogoTypescript size="18" /> },
    ],
  },
  {
    label: "Frontend & Mobile",
    items: [
      { title: "React", logo: <BiLogoReact size="18" /> },
      { title: "Next.js", logo: <TbBrandNextjs size="18" /> },
      { title: "Tailwind CSS", logo: <BiLogoTailwindCss size="18" /> },
      { title: "ShadCN UI", logo: <AiOutlineQuestion size="18" /> },
      { title: "Redux", logo: <BiLogoRedux size="18" /> },
      { title: "React Native", logo: <TbBrandReactNative size="18" /> },
      { title: "Framer Motion", logo: <TbBrandFramerMotion size="18" /> },
      { title: "TanStack Table", logo: <SiTablecheck size="18" /> },
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      { title: "Node.js", logo: <BiLogoNodejs size="18" /> },
      { title: "Express.js", logo: <SiExpress size="18" /> },
      { title: "WebSockets", logo: <SiSocketdotio size="18" /> },
      { title: "BullMQ", logo: <FaBullseye size="18" /> },
      { title: "Bun.js", logo: <SiBun size="18" /> },
    ],
  },
  {
    label: "Databases & ORMs",
    items: [
      { title: "PostgreSQL", logo: <BiLogoPostgresql size="18" /> },
      { title: "MongoDB", logo: <BiLogoMongodb size="18" /> },
      { title: "Firebase", logo: <BiLogoFirebase size="18" /> },
      { title: "Prisma", logo: <SiPrisma size="18" /> },
      { title: "Drizzle", logo: <FaDatabase size="18" /> },
    ],
  },
  {
    label: "AI Systems",
    items: [
      { title: "LangChain", logo: <FaLink size="18" /> },
      { title: "LangGraph", logo: <FaProjectDiagram size="18" /> },
      { title: "Agentic AI", logo: <TbRobot size="18" /> },
      { title: "RAG Systems", logo: <FaBrain size="18" /> },
      { title: "MCP Servers", logo: <FaServer size="18" /> },
      { title: "CoT Reasoning", logo: <FaBrain size="18" /> },
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      { title: "Docker", logo: <BiLogoDocker size="18" /> },
      { title: "Git", logo: <BiLogoGit size="18" /> },
      { title: "VS Code", logo: <BiLogoVisualStudio size="18" /> },
      { title: "PM2", logo: <SiPm2 size="18" /> },
      { title: "AWS", logo: <BiLogoAws size="18" /> },
      { title: "CI/CD", logo: <TbRobot size="18" /> },
    ],
  },
];

export default function TechStack() {
  return (
    <div className="tech-stack">
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Skills</h2>
      </div>

      {categories.map((cat) => (
        <div key={cat.label}>
          <div className="category-label">{cat.label}</div>
          <div className="badges-grid">
            {cat.items.map((item, index) => (
              <Reveal
                key={item.title}
                className="stack-badge"
                delay={index * 0.03}
                duration={0.3}
                y={10}
              >
                {item.logo} <span>{item.title}</span>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
