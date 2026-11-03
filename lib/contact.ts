export const CONTACT_BODY_LIMIT = 24_000;
export const CONTACT_LIMITS = { name: 100, email: 254, subject: 160, message: 5000 } as const;

export type ContactMessage = { name: string; email: string; subject: string; message: string };
export type ContactResult = { data: ContactMessage; error?: never } | { error: string; data?: never };

export function parseContact(value: unknown): ContactResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Please complete all fields." };
  const input = value as Record<string, unknown>;
  const data = {} as ContactMessage;
  for (const field of Object.keys(CONTACT_LIMITS) as (keyof ContactMessage)[]) {
    if (typeof input[field] !== "string") return { error: "Please complete all fields." };
    data[field] = input[field].trim();
    if (!data[field] || data[field].length > CONTACT_LIMITS[field]) return { error: `Please enter a valid ${field} (up to ${CONTACT_LIMITS[field]} characters).` };
  }
  if (/[\r\n\x00-\x1f\x7f]/.test(data.name + data.email + data.subject)) return { error: "Name, email, and subject must each be a single line." };
  if (!/^[^\s<>@,;:]+@[^\s<>@,;:]+\.[^\s<>@,;:]+$/.test(data.email)) return { error: "Please enter a valid email address." };
  if (data.message.includes("\0")) return { error: "Please enter a valid message." };
  return { data };
}

export function getSmtpConfig(env: Record<string, string | undefined>) {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS;
  const from = env.SMTP_FROM?.trim();
  const port = Number(env.SMTP_PORT || "465");
  if (!host || !user || !pass || !from || !Number.isInteger(port) || ![465, 587].includes(port)) return null;
  if (/[\r\n]/.test(host + user + from) || !/^[^\s<>@,;:]+@[^\s<>@,;:]+\.[^\s<>@,;:]+$/.test(from)) return null;
  return { host, port, secure: port === 465, requireTLS: port !== 465, auth: { user, pass }, from };
}

export function createContactMail(data: ContactMessage, addresses: { from: string; to: string }) {
  return {
    // The address must stay the authenticated SMTP sender (SPF/DKIM/DMARC); the
    // visitor is shown as the sender name and receives replies via Reply-To.
    from: { name: `${data.name} (${data.email}) via Portfolio`, address: addresses.from },
    to: addresses.to,
    replyTo: { name: data.name, address: data.email },
    subject: `[Portfolio] ${data.subject}`,
    text: `New message from your portfolio\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
    // Form content is plain text; it cannot load attachments, URLs, or local files.
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export async function readContactBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > CONTACT_BODY_LIMIT) throw new RangeError("Request too large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > CONTACT_BODY_LIMIT) {
        await reader.cancel();
        throw new RangeError("Request too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
