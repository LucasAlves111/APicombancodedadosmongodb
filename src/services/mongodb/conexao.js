import "dotenv/config";
import mongoose from "mongoose";
import { colecoesParaCriar } from "./seed-colecoes.js";

export const conexaoMongo = async () => {
    try{
        await mongoose.connect(
        process.env.MONGO_URL + process.env.MONGO_DATABASE )
        await colecoesParaCriar()
    } catch(error){
        console.error("Erro ao conectar ao MongoDB:", error);
    }
}