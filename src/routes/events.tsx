import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicEvents } from "@/lib/content.functions";
import { Calendar, MapPin, Clock, Ticket, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Events & Workshops | Sumirayan Design" },
      { name: "description", content: "Join our exclusive design workshops, art exhibitions, and digital growth seminars in Patna." },
    ],
  }),
  component: EventsPage,
});

// --- Live Countdown Component ---
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    if (!targetDate) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsPast(true);
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!targetDate) return null;
  if (isPast) return <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-medium">Event has ended</div>;

  return (
    <div className="flex items-center gap-3 md:gap-4 mt-4">
      {[
        { label: "DAYS", value: timeLeft.d },
        { label: "HRS", value: timeLeft.h },
        { label: "MINS", value: timeLeft.m },
        { label: "SECS", value: timeLeft.s },
      ].map((time, idx) => (
        <div key={idx} className="flex flex-col items-center justify-center min-w-[60px] md:min-w-[70px] py-2 md:py-3 rounded-xl bg-white/[0.03] border border-white/10 shadow-inner backdrop-blur-sm">
          <span className="text-xl md:text-2xl font-display font-bold text-white leading-none">{time.value.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase tracking-wider text-white/40 mt-1">{time.label}</span>
        </div>
      ))}
    </div>
  );
}

function EventsPage() {
  const fn = useServerFn(publicEvents);
  const { data = [], isLoading } = useQuery({ queryKey: ["public", "events"], queryFn: () => fn() });

  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* --- Premium Hero Section --- */}
      {/* pt-40 (Padding Top) ensures the text never hides behind the navbar again */}
      <div className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Soft 3D Glowing Elements in Background */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] animate-pulse delay-700 pointer-events-none z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-4 h-4" /> Live & Upcoming
          </div>
          <h1 className="text-5xl md:text-7xl serif mb-6 tracking-tight text-white leading-tight">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300">Exhibitions & Events</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Join our immersive workshops, art galleries, and digital seminars to explore the future of creativity and technology.
          </p>
        </div>
      </div>

      {/* --- Events List Section --- */}
      <div className="max-w-6xl mx-auto px-6 pb-32 relative z-10 space-y-10">
        
        {isLoading && <p className="text-center text-white/50 py-10">Loading exciting events...</p>}
        {!isLoading && data.length === 0 && <p className="text-center text-white/50 py-10">Stay tuned! Exciting events are coming soon.</p>}

        {data.map((event: any) => (
          <div 
            key={event.id} 
            className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] p-5 md:p-8 flex flex-col xl:flex-row gap-8 md:gap-10 hover:border-purple-500/30 hover:bg-white/[0.03] hover:shadow-[0_0_50px_rgba(168,85,247,0.1)] transition-all duration-500 overflow-hidden"
          >
            {/* Soft background gradient inside the card on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Left Image Section - Strictly 16:9 Ratio */}
            <div className="xl:w-5/12 shrink-0">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <img 
                  src={event.cover_image} 
                  alt={event.title} 
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                {/* Event Status Badge over image */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white font-medium">
                  {event.status === "past" ? "Past Event" : "Upcoming"}
                </div>
              </div>
            </div>

            {/* Right Details Section */}
            <div className="xl:w-7/12 flex flex-col justify-center relative z-10">
              <h2 className="text-3xl md:text-4xl serif text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors duration-300">
                {event.title}
              </h2>

              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                {event.description}
              </p>

              {/* Event Metadata (Date, Time, Location) */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {event.starts_at && (
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Date</div>
                      <div className="text-sm font-medium">{new Date(event.starts_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                  </div>
                )}
                
                {event.starts_at && (
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Time</div>
                      <div className="text-sm font-medium">
                        {new Date(event.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                        {event.ends_at && ` - ${new Date(event.ends_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </div>
                    </div>
                  </div>
                )}

                {event.venue && (
                  <div className="flex items-center gap-3 text-white/70 sm:col-span-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Location</div>
                      <div className="text-sm font-medium">{event.venue}{event.city ? `, ${event.city}` : ''}</div>
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-white/5 mb-6" />

              {/* Bottom Actions & Countdown */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  {event.status !== "past" && <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">Event starts in</div>}
                  {event.status !== "past" && <CountdownTimer targetDate={event.starts_at} />}
                </div>

                {event.rsvp_url && (
                  <a 
                    href={event.rsvp_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
                    style={{ background: "linear-gradient(to right, #a855f7, #ec4899)" }}
                  >
                    <Ticket className="w-4 h-4" /> Book Ticket <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

    </EditorialShell>
  );
}
