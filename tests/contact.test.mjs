import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { CONTACT_BODY_LIMIT, CONTACT_LIMITS, createContactMail, getSmtpConfig, parseContact, readContactBody } from '../lib/contact.ts';

const valid = { name: 'Alex Morgan', email: 'alex@example.com', subject: 'A new project', message: 'Can we discuss a new project?' };

test('accepts trimmed contact details and preserves message line breaks', () => {
  const result = parseContact({ ...valid, name: ' Alex Morgan ', message: ' Hello\nworld ' });
  assert.deepEqual(result.data, { ...valid, message: 'Hello\nworld' });
});

test('rejects missing fields, non-string values, email lists, and header injection', () => {
  for (const input of [null, [], {}, { ...valid, message: {} }, { ...valid, name: ' ' }, { ...valid, email: 'a@example.com,b@example.com' }, { ...valid, subject: 'Hello\r\nBcc: someone@example.com' }, { ...valid, email: 'not-an-email' }]) {
    assert.ok(parseContact(input).error);
  }
});

test('enforces each field length', () => {
  for (const [field, limit] of Object.entries(CONTACT_LIMITS)) assert.ok(parseContact({ ...valid, [field]: 'x'.repeat(limit + 1) }).error);
});

test('requires SMTP credentials and an authorized plain sender address', () => {
  assert.equal(getSmtpConfig({}), null);
  const config = { SMTP_HOST: 'smtp.example.com', SMTP_PORT: '465', SMTP_USER: 'user', SMTP_PASS: 'secret', SMTP_FROM: 'portfolio@example.com' };
  assert.equal(getSmtpConfig(config).secure, true);
  assert.equal(getSmtpConfig({ ...config, SMTP_PORT: '587' }).requireTLS, true);
  assert.equal(getSmtpConfig({ ...config, SMTP_PORT: '25' }), null);
  assert.equal(getSmtpConfig({ ...config, SMTP_FROM: 'bad\r\n@example.com' }), null);
});

test('keeps destination and sender fixed, uses visitor as Reply-To, and renders plain text', async () => {
  const mail = createContactMail({ ...valid, message: '<script>alert(1)</script>' }, { from: 'portfolio@example.com', to: 'owner@example.com' });
  assert.equal(mail.to, 'owner@example.com');
  assert.equal(mail.from.address, 'portfolio@example.com');
  assert.equal(mail.replyTo.address, valid.email);
  assert.equal(mail.html, undefined);
  assert.equal(mail.disableFileAccess, true);
  const transporter = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' });
  const result = await transporter.sendMail(mail);
  const raw = result.message.toString();
  assert.match(raw, /Reply-To: Alex Morgan <alex@example.com>/);
  assert.match(raw, /From: "Alex Morgan \(alex@example.com\) via Portfolio"\s+<portfolio@example.com>/);
  assert.match(raw, /To: owner@example.com/);
  assert.match(raw, /Content-Type: text\/plain/);
});

test('reads bounded JSON and rejects oversized bodies even without Content-Length', async () => {
  const request = new Request('https://example.com/api/contact', { method: 'POST', body: JSON.stringify(valid) });
  assert.deepEqual(await readContactBody(request), valid);
  const oversized = new Request('https://example.com/api/contact', { method: 'POST', body: 'x'.repeat(CONTACT_BODY_LIMIT + 1) });
  await assert.rejects(readContactBody(oversized), RangeError);
  await assert.rejects(readContactBody(new Request('https://example.com/api/contact', { method: 'POST', body: '{invalid' })), SyntaxError);
});
