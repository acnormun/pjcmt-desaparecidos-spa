import type { Desaparecido } from '../../types/desaparecidos'

export const adaptarDesaparecido = (item: any): Desaparecido => ({
    id: item.id,
    nome: item.nome,
    idade: item.idade,
    sexo: item.sexo,
    vivo: item.vivo,
    foto: item.urlFoto,
    ultimaOcorrencia: {
        dtDesaparecimento: item.ultimaOcorrencia?.dtDesaparecimento,
        dataLocalizacao: item.ultimaOcorrencia?.dataLocalizacao,
        encontradoVivo: item.ultimaOcorrencia?.encontradoVivo,
        localDesaparecimentoConcat: item.ultimaOcorrencia?.localDesaparecimentoConcat || '',
        ocoId: item.ultimaOcorrencia?.ocoId,
        ocorrenciaEntrevDesapDTO: {
            informacao: item.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao,
            vestimentasDesaparecido: item.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || ''
        },
        listaCartaz: item.ultimaOcorrencia?.listaCartaz
    }
})
