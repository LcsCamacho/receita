import { Router } from "express";
import { inserir, listar } from "../controller/receita";

export const routerReceita = Router();

routerReceita.post("/receita",inserir)
routerReceita.get("/receita",listar)

