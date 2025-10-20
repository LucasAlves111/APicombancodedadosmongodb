import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  produtos: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
    quantidade: Number
  }],
  total: Number,
}, { timestamps: true });

export const Pedido = mongoose.model("Pedido", pedidoSchema);
