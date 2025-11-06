-- Atualizar produtos com imagens e ajustar para as categorias corretas
USE loja_musical;

-- Atualizar produtos existentes com imagens
UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400',
  categoria_id = 1
WHERE nome LIKE '%Violão%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400',
  categoria_id = 1
WHERE nome LIKE '%Guitarra%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1460036521480-ff49c08c2781?w=400',
  categoria_id = 1
WHERE nome LIKE '%Violino%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=400',
  categoria_id = 2
WHERE nome LIKE '%Bateria%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1563330232-57114bb0823c?w=400',
  categoria_id = 2
WHERE nome LIKE '%Pandeiro%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=400',
  categoria_id = 2
WHERE nome LIKE '%Caixa%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=400',
  categoria_id = 3
WHERE nome LIKE '%Flauta%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400',
  categoria_id = 3
WHERE nome LIKE '%Saxofone%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400',
  categoria_id = 4
WHERE nome LIKE '%Teclado%';

UPDATE produtos SET 
  imagem_url = 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400',
  categoria_id = 4
WHERE nome LIKE '%Piano%';

SELECT * FROM produtos;
