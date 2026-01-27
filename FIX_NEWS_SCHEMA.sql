-- Fix News Table Columns
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS category text DEFAULT 'Geral';
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS published boolean DEFAULT true;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS image_url text;

-- Re-apply RLS just to be safe (idempotent)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
