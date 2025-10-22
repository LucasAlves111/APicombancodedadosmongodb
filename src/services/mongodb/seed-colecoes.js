import mongoose from "mongoose"
import { criarColecao } from "./criar-colecao.js"
import  Marca  from "../../models/Marca.js"
import  Produto  from "../../models/Produto.js"
import  Pedido  from "../../models/Pedido.js"

export const colecoesParaCriar = async () => {
    const marcasSchema = {
        name: 'marcas',
        schema: new mongoose.Schema({
            nome: { type: String, required: true },
            site: { type: String, required: true },
            telefone: { type: String, required: true }
        })
    }

    const produtosSchema = {
        name: 'produtos',
        schema: new mongoose.Schema({
            nome: { type: String, required: true },
            preco: { type: Number, required: true },
            descricao: { type: String },
            marca: { type: mongoose.Schema.Types.ObjectId, ref: 'marcas' }
        })
    }

    const pedidosSchema = {
        name: 'pedidos',
        schema: new mongoose.Schema({
            data: { type: Date, default: Date.now },
            produtos: [{
                produto: { type: mongoose.Schema.Types.ObjectId, ref: 'produtos' },
                quantidade: { type: Number, default: 1 }
            }],
            total: { type: Number, required: true }
        })
    }

    await criarColecao([marcasSchema, produtosSchema, pedidosSchema])


    const dummyMarca = await Marca.create({ nome: "Dummy Marca", site: "dummy.com", telefone: "0000" })
    await Produto.create({ nome: "Dummy Produto", preco: 0, descricao: "teste", marca: dummyMarca._id })
    await Pedido.create({ produtos: [], total: 0 })

    console.log(" Collections created")
}
