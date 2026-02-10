import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Violation, Severity, ViolationStatus, AnalysisResult } from "@/types";

export async function getViolations(filters?: {
  severity?: Severity;
  status?: ViolationStatus;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Violation[]; total: number }> {
  const supabase = await createServiceRoleClient();
  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("violations")
    .select("*, rule:rules(*), call:calls(*)", { count: "exact" });

  if (filters?.severity) {
    query = query.eq("severity", filters.severity);
  }
  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.search) {
    query = query.or(
      `description.ilike.%${filters.search}%,transcript_excerpt.ilike.%${filters.search}%`
    );
  }

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(`Failed to fetch violations: ${error.message}`);
  return { data: (data ?? []) as Violation[], total: count ?? 0 };
}

export async function getViolationById(id: string): Promise<Violation | null> {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase
    .from("violations")
    .select("*, rule:rules(*), call:calls(*)")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Violation;
}

export async function updateViolationStatus(
  id: string,
  status: ViolationStatus
): Promise<Violation> {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase
    .from("violations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*, rule:rules(*), call:calls(*)")
    .single();

  if (error) throw new Error(`Failed to update violation: ${error.message}`);
  return data as Violation;
}

export async function createViolationsFromAnalysis(
  callId: string,
  userId: string,
  analysis: AnalysisResult
): Promise<Violation[]> {
  if (analysis.violations.length === 0) return [];

  const supabase = await createServiceRoleClient();

  // Look up rule IDs by code
  const ruleCodes = analysis.violations.map((v) => v.ruleCode);
  const { data: rules } = await supabase
    .from("rules")
    .select("id, code")
    .in("code", ruleCodes);

  const ruleMap = new Map((rules ?? []).map((r) => [r.code, r.id]));

  const rows = analysis.violations
    .filter((v) => ruleMap.has(v.ruleCode))
    .map((v) => ({
      call_id: callId,
      rule_id: ruleMap.get(v.ruleCode)!,
      user_id: userId,
      severity: v.severity,
      confidence: v.confidence,
      description: v.description,
      transcript_excerpt: v.excerpt,
      ai_reasoning: v.reasoning,
      status: "open" as const,
    }));

  if (rows.length === 0) return [];

  const { data, error } = await supabase
    .from("violations")
    .insert(rows)
    .select("*, rule:rules(*), call:calls(*)");

  if (error) throw new Error(`Failed to create violations: ${error.message}`);
  return (data ?? []) as Violation[];
}
