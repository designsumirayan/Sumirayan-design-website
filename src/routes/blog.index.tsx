import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Search } from "lucide-react";
import { publicBlogPosts } from "@/lib/portal.functions";
import heroImage from "@/assets/sumirayan-blog-creative-studio.jpg";

// 👇 CHANGE THIS LINE: add the trailing slash so it says "/blog/"
export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Sumirayan Design" },
      { name: "description", content: "Essays, case studies, and field notes from Sumirayan Design." },
    ],
  }),
  component: BlogPage,
});

type BlogPost = Awaited<ReturnType<typeof publicBlogPosts>>[number];

function BlogPage() {
  const blogsFn = useServerFn(publicBlogPosts);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const { data: posts = [] } = useQuery({ queryKey: ["public", "blogs"], queryFn: () => blogsFn() });
  
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  
  const list = useMemo(
    () =>
      posts.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [posts, category, q],
  );
  
  const featured = list[0];
  const rest = list.slice(1);

  return (
    <PageShell 
      eyebrow="Field notes" 
      title="The Sumirayan Journal"
      intro="Professional insights on branding, photography, art, digital marketing and creative growth for Bihar businesses."
    >
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-premium min-h-[420px]">
          <img src={heroImage} alt="Sumirayan Design creative studio planning brand and photography work" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-6 md:p-8">
            <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">Studio Journal</span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl md:text-5xl font-semibold leading-tight">Ideas that make brands look sharper, sell better, and feel premium.</h2>
          </div>
        </div>
        
        <div className="glass-strong rounded-[2rem] p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#7fb0ff]">Latest thinking</p>
            <h3 className="mt-3 font-display text-3xl font-semibold">Design, content and business growth — from the Sumirayan team.</h3>
            <p className="mt-4 text-white/65">Read practical articles created for founders, local brands, creators and growing teams that want premium creative execution.</p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="font-display text-2xl">{posts.length}</div><div className="text-[10px] uppercase tracking-widest text-white/45">Posts</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="font-display text-2xl">{Math.max(categories.length - 1, 0)}</div><div className="text-[10px] uppercase tracking-widest text-white/45">Categories</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="font-display text-2xl">Pro</div><div className="text-[10px] uppercase tracking-widest text-white/45">Insights</div></div>
          </div>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map((t) => (
            <button key={t} onClick={() => setCategory(t)} className={`rounded-full px-4 py-2 text-sm border transition ${category === t ? "bg-white text-black border-white" : "border-white/15 text-white/70 hover:bg-white/5"}`}>{t}</button>
          ))}
        </div>
        <label className="relative md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts…"
            className="w-full rounded-full bg-white/5 border border-white/10 py-2 pl-9 pr-4 text-sm outline-none focus:border-white/30" />
        </label>
      </div>

      {featured && <FeaturedPost post={featured} />}

      <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rest.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
        {list.length === 0 && <p className="text-white/60">No posts found.</p>}
      </div>
    </PageShell>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link 
      to="/blog/$blogId" 
      params={{ blogId: post.id.toString() }}
      className="group mt-10 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-premium transition duration-300 hover:bg-white/[0.06] hover:shadow-2xl lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="overflow-hidden">
        <img src={post.image_url} alt={post.title} className="h-full min-h-[320px] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-white/50">
          <span className="text-[#7fb0ff]">{post.category}</span>
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {new Date(post.published_at).toLocaleDateString()}</span>
        </div>
        
        <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold leading-tight transition duration-300 group-hover:text-[#7fb0ff]">
          {post.title}
        </h2>
        
        <p className="mt-6 text-base text-white/70 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-white/50">
          <span className="font-medium text-white/80">{post.author_name}</span>
          <span className="inline-flex items-center gap-2 font-medium text-[#e63027] group-hover:text-[#ff4d42] transition">
            Read Article <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link 
      to="/blog/$blogId" 
      params={{ blogId: post.id.toString() }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-premium"
    >
      <div className="overflow-hidden">
        <img src={post.image_url} alt={post.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-[#7fb0ff]">{post.category}</div>
        
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight transition duration-300 group-hover:text-[#7fb0ff]">
          {post.title}
        </h2>
        
        <p className="mt-4 line-clamp-3 text-sm text-white/65 flex-1">
          {post.excerpt}
        </p>
        
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5 text-xs text-white/45">
          <span className="font-medium text-white/60">{post.author_name}</span>
          <span>{new Date(post.published_at).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
