import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))] transition-all",
        scrolled ? "glass-strong rounded-full shadow-premium" : "glass rounded-full"
      )}
    >
      <nav className="flex items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative grid place-items-center w-9 h-9 rounded-xl overflow-hidden shadow-premium">
            <span className="absolute inset-0" style={{ background: "var(--gradient-brand)" }} />
            <span className="absolute inset-[2px] rounded-[10px] bg-[oklch(0.16_0.035_250)] grid place-items-center">
              <span className="font-display font-bold text-[15px] text-gradient-brand">S</span>
            </span>
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display font-semibold text-[15px] tracking-tight">Sumirayan Design</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/50">Creative Studio</span>
          </div>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3.5 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="/auth" className="hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
            Sign in
          </a>
          <a
            href="/auth"
            className="magnetic-btn relative inline-flex items-center rounded-full px-5 py-2 text-sm font-medium text-white"
          >
            <span aria-hidden className="absolute inset-0 rounded-full -z-10" style={{ background: "var(--gradient-brand)" }} />
            Get Started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
