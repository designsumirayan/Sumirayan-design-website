
SET search_path TO public;

CREATE TABLE public.design_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web Design',
  cover_image TEXT NOT NULL,
  description TEXT,
  year INT,
  client TEXT,
  project_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.design_items TO anon, authenticated;
GRANT ALL ON public.design_items TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.design_items TO authenticated;
ALTER TABLE public.design_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "design_items public read" ON public.design_items FOR SELECT USING (true);
CREATE POLICY "design_items admin write" ON public.design_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_design_updated BEFORE UPDATE ON public.design_items FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.photography_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT,
  cover_image TEXT NOT NULL,
  description TEXT,
  captured_at DATE,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.photography_items TO anon, authenticated;
GRANT ALL ON public.photography_items TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.photography_items TO authenticated;
ALTER TABLE public.photography_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "photo public read" ON public.photography_items FOR SELECT USING (true);
CREATE POLICY "photo admin write" ON public.photography_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_photo_updated BEFORE UPDATE ON public.photography_items FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.art_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  medium TEXT,
  cover_image TEXT NOT NULL,
  description TEXT,
  dimensions TEXT,
  year INT,
  for_sale BOOLEAN NOT NULL DEFAULT false,
  price NUMERIC(10,2),
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.art_items TO anon, authenticated;
GRANT ALL ON public.art_items TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.art_items TO authenticated;
ALTER TABLE public.art_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "art public read" ON public.art_items FOR SELECT USING (true);
CREATE POLICY "art admin write" ON public.art_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_art_updated BEFORE UPDATE ON public.art_items FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.learn_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  level TEXT NOT NULL DEFAULT 'beginner',
  duration TEXT,
  instructor TEXT,
  enroll_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.learn_courses TO anon, authenticated;
GRANT ALL ON public.learn_courses TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.learn_courses TO authenticated;
ALTER TABLE public.learn_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "learn public read" ON public.learn_courses FOR SELECT USING (true);
CREATE POLICY "learn admin write" ON public.learn_courses FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_learn_updated BEFORE UPDATE ON public.learn_courses FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.event_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  description TEXT,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  venue TEXT,
  city TEXT,
  rsvp_url TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming',
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.event_items TO anon, authenticated;
GRANT ALL ON public.event_items TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.event_items TO authenticated;
ALTER TABLE public.event_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "event public read" ON public.event_items FOR SELECT USING (true);
CREATE POLICY "event admin write" ON public.event_items FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_event_updated BEFORE UPDATE ON public.event_items FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.career_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  summary TEXT NOT NULL,
  description TEXT,
  apply_url TEXT,
  is_open BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.career_positions TO anon, authenticated;
GRANT ALL ON public.career_positions TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.career_positions TO authenticated;
ALTER TABLE public.career_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "career public read" ON public.career_positions FOR SELECT USING (true);
CREATE POLICY "career admin write" ON public.career_positions FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_career_updated BEFORE UPDATE ON public.career_positions FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.it_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  summary TEXT NOT NULL,
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.it_services TO anon, authenticated;
GRANT ALL ON public.it_services TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.it_services TO authenticated;
ALTER TABLE public.it_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "it_services public read" ON public.it_services FOR SELECT USING (true);
CREATE POLICY "it_services admin write" ON public.it_services FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_it_updated BEFORE UPDATE ON public.it_services FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
