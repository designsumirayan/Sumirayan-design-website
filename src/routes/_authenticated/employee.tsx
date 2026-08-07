import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { myTasks, updateTaskStatus, myNotifications } from "@/lib/portal.functions";
import {
  CheckCircle2, Clock, PlayCircle, Bell, AlertTriangle, Search, ListChecks, History,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_authenticated/employee")({
  component: EmployeePage,
});

const STATUS = ["pending", "in_progress", "working", "done", "completed", "delayed"] as const;
type Status = typeof STATUS[number];

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-white/10 text-white/80",
  in_progress: "bg-sky-500/20 text-sky-200",
  working: "bg-sky-500/20 text-sky-200",
  done: "bg-emerald-500/20 text-emerald-200",
  completed: "bg-emerald-500/20 text-emerald-200",
  delayed: "bg-amber-500/20 text-amber-200",
};

function EmployeePage() {
  const tasksFn = useServerFn(myTasks);
  const updateFn = useServerFn(updateTaskStatus);
  const notifFn = useServerFn(myNotifications);
  const qc = useQueryClient();

  const { data: tasks = [] } = useQuery({ queryKey: ["me", "tasks"], queryFn: () => tasksFn() });
  const { data: notes = [] } = useQuery({ queryKey: ["me", "notifications"], queryFn: () => notifFn() });

  const update = useMutation({
    mutationFn: (vars: { id: string; status?: Status; remark?: string | null; expected_completion_at?: string | null }) =>
      updateFn({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me", "tasks"] }),
  });

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "history">("open");

  const isCompleted = (s: string) => s === "completed" || s === "done";

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return tasks.filter((t) => {
      const matches = !q || t.title.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q);
      if (!matches) return false;
      if (filter === "open") return !isCompleted(t.status);
      if (filter === "history") return isCompleted(t.status);
      return true;
    });
  }, [tasks, query, filter]);

  const firstCompleted = useMemo(
    () => [...tasks].filter((t) => isCompleted(t.status) && t.completed_at)
      .sort((a, b) => new Date(a.completed_at!).getTime() - new Date(b.completed_at!).getTime())[0],
    [tasks],
  );
  const lastCompleted = useMemo(
    () => [...tasks].filter((t) => isCompleted(t.status) && t.completed_at)
      .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime())[0],
    [tasks],
  );

  const counts = {
    total: tasks.length,
    open: tasks.filter((t) => !isCompleted(t.status)).length,
    inProgress: tasks.filter((t) => t.status === "in_progress" || t.status === "working").length,
    delayed: tasks.filter((t) => t.status === "delayed").length,
    completed: tasks.filter((t) => isCompleted(t.status)).length,
  };

  return (
    <DashboardShell role="Employee" title="My Workspace" subtitle="Daily tasks, remarks and history at a glance.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={Clock} label="Total" value={counts.total} />
        <StatCard icon={ListChecks} label="Open" value={counts.open} accent="text-sky-300" />
        <StatCard icon={PlayCircle} label="In progress" value={counts.inProgress} accent="text-sky-300" />
        <StatCard icon={AlertTriangle} label="Delayed" value={counts.delayed} accent="text-amber-300" />
        <StatCard icon={CheckCircle2} label="Completed" value={counts.completed} accent="text-emerald-300" />
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-2xl p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="font-display text-xl flex-1">My tasks</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-white/40" />
              <input
                value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="pl-8 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm w-44"
              />
            </div>
            <div className="flex rounded-full bg-white/5 border border-white/10 p-0.5 text-xs">
              {(["open", "all", "history"] as const).map((f) => (
                <button
                  key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full capitalize transition ${filter === f ? "bg-white/15 text-white" : "text-white/60"}`}
                >{f}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && <p className="text-white/50 text-sm">Nothing here yet.</p>}
          <ul className="space-y-3">
            {filtered.map((t) => (
              <TaskCard key={t.id} task={t} onSubmit={(patch) => update.mutate({ id: t.id, ...patch })} />
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="glass-strong rounded-2xl p-5">
            <h3 className="font-display text-base mb-3 flex items-center gap-2"><History className="w-4 h-4 text-[#1f5fb7]" /> Milestones</h3>
            <Mini label="First task completed" task={firstCompleted} />
            <Mini label="Last task completed" task={lastCompleted} />
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h3 className="font-display text-base mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-[#e63027]" /> Notifications</h3>
            <ul className="space-y-2 max-h-72 overflow-auto">
              {notes.length === 0 && <p className="text-white/50 text-sm">No notifications.</p>}
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

function Mini({ label, task }: { label: string; task?: { title: string; completed_at: string | null } }) {
  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 mb-2">
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      {task ? (
        <>
          <div className="text-sm font-medium truncate">{task.title}</div>
          <div className="text-[10px] text-white/50">{task.completed_at ? new Date(task.completed_at).toLocaleString() : "—"}</div>
        </>
      ) : <div className="text-sm text-white/40">—</div>}
    </div>
  );
}

type Task = {
  id: string; title: string; description: string | null; status: string; priority: string;
  due_at: string | null; created_at: string; completed_at: string | null;
  remark: string | null; expected_completion_at: string | null;
};

function TaskCard({ task, onSubmit }: { task: Task; onSubmit: (patch: { status?: Status; remark?: string | null; expected_completion_at?: string | null }) => void }) {
  const [open, setOpen] = useState(false);
  const isDone = task.status === "completed" || task.status === "done";
  const overdue = task.due_at && new Date(task.due_at) < new Date() && !isDone;

  return (
    <li className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-medium">{task.title}</div>
          {task.description && <div className="text-xs text-white/60 mt-1 line-clamp-2">{task.description}</div>}
          <div className="text-[11px] text-white/50 mt-1 flex flex-wrap gap-3">
            <span>Priority: {task.priority}</span>
            {task.due_at && <span className={overdue ? "text-amber-300" : ""}>Due {new Date(task.due_at).toLocaleDateString()}</span>}
            {task.expected_completion_at && <span>ETA {new Date(task.expected_completion_at).toLocaleDateString()}</span>}
          </div>
          {task.remark && (
            <div className="mt-2 text-xs rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5">
              <span className="text-white/40">Remark:</span> <span className="text-white/80">{isDone ? "Done — " : ""}{task.remark}</span>
            </div>
          )}
        </div>
        <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_STYLE[task.status] ?? "bg-white/10 text-white/70"}`}>
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/80 hover:bg-white/10"
        >{open ? "Cancel" : "Update"}</button>
        {!isDone && (
          <button
            onClick={() => onSubmit({ status: "completed", remark: "Done" })}
            className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
          >Mark complete</button>
        )}
      </div>

      {open && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const status = fd.get("status") as Status;
            const remark = String(fd.get("remark") || "");
            const eta = String(fd.get("eta") || "");
            onSubmit({
              status,
              remark: status === "completed" || status === "done" ? (remark || "Done") : (remark || null),
              expected_completion_at: eta || null,
            });
            setOpen(false);
          }}
          className="mt-3 grid sm:grid-cols-3 gap-2"
        >
          <select name="status" defaultValue={task.status} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
            {STATUS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
          </select>
          <input
            name="eta" type="datetime-local"
            defaultValue={task.expected_completion_at ? task.expected_completion_at.slice(0, 16) : ""}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm"
            title="Expected completion"
          />
          <input
            name="remark" placeholder="Remark — reason if not done, or 'done'"
            defaultValue={task.remark ?? ""}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm sm:col-span-3"
          />
          <div className="sm:col-span-3 flex justify-end">
            <button className="text-xs px-4 py-2 rounded-full font-medium text-white" style={{ background: "var(--gradient-brand)" }}>Save update</button>
          </div>
        </form>
      )}
    </li>
  );
}
