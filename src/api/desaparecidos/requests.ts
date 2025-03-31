import api from '../index'
import { adaptarDesaparecido } from './adapters'
import type { FiltroDesaparecidos } from '../../types/desaparecidos'
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
