import { NextResponse } from "next/server";
import { regulatoryRules } from "@/constants/rules";
import { getRules } from "@/services/rules.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  // Try Supabase first, fall back to demo data
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const rules = await getRules({
        category: category ?? undefined,
        search: search ?? undefined,
      });
      return NextResponse.json({ data: rules, total: rules.length });
    }
  } catch (err) {
    console.error("Supabase rules fetch failed, using demo data:", err);
  }

  // Demo data fallback
  let filtered = [...regulatoryRules];

  if (category) {
    filtered = filtered.filter((r) => r.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.code.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ data: filtered, total: filtered.length });
}
