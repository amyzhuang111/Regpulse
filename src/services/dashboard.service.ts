import { createServiceRoleClient } from "@/lib/supabase/server";
import type { DashboardStats, Violation } from "@/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createServiceRoleClient();

  // Total violations
  const { count: totalViolations } = await supabase
    .from("violations")
    .select("*", { count: "exact", head: true });

  // Critical violations
  const { count: criticalViolations } = await supabase
    .from("violations")
    .select("*", { count: "exact", head: true })
    .eq("severity", "critical");

  // Active calls
  const { count: activeCalls } = await supabase
    .from("calls")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  // Resolved vs total for compliance score
  const { count: resolvedCount } = await supabase
    .from("violations")
    .select("*", { count: "exact", head: true })
    .in("status", ["resolved", "dismissed"]);

  const total = totalViolations ?? 0;
  const resolved = resolvedCount ?? 0;
  const complianceScore = total > 0 ? Math.round(((total - (total - resolved)) / total) * 100) : 100;

  // Risk trend (last 7 days) — count violations per day
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  const { data: recentViolationRows } = await supabase
    .from("violations")
    .select("created_at, severity")
    .gte("created_at", sevenDaysAgo);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const riskTrend: { date: string; score: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dayStr = d.toISOString().slice(0, 10);
    const dayViolations = (recentViolationRows ?? []).filter(
      (v) => v.created_at.slice(0, 10) === dayStr
    );
    // Simple risk: each critical=10, high=5, medium=3, low=1
    const score = dayViolations.reduce((sum, v) => {
      const w = v.severity === "critical" ? 10 : v.severity === "high" ? 5 : v.severity === "medium" ? 3 : 1;
      return sum + w;
    }, 0);
    riskTrend.push({ date: dayNames[d.getDay()], score });
  }

  // Violations by category
  const { data: catRows } = await supabase
    .from("violations")
    .select("rule:rules(category)");

  const catMap = new Map<string, number>();
  for (const row of catRows ?? []) {
    const cat = (row.rule as unknown as { category: string })?.category;
    if (cat) catMap.set(cat, (catMap.get(cat) ?? 0) + 1);
  }
  const violationsByType = Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // Recent violations
  const { data: recentRows } = await supabase
    .from("violations")
    .select("*, rule:rules(*), call:calls(*)")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    totalViolations: total,
    criticalViolations: criticalViolations ?? 0,
    activeCalls: activeCalls ?? 0,
    complianceScore,
    riskTrend,
    violationsByType,
    recentViolations: (recentRows ?? []) as Violation[],
  };
}
