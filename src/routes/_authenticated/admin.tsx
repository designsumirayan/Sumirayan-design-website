import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import {
  adminOverview,
  adminCreateTask,
  adminDeleteTask,
  adminUpdateTaskStatus,
  adminAssignRole,
  adminRemoveRole,
  adminMonthlyPerformance,
  adminDeleteContact,
  adminCreateBlogPost,
  adminDeleteBlogPost,
} from "@/lib/portal.functions";
import {
  publicDesignItems, adminCreateDesign, adminDeleteDesign,
  publicPhotographyItems, adminCreatePhoto, adminDeletePhoto,
  publicArtItems, adminCreateArt, adminDeleteArt,
  publicLearnCourses, adminCreateLearn, adminDeleteLearn,
  publicEvents, adminCreateEvent, adminDeleteEvent,
  publicCareers, adminCreateCareer, adminDeleteCareer,
  publicItServices, adminCreateItService, adminDeleteItService,
} from "@/lib/content.functions";
import {
  Trash2, Plus, CheckCircle2, Clock, Users, Mail,
  TrendingUp, ListTodo, ShieldCheck, Archive,
  FileText, LayoutGrid, Pencil, Search, Tags as TagsIcon, Globe, UserCircle, Settings
} from "lucide-react";

import logoUrl from "@/assets/sumirayan design.png";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type Tab = "overview" | "tasks" | "team" | "contacts" | "blog" | "content" | "performance";
type Role = "admin" | "employee" | "client";
type TaskStatus = "pending" | "in_progress" | "working" | "done" | "completed" | "delayed";
const STATUS_OPTIONS: TaskStatus[] = ["pending", "in_progress", "working", "done", "completed", "delayed"];
const STATUS_STYLE: Record<string, string> = {
  pending: "bg-white/10 text-white/80",
  in_progress: "bg-sky-500/20 text-sky-200",
  working: "bg-sky-500/20 text-sky-200",
  done: "bg-emerald-500/20 text-emerald-200",
  completed: "bg-emerald-500/20 text-emerald-200",
  delayed: "bg-amber-500/20 text-amber-200",
};

function AdminPage() {
  const overview = useServerFn(adminOverview);
  const perfFn = useServerFn(adminMonthlyPerformance);
  const create = useServerFn(adminCreateTask);
  const del = useServerFn(adminDeleteTask);
  const updateStatus = useServerFn(adminUpdateTaskStatus);
  const assignRole = useServerFn(adminAssignRole);
  const removeRole = useServerFn(adminRemoveRole);
  const delContact = useServerFn(adminDeleteContact);
  const createBlog = useServerFn(adminCreateBlogPost);
  const deleteBlog = useServerFn(adminDeleteBlogPost);
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("overview");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => overview(),
  });
  const { data: perf } = useQuery({
    queryKey: ["admin", "performance"],
    queryFn: () => perfFn(),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin"] });

  const createMut = useMutation({
    mutationFn: (input: { title: string; description?: string; assigned_to?: string; priority: "low" | "medium" | "high"; due_at?: string }) =>
      create({ data: input }),
    onSuccess: invalidate,
    onError: (error) => {
      console.error("Task Creation Error:", error);
      alert("Failed to create task. Check the console for details.");
    }
  });

  const deleteMut = useMutation({ mutationFn: (id: string) => del({ data: { id } }), onSuccess: invalidate });
  
  const statusMut = useMutation({
    mutationFn: (v: { id: string; status?: TaskStatus; remark?: string | null; expected_completion_at?: string | null; assigned_to?: string | null }) => updateStatus({ data: v }),
    onSuccess: invalidate,
  });

  const assignMut = useMutation({ mutationFn: (v: { user_id: string; role: Role }) => assignRole({ data: v }), onSuccess: invalidate });
  const removeRoleMut = useMutation({ mutationFn: (v: { user_id: string; role: Role }) => removeRole({ data: v }), onSuccess: invalidate });
  const delContactMut = useMutation({ mutationFn: (id: string) => delContact({ data: { id } }), onSuccess: invalidate });
  
  const createBlogMut = useMutation({
    mutationFn: (v: any) => createBlog({ data: v }),
    onSuccess: invalidate,
    onError: (error) => alert(error instanceof Error ? error.message : "Failed to publish blog."),
  });
  const deleteBlogMut = useMutation({ mutationFn: (id: string) => deleteBlog({ data: { id } }), onSuccess: invalidate });

  const tasks = data?.tasks ?? [];
  const members = data?.members ?? [];
  const roles = data?.roles ?? [];
  const contacts = data?.contacts ?? (data as any)?.messages ?? [];
  const blogs = data?.blogs ?? (data as any)?.posts ?? [];

  const memberName = (id: string | null) => members.find((m) => m.id === id)?.full_name ?? "Unassigned";
  const userRoles = (uid: string) => roles.filter((r) => r.user_id === uid).map((r) => r.role as string);

  const isDone = (s: string) => s === "completed" || s === "done";
  const openTasks = useMemo(() => tasks.filter((t) => !isDone(t.status)), [tasks]);
  const oldTasks = useMemo(() => tasks.filter((t) => isDone(t.status)), [tasks]);

  const stats = [
    { k: "Team", v: members.length, icon: Users, tab: "team" as Tab },
    { k: "Open tasks", v: openTasks.length, icon: Clock, tab: "tasks" as Tab },
    { k: "Completed", v: oldTasks.length, icon: CheckCircle2, tab: "tasks" as Tab },
    { k: "Inbox", v: contacts.length, icon: Mail, tab: "contacts" as Tab },
    { k: "Blogs", v: blogs.length, icon: FileText, tab: "blog" as Tab },
  ];

  const tabs: { id: Tab; label: string; icon: typeof ListTodo }[] = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "tasks", label: "Tasks", icon: ListTodo },
    { id: "team", label: "Team & Roles", icon: ShieldCheck },
    { id: "contacts", label: "Messages", icon: Mail },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "content", label: "Site Content", icon: LayoutGrid },
    { id: "performance", label: "Performance", icon: TrendingUp },
  ];

  return (
    <DashboardShell role="Admin" title="Command Center" subtitle="Tasks, team roles, client messages and monthly performance — all in one place.">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-white">
          <img src={logoUrl} alt="Sumirayan Design" className="h-6 w-auto object-contain" onContextMenu={(e) => e.preventDefault()} />
        </div>
        <div>
          <div className="font-display text-lg">Sumirayan Design — Studio Operations</div>
          <div className="text-xs text-white/50">Manage everything happening across the agency.</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {stats.map((s) => (
          <button
            key={s.k}
            onClick={() => setTab(s.tab)}
            className="text-left glass-strong rounded-2xl p-4 md:p-6 hover:bg-white/[0.06] transition"
          >
            <s.icon className="w-5 h-5 text-[#1f5fb7]" />
            <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/50">{s.k}</p>
            <p className="mt-1 font-display text-3xl md:text-4xl font-semibold text-gradient-brand">{isLoading ? "…" : s.v}</p>
          </button>
        ))}
      </div>

      {/* Scrollable Tabs for Mobile */}
      <div className="mt-8 flex overflow-x-auto gap-2 border-b border-white/10 pb-3 no-scrollbar scroll-smooth">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${tab === t.id ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {tab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-strong rounded-2xl p-6 overflow-hidden">
              <h2 className="font-display text-lg mb-4 flex items-center gap-2"><ListTodo className="w-5 h-5 text-[#1f5fb7]" /> Latest open tasks</h2>
              <ul className="space-y-2">
                {openTasks.slice(0, 6).map((t) => (
                  <li key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2">
                    <div className="min-w-0">
                      <div className="text-sm truncate">{t.title}</div>
                      <div className="text-xs text-white/50">{memberName(t.assigned_to)} · {t.priority}</div>
                    </div>
                    <span className="text-xs text-white/60 self-start sm:self-auto">{t.status}</span>
                  </li>
                ))}
                {openTasks.length === 0 && <p className="text-white/50 text-sm">All caught up.</p>}
              </ul>
            </div>
            <div className="glass-strong rounded-2xl p-6 overflow-hidden">
              <h2 className="font-display text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#e63027]" /> This month's top performers</h2>
              <ul className="space-y-2">
                {(perf?.rows ?? []).slice(0, 5).map((r) => (
                  <li key={r.id} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{r.name}</span>
                      <span className="text-xs text-[#1f5fb7]">{r.completedThisMonth} done</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full" style={{ width: `${r.score}%`, background: "var(--gradient-brand)" }} />
                    </div>
                  </li>
                ))}
                {(perf?.rows ?? []).length === 0 && <p className="text-white/50 text-sm">No data yet.</p>}
              </ul>
            </div>
          </div>
        )}

        {tab === "tasks" && (
          <TasksTab
            openTasks={openTasks}
            oldTasks={oldTasks}
            members={members}
            memberName={memberName}
            onCreate={(v) => createMut.mutate(v)}
            onDelete={(id) => deleteMut.mutate(id)}
            onUpdate={(id, patch) => statusMut.mutate({ id, ...patch })}
            creating={createMut.isPending}
          />
        )}

        {tab === "team" && (
          <TeamTab
            members={members}
            userRoles={userRoles}
            onAssign={(user_id, role) => assignMut.mutate({ user_id, role })}
            onRemove={(user_id, role) => removeRoleMut.mutate({ user_id, role })}
          />
        )}

        {tab === "contacts" && (
          <div className="glass-strong rounded-2xl p-4 md:p-6">
            <h2 className="font-display text-xl mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-[#1f5fb7]" /> Client messages</h2>
            {contacts.length === 0 && <p className="text-white/50">No messages yet.</p>}
            <ul className="space-y-3">
              {contacts.map((c: any) => (
                <li key={c.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">{c.name} <span className="text-white/40 text-xs block sm:inline">· {c.email}</span></div>
                      {c.company && <div className="text-xs text-white/50">{c.company}</div>}
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-xs text-white/40">{new Date(c.created_at).toLocaleString()}</span>
                      <button onClick={() => delContactMut.mutate(c.id)} className="text-white/40 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/80 whitespace-pre-wrap bg-white/5 p-3 rounded-lg border border-white/5">{c.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "blog" && (
          <BlogTab
            posts={blogs}
            creating={createBlogMut.isPending}
            onCreate={(input) => createBlogMut.mutate(input)}
            onDelete={(id) => deleteBlogMut.mutate(id)}
          />
        )}

        {tab === "content" && <ContentTab />}

        {tab === "performance" && (
          <div className="glass-strong rounded-2xl p-4 md:p-6 overflow-hidden">
            <h2 className="font-display text-xl mb-1 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#e63027]" /> Monthly performance</h2>
            <p className="text-xs text-white/50 mb-4">Since {perf?.monthStart ? new Date(perf.monthStart).toLocaleDateString() : "—"}</p>
            <div className="overflow-x-auto pb-2">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="text-left text-white/50 text-xs uppercase tracking-wider border-b border-white/10">
                  <tr><th className="py-3 pr-4">Employee</th><th className="py-3 pr-4">Specialty</th><th className="py-3 pr-4">Completed</th><th className="py-3 pr-4">Open</th><th className="py-3 pr-4">Total</th><th className="py-3 pr-4 w-1/3">Score</th></tr>
                </thead>
                <tbody>
                  {(perf?.rows ?? []).map((r) => (
                    <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="py-3 pr-4 font-medium">{r.name}</td>
                      <td className="py-3 pr-4 text-white/60">{r.specialty ?? "—"}</td>
                      <td className="py-3 pr-4 text-emerald-300 font-semibold">{r.completedThisMonth}</td>
                      <td className="py-3 pr-4 text-amber-300 font-semibold">{r.open}</td>
                      <td className="py-3 pr-4 text-white/70">{r.total}</td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full" style={{ width: `${r.score}%`, background: "var(--gradient-brand)" }} />
                          </div>
                          <span className="text-xs text-white/60 w-10 text-right">{r.score}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(perf?.rows ?? []).length === 0 && <tr><td colSpan={6} className="py-6 text-white/50 text-center">No data.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

// --- Tasks Tab ---
type Task = { id: string; title: string; description?: string | null; assigned_to: string | null; priority: string; status: string; due_at: string | null; completed_at?: string | null; created_at: string; remark?: string | null; expected_completion_at?: string | null };
type Member = { id: string; full_name: string | null; specialty?: string | null };
type TaskPatch = { status?: TaskStatus; remark?: string | null; expected_completion_at?: string | null; assigned_to?: string | null };

function TasksTab({
  openTasks, oldTasks, members, memberName, onCreate, onDelete, onUpdate, creating,
}: {
  openTasks: Task[]; oldTasks: Task[]; members: Member[];
  memberName: (id: string | null) => string;
  onCreate: (v: { title: string; description?: string; assigned_to?: string; priority: "low" | "medium" | "high"; due_at?: string }) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: TaskPatch) => void;
  creating: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [showOld, setShowOld] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"created" | "due" | "priority">("created");

  const apply = (rows: Task[]) => {
    const q = query.toLowerCase();
    const priorityRank = { high: 0, medium: 1, low: 2 } as Record<string, number>;
    return rows
      .filter((t) => !q || t.title.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q))
      .filter((t) => statusFilter === "all" || t.status === statusFilter)
      .filter((t) => assigneeFilter === "all" || (assigneeFilter === "none" ? !t.assigned_to : t.assigned_to === assigneeFilter))
      .sort((a, b) => {
        if (sortBy === "priority") return (priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9);
        if (sortBy === "due") return (a.due_at ? new Date(a.due_at).getTime() : Infinity) - (b.due_at ? new Date(b.due_at).getTime() : Infinity);
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  };

  const activeRows = apply(openTasks);
  const oldRows = apply(oldTasks);

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl">Assign new task</h2>
          <button onClick={() => setOpen((v) => !v)} className="text-xs text-white/60 hover:text-white px-3 py-1 rounded-full bg-white/5">{open ? "Hide" : "Show"}</button>
        </div>
        {open && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const rawDesc = fd.get("description")?.toString();
              const rawAssigned = fd.get("assigned_to")?.toString();
              const rawDueAt = fd.get("due_at")?.toString();

              onCreate({
                title: String(fd.get("title")),
                description: rawDesc ? rawDesc : undefined,
                assigned_to: rawAssigned ? rawAssigned : undefined,
                priority: (fd.get("priority") as "low" | "medium" | "high") || "medium",
                due_at: rawDueAt ? new Date(rawDueAt).toISOString() : undefined,
              });
              (e.target as HTMLFormElement).reset();
            }}
            className="grid sm:grid-cols-2 gap-3"
          >
            <input name="title" required placeholder="Task title" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm sm:col-span-2 focus:border-blue-500/50 outline-none" />
            <textarea name="description" placeholder="Description" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm sm:col-span-2 focus:border-blue-500/50 outline-none resize-none" rows={2} />
            <select name="assigned_to" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-blue-500/50 outline-none text-white/90">
              <option value="" className="bg-[#0a0f1e]">Unassigned</option>
              {members.map((m) => <option key={m.id} value={m.id} className="bg-[#0a0f1e]">{m.full_name ?? m.id.slice(0, 6)}</option>)}
            </select>
            <select name="priority" defaultValue="medium" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-blue-500/50 outline-none text-white/90">
              <option value="low" className="bg-[#0a0f1e]">Low Priority</option>
              <option value="medium" className="bg-[#0a0f1e]">Medium Priority</option>
              <option value="high" className="bg-[#0a0f1e]">High Priority</option>
            </select>
            <div className="sm:col-span-2 grid sm:grid-cols-2 gap-3 items-end">
                <div>
                    <label className="block text-xs text-white/50 mb-1 ml-1">Due Date (Optional)</label>
                    <input name="due_at" type="datetime-local" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-blue-500/50 outline-none text-white/90" />
                </div>
                <button disabled={creating} className="w-full sm:w-auto justify-center sm:justify-self-end inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-lg active:scale-95 transition-transform" style={{ background: "var(--gradient-brand)" }}>
                <Plus className="w-4 h-4" /> {creating ? "Creating…" : "Create & assign"}
                </button>
            </div>
          </form>
        )}
      </div>

      {/* Filters */}
      <div className="glass-strong rounded-2xl p-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…" className="w-full rounded-lg bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-sm focus:border-blue-500/50 outline-none"
            />
        </div>
        <div className="grid grid-cols-2 sm:flex gap-2">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-auto rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/80 outline-none">
            <option value="all" className="bg-[#0a0f1e]">All statuses</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0a0f1e]">{s.replace("_", " ")}</option>)}
            </select>
            <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)} className="w-full sm:w-auto rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/80 outline-none">
            <option value="all" className="bg-[#0a0f1e]">All assignees</option>
            <option value="none" className="bg-[#0a0f1e]">Unassigned</option>
            {members.map((m) => <option key={m.id} value={m.id} className="bg-[#0a0f1e]">{m.full_name ?? "Unnamed"}</option>)}
            </select>
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "created" | "due" | "priority")} className="w-full sm:w-auto rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/80 outline-none">
          <option value="created" className="bg-[#0a0f1e]">Newest first</option>
          <option value="due" className="bg-[#0a0f1e]">By due date</option>
          <option value="priority" className="bg-[#0a0f1e]">By priority</option>
        </select>
      </div>

      <TaskTable title={`Active tasks (${activeRows.length})`} rows={activeRows} members={members} memberName={memberName} onDelete={onDelete} onUpdate={onUpdate} />

      <div className="glass-strong rounded-2xl p-4 md:p-6">
        <button onClick={() => setShowOld((v) => !v)} className="flex w-full items-center justify-between group">
          <h2 className="font-display text-lg md:text-xl flex items-center gap-2"><Archive className="w-5 h-5 text-white/60" /> Completed tasks ({oldRows.length})</h2>
          <span className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full group-hover:bg-white/10 transition">{showOld ? "Hide" : "Show"}</span>
        </button>
        {showOld && <div className="mt-5"><TaskTable rows={oldRows} members={members} memberName={memberName} onDelete={onDelete} onUpdate={onUpdate} compact /></div>}
      </div>
    </div>
  );
}

function TaskTable({
  title, rows, members, memberName, onDelete, onUpdate, compact,
}: {
  title?: string; rows: Task[]; members: Member[];
  memberName: (id: string | null) => string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: TaskPatch) => void;
  compact?: boolean;
}) {
  const content = (
    <div className="overflow-x-auto pb-2">
      <table className="w-full text-sm min-w-[800px]">
        <thead className="text-left text-white/50 text-xs uppercase tracking-wider border-b border-white/10">
          <tr>
            <th className="py-3 pr-4 pl-2">Task</th>
            <th className="py-3 pr-4">Assignee</th>
            <th className="py-3 pr-4">Priority</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3 pr-4">Remark</th>
            <th className="py-3 pr-4">{compact ? "Completed" : "Due / ETA"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={7} className="py-8 text-white/50 text-center border-b border-white/5">No tasks found.</td></tr>}
          {rows.map((t) => {
            const overdue = t.due_at && new Date(t.due_at) < new Date() && !(t.status === "completed" || t.status === "done");
            return (
              <tr key={t.id} className="border-b border-white/5 last:border-0 align-top hover:bg-white/[0.02]">
                <td className="py-4 pr-4 pl-2 min-w-[200px] max-w-[250px]">
                  <div className="font-medium text-white/90">{t.title}</div>
                  {t.description && <div className="text-[11px] text-white/50 mt-1 line-clamp-2">{t.description}</div>}
                </td>
                
                <td className="py-4 pr-4 text-white/70">
                  <select
                    value={t.assigned_to || ""}
                    onChange={(e) => onUpdate(t.id, { assigned_to: e.target.value || null })}
                    className="w-[120px] bg-white/[0.03] border border-white/10 rounded-md px-2 py-1.5 text-xs text-white hover:bg-white/10 outline-none transition"
                  >
                    <option value="" className="bg-[#0a0f1e]">Unassigned</option>
                    {members.map(m => <option key={m.id} value={m.id} className="bg-[#0a0f1e]">{m.full_name ?? m.id.slice(0, 6)}</option>)}
                  </select>
                </td>

                <td className="py-4 pr-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase border ${t.priority === "high" ? "bg-red-500/10 text-red-300 border-red-500/20" : t.priority === "medium" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" : "bg-white/5 text-white/60 border-white/10"}`}>{t.priority}</span>
                </td>
                <td className="py-4 pr-4">
                  <select
                    value={t.status}
                    onChange={(e) => onUpdate(t.id, { status: e.target.value as TaskStatus })}
                    className={`rounded-md border border-white/10 px-2 py-1.5 text-xs outline-none transition ${STATUS_STYLE[t.status] ?? "bg-white/10"}`}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0a0f1e]">{s.replace("_", " ")}</option>)}
                  </select>
                </td>
                <td className="py-4 pr-4 min-w-[150px] max-w-[220px]">
                  <input
                    defaultValue={t.remark ?? ""}
                    onBlur={(e) => { if (e.target.value !== (t.remark ?? "")) onUpdate(t.id, { remark: e.target.value || null }); }}
                    placeholder="Add remark..."
                    className="w-full rounded-md bg-white/[0.03] hover:bg-white/[0.06] focus:bg-white/10 border border-white/10 px-2.5 py-1.5 text-xs outline-none transition placeholder:text-white/30"
                  />
                </td>
                <td className="py-4 pr-4 text-white/60 text-xs whitespace-nowrap">
                  {compact ? (t.completed_at ? new Date(t.completed_at).toLocaleDateString() : "—") : (
                    <div className="flex flex-col gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] inline-block w-max ${overdue ? "bg-red-500/20 text-red-200" : "bg-white/5"}`}>Due: {t.due_at ? new Date(t.due_at).toLocaleDateString() : "—"}</span>
                      <input
                        type="datetime-local" 
                        defaultValue={t.expected_completion_at ? t.expected_completion_at.slice(0, 16) : ""}
                        onBlur={(e) => { 
                          const v = e.target.value; 
                          const prev = t.expected_completion_at ? t.expected_completion_at.slice(0, 16) : ""; 
                          if (v !== prev) {
                            onUpdate(t.id, { expected_completion_at: v ? new Date(v).toISOString() : null }); 
                          }
                        }}
                        className="rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 px-2 py-1 text-[11px] outline-none w-[135px] text-white/70"
                        title="Expected completion"
                      />
                    </div>
                  )}
                </td>
                <td className="py-4 pr-2 text-right">
                  <button onClick={() => {if(confirm("Delete task?")) onDelete(t.id);}} className="text-white/30 hover:text-red-400 bg-white/5 hover:bg-red-500/10 p-2 rounded-md transition"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  if (!title) return content;
  return (
    <div className="glass-strong rounded-2xl p-4 md:p-6 overflow-hidden">
      <h2 className="font-display text-lg md:text-xl mb-4 pl-2">{title}</h2>
      {content}
    </div>
  );
}

// --- Team Tab ---
const ROLE_OPTIONS: Role[] = ["admin", "employee", "client"];

function TeamTab({
  members, userRoles, onAssign, onRemove,
}: {
  members: Member[];
  userRoles: (uid: string) => string[];
  onAssign: (uid: string, role: Role) => void;
  onRemove: (uid: string, role: Role) => void;
}) {
  return (
    <div className="glass-strong rounded-2xl p-4 md:p-6">
      <h2 className="font-display text-xl mb-1 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#1f5fb7]" /> Team & roles</h2>
      <p className="text-xs text-white/50 mb-6">Assign or remove roles. A member can hold multiple roles.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => {
          const r = userRoles(m.id);
          return (
            <div key={m.id} className="rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/10 p-5 flex flex-col h-full">
              <div className="font-medium text-base">{m.full_name ?? "Unnamed User"}</div>
              <div className="text-[11px] text-white/50 mt-1 uppercase tracking-wider">{m.specialty ?? "No specialty set"}</div>
              
              <div className="mt-4 flex-1">
                  <div className="text-[10px] text-white/40 mb-2">CURRENT ROLES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.length === 0 && <span className="text-[11px] text-white/30 italic">No roles assigned</span>}
                    {r.map((role) => (
                    <button key={role} onClick={() => onRemove(m.id, role as Role)} title="Click to remove"
                        className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-200 border border-blue-500/30 hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/30 transition group flex items-center gap-1">
                        {role} <span className="opacity-50 group-hover:opacity-100">×</span>
                    </button>
                    ))}
                  </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="text-[10px] text-white/40 mb-2">ASSIGN NEW ROLE</div>
                <div className="flex flex-wrap gap-1.5">
                  {ROLE_OPTIONS.filter((opt) => !r.includes(opt)).map((opt) => (
                    <button key={opt} onClick={() => onAssign(m.id, opt)}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10 text-white/60 bg-white/5 hover:bg-white/10 hover:text-white transition">
                      + {opt}
                    </button>
                  ))}
                  {ROLE_OPTIONS.filter((opt) => !r.includes(opt)).length === 0 && <span className="text-[11px] text-white/30">All roles assigned</span>}
                </div>
              </div>
            </div>
          );
        })}
        {members.length === 0 && <p className="text-white/50 col-span-full text-center py-10 border border-dashed border-white/10 rounded-xl">No team members yet.</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// UPGRADED BLOG SECTION
// ─────────────────────────────────────────────────────────────
type BlogInput = { 
  title: string; 
  slug: string;
  category: string; 
  tags?: string;
  excerpt: string; 
  content: string; 
  image_url: string; 
  image_alt?: string;
  author_name: string; 
  author_bio?: string;
  seo_title?: string;
  seo_description?: string;
  focus_keywords?: string;
  og_image?: string;
  status: "draft" | "published";
  published_at?: string;
};

type BlogPost = BlogInput & { id: string; created_at: string };

function BlogTab({
  posts, creating, onCreate, onDelete,
}: {
  posts: BlogPost[];
  creating: boolean;
  onCreate: (input: BlogInput) => void;
  onDelete: (id: string) => void;
}) {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px] items-start">
      {/* Blog Editor Form */}
      <form
        key={editingPost?.id || 'new_blog'}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          
          const title = String(fd.get("title") || "");
          // Auto-generate slug if empty
          let slug = String(fd.get("slug") || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          if(!slug) slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

          const payload: BlogInput = {
            title,
            slug,
            category: String(fd.get("category") || ""),
            tags: String(fd.get("tags") || ""),
            image_url: String(fd.get("image_url") || ""),
            image_alt: String(fd.get("image_alt") || ""),
            excerpt: String(fd.get("excerpt") || ""),
            content: String(fd.get("content") || ""),
            seo_title: String(fd.get("seo_title") || ""),
            seo_description: String(fd.get("seo_description") || ""),
            focus_keywords: String(fd.get("focus_keywords") || ""),
            og_image: String(fd.get("og_image") || ""),
            author_name: String(fd.get("author_name") || "Sumirayan Design"),
            author_bio: String(fd.get("author_bio") || ""),
            status: (fd.get("status") as "draft" | "published") || "published",
            published_at: fd.get("published_at") ? new Date(String(fd.get("published_at"))).toISOString() : new Date().toISOString(),
          };

          if(editingPost) {
             onDelete(editingPost.id); // Delete old
             setTimeout(() => { onCreate(payload); setEditingPost(null); window.scrollTo({top:0}); }, 500); // Create new
          } else {
             onCreate(payload);
             e.currentTarget.reset();
          }
        }}
        className="glass-strong rounded-2xl p-4 md:p-6 space-y-8"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-xl flex items-center gap-2">
                {editingPost ? <Pencil className="w-5 h-5 text-[#1f5fb7]" /> : <FileText className="w-5 h-5 text-[#1f5fb7]" />} 
                {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
            </h2>
            {editingPost && (
                <button type="button" onClick={() => setEditingPost(null)} className="text-xs text-white/50 hover:text-white bg-white/5 px-3 py-1 rounded-full">Cancel Edit</button>
            )}
        </div>

        {/* Section 1: Basic Info */}
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-blue-400" /> Basic Information</h3>
            <div className="grid gap-4">
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">Blog Title *</span>
                    <input name="title" defaultValue={editingPost?.title} required maxLength={180} placeholder="Catchy title for the blog" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-blue-500/50 outline-none" />
                </label>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">URL Slug (Auto-generated if empty)</span>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-blue-500/50">
                        <span className="text-xs text-white/40 pl-3 py-2 select-none">sumirayandesign.com/blog/</span>
                        <input name="slug" defaultValue={editingPost?.slug} placeholder="my-custom-url" className="w-full bg-transparent px-2 py-2 text-sm outline-none" />
                    </div>
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-xs text-white/60 mb-1 block">Category *</span>
                        <input name="category" defaultValue={editingPost?.category} required maxLength={80} placeholder="e.g. Design Trends, Branding" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-blue-500/50 outline-none" />
                    </label>
                    <label className="block">
                        <span className="text-xs text-white/60 mb-1 block">Tags (Comma separated)</span>
                        <div className="relative">
                            <TagsIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input name="tags" defaultValue={editingPost?.tags} placeholder="UI, UX, Agency, Patna" className="w-full rounded-lg bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-sm focus:border-blue-500/50 outline-none" />
                        </div>
                    </label>
                </div>
            </div>
        </div>

        {/* Section 2: Media & Content */}
        <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2"><Globe className="w-4 h-4 text-purple-400" /> Media & Content</h3>
            <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-xs text-white/60 mb-1 block">Featured Image URL *</span>
                        <input name="image_url" defaultValue={editingPost?.image_url} required type="url" placeholder="https://res.cloudinary.com/..." className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-purple-500/50 outline-none" />
                    </label>
                    <label className="block">
                        <span className="text-xs text-white/60 mb-1 block">Image Alt Text (For SEO & Accessibility)</span>
                        <input name="image_alt" defaultValue={editingPost?.image_alt} placeholder="Describe the image..." className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-purple-500/50 outline-none" />
                    </label>
                </div>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">Short Excerpt (Shows on blog list) *</span>
                    <textarea name="excerpt" defaultValue={editingPost?.excerpt} required maxLength={400} rows={2} placeholder="A brief summary to hook the reader..." className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-purple-500/50 outline-none resize-none" />
                </label>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block flex justify-between">
                        <span>Full Blog Content (Supports Markdown/HTML) *</span>
                        <a href="https://markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Formatting Guide</a>
                    </span>
                    <textarea name="content" defaultValue={editingPost?.content} required rows={12} placeholder="Write your amazing article here..." className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-sm focus:border-purple-500/50 outline-none font-mono" />
                </label>
            </div>
        </div>

        {/* Section 3: SEO Settings */}
        <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2"><Search className="w-4 h-4 text-emerald-400" /> SEO Settings (Optional)</h3>
            <div className="grid gap-4">
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">SEO Meta Title (Leave empty to use Blog Title)</span>
                    <input name="seo_title" defaultValue={editingPost?.seo_title} maxLength={60} placeholder="Optimized title for Google search" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-emerald-500/50 outline-none" />
                    <span className="text-[10px] text-white/40 block mt-1">Recommended: 50-60 characters.</span>
                </label>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">SEO Meta Description (Leave empty to use Excerpt)</span>
                    <textarea name="seo_description" defaultValue={editingPost?.seo_description} maxLength={160} rows={2} placeholder="Optimized description for Google search results..." className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-emerald-500/50 outline-none resize-none" />
                    <span className="text-[10px] text-white/40 block mt-1">Recommended: 150-160 characters.</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-xs text-white/60 mb-1 block">Focus Keywords</span>
                        <input name="focus_keywords" defaultValue={editingPost?.focus_keywords} placeholder="branding patna, logo design" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-emerald-500/50 outline-none" />
                    </label>
                    <label className="block">
                        <span className="text-xs text-white/60 mb-1 block">Custom OG Image URL (For Social Media sharing)</span>
                        <input name="og_image" defaultValue={editingPost?.og_image} type="url" placeholder="Leave empty to use Featured Image" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-emerald-500/50 outline-none" />
                    </label>
                </div>
            </div>
        </div>

        {/* Section 4: Author & Publish Settings */}
        <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-white/5">
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2"><UserCircle className="w-4 h-4 text-amber-400" /> Author Details</h3>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">Author Name *</span>
                    <input name="author_name" defaultValue={editingPost?.author_name || "Sumit Singh"} required maxLength={120} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-amber-500/50 outline-none" />
                </label>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">Author Bio (Optional)</span>
                    <textarea name="author_bio" defaultValue={editingPost?.author_bio} rows={2} placeholder="Founder & Lead Designer..." className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-amber-500/50 outline-none resize-none" />
                </label>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider flex items-center gap-2"><Settings className="w-4 h-4 text-pink-400" /> Publish Settings</h3>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">Visibility Status</span>
                    <select name="status" defaultValue={editingPost?.status || "published"} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-pink-500/50 outline-none text-white/90">
                        <option value="published" className="bg-[#0a0f1e]">Published (Live on site)</option>
                        <option value="draft" className="bg-[#0a0f1e]">Draft (Hidden from public)</option>
                    </select>
                </label>
                <label className="block">
                    <span className="text-xs text-white/60 mb-1 block">Publish Date (Backdate or Schedule)</span>
                    <input name="published_at" type="datetime-local" defaultValue={editingPost?.published_at ? new Date(editingPost.published_at).toISOString().slice(0,16) : ""} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-pink-500/50 outline-none text-white/90" />
                </label>
            </div>
        </div>

        {/* Submit Action */}
        <div className="pt-6 border-t border-white/10 flex justify-end">
            <button disabled={creating} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-medium text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60" style={{ background: "var(--gradient-brand)" }}>
                {creating ? "Saving..." : (editingPost ? "Update Blog Post" : "Publish Blog Post")}
            </button>
        </div>
      </form>

      {/* Blog List Sidebar */}
      <div className="glass-strong rounded-2xl p-4 md:p-6 flex flex-col h-[800px]">
        <h2 className="font-display text-xl mb-4 flex items-center gap-2 shrink-0">
            Manage Posts
            <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full">{posts.length}</span>
        </h2>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {posts.length === 0 && (
              <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
                  <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-white/50 text-sm">No blog posts yet.</p>
              </div>
          )}
          {posts.map((post) => (
            <article key={post.id} className={`group rounded-xl border ${editingPost?.id === post.id ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 bg-white/[0.03]'} p-3 hover:bg-white/[0.06] transition flex flex-col gap-3`}>
              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden shrink-0 relative bg-black/50">
                  {/* Protection added */}
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onContextMenu={(e) => e.preventDefault()} />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${post.status === 'published' ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-white'}`}>
                        {post.status}
                    </span>
                  </div>
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="text-[10px] uppercase tracking-widest text-[#7fb0ff] mb-1 truncate">{post.category}</div>
                <h3 className="font-display text-base font-semibold leading-snug line-clamp-2 mb-2">{post.title}</h3>
                
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="text-[10px] text-white/40 truncate">
                      {new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric'})}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setEditingPost(post)} className="rounded-md p-1.5 text-white/50 hover:bg-blue-500/20 hover:text-blue-300 transition" title="Edit">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => {if(confirm("Delete this blog post?")) onDelete(post.id);}} className="rounded-md p-1.5 text-white/50 hover:bg-red-500/20 hover:text-red-300 transition" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// UPGRADED SITE CONTENT MANAGEMENT (Portfolio & Case Studies)
// ─────────────────────────────────────────────────────────────

type ContentKind = "design" | "photography" | "art" | "learn" | "events" | "careers" | "it";

type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "datetime-local" | "select" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  helpText?: string;
  halfWidth?: boolean; // For grid layout
};

const CONTENT_KINDS: {
  id: ContentKind;
  label: string;
  icon: typeof LayoutGrid;
  description: string;
  fields: FieldDef[];
  imageField: string;
  titleField: string;
  metaFields?: string[];
}[] = [
  {
    id: "it", label: "IT Services / Software", icon: Globe, imageField: "cover_image", titleField: "title",
    description: "Manage IT portfolio, software development, CRM and SEO case studies.",
    metaFields: ["category", "client"],
    fields: [
      { name: "title", label: "Service / Project Title", required: true, placeholder: "e.g. Advanced CRM Development" },
      { name: "category", label: "Category", required: true, placeholder: "e.g. Web Dev, SEO, CRM", halfWidth: true },
      { name: "project_type", label: "Project Type", placeholder: "e.g. Client Project, Internal Tool", halfWidth: true },
      { name: "client", label: "Client Name", placeholder: "Leave empty if internal", halfWidth: true },
      { name: "project_url", label: "Live Project URL", type: "url", placeholder: "https://...", halfWidth: true },
      
      { name: "cover_image", label: "Cover Image URL", type: "url", required: true, helpText: "Main thumbnail for the grid" },
      { name: "gallery_images", label: "Gallery Images (Comma separated URLs)", type: "textarea", placeholder: "url1.jpg, url2.jpg...", helpText: "For detailed case study view" },
      
      { name: "summary", label: "Short Summary", type: "textarea", required: true, placeholder: "Brief description for the card view..." },
      { name: "description", label: "Full Case Study / Description", type: "textarea", placeholder: "Detailed explanation of the problem and solution..." },
      
      { name: "features", label: "Key Features (One per line)", type: "textarea", placeholder: "User Authentication\nReal-time Dashboard\nAPI Integration", halfWidth: true },
      { name: "tech_stack", label: "Technology Used (Comma separated)", placeholder: "React, Node.js, Supabase, Tailwind", halfWidth: true },
      
      { name: "results", label: "Results / Achievements", type: "textarea", placeholder: "Increased sales by 40%\nReduced load time by 2s", halfWidth: true },
      { name: "testimonial", label: "Client Testimonial", type: "textarea", placeholder: '"Sumirayan Design transformed our business..." - John Doe', halfWidth: true },
      
      { name: "icon", label: "Lucide Icon Name", placeholder: "e.g. Monitor, Code, Smartphone", defaultValue: "Monitor", halfWidth: true },
      { name: "sort_order", label: "Sort Order (Priority)", type: "number", defaultValue: "0", helpText: "Higher number = shows first", halfWidth: true },
    ],
  },
  {
    id: "design", label: "Design Portfolio", icon: Pencil, imageField: "cover_image", titleField: "title",
    description: "Brand identity, packaging, and graphic design projects.",
    metaFields: ["category", "client", "year"],
    fields: [
      { name: "title", label: "Project Title", required: true },
      { name: "category", label: "Category", required: true, placeholder: "Branding / Web / Editorial", halfWidth: true },
      { name: "client", label: "Client", halfWidth: true },
      { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "description", label: "Description / Case Study", type: "textarea" },
      { name: "year", label: "Year", type: "number", halfWidth: true },
      { name: "project_url", label: "Live Project URL", type: "url", halfWidth: true },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "photography", label: "Photography & Video", icon: LayoutGrid, imageField: "cover_image", titleField: "title",
    description: "Commercial shoots, TVCs, and aerial videography.",
    metaFields: ["location"],
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "cover_image", label: "Media URL (Image or .mp4 Video)", type: "url", required: true, helpText: "Supports direct video URLs like .mp4 from Cloudinary/Supabase" },
      { name: "location", label: "Location", halfWidth: true },
      { name: "captured_at", label: "Date Captured", type: "datetime-local", halfWidth: true },
      { name: "description", label: "Caption / Story", type: "textarea" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "art", label: "Art & Canvas", icon: LayoutGrid, imageField: "cover_image", titleField: "title",
    description: "Physical artworks, murals, and installations.",
    metaFields: ["medium", "year", "for_sale"],
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "cover_image", label: "Artwork image URL", type: "url", required: true },
      { name: "medium", label: "Medium", placeholder: "Oil on canvas", halfWidth: true },
      { name: "dimensions", label: "Dimensions", placeholder: "60 × 90 cm", halfWidth: true },
      { name: "year", label: "Year created", type: "number", halfWidth: true },
      { name: "price", label: "Price (₹)", type: "number", halfWidth: true },
      { name: "description", label: "Artwork Story / Description", type: "textarea" },
      { name: "for_sale", label: "Available for sale", type: "checkbox" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  // Simple configurations for the rest to keep code clean
  {
    id: "learn", label: "Courses", icon: LayoutGrid, imageField: "cover_image", titleField: "title", description: "Manage learning modules.",
    fields: [
      { name: "title", label: "Course title", required: true }, { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true }, { name: "level", label: "Level", type: "select", options: ["beginner", "intermediate", "advanced"], defaultValue: "beginner" },
      { name: "duration", label: "Duration", placeholder: "6 weeks" }, { name: "enroll_url", label: "Enroll URL", type: "url" }, { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "events", label: "Events", icon: LayoutGrid, imageField: "cover_image", titleField: "title", description: "Manage agency events and exhibitions.",
    fields: [
      { name: "title", label: "Event title", required: true }, { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "description", label: "Description", type: "textarea" }, { name: "starts_at", label: "Starts at", type: "datetime-local" },
      { name: "venue", label: "Venue" }, { name: "status", label: "Status", type: "select", options: ["upcoming", "past"], defaultValue: "upcoming" }, { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "careers", label: "Careers", icon: LayoutGrid, imageField: "", titleField: "title", description: "Manage job openings.",
    fields: [
      { name: "title", label: "Role title", required: true }, { name: "department", label: "Department" }, { name: "location", label: "Location", placeholder: "Remote / Mumbai" },
      { name: "employment_type", label: "Employment type", defaultValue: "Full-time" }, { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "apply_url", label: "Apply URL", type: "url" }, { name: "is_open", label: "Currently open", type: "checkbox", defaultValue: "true" }, { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
];

function ContentTab() {
  const [kind, setKind] = useState<ContentKind>("it");
  const def = CONTENT_KINDS.find((k) => k.id === kind)!;

  return (
    <div className="space-y-6">
      {/* Horizontal Scrollable Menu for Content Types */}
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar scroll-smooth">
        {CONTENT_KINDS.map((k) => (
          <button
            key={k.id}
            onClick={() => setKind(k.id)}
            className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition font-medium ${kind === k.id ? "bg-white text-black shadow-lg" : "text-white/60 hover:text-white hover:bg-white/10 bg-white/5 border border-white/5"}`}
          >
            <k.icon className={`w-4 h-4 ${kind === k.id ? "text-black" : "text-white/40"}`} />
            {k.label}
          </button>
        ))}
      </div>
      
      <div className="mb-4 pl-2 border-l-2 border-blue-500">
          <h3 className="text-white font-medium text-lg">{def.label} Manager</h3>
          <p className="text-white/50 text-sm">{def.description}</p>
      </div>

      <ContentKindPanel key={kind} def={def} />
    </div>
  );
}

const KIND_FNS: Record<ContentKind, { list: any; create: any; del: any }> = {
  design: { list: publicDesignItems, create: adminCreateDesign, del: adminDeleteDesign },
  photography: { list: publicPhotographyItems, create: adminCreatePhoto, del: adminDeletePhoto },
  art: { list: publicArtItems, create: adminCreateArt, del: adminDeleteArt },
  learn: { list: publicLearnCourses, create: adminCreateLearn, del: adminDeleteLearn },
  events: { list: publicEvents, create: adminCreateEvent, del: adminDeleteEvent },
  careers: { list: publicCareers, create: adminCreateCareer, del: adminDeleteCareer },
  it: { list: publicItServices, create: adminCreateItService, del: adminDeleteItService },
};

function ContentKindPanel({ def }: { def: typeof CONTENT_KINDS[number] }) {
  const fns = KIND_FNS[def.id];
  const listFn = useServerFn(fns.list);
  const createFn = useServerFn(fns.create);
  const deleteFn = useServerFn(fns.del);
  const qc = useQueryClient();
  const queryKey = ["admin", "content", def.id];

  const { data = [], isLoading } = useQuery({ queryKey, queryFn: () => listFn() });
  const [editingItem, setEditingItem] = useState<any>(null);

  const createMut = useMutation({
    mutationFn: (input: Record<string, unknown>) => createFn({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
    onError: (e) => alert(e instanceof Error ? e.message : "Failed to save item."),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  });

  const getDefault = (f: FieldDef) => {
    if (!editingItem) return f.defaultValue;
    const val = editingItem[f.name];
    if (val == null) return "";
    if (f.type === "datetime-local") return new Date(val).toISOString().slice(0, 16);
    if (f.name === "features" && Array.isArray(val)) return val.join("\n");
    return val;
  };

  const isVideoUrl = (url: string) => url && url.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/i) !== null;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_400px] items-start">
      {/* Content Form */}
      <form
        key={editingItem?.id || 'new_content'}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const payload: Record<string, unknown> = {};
          
          for (const f of def.fields) {
            const raw = fd.get(f.name);
            if (f.type === "checkbox") {
              payload[f.name] = fd.get(f.name) === "on";
              continue;
            }
            const v = raw == null ? "" : String(raw).trim();
            if (v === "") {
              if (f.required) return alert(`${f.label} is required.`);
              continue;
            }
            // Parse multi-line text into array for features
            if (f.name === "features") {
              payload[f.name] = v.split("\n").map((s) => s.trim()).filter(Boolean);
            } else if (f.type === "number") {
              payload[f.name] = Number(v);
            } else if (f.type === "datetime-local") {
              payload[f.name] = new Date(v).toISOString();
            } else {
              payload[f.name] = v;
            }
          }

          if (editingItem) {
            deleteMut.mutate(editingItem.id, {
              onSuccess: () => {
                createMut.mutate(payload, {
                  onSuccess: () => {
                    setEditingItem(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                });
              }
            });
          } else {
            createMut.mutate(payload, {
              onSuccess: () => (e.target as HTMLFormElement).reset(),
            });
          }
        }}
        className="glass-strong rounded-2xl p-4 md:p-6 space-y-6 relative"
      >
        <div id="content-form-top" className="absolute -top-20" />
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-xl flex items-center gap-2">
            {editingItem ? <Pencil className="w-5 h-5 text-[#1f5fb7]" /> : <Plus className="w-5 h-5 text-[#1f5fb7]" />} 
            {editingItem ? `Edit ${def.label} Item` : `Add New ${def.label} Item`}
            </h2>
            {editingItem && (
                <button type="button" onClick={() => setEditingItem(null)} className="text-xs text-white/50 hover:text-white bg-white/5 px-3 py-1 rounded-full">Cancel Edit</button>
            )}
        </div>
        
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
            {def.fields.map((f) => {
            const cls = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-blue-500/50 outline-none transition";
            const wrapperCls = f.halfWidth ? "sm:col-span-1" : "sm:col-span-2";
            
            if (f.type === "textarea") {
                return (
                <label key={f.name} className={`block ${wrapperCls}`}>
                    <span className="text-xs font-medium text-white/70 mb-1 block">{f.label}{f.required && " *"}</span>
                    <textarea name={f.name} required={f.required} placeholder={f.placeholder} defaultValue={getDefault(f)} rows={f.name==='description'? 6 : 3} className={`${cls} resize-none`} />
                    {f.helpText && <span className="text-[10px] text-white/40 mt-1 block">{f.helpText}</span>}
                </label>
                );
            }
            if (f.type === "select") {
                return (
                <label key={f.name} className={`block ${wrapperCls}`}>
                    <span className="text-xs font-medium text-white/70 mb-1 block">{f.label}</span>
                    <select name={f.name} defaultValue={getDefault(f)} className={`${cls} text-white/90`}>
                    {f.options?.map((o) => <option key={o} value={o} className="bg-[#0a0f1e]">{o}</option>)}
                    </select>
                </label>
                );
            }
            if (f.type === "checkbox") {
                return (
                <label key={f.name} className={`flex items-center gap-3 text-sm font-medium text-white/80 p-3 rounded-lg border border-white/5 bg-white/[0.02] ${wrapperCls}`}>
                    <input type="checkbox" name={f.name} defaultChecked={editingItem ? !!editingItem[f.name] : f.defaultValue === "true"} className="w-4 h-4 accent-blue-500" />
                    {f.label}
                </label>
                );
            }
            return (
                <label key={f.name} className={`block ${wrapperCls}`}>
                <span className="text-xs font-medium text-white/70 mb-1 block">{f.label}{f.required && " *"}</span>
                <input
                    name={f.name} type={f.type ?? "text"} required={f.required} placeholder={f.placeholder} defaultValue={getDefault(f)}
                    className={cls}
                />
                {f.helpText && <span className="text-[10px] text-white/40 mt-1 block">{f.helpText}</span>}
                </label>
            );
            })}
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            disabled={createMut.isPending || deleteMut.isPending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-medium text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
            style={{ background: "var(--gradient-brand)" }}
          >
            {createMut.isPending || deleteMut.isPending ? "Saving…" : (editingItem ? "Update Item" : `Save to ${def.label}`)}
          </button>
        </div>
      </form>

      {/* Content List Sidebar */}
      <div className="glass-strong rounded-2xl p-4 md:p-6 flex flex-col h-[800px]">
        <h2 className="font-display text-xl mb-4 flex items-center gap-2 shrink-0">
            Portfolio Items
            <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full">{data.length}</span>
        </h2>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {isLoading && <p className="text-white/50 text-sm text-center py-10">Loading portfolio...</p>}
          {!isLoading && data.length === 0 && (
             <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
                 <p className="text-white/50 text-sm">No items yet in {def.label}.</p>
             </div>
          )}
          
          {data.map((row: any) => (
            <article key={row.id} className={`group rounded-xl border ${editingItem?.id === row.id ? "border-blue-500/50 bg-blue-500/5" : "border-white/10 bg-white/[0.03]"} p-3 hover:bg-white/[0.06] transition flex flex-col gap-3`}>
              
              {def.imageField && row[def.imageField] && (
                <div className="aspect-video w-full rounded-lg overflow-hidden shrink-0 relative bg-black/50">
                    {isVideoUrl(row[def.imageField]) ? (
                        /* Protected Video */
                        <video src={row[def.imageField]} autoPlay loop muted playsInline controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} className="w-full h-full object-cover" />
                    ) : (
                        /* Protected Image */
                        <img src={row[def.imageField]} alt={row[def.titleField]} loading="lazy" onContextMenu={(e) => e.preventDefault()} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                </div>
              )}

              <div className="flex-1 min-w-0 flex flex-col">
                <div className="text-[10px] uppercase tracking-widest text-[#7fb0ff] mb-1 truncate">
                    {(def.metaFields ?? []).map((m) => row[m]).filter((v) => v !== null && v !== undefined && v !== "").join(" · ")}
                </div>
                <h3 className="font-display text-base font-semibold leading-snug line-clamp-2">{row[def.titleField]}</h3>
                
                {row.summary && <p className="mt-2 line-clamp-2 text-xs text-white/50">{row.summary}</p>}
                
                <div className="mt-auto pt-3 mt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">Order: {row.sort_order ?? 0}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => { setEditingItem(row); document.getElementById("content-form-top")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="rounded-md p-1.5 text-white/50 hover:bg-blue-500/20 hover:text-blue-300 transition" title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => { if (confirm("Delete this portfolio item?")) deleteMut.mutate(row.id); }}
                      className="rounded-md p-1.5 text-white/50 hover:bg-red-500/20 hover:text-red-300 transition" title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
