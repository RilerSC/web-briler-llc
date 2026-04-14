/** Server-only helpers for Resend. Prefer process.env on Vercel (runtime) over import.meta.env (build-time). */
export function getResendApiKey(): string | undefined {
  if (typeof process !== 'undefined' && process.env.RESEND_API_KEY) {
    return process.env.RESEND_API_KEY;
  }
  return import.meta.env.RESEND_API_KEY as string | undefined;
}

export function getMailFrom(): string {
  if (typeof process !== 'undefined' && process.env.RESEND_FROM) {
    return process.env.RESEND_FROM;
  }
  return (import.meta.env.RESEND_FROM as string | undefined) ?? 'Briler <onboarding@resend.dev>';
}

export function getMailTo(): string {
  if (typeof process !== 'undefined' && process.env.RESEND_TO) {
    return process.env.RESEND_TO;
  }
  return (import.meta.env.RESEND_TO as string | undefined) ?? 'info@briler.net';
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
