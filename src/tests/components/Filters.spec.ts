import { mount } from '@vue/test-utils'
import Filters from '../../components/Filters.vue'
import { describe, it, expect } from 'vitest'

describe('Filters.vue', () => {
    it('emite os filtros ao clicar no botão "Aplicar"', async () => {
        const wrapper = mount(Filters)

        // Simula preenchimento
        await wrapper.find('input[type="text"]').setValue('Maria')
        await wrapper.find('select').setValue('LOCALIZADO')

        await wrapper.find('button.bg-blue-500').trigger('click')

        expect(wrapper.emitted('update')).toBeTruthy()
        const payload = wrapper.emitted('update')?.[0][0] as { nome: string, status: string }

        expect(payload.nome).toBe('Maria')
        expect(payload.status).toBe('LOCALIZADO')
    })

    it('limpa os filtros ao clicar em "Limpar"', async () => {
        const wrapper = mount(Filters)

        await wrapper.find('input[type="text"]').setValue('Teste')
        await wrapper.find('select').setValue('MASCULINO')

        await wrapper.find('button.border').trigger('click')

        expect(wrapper.emitted('update')).toBeTruthy()
        const payload = wrapper.emitted('update')?.[0][0] as { nome: string, status: string, sexo: string }

        expect(payload.nome).toBe('')
        expect(payload.status).toBe('DESAPARECIDO')
        expect(payload.sexo).toBe('')
    })
})
