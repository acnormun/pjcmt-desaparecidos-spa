<template>
    <nav class="text-sm text-gray-600 mb-4">
        <router-link to="/" class="text-blue-600 hover:underline">Home</router-link>
        <span class="mx-1">/</span>
        <span class="font-medium text-gray-800">
            {{ pessoa?.nome || 'Detalhes' }}
        </span>
    </nav>

    <div class="p-6 max-w-2xl mx-auto bg-white rounded shadow">
        <div class="flex flex-col md:flex-row gap-6">
            <img :src="pessoa?.foto" class="rounded w-[300px] mx-auto md:mx-0" />
            <div class="p-2 flex-1">
                <h2 class="text-2xl font-bold mb-2">{{ pessoa?.nome }}</h2>
                <p><strong>Idade:</strong> {{ pessoa?.idade }}</p>
                <p><strong>Sexo:</strong> {{ pessoa?.sexo }}</p>
                <p>
                    <strong>Desaparecimento:</strong>
                    {{ new Date(pessoa?.ultimaOcorrencia?.dtDesaparecimento || '').toLocaleDateString() }}
                </p>
                <p><strong>Local:</strong> {{ pessoa?.ultimaOcorrencia?.localDesaparecimentoConcat }}</p>
                <p><strong>Vestimentas:</strong> {{
                    pessoa?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido }}</p>
                <div class="mt-6 text-center">
                    <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        @click="handleInfoClick">
                        Você viu essa pessoa?
                    </button>
                </div>
            </div>
        </div>
        <InfoModal v-if="showInfoModal" :pessoa="pessoa" @close="showInfoModal = false" @submit="handleSubmit" />

    </div>
</template>

<script setup lang="ts">
import { useDesaparecidosStore } from '../store/desaparecidos.store'
import InfoModal from '../components/InfoModal.vue'
import { ref } from 'vue'
import type { Informacao } from '../types/desaparecidos'
import { enviarInformacao } from '../api/desaparecidos/requests'
    const store = useDesaparecidosStore()
const pessoa = store.selecionado
const showInfoModal = ref(false)

const handleInfoClick = () => {
    showInfoModal.value = true
}   

const handleSubmit = (informacao: Informacao) => {
    if (pessoa?.id) {
        enviarInformacao(pessoa.id.toString(), informacao)
    }
}
</script>