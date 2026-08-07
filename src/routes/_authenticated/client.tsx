import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { myNotifications } from "@/lib/portal.functions";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";
import { Bell, FolderKanban, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/client")({
  component: ClientPage,
});

type Project = { id: string; name: string; status: string; due_date: string | null };
type Task = { id: string; title: string; status: string; priority: string; due_at: string | null; project_id: string | null; remark: string | null };

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-white/10 text-white/80",
  in_progress: "bg-sky-500/20 text-sky-200",
  working: "bg-sky-500/20 text-sky-200",
  done: "bg-emerald-500/20 text-emerald-200",
  completed: "bg-emerald-500/20 text-emerald-200",
  delayed: "bg-amber-500/20 text-amber-200",
};

function ClientPage() {
  const notifFn = useServerFn(myNotifications);
  
  // 1. Fetch Notifications
  const { data: notes = [] } = useQuery({ 
    queryKey: ["client", "notifications"], 
    queryFn: () => notifFn() 
  });

  // 2. Fetch Current User
  const { data: user } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    }
  });

  // 3. Fetch Projects (Only runs if user exists)
  const { data: projects = [], isLoading: projsLoading } = useQuery({
    queryKey: ["client", "projects", user?.id],
    enabled: !!user?.id, // Dependent query: waits for user
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("id,name,status,due_date")
        .eq("client_id", user!.id);
      return (data as Project[]) ?? [];
    }
  });

  // 4. Fetch Tasks (Only runs if projects exist)
  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["client", "tasks", projects.map(p => p.id)],
    enabled: projects.length > 0, // Dependent query: waits for projects
    queryFn: async () => {
      const ids = projects.map((p) => p.id);
      const { data } = await supabase
        .from("tasks")
        .select("id,title,status,priority,due_at,project_id,remark")
        .in("project_id", ids)
        .order("created_at", { ascending: false });
      return (data as Task[]) ?? [];
    }
  });

  const stats = useMemo(() => ({
    open: tasks.filter((t) => !["done", "completed"].includes(t.status)).length,
    done: tasks.filter((t) => ["done", "completed"].includes(t.status)).length,
    delayed: tasks.filter((t) => t.status === "delayed").length,
  }), [tasks]);

  const isLoading = projsLoading || tasksLoading;

  return (
    <DashboardShell role="Client" title="My Projects" subtitle="Track every deliverable with full transparency.">
      <div className="grid gap-4 sm:grid-cols-4 mb-8">
        <StatCard icon={FolderKanban} label="Projects" value={projects.length} />
        <StatCard icon={Clock} label="Open tasks" value={stats.open} accent="text-sky-300" />
        <StatCard icon={CheckCircle2} label="Completed" value={stats.done} accent="text-emerald-300" />
        <StatCard icon={AlertTriangle} label="Delayed" value={stats.delayed} accent="text-amber-300" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-display text-xl mb-4 flex items-center gap-2"><FolderKanban className="w-5 h-5 text-[#1f5fb7]" /> Active projects</h2>
            {isLoading && <p className="text-white/50">Loading projects...</p>}
            {!isLoading && projects.length === 0 && <p className="text-white/50">No projects yet — your account manager will be in touch.</p>}
            <ul className="space-y-3">
              {projects.map((p) => {
                const pt = tasks.filter((t) => t.project_id === p.id);
                const done = pt.filter((t) => ["done", "completed"].includes(t.status)).length;
                const pct = pt.length ? Math.round((done / pt.length) * 100) : 0;
                return (
                  <li key={p.id} className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-white/50 mt-0.5">{p.status}{p.due_date ? ` · due ${new Date(p.due_date).toLocaleDateString()}` : ""}</div>
                      </div>
                      <span className="text-xs text-white/60">{done}/{pt.length} tasks · {pct}%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full" style={{ width: `${pct}%`, background: "var(--gradient-brand)" }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-display text-xl mb-4">Task progress</h2>
            {isLoading && <p className="text-white/50 text-sm">Loading tasks...</p>}
            {!isLoading && tasks.length === 0 && <p className="text-white/50 text-sm">No tasks yet.</p>}
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                  <div className="min-w-0">
                    <div className="text-sm truncate">{t.title}</div>
                    {t.remark && <div className="text-[11px] text-white/50 mt-0.5 truncate">Remark: {t.remark}</div>}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${STATUS_STYLE[t.status] ?? "bg-white/10 text-white/70"}`}>
                    {t.status.replace("_", " ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h2 className="font-display text-xl mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-[#e63027]" /> Updates</h2>
          <ul className="space-y-3">
            {notes.length === 0 && <p className="text-white/50 text-sm">No updates yet.</p>}
            {notes.map((n) => (
              <li key={n.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-sm font-medium">{n.title}</div>
                {n.body && <div className="text-xs text-white/60 mt-1">{n.body}</div>}
                <div className="text-[10px] text-white/40 mt-1">{new Date(n.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({ icon: Icon, label, value, accent = "text-white" }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; accent?: string }) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <Icon className={`w-5 h-5 ${accent}`} />
      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/50">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}
