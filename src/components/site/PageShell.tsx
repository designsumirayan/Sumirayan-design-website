import type { ReactNode } from "react";
import { Scene3D } from "@/components/three/Scene3D";
import { GlobalHeader } from "@/components/site/GlobalHeader";
import { Footer } from "@/components/landing/Footer";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-white">
      <Scene3D className="opacity-30" />
      <GlobalHeader />

      <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-12 md:pt-36 md:pb-16">
        <p className="text-xs uppercase tracking-[0.22em] text-[oklch(0.78_0.12_258)]">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-gradient-brand max-w-4xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-white/70 text-lg">{intro}</p>}
      </section>

      <main className="relative mx-auto max-w-7xl px-6 pb-24">{children}</main>

      <Footer />
    </div>
  );
}
