"use client";

import { demoDashboardStats } from "@/constants/demo-data";
import { severityColors } from "@/constants/rules";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Activity,
  Shield,
  TrendingUp,
} from "lucide-react";

const stats = demoDashboardStats;

const kpiCards = [
  {
    title: "Total Violations",
    value: stats.totalViolations,
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Critical",
    value: stats.criticalViolations,
    icon: Shield,
    color: "text-red-500",
  },
  {
    title: "Active Calls",
    value: stats.activeCalls,
    icon: Activity,
    color: "text-green-500",
  },
  {
    title: "Compliance Score",
    value: `${stats.complianceScore}%`,
    icon: TrendingUp,
    color: "text-primary",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your compliance monitoring (demo data)
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {card.title}
              </span>
              <card.icon className={cn("h-4 w-4", card.color)} />
            </div>
            <div className="mt-2 text-2xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Violations by Type */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-lg font-semibold">Violations by Category</h2>
        <div className="mt-4 space-y-3">
          {stats.violationsByType.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <div className="w-40 text-sm truncate">{item.category}</div>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{
                      width: `${(item.count / 60) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <span className="w-8 text-right text-sm text-muted-foreground">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Violations */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-lg font-semibold">Recent Violations</h2>
        <div className="mt-4 divide-y divide-border">
          {stats.recentViolations.slice(0, 5).map((v) => (
            <div key={v.id} className="flex items-start gap-3 py-3">
              <span
                className={cn(
                  "mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                  severityColors[v.severity]
                )}
              >
                {v.severity}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{v.description}</p>
                <p className="mt-1 text-xs text-muted-foreground truncate">
                  {v.rule?.code} - {v.rule?.name}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {v.confidence}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
