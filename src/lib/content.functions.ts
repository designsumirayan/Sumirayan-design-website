import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const serverPublic = () =>
  createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

async function assertAdmin(ctx: { supabase: ReturnType<typeof serverPublic>; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", { _user_id: ctx.userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

// ── DESIGN ─────────────────────────────────────────────────────────────
export const publicDesignItems = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await serverPublic().from("design_items").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const designSchema = z.object({
  title: z.string().min(2).max(180),
  category: z.string().min(2).max(80),
  cover_image: z.string().url().max(1000),
  description: z.string().max(2000).optional().nullable(),
  year: z.coerce.number().int().optional().nullable(),
  client: z.string().max(160).optional().nullable(),
  project_url: z.string().url().max(1000).optional().nullable(),
  sort_order: z.coerce.number().int().default(0),
});

export const adminCreateDesign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => designSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error, data: row } = await context.supabase.from("design_items").insert({ ...data, created_by: context.userId }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteDesign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("design_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── PHOTOGRAPHY ────────────────────────────────────────────────────────
export const publicPhotographyItems = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await serverPublic().from("photography_items").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const photoSchema = z.object({
  title: z.string().min(2).max(180),
  location: z.string().max(160).optional().nullable(),
  cover_image: z.string().url().max(1000),
  description: z.string().max(2000).optional().nullable(),
  captured_at: z.string().optional().nullable(),
  sort_order: z.coerce.number().int().default(0),
});

export const adminCreatePhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => photoSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error, data: row } = await context.supabase.from("photography_items").insert({ ...data, captured_at: data.captured_at || null, created_by: context.userId }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeletePhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("photography_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── ART ───────────────────────────────────────────────────────────────
export const publicArtItems = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await serverPublic().from("art_items").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const artSchema = z.object({
  title: z.string().min(2).max(180),
  medium: z.string().max(160).optional().nullable(),
  cover_image: z.string().url().max(1000),
  description: z.string().max(2000).optional().nullable(),
  dimensions: z.string().max(120).optional().nullable(),
  year: z.coerce.number().int().optional().nullable(),
  for_sale: z.coerce.boolean().default(false),
  price: z.coerce.number().optional().nullable(),
  sort_order: z.coerce.number().int().default(0),
});

export const adminCreateArt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => artSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error, data: row } = await context.supabase.from("art_items").insert({ ...data, created_by: context.userId }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteArt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("art_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── LEARN ─────────────────────────────────────────────────────────────
export const publicLearnCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await serverPublic().from("learn_courses").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const learnSchema = z.object({
  title: z.string().min(2).max(180),
  cover_image: z.string().url().max(1000),
  summary: z.string().min(5).max(600),
  content: z.string().max(8000).optional().nullable(),
  level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  duration: z.string().max(80).optional().nullable(),
  instructor: z.string().max(160).optional().nullable(),
  enroll_url: z.string().url().max(1000).optional().nullable(),
  sort_order: z.coerce.number().int().default(0),
});

export const adminCreateLearn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => learnSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error, data: row } = await context.supabase.from("learn_courses").insert({ ...data, created_by: context.userId }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteLearn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("learn_courses").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── EVENTS ────────────────────────────────────────────────────────────
export const publicEvents = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await serverPublic().from("event_items").select("*").order("sort_order").order("starts_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const eventSchema = z.object({
  title: z.string().min(2).max(180),
  cover_image: z.string().url().max(1000),
  description: z.string().max(2000).optional().nullable(),
  starts_at: z.string().optional().nullable(),
  ends_at: z.string().optional().nullable(),
  venue: z.string().max(160).optional().nullable(),
  city: z.string().max(120).optional().nullable(),
  rsvp_url: z.string().url().max(1000).optional().nullable(),
  status: z.enum(["upcoming", "past"]).default("upcoming"),
  sort_order: z.coerce.number().int().default(0),
});

export const adminCreateEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => eventSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error, data: row } = await context.supabase.from("event_items").insert({
      ...data,
      starts_at: data.starts_at || null,
      ends_at: data.ends_at || null,
      created_by: context.userId,
    }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("event_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── CAREERS ───────────────────────────────────────────────────────────
export const publicCareers = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await serverPublic().from("career_positions").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const careerSchema = z.object({
  title: z.string().min(2).max(180),
  department: z.string().max(120).optional().nullable(),
  location: z.string().max(120).optional().nullable(),
  employment_type: z.string().max(60).default("Full-time"),
  summary: z.string().min(5).max(600),
  description: z.string().max(6000).optional().nullable(),
  apply_url: z.string().url().max(1000).optional().nullable(),
  is_open: z.coerce.boolean().default(true),
  sort_order: z.coerce.number().int().default(0),
});

export const adminCreateCareer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => careerSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error, data: row } = await context.supabase.from("career_positions").insert({ ...data, created_by: context.userId }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteCareer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("career_positions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── IT SERVICES ───────────────────────────────────────────────────────
export const publicItServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await serverPublic().from("it_services").select("*").order("sort_order").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const itSchema = z.object({
  title: z.string().min(2).max(180),
  icon: z.string().max(60).default("Sparkles"),
  summary: z.string().min(5).max(600),
  description: z.string().max(4000).optional().nullable(),
  features: z.array(z.string().max(200)).default([]),
  cover_image: z.string().url().max(1000).optional().nullable(),
  sort_order: z.coerce.number().int().default(0),
});

export const adminCreateItService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => itSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error, data: row } = await context.supabase.from("it_services").insert({ ...data, created_by: context.userId }).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteItService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("it_services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
