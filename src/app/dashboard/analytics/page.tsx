"use client";

import { demoDashboardStats } from "@/constants/demo-data";
import { severityColors } from "@/constants/rules";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  PieChart,
  Users,
  Phone,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = demoDashboardStats;

// Agent performance data
const agentPerformance = [
  { name: "Sarah Chen", calls: 156, violations: 3, score: 98, trend: "up" },
  { name: "Mike Rodriguez", calls: 142, violations: 8, score: 94, trend: "up" },
  { name: "James Wilson", calls: 128, violations: 15, score: 88, trend: "down" },
  { name: "Lisa Park", calls: 134, violations: 5, score: 96, trend: "up" },
  { name: "David Kim", calls: 119, violations: 22, score: 81, trend: "down" },
  { name: "Emma Taylor", calls: 145, violations: 7, score: 95, trend: "up" },
];

// Monthly trend data
const monthlyTrend = [
  { month: "Aug", violations: 312, calls: 1240, score: 64 },
  { month: "Sep", violations: 287, calls: 1380, score: 67 },
  { month: "Oct", violations: 265, calls: 1420, score: 69 },
  { month: "Nov", violations: 234, calls: 1510, score: 71 },
  { month: "Dec", violations: 198, calls: 1380, score: 74 },
  { month: "Jan", violations: 247, calls: 1620, score: 72 },
];

// Top violation rules
const topRules = [
  { code: "SEC-10B-5", name: "Anti-Fraud", count: 45, pct: 18.2 },
  { code: "FINRA-2111", name: "Suitability", count: 52, pct: 21.1 },
  { code: "REG-BI", name: "Best Interest", count: 38, pct: 15.4 },
  { code: "FINRA-2210", name: "Communications", count: 31, pct: 12.6 },
  { code: "FTC-ACT-SEC5", name: "Consumer Protection", count: 28, pct: 11.3 },
];

// Hourly distribution
const hourlyDistribution = [
  { hour: "8am", count: 8 },
  { hour: "9am", count: 22 },
  { hour: "10am", count: 35 },
  { hour: "11am", count: 41 },
  { hour: "12pm", count: 18 },
  { hour: "1pm", count: 28 },
  { hour: "2pm", count: 38 },
  { hour: "3pm", count: 32 },
  { hour: "4pm", count: 19 },
  { hour: "5pm", count: 6 },
];

export default function AnalyticsPage() {
  const maxCount = Math.max(...stats.violationsByType.map((v) => v.count));
  const maxMonthly = Math.max(...monthlyTrend.map((m) => m.violations));
  const maxHourly = Math.max(...hourlyDistribution.map((h) => h.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Compliance trends and violation patterns
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Violations</span>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.totalViolations}</div>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <ArrowDownRight className="h-3 w-3 text-green-500" />
            <span className="text-green-500">12% from last month</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Compliance Score</span>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.complianceScore}%</div>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <ArrowUpRight className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+3% from last month</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Calls Analyzed</span>
            <Phone className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">1,620</div>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <ArrowUpRight className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+17% from last month</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Response Time</span>
            <Clock className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">1.8s</div>
          <div className="mt-1 flex items-center gap-1 text-xs">
            <ArrowDownRight className="h-3 w-3 text-green-500" />
            <span className="text-green-500">0.4s faster</span>
          </div>
        </div>
      </div>

      {/* Monthly trend + Severity breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Monthly Violations Trend</h2>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingDown className="h-3 w-3" />
              Improving
            </div>
          </div>
          <div className="mt-4 flex items-end gap-3" style={{ height: 220 }}>
            {monthlyTrend.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium">{m.violations}</span>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-primary to-primary/60 transition-all"
                  style={{ height: `${(m.violations / maxMonthly) * 180}px` }}
                />
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="text-xs text-muted-foreground">
              Compliance score trend:
            </div>
            <div className="flex items-center gap-3">
              {monthlyTrend.map((m) => (
                <span key={m.month} className="text-xs font-medium text-primary">
                  {m.score}%
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-lg font-semibold">Severity Breakdown</h2>
          <div className="mt-4 space-y-4">
            {(["critical", "high", "medium", "low"] as const).map((sev) => {
              const counts = { critical: 23, high: 89, medium: 98, low: 37 };
              const pct = Math.round((counts[sev] / stats.totalViolations) * 100);
              return (
                <div key={sev}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                        severityColors[sev]
                      )}
                    >
                      {sev}
                    </span>
                    <span className="text-sm font-medium">
                      {counts[sev]} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted">
                    <div
                      className={cn("h-2.5 rounded-full transition-all", {
                        "bg-red-500": sev === "critical",
                        "bg-orange-500": sev === "high",
                        "bg-yellow-500": sev === "medium",
                        "bg-blue-500": sev === "low",
                      })}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Risk trend (7 day) */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-lg font-semibold">Risk Score (7-Day)</h2>
        <div className="mt-4 flex items-end gap-2" style={{ height: 180 }}>
          {stats.riskTrend.map((point) => (
            <div key={point.date} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs font-medium">{point.score}</span>
              <div
                className={cn(
                  "w-full rounded-t transition-all",
                  point.score > 70 ? "bg-red-500/80" : point.score > 60 ? "bg-orange-500/80" : "bg-green-500/80"
                )}
                style={{ height: `${(point.score / 100) * 150}px` }}
              />
              <span className="text-xs text-muted-foreground">{point.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Violations by category + Hourly distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-lg font-semibold">Violations by Category</h2>
          <div className="mt-4 space-y-3">
            {stats.violationsByType.map((item) => (
              <div key={item.category} className="flex items-center gap-3">
                <div className="w-36 text-sm truncate">{item.category}</div>
                <div className="flex-1">
                  <div className="h-3 rounded-full bg-muted">
                    <div
                      className="h-3 rounded-full bg-primary transition-all"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-sm font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-lg font-semibold">Violations by Hour</h2>
          <p className="text-xs text-muted-foreground">Peak: 11am (41 violations)</p>
          <div className="mt-4 flex items-end gap-1.5" style={{ height: 160 }}>
            {hourlyDistribution.map((h) => (
              <div key={h.hour} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-medium">{h.count}</span>
                <div
                  className={cn(
                    "w-full rounded-t transition-all",
                    h.count > 35 ? "bg-red-500/70" : h.count > 20 ? "bg-primary/70" : "bg-primary/40"
                  )}
                  style={{ height: `${(h.count / maxHourly) * 130}px` }}
                />
                <span className="text-[10px] text-muted-foreground">{h.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top violated rules */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Most Violated Rules</h2>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 font-medium">Rule</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 text-right font-medium">Count</th>
                <th className="pb-2 text-right font-medium">% of Total</th>
                <th className="pb-2 font-medium pl-4">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {topRules.map((rule) => (
                <tr key={rule.code} className="border-b border-border/50">
                  <td className="py-2.5 font-mono text-xs font-medium text-primary">{rule.code}</td>
                  <td className="py-2.5">{rule.name}</td>
                  <td className="py-2.5 text-right font-medium">{rule.count}</td>
                  <td className="py-2.5 text-right">{rule.pct}%</td>
                  <td className="py-2.5 pl-4">
                    <div className="h-2 w-24 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${rule.pct * 4}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent performance */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Agent Performance</h2>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 font-medium">Agent</th>
                <th className="pb-2 text-right font-medium">Calls</th>
                <th className="pb-2 text-right font-medium">Violations</th>
                <th className="pb-2 text-right font-medium">Score</th>
                <th className="pb-2 text-right font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {agentPerformance.map((agent) => (
                <tr key={agent.name} className="border-b border-border/50">
                  <td className="py-2.5 font-medium">{agent.name}</td>
                  <td className="py-2.5 text-right">{agent.calls}</td>
                  <td className="py-2.5 text-right">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      agent.violations > 15
                        ? "bg-red-500/10 text-red-500"
                        : agent.violations > 7
                        ? "bg-orange-500/10 text-orange-500"
                        : "bg-green-500/10 text-green-500"
                    )}>
                      {agent.violations}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className={cn(
                      "font-medium",
                      agent.score >= 95 ? "text-green-500" : agent.score >= 85 ? "text-yellow-500" : "text-red-500"
                    )}>
                      {agent.score}%
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    {agent.trend === "up" ? (
                      <ArrowUpRight className="ml-auto h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="ml-auto h-4 w-4 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
