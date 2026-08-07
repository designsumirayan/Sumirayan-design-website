import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { MagneticButton } from "./MagneticButton";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroScene = lazy(() => import("./HeroScene").then((m) => ({ default: m.HeroScene })));

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden noise" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Floating orbs */}
      <div aria-hidden className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl animate-pulse-glow"
        style={{ background: "radial-gradient(circle, oklch(0.52 0.16 258 / 0.55), transparent 70%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl animate-pulse-glow"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.24 25 / 0.4), transparent 70%)", animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[color:var(--brand-red)]" />
          <span className="text-xs tracking-wider text-white/80 uppercase">Premium Design Studio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-display font-semibold text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] max-w-5xl text-gradient-brand"
        >
          Transforming ideas into <span className="italic font-light">extraordinary</span> designs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed"
        >
          Premium design solutions for modern businesses — crafted with obsession over every pixel, motion and interaction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-4 items-center justify-center"
        >
          <MagneticButton variant="primary">
            Get Started <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton variant="ghost">View Portfolio</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
