import { defineStore } from 'pinia'
import { buscarDesaparecidos } from '../api/desaparecidos/requests'
import type { Desaparecido, FiltroDesaparecidos } from '../types/desaparecidos'

export const useDesaparecidosStore = defineStore('desaparecidos', {
    state: () => ({
        lista: [] as Desaparecido[],
        loading: false,
        pagina: 0,
        totalPaginas: 0,
        filtros: {
            nome: '',
            sexo: '',
            status: 'DESAPARECIDO',
            faixaIdadeInicial: 0,
            faixaIdadeFinal: 0
        },
        selecionado: null as Desaparecido | null,
        registrosAcumulados: {
            total: 0,
            porMes: [] as { mes: string; quantidade: number }[],
            porRegiao: [] as { regiao: string; quantidade: number }[],
            porSexo: [] as { sexo: string; quantidade: number }[]
        }
    }),

    actions: {
        async getDesaparecidos(pagina: number) {
            this.loading = true
            this.pagina = pagina
            try {
                const data = await buscarDesaparecidos({
                    ...this.filtros,
                    porPagina: 12,
                    pagina
                })

                this.lista = data
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },

        setFiltros(novosFiltros: Partial<FiltroDesaparecidos>) {
            this.filtros = { ...this.filtros, ...novosFiltros }
            this.getDesaparecidos(0)
        },

        setSelecionado(desaparecido: Desaparecido) {
            this.selecionado = desaparecido
        },
    }
})
