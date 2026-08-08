import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicDesignItems } from "@/lib/content.functions";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Best Advertising Agency in Patna | Brand Strategy & Visual Identity" },
      { name: "description", content: "Scale your brand with Patna's best advertising agency. We offer visual identity design, corporate branding, digital marketing campaigns, and packaging design." },
      { property: "og:title", content: "Best Advertising Agency in Patna | Brand Strategy & Visual Identity" },
      { property: "og:description", content: "Scale your brand with Patna's best advertising agency. We offer visual identity design, corporate branding, digital marketing campaigns, and packaging design." },
    ],
  }),
  component: DesignPage,
});

function DesignPage() {
  const fn = useServerFn(publicDesignItems);
  const { data = [] } = useQuery({ queryKey: ["public", "design"], queryFn: () => fn() });
  const [cat, setCat] = useState("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(data.map((d) => d.category)))], [data]);
  const items = cat === "All" ? data : data.filter((d) => d.category === cat);

  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      <div className="relative -mt-10 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mt-12">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-white/70">
            Portfolio
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-300">Design & Branding</span> Portfolio
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            Strategic identity systems, high-converting digital marketing campaigns, and compelling visual storytelling crafted by the best advertising agency in Patna.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="flex flex-wrap gap-2 mb-16 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`transition-all duration-300 px-5 py-2 rounded-full text-sm border ${
                cat === c
                  ? "bg-white text-black font-medium scale-105 border-white"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {!items.length && <p className="text-center text-white/50 py-10">No projects yet. Add some from the admin panel.</p>}

        {/* NAYA PREMIUM 5-COLUMN GRID */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((p) => (
              <a 
                key={p.id} 
                href={p.project_url ?? "#"} 
                className="group relative block rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-lg transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img 
                    src={p.cover_image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                  />
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                </div>

                {/* Hover Content Section */}
                <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="text-[10px] uppercase tracking-widest text-pink-300 mb-2 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                    {p.category}
                  </span>
                  
                  <h3 className="text-lg font-display font-semibold text-white mb-1 line-clamp-1">
                    {p.title}
                  </h3>
                  
                  {p.description && (
                    <p className="text-xs text-white/70 line-clamp-2 opacity-0 transition-opacity duration-500 delay-150 group-hover:opacity-100">
                      {p.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </EditorialShell>
  );
}
