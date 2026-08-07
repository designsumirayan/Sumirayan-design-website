import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/portal.functions";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sumirayan Design" },
      { name: "description", content: "Tell us about your project. We respond within one business day." },
    ],
  }),
  component: ContactPage,
});

const faq = [
  { q: "How long does a typical project take?", a: "Brand identity 4–6 weeks. Photo shoots 1–3 weeks. Websites 6–10 weeks." },
  { q: "Do you work with founders & small businesses?", a: "Yes — we have tiered engagements starting at ₹50k." },
  { q: "Where are you based?", a: "Patna, Bihar — with shoots and engagements across India." },
];

function ContactPage() {
  const submit = useServerFn(submitContact);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErr(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || "") || null,
          message: String(fd.get("message") || ""),
        },
      });
      setState("ok");
      e.currentTarget.reset();
    } catch (e) {
      setState("err");
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <PageShell eyebrow="Contact" title="Tell us what you're building."
      intro="One thoughtful sentence is enough. We'll get back within one business day.">
      <div className="grid md:grid-cols-5 gap-8">
        <form onSubmit={onSubmit} className="md:col-span-3 glass-strong rounded-3xl p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/60">Name</span>
              <input required name="name" maxLength={120}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/60">Email</span>
              <input required type="email" name="email" maxLength={200}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-white/60">Company (optional)</span>
            <input name="company" maxLength={200}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-white/60">What can we help with?</span>
            <textarea required name="message" rows={5} maxLength={2000}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
          </label>
          <button disabled={state === "sending"}
            className="rounded-full px-6 py-3 font-medium text-white disabled:opacity-60"
            style={{ background: "var(--gradient-brand)" }}>
            {state === "sending" ? "Sending…" : "Send message"}
          </button>
          {state === "ok" && <p className="text-sm text-emerald-300">Thanks — we'll be in touch shortly.</p>}
          {state === "err" && <p className="text-sm text-red-300">{err}</p>}
        </form>

        <aside className="md:col-span-2 space-y-4">
          <div className="glass rounded-2xl p-5 flex items-start gap-3">
            <Mail className="w-5 h-5 text-[oklch(0.78_0.12_258)] mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">Email</div>
              <a href="mailto:hello@sumirayan.design" className="font-medium">hello@sumirayan.design</a>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-start gap-3">
            <Phone className="w-5 h-5 text-[oklch(0.78_0.12_258)] mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">Phone</div>
              <a href="tel:+919999999999" className="font-medium">+91 99999 99999</a>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[oklch(0.78_0.12_258)] mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">Studio</div>
              <p>Boring Road, Patna · Bihar 800001</p>
            </div>
          </div>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
            className="rounded-2xl p-5 flex items-center gap-3 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors">
            <MessageSquare className="w-5 h-5 text-emerald-300" />
            <span className="font-medium">Chat on WhatsApp</span>
          </a>
        </aside>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl mb-6">FAQ</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-3 text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
