import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
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
  
  // Popup (Modal) में डाटा दिखाने के लिए State
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  return (
    <>
      <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
        
        {/* --- Cinematic Motion Graphics Hero Banner --- */}
        <div className="relative -mt-10 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
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

        {/* --- Dynamic Photography Masonry Grid --- */}
        <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
          {!data.length && <p className="text-center text-white/50 py-10">No photographs yet. Add some from the admin panel.</p>}
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {data.map((p) => (
              <div 
                key={p.id} 
                onClick={() => setSelectedPhoto(p)}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-[#050505] cursor-pointer border border-white/5 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:-translate-y-2"
              >
                {/* Natural height image with smooth zoom on hover */}
                <img src={p.cover_image} alt={p.title} className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" />
                
                {/* Dark Gradient Overlay (Hidden by default, shows on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                
                {/* Text Container: Hidden by default, slides up and fades in on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-none">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-1">
                      {p.location ?? "Studio"}
                    </span>
                    <h3 className="serif text-xl md:text-2xl text-white font-bold leading-tight">
                      {p.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* --- End Grid Section --- */}

        {/* --- 3D Services Section --- */}
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
            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.2)] transition-all duration-500 overflow-hidden">
              <div className="text-cyan-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-cyan-300 transition-colors">Commercial & TVCs</h4>
              <p className="text-white/50 text-sm leading-relaxed">High-end ad campaigns and commercial films tailored for TV, digital ads, and social media.</p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
              <div className="text-indigo-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-indigo-300 transition-colors">Product Photography</h4>
              <p className="text-white/50 text-sm leading-relaxed">Crisp, detailed product imagery for online catalogs, print ads, and promotional campaigns.</p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden">
              <div className="text-purple-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-purple-300 transition-colors">Corporate & Events</h4>
              <p className="text-white/50 text-sm leading-relaxed">Comprehensive video and photographic documentation for corporate launches, summits, and activations.</p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-rose-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
              <div className="text-rose-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-rose-300 transition-colors">Drone & Aerial</h4>
              <p className="text-white/50 text-sm leading-relaxed">Cinematic high-altitude footage for real estate, infrastructure, commercial properties, and large events.</p>
            </div>
          </div>
        </div>
      </EditorialShell>

      {/* --- Full View Popup (Modal) --- */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button (X) */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            onClick={() => setSelectedPhoto(null)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          {/* Modal Box */}
          <div 
            className="max-w-5xl w-full max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="md:w-3/5 overflow-hidden bg-black/50 flex items-center justify-center">
              <img 
                src={selectedPhoto.cover_image} 
                alt={selectedPhoto.title} 
                className="w-full h-auto max-h-[50vh] md:max-h-[90vh] object-contain" 
              />
            </div>
            
            {/* Text/Details Section */}
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 inline-block">
                {selectedPhoto.location ?? "Photography"}
              </span>
              <h2 className="text-3xl md:text-5xl serif text-white mb-6 leading-tight">
                {selectedPhoto.title}
              </h2>
              {selectedPhoto.description && (
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                  {selectedPhoto.description}
                </p>
              )}
              {selectedPhoto.client && (
                <div className="mt-auto border-t border-white/10 pt-6">
                  <span className="text-white/40 text-sm uppercase tracking-wider block mb-1">Client</span>
                  <span className="text-white font-medium">{selectedPhoto.client}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
