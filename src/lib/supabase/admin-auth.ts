import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createSupabaseServerClient, isSupabaseConfigured } from "./server";

export async function getAdminContext() {
  if (!isSupabaseConfigured()) return null;
  await connection();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || typeof userId !== "string") {
    return null;
  }

  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (adminError || !admin) {
    return null;
  }

  return { supabase, userId, displayName: admin.display_name as string | null };
}

export async function requireAdmin() {
  const admin = await getAdminContext();
  if (!admin) redirect("/admin/login");
  return admin;
}