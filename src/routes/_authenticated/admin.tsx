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
  FileText, LayoutGrid,
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
  
  // FIX: Added assigned_to to the update mutation payload so existing tasks can be assigned
  const statusMut = useMutation({
    mutationFn: (v: { id: string; status?: TaskStatus; remark?: string | null; expected_completion_at?: string | null; assigned_to?: string | null }) => updateStatus({ data: v }),
    onSuccess: invalidate,
  });

  const assignMut = useMutation({ mutationFn: (v: { user_id: string; role: Role }) => assignRole({ data: v }), onSuccess: invalidate });
  const removeRoleMut = useMutation({ mutationFn: (v: { user_id: string; role: Role }) => removeRole({ data: v }), onSuccess: invalidate });
  const delContactMut = useMutation({ mutationFn: (id: string) => delContact({ data: { id } }), onSuccess: invalidate });
  
  const createBlogMut = useMutation({
    mutationFn: (v: BlogInput) => createBlog({ data: v }),
    onSuccess: invalidate,
    onError: (error) => alert(error instanceof Error ? error.message : "Failed to publish blog."),
  });
  const deleteBlogMut = useMutation({ mutationFn: (id: string) => deleteBlog({ data: { id } }), onSuccess: invalidate });

  const tasks = data?.tasks ?? [];
  const members = data?.members ?? [];
  const roles = data?.roles ?? [];
  const contacts = data?.contacts ?? (data as any)?.messages ?? [];
  
  // FIX: Added a fallback for `data.posts` in case the backend uses a different key name
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
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="grid place-items-center h-12 px-3 rounded-xl bg-white">
          <img src={logoUrl} alt="Sumirayan Design" className="h-7 w-auto object-contain" />
        </div>
        <div>
          <div className="font-display text-lg">Sumirayan Design — Studio Operations</div>
          <div className="text-xs text-white/50">Manage everything happening across the agency.</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <button
            key={s.k}
            onClick={() => setTab(s.tab)}
            className="text-left glass-strong rounded-2xl p-6 hover:bg-white/[0.06] transition"
          >
            <s.icon className="w-5 h-5 text-[#1f5fb7]" />
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">{s.k}</p>
            <p className="mt-1 font-display text-4xl font-semibold text-gradient-brand">{isLoading ? "…" : s.v}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${tab === t.id ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {tab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-strong rounded-2xl p-6">
              <h2 className="font-display text-lg mb-4 flex items-center gap-2"><ListTodo className="w-5 h-5 text-[#1f5fb7]" /> Latest open tasks</h2>
              <ul className="space-y-2">
                {openTasks.slice(0, 6).map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2">
                    <div className="min-w-0">
                      <div className="text-sm truncate">{t.title}</div>
                      <div className="text-xs text-white/50">{memberName(t.assigned_to)} · {t.priority}</div>
                    </div>
                    <span className="text-xs text-white/60">{t.status}</span>
                  </li>
                ))}
                {openTasks.length === 0 && <p className="text-white/50 text-sm">All caught up.</p>}
              </ul>
            </div>
            <div className="glass-strong rounded-2xl p-6">
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
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-display text-xl mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-[#1f5fb7]" /> Client messages</h2>
            {contacts.length === 0 && <p className="text-white/50">No messages yet.</p>}
            <ul className="space-y-3">
              {contacts.map((c: any) => (
                <li key={c.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">{c.name} <span className="text-white/40 text-xs">· {c.email}</span></div>
                      {c.company && <div className="text-xs text-white/50">{c.company}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/40">{new Date(c.created_at).toLocaleString()}</span>
                      <button onClick={() => delContactMut.mutate(c.id)} className="text-white/40 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white/80 whitespace-pre-wrap">{c.message}</p>
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
          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-display text-xl mb-1 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#e63027]" /> Monthly performance</h2>
            <p className="text-xs text-white/50 mb-4">Since {perf?.monthStart ? new Date(perf.monthStart).toLocaleDateString() : "—"}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-white/50 text-xs uppercase tracking-wider">
                  <tr><th className="py-2 pr-4">Employee</th><th className="py-2 pr-4">Specialty</th><th className="py-2 pr-4">Completed</th><th className="py-2 pr-4">Open</th><th className="py-2 pr-4">Total</th><th className="py-2 pr-4 w-1/3">Score</th></tr>
                </thead>
                <tbody>
                  {(perf?.rows ?? []).map((r) => (
                    <tr key={r.id} className="border-t border-white/5">
                      <td className="py-2 pr-4">{r.name}</td>
                      <td className="py-2 pr-4 text-white/60">{r.specialty ?? "—"}</td>
                      <td className="py-2 pr-4 text-emerald-300">{r.completedThisMonth}</td>
                      <td className="py-2 pr-4 text-amber-300">{r.open}</td>
                      <td className="py-2 pr-4 text-white/70">{r.total}</td>
                      <td className="py-2 pr-4">
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

type Task = { id: string; title: string; description?: string | null; assigned_to: string | null; priority: string; status: string; due_at: string | null; completed_at?: string | null; created_at: string; remark?: string | null; expected_completion_at?: string | null };
type Member = { id: string; full_name: string | null; specialty?: string | null };
type BlogInput = { title: string; category: string; excerpt: string; content: string; image_url: string; author_name: string; status: "draft" | "published" };
type BlogPost = BlogInput & { id: string; slug: string; published_at?: string; created_at: string };

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
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl">Assign new task</h2>
          <button onClick={() => setOpen((v) => !v)} className="text-xs text-white/60">{open ? "Hide" : "Show"}</button>
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
            className="grid md:grid-cols-2 gap-3"
          >
            <input name="title" required placeholder="Task title" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm md:col-span-2" />
            <textarea name="description" placeholder="Description" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm md:col-span-2" rows={2} />
            <select name="assigned_to" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
              <option value="">Unassigned</option>
              {members.map((m) => <option key={m.id} value={m.id}>{m.full_name ?? m.id.slice(0, 6)}</option>)}
            </select>
            <select name="priority" defaultValue="medium" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </select>
            <input name="due_at" type="datetime-local" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm md:col-span-2" />
            <div className="md:col-span-2 flex justify-end">
              <button disabled={creating} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white" style={{ background: "var(--gradient-brand)" }}>
                <Plus className="w-4 h-4" /> {creating ? "Creating…" : "Create & assign"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="glass-strong rounded-2xl p-4 md:p-5 flex flex-wrap items-center gap-3">
        <input
          value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks…" className="flex-1 min-w-[180px] rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
          <option value="all">All assignees</option>
          <option value="none">Unassigned</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.full_name ?? "Unnamed"}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "created" | "due" | "priority")} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
          <option value="created">Newest first</option>
          <option value="due">By due date</option>
          <option value="priority">By priority</option>
        </select>
      </div>

      <TaskTable title={`Active tasks (${activeRows.length})`} rows={activeRows} members={members} memberName={memberName} onDelete={onDelete} onUpdate={onUpdate} />

      <div className="glass-strong rounded-2xl p-6">
        <button onClick={() => setShowOld((v) => !v)} className="flex w-full items-center justify-between">
          <h2 className="font-display text-xl flex items-center gap-2"><Archive className="w-5 h-5 text-white/60" /> Old / completed tasks ({oldRows.length})</h2>
          <span className="text-xs text-white/60">{showOld ? "Hide" : "Show"}</span>
        </button>
        {showOld && <div className="mt-4"><TaskTable rows={oldRows} members={members} memberName={memberName} onDelete={onDelete} onUpdate={onUpdate} compact /></div>}
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-white/50 text-xs uppercase tracking-wider">
          <tr>
            <th className="py-2 pr-4">Task</th>
            <th className="py-2 pr-4">Assignee</th>
            <th className="py-2 pr-4">Priority</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Remark</th>
            <th className="py-2 pr-4">{compact ? "Completed" : "Due / ETA"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={7} className="py-6 text-white/50 text-center">No tasks.</td></tr>}
          {rows.map((t) => {
            const overdue = t.due_at && new Date(t.due_at) < new Date() && !(t.status === "completed" || t.status === "done");
            return (
              <tr key={t.id} className="border-t border-white/5 align-top">
                <td className="py-3 pr-4 min-w-[180px]">
                  <div className="font-medium">{t.title}</div>
                  {t.description && <div className="text-[11px] text-white/50 mt-0.5 line-clamp-2 max-w-xs">{t.description}</div>}
                </td>
                
                {/* FIX: Replaced read-only member name with a functional assignment dropdown */}
                <td className="py-3 pr-4 text-white/70">
                  <select
                    value={t.assigned_to || ""}
                    onChange={(e) => onUpdate(t.id, { assigned_to: e.target.value || null })}
                    className="w-[120px] bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-white hover:bg-white/5"
                  >
                    <option value="" className="bg-[#0a0f1e]">Unassigned</option>
                    {members.map(m => <option key={m.id} value={m.id} className="bg-[#0a0f1e]">{m.full_name ?? m.id.slice(0, 6)}</option>)}
                  </select>
                </td>

                <td className="py-3 pr-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${t.priority === "high" ? "bg-red-500/20 text-red-200" : t.priority === "medium" ? "bg-amber-500/20 text-amber-200" : "bg-white/10 text-white/70"}`}>{t.priority}</span>
                </td>
                <td className="py-3 pr-4">
                  <select
                    value={t.status}
                    onChange={(e) => onUpdate(t.id, { status: e.target.value as TaskStatus })}
                    className={`rounded-full border border-white/10 px-2 py-1 text-xs ${STATUS_STYLE[t.status] ?? "bg-white/10"}`}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0a0f1e]">{s.replace("_", " ")}</option>)}
                  </select>
                </td>
                <td className="py-3 pr-4 max-w-[220px]">
                  <input
                    defaultValue={t.remark ?? ""}
                    onBlur={(e) => { if (e.target.value !== (t.remark ?? "")) onUpdate(t.id, { remark: e.target.value || null }); }}
                    placeholder="Remark / reason"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-xs"
                  />
                </td>
                <td className="py-3 pr-4 text-white/60 text-xs whitespace-nowrap">
                  {compact ? (t.completed_at ? new Date(t.completed_at).toLocaleDateString() : "—") : (
                    <div className="flex flex-col gap-0.5">
                      <span className={overdue ? "text-amber-300" : ""}>Due: {t.due_at ? new Date(t.due_at).toLocaleDateString() : "—"}</span>
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
                        className="rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-xs"
                        title="Expected completion"
                      />
                    </div>
                  )}
                </td>
                <td className="py-3 pr-4 text-right">
                  <button onClick={() => onDelete(t.id)} className="text-white/50 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
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
    <div className="glass-strong rounded-2xl p-6">
      <h2 className="font-display text-xl mb-4">{title}</h2>
      {content}
    </div>
  );
}

function BlogTab({
  posts, creating, onCreate, onDelete,
}: {
  posts: BlogPost[];
  creating: boolean;
  onCreate: (input: BlogInput) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          onCreate({
            title: String(fd.get("title") || ""),
            category: String(fd.get("category") || ""),
            excerpt: String(fd.get("excerpt") || ""),
            content: String(fd.get("content") || ""),
            image_url: String(fd.get("image_url") || ""),
            author_name: String(fd.get("author_name") || "Sumirayan Design"),
            status: (fd.get("status") as "draft" | "published") || "published",
          });
          e.currentTarget.reset();
        }}
        className="glass-strong rounded-2xl p-6 space-y-3"
      >
        <h2 className="font-display text-xl flex items-center gap-2"><FileText className="w-5 h-5 text-[#1f5fb7]" /> Add blog post</h2>
        <input name="title" required maxLength={180} placeholder="Blog title" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="category" required maxLength={80} placeholder="Category" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
          <input name="author_name" defaultValue="Sumirayan Design" required maxLength={120} placeholder="Author" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
        </div>
        <input name="image_url" required type="url" placeholder="Image URL" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
        <textarea name="excerpt" required maxLength={400} rows={3} placeholder="Short professional excerpt" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
        <textarea name="content" required maxLength={8000} rows={7} placeholder="Full blog content" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <select name="status" defaultValue="published" className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <button disabled={creating} className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-60" style={{ background: "var(--gradient-brand)" }}>
            <Plus className="w-4 h-4" /> {creating ? "Publishing…" : "Publish blog"}
          </button>
        </div>
      </form>

      <div className="glass-strong rounded-2xl p-6">
        <h2 className="font-display text-xl mb-4">Website blog control</h2>
        <div className="space-y-3 max-h-[760px] overflow-auto pr-1">
          {posts.length === 0 && <p className="text-white/50 text-sm">No blog posts yet.</p>}
          {posts.map((post) => (
            <article key={post.id} className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:grid-cols-[160px_1fr] hover:bg-white/[0.07] transition">
              <img src={post.image_url} alt={post.title} className="h-32 w-full rounded-xl object-cover sm:h-full" loading="lazy" />
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#7fb0ff]">{post.category} · {post.status}</div>
                    <h3 className="mt-1 font-display text-lg font-semibold">{post.title}</h3>
                  </div>
                  <button onClick={() => onDelete(post.id)} className="rounded-full p-2 text-white/45 hover:bg-red-500/15 hover:text-red-200" aria-label={`Delete ${post.title}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-white/65">{post.excerpt}</p>
                {/* FIX: Added safe fallback to created_at so un-published drafts don't crash the renderer with 'Invalid Date' */}
                <div className="mt-3 text-[11px] text-white/40">{post.author_name} · {new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString()}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <div className="glass-strong rounded-2xl p-6">
      <h2 className="font-display text-xl mb-1 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#1f5fb7]" /> Team & roles</h2>
      <p className="text-xs text-white/50 mb-4">Assign or remove roles. A member can hold multiple roles.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => {
          const r = userRoles(m.id);
          return (
            <div key={m.id} className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <div className="font-medium">{m.full_name ?? "Unnamed"}</div>
              <div className="text-xs text-white/50 mt-0.5">{m.specialty ?? "No specialty"}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.length === 0 && <span className="text-xs text-white/40">No roles</span>}
                {r.map((role) => (
                  <button key={role} onClick={() => onRemove(m.id, role as Role)}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-200">
                    {role} ×
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {ROLE_OPTIONS.filter((opt) => !r.includes(opt)).map((opt) => (
                  <button key={opt} onClick={() => onAssign(m.id, opt)}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-white/20 text-white/80 hover:bg-white/10">
                    + {opt}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        {members.length === 0 && <p className="text-white/50">No team members yet.</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Site content management (Design / Photography / Art / Learn / Events / Careers / IT Services)
// ─────────────────────────────────────────────────────────────

type ContentKind =
  | "design" | "photography" | "art" | "learn" | "events" | "careers" | "it";

type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "datetime-local" | "select" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
};

const CONTENT_KINDS: {
  id: ContentKind;
  label: string;
  fields: FieldDef[];
  imageField: string;
  titleField: string;
  metaFields?: string[];
}[] = [
  {
    id: "design", label: "Design", imageField: "cover_image", titleField: "title",
    metaFields: ["category", "client", "year"],
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "category", label: "Category", required: true, placeholder: "Branding / Web / Editorial" },
      { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "year", label: "Year", type: "number" },
      { name: "client", label: "Client" },
      { name: "project_url", label: "Project URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "photography", label: "Photography", imageField: "cover_image", titleField: "title",
    metaFields: ["location"],
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "location", label: "Location" },
      { name: "description", label: "Caption", type: "textarea" },
      { name: "captured_at", label: "Captured at", type: "datetime-local" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "art", label: "Art & Canvas", imageField: "cover_image", titleField: "title",
    metaFields: ["medium", "year", "for_sale"],
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "medium", label: "Medium", placeholder: "Oil on canvas" },
      { name: "dimensions", label: "Dimensions", placeholder: "60 × 90 cm" },
      { name: "year", label: "Year", type: "number" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "for_sale", label: "Available for sale", type: "checkbox" },
      { name: "price", label: "Price (₹)", type: "number" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "learn", label: "Learn / Courses", imageField: "cover_image", titleField: "title",
    metaFields: ["level", "duration", "instructor"],
    fields: [
      { name: "title", label: "Course title", required: true },
      { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "content", label: "Full content", type: "textarea" },
      { name: "level", label: "Level", type: "select", options: ["beginner", "intermediate", "advanced"], defaultValue: "beginner" },
      { name: "duration", label: "Duration", placeholder: "6 weeks" },
      { name: "instructor", label: "Instructor" },
      { name: "enroll_url", label: "Enroll URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "events", label: "Events", imageField: "cover_image", titleField: "title",
    metaFields: ["starts_at", "venue", "city", "status"],
    fields: [
      { name: "title", label: "Event title", required: true },
      { name: "cover_image", label: "Cover image URL", type: "url", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "starts_at", label: "Starts at", type: "datetime-local" },
      { name: "ends_at", label: "Ends at", type: "datetime-local" },
      { name: "venue", label: "Venue" },
      { name: "city", label: "City" },
      { name: "rsvp_url", label: "RSVP URL", type: "url" },
      { name: "status", label: "Status", type: "select", options: ["upcoming", "past"], defaultValue: "upcoming" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "careers", label: "Careers", imageField: "", titleField: "title",
    metaFields: ["department", "location", "employment_type", "is_open"],
    fields: [
      { name: "title", label: "Role title", required: true },
      { name: "department", label: "Department" },
      { name: "location", label: "Location", placeholder: "Remote / Mumbai" },
      { name: "employment_type", label: "Employment type", defaultValue: "Full-time" },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "apply_url", label: "Apply URL", type: "url" },
      { name: "is_open", label: "Currently open", type: "checkbox", defaultValue: "true" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
  {
    id: "it", label: "IT Services", imageField: "cover_image", titleField: "title",
    metaFields: ["icon"],
    fields: [
      { name: "title", label: "Service title", required: true },
      { name: "icon", label: "Lucide icon name", placeholder: "Sparkles", defaultValue: "Sparkles" },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "features", label: "Features (one per line)", type: "textarea", placeholder: "Feature 1\nFeature 2" },
      { name: "cover_image", label: "Cover image URL", type: "url" },
      { name: "sort_order", label: "Sort order", type: "number", defaultValue: "0" },
    ],
  },
];

function ContentTab() {
  const [kind, setKind] = useState<ContentKind>("design");
  const def = CONTENT_KINDS.find((k) => k.id === kind)!;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {CONTENT_KINDS.map((k) => (
          <button
            key={k.id}
            onClick={() => setKind(k.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${kind === k.id ? "bg-white/10 text-white border border-white/20" : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"}`}
          >
            {k.label}
          </button>
        ))}
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

  const createMut = useMutation({
    mutationFn: (input: Record<string, unknown>) => createFn({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
    onError: (e) => alert(e instanceof Error ? e.message : "Failed to create item."),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
      <form
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
          createMut.mutate(payload, {
            onSuccess: () => (e.target as HTMLFormElement).reset(),
          });
        }}
        className="glass-strong rounded-2xl p-6 space-y-3"
      >
        <h2 className="font-display text-xl flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#1f5fb7]" /> Add {def.label}
        </h2>
        {def.fields.map((f) => {
          const cls = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm";
          if (f.type === "textarea") {
            return (
              <label key={f.name} className="block">
                <span className="text-xs text-white/60">{f.label}{f.required && " *"}</span>
                <textarea name={f.name} required={f.required} placeholder={f.placeholder} rows={3} className={`mt-1 ${cls}`} />
              </label>
            );
          }
          if (f.type === "select") {
            return (
              <label key={f.name} className="block">
                <span className="text-xs text-white/60">{f.label}</span>
                <select name={f.name} defaultValue={f.defaultValue} className={`mt-1 ${cls}`}>
                  {f.options?.map((o) => <option key={o} value={o} className="bg-[#0a0f1e]">{o}</option>)}
                </select>
              </label>
            );
          }
          if (f.type === "checkbox") {
            return (
              <label key={f.name} className="flex items-center gap-2 text-sm text-white/80">
                <input type="checkbox" name={f.name} defaultChecked={f.defaultValue === "true"} />
                {f.label}
              </label>
            );
          }
          return (
            <label key={f.name} className="block">
              <span className="text-xs text-white/60">{f.label}{f.required && " *"}</span>
              <input
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                defaultValue={f.defaultValue}
                className={`mt-1 ${cls}`}
              />
            </label>
          );
        })}
        <div className="flex justify-end pt-2">
          <button
            disabled={createMut.isPending}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
            style={{ background: "var(--gradient-brand)" }}
          >
            <Plus className="w-4 h-4" /> {createMut.isPending ? "Saving…" : `Add to ${def.label}`}
          </button>
        </div>
      </form>

      <div className="glass-strong rounded-2xl p-6">
        <h2 className="font-display text-xl mb-4">Existing {def.label.toLowerCase()} ({data.length})</h2>
        {isLoading && <p className="text-white/50 text-sm">Loading…</p>}
        {!isLoading && data.length === 0 && <p className="text-white/50 text-sm">Nothing yet — add your first item.</p>}
        <div className="space-y-3 max-h-[760px] overflow-auto pr-1">
          {data.map((row: any) => (
            <article key={row.id} className={`group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 ${def.imageField ? "sm:grid-cols-[140px_1fr]" : ""} hover:bg-white/[0.07] transition`}>
              {def.imageField && row[def.imageField] && (
                <img src={row[def.imageField]} alt={row[def.titleField]} className="h-28 w-full rounded-xl object-cover sm:h-full" loading="lazy" />
              )}
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold truncate">{row[def.titleField]}</h3>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-[#7fb0ff] truncate">
                      {(def.metaFields ?? []).map((m) => row[m]).filter((v) => v !== null && v !== undefined && v !== "").join(" · ")}
                    </div>
                  </div>
                  <button
                    onClick={() => { if (confirm("Delete this item?")) deleteMut.mutate(row.id); }}
                    className="rounded-full p-2 text-white/45 hover:bg-red-500/15 hover:text-red-200"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {row.summary && <p className="mt-2 line-clamp-2 text-sm text-white/65">{row.summary}</p>}
                {row.description && !row.summary && <p className="mt-2 line-clamp-2 text-sm text-white/65">{row.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
