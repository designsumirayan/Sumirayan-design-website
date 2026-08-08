import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
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
  const [cat, setCat] = useState<string>("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(data.map((d) => d.category)))], [data]);
  const items = cat === "All" ? data : data.filter((d) => d.category === cat);
  const [featured, ...rest] = items;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* --- Animated Motion Graphics Hero Banner --- */}
      <div className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Animated Glowing Orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 rounded-[100%] blur-[80px] rotate-45"></div>
        
        <div className="relative z-10 w-full max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-white/70">
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
      {/* --- End Hero Banner --- */}

      {/* --- Portfolio Section --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="flex flex-wrap gap-2 mb-16 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`chip transition-all duration-300 px-5 py-2 rounded-full text-sm ${cat === c ? "bg-white text-black font-medium scale-105" : "bg-white/5 hover:bg-white/15 text-white/70 border border-white/10"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {!items.length && <p className="text-center text-white/50 py-10">No projects yet. Add some from the admin panel.</p>}
        
        {featured && (
          <a href={featured.project_url ?? "#"} className="block group mb-24">
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 transition-all duration-500 hover:bg-white/[0.04]">
              <div className="md:col-span-8 aspect-[16/9] overflow-hidden rounded-2xl">
                <img src={featured.cover_image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
              </div>
              <div className="md:col-span-4 px-4">
                <div className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4 font-semibold">Featured Work</div>
                <h2 className="serif text-4xl md:text-5xl text-white mb-4 leading-tight group-hover:text-pink-300 transition-colors duration-300">{featured.title}</h2>
                <p className="text-white/60 leading-relaxed mb-6">{featured.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  {featured.client && <span className="bg-white/5 px-3 py-1 rounded-full">{featured.client}</span>}
                  <span className="bg-white/5 px-3 py-1 rounded-full text-white/80">{featured.category}</span>
                </div>
              </div>
            </div>
          </a>
        )}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {rest.map((p, i) => (
            <a key={p.id} href={p.project_url ?? "#"} className={`group block ${i % 2 === 1 ? "md:mt-16" : ""}`}>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-700" />
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="serif text-2xl md:text-3xl text-white group-hover:text-blue-300 transition-colors">{p.title}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40 shrink-0">{p.category}</span>
                </div>
                {p.description && <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{p.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* --- End Portfolio Section --- */}

      {/* --- 3D Services & Branding Section --- */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl serif mb-6 text-white leading-tight">
            Transform Your Business with <br/><span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Patna’s Best Agency</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            To stand out in today’s competitive market, a brand needs more than just a logo—it needs a distinct visual voice. We combine creative strategy with deep market insights to build brands that capture attention.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-blue-500/50 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
            <div className="text-blue-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-blue-300 transition-colors">Brand Identity</h4>
            <p className="text-white/50 text-sm leading-relaxed">From logo design and brand guidelines to core messaging, we create memorable identities.</p>
          </div>

          {/* Card 2 */}
          <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-pink-500/50 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.2)] transition-all duration-500 overflow-hidden md:mt-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all duration-500"></div>
            <div className="text-pink-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l18-5v12L3 14v-3z"></path>
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
              </svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-pink-300 transition-colors">Digital Marketing</h4>
            <p className="text-white/50 text-sm leading-relaxed">Comprehensive performance marketing, social media management, and ad campaigns.</p>
          </div>

          {/* Card 3 */}
          <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-indigo-500/50 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
            <div className="text-indigo-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-indigo-300 transition-colors">Packaging & Print</h4>
            <p className="text-white/50 text-sm leading-relaxed">Product packaging, brochures, and outdoor advertising assets engineered to stand out.</p>
          </div>

          {/* Card 4 */}
          <div className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-yellow-500/50 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.2)] transition-all duration-500 overflow-hidden md:mt-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all duration-500"></div>
            <div className="text-yellow-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-yellow-300 transition-colors">Corporate Comm.</h4>
            <p className="text-white/50 text-sm leading-relaxed">Professional pitch decks, annual reports, and brand storybooks that convey trust.</p>
          </div>

        </div>
      </div>
      {/* --- End Services Section --- */}

    </div>
  );
}
