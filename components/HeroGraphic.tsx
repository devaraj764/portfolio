import InteractiveSurface from "./InteractiveSurface";
import Image from "next/image";
import { BiCodeAlt, BiGitBranch, BiChip } from "react-icons/bi";
import { site } from "@/lib/site";

export default function HeroGraphic() {
  return (
    <InteractiveSurface tilt className="hero-graphic">
      <div className="graphic-grid" aria-hidden="true" />
      <div className="orbit orbit-outer" aria-hidden="true"><span /></div>
      <div className="orbit orbit-inner" aria-hidden="true"><span /></div>
      <svg className="graphic-connections" viewBox="0 0 480 480" fill="none" aria-hidden="true">
        <path d="M80 120H165L240 240L340 110H410M70 350H160L240 240L350 350H420" />
        <path className="connection-signal" d="M80 120H165L240 240L340 110H410M70 350H160L240 240L350 350H420" />
      </svg>
      <div className="portrait-frame">
        <Image src={site.banner} alt="DevaRaju Maddhu, full stack developer and AI engineer" width={360} height={360} priority className="hero-portrait" sizes="(max-width: 600px) 200px, 260px" />
      </div>
      <div className="graphic-node node-web"><BiCodeAlt /><span>Full stack<span className="node-detail">Ideas → interfaces</span></span></div>
      <div className="graphic-node node-ai"><BiChip /><span>AI engineering<span className="node-detail">Reason. Build. Ship.</span></span></div>
      <div className="graphic-node node-agent"><BiGitBranch /><span>Agentic workflows</span><i /></div>
      <span className="graphic-coordinate coordinate-top" aria-hidden="true">01 / THE BUILDER</span>
      <span className="graphic-coordinate coordinate-bottom" aria-hidden="true">HUMAN × TECHNOLOGY</span>
    </InteractiveSurface>
  );
}
