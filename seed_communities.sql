-- Seed Communities and Coordinators

-- 1. Com. Matriz
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade Matriz', 'Endereço a definir', 'Comunidade Matriz da Paróquia.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Jacob Fernandes dos Santos', '19 99813-1769' FROM c;

-- 2. Com. Nossa Senhora Aparecida
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade Nossa Senhora Aparecida', 'Endereço a definir', 'Capela Nossa Senhora Aparecida.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Celia de Jesus Nogueira Ferreira', '19 99549-8888' FROM c;

-- 3. Com. Nossa Senhora das Dores
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade Nossa Senhora das Dores', 'Endereço a definir', 'Capela Nossa Senhora das Dores.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Vanderlei Aparecido da Silva', '19 99782-1605' FROM c
UNION ALL SELECT id, 'Simone Maria da Conceição', '19 99119-3467' FROM c;

-- 4. Com. Nossa Senhora das Graças
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade Nossa Senhora das Graças', 'Endereço a definir', 'Capela Nossa Senhora das Graças.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Celso Dionísio Silva', '19 98132-4108' FROM c
UNION ALL SELECT id, 'Vanessa de Oliveira Santos', '19 98982-6163' FROM c;

-- 5. Com. Sagrado Coração de Jesus
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade Sagrado Coração de Jesus', 'Endereço a definir', 'Capela Sagrado Coração de Jesus.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Francisco Rodrigues de Oliveira', '19 98970-1616' FROM c
UNION ALL SELECT id, 'Carlos Eduardo da Silva', '19 99206-7832' FROM c;

-- 6. Com. Santa Maria Imaculada
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade Santa Maria Imaculada', 'Endereço a definir', 'Capela Santa Maria Imaculada.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Silvana Rita Souza Nascimento', '19 99183-0723' FROM c
UNION ALL SELECT id, 'Dionísio Inácio dos Santos', '19 99447-3269' FROM c;

-- 7. Com. Santo Antônio
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade Santo Antônio', 'Endereço a definir', 'Capela Santo Antônio.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Amelia Conceição de Lima', '19 99745-9363' FROM c
UNION ALL SELECT id, 'Rozania Custódio dos Reis', '19 99417-6890' FROM c;

-- 8. Com. São João Batista
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade São João Batista', 'Endereço a definir', 'Capela São João Batista.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Gicelma Pereira de Sá Silva', '19 98340-1881' FROM c;

-- 9. Com. São José Operário
WITH c AS (
    INSERT INTO communities (name, address, description)
    VALUES ('Comunidade São José Operário', 'Endereço a definir', 'Capela São José Operário.')
    RETURNING id
)
INSERT INTO community_coordinators (community_id, name, contact)
SELECT id, 'Marcelo Miranda Leite', '19 99346-6460' FROM c
UNION ALL SELECT id, 'Maria de Fátima Silva Quinteiro', '19 98881-8342' FROM c;
