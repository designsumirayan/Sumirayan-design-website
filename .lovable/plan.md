## What I'll build

### 1. Editorial Magazine design system
A new look for the redesigned pages: ivory paper background (`#f5f3ee`), ink black (`#0a0a0a`), gold (`#c9a84c`) and ember (`#e85d3a`) accents. Serif display headlines (Instrument Serif) paired with a clean sans (Work Sans). Asymmetric grids, oversized numerals, generous whitespace, thin rules between sections. The current dark home stays untouched — these pages get their own editorial shell.

### 2. New database tables (one per page, with admin-friendly fields)

- `design_items` — title, category, cover_image, description, year, client, project_url, sort_order
- `photography_items` — title, location, cover_image, description, captured_at, sort_order
- `art_items` — title, medium, cover_image, description, dimensions, year, for_sale, price, sort_order
- `learn_courses` — title, cover_image, summary, content, level (beginner/intermediate/advanced), duration, instructor, enroll_url, sort_order
- `events` — title, cover_image, description, starts_at, ends_at, venue, city, rsvp_url, status (upcoming/past), sort_order
- `careers` — title, department, location, employment_type, summary, description, apply_url, is_open, sort_order
- `it_services` — title, icon, summary, description, features (jsonb array), cover_image, sort_order

Each table: public SELECT for `anon`, full CRUD for `admin` role only (via `has_role`), `updated_at` trigger, GRANTs.

### 3. Admin panel — new "Content" mega-tab
Inside `/admin`, add a new Content section with sub-tabs (Design, Photography, Art, Learn, Events, Careers, IT Services). Each sub-tab gets a simple list + "Add new" dialog with image URL field, fields specific to that table, and delete buttons. Server fns: `adminList<Entity>`, `adminCreate<Entity>`, `adminUpdate<Entity>`, `adminDelete<Entity>`.

### 4. Redesigned public pages (editorial layout)
- `/design` — masonry of projects, large featured piece at top, category filter
- `/photography` — full-bleed image grid, hover reveals location/title
- `/art` — gallery with medium/year metadata, "available" badge
- `/learn` — course catalog cards with level chips, duration, enroll CTA
- `/events` — upcoming events as large editorial cards with date block, past events list below
- `/careers` — open roles as editorial list with department/location, "Apply" button
- `/it-services` — NEW: hero + service cards grid, each service expandable with feature list

All pages share a new `EditorialPageShell` (ivory bg, serif title, GlobalHeader still in dark for the home but adapted for these), and the universal Footer.

### 5. Home page IT section
Add a new "IT Services" section to `src/routes/index.tsx` between Services and Portfolio, with a teaser grid pulling from `it_services` table, ending with a "Explore IT Services →" link to `/it-services`.

### 6. Image handling
Admins paste image URLs (simpler — works with any host or `lovable-assets` uploads done separately). No storage bucket needed initially. Field is plain URL input with preview thumbnail in the admin form.

## Technical notes

- Migration file with all 7 tables + RLS + GRANTs + `has_role('admin')` policies in one shot
- New `src/lib/content.functions.ts` with public read fns (using server publishable client) and admin CRUD (using `requireSupabaseAuth` + admin role check)
- New `src/components/site/EditorialPageShell.tsx` for the new look
- Fonts: `@fontsource/instrument-serif` + `@fontsource/work-sans` added via bun, imported in `src/main.tsx`
- Seed each table with 3-4 starter rows so pages look populated immediately
- Existing dark home + blog + auth/admin chrome stays unchanged

## Out of scope
- Direct image upload from admin (URL-based for now; can add storage bucket later)
- Detail pages per item (cards link out via `project_url`/`apply_url`/`enroll_url`/`rsvp_url`)
- Editing existing items (admin can delete + recreate; full edit forms can come later if you want)
