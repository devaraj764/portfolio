"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionDisabled } from "./MotionProvider";

export default function PageTransition({ children }: { children: ReactNode }) {
  const disabled = useMotionDisabled();
  return (
    <motion.div
      className="page-transition"
      initial={disabled ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: disabled ? 0 : 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
