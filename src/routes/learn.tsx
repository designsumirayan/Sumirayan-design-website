import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicLearnCourses } from "@/lib/content.functions";
import { GraduationCap, Clock, User } from "lucide-react";

const LEVEL_STYLE: Record<string, string> = {
  beginner: "bg-[#e85d3a]/10 text-[#e85d3a] border-[#e85d3a]/30",
  intermediate: "bg-[#c9a84c]/15 text-[#8a7020] border-[#c9a84c]/40",
  advanced: "bg-[#0a0a0a] text-[#f5f3ee] border-[#0a0a0a]",
};

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Sumirayan Design School" },
      { name: "description", content: "Courses and workshops in brand design, editorial layout and photography." },
      { property: "og:title", content: "Learn — Sumirayan Design" },
      { property: "og:description", content: "Courses and workshops from working practitioners." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const fn = useServerFn(publicLearnCourses);
  const { data = [] } = useQuery({ queryKey: ["public", "learn"], queryFn: () => fn() });

  return (
    <EditorialShell
      eyebrow="Curriculum"
      title={<>The <em className="not-italic text-[#c9a84c]">School</em></>}
      intro="Courses and workshops taught by working practitioners from the Sumirayan studio and visiting faculty."
    >
      {!data.length && <p className="text-black/50">No courses yet. Add some from the admin panel.</p>}
      <div className="grid md:grid-cols-2 gap-8">
        {data.map((c, i) => (
          <article key={c.id} className="paper-card overflow-hidden group flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={c.cover_image} alt={c.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
              <span className="absolute top-4 left-4 serif text-5xl text-white drop-shadow-lg">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                <span className={`chip ${LEVEL_STYLE[c.level] ?? ""}`}>{c.level}</span>
                {c.duration && <span className="inline-flex items-center gap-1 text-black/55"><Clock className="w-3.5 h-3.5" />{c.duration}</span>}
              </div>
              <h3 className="serif text-3xl mt-4">{c.title}</h3>
              <p className="mt-3 text-black/65 leading-relaxed flex-1">{c.summary}</p>
              <div className="rule my-5" />
              <div className="flex items-center justify-between">
                <div className="text-sm text-black/60 inline-flex items-center gap-2">
                  <User className="w-4 h-4" /> {c.instructor ?? "Sumirayan Faculty"}
                </div>
                <a
                  href={c.enroll_url ?? "/contact"}
                  className="inline-flex items-center gap-2 bg-[#0a0a0a] text-[#f5f3ee] px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#e85d3a] transition"
                >
                  <GraduationCap className="w-4 h-4" /> Enroll
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </EditorialShell>
  );
}
