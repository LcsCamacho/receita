import { Router } from "express";
import { inserir, listar, listarUm, atualizar, deletar } 
from "../controller/receita";

export const routerReceita = Router();

routerReceita.post("/receita", inserir)
routerReceita.get("/receita", listar)
routerReceita.get("/receita/:id", listarUm)
routerReceita.put("/receita/:id", atualizar)
routerReceita.delete("/receita/:id", deletar)


