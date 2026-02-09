"use client";

import { Search, X } from "lucide-react";
import type { Severity, ViolationStatus } from "@/types";

interface ViolationsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  severity: Severity | "";
  onSeverityChange: (value: Severity | "") => void;
  status: ViolationStatus | "";
  onStatusChange: (value: ViolationStatus | "") => void;
  onClear: () => void;
  hasFilters: boolean;
}

export function ViolationsFilters({
  search,
  onSearchChange,
  severity,
  onSeverityChange,
  status,
  onStatusChange,
  onClear,
  hasFilters,
}: ViolationsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search violations..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Severity filter */}
      <select
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value as Severity | "")}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Severities</option>
        <option value="critical">Critical</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Status filter */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as ViolationStatus | "")}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">All Statuses</option>
        <option value="open">Open</option>
        <option value="acknowledged">Acknowledged</option>
        <option value="resolved">Resolved</option>
        <option value="dismissed">Dismissed</option>
      </select>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-accent transition-colors"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  );
}
