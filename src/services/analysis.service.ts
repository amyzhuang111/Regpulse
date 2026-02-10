import { getOpenAI, COMPLIANCE_SYSTEM_PROMPT } from "@/lib/openai";
import type { AnalysisResult } from "@/types";

export async function analyzeTranscript(transcript: string): Promise<AnalysisResult> {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: COMPLIANCE_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analyze the following call transcript for regulatory compliance violations:\n\n${transcript}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    return { violations: [], riskScore: 0, summary: "No analysis generated." };
  }

  return JSON.parse(content) as AnalysisResult;
}
