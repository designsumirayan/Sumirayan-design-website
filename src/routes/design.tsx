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

  const categories = useMemo(() => ["All", ...Array.from(new Set(data.map((d) => d.category)))], [data]);
  const items = cat === "All" ? data : data.filter((d) => d.category === cat);
  const [featured, ...rest] = items;

  return (
    <EditorialShell
      eyebrow="Portfolio"
      title={<>The <em className="not-italic text-[#c9a84c]">Design & Branding</em> Portfolio</>}
      intro="Strategic identity systems, high-converting digital marketing campaigns, and compelling visual storytelling crafted by the best advertising agency in Patna."
    >
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip transition ${cat === c ? "bg-[#0a0a0a] text-[#f5f3ee] border-[#0a0a0a]" : "hover:bg-white/10 text-white/70"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {!items.length && <p className="text-white/50">No projects yet. Add some from the admin panel.</p>}
      
      {featured && (
        <a href={featured.project_url ?? "#"} className="block group mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8 aspect-[16/10] overflow-hidden paper-card">
              <img src={featured.cover_image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-700" />
            </div>
            <div className="md:col-span-4">
              <div className="text-[0.7rem] uppercase tracking-[0.28em] text-white/50">Featured — 01</div>
              <h2 className="serif text-4xl md:text-5xl mt-3 text-white">{featured.title}</h2>
              <p className="mt-4 text-white/70">{featured.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/60">
                {featured.client && <span><em className="not-italic text-white/40">Client · </em>{featured.client}</span>}
                {featured.year && <span><em className="not-italic text-white/40">Year · </em>{featured.year}</span>}
                <span className="chip text-white">{featured.category}</span>
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
              <h3 className="serif text-2xl md:text-3xl leading-tight text-white">{p.title}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 shrink-0">{p.category}</span>
            </div>
            {p.description && <p className="mt-2 text-white/60 text-sm leading-relaxed">{p.description}</p>}
          </a>
        ))}
      </div>

      {/* --- New Attractive Content Section --- */}
      <div className="mt-32 max-w-6xl mx-auto border-t border-white/10 pt-20 pb-12">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Gradient Heading & Intro */}
          <div className="md:col-span-5 sticky top-24">
            <h2 className="text-4xl md:text-5xl serif mb-6 bg-gradient-to-br from-blue-400 via-indigo-300 to-pink-300 bg-clip-text text-transparent leading-[1.1]">
              Transform Your Business with Patna’s Best Advertising Agency
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              To stand out in today’s competitive market, a brand needs more than just a logo—it needs a distinct visual voice. As a leading advertising agency in Patna, we combine creative strategy with deep market insights to build brands that capture attention and drive business growth.
            </p>
          </div>

          {/* Right Side: Services List in a modern layout */}
          <div className="md:col-span-7">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <h3 className="text-2xl md:text-3xl serif mb-10 text-white border-b border-white/10 pb-6">
                Our Core Design & Branding Services
              </h3>
              
              <div className="space-y-10">
                <div className="group">
                  <h4 className="text-xl text-blue-300 mb-2 group-hover:text-pink-300 transition-colors">Brand Identity & Strategy</h4>
                  <p className="text-slate-400 leading-relaxed">From logo design and brand guidelines to core messaging, we create memorable brand identities that resonate with your target audience.</p>
                </div>
                
                <div className="group">
                  <h4 className="text-xl text-blue-300 mb-2 group-hover:text-pink-300 transition-colors">Digital Marketing & Campaign Planning</h4>
                  <p className="text-slate-400 leading-relaxed">Comprehensive performance marketing, social media management, and ad campaign execution designed for high ROI.</p>
                </div>
                
                <div className="group">
                  <h4 className="text-xl text-blue-300 mb-2 group-hover:text-pink-300 transition-colors">Packaging & Print Design</h4>
                  <p className="text-slate-400 leading-relaxed">Product packaging, brochures, corporate collaterals, and outdoor advertising assets engineered to stand out on shelves and streets.</p>
                </div>
                
                <div className="group">
                  <h4 className="text-xl text-blue-300 mb-2 group-hover:text-pink-300 transition-colors">Corporate Communication</h4>
                  <p className="text-slate-400 leading-relaxed">Professional pitch decks, annual reports, and brand storybooks that convey trust and authority.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* --- End of New Section --- */}

    </EditorialShell>
  );
}
