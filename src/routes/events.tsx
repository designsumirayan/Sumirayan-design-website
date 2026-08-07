import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicEvents } from "@/lib/content.functions";
import { MapPin, Calendar } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Sumirayan Design" },
      { name: "description", content: "Talks, workshops and gatherings hosted by the Sumirayan studio." },
      { property: "og:title", content: "Events — Sumirayan Design" },
      { property: "og:description", content: "Studio talks, workshops and gatherings." },
    ],
  }),
  component: EventsPage,
});

function fmtDate(iso: string | null) {
  if (!iso) return { d: "TBA", m: "", y: "" };
  const dt = new Date(iso);
  return {
    d: dt.getDate().toString().padStart(2, "0"),
    m: dt.toLocaleString("en", { month: "short" }).toUpperCase(),
    y: dt.getFullYear().toString(),
    time: dt.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" }),
  };
}

function EventsPage() {
  const fn = useServerFn(publicEvents);
  const { data = [] } = useQuery({ queryKey: ["public", "events"], queryFn: () => fn() });

  const upcoming = data.filter((e) => e.status === "upcoming");
  const past = data.filter((e) => e.status !== "upcoming");

  return (
    <EditorialShell
      eyebrow="Gatherings"
      title={<>The <em className="not-italic text-[#e85d3a]">Calendar</em></>}
      intro="Talks, workshops and community nights hosted by Sumirayan and our collaborators."
    >
      <h2 className="serif text-3xl md:text-4xl mb-8">Upcoming</h2>
      {!upcoming.length && <p className="text-black/50 mb-12">Nothing on the calendar right now.</p>}
      <div className="flex flex-col gap-10 mb-24">
        {upcoming.map((e) => {
          const d = fmtDate(e.starts_at);
          return (
            <article key={e.id} className="grid md:grid-cols-12 gap-8 items-start group">
              <div className="md:col-span-2">
                <div className="paper-card p-5 text-center">
                  <div className="serif text-6xl leading-none text-[#e85d3a]">{d.d}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-black/60 mt-2">{d.m} {d.y}</div>
                  {d.time && <div className="text-xs text-black/50 mt-1">{d.time}</div>}
                </div>
              </div>
              <div className="md:col-span-5 aspect-[16/10] overflow-hidden paper-card">
                <img src={e.cover_image} alt={e.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
              </div>
              <div className="md:col-span-5">
                <h3 className="serif text-4xl leading-tight">{e.title}</h3>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-black/60">
                  {(e.venue || e.city) && (
                    <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" />{[e.venue, e.city].filter(Boolean).join(", ")}</span>
                  )}
                </div>
                {e.description && <p className="mt-4 text-black/70 leading-relaxed">{e.description}</p>}
                {e.rsvp_url && (
                  <a href={e.rsvp_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 bg-[#0a0a0a] text-[#f5f3ee] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#e85d3a] transition">
                    <Calendar className="w-4 h-4" /> RSVP
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {past.length > 0 && (
        <>
          <div className="rule mb-8" />
          <h2 className="serif text-3xl mb-6">In the Archive</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {past.map((e) => (
              <div key={e.id} className="paper-card p-5 opacity-80">
                <div className="aspect-video overflow-hidden mb-3">
                  <img src={e.cover_image} alt={e.title} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-black/50">{fmtDate(e.starts_at).m} {fmtDate(e.starts_at).y}</div>
                <h4 className="serif text-xl mt-1">{e.title}</h4>
                {e.city && <div className="text-sm text-black/55">{e.city}</div>}
              </div>
            ))}
          </div>
        </>
      )}
    </EditorialShell>
  );
}
