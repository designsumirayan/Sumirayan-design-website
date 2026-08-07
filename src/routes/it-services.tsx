import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicItServices } from "@/lib/content.functions";
import * as Icons from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/it-services")({
  head: () => ({
    meta: [
      { title: "IT Services — Sumirayan Design" },
      { name: "description", content: "Web, mobile, cloud, AI and e-commerce engineering by Sumirayan." },
      { property: "og:title", content: "IT Services — Sumirayan Design" },
      { property: "og:description", content: "Engineering services that ship." },
    ],
  }),
  component: ItServicesPage,
});

function ItServicesPage() {
  const fn = useServerFn(publicItServices);
  const { data = [] } = useQuery({ queryKey: ["public", "it-services"], queryFn: () => fn() });

  return (
    <EditorialShell
      eyebrow="Engineering"
      title={<>IT <em className="not-italic text-[#e85d3a]">Services</em></>}
      intro="The other half of the studio: production-grade web, mobile, cloud, AI and commerce engineering — built to the same standard as the design."
    >
      {!data.length && <p className="text-black/50">No services yet. Add some from the admin panel.</p>}
      <div className="grid md:grid-cols-2 gap-8">
        {data.map((s, i) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] ?? Icons.Sparkles;
          const features = Array.isArray(s.features) ? (s.features as string[]) : [];
          return (
            <article key={s.id} className="paper-card overflow-hidden flex flex-col">
              {s.cover_image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={s.cover_image} alt={s.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-[#c9a84c] grid place-items-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="serif text-3xl text-black/25">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="serif text-3xl">{s.title}</h3>
                <p className="mt-3 text-black/65 leading-relaxed">{s.summary}</p>
                {s.description && <p className="mt-2 text-black/55 text-sm leading-relaxed">{s.description}</p>}
                {features.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-black/75">
                        <Check className="w-4 h-4 mt-0.5 text-[#e85d3a] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="rule mt-6 mb-4" />
                <Link to="/contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium hover:text-[#e85d3a] transition">
                  Discuss a project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </EditorialShell>
  );
}
