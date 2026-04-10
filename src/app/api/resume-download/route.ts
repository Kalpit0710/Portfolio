import { createThemedMail } from "@/lib/mail-template";
import { getOwnerEmail, sendMail } from "@/lib/mailer";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
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
    };

    const name = body.name?.trim();
    const email = body.email?.trim();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const resumeBuffer = await readFile(join(process.cwd(), "public", "resume.pdf"));
    const encodedResume = resumeBuffer.toString("base64");

    await Promise.all([
      sendMail({
        to: email,
        subject: "Kalpit Agarwal Resume | Thanks for your interest",
        html: createThemedMail({
          title: "Resume Shared Successfully",
          subtitle: "Thank you for your interest in my profile",
          intro:
            "I have attached my latest resume to this email. I would be glad to discuss full-time opportunities where I can contribute with full stack development experience in C#, .NET, React, and Azure DevOps.",
          sections: [
            { label: "Candidate", value: "Kalpit Agarwal" },
            { label: "Shared With", value: `${name} (${email})` },
            { label: "Attachment", value: "Kalpit-Agarwal-Resume.pdf" },
          ],
          footer:
            "If you would like to discuss a role, please reply to this email and I will respond promptly.",
        }),
        attachments: [
          {
            filename: "Kalpit-Agarwal-Resume.pdf",
            content: encodedResume,
            content_type: "application/pdf",
          },
        ],
      }),
      sendMail({
        to: getOwnerEmail(),
        subject: `Resume downloaded by ${name}`,
        replyTo: email,
        html: createThemedMail({
          title: "Resume Download Alert",
          subtitle: "A visitor downloaded your resume",
          intro:
            "A new visitor submitted their details and downloaded your resume from the portfolio website.",
          sections: [
            { label: "Name", value: name },
            { label: "Email", value: email },
            { label: "Event Time (UTC)", value: new Date().toUTCString() },
          ],
          footer: "You can follow up by replying directly to this email.",
        }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resume download mail send failed:", error);
    return NextResponse.json(
      { error: "Unable to process resume download right now. Please try again later." },
      { status: 500 },
    );
  }
}
