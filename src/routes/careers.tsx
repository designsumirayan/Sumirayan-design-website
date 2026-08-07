import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicCareers } from "@/lib/content.functions";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Sumirayan Design" },
      { name: "description", content: "Open roles at Sumirayan Design. Join a studio that builds ambitious work." },
      { property: "og:title", content: "Careers — Sumirayan Design" },
      { property: "og:description", content: "Open roles at Sumirayan Design." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const fn = useServerFn(publicCareers);
  const { data = [] } = useQuery({ queryKey: ["public", "careers"], queryFn: () => fn() });
  const open = data.filter((c) => c.is_open);

  return (
    <EditorialShell
      eyebrow="Come Build"
      title={<>Open <em className="not-italic text-[#c9a84c]">Positions</em></>}
      intro="We hire for craft, curiosity and the willingness to sit with a problem long enough to solve it properly."
    >
      {!open.length && <p className="text-black/50">No open positions right now — write to us and we'll keep you in mind.</p>}
      <div className="rule mb-2" />
      {open.map((c) => (
        <a
          key={c.id}
          href={c.apply_url ?? "/contact"}
          className="group grid md:grid-cols-12 gap-6 items-baseline py-8 border-b border-black/10 hover:bg-black/[0.02] transition px-2 -mx-2"
        >
          <div className="md:col-span-6">
            <div className="text-xs uppercase tracking-[0.28em] text-black/50 mb-2">{c.department ?? "Studio"}</div>
            <h3 className="serif text-4xl md:text-5xl leading-tight group-hover:text-[#e85d3a] transition">{c.title}</h3>
          </div>
          <div className="md:col-span-4 space-y-1.5 text-sm text-black/65">
            <div className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{c.location ?? "Remote"}</div>
            <div className="inline-flex items-center gap-2"><Briefcase className="w-4 h-4" />{c.employment_type}</div>
            <p className="text-black/60 mt-2">{c.summary}</p>
          </div>
          <div className="md:col-span-2 md:text-right">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-medium">
              Apply <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </span>
          </div>
        </a>
      ))}
    </EditorialShell>
  );
}
