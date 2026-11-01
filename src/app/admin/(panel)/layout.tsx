import type { ReactNode } from "react";
import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/supabase/admin-auth";

async function ProtectedAdminShell({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  return <AdminShell displayName={admin.displayName}>{children}</AdminShell>;
}

function AdminLoading() {
  return <div aria-label="Memuat panel admin" className="min-h-screen animate-pulse bg-[#f5f7f4]" />;
}

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<AdminLoading />}><ProtectedAdminShell>{children}</ProtectedAdminShell></Suspense>;
}