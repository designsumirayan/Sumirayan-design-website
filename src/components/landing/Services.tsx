import { motion } from "framer-motion";
import { Layout, Palette, Sparkles, Smartphone, Megaphone, Building2 } from "lucide-react";

const services = [
  { icon: Layout, title: "Web Design", desc: "Conversion-driven websites built on modern stacks.", tag: "01" },
  { icon: Palette, title: "Graphic Design", desc: "Editorial, social, print — visuals that earn attention.", tag: "02" },
  { icon: Sparkles, title: "Branding", desc: "Identity systems that compound brand value over years.", tag: "03" },
  { icon: Smartphone, title: "UI / UX", desc: "Product design that ships with engineering precision.", tag: "04" },
  { icon: Megaphone, title: "Marketing Materials", desc: "Campaign assets, decks and landing kits.", tag: "05" },
  { icon: Building2, title: "Corporate Design", desc: "Annual reports, pitch decks, internal systems.", tag: "06" },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-red)]">Services</span>
            <h2 className="mt-4 font-display font-semibold text-4xl md:text-6xl text-gradient-brand max-w-2xl">
              Everything design. Done right.
            </h2>
          </div>
          <p className="text-white/55 max-w-sm">
            Six disciplines under one studio — so your brand stays consistent across every touchpoint.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-3xl p-7 overflow-hidden cursor-pointer"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(120% 80% at 0% 0%, oklch(0.52 0.16 258 / 0.25), transparent 60%)" }}
              />
              <div className="relative flex flex-col h-full min-h-[220px]">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center glass-strong transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <s.icon className="w-5 h-5 text-[color:var(--brand-blue-glow)]" />
                  </div>
                  <span className="font-display text-xs text-white/30 tracking-widest">{s.tag}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-auto pt-6 flex items-center gap-2 text-xs text-white/40 group-hover:text-[color:var(--brand-red)] transition-colors">
                  <span>Learn more</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
