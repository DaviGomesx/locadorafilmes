import express from "express";
import {listarLivros, cadastrarLivro, atualizarLivro, buscarLivroPorId, excluirLivro} from "../controllers/livrosController.js";

const router = express.Router();
router.get("/", listarLivros);
router.post("/", cadastrarLivro);
router.put("/:id", atualizarLivro);
router.get("/:id", buscarLivroPorId);
router.delete("/:id", excluirLivro);

export default router;