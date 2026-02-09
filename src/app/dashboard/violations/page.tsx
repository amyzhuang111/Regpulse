"use client";

import { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { ViolationsFilters } from "@/components/violations/violations-filters";
import { ViolationsTable } from "@/components/violations/violations-table";
import { allDemoViolations } from "@/constants/demo-data";
import type { Severity, ViolationStatus } from "@/types";

export default function ViolationsPage() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<Severity | "">("");
  const [status, setStatus] = useState<ViolationStatus | "">("");

  const hasFilters = search !== "" || severity !== "" || status !== "";

  const filtered = useMemo(() => {
    return allDemoViolations.filter((v) => {
      if (severity && v.severity !== severity) return false;
      if (status && v.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          v.description.toLowerCase().includes(q) ||
          v.transcript_excerpt.toLowerCase().includes(q) ||
          v.rule?.code.toLowerCase().includes(q) ||
          v.rule?.name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, severity, status]);

  const clearFilters = () => {
    setSearch("");
    setSeverity("");
    setStatus("");
  };

  const openCount = allDemoViolations.filter((v) => v.status === "open").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Violations</h1>
          <p className="text-sm text-muted-foreground">
            {allDemoViolations.length} total violations &middot; {openCount} open (demo data)
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-1.5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">{openCount} Open</span>
        </div>
      </div>

      <ViolationsFilters
        search={search}
        onSearchChange={setSearch}
        severity={severity}
        onSeverityChange={setSeverity}
        status={status}
        onStatusChange={setStatus}
        onClear={clearFilters}
        hasFilters={hasFilters}
      />

      <ViolationsTable violations={filtered} />

      <p className="text-center text-xs text-muted-foreground">
        Showing {filtered.length} of {allDemoViolations.length} violations
      </p>
    </div>
  );
}
