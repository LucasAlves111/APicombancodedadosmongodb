import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: String,
  marca: { type: mongoose.Schema.Types.ObjectId, ref: "Marca" } // relação com marca
}, { timestamps: true });

 const Produto = mongoose.model("Produto", produtoSchema);

export default Produto;
