import mongoose from "mongoose";

const marcaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  paisOrigem: { type: String },
}, { timestamps: true });

export const Marca = mongoose.model("Marca", marcaSchema);
