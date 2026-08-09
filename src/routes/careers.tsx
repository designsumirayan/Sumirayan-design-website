import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Briefcase, MapPin, Clock, ArrowUpRight, CheckCircle2, X, Send } from "lucide-react";
import { publicCareers } from "@/lib/content.functions";
import { submitContact } from "@/lib/portal.functions"; // Existing function to save applications to Inbox
import { EditorialShell } from "@/components/site/EditorialShell";
import { useState } from "react";

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

  // State to manage the Application Modal
  const [applyingFor, setApplyingFor] = useState<any>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // Reusing submitContact to send Job Applications directly to Admin Inbox
  const submitMut = useMutation({
    mutationFn: (v: any) => submitContact({ data: v }),
    onSuccess: () => {
      setFormSuccess(true);
      setTimeout(() => {
        setApplyingFor(null);
        setFormSuccess(false);
      }, 3000);
    },
    onError: () => {
      alert("Something went wrong. Please try again or email us directly.");
    }
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(fd.get("name"));
    const email = String(fd.get("email"));
    const phone = String(fd.get("phone"));
    const portfolio = String(fd.get("portfolio"));
    const coverLetter = String(fd.get("coverLetter"));

    // Formatted message to easily identify it in the Admin Inbox
    const formattedMessage = `JOB APPLICATION: ${applyingFor.title} (${applyingFor.department})\n\n📞 Phone: ${phone}\n🔗 Portfolio/Resume: ${portfolio}\n\n📝 Cover Letter / Details:\n${coverLetter}`;

    submitMut.mutate({
      name,
      email,
      company: `Applicant: ${applyingFor.title}`, // Appears in company field in Admin Panel
      message: formattedMessage
    });
  };

  // Safe Data Mapping
  const jobs = Array.isArray(rawJobs) ? rawJobs : [];
  const openJobs = jobs.filter((job: any) => job.is_open !== false);

  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* ─── HERO SECTION (Spacing Fixed) ─── */}
      {/* pt-32 ensures it stays below the navigation bar */}
      <div className="relative pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-cyan-300 shadow-lg">
            <Briefcase className="w-3.5 h-3.5" /> Join The Team
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-[1.1]">
            Build the future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Brands.</span>
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-colors duration-500 pointer-events-none"></div>

                <div className="flex-1 z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">
                    {job.department || "Creative & Media"}
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/50 mb-4">
                    <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                      <MapPin className="w-3.5 h-3.5" /> {job.location || "Patna, Bihar"}
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
                  <button 
                    onClick={() => setApplyingFor(job)}
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 active:scale-95 transition-transform"
                  >
                    Apply Now <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── APPLICATION FORM MODAL (POP-UP) ─── */}
      {applyingFor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="w-full max-w-lg bg-[#0a0f1e] border border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-white/5 relative shrink-0">
              <button 
                onClick={() => setApplyingFor(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold mb-2 block">Application Form</span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-white leading-tight">
                {applyingFor.title}
              </h2>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              {formSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">Application Sent!</h3>
                  <p className="text-white/60 text-sm">Thank you for applying. Our HR team will review your profile and get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-xs text-white/60 mb-1.5 block">Full Name *</span>
                      <input name="name" required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-colors" />
                    </label>
                    <label className="block">
                      <span className="text-xs text-white/60 mb-1.5 block">Email Address *</span>
                      <input name="email" required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-colors" />
                    </label>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-xs text-white/60 mb-1.5 block">Phone Number *</span>
                      <input name="phone" required type="tel" placeholder="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-colors" />
                    </label>
                    <label className="block">
                      <span className="text-xs text-white/60 mb-1.5 block">Portfolio / Drive Link *</span>
                      <input name="portfolio" required type="url" placeholder="Behance, Dribbble, GDrive link..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-colors" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs text-white/60 mb-1.5 block">Why are you a good fit? (Cover Letter)</span>
                    <textarea name="coverLetter" required rows={4} placeholder="Tell us about your experience..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-colors resize-none"></textarea>
                  </label>

                  <button 
                    type="submit" 
                    disabled={submitMut.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {submitMut.isPending ? "Submitting..." : "Submit Application"} <Send className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-white/40 mt-3">
                    By submitting, your details will be sent directly to our HR team.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </EditorialShell>
  );
}
