import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString());
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: [0.2, 0.8, 0.2, 1] });
    return () => controls.stop();
  }, [inView, mv, to]);
  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

const stats = [
  { value: 320, suffix: "+", label: "Projects completed" },
  { value: 145, suffix: "+", label: "Happy clients" },
  { value: 28, suffix: "", label: "Team members" },
  { value: 9, suffix: "+", label: "Years experience" },
];

export function Stats() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-[2rem] p-10 md:p-14 shadow-premium relative overflow-hidden">
          <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.52 0.16 258 / 0.4), transparent 70%)" }} />
          <div aria-hidden className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.62 0.24 25 / 0.3), transparent 70%)" }} />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-center md:text-left"
              >
                <div className="font-display font-semibold text-5xl md:text-6xl text-gradient-brand tabular-nums">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm text-white/55 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
