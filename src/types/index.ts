export type Severity = "critical" | "high" | "medium" | "low";

export type CallStatus = "active" | "completed" | "failed" | "pending";

export type ViolationStatus = "open" | "acknowledged" | "resolved" | "dismissed";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "admin" | "analyst" | "viewer";
  created_at: string;
  updated_at: string;
}

export interface Call {
  id: string;
  user_id: string;
  agent_name: string;
  customer_name: string | null;
  status: CallStatus;
  duration_seconds: number | null;
  transcript: string | null;
  audio_storage_path: string | null;
  risk_score: number;
  started_at: string;
  ended_at: string | null;
  created_at: string;
}

export interface Rule {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  authority: string;
  severity: Severity;
  keywords: string[];
  is_active: boolean;
  created_at: string;
}

export interface Violation {
  id: string;
  call_id: string;
  rule_id: string;
  user_id: string;
  severity: Severity;
  confidence: number;
  description: string;
  transcript_excerpt: string;
  timestamp_ms: number | null;
  ai_reasoning: string | null;
  status: ViolationStatus;
  created_at: string;
  updated_at: string;
  rule?: Rule;
  call?: Call;
}

export interface Evidence {
  id: string;
  violation_id: string;
  type: "audio_clip" | "transcript_snippet" | "screenshot";
  content: string;
  storage_path: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  title: string;
  type: "compliance_summary" | "violation_detail" | "risk_assessment" | "audit_trail";
  date_range_start: string;
  date_range_end: string;
  content: Record<string, unknown>;
  format: "pdf" | "csv" | "json";
  storage_path: string | null;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  user_id: string;
  event_type: string;
  event_data: Record<string, unknown>;
  created_at: string;
}

export interface DashboardStats {
  totalViolations: number;
  criticalViolations: number;
  activeCalls: number;
  complianceScore: number;
  riskTrend: { date: string; score: number }[];
  violationsByType: { category: string; count: number }[];
  recentViolations: Violation[];
}

export interface AnalysisResult {
  violations: {
    ruleCode: string;
    severity: Severity;
    confidence: number;
    description: string;
    excerpt: string;
    reasoning: string;
  }[];
  riskScore: number;
  summary: string;
}
