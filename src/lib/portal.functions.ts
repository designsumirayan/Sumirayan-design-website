import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `post-${Date.now()}`;

// ─── Admin: overview ────────────────────────────────────────────────────────
export const adminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const [tasks, projects, members, roles, contacts, blogs] = await Promise.all([
      supabase.from("tasks").select("id,status,priority,due_at,assigned_to,title,description,created_at,completed_at,remark,expected_completion_at,project_id").order("created_at", { ascending: false }),
      supabase.from("projects").select("id,name,status,due_date,client_id"),
      supabase.from("profiles").select("id,full_name,specialty,phone"),
      supabase.from("user_roles").select("user_id,role"),
      supabase.from("contact_messages").select("id,name,email,company,message,created_at").order("created_at", { ascending: false }).limit(100),
      supabase.from("blog_posts").select("id,title,slug,category,excerpt,content,image_url,author_name,status,published_at,created_at").order("created_at", { ascending: false }),
    ]);
    const error = tasks.error ?? projects.error ?? members.error ?? roles.error ?? contacts.error ?? blogs.error;
    if (error) throw new Error(error.message);
    return {
      tasks: tasks.data ?? [],
      projects: projects.data ?? [],
      members: members.data ?? [],
      roles: roles.data ?? [],
      contacts: contacts.data ?? [],
      blogs: blogs.data ?? [],
    };
  });

// ─── Admin: create task ─────────────────────────────────────────────────────
const createTaskSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().max(2000).optional().nullable(),
  project_id: z.string().uuid().optional().nullable(),
  assigned_to: z.string().uuid().optional().nullable(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  due_at: z.string().optional().nullable(),
});

export const adminCreateTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => createTaskSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (data.assigned_to) {
      await supabase.from("user_roles").upsert({ user_id: data.assigned_to, role: "employee" }, { onConflict: "user_id,role" });
    }
    const { data: row, error } = await supabase.from("tasks").insert({
      title: data.title,
      description: data.description ?? null,
      project_id: data.project_id ?? null,
      assigned_to: data.assigned_to ?? null,
      priority: data.priority,
      due_at: data.due_at ?? null,
      created_by: userId,
      status: "pending",
    }).select().single();
    if (error) throw new Error(error.message);
    if (data.assigned_to) {
      await supabase.from("notifications").insert({
        user_id: data.assigned_to,
        title: "New task assigned",
        body: data.title,
        link: "/employee",
      });
    }
    return row;
  });

// ─── Admin: delete task ─────────────────────────────────────────────────────
export const adminDeleteTask = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("tasks").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─── Admin: update any task (status, remark, expected completion) ───────────
const taskStatusEnum = z.enum(["pending", "working", "in_progress", "done", "completed", "delayed"]);

export const adminUpdateTaskStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    id: z.string().uuid(),
    status: taskStatusEnum.optional(),
    remark: z.string().max(2000).optional().nullable(),
    expected_completion_at: z.string().optional().nullable(),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const patch: { status?: typeof data.status; remark?: string | null; expected_completion_at?: string | null } = {};
    if (data.status) patch.status = data.status;
    if (data.remark !== undefined) patch.remark = data.remark;
    if (data.expected_completion_at !== undefined) patch.expected_completion_at = data.expected_completion_at || null;
    const { error } = await context.supabase.from("tasks").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─── Admin: assign / remove role ────────────────────────────────────────────
const roleEnum = z.enum(["admin", "employee", "client"]);

export const adminAssignRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid(), role: roleEnum }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("user_roles")
      .upsert({ user_id: data.user_id, role: data.role }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    await context.supabase.from("notifications").insert({
      user_id: data.user_id,
      title: "Role updated",
      body: `You were granted the ${data.role} role.`,
      link: "/dashboard",
    });
    return { ok: true };
  });

export const adminRemoveRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ user_id: z.string().uuid(), role: roleEnum }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("user_roles").delete()
      .eq("user_id", data.user_id).eq("role", data.role);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─── Admin: monthly performance per employee ────────────────────────────────
export const adminMonthlyPerformance = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [{ data: members }, { data: tasks }] = await Promise.all([
      supabase.from("profiles").select("id,full_name,specialty"),
      supabase.from("tasks").select("id,assigned_to,status,completed_at,created_at,priority"),
    ]);

    const rows = (members ?? []).map((m) => {
      const mine = (tasks ?? []).filter((t) => t.assigned_to === m.id);
      const completedThisMonth = mine.filter(
        (t) => (t.status === "completed" || t.status === "done") && t.completed_at && new Date(t.completed_at) >= monthStart,
      );
      const open = mine.filter((t) => t.status !== "completed" && t.status !== "done");
      const total = mine.length;
      const score = total === 0 ? 0 : Math.round((completedThisMonth.length / Math.max(total, 1)) * 100);
      return {
        id: m.id,
        name: m.full_name ?? "Unnamed",
        specialty: m.specialty,
        total,
        open: open.length,
        completedThisMonth: completedThisMonth.length,
        score,
      };
    }).sort((a, b) => b.completedThisMonth - a.completedThisMonth);

    return { monthStart: monthStart.toISOString(), rows };
  });

// ─── Admin: delete contact message ──────────────────────────────────────────
export const adminDeleteContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─── Blog: public reads + admin control ─────────────────────────────────────
const blogSchema = z.object({
  title: z.string().trim().min(2).max(180),
  category: z.string().trim().min(2).max(80),
  excerpt: z.string().trim().min(10).max(400),
  content: z.string().trim().min(20).max(8000),
  image_url: z.string().url().max(1000),
  author_name: z.string().trim().min(2).max(120).default("Sumirayan Design"),
  status: z.enum(["draft", "published"]).default("published"),
});

export const publicBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const supabasePublic = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
  const { data, error } = await supabasePublic
    .from("blog_posts")
    .select("id,title,slug,category,excerpt,content,image_url,author_name,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const adminCreateBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => blogSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("blog_posts")
      .insert({ ...data, slug: `${toSlug(data.title)}-${Date.now()}`, created_by: context.userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─── Employee: my tasks ─────────────────────────────────────────────────────
export const myTasks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("tasks")
      .select("id,title,description,status,priority,due_at,project_id,created_at,completed_at,remark,expected_completion_at")
      .eq("assigned_to", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

// ─── Employee: update status + remark + expected date ───────────────────────
export const updateTaskStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(),
      status: taskStatusEnum.optional(),
      remark: z.string().max(2000).optional().nullable(),
      expected_completion_at: z.string().optional().nullable(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const patch: { status?: typeof data.status; remark?: string | null; expected_completion_at?: string | null } = {};
    if (data.status) patch.status = data.status;
    if (data.remark !== undefined) patch.remark = data.remark;
    if (data.expected_completion_at !== undefined) patch.expected_completion_at = data.expected_completion_at || null;
    const { error } = await supabase
      .from("tasks")
      .update(patch)
      .eq("id", data.id)
      .eq("assigned_to", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─── Notifications ──────────────────────────────────────────────────────────
export const myNotifications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    return data ?? [];
  });

// ─── Public contact form ────────────────────────────────────────────────────
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({
      name: z.string().min(1).max(120),
      email: z.string().email().max(200),
      company: z.string().max(200).optional().nullable(),
      message: z.string().min(5).max(2000),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
