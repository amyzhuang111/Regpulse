import { NextResponse } from "next/server";
import { allDemoViolations } from "@/constants/demo-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const violation = allDemoViolations.find((v) => v.id === id);

  if (!violation) {
    return NextResponse.json({ error: "Violation not found" }, { status: 404 });
  }

  return NextResponse.json(violation);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const violation = allDemoViolations.find((v) => v.id === id);

  if (!violation) {
    return NextResponse.json({ error: "Violation not found" }, { status: 404 });
  }

  const body = await request.json();

  // In production, update in Supabase. For demo, return merged object.
  return NextResponse.json({ ...violation, ...body, updated_at: new Date().toISOString() });
}
