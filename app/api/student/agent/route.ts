import { NextRequest, NextResponse } from "next/server";
import { runMultiAgentPipeline } from "@/lib/gemini";
import { StudentProfile } from "@/lib/student-types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { goalPrompt, profile } = body as {
      goalPrompt: string;
      profile: StudentProfile;
    };

    if (!goalPrompt) {
      return NextResponse.json({ error: "Goal prompt is required." }, { status: 400 });
    }

    const result = await runMultiAgentPipeline(goalPrompt, profile);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API /api/student/agent error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to execute AI agent pipeline." },
      { status: 500 }
    );
  }
}
