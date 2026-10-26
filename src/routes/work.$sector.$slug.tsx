import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StudioShell } from "@/components/site/StudioShell";
import { ProjectMedia } from "@/components/site/ProjectGrid";
import { getProject } from "@/lib/catalogue.functions";
import { pageHead, projectHref, services, type Sector } from "@/lib/studio";
export const Route = createFileRoute("/work/$sector/$slug")({
  loader: async ({ params }) => {
    if (!services.some((s) => s.key === params.sector)) throw notFound();
    const project = await getProject({
      data: { sector: params.sector as Sector, slug: params.slug },
    });
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData: p }) =>
    p
      ? pageHead(
          p.seoTitle || p.title + " | Sumirayan Design",
          p.description.slice(0, 160) ||
            "Explore " + p.title + " in the Sumirayan Design portfolio.",
          projectHref(p),
          p.image,
        )
      : {},
  component: Project,
});
function Project() {
  const p = Route.useLoaderData();
  const s = services.find((s) => s.key === p.sector)!;
  return (
    <StudioShell>
      <section className="studio-container project-detail-hero">
        <a href="/work" className="eyebrow">
          ← BACK TO THE COLLECTION
        </a>
        <h1>{p.title}</h1>
        <dl className="project-meta">
          <div>
            <dt>Discipline</dt>
            <dd>
              <a href={s.path}>{s.name}</a>
            </dd>
          </div>
          {p.client && (
            <div>
              <dt>Client</dt>
              <dd>{p.client}</dd>
            </div>
          )}
          {p.location && (
            <div>
              <dt>Location</dt>
              <dd>{p.location}</dd>
            </div>
          )}
          {p.year && (
            <div>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </div>
          )}
          <div>
            <dt>Category</dt>
            <dd>{p.category}</dd>
          </div>
        </dl>
      </section>
      <div className="studio-container project-cover">
        <ProjectMedia src={p.image} title={p.title} detail />
      </div>
      <section className="studio-container project-story">
        <div>
          <p className="eyebrow">PROJECT NOTES</p>
          <h2>A closer look.</h2>
        </div>
        <div>
          {p.description ? (
            <p>{p.description}</p>
          ) : (
            <p>
              Explore the visual work from this project. For a related brief, contact our studio to
              discuss your requirements and the creative approach.
            </p>
          )}
          {p.features.length > 0 && (
            <ul className="capability-tags">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          {p.url && (
            <a className="text-link" href={p.url} target="_blank" rel="noopener noreferrer">
              Visit project website <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </section>
      {p.gallery.length > 0 && (
        <section className="studio-container project-gallery" aria-label="Project gallery">
          {p.gallery.map((src, i) => (
            <div key={src + i}>
              <ProjectMedia src={src} title={p.title + " — detail " + (i + 1)} detail />
            </div>
          ))}
        </section>
      )}
      <section className="studio-container studio-connect">
        <h2>
          A similar ambition?
          <br />
          <em>Make it your own.</em>
        </h2>
        <div>
          <p>Every project starts with a different challenge. Tell us yours.</p>
          <a className="studio-button" href={"/contact?service=" + encodeURIComponent(s.name)}>
            Discuss your project <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </StudioShell>
  );
}
