import type { ReactNode } from "react";
import { GlobalHeader } from "@/components/site/GlobalHeader";
import { Footer } from "@/components/landing/Footer";
import { Scene3D } from "@/components/three/Scene3D";

/**
 * Site editorial shell — uses the brand dark/blue system so these content pages
 * feel like the rest of the site. Kept name for backwards compatibility.
 */
export function EditorialShell({
  eyebrow,
  title,
  intro,
  children,
  issue,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  issue?: string;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-white editorial-scope">
      <style>{`
        .editorial-scope .serif { font-family: var(--font-display, "Outfit"), ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.02em; font-weight: 600; }
        .editorial-scope .rule { height: 1px; background: rgba(255,255,255,0.10); }
        .editorial-scope .rule-strong { height: 1px; background: rgba(255,255,255,0.28); }
        .editorial-scope .chip { border: 1px solid rgba(255,255,255,0.18); border-radius: 999px; padding: 0.25rem 0.7rem; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); }
        .editorial-scope .chip:hover { background: rgba(255,255,255,0.08); }
        .editorial-scope .paper-card {
          background: linear-gradient(180deg, oklch(0.26 0.045 254 / 0.6), oklch(0.22 0.04 252 / 0.6));
          border: 1px solid oklch(1 0 0 / 0.10);
          box-shadow: 0 30px 80px -30px oklch(0.52 0.16 258 / 0.35), 0 8px 24px -14px oklch(0 0 0 / 0.55);
          border-radius: 1rem;
          backdrop-filter: blur(20px);
        }
        /* Remap ivory-era tokens to brand palette */
        .editorial-scope [class*="text-black\\/"] { color: rgba(255,255,255,0.72) !important; }
        .editorial-scope [class*="border-black\\/"] { border-color: rgba(255,255,255,0.12) !important; }
        .editorial-scope [class*="bg-black\\/"] { background-color: rgba(255,255,255,0.04) !important; }
        .editorial-scope .bg-\\[\\#0a0a0a\\] { background: var(--gradient-brand) !important; color: white !important; }
        .editorial-scope .text-\\[\\#f5f3ee\\] { color: #ffffff !important; }
        .editorial-scope .border-\\[\\#0a0a0a\\] { border-color: transparent !important; }
        .editorial-scope .text-\\[\\#c9a84c\\] { color: oklch(0.78 0.14 258) !important; }
        .editorial-scope .text-\\[\\#e85d3a\\] { color: oklch(0.72 0.22 25) !important; }
        .editorial-scope .text-\\[\\#8a7020\\] { color: oklch(0.78 0.12 258) !important; }
        .editorial-scope .bg-\\[\\#c9a84c\\]\\/10,
        .editorial-scope .bg-\\[\\#c9a84c\\]\\/15 { background: oklch(0.52 0.16 258 / 0.15) !important; }
        .editorial-scope .bg-\\[\\#e85d3a\\]\\/10 { background: oklch(0.62 0.24 25 / 0.15) !important; }
        .editorial-scope .border-\\[\\#c9a84c\\]\\/30,
        .editorial-scope .border-\\[\\#c9a84c\\]\\/40 { border-color: oklch(0.68 0.18 255 / 0.4) !important; }
        .editorial-scope .border-\\[\\#e85d3a\\]\\/30 { border-color: oklch(0.62 0.24 25 / 0.4) !important; }
        .editorial-scope .hover\\:bg-\\[\\#e85d3a\\]:hover { background: var(--gradient-accent) !important; }
        .editorial-scope .hover\\:text-\\[\\#e85d3a\\]:hover { color: oklch(0.72 0.22 25) !important; }
        .editorial-scope .group-hover\\:text-\\[\\#e85d3a\\] { transition: color .3s; }
        .editorial-scope .group:hover .group-hover\\:text-\\[\\#e85d3a\\] { color: oklch(0.72 0.22 25) !important; }
      `}</style>

      <Scene3D className="opacity-30" />
      <GlobalHeader />

      <main className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">{children}</main>

      <Footer />
    </div>
  );
}


