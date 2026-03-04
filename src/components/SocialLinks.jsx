import {
  BiLogoGmail,
  BiLogoLinkedinSquare,
  BiLogoGithub,
  BiPhoneCall,
} from "react-icons/bi";

const socials = [
  {
    href: "https://www.linkedin.com/in/devaraj764/",
    label: "LinkedIn",
    icon: <BiLogoLinkedinSquare size="18" />,
  },
  {
    href: "mailto:deva170725@gmail.com",
    label: "Email",
    icon: <BiLogoGmail size="18" />,
  },
{
    href: "https://github.com/devaraj764",
    label: "GitHub",
    icon: <BiLogoGithub size="18" />,
  },
  {
    href: "tel:+917013240218",
    label: "Call",
    icon: <BiPhoneCall size="18" />,
  },
];

export default function SocialLinks() {
  return (
    <>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={s.label}
          className="link-button"
        >
          {s.icon} {s.label}
        </a>
      ))}
    </>
  );
}
