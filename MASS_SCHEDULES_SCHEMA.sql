-- Schema for mass schedules (editable from admin)
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS mass_schedules (
    id SERIAL PRIMARY KEY,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    time TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT DEFAULT 'Igreja Matriz',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Day of week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday

-- Insert default mass schedules
INSERT INTO mass_schedules (day_of_week, time, title, description, location) VALUES
(0, '09:15', 'Santa Missa Dominical', 'Celebração Eucarística Dominical', 'Igreja Matriz'),
(3, '15:00', 'Santa Missa com Novena do Perpétuo Socorro', 'Celebração Eucarística às 15h com Novena do Perpétuo Socorro', 'Igreja Matriz'),
(4, '20:00', 'Santa Missa com Novena de N. Sra. Desatadora dos Nós', 'Celebração Eucarística às 20h com Novena de Nossa Senhora Desatadora dos Nós', 'Igreja Matriz'),
(6, '20:00', 'Santa Missa Dominical', 'Celebração Eucarística Dominical', 'Igreja Matriz');

-- Enable RLS
ALTER TABLE mass_schedules ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read mass_schedules" ON mass_schedules
    FOR SELECT USING (true);
