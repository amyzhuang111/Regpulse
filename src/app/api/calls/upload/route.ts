import { NextResponse } from "next/server";
import { transcribeAudio } from "@/services/transcription.service";
import { analyzeTranscript } from "@/services/analysis.service";
import { createCall, updateCall } from "@/services/calls.service";
import { createViolationsFromAnalysis } from "@/services/violations.service";

export const runtime = "nodejs";
export const maxDuration = 120; // 2 minutes

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const agentName = (formData.get("agent_name") as string) || "Uploaded Call";
    const customerName = (formData.get("customer_name") as string) || undefined;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 25MB." },
        { status: 400 }
      );
    }

    // Check required API keys
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured. Add ELEVENLABS_API_KEY to .env.local" },
        { status: 500 }
      );
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    // 1. Create the call record
    const call = await createCall({
      user_id: "demo-user",
      agent_name: agentName,
      customer_name: customerName,
    });

    // 2. Transcribe audio with ElevenLabs Scribe
    await updateCall(call.id, { status: "active" });

    const blob = new Blob([await file.arrayBuffer()], { type: file.type });
    const transcript = await transcribeAudio(blob);

    // 3. Analyze transcript for compliance violations
    const analysis = await analyzeTranscript(transcript);

    // 4. Store violations
    const violations = await createViolationsFromAnalysis(call.id, "demo-user", analysis);

    // 5. Update call with results
    await updateCall(call.id, {
      status: "completed",
      transcript,
      risk_score: analysis.riskScore,
      ended_at: new Date().toISOString(),
    });

    return NextResponse.json({
      call_id: call.id,
      transcript,
      analysis: {
        summary: analysis.summary,
        riskScore: analysis.riskScore,
        violationCount: violations.length,
      },
      violations,
    });
  } catch (err) {
    console.error("Upload pipeline error:", err);
    const message = err instanceof Error ? err.message : "Upload processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
