"use client";

import { useState } from "react";
import { FileText, Download, Calendar, Plus } from "lucide-react";

const demoReports = [
  {
    id: "r1",
    title: "Weekly Compliance Summary",
    type: "compliance_summary" as const,
    format: "pdf" as const,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    dateRange: "Jan 27 - Feb 2, 2026",
  },
  {
    id: "r2",
    title: "Critical Violations Detail Report",
    type: "violation_detail" as const,
    format: "pdf" as const,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    dateRange: "Jan 20 - Jan 26, 2026",
  },
  {
    id: "r3",
    title: "Q4 Risk Assessment",
    type: "risk_assessment" as const,
    format: "csv" as const,
    created_at: new Date(Date.now() - 604800000).toISOString(),
    dateRange: "Oct 1 - Dec 31, 2025",
  },
  {
    id: "r4",
    title: "Audit Trail Export",
    type: "audit_trail" as const,
    format: "json" as const,
    created_at: new Date(Date.now() - 1209600000).toISOString(),
    dateRange: "Jan 1 - Jan 31, 2026",
  },
];

const typeLabels: Record<string, string> = {
  compliance_summary: "Compliance Summary",
  violation_detail: "Violation Detail",
  risk_assessment: "Risk Assessment",
  audit_trail: "Audit Trail",
};

export default function ReportsPage() {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Generate and download compliance reports (demo data)
          </p>
        </div>
        <button
          onClick={() => setShowGenerator(!showGenerator)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Generate Report
        </button>
      </div>

      {/* Report generator */}
      {showGenerator && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-semibold">New Report</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option>Compliance Summary</option>
                <option>Violation Detail</option>
                <option>Risk Assessment</option>
                <option>Audit Trail</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option>PDF</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Generate
          </button>
        </div>
      )}

      {/* Reports list */}
      <div className="divide-y divide-border rounded-xl border border-border bg-card">
        {demoReports.map((report) => (
          <div
            key={report.id}
            className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{report.title}</p>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{typeLabels[report.type]}</span>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {report.dateRange}
                </span>
              </div>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono uppercase text-muted-foreground">
              {report.format}
            </span>
            <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
