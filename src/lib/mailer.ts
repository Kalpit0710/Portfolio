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

const MAIL_API_URL = process.env.MAIL_API_URL ?? "https://api.resend.com/emails";
const MAIL_API_KEY = process.env.MAIL_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM;

export function getOwnerEmail() {
  return process.env.MAIL_TO ?? "kalpit677@gmail.com";
}

export async function sendMail(input: MailInput) {
  if (!MAIL_API_KEY || !MAIL_FROM) {
    throw new Error("Mailer is not configured. Set MAIL_API_KEY and MAIL_FROM.");
  }

  const response = await fetch(MAIL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MAIL_API_KEY}`,
    },
    body: JSON.stringify({
      from: MAIL_FROM,
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
}
