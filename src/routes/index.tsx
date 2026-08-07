import { createFileRoute } from "@tanstack/react-router";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Palette, 
  Star, 
  MapPin, 
  CheckCircle2,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Layers,
  Laptop,
  Camera,
  Paintbrush,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  Quote,
  Navigation,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Award,
  TrendingUp,
  Users,
  Zap,
  Globe,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Footer as UniversalFooter } from "@/components/landing/Footer";

import logoUrl from "@/assets/sumirayan design.png";

// ─── 1. ROUTE DEFINITION ────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Advertising Agency in Patna | Sumirayan Design" },
      { name: "description", content: "Sumirayan Design – The #1 advertising and creative agency in Patna, Bihar. Expert in branding, digital marketing, photography, videography & art. Trusted by 50+ brands." },
      { name: "keywords", content: "advertising agency patna, best design agency patna, digital marketing patna, branding agency bihar, creative agency patna, sumirayan design" },
      { property: "og:title", content: "Best Advertising Agency in Patna | Sumirayan Design" },
      { property: "og:description", content: "Patna's most trusted creative studio. Design, Photography, Videography, and Art — all under one roof." },
      { property: "og:type", content: "website" },
      { name: "geo.region", content: "IN-BR" },
      { name: "geo.placename", content: "Patna, Bihar" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Index,
});

// ─── GLOBAL INLINED STYLES ──────────────────────────────────────────────────────
function CustomStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');

      :root {
        --brand: #1f5fb7;
        --brand2: #e63027;
        --dark: #050810;
        --dark2: #0a0f1e;
        --gradient-brand: linear-gradient(135deg, var(--brand), var(--brand2));
        --bg-primary: linear-gradient(135deg, rgba(31,95,183,0.95) 0%, rgba(5,8,16,0.98) 50%, rgba(230,48,39,0.95) 100%);
      }
      
      .main-background {
        background: var(--bg-primary);
        background-attachment: fixed;
      }

      .text-gradient-brand {
        background: var(--gradient-brand);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .bg-gradient-brand { background: var(--gradient-brand); }

      /* Hand-drawn annotation text */
      .hand-text {
        font-family: 'Caveat', cursive;
      }

      /* 3D Card Tilt */
      .card-3d {
        transform-style: preserve-3d;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        will-change: transform;
      }
      .card-3d:hover {
        transform: perspective(800px) rotateX(-4deg) rotateY(6deg) translateY(-8px) scale(1.02);
        box-shadow: 20px 30px 60px -10px rgba(0,0,0,0.6), 0 0 30px rgba(31,95,183,0.15);
      }
      .card-3d-red:hover {
        box-shadow: 20px 30px 60px -10px rgba(0,0,0,0.6), 0 0 30px rgba(230,48,39,0.15);
      }

      /* Floating 3D Objects */
      @keyframes float3d {
        0%, 100% { transform: translateY(0px) rotateX(0deg) rotateZ(0deg); }
        33% { transform: translateY(-18px) rotateX(8deg) rotateZ(3deg); }
        66% { transform: translateY(-8px) rotateX(-4deg) rotateZ(-2deg); }
      }
      @keyframes float3d-b {
        0%, 100% { transform: translateY(0px) rotateY(0deg) rotateZ(0deg); }
        50% { transform: translateY(-14px) rotateY(10deg) rotateZ(-4deg); }
      }
      @keyframes spin3d {
        from { transform: rotateY(0deg) rotateX(10deg); }
        to { transform: rotateY(360deg) rotateX(10deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }
      .float-a { animation: float3d 6s ease-in-out infinite; }
      .float-b { animation: float3d-b 8s ease-in-out infinite; }
      .float-c { animation: float3d 10s ease-in-out infinite reverse; }
      .spin3d-slow { animation: spin3d 12s linear infinite; transform-style: preserve-3d; }
      .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }

      /* Premium Button */
      .btn-premium {
        position: relative;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      .btn-premium::before {
        content: '';
        position: absolute;
        top: 0; left: -100%; width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: all 0.5s ease;
      }
      .btn-premium:hover::before { left: 100%; }
      .btn-premium:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(31,95,183,0.3);
      }

      /* Marquee */
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee-fast { animation: marquee 15s linear infinite; }
      .animate-marquee-slow { animation: marquee 30s linear infinite; }

      /* Counter */
      @keyframes countUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .count-anim { animation: countUp 0.6s ease forwards; }

      /* 3D Cube */
      .cube-wrapper {
        width: 80px; height: 80px;
        perspective: 400px;
        display: flex; align-items: center; justify-content: center;
      }
      .cube {
        width: 50px; height: 50px;
        transform-style: preserve-3d;
        animation: spin3d 8s linear infinite;
        position: relative;
      }
      .cube-face {
        position: absolute;
        width: 50px; height: 50px;
        border: 1px solid rgba(31,95,183,0.5);
        display: flex; align-items: center; justify-content: center;
      }
      .cube-face.front { background: rgba(31,95,183,0.15); transform: rotateY(0deg) translateZ(25px); }
      .cube-face.back { background: rgba(31,95,183,0.10); transform: rotateY(180deg) translateZ(25px); }
      .cube-face.left { background: rgba(31,95,183,0.08); transform: rotateY(-90deg) translateZ(25px); }
      .cube-face.right { background: rgba(31,95,183,0.08); transform: rotateY(90deg) translateZ(25px); }
      .cube-face.top { background: rgba(31,95,183,0.05); transform: rotateX(90deg) translateZ(25px); }
      .cube-face.bottom { background: rgba(31,95,183,0.05); transform: rotateX(-90deg) translateZ(25px); }

      /* 3D Diamond */
      .diamond-3d {
        width: 60px; height: 60px;
        background: linear-gradient(135deg, rgba(230,48,39,0.3), rgba(230,48,39,0.05));
        transform: rotate(45deg) perspective(200px) rotateX(20deg);
        border: 1px solid rgba(230,48,39,0.4);
        box-shadow: inset 0 0 20px rgba(230,48,39,0.1), 4px 8px 20px rgba(230,48,39,0.2);
        animation: float3d-b 7s ease-in-out infinite;
      }
      .sphere-3d {
        width: 80px; height: 80px; border-radius: 50%;
        background: radial-gradient(ellipse at 30% 25%, rgba(31,95,183,0.6), rgba(31,95,183,0.05) 70%);
        border: 1px solid rgba(31,95,183,0.3);
        box-shadow: inset -10px -10px 20px rgba(0,0,0,0.4), inset 5px 5px 15px rgba(31,95,183,0.3), 0 10px 30px rgba(31,95,183,0.2);
        animation: float3d 9s ease-in-out infinite;
      }
      .pyramid-3d {
        width: 0; height: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-bottom: 55px solid rgba(31,95,183,0.25);
        filter: drop-shadow(0 8px 16px rgba(31,95,183,0.3));
        animation: float3d-b 11s ease-in-out infinite;
      }
      .torus-ring {
        width: 70px; height: 70px; border-radius: 50%;
        border: 10px solid transparent;
        border-top-color: rgba(230,48,39,0.6);
        border-left-color: rgba(230,48,39,0.3);
        box-shadow: 0 0 20px rgba(230,48,39,0.2);
        animation: spin3d 5s linear infinite;
      }

      /* Grid lines bg */
      .grid-bg {
        background-image: linear-gradient(rgba(31,95,183,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(31,95,183,0.06) 1px, transparent 1px);
        background-size: 50px 50px;
      }
      .dot-bg {
        background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
        background-size: 30px 30px;
      }

      /* Scrollbar */
      .custom-scrollbar::-webkit-scrollbar { width: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: var(--dark); }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--brand); }

      /* Neon border on hover */
      .neon-hover {
        transition: box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .neon-hover:hover {
        border-color: rgba(31,95,183,0.6) !important;
        box-shadow: 0 0 20px rgba(31,95,183,0.2), inset 0 0 20px rgba(31,95,183,0.03);
      }

      /* Stats counter */
      .stat-number {
        font-variant-numeric: tabular-nums;
      }
    `}} />
  );
}

// ─── 2. TOP ANNOUNCEMENT TICKER ──────────────────────────────────────────────────
function AnnouncementBanner() {
  const announcements = [
    "🏆 Ranked #1 Creative Agency in Patna, Bihar",
    "📣 Now Hiring: Senior Video Editor & UI Designer",
    "🚀 New Project: Tech Startup Rebrand — Artitech",
    "🎓 Internship 2026 — Limited Seats Available!",
    "📍 Serving Clients Across Patna, Bihar & PAN India",
  ];
  const combinedList = [...announcements, ...announcements, ...announcements];

  return (
    <div className="w-full bg-[#e63027] text-white text-[11px] font-bold tracking-wider uppercase py-2 overflow-hidden relative z-50 border-b border-white/20 select-none">
      <div className="inline-flex whitespace-nowrap animate-marquee-fast">
        {combinedList.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 px-8">
            <span>{text}</span>
            <span className="text-white/40">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 3. PREMIUM NAVBAR ──────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Design", href: "/design" },
    { name: "Photography", href: "/photography" },
    { name: "Art & Canvas", href: "/art" },
    { name: "Blog", href: "/blog" },
    { name: "Learn", href: "/learn" },
    { name: "Events", href: "/events" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed z-50 left-1/2 -translate-x-1/2 w-[min(1400px,calc(100%-2rem))] transition-all duration-300 rounded-full",
          scrolled || mobileOpen
            ? "top-4 bg-[#050810]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] py-3 px-6"
            // Changed bg-black/10 to bg-[#0a0f1e]/80 for a dark blue default background
            : "top-12 bg-[#0a0f1e]/80 backdrop-blur-md border border-white/10 py-4 px-8"
        )}
      >
        <div className="flex items-center justify-between relative w-full">
          
          <a href="/" className="flex items-center shrink-0 group gap-3">
            <img src={logoUrl} alt="Sumirayan Design" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="font-black text-white text-base tracking-wide hidden lg:block"></span>
          </a>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-[11px] lg:text-xs font-bold text-white/70 hover:text-white uppercase tracking-widest transition-all hover:bg-white/5 rounded-full whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end shrink-0">
            <a href="/auth" className="btn-premium inline-flex items-center rounded-full bg-white text-[#1f5fb7] px-7 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
              Get Started
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-50"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-4 right-4 z-40 bg-[#0a0f1e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-sm font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="h-[1px] bg-white/10 w-full" />
            
            <div className="flex flex-col gap-3">
              <a href="/contact" onClick={() => setMobileOpen(false)} className="w-full py-3 text-center rounded-xl bg-white text-black text-sm font-black uppercase tracking-wider shadow-lg">
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// ─── 4. HERO SECTION — MOUSE-DRIVEN SCROLLING GALLERY ─────────────────────────
// 21 Total Images for Hero Gallery
const heroGalleryImages = [
  "https://picsum.photos/id/1015/500/700",
  "https://picsum.photos/id/1027/500/700",
  "https://picsum.photos/id/1043/500/700",
  "https://picsum.photos/id/1074/500/700",
  "https://picsum.photos/id/1084/500/700",
  "https://picsum.photos/id/1062/500/700",
  "https://picsum.photos/id/1080/500/700",
  "https://picsum.photos/id/1050/500/700",
  "https://picsum.photos/id/1041/500/700",
  "https://picsum.photos/id/1011/500/700",
  "https://picsum.photos/id/1012/500/700",
  "https://picsum.photos/id/1013/500/700",
  "https://picsum.photos/id/1014/500/700",
  "https://picsum.photos/id/1016/500/700",
  "https://picsum.photos/id/1018/500/700",
  "https://picsum.photos/id/1019/500/700",
  "https://picsum.photos/id/1020/500/700",
  "https://picsum.photos/id/1021/500/700",
  "https://picsum.photos/id/1022/500/700",
  "https://picsum.photos/id/1023/500/700",
  "https://picsum.photos/id/1024/500/700",
];

// Small hand-drawn style curved arrow, used for the annotation callouts
function CurvedArrow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      width="86"
      height="64"
      viewBox="0 0 86 64"
      fill="none"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M4 6 C 34 2, 66 16, 76 50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M64 44 L76 50 L68 60" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// The photo strip that pans left/right as the mouse moves across the hero
function ScrollGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 55, damping: 20, mass: 0.6 });

  // Expanding meta data to accommodate 21 images
  const cardMeta = [
    { rotate: -7, dy: 14 }, { rotate: 4, dy: -16 }, { rotate: -3, dy: 8 },
    { rotate: 6, dy: -10 }, { rotate: -5, dy: 16 }, { rotate: 3, dy: -12 },
    { rotate: -8, dy: 10 }, { rotate: 5, dy: -8 }, { rotate: -4, dy: 12 },
    { rotate: 7, dy: -14 }, { rotate: -6, dy: 15 }, { rotate: 4, dy: -9 },
    { rotate: -3, dy: 11 }, { rotate: 5, dy: -13 }, { rotate: -7, dy: 9 },
    { rotate: 6, dy: -15 }, { rotate: -4, dy: 14 }, { rotate: 3, dy: -11 },
    { rotate: -5, dy: 10 }, { rotate: 8, dy: -12 }, { rotate: -6, dy: 13 },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const clamped = Math.min(1, Math.max(0, relX));
    // Adjusted maxShift to allow traversing the new 21-image gallery
    const maxShift = 1100; 
    x.set((clamped - 0.5) * -2 * maxShift);
  };

  const handleMouseLeave = () => x.set(0);

  return (
    <div
      ref={trackRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden select-none"
      style={{ cursor: "ew-resize" }}
    >
      <motion.div style={{ x: smoothX }} className="flex items-center gap-4 px-8 w-max py-6">
        {heroGalleryImages.map((src, i) => (
          <div
            key={src + i}
            className="shrink-0 rounded-[20px] overflow-hidden border-4 border-white/90 shadow-[0_25px_45px_rgba(0,0,0,0.4)]"
            style={{
              width: 140,   // Reduced size to easily fit desktop viewport height
              height: 200,  // Reduced size to easily fit desktop viewport height
              transform: `rotate(${cardMeta[i].rotate}deg) translateY(${cardMeta[i].dy}px)`,
            }}
          >
            <img
              src={src}
              alt="Sumirayan Design creative work sample"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      // Swapped min-h-screen to h-screen to strictly fit inside a desktop view without vertical scrolling
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-28 pb-8"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center mt-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span className="text-xs tracking-wide text-white font-bold">Trusted by 150+ Brands Across Bihar</span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-tight text-white leading-[1.03] mb-5 drop-shadow-2xl"
        >
          Creative Work That
          <br />
          Moves Patna Forward
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-medium drop-shadow-md"
        >
          Design, photography, and art that turns Bihar's boldest brands into the ones people remember. Our studio is ready to bring your vision to life.
        </motion.p>
      </div>

      <div className="relative w-full mt-8 z-10 mb-auto">
        <div className="hidden lg:flex flex-col items-center absolute -top-8 right-[12%] z-20 hand-text text-white rotate-3">
          <span className="text-2xl leading-none drop-shadow-md">Real studio work</span>
          <CurvedArrow className="-mt-1" />
        </div>

        <ScrollGallery />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 flex items-center gap-4 mb-4"
      >
        <div className="hidden lg:flex flex-col items-end -mb-2 hand-text text-white -rotate-6">
          <span className="text-2xl leading-none drop-shadow-md">It's free to talk</span>
          <CurvedArrow flip className="-mt-1 -mr-4" />
        </div>

        <a
          href="/contact"
          className="btn-premium inline-flex items-center rounded-full px-10 py-4 text-sm font-black uppercase tracking-widest text-[#1f5fb7] bg-white shadow-[0_12px_30px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-transform"
        >
          Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </motion.div>
    </section>
  );
}

// ─── 5. TRUST / SOCIAL PROOF BAR ───────────────────────────────────────────────
const brandNames = [
  "Foundation Academy", "ArchBuilds", "Artitech", "Rexine House",
  "Birdcarts", "Yogesh Architect", "Raj Automobiles", "Gorkhnath IAS",
  "Sankalp Civil Services", "ShopEasy Patna", "BiharTech Hub", "Nalanda Edu",
];

function TrustBar() {
  const doubled = [...brandNames, ...brandNames];
  return (
    <div className="py-6 bg-black/40 backdrop-blur-xl border-y border-white/10 overflow-hidden relative z-20">
      <p className="text-center text-[10px] uppercase tracking-widest text-white/50 font-bold mb-4">Trusted by leading brands across Bihar</p>
      <div className="flex overflow-hidden">
        <div className="inline-flex whitespace-nowrap animate-marquee-slow gap-12 items-center">
          {doubled.map((name, i) => (
            <span key={i} className="text-white/40 font-black text-sm uppercase tracking-widest px-4 hover:text-white/80 transition-colors cursor-default">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 6. WHY CHOOSE US — 3D CARDS ───────────────────────────────────────────────
const whyData = [
  { icon: <Award className="w-7 h-7" />, title: "Award-Winning Creative", desc: "Our work has been recognized for excellence in design and brand strategy across Bihar.", color: "#1f5fb7" },
  { icon: <MapPin className="w-7 h-7" />, title: "Based in Patna", desc: "We're local. We understand Bihar's market, culture, and consumer behavior deeply.", color: "#e63027" },
  { icon: <TrendingUp className="w-7 h-7" />, title: "ROI-Driven Strategy", desc: "Every design decision is tied to measurable business growth and campaign performance.", color: "#1f5fb7" },
  { icon: <Users className="w-7 h-7" />, title: "150+ Happy Brands", desc: "From startups to established enterprises — our clients keep coming back.", color: "#e63027" },
  { icon: <Zap className="w-7 h-7" />, title: "Fast Turnaround", desc: "We deliver without compromising quality. Standard projects shipped in 5–7 business days.", color: "#1f5fb7" },
  { icon: <Shield className="w-7 h-7" />, title: "100% Satisfaction", desc: "We revise until you love it. No hidden costs. No surprises.", color: "#e63027" },
];

function WhyChooseUs() {
  return (
    <section className="py-24 px-6 bg-black/20 dot-bg relative overflow-hidden z-20">
      <div className="absolute top-10 right-10 float-a opacity-20 hidden lg:block">
        <div className="sphere-3d" style={{ width: "120px", height: "120px" }} />
      </div>
      <div className="absolute bottom-10 left-10 float-b opacity-15 hidden lg:block">
        <div className="cube-wrapper" style={{ width: "100px", height: "100px" }}>
          <div className="cube" style={{ width: "70px", height: "70px" }}>
            {["front","back","left","right","top","bottom"].map(f => (
              <div key={f} className={`cube-face ${f}`} style={{ width: "70px", height: "70px", transform: f === "front" ? "rotateY(0deg) translateZ(35px)" : f === "back" ? "rotateY(180deg) translateZ(35px)" : f === "left" ? "rotateY(-90deg) translateZ(35px)" : f === "right" ? "rotateY(90deg) translateZ(35px)" : f === "top" ? "rotateX(90deg) translateZ(35px)" : "rotateX(-90deg) translateZ(35px)" }} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest backdrop-blur-sm">
            <Star className="w-3.5 h-3.5" /> Why Sumirayan Design
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Patna's Most Trusted<br />
            <span className="text-white/90">Creative Partner</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto font-medium">
            We don't just make things look good — we make them work harder for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={cn("card-3d neon-hover bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 cursor-default", i % 2 !== 0 && "card-3d-red")}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg bg-white/10 border border-white/20">
                {React.cloneElement(item.icon, { className: "w-7 h-7 text-white" })}
              </div>
              <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/70 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. INTERNSHIP PROGRAM ────────────────────────────────────────────────────
const internshipTracks = [
  { icon: "🎨", name: "Graphic Design" },
  { icon: "🎬", name: "Video Editing" },
  { icon: "📸", name: "Photography" },
  { icon: "🎥", name: "Videography" },
  { icon: "📱", name: "Social Media" },
  { icon: "🤖", name: "AI Prompting" },
];

const internBenefits = [
  "Work on live client projects",
  "Industry-recognized certificate",
  "Portfolio building sessions",
  "Mentorship from professionals",
  "Internship letter & LOR",
];

function InternshipProgram() {
  return (
    <section id="internship" className="py-24 px-6 bg-black/40 relative border-y border-white/10 overflow-hidden z-20 backdrop-blur-sm">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden xl:block float-c">
        <div style={{ width: "300px", height: "300px", perspective: "600px" }}>
          <div className="torus-ring" style={{ width: "200px", height: "200px", borderWidth: "25px", borderTopColor: "#fff", borderLeftColor: "rgba(255,255,255,0.3)" }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest backdrop-blur-sm">
            <GraduationCap className="w-4 h-4" /> Education & Internship
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Creative & AI Internship 🚀
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
            Kick-start your career in Patna's fastest-growing design studio. 3-month hands-on program with real clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {internshipTracks.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card-3d flex flex-col items-center justify-center gap-3 p-6 bg-black/50 border border-white/10 rounded-2xl neon-hover cursor-default"
              >
                <div className="text-3xl">{track.icon}</div>
                <span className="text-sm font-bold text-white/90 text-center">{track.name}</span>
              </motion.div>
            ))}

            <div className="col-span-2 sm:col-span-3 bg-black/50 border border-white/10 rounded-2xl p-6">
              <p className="text-[11px] uppercase font-black tracking-widest text-white/60 mb-4">What you'll get</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {internBenefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/80 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-3d bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase font-black tracking-widest text-black bg-white px-3 py-1.5 rounded inline-block mb-4 shadow-lg">
                Limited Intake — 2026
              </span>
              <h4 className="text-2xl font-black text-white mb-2">Premium Track</h4>
              <p className="text-sm text-white/80 font-medium">Gain real studio experience with live client projects across Patna and beyond.</p>
            </div>

            <div className="border-y border-white/20 py-6 my-6 relative z-10">
              <span className="text-xs uppercase text-white/70 block font-bold tracking-widest mb-2">Enrollment Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">₹1,499</span>
                <span className="text-xs text-white/60 font-bold">/ 3 months</span>
              </div>
            </div>

            <a href="/learn" className="btn-premium w-full inline-flex items-center justify-center rounded-xl bg-white py-4 text-sm font-black uppercase tracking-widest text-black relative z-10 shadow-xl">
              Enroll Now <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 8. THREE PILLARS ─────────────────────────────────────────────────────────
const pillarsData = [
  {
    route: "/design",
    title: "Design & Brand",
    subtitle: "Visual Identity",
    icon: <Paintbrush className="w-8 h-8 text-[#1f5fb7]" />,
    items: [
      "Campaign Strategy",
      "Digital Marketing",
      "Corporate Communication",
      "Campaign",
      "Corporate Design",
      "Social Media Creatives",
    ],
    badge: "Most Popular",
  },
  {
    route: "/photography",
    title: "Lens & Motion",
    subtitle: "Media Production",
    icon: <Camera className="w-8 h-8 text-[#1f5fb7]" />,
    items: [
      "Commercial Shoots",
      "Event Coverage",
      "Product Photography",
      "Social Content",
      "Drone Videography",
      "Wedding Films",
    ],
  },
  {
    route: "/art",
    title: "Art & Canvas",
    subtitle: "Creative Expression",
    icon: <Palette className="w-8 h-8 text-[#1f5fb7]" />,
    items: [
      "Digital Painting",
      "Wall Murals",
      "Illustration",
      "Custom Installations",
      "Portrait Art",
      "Office Decor Art",
    ],
  },
  {
    route: "/it-services",
    title: "IT Services",
    subtitle: "Digital Solutions",
    icon: <Laptop className="w-8 h-8 text-[#1f5fb7]" />,
    badge: "New",
    items: [
      "Website Development",
      "Automation",
      "SEO",
      "CRM Development",
      "Paid Marketing",
      "Software Development",
      "UI/UX Design",
    ],
  },
];

function Pillars() {
  return (
    <section className="py-24 px-6 bg-black/20 relative overflow-hidden z-20">
      <div className="absolute top-20 right-20 float-b opacity-20 hidden xl:block">
        <div className="diamond-3d" style={{ width: "100px", height: "100px" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-left mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5" /> Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">Our Expertise</h2>
          <p className="text-white/80 text-lg max-w-2xl font-medium">
            Three distinct disciplines, one unified standard of excellence. Available across Patna, Bihar & PAN India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillarsData.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card-3d bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden shadow-2xl"
            >
              {pillar.badge && (
                <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full shadow-lg">
                  {pillar.badge}
                </div>
              )}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />

              <div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-1">{pillar.title}</h3>
                <p className="text-xs text-white/60 font-bold tracking-widest uppercase mb-6">{pillar.subtitle}</p>

                <ul className="space-y-3 mb-8">
                  {pillar.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-white opacity-90 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a href={pillar.route} className="w-full inline-flex items-center justify-between border-t border-white/20 pt-6 text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition-colors">
                Explore Service <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9. PORTFOLIO / CLIENTS GRID ──────────────────────────────────────────────
const clientList = [
  { name: "Foundation Academy", type: "Education", desc: "Brand identity & digital campaigns" },
  { name: "ArchBuilds", type: "Architecture", desc: "Commercial video production" },
  { name: "Artitech", type: "Tech Startup", desc: "Full rebrand & social media" },
  { name: "Rexine House", type: "Interior", desc: "Product photography & catalog" },
  { name: "Birdcarts", type: "E-Commerce", desc: "Digital marketing strategy" },
  { name: "Yogesh Architect", type: "Design", desc: "Portfolio & brand collateral" },
  { name: "Raj Automobiles", type: "Automotive", desc: "Showroom photography" },
  { name: "Gorkhnath IAS", type: "Political", desc: "Campaign design & print" },
  { name: "Sankalp Civil Services", type: "Coaching", desc: "Branding & social media" },
  { name: "BiharTech Hub", type: "Technology", desc: "Website design & SEO" },
  { name: "Nalanda Edu", type: "Education", desc: "Motion graphics & ads" },
  { name: "ShopEasy Patna", type: "Retail", desc: "Product & lifestyle shoots" },
];

function PortfolioGrid() {
  return (
    <section className="py-24 px-6 bg-black/30 border-y border-white/10 z-20 relative backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest backdrop-blur-sm">
              <Briefcase className="w-3.5 h-3.5" /> Our Work
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">Selected Clients</h2>
            <p className="text-white/80 text-lg max-w-xl font-medium">Brands and institutions across Patna & Bihar that trust our creative vision.</p>
          </div>
          <a href="/design" className="text-sm font-bold uppercase tracking-widest text-white bg-white/10 px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors inline-flex items-center gap-2 shrink-0 backdrop-blur-md">
            View All Work <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clientList.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="card-3d p-6 bg-black/40 border border-white/10 rounded-xl hover:bg-white/10 cursor-default group neon-hover backdrop-blur-md shadow-xl"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 block mb-1">{client.type}</span>
              <h4 className="text-base font-bold text-white group-hover:text-white/90 transition-colors mb-1">{client.name}</h4>
              <p className="text-[11px] text-white/50 font-medium">{client.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// ─── 10. NUMBERS / IMPACT SECTION ─────────────────────────────────────────────
const impactStats = [
  { val: "150+", label: "Brands Served", icon: <Briefcase className="w-6 h-6" />, sub: "Across Bihar & beyond" },
  { val: "1000+", label: "Projects Completed", icon: <CheckCircle2 className="w-6 h-6" />, sub: "On time, every time" },
  { val: "98%", label: "Client Retention", icon: <Star className="w-6 h-6" />, sub: "They keep coming back" },
  { val: "3+", label: "Years in Patna", icon: <Clock className="w-6 h-6" />, sub: "And still growing fast" },
];

function ImpactSection() {
  return (
    <section className="py-20 px-6 bg-transparent relative overflow-hidden z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {impactStats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-3d text-center p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl group neon-hover shadow-xl"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center text-white bg-white/10 border border-white/20 shadow-lg">
              {s.icon}
            </div>
            <div className="text-4xl font-black text-white mb-1 stat-number drop-shadow-md">{s.val}</div>
            <div className="text-sm font-bold text-white/90 mb-1">{s.label}</div>
            <div className="text-[11px] text-white/60 font-medium">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── 11. HOW WE WORK ──────────────────────────────────────────────────────────
const processSteps = [
  { num: "01", title: "Discovery", desc: "Deep consultation to understand your business, Patna market dynamics, and brand vision.", icon: <Globe className="w-5 h-5" /> },
  { num: "02", title: "Strategy", desc: "We map out a structured creative blueprint tailored to your specific goals and audience.", icon: <TrendingUp className="w-5 h-5" /> },
  { num: "03", title: "Execution", desc: "Our team crafts visual assets, campaigns, and media with meticulous attention to detail.", icon: <Zap className="w-5 h-5" /> },
  { num: "04", title: "Delivery", desc: "Seamless handover and deployment to ensure maximum market impact and visibility.", icon: <ArrowRight className="w-5 h-5" /> },
];

function HowWeWork() {
  return (
    <section className="py-24 px-6 bg-black/30 border-y border-white/10 relative overflow-hidden z-20 backdrop-blur-sm">
      <div className="absolute left-8 top-1/2 -translate-y-1/2 float-a opacity-20 hidden xl:block">
        <div className="pyramid-3d" style={{ borderLeftWidth: "50px", borderRightWidth: "50px", borderBottomWidth: "90px", filter: "drop-shadow(0 8px 16px rgba(255,255,255,0.3))" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest mb-4 backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5" /> Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
            From Brief to Brilliance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card-3d p-8 border-l-2 border-white/20 hover:border-white transition-colors relative bg-black/40 backdrop-blur-md rounded-r-2xl shadow-xl"
            >
              <div className="text-5xl font-black text-white/20 mb-4 leading-none">{step.num}</div>
              <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4 shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/70 text-sm font-medium leading-relaxed">{step.desc}</p>

              {i < processSteps.length - 1 && (
                <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 12. TESTIMONIALS ─────────────────────────────────────────────────────────
const testimonials = [
  { text: "Sumirayan Design executed our visual identity flawlessly. They understand the Patna market and deliver premium quality without exceeding structured budgets. Highly recommended to every institution in Bihar.", name: "Dr. Rahul Kumar Singh", role: "Nand International School , Patna" },
  { text: "Their commercial video campaigns instantly separated our firm from the competition. The team is deeply professional and creatively outstanding. Best agency in Patna — no contest.", name: "Lead Partner", role: "ArchBuilds, Patna" },
  { text: "From our logo to our entire social media presence, Sumirayan handled everything with excellence. Our brand now stands out in Patna's competitive market thanks to their work.", name: "Yogesh Shukla", role: "Artitech, Bihar" },
  { text: "The photography they delivered for our showroom was spectacular. Every image captured the essence of our brand perfectly. Professional, fast, and creative.", name: "MD", role: "Raj Automobiles, Patna" },
];

function Testimonials() {
  return (
    <section className="py-24 px-6 bg-black/20 relative overflow-hidden z-20">
      <div className="absolute top-10 right-10 float-b opacity-20 hidden lg:block">
        <div className="torus-ring" style={{ width: "120px", height: "120px", borderWidth: "15px", borderTopColor: "#fff", borderLeftColor: "rgba(255,255,255,0.3)" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest backdrop-blur-sm">
            <Quote className="w-3.5 h-3.5" /> Client Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            What Patna Brands Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card-3d bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden neon-hover shadow-2xl"
            >
              <div className="absolute top-6 right-8 text-6xl text-white/10 font-black select-none">"</div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-white/90 text-base font-medium leading-relaxed mb-8 drop-shadow-sm">"{t.text}"</p>
              <div>
                <h4 className="text-base font-bold text-white">{t.name}</h4>
                <span className="text-[11px] font-black uppercase tracking-widest text-white/70">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 13. LOCATION / MAP SECTION ────────────────────────────────────────────────
function LocationSection() {
  return (
    <section id="location" className="py-24 px-6 bg-black/40 border-y border-white/10 relative overflow-hidden z-20 backdrop-blur-sm">
      <div className="absolute right-0 top-0 opacity-20 pointer-events-none float-a hidden xl:block">
        <div className="sphere-3d" style={{ width: "200px", height: "200px" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest mb-4 backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5" /> Find Us in Patna
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                Visit Our Studio<br />
                <span className="text-white/90">in the Heart of Patna</span>
              </h2>
              <p className="text-white/80 mt-4 text-base font-medium leading-relaxed">
                We're proud to be Patna's home-grown creative studio. Walk into our studio for a free consultation, coffee, and a conversation about your brand's future.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />, label: "Studio Address", val: "Sumirayan Design Pvt. Ltd., Boring Road, Patna, Bihar — 800001" },
                { icon: <Phone className="w-5 h-5 text-white shrink-0" />, label: "Call Us", val: "+91 89368 41201" },
                { icon: <Mail className="w-5 h-5 text-white shrink-0" />, label: "Email", val: "sumirayandesign@gmail.com" },
                { icon: <Clock className="w-5 h-5 text-white shrink-0" />, label: "Studio Hours", val: "Mon–Sat: 10 AM – 7 PM IST" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl neon-hover shadow-xl">
                  {item.icon}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/60 font-black block">{item.label}</span>
                    <span className="text-sm font-bold text-white">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href="https://maps.google.com/?q=Boring+Road+Patna+Bihar"
                target="_blank" rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-black uppercase tracking-wider shadow-lg"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>
              <a
                href="https://wa.me/919123456789"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-black/40 text-white px-6 py-3 text-sm font-black uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="card-3d rounded-3xl overflow-hidden border border-white/20 relative shadow-2xl" style={{ height: "480px" }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-10">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 400 480" preserveAspectRatio="none">
                  <line x1="0" y1="240" x2="400" y2="240" stroke="rgba(255,255,255,0.4)" strokeWidth="6" />
                  <line x1="200" y1="0" x2="200" y2="480" stroke="rgba(255,255,255,0.4)" strokeWidth="6" />
                  <line x1="0" y1="160" x2="400" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <line x1="0" y1="320" x2="400" y2="320" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <line x1="133" y1="0" x2="133" y2="480" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <line x1="266" y1="0" x2="266" y2="480" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <path d="M 0 420 Q 100 410 200 430 Q 300 450 400 430" stroke="rgba(255,255,255,0.5)" strokeWidth="12" fill="none" strokeLinecap="round" />
                  <text x="10" y="440" fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="monospace">Ganga River →</text>
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-20">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.6)] float-a">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div className="w-3 h-3 bg-white rotate-45 -mt-1.5 shadow-md" />
                  </div>
                  <div className="mt-3 bg-black/80 border border-white/20 rounded-xl px-4 py-2 text-center whitespace-nowrap backdrop-blur-sm shadow-xl">
                    <p className="text-xs font-black text-white">Sumirayan Design</p>
                    <p className="text-[10px] text-white/70">Boring Road, Patna</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-xl p-3 flex items-center justify-between border border-white/10 backdrop-blur-md shadow-xl">
                  <div>
                    <p className="text-xs font-black text-white">Patna, Bihar</p>
                    <p className="text-[10px] text-white/70">25.5941° N, 85.1376° E</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Boring+Road+Patna+Bihar"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-black text-white uppercase tracking-wider hover:text-gray-300 transition-colors"
                  >
                    Open Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 14. CTA / CONTACT FORM ────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-24 px-6 bg-transparent relative overflow-hidden z-20">
      <div className="absolute left-10 top-20 float-b opacity-20 hidden lg:block">
        <div className="diamond-3d" />
      </div>
      <div className="absolute right-10 bottom-20 float-a opacity-20 hidden lg:block">
        <div className="sphere-3d" style={{ width: "60px", height: "60px" }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-[11px] text-white font-black uppercase tracking-widest mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" /> Start a Project
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-md">Let's Build Together</h2>
        <p className="text-white/80 text-lg mb-12 drop-shadow-sm">
          Based in Patna, serving Bihar & PAN India. Drop us a line and we'll reach out within 24 hours.
        </p>

        <div className="bg-black/50 border border-white/20 rounded-3xl p-8 md:p-12 text-left shadow-2xl backdrop-blur-xl" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)" }}>
          {sent ? (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white drop-shadow-md">Request Received!</h3>
              <p className="text-white/80 mt-2">Our Patna team will be in touch within 24 hours.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-white underline hover:text-gray-300">Submit another enquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/70 font-bold block mb-2">Your Name *</label>
                  <input required type="text" placeholder="Rahul Kumar" className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder:text-white/40" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/70 font-bold block mb-2">Email Address *</label>
                  <input required type="email" placeholder="rahul@company.com" className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder:text-white/40" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/70 font-bold block mb-2">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder:text-white/40" />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/70 font-bold block mb-2">Service Needed</label>
                  <select value={service} onChange={e => setService(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors" style={{ color: service ? "white" : "rgba(255,255,255,0.4)" }}>
                    <option value="" disabled className="text-black">Select a service</option>
                    <option value="design" className="text-black">Design & Branding</option>
                    <option value="photo" className="text-black">Photography & Video</option>
                    <option value="art" className="text-black">Art & Canvas</option>
                    <option value="marketing" className="text-black">Digital Marketing</option>
                    <option value="internship" className="text-black">Internship</option>
                    <option value="other" className="text-black">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-white/70 font-bold block mb-2">Project Details *</label>
                <textarea required rows={4} placeholder="Tell us about your brand, project goals, and timeline..." className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors resize-none placeholder:text-white/40" />
              </div>
              <button type="submit" className="w-full btn-premium rounded-xl bg-white text-black py-4 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl">
                Submit Request <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-white/50 text-center">We respond within 24 hours. Based in Patna, Bihar.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── 15. SEO TEXT SECTION ─────────────────────────────────────────────────────
function SeoSection() {
  return (
    <section className="py-16 px-6 bg-black/30 border-t border-white/10 z-20 relative backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-md">
          Best Advertising Agency in Patna, Bihar
        </h2>
        <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto">
          Sumirayan Design is Patna's top-rated creative and advertising agency, specializing in brand identity, digital marketing, commercial photography, videography, and custom art. Serving clients across Patna, Bihar, Jharkhand, UP, and PAN India, we bring global quality standards to local businesses. Whether you're a startup looking for your first brand identity or an established enterprise seeking a refreshed digital presence — Sumirayan Design delivers results-driven creative solutions that elevate your brand above the competition.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {["Advertising Agency Patna", "Design Studio Bihar", "Photography Patna", "Digital Marketing Bihar", "Branding Agency Patna", "Video Production Patna", "Logo Design Patna", "Social Media Agency Bihar"].map((tag, i) => (
            <span key={i} className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/20 bg-black/40 text-white/80 hover:text-white hover:border-white/40 transition-colors cursor-default shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 16. FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="pt-24 pb-8 px-6 bg-black/80 border-t border-white/20 relative overflow-hidden z-20 backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 text-left">
        <div className="md:col-span-4 space-y-6">
          <a href="/" className="flex items-center gap-3 group">
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-white shadow-md group-hover:scale-105 transition-transform">
              <img src={logoUrl} alt="Sumirayan Design" className="w-8 h-auto" />
            </div>
            <div>
              <span className="font-black text-lg text-white block drop-shadow-md">Sumirayan Design</span>
              <span className="text-[10px] text-white/60 uppercase tracking-widest">Patna, Bihar</span>
            </div>
          </a>
          <p className="text-white/70 text-sm font-medium max-w-xs leading-relaxed">
            Patna's #1 creative agency. Design, Photography, Videography & Art — crafting visual excellence for brands across Bihar and India.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 drop-shadow-sm">Services</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="/design" className="text-white/70 hover:text-white transition-colors">Design Identity</a></li>
            <li><a href="/photography" className="text-white/70 hover:text-white transition-colors">Photography</a></li>
            <li><a href="/art" className="text-white/70 hover:text-white transition-colors">Art & Canvas</a></li>
            <li><a href="/learn" className="text-white/70 hover:text-white transition-colors">Internships</a></li>
            <li><a href="/design" className="text-white/70 hover:text-white transition-colors">Digital Marketing</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 drop-shadow-sm">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog & Journal</a></li>
            <li><a href="/careers" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
            <li><a href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            <li><a href="#location" className="text-white/70 hover:text-white transition-colors">Find Our Studio</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 drop-shadow-sm">Stay Updated</h4>
          <p className="text-white/70 text-sm mb-4">Subscribe for creative insights, design trends, and Patna business news.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com" className="bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-white transition-colors placeholder:text-white/50" />
            <button className="bg-white hover:bg-gray-200 text-black px-4 py-3 rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-lg">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
            <p className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-2">Quick Contact</p>
            <a href="tel:+919123456789" className="flex items-center gap-2 text-sm font-bold text-white hover:text-gray-300 transition-colors">
              <Phone className="w-3.5 h-3.5" /> +91 89368 41201
            </a>
            <a href="mailto:hello@sumirayandesign.com" className="flex items-center gap-2 text-sm font-bold text-white hover:text-gray-300 transition-colors mt-1">
              <Mail className="w-3.5 h-3.5" /> sumirayandesign@gmai.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/60">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-white" />
          <p>© {new Date().getFullYear()} Sumirayan Design Pvt. Ltd. · Patna, Bihar · All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

// ─── 17. MAIN INDEX COMPOSER ──────────────────────────────────────────────────
export default function Index() {
  return (
    <main className="relative main-background text-white font-sans min-h-screen selection:bg-white selection:text-[#1f5fb7] overflow-x-hidden scroll-smooth custom-scrollbar">
      <CustomStyles />
      <AnnouncementBanner />
      <Navbar />
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <Pillars />
      <ImpactSection />
      <InternshipProgram />
      <PortfolioGrid />
      <HowWeWork />
      <Testimonials />
      <LocationSection />
      <Contact />
      <SeoSection />
      <UniversalFooter />
    </main>
  );
}
