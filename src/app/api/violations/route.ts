import { NextResponse } from "next/server";
import { allDemoViolations } from "@/constants/demo-data";
import type { Severity, ViolationStatus } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get("severity") as Severity | null;
  const status = searchParams.get("status") as ViolationStatus | null;
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);

  let filtered = [...allDemoViolations];

  if (severity) {
    filtered = filtered.filter((v) => v.severity === severity);
  }
  if (status) {
    filtered = filtered.filter((v) => v.status === status);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.description.toLowerCase().includes(q) ||
        v.transcript_excerpt.toLowerCase().includes(q) ||
        v.rule?.code.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}
