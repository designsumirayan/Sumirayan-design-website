ALTER TYPE public.task_status ADD VALUE IF NOT EXISTS 'in_progress';
ALTER TYPE public.task_status ADD VALUE IF NOT EXISTS 'delayed';
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS expected_completion_at timestamptz;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS remark text;