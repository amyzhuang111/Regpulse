"use client";

import { demoDashboardStats } from "@/constants/demo-data";
import { severityColors } from "@/constants/rules";
import { cn } from "@/lib/utils";
import { BarChart3, TrendingUp, AlertTriangle, PieChart } from "lucide-react";

const stats = demoDashboardStats;

export default function AnalyticsPage() {
  const maxCount = Math.max(...stats.violationsByType.map((v) => v.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Compliance trends and violation patterns (demo data)
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
          <p className="mt-1 text-xs text-muted-foreground">Across all calls</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Compliance Score</span>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.complianceScore}%</div>
          <p className="mt-1 text-xs text-green-500">+3% from last week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Critical Rate</span>
            <PieChart className="h-4 w-4 text-red-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">
            {Math.round((stats.criticalViolations / stats.totalViolations) * 100)}%
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{stats.criticalViolations} critical violations</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Risk</span>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-2 text-2xl font-bold">67</div>
          <p className="mt-1 text-xs text-muted-foreground">Risk score (0-100)</p>
        </div>
      </div>

      {/* Risk trend */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-lg font-semibold">Risk Trend (7 days)</h2>
        <div className="mt-4 flex items-end gap-2" style={{ height: 200 }}>
          {stats.riskTrend.map((point) => (
            <div key={point.date} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">{point.score}</span>
              <div
                className="w-full rounded-t bg-primary/80 transition-all"
                style={{ height: `${(point.score / 100) * 160}px` }}
              />
              <span className="text-xs text-muted-foreground">{point.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Violations by category */}
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

        {/* Severity breakdown */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-lg font-semibold">Severity Breakdown</h2>
          <div className="mt-4 space-y-3">
            {(["critical", "high", "medium", "low"] as const).map((sev) => {
              const counts = { critical: 23, high: 89, medium: 98, low: 37 };
              const pct = Math.round((counts[sev] / stats.totalViolations) * 100);
              return (
                <div key={sev} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                      severityColors[sev]
                    )}
                  >
                    {sev}
                  </span>
                  <div className="flex-1">
                    <div className="h-3 rounded-full bg-muted">
                      <div
                        className={cn("h-3 rounded-full transition-all", {
                          "bg-red-500": sev === "critical",
                          "bg-orange-500": sev === "high",
                          "bg-yellow-500": sev === "medium",
                          "bg-blue-500": sev === "low",
                        })}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-16 text-right text-sm">
                    {counts[sev]} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
