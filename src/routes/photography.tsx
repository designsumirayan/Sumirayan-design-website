import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicPhotographyItems } from "@/lib/content.functions";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Sumirayan Design" },
      { name: "description", content: "Documentary, editorial and commercial photography from the Sumirayan studio." },
      { property: "og:title", content: "Photography — Sumirayan Design" },
      { property: "og:description", content: "Documentary and editorial photography." },
    ],
  }),
  component: PhotographyPage,
});

function PhotographyPage() {
  const fn = useServerFn(publicPhotographyItems);
  const { data = [] } = useQuery({ queryKey: ["public", "photography"], queryFn: () => fn() });

  return (
    <EditorialShell
      eyebrow="Frames"
      title={<>Photography <em className="not-italic text-[#e85d3a]">Journal</em></>}
      intro="Notes from the road. Documentary reportage, editorial commissions, and quiet studio experiments."
    >
      {!data.length && <p className="text-black/50">No photographs yet. Add some from the admin panel.</p>}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {data.map((p, i) => (
          <figure key={p.id} className="mb-6 break-inside-avoid group">
            <div className="overflow-hidden paper-card">
              <img
                src={p.cover_image}
                alt={p.title}
                className={`w-full h-auto object-cover group-hover:scale-[1.03] transition duration-700 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between text-sm">
              <span className="serif text-xl">{p.title}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-black/50">{p.location ?? ""}</span>
            </figcaption>
            {p.description && <p className="text-black/55 text-sm mt-1">{p.description}</p>}
          </figure>
        ))}
      </div>
    </EditorialShell>
  );
}
