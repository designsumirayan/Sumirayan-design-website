import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicPhotographyItems } from "@/lib/content.functions";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Top Commercial Photography & Video Production Agency in Patna" },
      { name: "description", content: "High-definition commercial shoots, product photography, drone videography, and corporate ad films by Patna's premier advertising and media production studio." },
      { property: "og:title", content: "Top Commercial Photography & Video Production Agency in Patna" },
      { property: "og:description", content: "High-definition commercial shoots, product photography, drone videography, and corporate ad films by Patna's premier advertising and media production studio." },
    ],
  }),
  component: PhotographyPage,
});

function PhotographyPage() {
  const fn = useServerFn(publicPhotographyItems);
  const { data = [] } = useQuery({ queryKey: ["public", "photography"], queryFn: () => fn() });

  return (
    <EditorialShell title="" intro="" eyebrow="">
      
      {/* --- Cinematic Motion Graphics Hero Banner --- */}
      <div className="relative -mt-10 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Cinematic Glowing Orbs (Cyan & Purple for a Camera/Lens vibe) */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mt-12">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-white/70 shadow-lg">
            Lens & Motion
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            Commercial Photography & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">Cinematic Videography</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            High-impact visual storytelling, documentary reportage, commercial ad shoots, and studio experiments designed to bring your brand to life.
          </p>
        </div>
      </div>
      {/* --- End Hero Banner --- */}

      {/* --- Photography Masonry Grid Section --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {!data.length && <p className="text-center text-white/50 py-10">No photographs yet. Add some from the admin panel.</p>}
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {data.map((p) => (
            <div key={p.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)]">
              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              
              <img src={p.cover_image} alt={p.title} className="w-full h-auto object-cover group-hover:scale-[1.05] transition duration-700" />
              
              {/* Animated Text appearing on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <h3 className="serif text-2xl text-white mb-2">{p.title}</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-medium">{p.location ?? "Studio"}</span>
                {p.description && <p className="text-white/60 text-sm mt-3 leading-relaxed line-clamp-2">{p.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* --- End Grid Section --- */}

      {/* --- 3D Services Section with Relevant Icons --- */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl serif mb-6 text-white leading-tight">
            Commercial Media Production by <br/><span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Patna’s Best Agency</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            Visuals speak louder than words. At Sumirayan Design, we deliver world-class photography and cinematic video production that elevated brand value across Bihar and India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Commercial Shoots & TVCs */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.2)] transition-all duration-500 overflow-hidden">
            <div className="text-cyan-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-cyan-300 transition-colors">Commercial & TVCs</h4>
            <p className="text-white/50 text-sm leading-relaxed">High-end ad campaigns and commercial films tailored for TV, digital ads, and social media.</p>
          </div>

          {/* Card 2: Product & E-Commerce */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
            <div className="text-indigo-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-indigo-300 transition-colors">Product Photography</h4>
            <p className="text-white/50 text-sm leading-relaxed">Crisp, detailed product imagery for online catalogs, print ads, and promotional campaigns.</p>
          </div>

          {/* Card 3: Corporate & Event */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden">
            <div className="text-purple-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-purple-300 transition-colors">Corporate & Events</h4>
            <p className="text-white/50 text-sm leading-relaxed">Comprehensive video and photographic documentation for corporate launches, summits, and activations.</p>
          </div>

          {/* Card 4: Drone & Aerial */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-rose-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
            <div className="text-rose-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-rose-300 transition-colors">Drone & Aerial</h4>
            <p className="text-white/50 text-sm leading-relaxed">Cinematic high-altitude footage for real estate, infrastructure, commercial properties, and large events.</p>
          </div>

        </div>
      </div>
      {/* --- End Services Section --- */}

    </EditorialShell>
  );
}
