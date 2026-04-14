import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { escapeHtml, getMailFrom, getMailTo, getResendApiKey } from '../../lib/mail';

export const POST: APIRoute = async ({ request }) => {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not set (check Vercel Environment Variables)');
    return new Response(JSON.stringify({ error: 'Email service is not configured.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(apiKey);
    const safeName = escapeHtml(String(name));
    const safeBody = escapeHtml(String(message)).replace(/\n/g, '<br />');

    const { error } = await resend.emails.send({
      from: getMailFrom(),
      to: getMailTo(),
      replyTo: email,
      subject: `Contact from briler.net: ${name}`,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr />
        <p>${safeBody}</p>
      `,
    });

    if (error) {
      console.error('Resend contact error:', error.name, error.message);
      return new Response(JSON.stringify({ error: 'Could not send email. Please try again later.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact error:', err);
    return new Response(JSON.stringify({ error: 'Internal error. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
