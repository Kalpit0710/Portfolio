type MailSection = {
  label: string;
  value: string;
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createThemedMail({
  title,
  subtitle,
  intro,
  sections,
  footer,
}: {
  title: string;
  subtitle: string;
  intro: string;
  sections: MailSection[];
  footer: string;
}) {
  const details = sections
    .map(
      (section) => `
        <tr>
          <td style="padding:10px 0 2px;color:#94a3b8;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(section.label)}</td>
        </tr>
        <tr>
          <td style="padding:0 0 12px;color:#e2e8f0;font-size:15px;line-height:1.6;">${escapeHtml(section.value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
  <body style="margin:0;padding:0;background:#020617;font-family:Inter,Segoe UI,Arial,sans-serif;color:#e2e8f0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 0;background:#020617;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:linear-gradient(160deg,#0f172a 0%,#111827 100%);border:1px solid #1f2937;border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;background:linear-gradient(90deg,rgba(59,130,246,0.25),rgba(59,130,246,0.08));border-bottom:1px solid #1f2937;">
                <p style="margin:0;color:#60a5fa;font-weight:600;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Kalpit Portfolio</p>
                <h1 style="margin:10px 0 4px;color:#ffffff;font-size:24px;line-height:1.3;">${escapeHtml(title)}</h1>
                <p style="margin:0;color:#cbd5e1;font-size:14px;">${escapeHtml(subtitle)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;">
                <p style="margin:0 0 18px;color:#dbeafe;font-size:15px;line-height:1.7;">${escapeHtml(intro)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:rgba(15,23,42,0.8);border:1px solid #1f2937;border-radius:14px;padding:16px;">
                  ${details}
                </table>
                <p style="margin:18px 0 0;color:#94a3b8;font-size:13px;line-height:1.7;">${escapeHtml(footer)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>`;
}
