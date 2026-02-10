import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Rule } from "@/types";

export async function getRules(filters?: {
  category?: string;
  search?: string;
}): Promise<Rule[]> {
  const supabase = await createServiceRoleClient();

  let query = supabase.from("rules").select("*").eq("is_active", true);

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.search) {
    query = query.or(
      `code.ilike.%${filters.search}%,name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query.order("severity");

  if (error) throw new Error(`Failed to fetch rules: ${error.message}`);
  return (data ?? []) as Rule[];
}
