type MailAttachment = {
  filename: string;
  content: string;
  content_type?: string;
};

type MailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

const DEFAULT_MAIL_API_URL = "https://api.resend.com/emails";

function getEnv() {
  return {
    provider: process.env.MAIL_PROVIDER ?? "resend",
    apiUrl: process.env.MAIL_API_URL ?? DEFAULT_MAIL_API_URL,
    apiKey: process.env.MAIL_API_KEY,
    from: process.env.MAIL_FROM,
    smtpUser: process.env.MAIL_SMTP_USER,
    smtpPass: process.env.MAIL_SMTP_PASS,
    ownerEmail: process.env.MAIL_TO,
  };
}

export function getOwnerEmail() {
  const { ownerEmail } = getEnv();

  if (!ownerEmail) {
    throw new Error("Mailer is not configured. Set MAIL_TO.");
  }

  return ownerEmail;
}

export async function sendMail(input: MailInput) {
  const { provider, apiKey, apiUrl, from, smtpUser, smtpPass } = getEnv();

  if (provider === "gmail") {
    if (!smtpUser || !smtpPass || !from) {
      throw new Error(
        "Mailer is not configured. Set MAIL_SMTP_USER, MAIL_SMTP_PASS, and MAIL_FROM.",
      );
    }

    const { default: nodemailer } = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const attachments = input.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: Buffer.from(attachment.content, "base64"),
      contentType: attachment.content_type,
    }));

    return transporter.sendMail({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
      attachments,
    });
  }

  if (!apiKey || !from) {
    throw new Error("Mailer is not configured. Set MAIL_API_KEY and MAIL_FROM.");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      reply_to: input.replyTo,
      attachments: input.attachments,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mail API request failed: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
