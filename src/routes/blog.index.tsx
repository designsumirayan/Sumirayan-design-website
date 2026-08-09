import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import { EditorialShell } from "@/components/site/EditorialShell";
import { publicBlogPosts } from "@/lib/portal.functions";
import { Search, Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "The Sumirayan Journal | Insights on Design, Branding & Growth" },
      { name: "description", content: "Expert insights, design trends, digital marketing strategies, and creative business growth tips from the team at Sumirayan Design." },
      { property: "og:title", content: "The Sumirayan Journal | Insights on Design, Branding & Growth" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const fetchBlogs = useServerFn(publicBlogPosts);
  const { data: rawBlogs = [], isLoading } = useQuery({ 
    queryKey: ["public", "blog"], 
    queryFn: () => fetchBlogs() 
  });

  // Fallback Mapping in case DB keys mismatch
  const blogs = useMemo(() => {
      if(Array.isArray(rawBlogs)) return rawBlogs;
      if(Array.isArray((rawBlogs as any).posts)) return (rawBlogs as any).posts;
      if(Array.isArray((rawBlogs as any).blog_posts)) return (rawBlogs as any).blog_posts;
      return [];
  }, [rawBlogs]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeAuthor, setActiveAuthor] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories and authors
  const categories = useMemo(() => ["All", ...Array.from(new Set(blogs.map((b: any) => b.category).filter(Boolean)))], [blogs]);
  const authors = useMemo(() => ["All", ...Array.from(new Set(blogs.map((b: any) => b.author_name).filter(Boolean)))], [blogs]);

  // Filtering Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog: any) => {
      const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
      const matchesAuthor = activeAuthor === "All" || blog.author_name === activeAuthor;
      const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesAuthor && matchesSearch;
    });
  }, [blogs, activeCategory, activeAuthor, searchQuery]);

  return (
    <EditorialShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* ─── HERO SECTION (Futuristic Header) ─── */}
      <div className="relative -mt-10 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-1000 pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl mt-16 md:mt-24">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold tracking-[0.2em] uppercase text-blue-300 shadow-lg">
            <TrendingUp className="w-3.5 h-3.5" /> Field Notes
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl serif mb-6 tracking-tight text-white leading-[1.1]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">Sumirayan</span> Journal
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Professional insights on branding, photography, art, digital marketing and creative growth for modern businesses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        
        {/* ─── FILTERS & SEARCH BAR ─── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12 p-2 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
            
            {/* Category Chips (Horizontal Scroll on Mobile) */}
            <div className="flex overflow-x-auto gap-2 w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar pl-2 pt-2">
              {categories.map((c) => (
                <button
                  key={c as string}
                  onClick={() => setActiveCategory(c as string)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    activeCategory === c 
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105" 
                      : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {c as string}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto pr-2 pb-2 lg:pb-0 px-2 lg:px-0">
                {/* Author Dropdown */}
                <div className="relative w-full sm:w-auto">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <select 
                        value={activeAuthor} 
                        onChange={(e) => setActiveAuthor(e.target.value)}
                        className="w-full sm:w-[160px] bg-white/5 border border-white/10 text-white text-xs rounded-full pl-9 pr-4 py-2.5 outline-none appearance-none cursor-pointer focus:border-blue-500/50 transition-colors"
                    >
                        {authors.map(a => <option key={a as string} value={a as string} className="bg-[#0a0f1e] text-sm">{a as string === "All" ? "All Authors" : a}</option>)}
                    </select>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-auto">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-[220px] bg-white/5 border border-white/10 text-white text-xs rounded-full pl-9 pr-4 py-2.5 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                    />
                </div>
            </div>
        </div>

        {/* ─── BLOG GRID (3 Columns, 3D Motion Cards) ─── */}
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-[450px] bg-white/5 rounded-3xl border border-white/10"></div>
                ))}
            </div>
        ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-display text-white/80 mb-2">No articles found</h3>
                <p className="text-white/40 text-sm">Try adjusting your category, author, or search term.</p>
                <button onClick={() => { setActiveCategory("All"); setActiveAuthor("All"); setSearchQuery(""); }} className="mt-6 text-sm text-blue-400 hover:text-blue-300 hover:underline">Clear all filters</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredBlogs.map((post: any) => (
                <article 
                  key={post.id} 
                  /* Core Futuristic Hover Effects */
                  className="group relative flex flex-col bg-[#050505] rounded-[2rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] active:scale-[0.98] cursor-pointer"
                  onClick={() => window.location.href = `/blog/${post.slug || post.id}`}
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-white/5">
                      <img 
                          src={post.image_url} 
                          alt={post.image_alt || post.title} 
                          loading="lazy"
                          onContextMenu={(e) => e.preventDefault()}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                      
                      {/* Floating Category Badge */}
                      <div className="absolute top-5 left-5">
                          <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                              {post.category}
                          </span>
                      </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 p-6 md:p-8 relative z-10 bg-gradient-to-b from-[#050505] to-[#0a0f1e]">
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-4">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400/70" /> {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-display font-semibold text-white leading-[1.3] mb-4 group-hover:text-blue-300 transition-colors duration-300 line-clamp-3">
                          {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-white/60 leading-relaxed mb-8 line-clamp-3">
                          {post.excerpt}
                      </p>

                      {/* Footer: Author & Read More */}
                      <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                                  {post.author_name ? post.author_name.charAt(0).toUpperCase() : 'S'}
                              </div>
                              <span className="text-xs text-white/80 font-medium">{post.author_name || "Sumit Singh"}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
                              Read <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                      </div>
                  </div>
                </article>
            ))}
            </div>
        )}
      </div>
    </EditorialShell>
  );
}
