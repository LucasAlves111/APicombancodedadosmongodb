import { retorno } from "../retorno.js"

export const criarColecao = async (colecoes) => {
    try{
        if (colecoes.lengh == 0){
        return retorno("Não existe coleções para serem criadas", true)
        }

        const {db} = mongoose.connection;
        const todasAsColecoes = await db.listCollections().toArray();
        const arrayColecoesExistentes = todasAsColecoes.map((colecao) => colecao.name);

        let ColecoesExistentes = []
        let ColecoesCriadas = []
        colecoes.map((colecao) => {
            if(arrayColecoesExistentes.includes(colecao.nome))
               return ColecoesExistentes.push(colecao.nome)

            colecoesCriadas.push(colecao.nome)
            return mongoose.model(colecao.nome, colecao.schema)})

            if (colecoesCriadas.length === 0)
                return retorno("Não fora criadas novas coleções", false)

            return retorno(`As Coleções ${ColecoesCriadas} from criadas com sucesso.` , false)
            

    }catch (error) {
        return retorno("Erro ao executar a funcão das coleções", true)
    }
}