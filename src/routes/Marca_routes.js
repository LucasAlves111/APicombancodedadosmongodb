import express from "express";
import { Marca } from "../models/Marca.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const novaMarca = await Marca.create(req.body);
    res.status(201).json(novaMarca);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



export default router;
