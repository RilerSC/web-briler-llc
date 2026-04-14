import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { escapeHtml, getMailFrom, getMailTo, getResendApiKey } from '../../lib/mail';

export const POST: APIRoute = async ({ request }) => {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.error('subscribe: RESEND_API_KEY is not set (check Vercel Environment Variables)');
    return new Response(JSON.stringify({ error: 'Email service is not configured.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'Email is required.' }), {
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
    const safeEmail = escapeHtml(email);

    const { error } = await resend.emails.send({
      from: getMailFrom(),
      to: getMailTo(),
      subject: `New subscription: ${email}`,
      html: `
        <h2>New launch subscription</h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p>This user wants to be notified when briler.net goes live.</p>
      `,
    });

    if (error) {
      console.error('Resend subscribe error:', error.name, error.message);
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
    console.error('Subscribe error:', err);
    return new Response(JSON.stringify({ error: 'Internal error. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
