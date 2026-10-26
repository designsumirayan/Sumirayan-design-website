import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { safeUrl, type Project, type Sector } from "./studio";
const tables = {
  design: "design_items",
  photography: "photography_items",
  art: "art_items",
  it: "it_services",
} as const;
function client() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
function normalise(row: Record<string, unknown>, sector: Sector): Project {
  const str = (key: string) => (typeof row[key] === "string" ? (row[key] as string) : "");
  return {
    id: str("id"),
    slug: str("slug") || str("id"),
    sector,
    title: str("title"),
    category:
      str("category") ||
      str("medium") ||
      {
        design: "Branding",
        photography: "Photography & film",
        art: "Art & canvas",
        it: "Digital & IT",
      }[sector],
    image: safeUrl(str("cover_image")),
    gallery: Array.isArray(row.gallery_images)
      ? row.gallery_images.map(String).map(safeUrl).filter(Boolean)
      : [],
    description: str("description") || str("summary"),
    client: str("client"),
    year: row.year ? String(row.year) : "",
    location: str("location"),
    url: safeUrl(str("project_url")),
    seoTitle: str("seo_title"),
    features: Array.isArray(row.features)
      ? row.features.filter((f): f is string => typeof f === "string")
      : [],
  };
}
export const getCatalogue = createServerFn({ method: "GET" }).handler(async () => {
  const db = client();
  const results = await Promise.all(
    (Object.entries(tables) as [Sector, string][]).map(async ([sector, table]) => {
      const { data, error } = await db
        .from(table)
        .select("*")
        .order("sort_order")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw new Error("Our project collection could not be loaded. Please try again.");
      return (data || []).map((row) => normalise(row, sector));
    }),
  );
  return results.flat();
});
export const getProject = createServerFn({ method: "GET" })
  .validator((input) =>
    z
      .object({
        sector: z.enum(["design", "photography", "art", "it"]),
        slug: z.string().min(1).max(180),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const field = z.string().uuid().safeParse(data.slug).success ? "id" : "slug";
    const { data: rows, error } = await client()
      .from(tables[data.sector])
      .select("*")
      .eq(field, data.slug)
      .limit(1);
    if (error) throw new Error("This project could not be loaded. Please try again.");
    return rows?.[0] ? normalise(rows[0], data.sector) : null;
  });
