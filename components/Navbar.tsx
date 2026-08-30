"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiHome,
  BiFolder,
  BiBookOpen,
  BiBriefcase,
  BiFile,
  BiEnvelope,
  BiMenu,
  BiX,
} from "react-icons/bi";

const links = [
  { href: "/", label: "Home", icon: <BiHome size="18" /> },
  { href: "/projects", label: "Projects", icon: <BiFolder size="18" /> },
  { href: "/blog", label: "Blog", icon: <BiBookOpen size="18" /> },
  { href: "/experience", label: "Experience", icon: <BiBriefcase size="18" /> },
  { href: "/resume", label: "Resume", icon: <BiFile size="18" /> },
  { href: "/contact", label: "Contact", icon: <BiEnvelope size="18" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="navbar-fixed">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo" onClick={closeMenu}>
          <span>&lt;</span>DM<span> /&gt;</span>
        </Link>
        <div className="navbar-links desktop-menu">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link${isActive(link.href) ? " navbar-link-active" : ""}`}
            >
              {link.icon}
              <span className="nav-label">{link.label}</span>
            </Link>
          ))}
        </div>
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <BiX size="28" /> : <BiMenu size="28" />}
        </button>
      </div>

      {isOpen && (
        <div className="mobile-dropdown">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`mobile-dropdown-link${
                isActive(link.href) ? " mobile-dropdown-link-active" : ""
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
