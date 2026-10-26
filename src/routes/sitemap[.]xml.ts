import { createFileRoute } from "@tanstack/react-router";
import { getCatalogue } from "@/lib/catalogue.functions";
import { publicBlogPosts } from "@/lib/portal.functions";
import { projectHref, studio } from "@/lib/studio";
const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const [projects, posts] = await Promise.all([getCatalogue(), publicBlogPosts()]);
          const paths = [
            "/",
            "/about",
            "/contact",
            "/design",
            "/photography",
            "/art",
            "/it-services",
            "/work",
            "/blog",
            "/learn",
            "/events",
            "/careers",
            "/privacy",
            "/terms",
            ...projects.map(projectHref),
            ...posts.map((p) => "/blog/" + encodeURIComponent(p.slug || p.id)),
          ];
          return new Response(
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
              [...new Set(paths)]
                .map((p) => "<url><loc>" + escape(studio.origin + p) + "</loc></url>")
                .join("") +
              "</urlset>",
            {
              headers: {
                "Content-Type": "application/xml; charset=utf-8",
                "Cache-Control": "public, max-age=300",
              },
            },
          );
        } catch {
          return new Response("Sitemap temporarily unavailable", { status: 503 });
        }
      },
    },
  },
});
