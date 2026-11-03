import type { Metadata } from "next";
import { BiEnvelope, BiPhoneCall, BiMap } from "react-icons/bi";

import ContactForm from "@/components/ContactForm";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import ResumeViewer from "@/components/ResumeViewer";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/lib/site";

const description = `Get in touch with ${site.name} — full-stack developer and AI engineer based in ${site.location}. View or download the resume.`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — DevaRaju Maddhu",
    description,
    url: "/contact",
  },
};

const contactInfo = [
  {
    icon: <BiEnvelope size="20" />,
    label: site.email,
    href: "#contact-form-title",
  },
  {
    icon: <BiPhoneCall size="20" />,
    label: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    icon: <BiMap size="20" />,
    label: site.location,
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Contact</h2>
      </div>

      <div className="contact-page-intro"><div className="eyebrow">IDEAS START WITH A HELLO</div><h1>Let&apos;s build something great<span className="hero-period">.</span></h1><p>Have a project in mind or want to connect? I&apos;d love to hear from you.</p></div>
      <div className="contact-grid">
        <Reveal className="contact-form-card"><ContactForm /></Reveal>
        <div className="contact-sidebar">
        <Reveal className="exp-card">
          <h3 className="exp-card-title" style={{ marginBottom: 20 }}>
            Get in Touch
          </h3>
          <div className="contact-info-list">
            {contactInfo.map((item) => (
              <div key={item.label} className="contact-info-item">
                {item.icon}
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>

        </Reveal>

        <Reveal className="exp-card" delay={0.1}>
          <h3 className="exp-card-title" style={{ marginBottom: 20 }}>
            Socials
          </h3>
          <div className="banner-actions">
            <SocialLinks />
          </div>
        </Reveal>
        </div>
      </div>

      <Reveal className="exp-card resume-embed-card" delay={0.2}>
        <h3 className="exp-card-title" id="resume">
          Resume
        </h3>
        <ResumeViewer
          file={site.resumePdf}
          downloadName="DevaRaju_Maddhu_Resume.pdf"
        />
      </Reveal>
    </PageTransition>
  );
}
