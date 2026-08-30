"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  /** "view" animates when scrolled into view, "mount" animates immediately. */
  trigger?: "view" | "mount";
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Client-side entrance animation that accepts server-rendered children, so
 * pages using it can stay server components.
 */
export default function Reveal({
  children,
  trigger = "view",
  delay = 0,
  duration = 0.4,
  y = 20,
  scale,
  className,
  style,
}: RevealProps) {
  const from = { opacity: 0, y, ...(scale !== undefined ? { scale } : {}) };
  const to = { opacity: 1, y: 0, ...(scale !== undefined ? { scale: 1 } : {}) };

  return (
    <motion.div
      className={className}
      style={style}
      initial={from}
      {...(trigger === "view"
        ? { whileInView: to, viewport: { once: true, margin: "-40px" } }
        : { animate: to })}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
