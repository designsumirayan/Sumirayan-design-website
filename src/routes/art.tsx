import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicArtItems } from "@/lib/content.functions";

export const Route = createFileRoute("/art")({
  head: () => ({
    meta: [
      { title: "Custom Wall Murals, Fine Art & Canvas Art in Patna | Sumirayan Design" },
      { name: "description", content: "Bespoke wall murals, digital paintings, and traditional art fusion for corporate offices, public spaces, and private interiors by Patna's top creative agency." },
      { property: "og:title", content: "Custom Wall Murals, Fine Art & Canvas Art in Patna | Sumirayan Design" },
      { property: "og:description", content: "Bespoke wall murals, digital paintings, and traditional art fusion for corporate offices, public spaces, and private interiors by Patna's top creative agency." },
    ],
  }),
  component: ArtPage,
});

function ArtPage() {
  const fn = useServerFn(publicArtItems);
  const { data = [] } = useQuery({ queryKey: ["public", "art"], queryFn: () => fn() });

  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      <div className="relative -mt-10 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-rose-500/20 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mt-12">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-white/70 shadow-lg">
            Art & Canvas
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            Fine Art, Wall Murals & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">Creative Expression</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            Original artwork, spatial mural installations, and cultural art integration engineered for commercial spaces, corporate environments, and fine art collections.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {!data.length && <p className="text-center text-white/50 py-10">No artwork yet. Add some from the admin panel.</p>}
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {data.map((p) => (
            <div key={p.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              
              <img src={p.cover_image} alt={p.title} className="w-full h-auto object-cover group-hover:scale-[1.05] transition duration-700" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                <h3 className="serif text-2xl text-white mb-2">{p.title}</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-medium">{p.category ?? "Fine Art"}</span>
                {p.description && <p className="text-white/60 text-sm mt-3 leading-relaxed line-clamp-2">{p.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl serif mb-6 text-white leading-tight">
            Blending Heritage & <br/><span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Modern Aesthetics</span>
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            As Patna's best advertising agency with deep roots in fine art, we seamlessly integrate fine art craftsmanship with modern commercial design. We turn blank walls and spaces into immersive artistic experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-amber-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] transition-all duration-500 overflow-hidden">
            <div className="text-amber-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-amber-300 transition-colors">Wall Murals & Public Art</h4>
            <p className="text-white/50 text-sm leading-relaxed">Large-scale wall paintings for corporate offices, government institutions, cafes, and public landmarks.</p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-fuchsia-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(217,70,239,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
            <div className="text-fuchsia-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-fuchsia-300 transition-colors">Digital Painting & Fine Art</h4>
            <p className="text-white/50 text-sm leading-relaxed">Custom digital art, portraits, and editorial illustrations designed for high-resolution print and digital media.</p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-orange-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.2)] transition-all duration-500 overflow-hidden">
            <div className="text-orange-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-orange-300 transition-colors">Custom Spatial Installations</h4>
            <p className="text-white/50 text-sm leading-relaxed">Bespoke art installations that reflect your brand’s heritage, culture, and core values.</p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-rose-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
            <div className="text-rose-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-rose-300 transition-colors">Office Decor & Interior Art</h4>
            <p className="text-white/50 text-sm leading-relaxed">Curated visual artwork tailored to enhance workplace environments and corporate spaces.</p>
          </div>

        </div>
      </div>

    </EditorialShell>
  );
}
