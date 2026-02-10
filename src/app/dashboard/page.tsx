"use client";

import { useState, useEffect } from "react";
import { demoDashboardStats } from "@/constants/demo-data";
import { severityColors } from "@/constants/rules";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/types";
import {
  AlertTriangle,
  Activity,
  Shield,
  TrendingUp,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(demoDashboardStats);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data: DashboardStats) => {
        // If we got real data (not demo stats with 247 violations), mark as non-demo
        if (data.totalViolations !== 247 || data.criticalViolations !== 23) {
          setIsDemo(false);
        }
        setStats(data);
      })
      .catch(() => {
        // Keep demo data on error
      })
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your compliance monitoring{isDemo ? " (demo data)" : ""}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
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
            {stats.violationsByType.length > 0 ? (
              <div className="mt-4 space-y-3">
                {stats.violationsByType.map((item) => {
                  const max = Math.max(...stats.violationsByType.map((v) => v.count), 1);
                  return (
                    <div key={item.category} className="flex items-center gap-3">
                      <div className="w-40 text-sm truncate">{item.category}</div>
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{
                              width: `${(item.count / max) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="w-8 text-right text-sm text-muted-foreground">
                        {item.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">No violations recorded yet. Upload an audio file to get started.</p>
            )}
          </div>

          {/* Recent Violations */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="text-lg font-semibold">Recent Violations</h2>
            {stats.recentViolations.length > 0 ? (
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
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">No violations yet. Upload an audio file to get started.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
