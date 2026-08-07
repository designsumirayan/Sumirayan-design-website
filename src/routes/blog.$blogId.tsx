import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { publicBlogPosts } from "@/lib/portal.functions";

export const Route = createFileRoute("/blog/$blogId")({
  component: BlogPostDetail,
});

function BlogPostDetail() {
  // Grab the specific ID from the URL that we passed from the main blog page
  const { blogId } = Route.useParams();
  const blogsFn = useServerFn(publicBlogPosts);
  
  // Fetch the posts
  const { data: posts = [], isLoading } = useQuery({ 
    queryKey: ["public", "blogs"], 
    queryFn: () => blogsFn() 
  });

  // Find the exact post that matches the URL ID
  const post = posts.find((p) => p.id.toString() === blogId);

  if (isLoading) {
    return (
      <PageShell eyebrow="Studio Journal" title="Loading…">
        <div className="flex min-h-[50vh] items-center justify-center text-white/50">
          Loading article...
        </div>
      </PageShell>
    );
  }

  // Fallback if someone goes to an ID that doesn't exist
  if (!post) {
    return (
      <PageShell eyebrow="Studio Journal" title="Article not found">
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <p className="mt-4 text-white/60">The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            Back to Journal
          </Link>
        </div>
      </PageShell>
    );
  }


  return (
    <PageShell eyebrow="Studio Journal" title={post.title}>
      <div className="mx-auto max-w-4xl">
        
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="group mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {/* Full Article Card */}
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-premium">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="max-h-[480px] w-full object-cover" 
          />
          
          <div className="p-6 md:p-12 lg:px-16">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="font-medium text-[#7fb0ff]">{post.category}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> 
                {new Date(post.published_at).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>By <span className="text-white/90">{post.author_name}</span></span>
            </div>

            <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-tight text-white">
              {post.title}
            </h1>
            
            <p className="mt-6 text-xl leading-relaxed text-white/70 font-medium">
              {post.excerpt}
            </p>

            <div className="mt-12 h-px w-full bg-white/10" />

            {/* The Full Content */}
            <div className="mt-12">
              <div className="whitespace-pre-line text-base leading-relaxed text-white/80 md:text-lg md:leading-loose">
                {post.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
