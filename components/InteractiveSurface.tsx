"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useMotionDisabled } from "./MotionProvider";

export default function InteractiveSurface({ children, className = "", tilt = false }: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const surface = useRef<HTMLDivElement>(null);
  const disabled = useMotionDisabled();

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (disabled || event.pointerType !== "mouse" || !surface.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    surface.current.style.setProperty("--pointer-x", `${x * 100}%`);
    surface.current.style.setProperty("--pointer-y", `${y * 100}%`);
    if (tilt) {
      surface.current.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
      surface.current.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
    }
  }

  function resetTilt() {
    surface.current?.style.setProperty("--tilt-x", "0deg");
    surface.current?.style.setProperty("--tilt-y", "0deg");
  }

  return <div ref={surface} className={`interactive-surface ${tilt ? "surface-tilt" : ""} ${className}`} onPointerMove={followPointer} onPointerLeave={resetTilt}>
    {children}
  </div>;
}
