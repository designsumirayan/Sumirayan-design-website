import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StudioShell } from "@/components/site/StudioShell";
import { publicBlogPosts } from "@/lib/portal.functions";
import { pageHead, safeUrl } from "@/lib/studio";
export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead(
      "Branding & Creative Business Journal | Sumirayan Design",
      "Practical ideas on branding, photography, websites and building a business in Patna and Bihar. Read the Sumirayan Design journal.",
      "/blog",
    ),
  loader: () => publicBlogPosts(),
  component: Journal,
});
function Journal() {
  const posts = Route.useLoaderData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filtered = posts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      [p.title, p.excerpt, p.tags].join(" ").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <StudioShell>
      <section className="studio-container service-hero">
        <p className="eyebrow">THE SUMIRAYAN JOURNAL</p>
        <h1>
          Ideas worth
          <br />
          <em>thinking about.</em>
        </h1>
        <p className="hero-description">
          Notes on brands, visual storytelling and digital experiences. Practical perspectives for
          businesses in Patna, Bihar and beyond.
        </p>
      </section>
      <section className="studio-container section-space">
        <label className="eyebrow" htmlFor="journal-search">
          Search the journal
        </label>
        <input
          id="journal-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Branding, photography, websites…"
          className="journal-search"
        />
        <div className="work-filters">
          {categories.map((c) => (
            <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="journal-grid">
          {filtered.map((p) => (
            <a
              className="journal-card"
              key={p.id}
              href={"/blog/" + encodeURIComponent(p.slug || p.id)}
            >
              {safeUrl(p.image_url) && (
                <img src={safeUrl(p.image_url)} alt={p.image_alt || p.title} loading="lazy" />
              )}
              <p className="eyebrow">{p.category}</p>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="text-link">Read the story ↗</span>
            </a>
          ))}
        </div>
        {!filtered.length && (
          <p className="empty-work">No articles match this search. Try another topic.</p>
        )}
      </section>
    </StudioShell>
  );
}
