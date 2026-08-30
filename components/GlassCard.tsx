import type { ReactNode } from "react";

import Reveal from "./Reveal";

export default function GlassCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={`exp-card ${className}`} delay={delay}>
      {children}
    </Reveal>
  );
}
