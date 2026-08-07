import { Link, useRouterState } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import logoUrl from "@/assets/sumirayan design.png";

export function GlobalHeader({ withTicker = false }: { withTicker?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Close mobile menu on route change
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { 
    setMobileOpen(false); 
  }, [pathname]);

  const navLinks = [
    { name: "Design", href: "/design" },
    { name: "Photography", href: "/photography" },
    { name: "Art & Canvas", href: "/art" },
    { name: "IT Services", href: "/it-services" },
    { name: "Blog", href: "/blog" },
    { name: "Learn", href: "/learn" },
    { name: "Events", href: "/events" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Optional Top Announcement Ticker */}
      {withTicker && (
        <div className="w-full bg-gradient-brand text-white text-[11px] font-bold tracking-wider uppercase py-2 overflow-hidden relative z-50 border-b border-white/20 select-none">
          <div className="inline-flex whitespace-nowrap animate-marquee-fast">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-6 px-8">
                <span>🏆 Ranked #1 Creative Agency in Patna, Bihar</span>
                <span className="text-white/40">◆</span>
                <span>📣 Now Hiring: Senior Video Editor & UI Designer</span>
                <span className="text-white/40">◆</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed z-50 left-1/2 -translate-x-1/2 w-[min(1400px,calc(100%-2rem))] transition-all duration-300 rounded-full",
          // Adjust top position based on whether the ticker is present and user has scrolled
          scrolled || mobileOpen
            ? "top-4 bg-[#050810]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] py-3 px-6"
            : cn(withTicker ? "top-16" : "top-12", "bg-black/10 backdrop-blur-md border border-white/10 py-4 px-8")
        )}
      >
        <div className="flex items-center justify-between relative w-full">
          
          <Link to="/" className="flex items-center shrink-0 group gap-3">
            <img 
              src={logoUrl} 
              alt="Sumirayan Design" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 text-[11px] lg:text-xs font-bold text-white/70 hover:text-white uppercase tracking-widest transition-all hover:bg-white/5 rounded-full whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end shrink-0">
            <Link 
              to="/contact" 
              className="btn-premium inline-flex items-center rounded-full bg-white text-black px-7 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-50"
            aria-label="Toggle menu"
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
            className={cn(
              "fixed left-4 right-4 z-40 bg-[#0a0f1e]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 md:hidden overflow-hidden",
              withTicker ? "top-28" : "top-24"
            )}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-sm font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="h-[1px] bg-white/10 w-full" />
            
            <div className="flex flex-col gap-3">
              <Link 
                to="/auth" 
                onClick={() => setMobileOpen(false)} 
                className="w-full py-3 text-center rounded-xl bg-white text-black text-sm font-black uppercase tracking-wider shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
