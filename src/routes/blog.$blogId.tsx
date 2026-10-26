import { createFileRoute, notFound } from "@tanstack/react-router";
import { StudioShell } from "@/components/site/StudioShell";
import { publicBlogPost } from "@/lib/portal.functions";
import { pageHead, safeUrl, studio } from "@/lib/studio";
export const Route = createFileRoute("/blog/$blogId")({
  loader: async ({ params }) => {
    const post = await publicBlogPost({ data: { slug: params.blogId } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: p }) =>
    p
      ? pageHead(
          p.seo_title || p.title + " | Sumirayan Journal",
          p.seo_description || p.excerpt || p.title,
          "/blog/" + encodeURIComponent(p.slug || p.id),
          safeUrl(p.og_image || p.image_url),
        )
      : {},
  component: Article,
});
function Article() {
  const p = Route.useLoaderData();
  const blocks = p.content.split(/\n\s*\n/);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    image: safeUrl(p.image_url) || undefined,
    datePublished: p.published_at,
    author: { "@type": "Person", name: p.author_name || "Sumirayan Design" },
    publisher: { "@type": "Organization", name: studio.name, url: studio.origin },
    mainEntityOfPage: studio.origin + "/blog/" + encodeURIComponent(p.slug || p.id),
  };
  return (
    <StudioShell>
      <article className="studio-container studio-section article-page">
        <a href="/blog" className="text-link">
          ← Back to the journal
        </a>
        <header>
          <p className="eyebrow">{p.category}</p>
          <h1>{p.title}</h1>
          <p className="hero-description">{p.excerpt}</p>
          <p className="article-byline">
            {p.author_name || "Sumirayan Design"} ·{" "}
            {p.published_at
              ? new Date(p.published_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Kolkata",
                })
              : ""}{" "}
            · {Math.max(1, Math.ceil(p.content.split(/\s+/).length / 200))} min read
          </p>
        </header>
        {safeUrl(p.image_url) && (
          <img className="article-cover" src={safeUrl(p.image_url)} alt={p.image_alt || p.title} />
        )}
        <div className="article-body">
          {blocks.map((b, i) =>
            b.startsWith("## ") ? (
              <h2 key={i}>{b.slice(3)}</h2>
            ) : b.startsWith("### ") ? (
              <h3 key={i}>{b.slice(4)}</h3>
            ) : (
              <p key={i}>{b}</p>
            ),
          )}
        </div>
        {p.author_bio && (
          <aside className="article-author">
            <h2>About {p.author_name || "the author"}</h2>
            <p>{p.author_bio}</p>
          </aside>
        )}
        <aside className="article-author">
          <p className="eyebrow">PUT IDEAS INTO PRACTICE</p>
          <h2>What are you working on?</h2>
          <p>Explore our creative services or tell us about your next project.</p>
          <a className="studio-button" href="/contact">
            Talk to the studio ↗
          </a>
        </aside>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </StudioShell>
  );
}
