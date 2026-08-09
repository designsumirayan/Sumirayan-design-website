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
  
  const [cat, setCat] = useState<string>("All");
  // Popup (Modal) में डाटा दिखाने के लिए State
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(data.map((d) => d.category)))], [data]);
  const items = cat === "All" ? data : data.filter((d) => d.category === cat);

  return (
    <>
      <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
        
        {/* --- Hero Banner --- */}
        <div className="relative -mt-10 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-4xl mt-12">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-white/70 shadow-lg">
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

        {/* --- Dynamic Masonry Grid Section --- */}
        <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
          <div className="flex flex-wrap gap-2 mb-16 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`chip transition-all duration-300 px-5 py-2 rounded-full text-sm border ${cat === c ? "bg-white text-black font-medium scale-105 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "bg-transparent hover:bg-white/10 text-white/70 border-white/20"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {!items.length && <p className="text-center text-white/50 py-10">No projects yet. Add some from the admin panel.</p>}
          
          {/* Pinterest Style Layout (Images adapt to their actual size) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {items.map((p) => (
              <div 
                key={p.id} 
                onClick={() => setSelectedProject(p)}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-[#050505] cursor-pointer border border-white/5 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-2"
              >
                {/* Natural height image with smooth zoom on hover */}
                <img src={p.cover_image} alt={p.title} className="w-full h-auto object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" />
                
                {/* Dark Gradient Overlay (Hidden by default, shows on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                
                {/* Text Container: Hidden by default, slides up and fades in on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-none">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-400 mb-1">
                      {p.category}
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

        {/* --- 3D Services Section --- */}
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
            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 overflow-hidden">
              <div className="text-blue-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-blue-300 transition-colors">Brand Identity</h4>
              <p className="text-white/50 text-sm leading-relaxed">From logo design and brand guidelines to core messaging, we create memorable identities.</p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-pink-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
              <div className="text-pink-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-pink-300 transition-colors">Digital Marketing</h4>
              <p className="text-white/50 text-sm leading-relaxed">Comprehensive performance marketing, social media management, and ad campaigns.</p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] transition-all duration-500 overflow-hidden">
              <div className="text-indigo-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-indigo-300 transition-colors">Packaging & Print</h4>
              <p className="text-white/50 text-sm leading-relaxed">Product packaging, brochures, and outdoor advertising assets engineered to stand out.</p>
            </div>

            <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
              <div className="text-yellow-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <h4 className="text-xl text-white mb-3 font-medium group-hover:text-yellow-300 transition-colors">Corporate Comm.</h4>
              <p className="text-white/50 text-sm leading-relaxed">Professional pitch decks, annual reports, and brand storybooks that convey trust.</p>
            </div>
          </div>
        </div>
      </EditorialShell>

      {/* --- Full View Popup (Modal) --- */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedProject(null)} // बाहर क्लिक करने पर बंद हो जाएगा
        >
          {/* Close Button (X) */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            onClick={() => setSelectedProject(null)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          {/* Modal Box */}
          <div 
            className="max-w-5xl w-full max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()} // अंदर क्लिक करने पर बंद नहीं होगा
          >
            {/* Image Section */}
            <div className="md:w-3/5 overflow-hidden bg-black/50 flex items-center justify-center">
              <img 
                src={selectedProject.cover_image} 
                alt={selectedProject.title} 
                className="w-full h-auto max-h-[50vh] md:max-h-[90vh] object-contain" 
              />
            </div>
            
            {/* Text/Details Section */}
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4 inline-block">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl md:text-5xl serif text-white mb-6 leading-tight">
                {selectedProject.title}
              </h2>
              {selectedProject.description && (
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
              )}
              {selectedProject.client && (
                <div className="mt-auto border-t border-white/10 pt-6">
                  <span className="text-white/40 text-sm uppercase tracking-wider block mb-1">Client</span>
                  <span className="text-white font-medium">{selectedProject.client}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
