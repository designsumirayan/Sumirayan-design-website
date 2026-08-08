import { createFileRoute } from "@tanstack/react-router";
import { EditorialShell } from "@/components/site/EditorialShell";

export const Route = createFileRoute("/it-services")({
  head: () => ({
    meta: [
      { title: "Web Development & SEO Services in Patna | IT Solutions by Sumirayan Design" },
      { name: "description", content: "Rank #1 on Google with custom web development, SEO, UI/UX design, and digital marketing services from Patna's trusted creative and IT agency." },
      { property: "og:title", content: "Web Development & SEO Services in Patna | IT Solutions by Sumirayan Design" },
      { property: "og:description", content: "Rank #1 on Google with custom web development, SEO, UI/UX design, and digital marketing services from Patna's trusted creative and IT agency." },
    ],
  }),
  component: ITServicesPage,
});

function ITServicesPage() {
  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* --- IT & Tech Theme Hero Banner --- */}
      <div className="relative -mt-10 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Tech-inspired Glowing Orbs (Emerald & Cyan) */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mt-12">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-white/70 shadow-lg">
            Digital Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            Custom Web Development, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400">SEO & IT Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            Production-grade websites, web applications, search engine optimization, and custom digital infrastructure—built to match the highest design standards.
          </p>
        </div>
      </div>
      {/* --- End Hero Banner --- */}

      {/* --- 3D Technical Services Section --- */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl serif mb-6 text-white leading-tight">
            Performance-Driven <br/><span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">IT & SEO Solutions</span> in Patna
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            A powerful digital presence starts with a fast, responsive website and high search engine visibility. We combine tech stack excellence with conversion-focused design to ensure your business dominates local search results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Custom Web Development */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] transition-all duration-500 overflow-hidden">
            <div className="text-emerald-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-emerald-300 transition-colors">Custom Website Development</h4>
            <p className="text-white/50 text-sm leading-relaxed">High-speed, mobile-optimized, and secure websites built using modern frameworks.</p>
          </div>

          {/* Card 2: SEO */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
            <div className="text-cyan-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-cyan-300 transition-colors">Search Engine Optimization</h4>
            <p className="text-white/50 text-sm leading-relaxed">On-page, off-page, and local SEO strategies to help your business rank at the top for competitive keywords.</p>
          </div>

          {/* Card 3: UI/UX Design */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 overflow-hidden">
            <div className="text-blue-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-blue-300 transition-colors">UI/UX Design</h4>
            <p className="text-white/50 text-sm leading-relaxed">User-centric website and application interface designs focused on conversion optimization.</p>
          </div>

          {/* Card 4: Custom Software & CRM */}
          <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 hover:-translate-y-3 hover:bg-white/[0.04] hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] transition-all duration-500 overflow-hidden lg:mt-8">
            <div className="text-indigo-400 mb-6 group-hover:scale-110 group-hover:text-white transition-transform duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </div>
            <h4 className="text-xl text-white mb-3 font-medium group-hover:text-indigo-300 transition-colors">Custom Software & CRM</h4>
            <p className="text-white/50 text-sm leading-relaxed">Automated digital tools, custom web applications, and backend workflows to streamline your business operations.</p>
          </div>

        </div>
      </div>
      {/* --- End Services Section --- */}

    </EditorialShell>
  );
}
