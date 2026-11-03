"use client";

import { useId, useState } from "react";
import { BiCodeAlt, BiGitBranch, BiLayer, BiCheck, BiRightArrowAlt } from "react-icons/bi";
import InteractiveSurface from "./InteractiveSurface";

const workflows = [
  {
    label: "Web applications", file: "application.flow", icon: <BiCodeAlt />,
    title: "Every layer, thoughtfully connected.",
    description: "Responsive interfaces meet reliable APIs and well-structured data. Built to work together from day one.",
    steps: [{ title: "Interface", detail: "React · Next.js", icon: <BiLayer /> }, { title: "Services", detail: "Node.js · Python", icon: <BiCodeAlt /> }, { title: "Data", detail: "PostgreSQL · MongoDB", icon: <BiGitBranch /> }],
    code: ["interface → interaction", "request   → response", "idea      → application"],
  },
  {
    label: "AI systems", file: "agent.flow", icon: <BiGitBranch />,
    title: "More than a prompt. A connected system.",
    description: "Stateful agents that reason through a task, use the right tools, and bring context into every step.",
    steps: [{ title: "Context", detail: "Retrieval · RAG", icon: <BiLayer /> }, { title: "Reasoning", detail: "LangChain · LangGraph", icon: <BiGitBranch /> }, { title: "Action", detail: "Tools · Workflows", icon: <BiCodeAlt /> }],
    code: ["context   → understanding", "reasoning → tool invocation", "state     → next action"],
  },
];

export default function BuildProcess() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const workflow = workflows[selected];
  return (
    <div className="process-layout">
      <div className="process-copy">
        <p className="section-description">I enjoy the space where a great interface meets a powerful system. Here&apos;s how the pieces come together.</p>
        <div className="workflow-options" role="group" aria-label="Choose a development workflow">
          {workflows.map((item, index) => <button key={item.label} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-controls={`${id}-workflow`} className={`workflow-option ${selected === index ? "is-selected" : ""}`}>{item.icon}<span>{item.label}</span><BiRightArrowAlt /></button>)}
        </div>
        <div className="process-principle"><BiCheck /><span>Clear interfaces. Connected systems. Purposeful details.</span></div>
      </div>
      <InteractiveSurface className="workflow-surface">
        <div id={`${id}-workflow`} className="workflow-window" aria-live="polite" aria-atomic="true">
          <div className="window-toolbar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>{workflow.file}</span><BiCodeAlt aria-hidden="true" /></div>
          <div className="workflow-content">
            <span className="eyebrow">THE CONNECTIONS MATTER</span>
            <h3>{workflow.title}</h3>
            <p>{workflow.description}</p>
            <div className="workflow-diagram">{workflow.steps.map((step, index) => <div className="workflow-step" key={step.title}><span className="workflow-step-icon">{step.icon}</span><strong>{step.title}</strong><span>{step.detail}</span>{index < 2 && <span className="workflow-connector" aria-hidden="true"><i /></span>}</div>)}</div>
            <div className="workflow-code" aria-hidden="true">{workflow.code.map((line, index) => <div key={line}><span>0{index + 1}</span><code>{line}</code></div>)}</div>
          </div>
        </div>
      </InteractiveSurface>
    </div>
  );
}
