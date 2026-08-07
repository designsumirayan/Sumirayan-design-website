import { motion } from "framer-motion";

const projects = [
  { title: "Nova Bank", cat: "Brand Identity", color: "from-blue-500/40 to-indigo-700/40" },
  { title: "Orbit OS", cat: "Product UI", color: "from-rose-500/40 to-red-700/40" },
  { title: "Atelier 23", cat: "Editorial", color: "from-cyan-400/40 to-blue-700/40" },
  { title: "Helio Group", cat: "Corporate", color: "from-amber-400/30 to-rose-600/40" },
  { title: "Mira Studio", cat: "Web Design", color: "from-violet-500/40 to-blue-700/40" },
  { title: "Kairos", cat: "Marketing", color: "from-red-500/40 to-orange-600/40" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-blue-glow)]">Selected work</span>
          <h2 className="mt-4 font-display font-semibold text-4xl md:text-6xl text-gradient-brand max-w-3xl">
            Recent obsessions
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] glass cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
              <div className="absolute inset-0 opacity-60"
                style={{ background: "radial-gradient(80% 60% at 30% 20%, oklch(1 0 0 / 0.18), transparent 60%)" }} />
              <div
                aria-hidden
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: "linear-gradient(135deg, oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(45deg, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  mixBlendMode: "overlay",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.03_250)] via-transparent to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-between p-7">
                <span className="self-start glass-strong text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                  {p.cat}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-semibold mb-1">{p.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span>Case study</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
