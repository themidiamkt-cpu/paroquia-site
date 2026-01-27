-- RESET AND SEED PASTORALS
-- This script first deletes existing pastorals to avoid duplicate errors, then re-inserts them.

-- 1. Delete existing pastorals (Cascade will delete members)
DELETE FROM pastorals WHERE slug IN (
    'batismo', 'canto', 'catequese', 'cac', 'dizimo', 'familia', 
    'jovens', 'liturgia', 'ministros', 'pascom', 'pequeninos', 'vicentinos'
);

-- 2. Insert Data

-- 1. Batismo
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Pastoral do Batismo', 'Preparação para o sacramento do Batismo.', 'Adriana Rodrigues', '19 98827-3281', 'batismo')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Adriana Rodrigues', 'Coordenadora - Matriz - 19 98827-3281' FROM p
UNION ALL SELECT id, 'Valdeir', 'Coordenador - Matriz - 19 98824-5326' FROM p
UNION ALL SELECT id, 'Jamilly', 'Coordenadora - Matriz - 19 98828-0445' FROM p
UNION ALL SELECT id, 'Paulo', 'Coordenador - Matriz - 19 98124-5838' FROM p;

-- 2. Canto
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Pastoral do Canto', 'Animação litúrgica através da música.', 'Leandro', '19 99177-9326', 'canto')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Leandro', 'Coordenador - Matriz - 19 99177-9326' FROM p;

-- 3. Catequese
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Catequese', 'Iniciação à vida cristã.', 'Valquiria', '19 99278-8999', 'catequese')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Valquiria', 'Coordenadora - SCJ - 19 99278-8999' FROM p
UNION ALL SELECT id, 'Ailan', 'Coordenador - NSD - 19 98841-1813' FROM p;

-- 4. Coroinhas, Acólitos e Cerimoniários (CAC)
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Coroinhas, Acólitos e Cerimoniários', 'Serviço ao altar nas celebrações.', 'Mônica', '19 98820-2929', 'cac')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Mônica', 'Coordenadora - NSA - 19 98820-2929' FROM p
UNION ALL SELECT id, 'Rosângela', 'Coordenadora - Matriz - 19 98401-3483' FROM p;

-- 5. Dízimo
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Pastoral do Dízimo', 'Conscientização sobre a partilha e manutenção da comunidade.', 'Mário', '19 99194-4638', 'dizimo')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Mário', 'Coordenador - Matriz - 19 99194-4638' FROM p
UNION ALL SELECT id, 'Ana Claudia', 'Coordenadora - Matriz - 19 99281-0286' FROM p
UNION ALL SELECT id, 'Francieldo', 'Coordenador - Matriz - 19 99355-3105' FROM p
UNION ALL SELECT id, 'Adriana Canuto', 'Coordenadora - Matriz - 19 99212-5974' FROM p;

-- 6. Família
INSERT INTO pastorals (name, description, coordinator, contact, slug)
VALUES ('Pastoral da Família', 'Acolhimento e evangelização das famílias.', 'A definir', NULL, 'familia');

-- 7. Jovens
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Pastoral da Juventude', 'Evangelização e protagonismo juvenil.', 'Rafaela', '19 99536-5549', 'jovens')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Rafaela', 'Coordenadora - SCJ - 19 99536-5549' FROM p
UNION ALL SELECT id, 'Rafael França', 'Coordenador - SCJ - 19 98411-1914' FROM p;

-- 8. Liturgia
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Pastoral da Liturgia', 'Organização das celebrações litúrgicas.', 'Rose', '19 98218-3916', 'liturgia')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Rose', 'Coordenadora - Matriz - 19 98218-3916' FROM p
UNION ALL SELECT id, 'Estella', 'Coordenadora - Matriz - 19 98804-0428' FROM p
UNION ALL SELECT id, 'Emerson', 'Coordenador - Matriz - 19 98217-4026' FROM p;

-- 9. Ministros
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Ministros Extraordinários', 'Serviço da Eucaristia e da Palavra.', 'Elisabete', '19 99949-0542', 'ministros')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Elisabete', 'Coordenadora (Eucaristia) - Matriz - 19 99949-0542' FROM p
UNION ALL SELECT id, 'Dulcelina', 'Coordenadora (Eucaristia) - SMI - 19 99123-0911' FROM p
UNION ALL SELECT id, 'Selma', 'Coordenadora (Palavra) - Matriz - 19 99311-1534' FROM p
UNION ALL SELECT id, 'Gabriel', 'Coordenador (Palavra) - 19 99686-8294' FROM p;

-- 10. Pascom
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Pascom (Pastoral da Comunicação)', 'Comunicação e divulgação das ações da paróquia.', 'Camila', '19 99403-7853', 'pascom')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Camila', 'Coordenadora - Matriz - 19 99403-7853' FROM p
UNION ALL SELECT id, 'Roberto', 'Coordenador - Matriz - 19 99931-5179' FROM p;

-- 11. Pequeninos do Senhor
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Pequeninos do Senhor', 'Evangelização de crianças durante as missas.', 'Cristina', '19 99909-0221', 'pequeninos')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'Cristina', 'Coordenadora - Matriz - 19 99909-0221' FROM p
UNION ALL SELECT id, 'Graciela', 'Coordenadora - SCJ - 19 99292-5967' FROM p;

-- 12. Vicentinos
WITH p AS (
    INSERT INTO pastorals (name, description, coordinator, contact, slug)
    VALUES ('Vicentinos', 'Serviço aos pobres e necessitados.', 'José Matheus', '19 99517-0850', 'vicentinos')
    RETURNING id
)
INSERT INTO pastoral_members (pastoral_id, name, role)
SELECT id, 'José Matheus', 'Coordenador - Matriz - 19 99517-0850' FROM p
UNION ALL SELECT id, 'Cleuza', 'Coordenadora - Matriz - 19 99436-7066' FROM p;
