import { NextResponse } from "next/server";
import { regulatoryRules } from "@/constants/rules";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

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
