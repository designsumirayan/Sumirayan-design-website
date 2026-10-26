import { createFileRoute } from "@tanstack/react-router";
import { StudioShell } from "@/components/site/StudioShell";
import { services, pageHead } from "@/lib/studio";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Our Creative Studio in Patna | Sumirayan Design",
      "Meet Sumirayan Design: an independent creative studio in Patna bringing together branding, photography, film, art and digital experiences.",
      "/about",
    ),
  component: About,
});
function About() {
  return (
    <StudioShell>
      <section className="studio-container service-hero">
        <p className="eyebrow">THE STUDIO / PATNA, BIHAR</p>
        <h1>
          Different disciplines.
          <br />
          <em>A shared point of view.</em>
        </h1>
        <p className="hero-description">
          We believe a brand is experienced in many ways: in its identity, its images, the spaces it
          occupies and the website people use. Those experiences should feel connected.
        </p>
      </section>
      <section className="studio-container studio-section">
        <div className="section-heading">
          <p className="eyebrow">WHY WE EXIST</p>
          <h2>
            Artistic thinking.
            <br />
            <em>Practical purpose.</em>
          </h2>
        </div>
        <div className="service-details">
          <article>
            <h3>Start with understanding</h3>
            <p>
              We ask what your business does, who it serves and what the work needs to achieve. That
              context shapes the creative direction.
            </p>
          </article>
          <article>
            <h3>Make the parts work together</h3>
            <p>
              Design, production, art and technology inform one another. A campaign image should fit
              the brand; a website should help someone take the next step.
            </p>
          </article>
          <article>
            <h3>Build for real use</h3>
            <p>
              We discuss formats, delivery, ownership and handover as part of the brief. The aim is
              work your team can use confidently.
            </p>
          </article>
        </div>
      </section>
      <section className="studio-container studio-section founder-section">
        <img
          src="https://res.cloudinary.com/iqvaoezc/image/upload/v1786283423/sumit_singh_ijwkvf.png"
          alt="Sumit Singh, founder of Sumirayan Design"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">FOUNDER</p>
          <h2>
            Meet
            <br />
            <em>Sumit Singh.</em>
          </h2>
          <p>
            Artist, photographer and graphic designer, Sumit brings a visual arts perspective to the
            studio's creative work. His practice connects image-making with the everyday needs of
            brands and businesses.
          </p>
          <p>
            Based in Patna, the studio works across four complementary disciplines. We bring the
            right combination to each brief, from an individual artwork to a connected brand
            experience.
          </p>
          <a className="text-link" href="/contact">
            Start a conversation ↗
          </a>
        </div>
      </section>
      <section className="studio-container studio-section">
        <p className="eyebrow">FOUR WAYS TO CREATE</p>
        <div className="expertise-list">
          {services.map((s) => (
            <a className="expertise-row" key={s.key} href={s.path}>
              <span>{s.number}</span>
              <h3>{s.name}</h3>
              <p>{s.label}</p>
              <span>↗</span>
            </a>
          ))}
        </div>
      </section>
    </StudioShell>
  );
}
