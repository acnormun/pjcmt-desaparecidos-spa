import { defineStore } from 'pinia'
import { buscarDesaparecidos } from '../api/desaparecidos/requests'
import type { Desaparecido, FiltroDesaparecidos } from '../types/desaparecidos'

export const useDesaparecidosStore = defineStore('desaparecidos', {
    state: () => ({
        lista: [] as Desaparecido[],
        acumulados: [] as Desaparecido[], 
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
                this.adicionarNosAcumulados(data)
                this.calcularRegistrosAcumulados()
            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },

        adicionarNosAcumulados(novos: Desaparecido[]) {
            novos.forEach((novo) => {
                const jaExiste = this.acumulados.some((d) => d.id === novo.id)
                if (!jaExiste) {
                    this.acumulados.push(novo)
                }
            })
        },

        setFiltros(novosFiltros: Partial<FiltroDesaparecidos>) {
            this.filtros = { ...this.filtros, ...novosFiltros }
            this.resetarAcumulados()
            this.getDesaparecidos(0)
        },

        resetarAcumulados() {
            this.acumulados = []
            this.registrosAcumulados = {
                total: 0,
                porMes: [],
                porRegiao: [],
                porSexo: []
            }
        },

        setSelecionado(desaparecido: Desaparecido) {
            this.selecionado = desaparecido
        },

        calcularRegistrosAcumulados() {
            const registros = this.acumulados
            this.registrosAcumulados.total = registros.length
            this.registrosAcumulados.porMes = this.calcularPorMes(registros)
            this.registrosAcumulados.porRegiao = this.calcularPorRegiao(registros)
            this.registrosAcumulados.porSexo = this.calcularPorSexo(registros)
        },

        calcularPorMes(registros: Desaparecido[]) {
            const porMes = new Map<string, number>()
            registros.forEach(registro => {
                const data = new Date(registro.ultimaOcorrencia?.dtDesaparecimento || '')
                if (!isNaN(data.getTime())) {
                    const mes = `${data.getFullYear()}/${(data.getMonth() + 1).toString().padStart(2, '0')}`
                    porMes.set(mes, (porMes.get(mes) || 0) + 1)
                }
            })
            return Array.from(porMes.entries()).map(([mes, quantidade]) => ({ mes, quantidade }))
        },

        calcularPorRegiao(registros: Desaparecido[]) {
            const porRegiao = new Map<string, number>()
            registros.forEach(registro => {
                const regiao = registro.ultimaOcorrencia?.localDesaparecimentoConcat || 'Desconhecido'
                porRegiao.set(regiao, (porRegiao.get(regiao) || 0) + 1)
            })
            return Array.from(porRegiao.entries()).map(([regiao, quantidade]) => ({ regiao, quantidade }))
        },

        calcularPorSexo(registros: Desaparecido[]) {
            const porSexo = new Map<string, number>()
            registros.forEach(registro => {
                const sexo = registro.sexo?.toUpperCase() || 'NÃO INFORMADO'
                porSexo.set(sexo, (porSexo.get(sexo) || 0) + 1)
            })
            return Array.from(porSexo.entries()).map(([sexo, quantidade]) => ({ sexo, quantidade }))
        }
    }
})
