import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardRedirect,
});

function DashboardRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/auth", replace: true }); return; }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .order("role", { ascending: true });
      const roles = (data ?? []).map((r) => r.role as string);
      const target = roles.includes("admin") ? "/admin"
        : roles.includes("employee") ? "/employee"
        : "/client";
      navigate({ to: target, replace: true });
    })();
  }, [navigate]);

  return (
    <main className="min-h-screen grid place-items-center bg-background text-white/60">
      Loading your workspace…
    </main>
  );
}
