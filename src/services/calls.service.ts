import { createServiceRoleClient } from "@/lib/supabase/server";
import type { Call } from "@/types";

export async function createCall(data: {
  user_id: string;
  agent_name?: string;
  customer_name?: string;
  audio_storage_path?: string;
}): Promise<Call> {
  const supabase = await createServiceRoleClient();
  const { data: call, error } = await supabase
    .from("calls")
    .insert({
      user_id: data.user_id,
      agent_name: data.agent_name ?? "Uploaded Call",
      customer_name: data.customer_name ?? null,
      audio_storage_path: data.audio_storage_path ?? null,
      status: "pending",
      risk_score: 0,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create call: ${error.message}`);
  return call as Call;
}

export async function updateCall(
  callId: string,
  data: Partial<Pick<Call, "status" | "transcript" | "risk_score" | "duration_seconds" | "ended_at">>
): Promise<Call> {
  const supabase = await createServiceRoleClient();
  const { data: call, error } = await supabase
    .from("calls")
    .update(data)
    .eq("id", callId)
    .select()
    .single();

  if (error) throw new Error(`Failed to update call: ${error.message}`);
  return call as Call;
}

export async function getCalls(userId: string): Promise<Call[]> {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase
    .from("calls")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch calls: ${error.message}`);
  return (data ?? []) as Call[];
}
