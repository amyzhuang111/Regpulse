import { NextResponse } from "next/server";
import { allDemoViolations } from "@/constants/demo-data";
import { getViolationById, updateViolationStatus } from "@/services/violations.service";
import type { ViolationStatus } from "@/types";

async function useSupabase() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    if (await useSupabase()) {
      const violation = await getViolationById(id);
      if (!violation) {
        return NextResponse.json({ error: "Violation not found" }, { status: 404 });
      }
      return NextResponse.json(violation);
    }
  } catch (err) {
    console.error("Supabase violation fetch failed, using demo data:", err);
  }

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
  const body = await request.json();

  try {
    if (await useSupabase()) {
      const updated = await updateViolationStatus(id, body.status as ViolationStatus);
      return NextResponse.json(updated);
    }
  } catch (err) {
    console.error("Supabase violation update failed, using demo data:", err);
  }

  const violation = allDemoViolations.find((v) => v.id === id);
  if (!violation) {
    return NextResponse.json({ error: "Violation not found" }, { status: 404 });
  }
  return NextResponse.json({ ...violation, ...body, updated_at: new Date().toISOString() });
}
