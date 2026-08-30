import SocialLinks from "./SocialLinks";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <SocialLinks />
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
