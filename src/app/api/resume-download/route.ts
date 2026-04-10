import { createThemedMail } from "@/lib/mail-template";
import { RESUME_FILENAME } from "@/lib/constants";
import { getOwnerEmail, sendMail } from "@/lib/mailer";
import { isValidEmail } from "@/lib/validation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

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
        subject: "Kalpit Agarwal Resume | Thanks for checking my work",
        html: createThemedMail({
          title: "Thanks for the interest",
          subtitle: "I appreciate you taking a look at my profile",
          intro:
            "Here is my latest resume attached. I focus on building reliable, recruiter-friendly experiences with C#, .NET, React, and Azure DevOps. If you are hiring for full-stack or frontend-heavy roles, I would love to share how I can help your team ship faster with clean, scalable UI and backend work.",
          sections: [
            { label: "Candidate", value: "Kalpit Agarwal" },
            { label: "Shared With", value: `${name} (${email})` },
            { label: "Attachment", value: RESUME_FILENAME },
          ],
          footer:
            "If there is an open role, feel free to reply with the job description or preferred next steps. I respond quickly.",
        }),
        attachments: [
          {
            filename: RESUME_FILENAME,
            content: encodedResume,
            content_type: "application/pdf",
          },
        ],
      }),
      sendMail({
        to: getOwnerEmail(),
        subject: `Resume download: ${name} (${email})`,
        replyTo: email,
        html: createThemedMail({
          title: "Resume request captured",
          subtitle: "A recruiter just pulled your resume",
          intro:
            "A resume request was submitted from the portfolio site. Consider a short follow-up while the interest is fresh.",
          sections: [
            { label: "Name", value: name },
            { label: "Email", value: email },
            { label: "Event Time (UTC)", value: new Date().toUTCString() },
          ],
          footer: "Tip: reply with a 2-3 line note and a role-fit summary to keep the conversation warm.",
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
