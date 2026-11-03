"use client";

import { useEffect, useRef, useState } from "react";
import { BiCheck, BiCopy } from "react-icons/bi";
import { site } from "@/lib/site";

export default function CopyEmail() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setMessage("Email copied");
    } catch {
      setMessage("Use the email link to get in touch");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 3000);
  }

  return <div className="copy-email-row"><a href="/contact#contact-form-title">{site.email}</a><button onClick={copy} className="copy-email-button" aria-label="Copy email address">{message === "Email copied" ? <BiCheck size={17} /> : <BiCopy size={17} />}</button><span className="copy-feedback" role="status">{message}</span></div>;
}
