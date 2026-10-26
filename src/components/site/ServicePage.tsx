import { ArrowUpRight, Check } from "lucide-react";
import { services, type Sector, type Project } from "@/lib/studio";
import { StudioShell } from "./StudioShell";
import { ProjectGrid } from "./ProjectGrid";
export function ServicePage({
  sector,
  projects,
  unavailable = false,
}: {
  sector: Sector;
  projects: Project[];
  unavailable?: boolean;
}) {
  const s = services.find((x) => x.key === sector)!;
  return (
    <StudioShell>
      <section className="studio-container service-hero">
        <a href="/#expertise" className="eyebrow">
          OUR EXPERTISE / {s.number}
        </a>
        <div className="service-heading">
          <h1>
            {s.name}
            <br />
            <em>{s.short}</em>
          </h1>
          <p>{s.intro}</p>
        </div>
        <div className="capability-tags">
          {s.capabilities.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <a className="studio-button" href={"/contact?service=" + encodeURIComponent(s.name)}>
          Discuss a project <ArrowUpRight size={18} />
        </a>
      </section>
      <section className="studio-container section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CRAFT MEETS PURPOSE</p>
            <h2>
              Thoughtfully made.
              <br />
              <em>Built around you.</em>
            </h2>
          </div>
          <p>{s.audience}</p>
        </div>
        <div className="service-detail-grid">
          {s.details.map(([title, body], i) => (
            <article key={title}>
              <span className="detail-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-container section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM THE COLLECTION</p>
            <h2>Explore the work.</h2>
          </div>
          <a href="/work" className="text-link">
            All disciplines <ArrowUpRight size={18} />
          </a>
        </div>
        {unavailable ? (
          <p role="status">
            Our collection is temporarily unavailable. Please try again or{" "}
            <a href="/contact">contact the studio</a>.
          </p>
        ) : (
          <ProjectGrid projects={projects.filter((p) => p.sector === sector)} />
        )}
      </section>
      <section className="brief-section">
        <div className="studio-container brief-grid">
          <div>
            <p className="eyebrow">A BETTER START</p>
            <h2>
              Great work starts
              <br />
              with a <em>good conversation.</em>
            </h2>
            <p>
              We agree the scope, schedule, deliverables and review stages before production begins.
              Share what you know; we will help shape the rest.
            </p>
            <a className="studio-button" href={"/contact?service=" + encodeURIComponent(s.name)}>
              Let's talk <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="brief-checklist">
            <h3>Bring these to the brief</h3>
            {s.brief.map((b) => (
              <p key={b}>
                <Check size={18} />
                {b}
              </p>
            ))}
            <small>No perfect brief required. An idea is enough to begin.</small>
          </div>
        </div>
      </section>
      <section className="studio-container section-space faq-grid">
        <div>
          <p className="eyebrow">A FEW USEFUL ANSWERS</p>
          <h2>Before we begin.</h2>
        </div>
        <div>
          {s.faq.map(([q, a]) => (
            <details key={q} className="studio-faq">
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="studio-container other-services">
        <p className="eyebrow">CONNECTED DISCIPLINES</p>
        {services
          .filter((x) => x.key !== sector)
          .map((x) => (
            <a key={x.key} href={x.path}>
              {x.name}
              <ArrowUpRight />
            </a>
          ))}
      </section>
    </StudioShell>
  );
}
