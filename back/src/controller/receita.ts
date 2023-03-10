import { Request, Response } from "express";
import { con } from "../dao/connect";
// import * as tedious from "tedious";
// const tediousRequest = tedious.Request;
// const TYPES = tedious.TYPES;

export const listar = (req: Request, res: Response) => {

    let strQuery = `SELECT * FROM receita`;

    con.query(strQuery, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Erro ao buscar receitas", error: err });
        } else {
            res.status(200).json(result);
        }
    });
}


export const listarUm = (req: Request, res: Response) => {
    const { id } = req.params;

    let strQuery = `SELECT * FROM receita WHERE id = ${id}`;

    con.query(strQuery, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Erro ao buscar receita", error: err });
        } else {
            res.status(200).json(result);
        }
    });
}


export const inserir = (req: Request, res: Response) => {
    const { nome, ingredientes, desc, tempoPreparo, rendimento, img } = req.body;
    console.log(req.body)

    let strQuery = `INSERT INTO receita (nome, descricao, tempo_preparo, rendimento, img)
     VALUES 
    ('${nome}', '${ingredientes}' , '${desc}', '${tempoPreparo}', '${rendimento}', '${img})`;

    con.query(strQuery, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Erro ao inserir receita", error: err });
        } else {
            res.status(200).json(result);
        }
    });
}

export const atualizar = (req: Request, res: Response) => {
    const { id } = req.params;

    const { nome, desc, tempoPreparo, rendimento } = req.body;

    let strQuery = `UPDATE receita SET 
    nome = '${nome}', 
    descricao = '${desc}', 
    tempo_preparo = '${tempoPreparo}', 
    rendimento = '${rendimento}' 
    WHERE id = ${id}`;

    con.query(strQuery, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Erro ao atualizar receita", error: err });
        } else {
            res.status(200).json(result);
        }
    });
}

export const deletar = (req: Request, res: Response) => {
    const { id } = req.params;

    let strQuery = `DELETE FROM receita WHERE id = ${id}`;

    con.query(strQuery, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Erro ao deletar receita", error: err });
        } else {
            res.status(200).json(result);
        }
    });
}
