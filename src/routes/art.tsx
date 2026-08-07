import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicArtItems } from "@/lib/content.functions";

export const Route = createFileRoute("/art")({
  head: () => ({
    meta: [
      { title: "Art & Canvas — Sumirayan Design" },
      { name: "description", content: "Original artworks, canvases and studio pieces by Sumirayan Design." },
      { property: "og:title", content: "Art & Canvas — Sumirayan Design" },
      { property: "og:description", content: "Original artworks and studio pieces." },
    ],
  }),
  component: ArtPage,
});

function ArtPage() {
  const fn = useServerFn(publicArtItems);
  const { data = [] } = useQuery({ queryKey: ["public", "art"], queryFn: () => fn() });

  return (
    <EditorialShell
      eyebrow="Studio"
      title={<>Art <em className="not-italic text-[#c9a84c]">&</em> Canvas</>}
      intro="Original works from the studio. Some are available for acquisition, others live in the archive."
    >
      {!data.length && <p className="text-black/50">No artworks yet. Add some from the admin panel.</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {data.map((art) => (
          <article key={art.id} className="group">
            <div className="relative aspect-[3/4] overflow-hidden paper-card">
              <img src={art.cover_image} alt={art.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
              {art.for_sale && (
                <span className="absolute top-3 left-3 chip bg-[#0a0a0a] text-[#f5f3ee] border-[#0a0a0a]">Available</span>
              )}
            </div>
            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <h3 className="serif text-2xl">{art.title}</h3>
                {art.year && <span className="text-sm text-black/50">{art.year}</span>}
              </div>
              <div className="text-sm text-black/55 mt-1">
                {[art.medium, art.dimensions].filter(Boolean).join(" · ")}
              </div>
              {art.description && <p className="text-black/65 text-sm mt-2 leading-relaxed">{art.description}</p>}
              {art.for_sale && art.price && (
                <div className="mt-3 text-sm">
                  <span className="text-black/50">Price · </span>
                  <span className="serif text-lg">₹{Number(art.price).toLocaleString()}</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </EditorialShell>
  );
}
