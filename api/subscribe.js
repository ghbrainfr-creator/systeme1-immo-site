const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM = process.env.RESEND_FROM_EMAIL || 'Système1-Immo <onboarding@resend.dev>';
const OWNER_INBOX = process.env.LEAD_NOTIFICATION_EMAIL;
const RESEND_KEY = process.env.RESEND_API_KEY;

async function sendEmail(payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const body = await r.text();
    throw new Error(`Resend ${r.status}: ${body}`);
  }
  return r.json();
}

function prospectHtml() {
  return `<!doctype html><html><body style="margin:0;background:#070B14;color:#E4E7EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#070B14;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background:#0F1523;border:1px solid #1E2638;border-radius:16px;padding:40px">
        <tr><td>
          <div style="font-size:11px;letter-spacing:.12em;color:#5BA3E8;font-weight:600;margin-bottom:16px">SYSTÈME1-IMMO™</div>
          <h1 style="font-size:24px;line-height:1.3;color:#F5F7FB;margin:0 0 16px">Bien reçu — votre Guide Vitrine Parfaite arrive.</h1>
          <p style="font-size:15px;line-height:1.6;color:#98A2B3;margin:0 0 16px">Les 11 blocs de conversion issus de 1 250 transactions réelles vous attendent dans votre prochain email (sous 24h ouvrées).</p>
          <p style="font-size:15px;line-height:1.6;color:#98A2B3;margin:0 0 24px">En attendant, si vous voulez voir ce que donne une vitrine qui ne dort jamais, jetez un œil à la démo&nbsp;:</p>
          <a href="https://systeme1-immo.com/#demo" style="display:inline-block;background:#5BA3E8;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px">Voir la démo →</a>
          <p style="font-size:12px;line-height:1.6;color:#64748B;margin:32px 0 0;border-top:1px solid #1E2638;padding-top:24px">Vous recevez cet email parce que vous avez demandé le Guide depuis systeme1-immo.com. Désabonnement en 1 clic à venir dans le prochain envoi.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

function ownerHtml(email, meta) {
  return `<!doctype html><html><body style="font-family:-apple-system,sans-serif;background:#f5f7fb;padding:24px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #e4e7ec">
    <div style="font-size:11px;letter-spacing:.1em;color:#5BA3E8;font-weight:600;margin-bottom:8px">NOUVEAU LEAD · GUIDE VITRINE</div>
    <h2 style="font-size:20px;margin:0 0 16px;color:#070B14">${email}</h2>
    <table style="font-size:13px;color:#64748B;width:100%">
      <tr><td style="padding:4px 0">Source</td><td>Exit-intent popup</td></tr>
      <tr><td style="padding:4px 0">User-Agent</td><td style="word-break:break-all">${meta.ua || '—'}</td></tr>
      <tr><td style="padding:4px 0">Referer</td><td>${meta.referer || '—'}</td></tr>
      <tr><td style="padding:4px 0">IP</td><td>${meta.ip || '—'}</td></tr>
      <tr><td style="padding:4px 0">Date</td><td>${new Date().toISOString()}</td></tr>
    </table>
  </div></body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!RESEND_KEY) {
    return res.status(500).json({ error: 'server_misconfigured' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const email = String(body.email || '').trim().toLowerCase();

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  const meta = {
    ua: req.headers['user-agent'],
    referer: req.headers.referer,
    ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'],
  };

  try {
    await sendEmail({
      from: FROM,
      to: [email],
      subject: 'Votre Guide Vitrine Parfaite arrive',
      html: prospectHtml(),
    });

    if (OWNER_INBOX) {
      sendEmail({
        from: FROM,
        to: [OWNER_INBOX],
        subject: `[Lead] ${email}`,
        reply_to: email,
        html: ownerHtml(email, meta),
      }).catch((err) => console.error('owner_notify_failed', err));
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe_failed', err);
    return res.status(502).json({ error: 'send_failed' });
  }
}
