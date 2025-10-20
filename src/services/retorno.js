export const retorno = (mensagem, possuierro) => {
    if (typeof possuierro !== "boolean" || !mensagem || mensagem.length < 1) {
        return null
    }

    return {
        mensagem: mensagem,
        erro: possuierro
    }
}
