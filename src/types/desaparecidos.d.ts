export interface Desaparecido {
    id: number
    nome: string
    idade: number
    sexo: string
    vivo: boolean
    foto: string
    ultimaOcorrencia: {
        dtDesaparecimento: string
        dataLocalizacao: string | null
        encontradoVivo: boolean
        localDesaparecimentoConcat: string
        ocoId: number
        ocorrenciaEntrevDesapDTO: {
            informacao: string | null
            vestimentasDesaparecido: string
        }
        listaCartaz: unknown
    }
}


export interface FiltroDesaparecidos {
    faixaIdadeFinal: number
    faixaIdadeInicial: number
    nome: string
    porPagina: number
    sexo: string
    status: string
    pagina: number
}

export interface Informacao {
    [
    {
        "ocoId": 0,
        "informacao": "string",
        "data": "2022-01-28",
        "id": 0,
        "anexos": [
            "string"
        ]
    }
    ]
}

