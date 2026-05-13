// Vercel Serverless Function — envoi de la confirmation candidat via Resend
// Requires env var: RESEND_API_KEY
// Cible : n.mouaouia@guyhoquet.com

const TO = 'n.mouaouia@guyhoquet.com';
const FROM = 'GH ELNE Test agent <onboarding@resend.dev>';

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'RESEND_API_KEY missing on Vercel. Add it in Project Settings > Environment Variables.'
    });
  }

  const {
    prenom,
    email,
    archetype_name,
    archetype_quote,
    forces,
    motivation,
    slot_date,
    slot_time,
    pact_signed,
    calendar_url
  } = req.body || {};

  if (!prenom || !archetype_name) {
    return res.status(400).json({ error: 'prenom et archetype_name requis' });
  }

  const subject = `Test agent GH ELNE — ${prenom} · ${archetype_name}`;
  const forcesHtml = Array.isArray(forces)
    ? forces.map(f => `<li style="margin-bottom: 6px;">${esc(f)}</li>`).join('')
    : '';

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#F5F7FB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0F0A30;">
  <div style="max-width:620px;margin:0 auto;padding:32px 24px;">
    <div style="background:#0F0A30;color:#fff;padding:24px 28px;border-radius:14px 14px 0 0;">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:8px;">GH ELNE · NOUVEAU CANDIDAT</div>
      <div style="font-size:22px;font-weight:700;">${esc(prenom)}</div>
      <div style="font-size:14px;color:#4A9BFF;margin-top:4px;">${esc(archetype_name)}</div>
    </div>
    <div style="background:#fff;padding:28px;border-radius:0 0 14px 14px;border:1px solid #E4E7EC;border-top:none;">
      <p style="font-style:italic;color:#006FFF;font-size:16px;margin:0 0 24px;">${esc(archetype_quote || '')}</p>

      ${motivation ? `
      <div style="margin-bottom:24px;padding:16px 18px;background:#F5F7FB;border-left:3px solid #006FFF;border-radius:4px;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748B;font-weight:600;margin-bottom:6px;">CE QU'IL VEUT APPORTER À SES CLIENTS</div>
        <div style="font-style:italic;color:#0F0A30;font-size:15px;line-height:1.5;">« ${esc(motivation)} »</div>
      </div>` : ''}

      ${forcesHtml ? `
      <div style="margin-bottom:24px;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748B;font-weight:600;margin-bottom:10px;">3 FORCES VALIDÉES</div>
        <ul style="margin:0;padding-left:20px;color:#0F0A30;font-size:14.5px;line-height:1.55;">${forcesHtml}</ul>
      </div>` : ''}

      <div style="margin-bottom:24px;padding:16px 18px;background:#F5F7FB;border-radius:8px;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#64748B;font-weight:600;margin-bottom:6px;">CRÉNEAU SOUHAITÉ · 30 MIN</div>
        <div style="color:#0F0A30;font-size:16px;font-weight:600;">${esc(slot_date)} · ${esc(slot_time)}</div>
      </div>

      ${pact_signed ? `
      <div style="margin-bottom:24px;padding:14px 16px;background:rgba(0,111,255,0.06);border:1px solid rgba(0,111,255,0.2);border-radius:8px;color:#0F0A30;font-size:14px;">
        ✓ <strong>Pacte signé</strong> par le candidat : « Ne plus jamais dire j'aurais dû. »
      </div>` : ''}

      ${calendar_url ? `
      <div style="margin:28px 0 8px;text-align:center;">
        <a href="${esc(calendar_url)}" style="display:inline-block;background:#006FFF;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Ajouter à mon agenda Google</a>
      </div>` : ''}

      ${email ? `
      <hr style="border:none;border-top:1px solid #E4E7EC;margin:28px 0;">
      <div style="font-size:13px;color:#64748B;">
        Contact candidat : <a href="mailto:${esc(email)}" style="color:#006FFF;">${esc(email)}</a>
      </div>` : `
      <hr style="border:none;border-top:1px solid #E4E7EC;margin:28px 0;">
      <div style="font-size:13px;color:#98A2B3;font-style:italic;">
        Le candidat n'a pas laissé d'email. Confirmation à faire via WhatsApp si tu as son numéro.
      </div>`}

      <div style="font-size:11px;color:#98A2B3;margin-top:24px;letter-spacing:0.04em;">
        Envoyé automatiquement depuis le Test agent GH ELNE
      </div>
    </div>
  </div>
</body></html>`;

  const text = [
    `Nouveau candidat GH ELNE : ${prenom}`,
    `Archétype : ${archetype_name}`,
    archetype_quote || '',
    '',
    motivation ? `Ce qu'il veut apporter : « ${motivation} »\n` : '',
    forces && forces.length ? 'Forces :\n' + forces.map(f => `- ${f}`).join('\n') + '\n' : '',
    `Créneau souhaité : ${slot_date} à ${slot_time}`,
    pact_signed ? `\n✓ Pacte signé : « Ne plus jamais dire j'aurais dû. »` : '',
    calendar_url ? `\nAjouter à ton agenda : ${calendar_url}` : '',
    email ? `\nContact candidat : ${email}` : '\nPas d\'email candidat — confirme via WhatsApp.'
  ].filter(Boolean).join('\n');

  const payload = {
    from: FROM,
    to: TO,
    subject,
    html,
    text
  };
  if (email) payload.reply_to = email;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(502).json({ error: 'Resend API failed', status: r.status, detail: data });
    }
    return res.status(200).json({ ok: true, id: data.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
