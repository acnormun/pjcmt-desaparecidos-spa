import api from '../index'
import { adaptarDesaparecido } from './adapters'
import type { FiltroDesaparecidos } from '../../types/desaparecidos'

export const buscarDesaparecidos = async (filtro: FiltroDesaparecidos) => {
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

    return response.data.content.map(adaptarDesaparecido)
}
