alter table public.photography_items add column if not exists category text;
alter table public.art_items add column if not exists category text;
alter table public.it_services add column if not exists category text;
alter table public.it_services add column if not exists project_url text;