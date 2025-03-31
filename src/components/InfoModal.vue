<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click.self="emit('close')">
        <div class="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
            <h2 class="text-xl font-bold mb-4">Você tem informações sobre esta pessoa?</h2>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">
                    Informações <span class="text-red-600">*</span>
                </label>
                <textarea v-model="form.informacao" rows="4" placeholder="Ex: Vi essa pessoa na rodoviária..."
                    class="mt-1 block w-full border rounded px-3 py-2" :class="{
                        'border-gray-300': !erro,
                        'border-red-500': erro
                    }"></textarea>
                <p v-if="erro" class="text-red-600 text-sm mt-1">Este campo é obrigatório.</p>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Data da observação</label>
                <input v-model="form.data" type="date"
                    class="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Anexo (opcional)</label>
                <input type="file" accept="image/*" @change="handleUpload" class="mt-1 block w-full text-sm" />
            </div>

            <div class="mb-4" v-if="form.anexo">
                <label class="block text-sm font-medium text-gray-700">Descrição do anexo</label>
                <input v-model="form.anexoDescricao" type="text" placeholder="Ex: Foto tirada na praça central"
                    class="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div class="flex justify-end gap-2 mt-6">
                <button @click="emit('close')" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
                    Cancelar
                </button>
                <button @click="handleSubmit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                    Enviar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Informacao } from '../types/desaparecidos'

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'submit', payload: Informacao): void
}>()

const form = ref({
    informacao: '',
    data: new Date().toISOString().split('T')[0],
    anexo: null as File | null,
    anexoDescricao: ''
})

const erro = ref(false)

const handleUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        form.value.anexo = file
    }
}

const handleSubmit = () => {
    if (!form.value.informacao.trim()) {
        erro.value = true
        return
    }

    erro.value = false

    const reader = new FileReader()

    reader.onload = () => {
        const base64 = reader.result as string

        const payload: Informacao = {
            ocoId: 0,
            informacao: form.value.informacao.trim(),
            data: form.value.data,
            id: 0,
            anexos: form.value.anexo
                ? [`${form.value.anexoDescricao}||${base64}`]
                : []
        }

        emit('submit', payload)
        emit('close')
    }

    if (form.value.anexo) {
        reader.readAsDataURL(form.value.anexo)
    } else {
        handleSubmitWithoutFile()
    }
}

const handleSubmitWithoutFile = () => {
    const payload: Informacao = {
        ocoId: 0,
        informacao: form.value.informacao.trim(),
        data: form.value.data,
        id: 0,
        anexos: []
    }
    emit('submit', payload)
    emit('close')
}
</script>