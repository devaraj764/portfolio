"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { BiPause, BiPlay } from "react-icons/bi";

const MotionContext = createContext(false);
export const useMotionDisabled = () => useContext(MotionContext);

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToMotion = (callback: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getMotionPreference = () => window.matchMedia(motionQuery).matches;
const getServerMotionPreference = () => false;

export default function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useSyncExternalStore(subscribeToMotion, getMotionPreference, getServerMotionPreference);
  const [paused, setPaused] = useState(false);
  const disabled = paused || Boolean(prefersReducedMotion);

  return (
    <MotionContext.Provider value={disabled}>
      <MotionConfig reducedMotion={disabled ? "always" : "user"}>
        <div className="motion-root" data-motion={disabled ? "paused" : "playing"}>
          {children}
          <button
            className="motion-toggle"
            onClick={() => setPaused(!paused)}
            disabled={prefersReducedMotion}
            title={prefersReducedMotion ? "Motion disabled by your system preference" : undefined}
            aria-pressed={paused}
            aria-label={prefersReducedMotion ? "Motion disabled by system preference" : paused ? "Resume decorative animations" : "Pause decorative animations"}
          >
            {paused ? <BiPlay size={16} /> : <BiPause size={16} />}
            <span>{disabled ? "Motion off" : "Motion on"}</span>
          </button>
        </div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}
