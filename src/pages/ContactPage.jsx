import {
  BiEnvelope,
  BiPhoneCall,
  BiMap,
} from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import SocialLinks from "../components/SocialLinks";

const contactInfo = [
  {
    icon: <BiEnvelope size="20" />,
    label: "deva170725@gmail.com",
    href: "mailto:deva170725@gmail.com",
  },
  {
    icon: <BiPhoneCall size="20" />,
    label: "+91 7013240218",
    href: "tel:+917013240218",
  },
  {
    icon: <BiMap size="20" />,
    label: "Andhra Pradesh, India",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Contact — DevaRaju Maddhu</title>
        <meta name="description" content="Get in touch with DevaRaju Maddhu — full-stack developer and AI engineer based in Andhra Pradesh, India." />
        <meta property="og:title" content="Contact — DevaRaju Maddhu" />
        <meta property="og:description" content="Get in touch with DevaRaju Maddhu — full-stack developer and AI engineer based in Andhra Pradesh, India." />
        <meta property="og:url" content="https://devarajumaddhu.dev/contact" />
        <link rel="canonical" href="https://devarajumaddhu.dev/contact" />
      </Helmet>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Contact</h2>
      </div>

      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="exp-card"
        >
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

          <a
            href="mailto:deva170725@gmail.com"
            className="contact-cta"
          >
            <BiEnvelope size="20" /> Send Email
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="exp-card"
        >
          <h3 className="exp-card-title" style={{ marginBottom: 20 }}>
            Socials
          </h3>
          <div className="banner-actions">
            <SocialLinks />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
