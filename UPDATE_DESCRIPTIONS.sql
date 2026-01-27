-- Update descriptions to use "Comunidade" instead of "Capela"

UPDATE communities 
SET description = REPLACE(description, 'Capela', 'Comunidade') 
WHERE description LIKE '%Capela%';
