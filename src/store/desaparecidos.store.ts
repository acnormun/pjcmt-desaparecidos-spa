import { defineStore } from 'pinia'
import { buscarDesaparecidos } from '../api/desaparecidos/requests'
import mock from '../mock.json'
export const useDesaparecidosStore = defineStore('desaparecidos', {
    state: () => ({
        lista: [] as any[],
        loading: false
    }),
    actions: {
        async getDesaparecidos() {
            this.loading = true
            try {
                this.lista = await buscarDesaparecidos({
                    faixaIdadeFinal: 0,
                    faixaIdadeInicial: 0,
                    nome: '',
                    porPagina: 12,
                    sexo: '',
                    status: 'DESAPARECIDO',
                    pagina: 0
                })
            } catch (err) {
                console.error('Erro ao buscar desaparecidos:', err)
            } finally {
                this.loading = false
            }
        },

        mockarDesaparecidos() {
            this.lista = mock
        }
    }
})
