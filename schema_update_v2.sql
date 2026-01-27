-- Add category to news
alter table public.news add column category text default 'Geral';

-- Add category check constraint (optional but good practice, or just handle in app)
-- alter table public.news add constraint news_category_check check (category in ('Geral', 'Paróquia', 'Eventos', 'Espiritualidade'));
