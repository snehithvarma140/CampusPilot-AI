import { NextRequest, NextResponse } from "next/server";
import { askCampusPilotAi } from "@/lib/gemini";
import { StudentProfile } from "@/lib/student-types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, profile } = body as {
      messages: { role: 'user' | 'model'; text: string }[];
      profile: StudentProfile;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    const reply = await askCampusPilotAi(messages, profile);
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("API /api/student/chat error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat query." },
      { status: 500 }
    );
  }
}
