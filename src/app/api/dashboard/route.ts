import { NextResponse } from "next/server";
import { demoDashboardStats } from "@/constants/demo-data";
import { getDashboardStats } from "@/services/dashboard.service";

export async function GET() {
  // Try Supabase first, fall back to demo data
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const stats = await getDashboardStats();
      return NextResponse.json(stats);
    }
  } catch (err) {
    console.error("Supabase dashboard fetch failed, using demo data:", err);
  }

  return NextResponse.json(demoDashboardStats);
}
