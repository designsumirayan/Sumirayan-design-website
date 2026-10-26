import { createFileRoute } from "@tanstack/react-router";
import { StudioShell } from "@/components/site/StudioShell";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { getCatalogue } from "@/lib/catalogue.functions";
import { pageHead } from "@/lib/studio";
export const Route = createFileRoute("/work/")({
  head: () =>
    pageHead(
      "Selected Work & Portfolio | Sumirayan Design, Patna",
      "Explore branding, photography, film, original art and digital projects from Sumirayan Design. Browse our creative portfolio.",
      "/work",
    ),
  loader: () => getCatalogue(),
  component: Work,
});
function Work() {
  const projects = Route.useLoaderData();
  return (
    <StudioShell>
      <section className="studio-container service-hero">
        <p className="eyebrow">THE SUMIRAYAN COLLECTION</p>
        <div className="service-heading">
          <h1>
            Different briefs.
            <br />
            <em>A shared belief in craft.</em>
          </h1>
          <p>
            A collection of identities, images, artworks and digital experiences. Explore by
            discipline, then look closer at the thinking and details behind each project.
          </p>
        </div>
      </section>
      <section className="studio-container section-space">
        <ProjectGrid projects={projects} filters />
      </section>
    </StudioShell>
  );
}
