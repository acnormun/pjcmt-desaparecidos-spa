import { defineStore } from "pinia"
import { buscarDesaparecidos } from "../api/desaparecidos/requests"
import mock from "../mock.json"

export const useDesaparecidosStore = defineStore('desaparecidos', {
    state: () => ({
        lista: [] as any[],
        loading: false,
        pagina: 0,
        totalPaginas: 0,
        filtros: {
            nome: '',
            sexo: '',
            status: 'DESAPARECIDO',
            faixaIdadeInicial: 0,
            faixaIdadeFinal: 0
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

        setFiltros(novosFiltros: Partial<typeof this.filtros>) {
            this.filtros = { ...this.filtros, ...novosFiltros }
            this.getDesaparecidos(0)
        },

        mockarDesaparecidos() {
            this.lista = mock
        }
    }
})
