import { defineStore } from 'pinia'
import { buscarDesaparecidos } from '../api/desaparecidos/requests'
import mock from '../mock.json'
export const useDesaparecidosStore = defineStore('desaparecidos', {
    state: () => ({
        lista: [] as any[],
        loading: false,
        pagina: 0,
        totalPaginas: 0
    }),
    actions: {
        async getDesaparecidos(pagina: number) {
            this.loading = true
            this.pagina = pagina
            try {
                const data = await buscarDesaparecidos({
                    faixaIdadeFinal: 0,
                    faixaIdadeInicial: 0,
                    nome: '',
                    porPagina: 12,
                    sexo: '',
                    status: 'DESAPARECIDO',
                    pagina: pagina
                })
                this.lista = data
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },

        mockarDesaparecidos() {
            this.lista = mock
        }
    }
})
