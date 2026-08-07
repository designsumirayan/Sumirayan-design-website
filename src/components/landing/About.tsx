import { motion } from "framer-motion";
import { Compass, Eye, Heart } from "lucide-react";

const cards = [
  { icon: Compass, title: "Our Mission", body: "Empower brands with design that doesn't just look beautiful — it works ruthlessly hard for the business." },
  { icon: Eye, title: "Our Vision", body: "To be the design partner ambitious companies trust when the work absolutely has to be world-class." },
  { icon: Heart, title: "Core Values", body: "Craft over speed. Clarity over cleverness. Long-term partnerships over quick wins. Always." },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-blue-glow)]">Who we are</span>
          <h2 className="mt-4 font-display font-semibold text-4xl md:text-6xl text-gradient-brand">
            A studio built for ambitious brands
          </h2>
          <p className="mt-6 text-white/65 text-lg leading-relaxed">
            Sumirayan Design is a multidisciplinary studio crafting digital products, brand systems, and visual experiences for companies that refuse to be average.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative glass rounded-3xl p-8 overflow-hidden hover:glass-strong transition-all"
            >
              <div
                aria-hidden
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(135deg, oklch(0.52 0.16 258 / 0.3), transparent 60%)" }}
              />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl grid place-items-center mb-6 shadow-premium"
                  style={{ background: "var(--gradient-brand)" }}>
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{c.title}</h3>
                <p className="text-white/60 leading-relaxed">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
