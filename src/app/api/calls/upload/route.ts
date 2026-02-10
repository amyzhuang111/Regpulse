import { NextResponse } from "next/server";
import { transcribeAudio } from "@/services/transcription.service";
import { analyzeTranscript } from "@/services/analysis.service";
import type { AnalysisResult } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 120; // 2 minutes

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5MB (Vercel free tier limit)

const RULE_DETAILS: Record<string, { id: string; name: string; description: string; category: string; authority: string; severity: string }> = {
  "SEC-10B-5": { id: "r1", name: "Anti-Fraud Provision", description: "Prohibits fraud, misrepresentation, and deceit in connection with securities.", category: "Securities Fraud", authority: "SEC", severity: "critical" },
  "REG-BI": { id: "r2", name: "Regulation Best Interest", description: "Requires broker-dealers to act in the best interest of retail customers.", category: "Best Interest", authority: "SEC", severity: "high" },
  "FINRA-2111": { id: "r3", name: "Suitability", description: "Requires reasonable basis to believe recommendation is suitable for the customer.", category: "Suitability", authority: "FINRA", severity: "high" },
  "FINRA-2210": { id: "r4", name: "Communications with the Public", description: "Requires that all member communications be fair, balanced, and not misleading.", category: "Communications", authority: "FINRA", severity: "medium" },
  "FTC-ACT-SEC5": { id: "r5", name: "FTC Act Section 5", description: "Prohibits unfair or deceptive acts or practices in or affecting commerce.", category: "Consumer Protection", authority: "FTC", severity: "high" },
  "SEC-206-4-1": { id: "r6", name: "Marketing Rule", description: "Regulates investment adviser advertisements and marketing materials.", category: "Marketing", authority: "SEC", severity: "medium" },
  "SEC-204-2": { id: "r7", name: "Books and Records", description: "Requires investment advisers to maintain accurate books and records.", category: "Record Keeping", authority: "SEC", severity: "low" },
  "REG-S-P": { id: "r8", name: "Privacy of Consumer Financial Information", description: "Requires financial institutions to protect consumers' personal financial information.", category: "Privacy", authority: "SEC", severity: "medium" },
};

function buildViolationsFromAnalysis(analysis: AnalysisResult) {
  const now = new Date().toISOString();
  return analysis.violations.map((v, i) => {
    const ruleInfo = RULE_DETAILS[v.ruleCode];
    return {
      id: `upload-v${i + 1}-${Date.now()}`,
      call_id: `upload-${Date.now()}`,
      rule_id: ruleInfo?.id ?? `r${i + 1}`,
      user_id: "demo-user",
      severity: v.severity,
      confidence: v.confidence,
      description: v.description,
      transcript_excerpt: v.excerpt,
      ai_reasoning: v.reasoning,
      status: "open" as const,
      created_at: now,
      updated_at: now,
      rule: ruleInfo ? {
        id: ruleInfo.id,
        code: v.ruleCode,
        name: ruleInfo.name,
        description: ruleInfo.description,
        category: ruleInfo.category,
        authority: ruleInfo.authority,
        severity: ruleInfo.severity,
        keywords: [],
        is_active: true,
        created_at: now,
      } : undefined,
    };
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 4MB." },
        { status: 400 }
      );
    }

    // Check API keys
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured." },
        { status: 500 }
      );
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured." },
        { status: 500 }
      );
    }

    // 1. Transcribe audio with ElevenLabs Scribe
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });
    const transcript = await transcribeAudio(blob);

    // 2. Analyze transcript for compliance violations with GPT-4o
    const analysis = await analyzeTranscript(transcript);

    // 3. Build violation objects (no Supabase needed)
    const violations = buildViolationsFromAnalysis(analysis);

    return NextResponse.json({
      call_id: `upload-${Date.now()}`,
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
