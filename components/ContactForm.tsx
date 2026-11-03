"use client";

import { useRef, useState, type FormEvent } from "react";
import { BiCheckCircle, BiErrorCircle, BiRightArrowAlt } from "react-icons/bi";
import { CONTACT_LIMITS } from "@/lib/contact";

type Status = { kind: "idle" | "sending" | "success" | "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const pending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    pending.current = true;
    setStatus({ kind: "sending", message: "Sending your message…" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(values)),
        signal: AbortSignal.timeout(45_000),
      });
      const result: unknown = await response.json();
      const message = result && typeof result === "object" && "message" in result && typeof result.message === "string" ? result.message : "Something went wrong. Please try again.";
      if (!response.ok) {
        setStatus({ kind: "error", message });
        return;
      }
      form.reset();
      setStatus({ kind: "success", message });
    } catch {
      setStatus({ kind: "error", message: "We couldn't confirm your message was sent. Please check your connection before trying again." });
    } finally {
      pending.current = false;
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} aria-labelledby="contact-form-title" aria-busy={status.kind === "sending"}>
      <div className="eyebrow">LET&apos;S START A CONVERSATION</div>
      <h3 id="contact-form-title">What do you have in mind<span className="hero-period">?</span></h3>
      <p className="contact-form-description">A project, an opportunity, or just a hello. Send me a message here.</p>
      <fieldset disabled={status.kind === "sending"}>
        <div className="contact-form-row">
          <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="Alex Morgan" maxLength={CONTACT_LIMITS.name} required /></label>
          <label htmlFor="contact-email">Your email<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@example.com" maxLength={CONTACT_LIMITS.email} required /></label>
        </div>
        <label htmlFor="contact-subject">Subject<input id="contact-subject" name="subject" placeholder="Let's build something together" maxLength={CONTACT_LIMITS.subject} required /></label>
        <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" placeholder="Tell me a little about what you're thinking…" rows={6} maxLength={CONTACT_LIMITS.message} required /></label>
        <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="contact-form-submit"><span>I&apos;ll reply to the email you provide.</span><button className="primary-button" type="submit">{status.kind === "sending" ? <>Sending<span className="sending-dots" aria-hidden="true">…</span></> : <>Send message <BiRightArrowAlt size={21} /></>}</button></div>
      </fieldset>
      <div className={`contact-form-status ${status.kind}`} role="status" aria-live="polite" aria-atomic="true">{status.kind === "success" && <BiCheckCircle size={20} />}{status.kind === "error" && <BiErrorCircle size={20} />}<span>{status.message}</span></div>
    </form>
  );
}
