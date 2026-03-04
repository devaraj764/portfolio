import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        <SocialLinks />
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} DevaRaju Maddhu. All rights reserved.
      </p>
    </footer>
  );
}
