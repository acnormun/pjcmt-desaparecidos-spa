import api from '../index'
import { adaptarDesaparecido } from './adapters'
import type { FiltroDesaparecidos, Informacao } from '../../types/desaparecidos'
import { useDesaparecidosStore } from '../../store/desaparecidos.store'

export const buscarDesaparecidos = async (filtro: FiltroDesaparecidos) => {
    const store = useDesaparecidosStore()
    const queryParams = new URLSearchParams({
        faixaIdadeFinal: filtro.faixaIdadeFinal.toString(),
        faixaIdadeInicial: filtro.faixaIdadeInicial.toString(),
        nome: filtro.nome,
        porPagina: filtro.porPagina.toString(),
        sexo: filtro.sexo,
        status: filtro.status,
        pagina: filtro.pagina.toString()
    })
    const response = await api.get(`pessoas/aberto/filtro?${queryParams.toString()}`)

    store.totalPaginas = response.data.totalPages

    return response.data.content.map(adaptarDesaparecido)
}

export const enviarInformacao = async (id: string, informacao: Informacao) => {
    const response = await api.post(`pessoas/${id}/informacao`, { informacao })
    return response.data
}
