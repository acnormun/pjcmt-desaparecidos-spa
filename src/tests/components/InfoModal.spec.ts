import { mount } from '@vue/test-utils'
import InfoModal from '../../components/InfoModal.vue'
import { describe, it, expect } from 'vitest'

describe('InfoModal.vue', () => {
    it('mostra erro se o campo de informação estiver vazio', async () => {
        const wrapper = mount(InfoModal)

        await wrapper.find('button.bg-blue-600').trigger('click')

        expect(wrapper.html()).toContain('Este campo é obrigatório.')
        expect(wrapper.emitted('submit')).toBeFalsy()
    })

    it('emite submit com dados corretos (sem anexo)', async () => {
        const wrapper = mount(InfoModal)

        await wrapper.find('textarea').setValue('Vi essa pessoa na rodoviária')
        await wrapper.find('button.bg-blue-600').trigger('click')

        const emit = wrapper.emitted('submit')
        expect(emit).toBeTruthy()
        const payload = emit?.[0][0]

        expect(payload).toMatchObject({
            ocoId: 0,
            id: 0,
            informacao: 'Vi essa pessoa na rodoviária',
            anexos: expect.any(Array),
            data: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
        })
    })

    it('emite close ao cancelar', async () => {
        const wrapper = mount(InfoModal)

        await wrapper.find('button.bg-gray-200').trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
    })
})
