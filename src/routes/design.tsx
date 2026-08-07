import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicDesignItems } from "@/lib/content.functions";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design Portfolio — Sumirayan Design" },
      { name: "description", content: "Selected design work: branding, product, web and editorial by Sumirayan Design." },
      { property: "og:title", content: "Design Portfolio — Sumirayan Design" },
      { property: "og:description", content: "Selected design work by Sumirayan Design." },
    ],
  }),
  component: DesignPage,
});

function DesignPage() {
  const fn = useServerFn(publicDesignItems);
  const { data = [] } = useQuery({ queryKey: ["public", "design"], queryFn: () => fn() });
  const [cat, setCat] = useState<string>("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(data.map((d) => d.category)))], [data]);
  const items = cat === "All" ? data : data.filter((d) => d.category === cat);
  const [featured, ...rest] = items;

  return (
    <EditorialShell
      eyebrow="Portfolio"
      title={<>The <em className="not-italic text-[#c9a84c]">Design</em> Portfolio</>}
      intro="A selection of identity systems, digital products and editorial work built for founders who care about the details."
    >
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip transition ${cat === c ? "bg-[#0a0a0a] text-[#f5f3ee] border-[#0a0a0a]" : "hover:bg-black/5"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {!items.length && <p className="text-black/50">No projects yet. Add some from the admin panel.</p>}

      {featured && (
        <a href={featured.project_url ?? "#"} className="block group mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8 aspect-[16/10] overflow-hidden paper-card">
              <img src={featured.cover_image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-700" />
            </div>
            <div className="md:col-span-4">
              <div className="text-[0.7rem] uppercase tracking-[0.28em] text-black/50">Featured — 01</div>
              <h2 className="serif text-4xl md:text-5xl mt-3">{featured.title}</h2>
              <p className="mt-4 text-black/70">{featured.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/60">
                {featured.client && <span><em className="not-italic text-black/40">Client · </em>{featured.client}</span>}
                {featured.year && <span><em className="not-italic text-black/40">Year · </em>{featured.year}</span>}
                <span className="chip">{featured.category}</span>
              </div>
            </div>
          </div>
        </a>
      )}

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
        {rest.map((p, i) => (
          <a key={p.id} href={p.project_url ?? "#"} className={`group ${i % 2 === 1 ? "md:mt-16" : ""}`}>
            <div className="aspect-[4/5] overflow-hidden paper-card">
              <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="serif text-2xl md:text-3xl leading-tight">{p.title}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-black/50 shrink-0">{p.category}</span>
            </div>
            {p.description && <p className="mt-2 text-black/60 text-sm leading-relaxed">{p.description}</p>}
          </a>
        ))}
      </div>
    </EditorialShell>
  );
}
