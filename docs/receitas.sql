DROP DATABASE IF EXISTS receitas;

CREATE DATABASE receitas DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE receitas;

DROP TABLE IF EXISTS `receita`;

CREATE TABLE `receita` (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(50) NOT NULL, 
    descricao VARCHAR(50) NOT NULL,  
    tempo_preparo VARCHAR(50) NOT NULL, 
    rendimento VARCHAR(50) NOT NULL, 
    created DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

);

INSERT INTO `receita` 
(nome, descricao, tempo_preparo, rendimento) 
VALUES ('Bolo de Abacaxi', 'Bolo de Abacaxi', '1 hora', '10 porções');

