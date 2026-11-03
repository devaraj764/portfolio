"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { BiUpArrowAlt } from "react-icons/bi";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [showTop, setShowTop] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", value => setShowTop(value > 0.15));

  return <>
    <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    {showTop && <a href="#page-top" className="back-to-top" aria-label="Back to top"><BiUpArrowAlt size={22} /></a>}
  </>;
}
