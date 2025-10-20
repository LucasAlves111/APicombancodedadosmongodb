import express from "express";
import { Pedido } from "../models/Pedido.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const novoPedido = await Pedido.create(req.body);
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



export default router;
