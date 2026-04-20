-- ============================================
-- BIO LINKS & SETTINGS
-- ============================================

-- Table: bio_links
-- Each row represents a button on the public /bio page
CREATE TABLE IF NOT EXISTS bio_links (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT DEFAULT 'link',
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    highlight BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Table: bio_settings
-- Single-row configuration for the bio page header
CREATE TABLE IF NOT EXISTS bio_settings (
    id INT PRIMARY KEY DEFAULT 1,
    logo_url TEXT,
    title TEXT DEFAULT 'Paróquia São Pio X',
    subtitle TEXT DEFAULT '',
    instagram_handle TEXT DEFAULT ''
);

-- Seed default settings row
INSERT INTO bio_settings (id, title, subtitle)
VALUES (1, 'Paróquia São Pio X', 'Campinas/SP')
ON CONFLICT (id) DO NOTHING;

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_bio_links_order ON bio_links (display_order ASC);

-- RLS (optional, depending on project policy)
-- ALTER TABLE bio_links ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bio_settings ENABLE ROW LEVEL SECURITY;
