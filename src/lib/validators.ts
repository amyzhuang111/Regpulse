import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const violationFilterSchema = z.object({
  severity: z.enum(["critical", "high", "medium", "low"]).optional(),
  status: z.enum(["open", "acknowledged", "resolved", "dismissed"]).optional(),
  ruleCode: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const reportGenerateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["compliance_summary", "violation_detail", "risk_assessment", "audit_trail"]),
  dateRangeStart: z.string(),
  dateRangeEnd: z.string(),
  format: z.enum(["pdf", "csv", "json"]).default("pdf"),
});

export const analyzeTranscriptSchema = z.object({
  transcript: z.string().min(1, "Transcript is required"),
  callId: z.string().optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ViolationFilterInput = z.infer<typeof violationFilterSchema>;
export type ReportGenerateInput = z.infer<typeof reportGenerateSchema>;
export type AnalyzeTranscriptInput = z.infer<typeof analyzeTranscriptSchema>;
