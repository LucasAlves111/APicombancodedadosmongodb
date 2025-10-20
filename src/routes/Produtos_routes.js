import express from "express";
import { Produto } from "../models/Produto.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



export default router;
