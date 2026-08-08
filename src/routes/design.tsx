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
      
      {/* 1. TOP HEADER SECTION */}
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

      {/* 2. CATEGORY BUTTONS & GRID SECTION */}
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

        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((p) => (
              <a 
                key={p.id} 
                href={p.project_url ?? "#"} 
                className="group relative block rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-lg transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:-translate-y-2"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img 
                    src={p.cover_image} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                </div>
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

      {/* 3. RESTORED BOTTOM SEO / CARDS SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl serif mb-6 text-white leading-tight">
            Transform Your Business with <br /><span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Patna's Best Agency</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            To stand out in today's competitive market, a brand needs more than just a logo—it needs a distinct visual voice. We combine creative strategy with deep market insights to build brands that capture attention and drive business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:-translate-y-3 hover:bg-white/[0.04] transition-all duration-500">
            <div className="text-blue-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-blue-300 transition-colors">Brand Identity</h4>
            <p className="text-white/50 text-sm leading-relaxed">From logo design and brand guidelines to core messaging, we create memorable identities.</p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-pink-500/50 hover:-translate-y-3 hover:bg-white/[0.04] transition-all duration-500">
            <div className="text-pink-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-pink-300 transition-colors">Digital Marketing</h4>
            <p className="text-white/50 text-sm leading-relaxed">Comprehensive performance marketing, social media management, and ad campaigns.</p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 hover:-translate-y-3 hover:bg-white/[0.04] transition-all duration-500">
            <div className="text-indigo-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-indigo-300 transition-colors">Packaging & Print</h4>
            <p className="text-white/50 text-sm leading-relaxed">Product packaging, brochures, and outdoor advertising assets engineered to stand out.</p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/50 hover:-translate-y-3 hover:bg-white/[0.04] transition-all duration-500">
            <div className="text-yellow-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-yellow-300 transition-colors">Corporate Comm.</h4>
            <p className="text-white/50 text-sm leading-relaxed">Professional pitch decks, annual reports, and brand storybooks that convey trust.</p>
          </div>
        </div>
      </div>

    </EditorialShell>
  );
}
