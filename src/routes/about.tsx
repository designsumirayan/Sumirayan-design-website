import { createFileRoute } from "@tanstack/react-router";
import { EditorialShell } from "@/components/site/EditorialShell";
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Palette, 
  PenTool, 
  Camera, 
  Video, 
  Quote, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter 
} from "lucide-react";

// आपकी प्रोफाइल इमेज का सही पाथ (अगर पाथ अलग हो तो इसे बदल लें)
import profileImg from "@/assets/Sumit (2).jpeg"; 

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sumit Singh | Founder & CEO - Sumirayan Design" },
      { name: "description", content: "Sumit Singh is a renowned artist, photographer, graphic designer, and creative visionary." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* --- Cinematic Background Glow --- */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none z-0"></div>
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] animate-pulse delay-700 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-20 mt-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-xs font-semibold tracking-[0.2em] uppercase text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Briefcase className="w-3.5 h-3.5" /> Founder & CEO
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            Sumit Singh
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            Renowned artist, photographer, graphic designer, and creative visionary.
          </p>
        </div>

        {/* --- Main Content Grid (Sticky Layout) --- */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Sticky Profile Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 p-2 shadow-2xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <div className="rounded-[2rem] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src={profileImg} 
                  alt="Sumit Singh" 
                  className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700 ease-out"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {[
                { icon: Instagram, link: "#" },
                { icon: Facebook, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Twitter, link: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.link} 
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)] transition-all duration-300 active:scale-95"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Bio & Details */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Quote Section */}
            <div className="relative p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-xl overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
              <Quote className="absolute -right-6 -bottom-6 w-32 h-32 text-white/[0.03] rotate-12 group-hover:text-blue-500/[0.05] transition-colors duration-500" />
              <p className="relative z-10 text-2xl md:text-3xl serif italic text-white/90 leading-relaxed font-light">
                "A perfect blend of artistic excellence and modern digital innovation."
              </p>
            </div>

            {/* Biography Text */}
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
              <p>
                Sumit Singh is a renowned artist, photographer, graphic designer, and creative visionary known for his exceptional multi-dimensional talent in the world of art and digital media. His expertise spans across pencil and digital sketching, graphic designing, photography, video editing, branding, and digital business growth strategies.
              </p>
              <p>
                Particularly admired for his portrait art and creative illustrations, his work reflects a deep understanding of aesthetics and storytelling. Throughout his professional journey, he has worked with various companies as a graphic designer and flourished as a freelancer, delivering high-quality work in commercial painting, digital marketing, and logo design.
              </p>
              <p>
                Apart from his artistic expertise, his photography skills are highly appreciated for capturing emotions, stories, and aesthetics with remarkable creativity.
              </p>
            </div>

            {/* Education & Entrepreneurship Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] transition-all duration-500">
                <GraduationCap className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                <ul className="space-y-3 text-sm text-white/60">
                  <li><strong className="text-white/90 font-medium">MFA</strong> — Banaras Hindu University (BHU)</li>
                  <li><strong className="text-white/90 font-medium">BFA</strong> — College of Arts & Crafts, Patna University</li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-pink-500/50 hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.15)] transition-all duration-500">
                <Briefcase className="w-8 h-8 text-pink-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">Entrepreneurship</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Founded <strong className="text-white/90 font-medium">Sumirayan Design Pvt. Ltd.</strong> in 2024. Actively guiding businesses, startups, and leaders in building impactful digital identities.
                </p>
              </div>
            </div>

            {/* Core Expertise Pills */}
            <div className="pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">Core Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Digital Business Growth Strategies", icon: TrendingUp, color: "text-blue-400" },
                  { name: "Portrait Art & Illustration", icon: Palette, color: "text-purple-400" },
                  { name: "Graphic Design & Branding", icon: PenTool, color: "text-pink-400" },
                  { name: "Photography", icon: Camera, color: "text-cyan-400" },
                  { name: "Video Editing", icon: Video, color: "text-red-400" },
                ].map((skill, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:border-white/30 text-sm text-white/80 hover:text-white transition-all duration-300 cursor-default active:scale-95"
                  >
                    <skill.icon className={`w-4 h-4 ${skill.color}`} />
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-lg text-white/80 leading-relaxed font-light">
                With his visionary approach, creative excellence, and deep understanding of digital growth, Sumit Singh continues to inspire and transform brands through innovation and artistic brilliance.
              </p>
            </div>

          </div>
        </div>
      </div>
    </EditorialShell>
  );
}
