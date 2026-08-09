import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, Share2, Tag, Globe, Volume2, SquareSquare, ZoomIn, ZoomOut, PauseCircle } from "lucide-react";
import { publicBlogPosts } from "@/lib/portal.functions";
import { PageShell } from "@/components/site/PageShell"; 

export const Route = createFileRoute("/blog/$blogId")({
  component: BlogPostDetail,
});

function BlogPostDetail() {
  const { blogId } = Route.useParams();
  const blogsFn = useServerFn(publicBlogPosts);
  
  const { data: rawBlogs = [], isLoading } = useQuery({ 
    queryKey: ["public", "blogs"], 
    queryFn: () => blogsFn() 
  });

  const posts = Array.isArray(rawBlogs) ? rawBlogs : 
               Array.isArray((rawBlogs as any).posts) ? (rawBlogs as any).posts : 
               Array.isArray((rawBlogs as any).blog_posts) ? (rawBlogs as any).blog_posts : [];

  const post: any = posts.find((p: any) => p.slug === blogId || p.id === blogId);

  // --- Advanced Reading Features State ---
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState(18); // Default font size
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 1. Reading Progress Bar Logic
  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // 2. Google Translate Initialization
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).googleTranslateElementInit) {
      const addScript = document.createElement("script");
      addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
      addScript.setAttribute("async", "true");
      document.body.appendChild(addScript);
      
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };
    }
  }, []);

  // 3. Text-to-Speech (Read Aloud) Logic
  const toggleSpeech = () => {
    if (!post?.content) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Strip HTML tags to get pure text for reading
      const plainText = post.content.replace(/<[^>]+>/g, '') || post.excerpt;
      const utterance = new SpeechSynthesisUtterance(plainText);
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <PageShell title="Loading..." intro="" eyebrow="">
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <div className="animate-pulse flex flex-col items-center gap-6">
            <div className="w-full h-96 bg-white/5 rounded-3xl"></div>
            <div className="w-3/4 h-12 bg-white/5 rounded-lg"></div>
            <div className="w-1/2 h-6 bg-white/5 rounded-lg"></div>
          </div>
        </div>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell title="Article not found" intro="The post you're looking for doesn't exist or has been removed." eyebrow="STUDIO JOURNAL">
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={<span className="hidden"></span>} intro="" eyebrow="">
      
      {/* --- Hide Ugly Google Translate Top Bar CSS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .skiptranslate iframe { display: none !important; }
        body { top: 0px !important; }
        .goog-te-gadget-simple { background-color: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.1) !important; padding: 6px 12px !important; border-radius: 50px !important; font-family: inherit !important; color: white !important; }
        .goog-te-gadget-simple .goog-te-menu-value span { color: white !important; font-size: 12px !important; }
        .goog-te-gadget-simple .goog-te-menu-value img { display: none !important; }
        
        /* Premium Text Selection Highlight */
        ::selection { background: rgba(59, 130, 246, 0.4); color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.5); }
        ::-moz-selection { background: rgba(59, 130, 246, 0.4); color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.5); }
      `}} />

      {/* --- Reading Progress Bar --- */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 z-[100] transition-all duration-150 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        style={{ width: `${readingProgress}%` }}
      />

      <article className="max-w-5xl mx-auto px-6 pb-32 pt-10 relative z-10">
        
        {/* Top Controls: Back & Translate */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
            
            {/* Translate Widget Wrapper */}
            <div className="flex items-center gap-2 text-xs text-white/70">
                <Globe className="w-4 h-4 text-blue-400" /> Translate:
                <div id="google_translate_element"></div>
            </div>
        </div>

        {/* ─── Header Section ─── */}
        <header className="mb-12 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> 
              {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white leading-[1.15] mb-6">
            {post.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        </header>

        {/* ─── Cover Image ─── */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <img 
            src={post.image_url} 
            alt={post.image_alt || post.title} 
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* ─── Advanced Reading Toolbar (Sticky) ─── */}
        <div className="sticky top-4 z-50 mb-10 mx-auto max-w-fit flex items-center gap-2 bg-[#050505]/80 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <button 
                onClick={toggleSpeech}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${isSpeaking ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
                {isSpeaking ? <PauseCircle className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isSpeaking ? 'Pause Audio' : 'Listen'}
            </button>
            <div className="w-px h-6 bg-white/10 mx-1"></div>
            <button onClick={() => setFontSize(f => Math.max(14, f - 2))} className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition" title="Decrease Font Size"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs text-white/50 font-mono w-6 text-center">{fontSize}</span>
            <button onClick={() => setFontSize(f => Math.min(26, f + 2))} className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition" title="Increase Font Size"><ZoomIn className="w-4 h-4" /></button>
        </div>

        {/* ─── Content & Sidebar Grid ─── */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
          
          {/* Main Content (Dynamic Font Size) */}
          <div 
            className="prose prose-invert max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-blue-400 prose-img:rounded-2xl prose-p:leading-[1.8] transition-all duration-300"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
          />

          {/* Sidebar Info Panel */}
          <aside className="sticky top-28 flex flex-col gap-8 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            
            {/* Author */}
            <div>
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Written By
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-lg font-bold text-white shadow-inner">
                    {post.author_name ? post.author_name.charAt(0).toUpperCase() : 'S'}
                </div>
                <span className="text-white font-medium text-lg">{post.author_name || "Sumit Singh"}</span>
              </div>
              {post.author_bio && <p className="text-xs text-white/50 leading-relaxed">{post.author_bio}</p>}
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white/5 text-white/60 hover:text-white rounded-lg text-[10px] uppercase tracking-wider border border-white/5 transition-colors cursor-default">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Button */}
            <div className="pt-6 border-t border-white/10">
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied to clipboard!'))} 
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-colors text-sm font-medium border border-white/5 active:scale-95"
              >
                <Share2 className="w-4 h-4" /> Share Article
              </button>
            </div>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}
