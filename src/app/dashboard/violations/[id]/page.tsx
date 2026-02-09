"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, BarChart3, Shield } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { SeverityBadge } from "@/components/violations/severity-badge";
import { StatusBadge } from "@/components/violations/status-badge";
import { EvidencePanel } from "@/components/violations/evidence-panel";
import { RuleCitation } from "@/components/violations/rule-citation";
import { allDemoViolations } from "@/constants/demo-data";

export default function ViolationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const violation = allDemoViolations.find((v) => v.id === id);

  if (!violation) {
    return (
      <div className="space-y-4">
        <Link
          href="/dashboard/violations"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Violations
        </Link>
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">Violation not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard/violations"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Violations
      </Link>

      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={violation.severity} />
              <StatusBadge status={violation.status} />
              <span className="text-xs font-mono text-muted-foreground">
                {violation.id}
              </span>
            </div>
            <h1 className="text-xl font-bold">{violation.description}</h1>
          </div>
        </div>

        {/* Meta info */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {formatDistanceToNow(new Date(violation.created_at), {
              addSuffix: true,
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            {violation.confidence}% confidence
          </div>
          {violation.rule && (
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              {violation.rule.authority} &middot; {violation.rule.code}
            </div>
          )}
        </div>
      </div>

      {/* Evidence & Rule */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Evidence</h2>
          <EvidencePanel violation={violation} />
        </div>

        {violation.rule && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Regulation</h2>
            <RuleCitation rule={violation.rule} />
          </div>
        )}
      </div>
    </div>
  );
}
