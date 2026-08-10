import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Scene3D } from "@/components/three/Scene3D";
import { Footer } from "@/components/landing/Footer";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

export function DashboardShell({
  role,
  title,
  subtitle,
  children,
  nav,
}: {
  role: "Admin" | "Employee" | "Client";
  title: string;
  subtitle?: string;
  children: ReactNode;
  nav?: { to: string; label: string }[];
}) {
  const navigate = useNavigate();
  const onSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      <Scene3D className="opacity-40" />
      
      {/* GlobalHeader यहाँ से हटा दिया गया है ताकि एडमिन पैनल में वेबसाइट का मेनू न दिखे */}

      {/* Padding Top (pt) को कम कर दिया गया है ताकि ऊपर फालतू स्पेस न बचे */}
      <main className="relative mx-auto max-w-7xl px-6 pt-12 md:pt-16 pb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-[oklch(0.78_0.12_258)]">{role} Portal</p>
            <h1 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-gradient-brand">{title}</h1>
            {subtitle && <p className="mt-2 text-white/60 max-w-2xl">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {nav?.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3.5 py-2 text-sm text-white/75 hover:text-white border border-white/10 hover:bg-white/10"
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
