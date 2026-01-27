-- Add slug column to pastorals table
ALTER TABLE public.pastorals 
ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create an index for faster lookups by slug
CREATE INDEX IF NOT EXISTS pastorals_slug_idx ON public.pastorals (slug);

-- Backfill slugs for existing pastorals using a simple regex replacement
-- This replaces spaces with hyphens and converts to lowercase
UPDATE public.pastorals 
SET slug = lower(regexp_replace(name, '\s+', '-', 'g')) 
WHERE slug IS NULL;
a