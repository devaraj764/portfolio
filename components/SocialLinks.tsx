import {
  BiLogoGmail,
  BiLogoLinkedinSquare,
  BiLogoGithub,
  BiPhoneCall,
  BiFile,
} from "react-icons/bi";

import { site } from "@/lib/site";

const socials = [
  {
    href: site.linkedin,
    label: "LinkedIn",
    icon: <BiLogoLinkedinSquare size="18" />,
  },
  {
    href: `mailto:${site.email}`,
    label: "Email",
    icon: <BiLogoGmail size="18" />,
  },
  {
    href: site.github,
    label: "GitHub",
    icon: <BiLogoGithub size="18" />,
  },
  {
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    label: "Call",
    icon: <BiPhoneCall size="18" />,
  },
];

export default function SocialLinks() {
  return (
    <>
      <a
        href={site.resumePdf}
        target="_blank"
        rel="noopener noreferrer"
        className="link-button"
        style={{ background: "#2563eb", color: "#ffffff", border: "none" }}
      >
        <BiFile size="18" /> Resume
      </a>
      {socials.map((s) => {
        const external = s.href.startsWith("http");
        return (
          <a
            key={s.label}
            href={s.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={s.label}
            className="link-button"
          >
            {s.icon} {s.label}
          </a>
        );
      })}
    </>
  );
}
