// tests/Card.spec.ts
import { mount } from '@vue/test-utils'
import Card from '../../components/Card.vue'
import { describe, it, expect } from 'vitest'

const mock = {
    id: 1,
    nome: 'JOÃO DA SILVA',
    idade: 30,
    sexo: 'MASCULINO',
    foto: 'https://exemplo.com/foto.jpg',
    ultimaOcorrencia: {
        dtDesaparecimento: '2025-03-29T21:40:00',
        dataLocalizacao: null,
        localDesaparecimentoConcat: 'Centro - Cuiabá/MT',
        ocorrenciaEntrevDesapDTO: {
            vestimentasDesaparecido: 'Camisa azul e calça jeans',
            informacao: ''
        }
    }
}

describe('Card.vue', () => {
    it('exibe nome, idade e status', () => {
        const wrapper = mount(Card, {
            props: {
                desaparecido: {
                    ...mock,
                    vivo: true,
                    ultimaOcorrencia: {
                        ...mock.ultimaOcorrencia,
                        encontradoVivo: true,
                        ocoId: 123,
                        listaCartaz: []
                    }
                }
            }
        })

        expect(wrapper.text()).toContain('JOÃO DA SILVA')
        expect(wrapper.text()).toContain('Idade: 30')
        expect(wrapper.text()).toContain('Desaparecido')
    })

    it('emite evento ao clicar no card', async () => {
        const wrapper = mount(Card, {
            props: {
                desaparecido: {
                    ...mock,
                    vivo: true,
                    ultimaOcorrencia: {
                        ...mock.ultimaOcorrencia,
                        encontradoVivo: true,
                        ocoId: 123,
                        listaCartaz: []
                    }
                }
            }
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted().click).toBeTruthy()
    })
})
