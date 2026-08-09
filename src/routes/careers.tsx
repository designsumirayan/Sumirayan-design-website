import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Briefcase, MapPin, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { publicCareers } from "@/lib/content.functions";
import { EditorialShell } from "@/components/site/EditorialShell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Sumirayan Design | Join Our Creative Team" },
      { name: "description", content: "Looking for a career in design, photography, or digital marketing in Patna? Join Sumirayan Design and build powerful brands." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const fetchCareers = useServerFn(publicCareers);
  const { data: rawJobs = [], isLoading } = useQuery({ 
    queryKey: ["public", "careers"], 
    queryFn: () => fetchCareers() 
  });

  // Safe Data Mapping
  const jobs = Array.isArray(rawJobs) ? rawJobs : [];
  
  // Filter only currently open positions
  const openJobs = jobs.filter((job: any) => job.is_open !== false);

  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* ─── HERO SECTION ─── */}
      <div className="relative -mt-10 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-3xl mt-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-cyan-300 shadow-lg">
            <Briefcase className="w-3.5 h-3.5" /> Join The Team
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            Build the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Brands.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            We are always looking for passionate designers, developers, photographers, and thinkers to join our creative agency in Patna.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32 relative z-10">
        
        {/* ─── JOBS LISTING ─── */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="h-48 bg-white/5 rounded-3xl border border-white/10 animate-pulse"></div>
            ))}
          </div>
        ) : openJobs.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
            <CheckCircle2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-display text-white/80 mb-2">No open positions right now</h3>
            <p className="text-white/40 text-sm max-w-md mx-auto">We're fully staffed at the moment, but we're always open to meeting talented people. Feel free to send your portfolio to our email.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-display font-semibold text-white">Open Roles</h2>
              <span className="bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full">{openJobs.length}</span>
            </div>

            {openJobs.map((job: any) => (
              <div 
                key={job.id} 
                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 bg-[#050505] border border-white/10 hover:border-blue-500/50 rounded-3xl transition-all duration-500 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-colors duration-500 pointer-events-none"></div>

                <div className="flex-1 z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">
                    {job.department || "General"}
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/50 mb-4">
                    <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                      <MapPin className="w-3.5 h-3.5" /> {job.location || "Remote / Patna"}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                      <Clock className="w-3.5 h-3.5" /> {job.employment_type || "Full-time"}
                    </span>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed max-w-3xl line-clamp-2">
                    {job.summary}
                  </p>
                </div>

                <div className="z-10 shrink-0 mt-4 md:mt-0">
                  <a 
                    href={job.apply_url || `mailto:sumirayandesign@gmail.com?subject=Application for ${job.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 active:scale-95 transition-transform"
                  >
                    Apply Now <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </EditorialShell>
  );
}
