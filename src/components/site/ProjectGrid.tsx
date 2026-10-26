import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { isVideo, projectHref, services, type Project } from "@/lib/studio";
export function ProjectMedia({
  src,
  title,
  detail = false,
}: {
  src: string;
  title: string;
  detail?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed)
    return (
      <div className="media-fallback">
        <span>
          SUMIRAYAN
          <br />
          DESIGN
        </span>
        <small>{title}</small>
      </div>
    );
  if (isVideo(src))
    return detail ? (
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        aria-label={title}
      />
    ) : (
      <div className="video-cover">
        <Play size={40} />
        <span>Watch project film</span>
      </div>
    );
  return (
    <img src={src} alt={title} loading="lazy" decoding="async" onError={() => setFailed(true)} />
  );
}
export function ProjectGrid({
  projects,
  filters = false,
}: {
  projects: Project[];
  filters?: boolean;
}) {
  const [sector, setSector] = useState("all");
  const selected = sector === "all" ? projects : projects.filter((p) => p.sector === sector);
  return (
    <>
      {filters && (
        <div className="work-filters" aria-label="Filter projects">
          {[{ key: "all", name: "All work" }, ...services].map((s) => (
            <button key={s.key} aria-pressed={sector === s.key} onClick={() => setSector(s.key)}>
              {s.name}
            </button>
          ))}
        </div>
      )}
      {selected.length ? (
        <div className="project-grid">
          {selected.map((p) => (
            <a key={p.sector + p.id} href={projectHref(p)} className="project-card">
              <div className="project-image">
                <ProjectMedia src={p.image} title={p.title} />
                <span className="project-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="project-caption">
                <h3>{p.title}</h3>
                <span>
                  {p.category}
                  {p.location ? " · " + p.location : ""}
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="collection-note">
          <p className="eyebrow">A NEW CHAPTER IN THE MAKING</p>
          <h3>Have something in mind?</h3>
          <p>
            Tell us what you are planning. We can discuss the approach, scope and relevant work with
            you.
          </p>
          <a className="text-link" href="/contact">
            Discuss your project <ArrowUpRight size={18} />
          </a>
        </div>
      )}
    </>
  );
}
