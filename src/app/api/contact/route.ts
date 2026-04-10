import { createThemedMail } from "@/lib/mail-template";
import { getOwnerEmail, sendMail } from "@/lib/mailer";
import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  if (email.length > 254 || email.includes(" ")) {
    return false;
  }

  const atIndex = email.indexOf("@");
  const lastAtIndex = email.lastIndexOf("@");

  if (atIndex <= 0 || atIndex !== lastAtIndex) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!localPart || !domain || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  return domain.includes(".");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await Promise.all([
      sendMail({
        to: email,
        subject: "Thanks for contacting Kalpit Agarwal",
        html: createThemedMail({
          title: "Message Received",
          subtitle: "Thanks for connecting with me",
          intro:
            "I received your message from my portfolio website and will get back to you soon.",
          sections: [
            { label: "Your Name", value: name },
            { label: "Your Email", value: email },
            { label: "Your Message", value: message },
          ],
          footer: "If this was sent by mistake, please ignore this email.",
        }),
      }),
      sendMail({
        to: getOwnerEmail(),
        subject: `New portfolio message from ${name}`,
        replyTo: email,
        html: createThemedMail({
          title: "New Contact Form Submission",
          subtitle: "Someone reached out via portfolio contact form",
          intro: "A new candidate/recruiter inquiry was submitted from your portfolio contact form.",
          sections: [
            { label: "Name", value: name },
            { label: "Email", value: email },
            { label: "Message", value: message },
          ],
          footer: "You can directly reply to this email to continue the conversation.",
        }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact mail send failed:", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 },
    );
  }
}
