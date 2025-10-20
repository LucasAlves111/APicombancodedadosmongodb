import mongoose from "mongoose";

export async function connectMongo() {
  const uri = process.env.MONGO_URL + process.env.MONGO_DATABASE;

  try {
    await mongoose.connect(uri);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}
