import { Request, Response } from "express";
import { connection } from "../dao/connect";
import * as tedious from "tedious";
const tediousRequest = tedious.Request;
const TYPES = tedious.TYPES;

export const listar = (req: Request, res: Response) => {

    let strQuery = `SELECT * FROM receita`;

    const bdRequest = new tediousRequest(strQuery, (err, rowCount) => {
        console.log("oi");
        if (err) {
            console.log(err);
            return res.status(400).json(err)
        } else {
            console.log(rowCount + " rows");
            res.status(200).json({ message: "Listado com sucesso" });
        }
    });

    connection.execSql(bdRequest);
    setTimeout(() => {
        console.log("closing connection")
        connection.close();
    }, 1000);



}

export const inserir = (req: Request, res: Response) => {
    const { nome, desc, tempoPreparo, rendimento } = req.body;
    
    let strQuery = `INSERT INTO receita (nome, descricao, tempo_preparo, rendimento)
     VALUES 
    ('${nome}', '${desc}', '${tempoPreparo}', '${rendimento}')`;
    const bdRequest = new tediousRequest(strQuery, (err, rowCount) => {
        if (err) {
            console.log(err);
            connection.close();
            return res.status(400).json(err)

        } else {
            console.log(rowCount + " rows");
            res.status(201).json({ message: "Inserido com sucesso" });
            connection.close();
        }
    });

    connection.execSql(bdRequest);
    setTimeout(() => {
        console.log("closing connection")
        connection.close();
    }, 1000);
}