import { getAllProjects } from './projectLoader';

export const resumeData = {
  name: "DEVARAJU MADDHU",
  title: "Full Stack Developer & AI Engineer",
  location: "Andhra Pradesh, India",
  phone: "+91 7013240218",
  email: "deva170725@gmail.com",
  linkedin: "https://www.linkedin.com/in/devaraj764/",
  github: "https://github.com/devaraj764",
  summary:
    "Full-stack developer with experience in Next.js, React, TypeScript, Node.js, and Java Spring Boot, focused on building AI-native applications powered by agentic workflows. I design scalable frontends and robust backend services while building autonomous AI agents using LangChain and LangGraph for multi-step reasoning, tool invocation, and stateful execution. Experienced in real-time WebSockets, contract analysis systems, RAG servers, and deploying production-ready Agentic AI systems with Docker and CI/CD pipelines.",

  skills: [
    {
      category: "Frontend & Mobile",
      items: "React.js, Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI, React Native"
    },
    {
      category: "Backend & APIs",
      items: "Node.js, Express.js, Java Spring Boot, RESTful API design, Auth & Authorization, File Upload Pipelines"
    },
    {
      category: "Real-Time & Async Systems",
      items: "WebSockets, BullMQ, Event-driven Scheduling, Multi-user Data Synchronization"
    },
    {
      category: "AI Systems",
      items: "Agentic AI Architectures, LangChain, LangGraph, Chain-of-Thought (CoT) Reasoning, RAG-based Retrieval Systems, MCP-style Tool Servers"
    },
    {
      category: "Databases & ORMs",
      items: "SQL, Prisma, Drizzle, Schema Design & Data Modeling"
    },
    {
      category: "DevOps & Infrastructure",
      items: "Docker, CI/CD Pipelines, PM2 Process Management, VPS & Cloud Deployment"
    }
  ],

  workExperience: [
    {
      company: "AI4LEX",
      location: "Italy (Remote)",
      role: "SDE - 2",
      duration: "March 2025 - Present",
      bullets: [
        "Architected scalable, production-grade applications using Next.js, React, TypeScript, and Java Spring Boot.",
        "Engineered real-time features using WebSockets and SSE to enable live data synchronization across active users.",
        "Built AI-powered modules including RAG pipelines, contract analysis systems, and MCP-style AI servers.",
        "Designed and implemented Agentic AI workflows using LangChain and LangGraph for multi-step reasoning, tool orchestration, and stateful execution.",
        "Contributed to DevOps infrastructure leveraging Docker, Nginx, and CI/CD pipelines for reliable multi-environment deployments."
      ]
    },
    {
      company: "Muzigal",
      location: "Hyderabad (Remote)",
      role: "Full Stack Developer",
      duration: "Dec 2023 - Feb 2025",
      bullets: [
        "Crafted responsive UI components and seamlessly integrated backend REST APIs using React and Next.js.",
        "Leveraged Node.js and Express to architect and optimize API endpoints connecting frontend interfaces with database systems.",
        "Maintained high performance and smooth communication across web and mobile user touchpoints."
      ]
    },
    {
      company: "Edgroom Pvt Ltd",
      location: "Visakhapatnam (Remote)",
      role: "Full Stack Developer",
      duration: "May 2022 - May 2023",
      bullets: [
        "Developed reusable React UI components for static and dynamic interfaces, streamlining codebase maintainability.",
        "Utilized Next.js App Router and SSR to enhance search engine visibility and dynamic routing capabilities.",
        "Achieved a 30% performance boost through component optimization, code-splitting, and render state enhancements."
      ]
    }
  ],

  education: [
    {
      institution: "Rajiv Gandhi University of Knowledge & Technologies - Srikakulam",
      degree: "B.Tech in Computer Science & Engineering",
      score: "CGPA: 8.0",
      year: "May 2023",
      organizations: ["TechSeminal", "Placement-Cell Technical-Team"]
    }
  ],

  leadership: [
    {
      role: "Backend Development Trainer",
      duration: "July 2022 - Dec 2022",
      description: "Trained 18 college juniors on backend development using Node.js, MongoDB, Express, and JWT security. Conducted technical sessions on Git and collaborative version control."
    }
  ],

  interests: [
    "Geopolitics",
    "Business Case Studies",
    "Tech Architecture",
    "Movies & Anime"
  ]
};

// Helper function to fetch live projects directly from project markdown files
export function getResumeProjects() {
  const allProjects = getAllProjects();
  return allProjects.map((p) => ({
    title: p.title,
    slug: p.slug,
    tags: p.tags,
    github: p.github,
    visit_link: p.visit_link
  }));
}
