import nodemailer from "nodemailer";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createContactMail, getSmtpConfig, parseContact, readContactBody } from "@/lib/contact";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function respond(message: string, status: number) {
  return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // OpenNext may normalize request.url to localhost in a local Worker preview.
  // The incoming Host header retains the host used by the browser.
  const origin = request.headers.get("origin");
  const expected = new URL(request.url);
  const host = request.headers.get("host");
  if (host) expected.host = host;
  if (!origin || (origin !== expected.origin && origin !== new URL(site.url).origin)) return respond("Please send your message using the contact form.", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return respond("Please send a JSON message.", 415);

  let body: unknown;
  try {
    body = await readContactBody(request);
  } catch (error) {
    return respond(error instanceof RangeError ? "Your message is too large." : "Please check your message and try again.", error instanceof RangeError ? 413 : 400);
  }
  if (body && typeof body === "object" && "website" in body && body.website) return respond("Your message has been sent. Thank you!", 200);
  const parsed = parseContact(body);
  if (parsed.error || !parsed.data) return respond(parsed.error || "Please complete all fields.", 400);

  const config = getSmtpConfig(process.env);
  if (!config) return respond("The contact form is temporarily unavailable. Please try again later or use the contact details below.", 503);

  try {
    const { env } = await getCloudflareContext({ async: true });
    const ip = request.headers.get("cf-connecting-ip") || "local-preview";
    const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: `contact:${ip}` });
    if (!success) return Response.json({ message: "Too many messages. Please wait a minute before trying again." }, { status: 429, headers: { "Retry-After": "60", "Cache-Control": "no-store" } });
  } catch {
    // Never send without the configured rate limiter.
    console.error(JSON.stringify({ event: "contact_rate_limiter_unavailable" }));
    return respond("The contact form is temporarily unavailable. Please try again later.", 503);
  }

  const { from, ...smtp } = config;
  const transporter = nodemailer.createTransport({
    ...smtp,
    name: new URL(site.url).hostname,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    dnsTimeout: 10_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const info = await transporter.sendMail(createContactMail(parsed.data, { from, to: site.email }));
    if (!info.accepted?.length || info.rejected?.length) throw new Error("Message not accepted");
    return respond("Your message has been sent. Thank you!", 200);
  } catch {
    // Do not log credentials, message contents, or provider errors containing personal data.
    console.error(JSON.stringify({ event: "contact_email_failed" }));
    return respond("Your message could not be sent. Please try again later or use the contact details below.", 502);
  } finally {
    transporter.close();
  }
}
