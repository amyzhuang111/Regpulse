"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";
import { SeverityBadge } from "./severity-badge";
import { StatusBadge } from "./status-badge";
import type { Violation } from "@/types";

interface ViolationsTableProps {
  violations: Violation[];
}

export function ViolationsTable({ violations }: ViolationsTableProps) {
  if (violations.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No violations match your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Desktop table header */}
      <div className="hidden border-b border-border bg-muted/30 px-4 py-3 text-xs font-medium uppercase text-muted-foreground md:grid md:grid-cols-[1fr_100px_110px_100px_80px_32px]">
        <span>Description</span>
        <span>Rule</span>
        <span>Severity</span>
        <span>Status</span>
        <span>Time</span>
        <span />
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {violations.map((v) => (
          <Link
            key={v.id}
            href={`/dashboard/violations/${v.id}`}
            className="flex flex-col gap-2 px-4 py-3 hover:bg-accent/50 transition-colors md:grid md:grid-cols-[1fr_100px_110px_100px_80px_32px] md:items-center"
          >
            {/* Description */}
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{v.description}</p>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                {v.transcript_excerpt}
              </p>
            </div>

            {/* Rule code */}
            <span className="text-xs font-mono text-muted-foreground">
              {v.rule?.code ?? "—"}
            </span>

            {/* Severity */}
            <div>
              <SeverityBadge severity={v.severity} />
            </div>

            {/* Status */}
            <div>
              <StatusBadge status={v.status} />
            </div>

            {/* Time */}
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(v.created_at), { addSuffix: true })}
            </span>

            {/* Arrow */}
            <ChevronRight className="hidden h-4 w-4 text-muted-foreground md:block" />
          </Link>
        ))}
      </div>
    </div>
  );
}
