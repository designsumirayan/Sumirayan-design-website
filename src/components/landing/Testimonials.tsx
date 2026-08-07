import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  { quote: "Sumirayan rebuilt our brand from the ground up. Our pipeline doubled within a quarter.", name: "Aarav Mehta", role: "CEO, Helio Group" },
  { quote: "Easily the most thoughtful design team we've worked with. Every detail considered.", name: "Sara Iyer", role: "Head of Product, Orbit" },
  { quote: "They turned a vague vision into an identity our customers actually talk about.", name: "Rohan Kapoor", role: "Founder, Nova Bank" },
  { quote: "Pixel-perfect, on-time, and ridiculously easy to work with. We're never leaving.", name: "Mira Sen", role: "CMO, Atelier 23" },
  { quote: "The kind of studio you wish you'd found three years earlier.", name: "Vikram Rao", role: "Director, Kairos" },
];

export function Testimonials() {
  const loop = [...items, ...items];
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-red)]">Clients</span>
        <h2 className="mt-4 font-display font-semibold text-4xl md:text-6xl text-gradient-brand max-w-3xl">
          What partners say
        </h2>
      </div>

      <div className="relative">
        <div aria-hidden className="absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-[oklch(0.16_0.035_250)] to-transparent" />
        <div aria-hidden className="absolute inset-y-0 right-0 w-40 z-10 bg-gradient-to-l from-[oklch(0.16_0.035_250)] to-transparent" />
        <div className="flex gap-5 animate-marquee w-max">
          {loop.map((t, i) => (
            <motion.figure
              key={i}
              className="glass rounded-3xl p-7 w-[360px] md:w-[420px] shrink-0 shadow-premium"
            >
              <Quote className="w-6 h-6 text-[color:var(--brand-blue-glow)] mb-4" />
              <blockquote className="text-white/85 leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full shadow-premium" style={{ background: "var(--gradient-brand)" }} />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
