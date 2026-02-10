import { NextResponse } from "next/server";
import { transcribeAudio } from "@/services/transcription.service";
import { analyzeTranscript } from "@/services/analysis.service";
import { createCall, updateCall } from "@/services/calls.service";
import { createViolationsFromAnalysis } from "@/services/violations.service";

export const runtime = "nodejs";
export const maxDuration = 120; // 2 minutes

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

// Simulated analysis for demo mode (no API keys needed)
function getDemoAnalysis(fileName: string) {
  const transcript = `Agent: Good morning! Thank you for calling. I'm reaching out about an exclusive investment opportunity.

Customer: Hi, what kind of opportunity?

Agent: We have a premium trading fund that's been generating consistent 18% monthly returns. It's really a can't-miss situation.

Customer: 18% monthly? That sounds very high. What are the risks?

Agent: Honestly, there's essentially no risk. Our proprietary algorithm protects against all downside. You're basically guaranteed to make money.

Customer: That's hard to believe. Can you send me some documentation?

Agent: I can, but this opportunity closes at the end of the week. If you don't act now, you'll miss out entirely. We only have a few spots left.

Customer: I'm not sure I'm comfortable making a decision this quickly...

Agent: I completely understand, but my top clients have all jumped on this. Every single one of them has seen incredible returns. Let me just get your account details and we can get you set up right away.

Customer: What about my current retirement portfolio? Should I move everything?

Agent: Absolutely. Move everything into our fund. You won't need any other investments after this. This is the only thing you need.`;

  const violations = [
    {
      id: `upload-v1-${Date.now()}`,
      call_id: `upload-${Date.now()}`,
      rule_id: "r1",
      user_id: "demo-user",
      severity: "critical" as const,
      confidence: 96,
      description: "Guaranteed returns claim — stated '18% monthly returns' and 'guaranteed to make money'",
      transcript_excerpt: "Our proprietary algorithm protects against all downside. You're basically guaranteed to make money.",
      timestamp_ms: 8000,
      ai_reasoning: "Direct violation of SEC Rule 10b-5. Promising specific returns and guaranteeing profits constitutes securities fraud. No investment can guarantee returns.",
      status: "open" as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rule: {
        id: "r1",
        code: "SEC-10B-5",
        name: "Anti-Fraud Provision",
        description: "Prohibits fraud, misrepresentation, and deceit in connection with securities.",
        category: "Securities Fraud",
        authority: "SEC",
        severity: "critical" as const,
        keywords: [],
        is_active: true,
        created_at: new Date().toISOString(),
      },
    },
    {
      id: `upload-v2-${Date.now()}`,
      call_id: `upload-${Date.now()}`,
      rule_id: "r1",
      user_id: "demo-user",
      severity: "critical" as const,
      confidence: 94,
      description: "Zero risk misrepresentation — claimed 'essentially no risk' on investment product",
      transcript_excerpt: "Honestly, there's essentially no risk.",
      timestamp_ms: 8000,
      ai_reasoning: "All investments carry inherent risk. Stating there is 'no risk' is a material misrepresentation violating anti-fraud provisions.",
      status: "open" as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rule: {
        id: "r1",
        code: "SEC-10B-5",
        name: "Anti-Fraud Provision",
        description: "Prohibits fraud, misrepresentation, and deceit in connection with securities.",
        category: "Securities Fraud",
        authority: "SEC",
        severity: "critical" as const,
        keywords: [],
        is_active: true,
        created_at: new Date().toISOString(),
      },
    },
    {
      id: `upload-v3-${Date.now()}`,
      call_id: `upload-${Date.now()}`,
      rule_id: "r3",
      user_id: "demo-user",
      severity: "high" as const,
      confidence: 91,
      description: "Suitability failure — recommended moving entire retirement portfolio without assessment",
      transcript_excerpt: "Move everything into our fund. You won't need any other investments after this.",
      timestamp_ms: 25000,
      ai_reasoning: "Agent recommended concentrating all assets into a single product without assessing the customer's risk tolerance, investment objectives, or financial situation.",
      status: "open" as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rule: {
        id: "r3",
        code: "FINRA-2111",
        name: "Suitability",
        description: "Requires reasonable basis to believe recommendation is suitable for the customer.",
        category: "Suitability",
        authority: "FINRA",
        severity: "high" as const,
        keywords: [],
        is_active: true,
        created_at: new Date().toISOString(),
      },
    },
    {
      id: `upload-v4-${Date.now()}`,
      call_id: `upload-${Date.now()}`,
      rule_id: "r5",
      user_id: "demo-user",
      severity: "high" as const,
      confidence: 89,
      description: "Pressure tactics — created false urgency with 'closes at end of week' and 'few spots left'",
      transcript_excerpt: "This opportunity closes at the end of the week. If you don't act now, you'll miss out entirely.",
      timestamp_ms: 15000,
      ai_reasoning: "Creating artificial scarcity and time pressure to force a quick decision is a deceptive sales tactic prohibited under FTC Act Section 5.",
      status: "open" as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rule: {
        id: "r5",
        code: "FTC-ACT-SEC5",
        name: "FTC Act Section 5",
        description: "Prohibits unfair or deceptive acts or practices in or affecting commerce.",
        category: "Consumer Protection",
        authority: "FTC",
        severity: "high" as const,
        keywords: [],
        is_active: true,
        created_at: new Date().toISOString(),
      },
    },
    {
      id: `upload-v5-${Date.now()}`,
      call_id: `upload-${Date.now()}`,
      rule_id: "r2",
      user_id: "demo-user",
      severity: "high" as const,
      confidence: 87,
      description: "Failed to act in customer's best interest — pushed proprietary product without considering alternatives",
      transcript_excerpt: "This is the only thing you need.",
      timestamp_ms: 28000,
      ai_reasoning: "Reg BI requires broker-dealers to consider reasonably available alternatives. Pushing a single product as the 'only' option fails the care obligation.",
      status: "open" as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rule: {
        id: "r2",
        code: "REG-BI",
        name: "Regulation Best Interest",
        description: "Requires broker-dealers to act in the best interest of retail customers.",
        category: "Best Interest",
        authority: "SEC",
        severity: "high" as const,
        keywords: [],
        is_active: true,
        created_at: new Date().toISOString(),
      },
    },
  ];

  return {
    call_id: `upload-${Date.now()}`,
    transcript,
    analysis: {
      summary: `Analysis of "${fileName}" detected 5 regulatory violations across 4 rule categories. Two critical SEC 10b-5 violations were found (guaranteed returns and zero risk claims). High-severity issues include FINRA suitability failures, FTC pressure tactics, and Reg BI best interest violations. Overall risk score: 82/100. Immediate compliance review recommended.`,
      riskScore: 82,
      violationCount: 5,
    },
    violations,
  };
}

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

    // Demo mode: return simulated analysis when API keys aren't configured
    if (!process.env.ELEVENLABS_API_KEY || !process.env.OPENAI_API_KEY) {
      // Simulate processing delay so it feels real
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const demoResult = getDemoAnalysis(file.name);
      return NextResponse.json(demoResult);
    }

    // Production mode: real transcription + analysis
    const call = await createCall({
      user_id: "demo-user",
      agent_name: agentName,
      customer_name: customerName,
    });

    await updateCall(call.id, { status: "active" });

    const blob = new Blob([await file.arrayBuffer()], { type: file.type });
    const transcript = await transcribeAudio(blob);

    const analysis = await analyzeTranscript(transcript);

    const violations = await createViolationsFromAnalysis(call.id, "demo-user", analysis);

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
