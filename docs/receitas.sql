DROP DATABASE IF EXISTS receitas;

CREATE DATABASE receitas DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE receitas;

DROP TABLE IF EXISTS `receita`;

CREATE TABLE `receita` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    ingredientes TEXT NOT NULL,
    tempo_preparo VARCHAR(50) NOT NULL,
    rendimento VARCHAR(50) NOT NULL,
    created DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    img VARCHAR(50)
);

INSERT INTO
    `receita` (
        nome,
        descricao,
        ingredientes,
        tempo_preparo,
        rendimento,
        img
    )
VALUES
    (
        'Bolo de Cenoura',
        'Bolo de Cenoura',
        'Farinha, açucar, cenoura, ovos, leite, fermento',
        '1 hora',
        '10 porções',
        'bolo_cenoura.webp'
    ),
    (
        'Bolo de Chocolate',
        'Bolo de Chocolate',
        'Farinha, açucar, chocolate, ovos, leite, fermento',
        '1 hora',
        '10 porções',
        'bolo_chocolate.webp'
    ),
    (
        'Beijinho',
        'Beijinho',
        'Leite condensado, coco ralado, manteiga',
        '1 hora',
        '10 porções',
        'beijinho.webp'
    ),
    (
        'Brigadeiro',
        'Brigadeiro',
        'Leite condensado, chocolate em pó, manteiga',
        '1 hora',
        '10 porções',
        'brigadeiro.webp'
    ),
    (
        'Pastel',
        'Pastel',
        'Farinha, açucar, ovos, leite, fermento',
        '1 hora',
        '10 porções',
        'pastel.webp'
    );


select
    *
from
    `receita`;