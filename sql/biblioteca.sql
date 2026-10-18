CREATE DATABASE IF NOT EXISTS locadora_filmes;
USE locadora_filmes;

CREATE TABLE IF NOT EXISTS filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    diretor VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    genero VARCHAR(60) NOT NULL,
    valor_diaria DECIMAL(8,2) NOT NULL
);

INSERT INTO filmes (titulo, diretor, ano, genero, valor_diaria) VALUES
('Harry Potter e a Pedra Filosofal', 'Chris Columbus', 2001, 'Fantasia', 5.00),
('Harry Potter e a Câmara Secreta', 'Chris Columbus', 2002, 'Fantasia', 5.00),
('Jurassic Park', 'Steven Spielberg', 1993, 'Aventura', 4.50),
('Homem-Aranha', 'Sam Raimi', 2002, 'Ação', 4.00),
('Divertida Mente', 'Pete Docter', 2015, 'Animação', 4.00);

SELECT * FROM filmes;
