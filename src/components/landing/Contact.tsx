import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-blue-glow)]">Get in touch</span>
            <h2 className="mt-4 font-display font-semibold text-4xl md:text-6xl text-gradient-brand">
              Let's build something unforgettable
            </h2>
            <p className="mt-6 text-white/60 text-lg max-w-md leading-relaxed">
              Tell us about your project. We'll get back within one business day with next steps and a quick call invite.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Mail, label: "hello@sumirayan.design" },
                { icon: Phone, label: "+91 98765 43210" },
                { icon: MapPin, label: "Bengaluru · Mumbai · Remote" },
              ].map((it) => (
                <div key={it.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass grid place-items-center">
                    <it.icon className="w-4 h-4 text-[color:var(--brand-blue-glow)]" />
                  </div>
                  <span className="text-white/75">{it.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={(e) => e.preventDefault()}
            className="glass-strong rounded-3xl p-7 md:p-9 shadow-premium space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" placeholder="Your full name" />
              <Field label="Email" type="email" placeholder="you@company.com" />
            </div>
            <Field label="Company" placeholder="Acme Inc." />
            <div>
              <label className="text-xs uppercase tracking-wider text-white/55 mb-2 block">Project brief</label>
              <textarea
                rows={5}
                placeholder="Tell us a bit about what you need…"
                className="w-full glass rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[color:var(--brand-blue-glow)]/60 transition resize-none"
              />
            </div>
            <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
              Send message <Send className="w-4 h-4" />
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-white/55 mb-2 block">{label}</label>
      <input
        {...rest}
        className="w-full glass rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[color:var(--brand-blue-glow)]/60 transition"
      />
    </div>
  );
}
