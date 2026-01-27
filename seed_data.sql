-- Insert Pastorals
INSERT INTO public.pastorals (name, description, coordinator, contact) VALUES
('Catequese', 'Iniciação à vida cristã para crianças, jovens e adultos.', 'Coordenação Catequese', 'Sábados, 09h'),
('Jovens (Jovens Sarados)', 'Encontros semanais de oração e fraternidade para a juventude.', 'Liderança Jovem', 'Domingos, 18h'),
('Pascom', 'Pastoral da Comunicação, responsável pela evangelização digital.', 'Coordenação Pascom', 'Reuniões Mensais');

-- Insert Schedules (Masses)
INSERT INTO public.schedules (day_of_week, time, description, type) VALUES
('Quarta-feira', '15:00', 'Santa Missa com Novena do Perpétuo Socorro', 'missa'),
('Quinta-feira', '20:00', 'Santa Missa com Novena de N. Sra. Desatadora dos Nós', 'missa'),
('Sábado', '20:00', 'Santa Missa Dominical (Vigília)', 'missa'),
('Domingo', '09:15', 'Santa Missa Dominical', 'missa');

-- Insert Sample News
INSERT INTO public.news (title, content, published) VALUES
('Bem-vindo ao novo site!', 'É com alegria que lançamos nosso novo portal paroquial.', true),
('Inscrições para Catequese', 'As inscrições estão abertas para o ano de 2026. Procure a secretaria.', true);

-- Insert Sample Notice
INSERT INTO public.notices (title, message, is_urgent) VALUES
('Horários de Atendimento', 'A secretaria atende de segunda a sexta, das 8h às 12h e das 13h às 17h.', false);
