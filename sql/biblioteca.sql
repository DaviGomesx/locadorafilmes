create database biblioteca_dom;
use biblioteca_dom;

create table livros(
id int auto_increment primary key,
titulo varchar(150) not null,
autor varchar(100) not null,
ano int not null
);

insert into livros(titulo, autor, ano) values
('Dom Casmurro', 'Machado de Assis', 1899),
('O Hobbit', 'J. R. R. Tolkien', 1937),
('1984', 'Geoge Orwell', 1937),
('O pequeno Príncipe', 'Antoine e Saint-Exupéry', 1943),
('Harry Potter e a Pedra Filosofal', 'J. K. Rowling', 1997);
select * from livros;