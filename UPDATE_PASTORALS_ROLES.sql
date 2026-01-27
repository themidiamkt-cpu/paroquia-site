-- Update all pastoral members to have 'Coordenador' in their role if they don't already

UPDATE pastoral_members
SET role = REPLACE(role, 'Membro', 'Coordenador')
WHERE role LIKE '%Membro%';

UPDATE pastoral_members
SET role = REPLACE(role, 'Coordenadora', 'Coordenadora') -- No change needed, just ensuring consistency
WHERE role LIKE '%Coordenadora%';

-- Specific updates for those who might have been missed or need specific titles
UPDATE pastoral_members SET role = 'Coordenador - Matriz - 19 98824-5326' WHERE name = 'Valdeir';
UPDATE pastoral_members SET role = 'Coordenadora - Matriz - 19 98828-0445' WHERE name = 'Jamilly';
UPDATE pastoral_members SET role = 'Coordenador - Matriz - 19 98124-5838' WHERE name = 'Paulo';
UPDATE pastoral_members SET role = 'Coordenadora - Matriz - 19 99281-0286' WHERE name = 'Ana Claudia';
UPDATE pastoral_members SET role = 'Coordenador - Matriz - 19 99355-3105' WHERE name = 'Francieldo';
UPDATE pastoral_members SET role = 'Coordenadora - Matriz - 19 99212-5974' WHERE name = 'Adriana Canuto';
UPDATE pastoral_members SET role = 'Coordenadora - Matriz - 19 98804-0428' WHERE name = 'Estella';
UPDATE pastoral_members SET role = 'Coordenador - Matriz - 19 98217-4026' WHERE name = 'Emerson';
UPDATE pastoral_members SET role = 'Coordenador - Matriz - 19 99931-5179' WHERE name = 'Roberto';
UPDATE pastoral_members SET role = 'Coordenadora - Matriz - 19 99436-7066' WHERE name = 'Cleuza';
