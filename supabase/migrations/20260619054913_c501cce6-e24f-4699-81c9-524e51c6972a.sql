DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'blog_status') THEN
    CREATE TYPE public.blog_status AS ENUM ('draft', 'published');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 2 AND 180),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 2 AND 80),
  excerpt TEXT NOT NULL CHECK (char_length(excerpt) BETWEEN 10 AND 400),
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 20 AND 8000),
  image_url TEXT NOT NULL CHECK (char_length(image_url) <= 1000),
  author_name TEXT NOT NULL DEFAULT 'Sumirayan Design',
  status public.blog_status NOT NULL DEFAULT 'published',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published blog posts are public" ON public.blog_posts;
CREATE POLICY "Published blog posts are public"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins create blog posts" ON public.blog_posts;
CREATE POLICY "Admins create blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update blog posts" ON public.blog_posts;
CREATE POLICY "Admins update blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete blog posts" ON public.blog_posts;
CREATE POLICY "Admins delete blog posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.tg_set_updated_at();

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.tg_set_updated_at();

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.tg_set_updated_at();

DROP TRIGGER IF EXISTS set_tasks_updated_at ON public.tasks;
CREATE TRIGGER set_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.tg_set_updated_at();

DROP TRIGGER IF EXISTS task_status_history ON public.tasks;
CREATE TRIGGER task_status_history
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.tg_task_status_change();