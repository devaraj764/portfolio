import { NavLink } from "react-router-dom";
import {
  BiHome,
  BiFolder,
  BiBookOpen,
  BiBriefcase,
  BiEnvelope,
} from "react-icons/bi";

const links = [
  { to: "/", label: "Home", icon: <BiHome size="18" /> },
  { to: "/projects", label: "Projects", icon: <BiFolder size="18" /> },
  { to: "/blog", label: "Blog", icon: <BiBookOpen size="18" /> },
  { to: "/experience", label: "Experience", icon: <BiBriefcase size="18" /> },
  { to: "/contact", label: "Contact", icon: <BiEnvelope size="18" /> },
];

export default function Navbar() {
  return (
    <nav className="navbar-fixed">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span>&lt;</span>DM<span> /&gt;</span>
        </NavLink>
        <div className="navbar-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `navbar-link${isActive ? " navbar-link-active" : ""}`
              }
            >
              {link.icon}
              <span className="nav-label">{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
